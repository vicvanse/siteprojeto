"use client";

import Link from "next/link";
import { brand } from "@/brand";
import { AccentSwatches } from "./AccentSwatches";
import { HeaderLivingRing } from "./HeaderLivingRing";
import { ViewSwitcher } from "./ViewSwitcher";
import { withBase } from "@/lib/base-path";

/**
 * Header: accent swatches · Vekon:Papers + View · living ring.
 * Brand sits left of Gallery/Collection on desktop; living ring stays as the right mark.
 */
export function LabelHeader() {
  return (
    <header className="label-header">
      <div className="label-header__row">
        <div className="label-header__stack">
          <Link href="/" className="label-header__brand-panel is-logo" aria-label={brand.name}>
            <span className="label-header__logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="label-header__logo"
              src={withBase("/vekon-logo.png")}
              alt=""
              width={720}
              height={249}
              draggable={false}
              decoding="async"
            />
            <span className="label-header__logo-sub">Papers</span>
          </span>
          </Link>

          <div className="label-header__view-panel">
            <ViewSwitcher />
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
