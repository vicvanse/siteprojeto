"use client";

import { AccentSwatches } from "./AccentSwatches";
import { HeaderLivingRing } from "./HeaderLivingRing";
import { ViewSwitcher } from "./ViewSwitcher";

/**
 * Header: accent swatches · Vekon:Papers + View · living ring.
 * Brand sits left of Gallery/Collection on desktop; living ring stays as the right mark.
 */
export function LabelHeader() {
  return (
    <header className="label-header">
      <div className="label-header__row">
        <div className="label-header__stack">

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
