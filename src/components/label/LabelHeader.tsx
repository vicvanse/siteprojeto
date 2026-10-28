"use client";

import Link from "next/link";
import { brand } from "@/brand";
import { AccentSwatches } from "./AccentSwatches";
import { HeaderLivingRing } from "./HeaderLivingRing";
import { ViewSwitcher } from "./ViewSwitcher";

/**
 * Header: accent swatches · View + Vekon mark/Papers · living ring.
 * Brand uses the Papers glyph (not letterspaced wordmark) — living ring stays as the right mark.
 */
export function LabelHeader() {
  return (
    <header className="label-header">
      <div className="label-header__row">
        <div className="label-header__stack">
          <div className="label-header__view-panel">
            <ViewSwitcher />
          </div>

          <Link href="/" className="label-header__brand-panel" aria-label={brand.name}>
            <span className="label-header__mark">
              <span className="label-header__foil" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="label-header__glyph"
                src="/vekon-papers-icon.png"
                alt=""
                width={40}
                height={40}
                draggable={false}
                decoding="async"
              />
            </span>
            <span className="label-header__word">
              <span className="label-header__word-soft">Vekon</span>
              <span className="label-header__word-main">Papers</span>
            </span>
          </Link>

          <div className="label-header__accents">
            <AccentSwatches />
          </div>
        </div>

        <HeaderLivingRing />
      </div>
    </header>
  );
}
