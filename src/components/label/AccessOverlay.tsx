"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";

/* Real accounts (shared with Vekon Life) are on when Supabase is configured. */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";

function signInWithGoogle() {
  const back = `${window.location.origin}/access`;
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(back)}`;
}

/** Physical access panel — overlays the exhibition; not a SaaS login modal. */
export function AccessOverlay() {
  const {
    overlayOpen,
    overlayPhase,
    pendingEmail,
    magicUrl,
    busy,
    closeOverlay,
    requestAccess,
    resendAccess,
  } = useAccess();
  const { t } = useLanguage();
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [overlayOpen, closeOverlay]);

  if (!overlayOpen) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();
    const isOwner = value.toLowerCase() === "owner";
    if (!value || (!isOwner && !value.includes("@"))) {
      setError(t("access.emailInvalid"));
      return;
    }
    setError(null);
    const result = await requestAccess(value);
    if (!result.ok) {
      setError(
        result.error === "rate_limited"
          ? t("access.rateLimited")
          : result.error === "invalid_email"
            ? t("access.emailInvalid")
            : t("access.sendFailed"),
      );
    }
  }

  let openHref: string | null = null;
  if (magicUrl) {
    try {
      openHref = magicUrl.startsWith("http")
        ? new URL(magicUrl).pathname + new URL(magicUrl).search
        : magicUrl;
    } catch {
      openHref = magicUrl;
    }
  }

  return (
    <div className="access-overlay" role="presentation">
      <button
        type="button"
        className="access-overlay__dim"
        aria-label={t("access.close")}
        onClick={closeOverlay}
      />
      <div
        className="access-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {SUPABASE_URL ? (
          <>
            <p className="access-overlay__kicker">{t("access.kicker")}</p>
            <h2 id={titleId} className="access-overlay__title">
              {t("access.title")}
            </h2>
            <p className="access-overlay__lead">{t("access.googleLead")}</p>
            <div className="access-overlay__actions access-overlay__actions--google">
              <button type="button" className="access-overlay__google" onClick={signInWithGoogle}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                </svg>
                {t("access.google")}
              </button>
            </div>
          </>
        ) : overlayPhase === "form" ? (
          <>
            <p className="access-overlay__kicker">{t("access.kicker")}</p>
            <h2 id={titleId} className="access-overlay__title">
              {t("access.title")}
            </h2>
            <p className="access-overlay__lead">{t("access.lead")}</p>
            <form className="access-overlay__form" onSubmit={onSubmit}>
              <label className="access-overlay__label" htmlFor="access-email">
                {t("access.email")}
              </label>
              <input
                id="access-email"
                className="access-overlay__input"
                type="text"
                autoComplete="email"
                inputMode="email"
                placeholder="name@email.com or OWNER"
                value={email}
                disabled={busy}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
              />
              {error ? (
                <p className="access-overlay__error" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="access-overlay__actions">
                <button
                  type="submit"
                  className="access-overlay__submit"
                  disabled={busy}
                >
                  {t("access.send")}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="access-overlay__kicker">{t("access.kicker")}</p>
            <h2 id={titleId} className="access-overlay__title">
              {t("access.checkTitle")}
            </h2>
            <p className="access-overlay__lead">
              {t("access.checkLead").replace("{email}", pendingEmail ?? "—")}
            </p>
            <p className="access-overlay__note">{t("access.checkHint")}</p>
            <p className="access-overlay__expire">{t("access.expire")}</p>
            {openHref ? (
              <p className="access-overlay__open">
                <Link href={openHref} className="access-overlay__open-link">
                  {t("access.openLink")}
                </Link>
              </p>
            ) : null}
            <div className="access-overlay__actions">
              <button
                type="button"
                className="access-overlay__again"
                disabled={busy}
                onClick={() => {
                  void resendAccess();
                }}
              >
                {t("access.sendAgain")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
