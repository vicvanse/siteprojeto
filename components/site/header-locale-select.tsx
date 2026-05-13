"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { useTransition } from "react";

const LOCALE_INITIALS: Record<AppLocale, string> = {
  en: "EN",
  ko: "KO",
  "pt-BR": "PT",
  es: "ES",
  ja: "JA",
  de: "DE",
  fr: "FR",
  it: "IT",
  "zh-CN": "CN",
  "zh-TW": "TW",
};

export function HeaderLocaleSelect({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const t = useTranslations("footer");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onChange(next: AppLocale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const isDark = variant === "dark";

  return (
    <label className="relative inline-flex shrink-0 items-center">
      <span className="sr-only">{t("langLabel")}</span>
      <select
        value={locale}
        disabled={pending}
        aria-label={t("langLabel")}
        onChange={(e) => onChange(e.target.value as AppLocale)}
        className={
          "h-8 min-w-[3.25rem] cursor-pointer appearance-none rounded-lg border py-1 pl-2 pr-8 font-mono text-[10px] font-medium uppercase tracking-[0.12em] outline-none transition sm:h-9 sm:min-w-[3.5rem] sm:pl-2.5 sm:pr-9 sm:text-[11px] " +
          "focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 " +
          (isDark
            ? "border-white/25 bg-black text-white hover:border-white/40 focus-visible:ring-white/35 focus-visible:ring-offset-black"
            : "border-black/12 bg-white text-black/80 hover:border-black/20 focus-visible:ring-[#356040]/35 focus-visible:ring-offset-white")
        }
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LOCALE_INITIALS[l]}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`pointer-events-none absolute right-1.5 top-1/2 z-[1] h-3.5 w-3.5 -translate-y-1/2 sm:right-2 sm:h-4 sm:w-4 ${
          isDark ? "text-white/55" : "text-black/40"
        }`}
        strokeWidth={2}
        aria-hidden
      />
    </label>
  );
}
