import { Redis } from "@upstash/redis";
import type { DiscordAttachment } from "@/lib/sugestoes-attachments";

const LIST_KEY = "sugestoes:all";
const MAX_ENTRIES = 200;

export interface StoredSugestao {
  id: string;
  at: string;
  name: string;
  email: string;
  message: string;
  /** Resumo textual, ex.: "2 imagem(ns), 1 áudio" — só metadados, sem binários. */
  attachmentSummary?: string;
  /** Fluxo formulário ligado ao QR do cartão. */
  fromQr?: boolean;
  /** Autoriza publicação (checkbox no fluxo QR). */
  publish?: boolean;
  /** Nome indicado para publicação no fluxo QR. */
  publishAs?: string;
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function hasRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

export async function appendSugestao(entry: StoredSugestao): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    await redis.lpush(LIST_KEY, JSON.stringify(entry));
    await redis.ltrim(LIST_KEY, 0, MAX_ENTRIES - 1);
    return true;
  } catch {
    return false;
  }
}

export async function listSugestoesRecent(limit = 100): Promise<StoredSugestao[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const raw = await redis.lrange(LIST_KEY, 0, Math.max(0, limit - 1));
    return raw.map((s) => JSON.parse(s) as StoredSugestao);
  } catch {
    return [];
  }
}

/** Notificação no Discord: texto + anexos opcionais (multipart). */
export async function notifyDiscord(
  entry: StoredSugestao,
  files?: DiscordAttachment[],
): Promise<boolean> {
  const url = process.env.SUGESTOES_DISCORD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const qrExtra =
      entry.fromQr === true
        ? [
            `Publicar: ${entry.publish === true ? "sim" : "não"}`,
            `Nome (publicação): ${entry.publishAs ?? "—"}`,
          ]
        : [];
    const lines = [
      "**Sugestão (site)**",
      `Nome: ${entry.name || "—"}`,
      `E-mail: ${entry.email || "—"}`,
      ...(qrExtra.length ? ["", ...qrExtra] : []),
      "",
      entry.message,
    ];
    if (entry.attachmentSummary) {
      lines.push("", `_Anexos: ${entry.attachmentSummary}._`);
    }
    let content = lines.join("\n").slice(0, 2000);

    if (!files?.length) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      return res.ok;
    }

    const form = new FormData();
    form.append("payload_json", JSON.stringify({ content }));
    files.forEach((f, i) => {
      const blob = new Blob([new Uint8Array(f.data)], {
        type: f.contentType || "application/octet-stream",
      });
      form.append(`files[${i}]`, blob, f.filename);
    });

    const res = await fetch(url, { method: "POST", body: form });
    return res.ok;
  } catch {
    return false;
  }
}
