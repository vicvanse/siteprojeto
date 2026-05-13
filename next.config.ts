import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      /** Muitos browsers pedem `/favicon.ico` por defeito; servimos o mesmo PNG que `app/icon.png`. */
      { source: "/favicon.ico", destination: "/icon.png" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/victor/sugestões",
        destination: "/victor/sugestoes",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
