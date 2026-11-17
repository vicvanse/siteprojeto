import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { catalogArtifacts } from "@/data/artifacts";
import { SESSION_COOKIE, decodeSession } from "@/lib/access-auth";
import { clearSessionCookie, setSessionCookie, withFreshTokens } from "@/lib/papers-session";
import { claimFreeEntitlement, listEntitlements, supabaseEnabled } from "@/lib/supabase-rest";

/** Signed-in reader takes a free object: it joins their Collection. */
export async function POST(request: Request) {
  const jar = await cookies();
  const session = decodeSession(jar.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });

  let body: { objectId?: string };
  try {
    body = (await request.json()) as { objectId?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const artifact = catalogArtifacts.find((a) => a.id === body.objectId);
  /* Only free objects can be claimed here; paid ones go through checkout.
     The database enforces the same rule (papers_free_objects + RLS). */
  if (!artifact || artifact.status !== "free") {
    return NextResponse.json({ ok: false, error: "not_free" }, { status: 400 });
  }

  if (!session.uid || !supabaseEnabled()) {
    return NextResponse.json({ ok: true, ownedIds: session.ownedIds, demo: true });
  }

  const fresh = await withFreshTokens(session);
  if (!fresh) {
    const response = NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
    clearSessionCookie(response);
    return response;
  }
  const at = fresh.session.at!;
  await claimFreeEntitlement(at, fresh.session.uid!, artifact.id);
  const response = NextResponse.json({ ok: true, ownedIds: (await listEntitlements(at)) ?? [] });
  if (fresh.changed) setSessionCookie(response, fresh.session);
  return response;
}
