import { NextResponse } from "next/server";

/**
 * Receives Content-Security-Policy-Report-Only violations and logs one short
 * line each (no cookies, no IPs, query strings stripped).
 * Read them in Vercel → siteprojeto → Logs, searching "[csp]".
 */
export async function POST(request: Request) {
  try {
    const text = (await request.text()).slice(0, 8_000);
    const body = JSON.parse(text) as {
      "csp-report"?: Record<string, unknown>;
    };
    const r = body["csp-report"];
    if (r) {
      const strip = (v: unknown) => (typeof v === "string" ? v.split("?")[0].slice(0, 200) : "");
      console.warn(
        "[csp]",
        JSON.stringify({
          directive: strip(r["effective-directive"] ?? r["violated-directive"]),
          blocked: strip(r["blocked-uri"]),
          page: strip(r["document-uri"]),
          source: strip(r["source-file"]),
        }),
      );
    }
  } catch {
    /* Malformed report: ignore. */
  }
  return new NextResponse(null, { status: 204 });
}
