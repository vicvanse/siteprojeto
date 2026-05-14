"use client";

import { BookOpen, Check, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  ADRIEL_LOURENCO_EMAIL,
  CONTACT_EMAIL,
  GOODREADS_URL,
  INSTAGRAM_URL,
  INSTAGRAM_LINK_LABEL,
  TIKTOK_URL,
  VICVANSE_EMAIL,
  VICVANSE_INSTAGRAM_URL,
} from "@/lib/site-constants";

const footerMailtoChain = [
  VICVANSE_EMAIL,
  ADRIEL_LOURENCO_EMAIL,
  VICVANSE_EMAIL,
] as const;

const socialFooterLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/65 shadow-sm transition hover:border-[#525252]/35 hover:text-[#525252] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function SiteSocialFooter({
  layout = "default",
  afterHeroStack = false,
  profileLinks = false,
}: {
  layout?: "default" | "registros";
  afterHeroStack?: boolean;
  profileLinks?: boolean;
}) {
  const t = useTranslations("footer");
  const [emailCopied, setEmailCopied] = useState(false);

  const shellClass =
    layout === "registros"
      ? afterHeroStack
        ? "mx-auto mt-0 flex w-full max-w-6xl flex-col items-center justify-center gap-3 border-t border-black/10 pt-5 max-sm:relative max-sm:left-1/2 max-sm:w-screen max-sm:max-w-[100vw] max-sm:-translate-x-1/2 max-sm:border-black/10 max-sm:bg-white max-sm:px-5 max-sm:pb-[max(2rem,env(safe-area-inset-bottom))] max-sm:pt-5 sm:max-lg:-mt-[15px] sm:max-lg:mx-0 sm:max-lg:w-full sm:max-lg:max-w-none sm:max-lg:justify-center sm:max-lg:pt-10"
        : "mx-auto mt-16 flex w-full max-w-6xl flex-col items-center justify-center gap-3 border-t border-black/10 pt-10 max-sm:relative max-sm:left-1/2 max-sm:w-screen max-sm:max-w-[100vw] max-sm:-translate-x-1/2 max-sm:border-black/10 max-sm:bg-white max-sm:px-5 max-sm:pb-[max(2rem,env(safe-area-inset-bottom))] max-sm:pt-10 lg:max-xl:justify-center lg:max-xl:pt-12"
      : afterHeroStack
        ? "mx-auto mt-0 flex w-full max-w-[40rem] flex-col items-center justify-center gap-3 border-t border-black/10 pt-5 max-sm:relative max-sm:left-1/2 max-sm:w-screen max-sm:max-w-[100vw] max-sm:-translate-x-1/2 max-sm:border-black/10 max-sm:bg-white max-sm:px-5 max-sm:pb-[max(2rem,env(safe-area-inset-bottom))] max-sm:pt-5 sm:max-lg:-mt-[15px] sm:max-lg:mx-0 sm:max-lg:w-full sm:max-lg:max-w-none sm:max-lg:justify-center sm:max-lg:pt-10"
        : "mx-auto mt-20 flex w-full max-w-[40rem] flex-col items-center justify-center gap-3 border-t border-black/10 pt-10 max-sm:relative max-sm:left-1/2 max-sm:w-screen max-sm:max-w-[100vw] max-sm:-translate-x-1/2 max-sm:border-black/10 max-sm:bg-white max-sm:px-5 max-sm:pb-[max(2rem,env(safe-area-inset-bottom))] max-sm:pt-10 lg:max-xl:justify-center lg:max-xl:pt-12";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  }

  return (
    <div className={shellClass}>
      <div className="flex w-full min-w-0 max-w-full flex-wrap items-center justify-center gap-2 sm:max-lg:gap-3">
        {INSTAGRAM_URL ? (
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={socialFooterLinkClass}
            aria-label={INSTAGRAM_LINK_LABEL}
          >
            <InstagramGlyph className="h-[18px] w-[18px]" />
          </a>
        ) : null}
        {TIKTOK_URL ? (
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={socialFooterLinkClass}
            aria-label="TikTok"
          >
            <TiktokGlyph className="h-[18px] w-[18px]" />
          </a>
        ) : null}
        {CONTACT_EMAIL ? (
          <button
            type="button"
            onClick={copyEmail}
            className={`${socialFooterLinkClass} ${emailCopied ? "border-[#525252]/40 text-[#525252]" : ""}`}
            aria-label={
              emailCopied
                ? t("emailCopied", { email: CONTACT_EMAIL })
                : t("copyEmail", { email: CONTACT_EMAIL })
            }
            title={t("copyTitle")}
          >
            {emailCopied ? (
              <Check className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
            ) : (
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        ) : null}
        {profileLinks && GOODREADS_URL ? (
          <>
            <a
              href={GOODREADS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={socialFooterLinkClass}
              aria-label="Goodreads"
              title="Goodreads"
            >
              <BookOpen className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </a>
          </>
        ) : null}
      </div>
      <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-4 sm:gap-5">
        <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
          {footerMailtoChain.map((email, i) => (
            <a
              key={`vic-email-${i}-${email}`}
              href={`mailto:${email}`}
              className="max-w-[min(100%,20rem)] break-all text-center font-mono text-[10px] uppercase tracking-[0.12em] text-black/70 underline decoration-black/18 underline-offset-[3px] transition hover:text-[#525252] hover:decoration-[#525252]/35"
            >
              {email}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[0, 1, 2].map((i) => (
            <a
              key={`vic-ig-${i}`}
              href={VICVANSE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={socialFooterLinkClass}
              aria-label="Instagram @vicvanse"
              title="Instagram @vicvanse"
            >
              <InstagramGlyph className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {emailCopied ? "Copiado." : ""}
      </span>
    </div>
  );
}
