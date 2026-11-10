import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { AccessProvider } from "@/components/AccessProvider";
import { AccentProvider } from "@/components/AccentProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ViewModeProvider } from "@/components/ViewModeProvider";
import { SiteIntro } from "@/components/SiteIntro";
import { LabelHeader } from "@/components/label/LabelHeader";
import { ACCENT_PALETTES, DEFAULT_ACCENT_HUE } from "@/lib/accent";
import { DEFAULT_LANGUAGE, LANGUAGE_BCP47, LANGUAGE_STORAGE_KEY } from "@/lib/i18n";
import "./globals.css";
import "./soft.css";
import { withBase } from "@/lib/base-path";

/** Apply stored accent before paint — avoids pink flash + keeps CSS vars in sync. */
const accentBootScript = `(function(){try{var k="papers-accent-hue";var h=localStorage.getItem(k)||${JSON.stringify(DEFAULT_ACCENT_HUE)};var p=${JSON.stringify(ACCENT_PALETTES)};var c=p[h]||p[${JSON.stringify(DEFAULT_ACCENT_HUE)}];var r=document.documentElement;r.dataset.accentHue=h;r.style.setProperty("--conquest-fill",c.selected);r.style.setProperty("--conquest-fill-alt",c.selectedAlt);r.style.setProperty("--conquest-fill-ring",c.ringSelected);r.style.setProperty("--accent-surface-even",c.surfaceEven);r.style.setProperty("--accent-surface-odd",c.surfaceOdd);}catch(e){}})();`;

const langBootScript = `(function(){try{var k=${JSON.stringify(LANGUAGE_STORAGE_KEY)};var m=${JSON.stringify(LANGUAGE_BCP47)};var d=${JSON.stringify(DEFAULT_LANGUAGE)};var cjk={ja:1,ko:1,"zh-CN":1,"zh-TW":1};var v=localStorage.getItem(k);var lang=m[v]?v:d;var r=document.documentElement;r.lang=m[lang]||m[d];if(cjk[lang])r.dataset.script="cjk";else delete r.dataset.script;}catch(e){}})();`;

/**
 * Full entrance on the first visit in a tab, and again once 20 minutes have
 * passed since the last full one; quick rise for reloads in between.
 */
const enterBootScript = `(function(){try{var r=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var k="papers-entered-at",now=Date.now(),last=Number(sessionStorage.getItem(k))||0;if(now-last>12e5){r.dataset.enter="full";sessionStorage.setItem(k,String(now));}else{r.dataset.enter="quick";}}catch(e){}})();`;

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vekon: Papers",
    template: `%s · Vekon: Papers`,
  },
  description:
    "Independent digital-object label from the Vekon universe. Store × archive × laboratory × gallery.",
  icons: {
    icon: [{ url: withBase("/vekon-papers-icon.png"), type: "image/png" }],
    apple: [{ url: withBase("/vekon-papers-icon.png"), type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      data-view="gallery"
      suppressHydrationWarning
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700&family=Noto+Sans+KR:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+TC:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <body>
        <Script id="papers-accent-boot" strategy="beforeInteractive">
          {accentBootScript}
        </Script>
        <Script id="papers-lang-boot" strategy="beforeInteractive">
          {langBootScript}
        </Script>
        <Script id="papers-enter-boot" strategy="beforeInteractive">
          {enterBootScript}
        </Script>
        <LanguageProvider>
          <AccentProvider>
            <AccessProvider>
              <ViewModeProvider>
                <SiteIntro />
                <div className="shell">
                  <LabelHeader />
                  <main className="shell__main">{children}</main>
                </div>
              </ViewModeProvider>
            </AccessProvider>
          </AccentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
