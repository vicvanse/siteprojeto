import { BASE_PATH } from "@/lib/base-path";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/access-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: BASE_PATH,
    maxAge: 0,
  });
  return response;
}
