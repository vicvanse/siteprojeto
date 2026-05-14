import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  collectSugestoesAttachments,
  type DiscordAttachment,
} from "@/lib/sugestoes-attachments";
import {
  appendSugestao,
  notifyDiscord,
  type StoredSugestao,
} from "@/lib/sugestoes-storage";
import { allowSugestoesPost } from "@/lib/sugestoes-rate-limit";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

async function sendResendEmail(entry: StoredSugestao): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const to = process.env.SUGESTOES_EMAIL_TO?.trim();
  if (!to) return false;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const displayName = entry.name || "(não indicado)";
  const displayEmail = entry.email || "(não indicado)";
  const resend = new Resend(apiKey);
  const extra =
    entry.attachmentSummary != null && entry.attachmentSummary !== ""
      ? `\n\nAnexos: ${entry.attachmentSummary} (ficheiros só no Discord, se configurado).`
      : "";
  const qrLines =
    entry.fromQr === true
      ? [
          "",
          `Publicar: ${entry.publish === true ? "sim" : "não"}`,
          `Nome para publicação: ${entry.publishAs ?? "(não indicado)"}`,
        ]
      : [];
  const { error } = await resend.emails.send({
    from,
    to,
    ...(entry.email && isValidEmail(entry.email)
      ? { replyTo: entry.email }
      : {}),
    subject: `[Sugestões] ${entry.name || "Sem nome"}`,
    text: [
      `Nome: ${displayName}`,
      `E-mail: ${displayEmail}`,
      ...qrLines,
      "",
      "Mensagem:",
      entry.message,
      extra,
    ].join("\n"),
  });
  return !error;
}

export async function POST(request: Request) {
  const rate = await allowSugestoesPost(request);
  if (!rate.allowed) {
    return NextResponse.json(
      { code: "RATE_LIMIT", retryAfter: rate.retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  let name: string;
  let email: string;
  let message: string;
  let company: string;
  let fromQr = false;
  let publish: boolean | undefined;
  let publishAs: string | undefined;
  let attachmentSummary: string | undefined;
  let discordFiles: DiscordAttachment[] | undefined;

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
    }
    const companyRaw = form.get("company");
    company =
      typeof companyRaw === "string" ? companyRaw.trim() : "";
    name = String(form.get("name") ?? "").trim();
    email = String(form.get("email") ?? "").trim();
    message = String(form.get("message") ?? "").trim();
    fromQr = form.get("fromQr") === "1";
    if (fromQr) {
      publish = form.get("publish") === "true";
      publishAs = String(form.get("publishAs") ?? "").trim().slice(0, 120);
    }

    const coll = await collectSugestoesAttachments(form);
    if (!coll.ok) {
      return NextResponse.json({ error: coll.error }, { status: 400 });
    }
    attachmentSummary = coll.summary || undefined;
    discordFiles =
      coll.attachments.length > 0 ? coll.attachments : undefined;
  } else {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
    }
    const body = raw as Record<string, unknown>;
    name = typeof body.name === "string" ? body.name.trim() : "";
    email = typeof body.email === "string" ? body.email.trim() : "";
    message = typeof body.message === "string" ? body.message.trim() : "";
    company =
      typeof body.company === "string" ? body.company.trim() : "";
    fromQr =
      body.fromQr === true ||
      body.fromQr === "1" ||
      body.fromQr === 1;
    if (fromQr) {
      publish =
        body.publish === true ||
        body.publish === "true" ||
        body.publish === "on";
      publishAs =
        typeof body.publishAs === "string"
          ? body.publishAs.trim().slice(0, 120)
          : undefined;
    }
    attachmentSummary = undefined;
    discordFiles = undefined;
  }

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (name.length > 120) {
    return NextResponse.json({ error: "Nome demasiado longo." }, { status: 400 });
  }
  if (email && (!isValidEmail(email) || email.length > 254)) {
    return NextResponse.json(
      { error: "Se indicar e-mail, use um endereço válido." },
      { status: 400 },
    );
  }
  if (!message || message.length > 8000) {
    return NextResponse.json(
      { error: "Escreva uma mensagem (até 8000 caracteres)." },
      { status: 400 },
    );
  }

  const entry: StoredSugestao = {
    id: randomUUID(),
    at: new Date().toISOString(),
    name,
    email,
    message,
    ...(attachmentSummary ? { attachmentSummary } : {}),
    ...(fromQr
      ? {
          fromQr: true,
          publish: publish === true,
          publishAs: publishAs ?? "",
        }
      : {}),
  };

  const savedRedis = await appendSugestao(entry);
  const sentEmail = await sendResendEmail(entry);
  const sentDiscord = await notifyDiscord(entry, discordFiles);

  if (!savedRedis && !sentEmail && !sentDiscord) {
    return NextResponse.json(
      {
        error:
          "Nenhum destino configurado. Adicione no ambiente de produção: Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN), ou Resend (RESEND_API_KEY), ou um webhook do Discord (SUGESTOES_DISCORD_WEBHOOK_URL).",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
