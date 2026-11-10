import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Served at vekonlife.com/papers (rewrite from the Vekon site). See src/lib/base-path.ts. */
  basePath: "/papers",
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
