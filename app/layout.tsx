import type { ReactNode } from "react";

/**
 * Raiz mínima (padrão next-intl com segmento `[locale]`);
 * `html` / `body` e fontes estão em `app/[locale]/layout.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
