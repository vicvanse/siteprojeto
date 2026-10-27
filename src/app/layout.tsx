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
import { brand } from "@/brand";
import "./globals.css";

/** Apply stored accent before paint — avoids pink flash + keeps CSS vars in sync. */
const accentBootScript = `(function(){try{var k="papers-accent-hue";var h=localStorage.getItem(k)||${JSON.stringify(DEFAULT_ACCENT_HUE)};var p=${JSON.stringify(ACCENT_PALETTES)};var c=p[h]||p[${JSON.stringify(DEFAULT_ACCENT_HUE)}];var r=document.documentElement;r.dataset.accentHue=h;r.style.setProperty("--conquest-fill",c.selected);r.style.setProperty("--conquest-fill-alt",c.selectedAlt);r.style.setProperty("--conquest-fill-ring",c.ringSelected);}catch(e){}})();`;

const langBootScript = `(function(){try{var k=${JSON.stringify(LANGUAGE_STORAGE_KEY)};var m=${JSON.stringify(LANGUAGE_BCP47)};var d=${JSON.stringify(DEFAULT_LANGUAGE)};var v=localStorage.getItem(k);var lang=m[v]?v:d;document.documentElement.lang=m[lang]||m[d];}catch(e){}})();`;

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
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Independent digital-object label from the Vekon universe. Store × archive × laboratory × gallery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} data-view="gallery">
      <body>
        <Script id="papers-accent-boot" strategy="beforeInteractive">
          {accentBootScript}
        </Script>
        <Script id="papers-lang-boot" strategy="beforeInteractive">
          {langBootScript}
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
