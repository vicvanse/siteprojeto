"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LivingRingMark } from "@/components/label/LivingRingMark";

/**
 * Page enter — Durarara-style hold: mark fades in, rests, overlay lifts.
 * Living ring is the mark (no word roulette).
 */
export function SiteIntro() {
  const [phase, setPhase] = useState<"boot" | "play" | "done">("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = "";
      setPhase("done");
    };

    setPhase("play");
    document.body.style.overflow = "hidden";

    /* Fade in ~0.45s + hold ~1s + exit starts — total ~1.82s before gone (70%) */
    const doneAt = window.setTimeout(finish, 1820);
    const safetyAt = window.setTimeout(finish, 3500);

    return () => {
      window.clearTimeout(doneAt);
      window.clearTimeout(safetyAt);
      document.body.style.overflow = "";
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
          transition={{ duration: 0.525, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            className="site-intro__mark"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.455, ease: [0.22, 1, 0.36, 1] }}
          >
            <LivingRingMark className="site-intro__ring" />
            <p className="site-intro__caption">Papers</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
