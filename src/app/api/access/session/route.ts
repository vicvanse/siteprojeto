import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/access-auth";
import { clearSessionCookie, setSessionCookie, withFreshTokens } from "@/lib/papers-session";
import { listEntitlements, supabaseEnabled } from "@/lib/supabase-rest";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  const session = decodeSession(raw);
  if (!session) {
    const response = NextResponse.json({ authenticated: false });
    /* Stale or pre-token cookie: drop it. */
    if (raw) clearSessionCookie(response);
    return response;
  }

  if (!session.uid || !supabaseEnabled()) {
    return NextResponse.json({
      authenticated: true,
      email: session.email,
      ownedIds: session.ownedIds,
    });
  }

  /* Real accounts: read the current owned set from Supabase, as the user. */
  const fresh = await withFreshTokens(session);
  if (!fresh) {
    const response = NextResponse.json({ authenticated: false });
    clearSessionCookie(response);
    return response;
  }
  const ownedIds = (await listEntitlements(fresh.session.at!)) ?? [];
  const response = NextResponse.json({
    authenticated: true,
    email: fresh.session.email,
    ownedIds,
  });
  if (fresh.changed) setSessionCookie(response, fresh.session);
  return response;
}
