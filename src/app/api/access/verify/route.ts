import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSession,
  encodeSession,
  verifyMagicToken,
} from "@/lib/access-auth";

export async function POST(request: Request) {
  let body: { token?: string };
  try {
    body = (await request.json()) as { token?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const token = body.token?.trim() ?? "";
  const magic = verifyMagicToken(token);
  if (!magic) {
    return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
  }

  const session = createSession(magic.email);
  const response = NextResponse.json({
    ok: true,
    email: session.email,
    ownedIds: session.ownedIds,
  });

  response.cookies.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  return response;
}
