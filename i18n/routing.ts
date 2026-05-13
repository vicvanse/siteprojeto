import { defineRouting } from "next-intl/routing";

const locales = [
  "en",
  "ko",
  "pt-BR",
  "es",
  "ja",
  "de",
  "fr",
  "it",
  "zh-CN",
  "zh-TW",
] as const;

/** First visit: pathname → (if no cookie) Accept-Language → defaultLocale. Cookie stores explicit choice. */
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "pt-BR",
  /** No prefix for default locale (cleaner pt-BR URLs). */
  localePrefix: "as-needed",
  /** Use Accept-Language + locale cookie; set `false` to use URL only. */
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    sameSite: "lax",
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
});

export type AppLocale = (typeof locales)[number];
