"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode, type ViewMode } from "@/components/ViewModeProvider";

/** Physical pair-pill control — Vekon LIFE/VEKON logic, not a tiny tech toggle. */
export function ViewSwitcher() {
  const { mode, setMode } = useViewMode();
  const { t } = useLanguage();

  const options: { id: ViewMode; label: string }[] = [
    { id: "gallery", label: t("gallery") },
    { id: "schema", label: t("schema") },
  ];

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
              onClick={() => setMode(opt.id)}
            >
              <span className="view-pill__label">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
