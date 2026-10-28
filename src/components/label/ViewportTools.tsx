"use client";

import { AccentSwatches } from "./AccentSwatches";

/**
 * Language + accent controls.
 * Desktop: hidden (header owns them). Mobile: sits at the foot of the grey viewport panel.
 */
export function ViewportTools() {
  return (
    <div className="viewport__tools">
      <AccentSwatches />
    </div>
  );
}
