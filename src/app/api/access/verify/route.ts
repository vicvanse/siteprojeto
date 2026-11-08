import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSession,
  encodeSession,
  verifyMagicToken,
} from "@/lib/access-auth";
import { listEntitlements, supabaseEnabled, supabaseUser } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  let body: { token?: string; supabaseToken?: string };
  try {
    body = (await request.json()) as { token?: string; supabaseToken?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  let session;
  const supaToken = body.supabaseToken?.trim();
  if (supaToken && supabaseEnabled()) {
    /* Back from the Supabase magic link: trust only what Supabase confirms. */
    const user = await supabaseUser(supaToken);
    if (!user) {
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    }
    session = createSession(user.email, user.id, await listEntitlements(user.id));
  } else {
    const magic = verifyMagicToken(body.token?.trim() ?? "");
    if (!magic) {
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    }
    session = createSession(magic.email);
  }

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
