import { BASE_PATH } from "@/lib/base-path";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  encodeSession,
  type AccessSession,
} from "@/lib/access-auth";
import { refreshSupabaseTokens } from "@/lib/supabase-rest";

/** Renew a little before expiry so a request never runs on a dying token. */
const REFRESH_MARGIN_MS = 60 * 1000;

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: BASE_PATH,
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};

/**
 * Real-account session with a usable access token, refreshing it when needed.
 * Returns null when the account can no longer be renewed (signed out).
 * `changed` tells the caller to write the cookie back (tokens rotated).
 */
export async function withFreshTokens(
  session: AccessSession,
): Promise<{ session: AccessSession; changed: boolean } | null> {
  if (!session.uid || !session.at) return null;
  const expiresAt = session.atExp ?? 0;
  if (Date.now() < expiresAt - REFRESH_MARGIN_MS) {
    return { session, changed: false };
  }
  if (!session.rt) return null;
  const tokens = await refreshSupabaseTokens(session.rt);
  if (!tokens) return null;
  return {
    session: {
      ...session,
      at: tokens.accessToken,
      rt: tokens.refreshToken ?? session.rt,
      atExp: tokens.expiresAt,
    },
    changed: true,
  };
}

/** Write the session cookie on a response (keeps ownedIds out of real-account cookies). */
export function setSessionCookie(
  response: { cookies: { set: (name: string, value: string, options: typeof sessionCookieOptions) => void } },
  session: AccessSession,
) {
  const stored = session.uid ? { ...session, ownedIds: [] } : session;
  response.cookies.set(SESSION_COOKIE, encodeSession(stored), sessionCookieOptions);
}

export function clearSessionCookie(
  response: { cookies: { set: (name: string, value: string, options: typeof sessionCookieOptions) => void } },
) {
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
}
