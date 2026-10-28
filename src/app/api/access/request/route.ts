import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createMagicToken,
  createSession,
  encodeSession,
  isAccessIdentity,
  isOwnerKey,
  magicLinkUrl,
  normalizeAccessIdentity,
  sendMagicLinkEmail,
} from "@/lib/access-auth";

function sessionCookie(identity: string) {
  const session = createSession(identity);
  return {
    session,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    },
  };
}

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

  // OWNER demo key — unlock immediately (no email / magic-link click).
  if (isOwnerKey(identity)) {
    const { session, options } = sessionCookie(identity);
    const response = NextResponse.json({
      ok: true,
      authenticated: true,
      email: session.email,
      ownedIds: session.ownedIds,
      emailed: false,
    });
    response.cookies.set(SESSION_COOKIE, encodeSession(session), options);
    return response;
  }

  const token = createMagicToken(identity);
  const url = magicLinkUrl(token);
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
