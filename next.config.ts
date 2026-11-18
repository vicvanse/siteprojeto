import type { NextConfig } from "next";

/* Papers loads only its own assets plus Google Fonts; Supabase is reached by
   navigation (login) and from the server, never by browser fetch today. */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "report-uri /papers/api/csp-report",
].join("; ");

const nextConfig: NextConfig = {
  /* Served at vekonlife.com/papers (rewrite from the Vekon site). See src/lib/base-path.ts. */
  basePath: "/papers",
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  /* Baseline browser hardening (no CSP yet: needs testing against inline scripts). */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          /*
           * Observation mode: browsers only report what this policy would
           * block (to /papers/api/csp-report). Once reports are clean, rename
           * the key to Content-Security-Policy to enforce it.
           */
          { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
        ],
      },
    ];
  },
};

export default nextConfig;
