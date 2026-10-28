"use client";

import Link from "next/link";
import { brand } from "@/brand";
import { AccentSwatches } from "./AccentSwatches";
import { HeaderLivingRing } from "./HeaderLivingRing";
import { ViewSwitcher } from "./ViewSwitcher";

/**
 * Header: accent swatches (left desktop / under View on mobile) · View + Vekon: Papers · living ring.
 */
export function LabelHeader() {
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
