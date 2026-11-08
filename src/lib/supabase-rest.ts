/**
 * Minimal Supabase access over REST (no SDK): magic-link login through
 * Supabase Auth and the Papers ownership table. Server-only.
 *
 * Shares the Vekon Life Supabase project, so one account works in both.
 * Tables (see supabase/papers.sql): papers_entitlements, papers_orders.
 */

const URL_ENV = () => process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "") ?? "";
const ANON = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
const SERVICE = () => process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

/** Real accounts are on once the three Supabase variables exist. */
export function supabaseEnabled() {
  return Boolean(URL_ENV() && ANON() && SERVICE());
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
    const detail = await res.text().catch(() => "");
    console.error("[supabase] otp failed", res.status, detail);
    return { sent: false as const, status: res.status };
  }
  return { sent: true as const };
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

function serviceHeaders(extra: Record<string, string> = {}) {
  return {
    apikey: SERVICE(),
    Authorization: `Bearer ${SERVICE()}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/** Object ids the user owns in Papers. */
export async function listEntitlements(userId: string): Promise<string[]> {
  const res = await fetch(
    `${URL_ENV()}/rest/v1/papers_entitlements?select=object_id&user_id=eq.${encodeURIComponent(userId)}`,
    { headers: serviceHeaders(), cache: "no-store" },
  );
  if (!res.ok) {
    console.error("[supabase] entitlements read failed", res.status);
    return [];
  }
  const rows = (await res.json()) as { object_id: string }[];
  return rows.map((r) => r.object_id);
}

/** Give the user an object (idempotent). */
export async function grantEntitlement(
  userId: string,
  objectId: string,
  source: "free" | "purchase" | "grant",
  orderId?: string,
) {
  const res = await fetch(
    `${URL_ENV()}/rest/v1/papers_entitlements?on_conflict=user_id,object_id`,
    {
      method: "POST",
      headers: serviceHeaders({ Prefer: "resolution=ignore-duplicates,return=minimal" }),
      body: JSON.stringify({
        user_id: userId,
        object_id: objectId,
        source,
        order_id: orderId ?? null,
      }),
    },
  );
  if (!res.ok) {
    console.error("[supabase] grant failed", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
