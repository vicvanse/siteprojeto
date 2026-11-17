import { NextResponse } from "next/server";
import { createSession, verifyMagicToken } from "@/lib/access-auth";
import { setSessionCookie } from "@/lib/papers-session";
import {
  accessTokenExpiry,
  listEntitlements,
  supabaseEnabled,
  supabaseUser,
  verifySupabaseTokenHash,
} from "@/lib/supabase-rest";

export async function POST(request: Request) {
  let body: {
    token?: string;
    supabaseToken?: string;
    refreshToken?: string;
    tokenHash?: string;
    type?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  let session;
  const supaToken = body.supabaseToken?.trim();
  const tokenHash = body.tokenHash?.trim();
  if (tokenHash && supabaseEnabled()) {
    const verified = await verifySupabaseTokenHash(tokenHash, body.type?.trim() || "magiclink");
    if (!verified) {
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    }
    const owned = (await listEntitlements(verified.tokens.accessToken)) ?? [];
    session = createSession(verified.email, verified.id, owned, verified.tokens);
  } else if (supaToken && supabaseEnabled()) {
    /* Back from the Supabase magic link / Google: trust only what Supabase confirms. */
    const user = await supabaseUser(supaToken);
    if (!user) {
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    }
    const tokens = {
      accessToken: supaToken,
      refreshToken: body.refreshToken?.trim() || undefined,
      expiresAt: accessTokenExpiry(supaToken) ?? Date.now() + 5 * 60 * 1000,
    };
    const owned = (await listEntitlements(supaToken)) ?? [];
    session = createSession(user.email, user.id, owned, tokens);
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
  setSessionCookie(response, session);
  return response;
}
