"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";

/** Physical access panel — overlays the exhibition; not a SaaS login modal. */
export function AccessOverlay() {
  const {
    overlayOpen,
    overlayPhase,
    pendingEmail,
    pendingToken,
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

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!value || !value.includes("@")) {
      setError(t("access.emailInvalid"));
      return;
    }
    setError(null);
    requestAccess(value);
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
        {overlayPhase === "form" ? (
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
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@email.com"
                value={email}
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
                <button type="submit" className="access-overlay__submit">
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
            {pendingToken ? (
              <p className="access-overlay__open">
                <Link
                  href={`/access?t=${encodeURIComponent(pendingToken)}`}
                  className="access-overlay__open-link"
                >
                  {t("access.openLink")}
                </Link>
              </p>
            ) : null}
            <div className="access-overlay__actions">
              <button
                type="button"
                className="access-overlay__again"
                onClick={() => resendAccess()}
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
