"use client";

import { useEffect, useState } from "react";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode, type ViewMode } from "@/components/ViewModeProvider";

/** Physical pair-pill control — Gallery / Collection (Log in when signed out). */
export function ViewSwitcher() {
  const { mode, setMode } = useViewMode();
  const { ready, authenticated, openOverlay } = useAccess();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* SSR + first paint stay on Collection to avoid hydration mismatch. */
  const collectionLabel =
    mounted && ready && !authenticated ? t("logIn") : t("collection");

  const options: { id: ViewMode; label: string }[] = [
    { id: "gallery", label: t("gallery") },
    { id: "collection", label: collectionLabel },
  ];

  function select(next: ViewMode) {
    setMode(next);
    if (next === "collection" && ready && !authenticated) openOverlay("form");
  }

  return (
    <div className="view-switcher" role="group" aria-label={t("view")}>
      <span className="view-switcher__label">{t("view")}</span>
      <div className="view-switcher__pair">
        {options.map((opt) => {
          const active = mode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`view-pill${active ? " view-pill--active" : ""}`}
              aria-pressed={active}
              onClick={() => select(opt.id)}
            >
              <span className="view-pill__label">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
