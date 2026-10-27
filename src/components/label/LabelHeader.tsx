"use client";

import Link from "next/link";
import { brand } from "@/brand";
import { useLanguage } from "@/components/LanguageProvider";
import { AccentSwatches } from "./AccentSwatches";
import { HeaderLivingRing } from "./HeaderLivingRing";
import { ViewSwitcher } from "./ViewSwitcher";

/**
 * Header: accent swatches (left desktop / under View on mobile) · View+PAPERS · living ring.
 */
export function LabelHeader() {
  const { t } = useLanguage();

  return (
    <header className="label-header">
      <div className="label-header__row">
        <div className="label-header__stack">
          <div className="label-header__view-panel">
            <ViewSwitcher />
          </div>

          <div className="label-header__brand-panel">
            <span className="label-header__foil" aria-hidden />
            <Link href="/" className="label-header__name">
              {brand.name}
            </Link>
            <span className="label-header__tag">{t("tagline")}</span>
          </div>

          <div className="label-header__accents">
            <AccentSwatches />
          </div>
        </div>

        <HeaderLivingRing />
      </div>
    </header>
  );
}
