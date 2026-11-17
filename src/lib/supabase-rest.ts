/**
 * Minimal Supabase access over REST (no SDK): magic-link / Google login through
 * Supabase Auth and the Papers ownership table. Server-only.
 *
 * Shares the Vekon Life Supabase project, so one account works in both.
 * Tables (see supabase/papers.sql): papers_entitlements, papers_free_objects.
 *
 * Every data call runs with the signed-in user's own access token, so Row
 * Level Security decides what Papers can read or write. Papers holds no
 * service-role key: a bug here cannot reach other users' data.
 */

const URL_ENV = () => process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "") ?? "";
const ANON = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

/** Real accounts are on once the Supabase URL and public key exist. */
export function supabaseEnabled() {
  return Boolean(URL_ENV() && ANON());
}

export type SupabaseTokens = {
  accessToken: string;
  refreshToken?: string;
  /** Access token expiry, epoch ms. */
  expiresAt: number;
};

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  user?: { id?: string; email?: string };
};

function readTokens(data: TokenResponse): SupabaseTokens | null {
  if (!data.access_token) return null;
  const expiresAt =
    typeof data.expires_at === "number"
      ? data.expires_at * 1000
      : Date.now() + (data.expires_in ?? 3600) * 1000;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt,
  };
}

/** Expiry (epoch ms) read from the access token itself. */
export function accessTokenExpiry(accessToken: string): number | null {
  try {
    const part = accessToken.split(".")[1];
    if (!part) return null;
    const payload = JSON.parse(Buffer.from(part, "base64url").toString("utf8")) as {
      exp?: number;
    };
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function userHeaders(accessToken: string, extra: Record<string, string> = {}) {
  return {
    apikey: ANON(),
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/** Send the Supabase magic link; it returns to `redirectTo` with tokens in the hash. */
export async function sendSupabaseMagicLink(email: string, redirectTo: string) {
  const res = await fetch(
    `${URL_ENV()}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`,
    {
      method: "POST",
      headers: { apikey: ANON(), "Content-Type": "application/json" },
      body: JSON.stringify({ email, create_user: true }),
    },
  );
  if (!res.ok) {
    console.error("[supabase] otp failed", res.status);
    return { sent: false as const, status: res.status };
  }
  return { sent: true as const };
}

/** Exchange a token_hash from the email (server-side flow) for the user and session. */
export async function verifySupabaseTokenHash(tokenHash: string, type: string) {
  const res = await fetch(`${URL_ENV()}/auth/v1/verify`, {
    method: "POST",
    headers: { apikey: ANON(), "Content-Type": "application/json" },
    body: JSON.stringify({ token_hash: tokenHash, type }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as TokenResponse;
  const tokens = readTokens(data);
  const user = data.user;
  if (!tokens || !user?.id || !user.email) return null;
  return { id: user.id, email: user.email.toLowerCase(), tokens };
}

/** Validate a Supabase access token and return the user it belongs to. */
export async function supabaseUser(accessToken: string) {
  const res = await fetch(`${URL_ENV()}/auth/v1/user`, {
    headers: { apikey: ANON(), Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const user = (await res.json()) as { id?: string; email?: string };
  if (!user.id || !user.email) return null;
  return { id: user.id, email: user.email.toLowerCase() };
}

/** Trade a refresh token for a new session (Supabase rotates the refresh token). */
export async function refreshSupabaseTokens(refreshToken: string) {
  const res = await fetch(`${URL_ENV()}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: ANON(), "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return readTokens((await res.json()) as TokenResponse);
}

/** Object ids the user owns in Papers (RLS: only their own rows). */
export async function listEntitlements(accessToken: string): Promise<string[] | null> {
  const res = await fetch(`${URL_ENV()}/rest/v1/papers_entitlements?select=object_id`, {
    headers: userHeaders(accessToken),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[supabase] entitlements read failed", res.status);
    return null;
  }
  const rows = (await res.json()) as { object_id: string }[];
  return rows.map((r) => r.object_id);
}

/**
 * Add a free object to the user's Collection (idempotent). RLS only allows
 * rows for the caller, with source 'free', for ids in papers_free_objects.
 */
export async function claimFreeEntitlement(
  accessToken: string,
  userId: string,
  objectId: string,
) {
  const res = await fetch(
    `${URL_ENV()}/rest/v1/papers_entitlements?on_conflict=user_id,object_id`,
    {
      method: "POST",
      headers: userHeaders(accessToken, {
        Prefer: "resolution=ignore-duplicates,return=minimal",
      }),
      body: JSON.stringify({ user_id: userId, object_id: objectId, source: "free" }),
    },
  );
  if (!res.ok) {
    console.error("[supabase] claim failed", res.status);
    return false;
  }
  return true;
}
