import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** Janela deslizante: margem larga para utilizadores reais; corta abuso em massa. */
const WINDOW = "15 m";
const MAX_IN_WINDOW = 35;

let ratelimit: Ratelimit | null | undefined;

function getRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    ratelimit = null;
    return null;
  }
  const redis = new Redis({ url, token });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MAX_IN_WINDOW, WINDOW),
    prefix: "rl:sugestoes:post",
  });
  return ratelimit;
}

export function getSugestoesClientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}

/**
 * Limite por IP quando o Redis Upstash está configurado (o mesmo das sugestões).
 * Falha aberta: se o Redis falhar, permite o pedido para não quebrar o formulário.
 */
export async function allowSugestoesPost(
  request: Request,
): Promise<{ allowed: true } | { allowed: false; retryAfterSec: number }> {
  const rl = getRatelimit();
  if (!rl) return { allowed: true };

  const ip = getSugestoesClientIp(request);
  try {
    const { success, reset } = await rl.limit(ip);
    if (success) return { allowed: true };
    const retryAfterMs = Math.max(0, reset - Date.now());
    const retryAfterSec = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return { allowed: false, retryAfterSec };
  } catch {
    return { allowed: true };
  }
}
