import { NextResponse } from "next/server";
import {
  createMagicToken,
  isAccessIdentity,
  isOwnerKey,
  magicLinkUrl,
  normalizeAccessIdentity,
  sendMagicLinkEmail,
} from "@/lib/access-auth";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const identity = normalizeAccessIdentity(body.email ?? "");
  if (!isAccessIdentity(identity)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const token = createMagicToken(identity);
  const url = magicLinkUrl(token);

  // OWNER is a local demo key — never email it; always return the open link.
  if (isOwnerKey(identity)) {
    console.info("[access] OWNER magic link:", url);
    return NextResponse.json({
      ok: true,
      email: identity,
      emailed: false,
      magicUrl: url,
    });
  }

  const mail = await sendMagicLinkEmail(identity, url);

  if (!mail.sent) {
    console.info("[access] magic link (dev / no email provider):", url);
  }

  return NextResponse.json({
    ok: true,
    email: identity,
    emailed: mail.sent,
    /** Only returned when email was not sent — for local/dev confirmation. */
    magicUrl: mail.sent ? undefined : url,
  });
}
