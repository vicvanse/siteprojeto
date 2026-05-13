"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

/**
 * Rótulos visíveis (estilo texto em fila, como o rodapé do Pixel / Vekon).
 * Latim em caixa alta; CJK e coreano em escrita nativa.
 */
const LANG_FOOTER_LABEL: Record<AppLocale, string> = {
  en: "ENGLISH",
  ko: "한국어",
  "pt-BR": "PORTUGUÊS (BR)",
  es: "ESPAÑOL",
  ja: "日本語",
  de: "DEUTSCH",
  fr: "FRANÇAIS",
  it: "ITALIANO",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

const linkBaseClass =
  "shrink-0 font-sans text-[9px] tracking-[0.08em] transition-colors sm:text-[10px] sm:tracking-[0.1em] " +
  "hover:text-[#4a7c44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#356040]/25 focus-visible:ring-offset-2 " +
  "max-sm:hover:text-white/90 max-sm:focus-visible:ring-white/30 max-sm:focus-visible:ring-offset-black";

export function LanguageSwitcher() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      className="w-full max-w-full"
      aria-label={t("langLabel")}
    >
      <ul className="m-0 flex w-full list-none flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 p-0 sm:gap-x-2 sm:gap-y-1">
        {routing.locales.map((l) => {
          const isActive = locale === l;
          return (
            <li key={l} className="inline-flex max-w-full items-center p-0">
              <Link
                href={pathname}
                locale={l}
                scroll={false}
                className={
                  isActive
                    ? `${linkBaseClass} font-bold text-black max-sm:text-white`
                    : `${linkBaseClass} font-normal text-black/50 max-sm:text-white/50`
                }
                hrefLang={l}
                aria-current={isActive ? "true" : undefined}
              >
                {LANG_FOOTER_LABEL[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
