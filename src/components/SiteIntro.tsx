"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LivingRingMark } from "@/components/label/LivingRingMark";

/**
 * Page enter. First visit in a session: the ring rises out of the surface
 * (inset → raised), then the cover lifts while the panels rise in sequence.
 * Later visits: no cover, only the quick panel rise.
 * html[data-enter] is set by the boot script in layout.tsx before first paint.
 */
export function SiteIntro() {
  const [phase, setPhase] = useState<"play" | "done">("play");

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    const root = document.documentElement;
    /* Drop the enter flag once the rise is over, so Gallery↔Collection
       switches don't replay it. */
    const clearAt = window.setTimeout(() => {
      delete root.dataset.enter;
    }, 2600);
    if (root.dataset.enter === "quick") {
      setPhase("done");
      return () => window.clearTimeout(clearAt);
    }
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("done");
    };

    /* Ring rises ~0.9s, cover lifts at ~1.05s (0.35s fade) */
    const doneAt = window.setTimeout(finish, 1050);
    const safetyAt = window.setTimeout(finish, 3000);

    return () => {
      window.clearTimeout(doneAt);
      window.clearTimeout(safetyAt);
      window.clearTimeout(clearAt);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === "play" ? (
        <motion.div
          key="site-intro"
          className="site-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        >
          <motion.div
            className="site-intro__mark"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="site-intro__disc">
              <LivingRingMark className="site-intro__ring" />
            </span>
            <p className="site-intro__caption">Papers</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
