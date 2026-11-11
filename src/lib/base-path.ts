/**
 * Papers is served at vekonlife.com/papers (Vercel rewrite from the Vekon site).
 * Must match `basePath` in next.config.ts. next/link and redirect() add it on
 * their own; raw <a>, <img>, fetch and metadata URLs need withBase().
 */
export const BASE_PATH = "/papers";

export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

/**
 * The Vekon home (vekonlife.com/), outside this app's basePath. Root-relative on
 * purpose: Papers is served at www.vekonlife.com/papers, so "/" stays on the same
 * origin (no apex→www redirect) and the cross-page view transition can run.
 */
export const VEKON_HOME_URL = "/";
