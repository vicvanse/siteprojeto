import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/access-auth";
import { listEntitlements, supabaseEnabled } from "@/lib/supabase-rest";

export async function GET() {
  const jar = await cookies();
  const session = decodeSession(jar.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }
  /* Real accounts: always read the current owned set from Supabase. */
  const ownedIds =
    session.uid && supabaseEnabled() ? await listEntitlements(session.uid) : session.ownedIds;
  return NextResponse.json({
    authenticated: true,
    email: session.email,
    ownedIds,
  });
}
