import { createHmac, timingSafeEqual } from "crypto";
import { collectibleArtifacts } from "@/data/artifacts";

const SESSION_COOKIE = "papers-access";
const MAGIC_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const OWNER_KEY = "owner";

export { SESSION_COOKIE, MAGIC_TTL_MS, SESSION_TTL_MS };

export type AccessSession = {
  email: string;
  ownedIds: string[];
  exp: number;
};

export type MagicPayload = {
  email: string;
  exp: number;
  n: string;
};

/** Demo master key — typing OWNER in login unlocks every object. */
export function isOwnerKey(value: string) {
  const raw = value.trim().toLowerCase();
  if (!raw) return false;
  if (raw === OWNER_KEY) return true;
  const local = raw.split("@")[0] ?? "";
  return local === OWNER_KEY;
}

/** Demo ownership until purchases exist. */
export function demoOwnedIds(email: string): string[] {
  if (isOwnerKey(email)) {
    return collectibleArtifacts.map((artifact) => artifact.id);
  }
  const base = ["001", "007", "b004"];
  const extra = email.toLowerCase().includes("a")
    ? ["003", "b011"]
    : ["005", "b006"];
  return [...base, ...extra];
}

function secret() {
  const value = process.env.ACCESS_SECRET?.trim();
  if (value) return value;
  if (process.env.NODE_ENV !== "production") {
    return "papers-dev-access-secret-change-me";
  }
  throw new Error("ACCESS_SECRET is not set");
}

function b64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(normalized, "base64");
}

function sign(payloadB64: string) {
  return b64url(createHmac("sha256", secret()).update(payloadB64).digest());
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function encodeSigned<T extends object>(payload: T): string {
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function decodeSigned<T extends object>(token: string): T | null {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;
  if (!safeEqual(sign(payloadB64), sig)) return null;
  try {
    const json = fromB64url(payloadB64).toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function createMagicToken(email: string): string {
  const identity = normalizeAccessIdentity(email);
  const payload: MagicPayload = {
    email: identity,
    exp: Date.now() + MAGIC_TTL_MS,
    n: b64url(
      createHmac("sha256", secret()).update(`${Date.now()}:${identity}`).digest(),
    ).slice(0, 16),
  };
  return encodeSigned(payload);
}

export function verifyMagicToken(token: string): MagicPayload | null {
  const payload = decodeSigned<MagicPayload>(token);
  if (!payload?.email || !payload.exp) return null;
  if (Date.now() > payload.exp) return null;
  return payload;
}

export function createSession(email: string): AccessSession {
  const identity = normalizeAccessIdentity(email);
  return {
    email: identity,
    ownedIds: demoOwnedIds(identity),
    exp: Date.now() + SESSION_TTL_MS,
  };
}

export function encodeSession(session: AccessSession): string {
  return encodeSigned(session);
}

export function decodeSession(token: string | undefined | null): AccessSession | null {
  if (!token) return null;
  const session = decodeSigned<AccessSession>(token);
  if (!session?.email || !Array.isArray(session.ownedIds) || !session.exp) {
    return null;
  }
  if (Date.now() > session.exp) return null;
  /* Demo ledger may change — always resolve current owned set from identity. */
  return {
    ...session,
    ownedIds: demoOwnedIds(session.email),
  };
}

export function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3456";
}

export function magicLinkUrl(token: string) {
  return `${siteOrigin()}/access?t=${encodeURIComponent(token)}`;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Email address or the OWNER demo key. */
export function isAccessIdentity(value: string) {
  return isOwnerKey(value) || isEmail(value);
}

export function normalizeAccessIdentity(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (isOwnerKey(trimmed)) return OWNER_KEY;
  return trimmed;
}

export async function sendMagicLinkEmail(email: string, url: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.ACCESS_FROM_EMAIL?.trim() || "Papers <onboarding@resend.dev>";

  if (!apiKey) {
    return { sent: false as const, reason: "missing_resend" as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Access your Papers collection",
      text: `Open this link to access your collection (expires in 15 minutes):\n\n${url}\n`,
      html: `<p>Open this link to access your collection (expires in 15 minutes):</p><p><a href="${url}">${url}</a></p>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[access] Resend failed", res.status, detail);
    return { sent: false as const, reason: "resend_error" as const };
  }

  return { sent: true as const };
}
