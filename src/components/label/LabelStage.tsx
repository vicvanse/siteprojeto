"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Artifact } from "@/data/artifacts";
import { extraArtifacts, latestArtifact } from "@/data/artifacts";
import { useViewMode } from "@/components/ViewModeProvider";
import { AccessOverlay } from "./AccessOverlay";
import { CollectionGrid } from "./CollectionGrid";
import { FeaturedObject } from "./FeaturedObject";
import { ReleasesStrip } from "./ReleasesStrip";
import { VekonMarkBadge } from "./VekonMarkBadge";

type Props = {
  initial: Artifact;
  releases: Artifact[];
};

export function LabelStage({ initial, releases }: Props) {
  const { mode } = useViewMode();
  const reduceMotion = useReducedMotion();
  const catalog = useMemo(() => {
    const byId = new Map<string, Artifact>();
    for (const artifact of [initial, ...releases]) {
      byId.set(artifact.id, artifact);
    }
    return Array.from(byId.values());
  }, [initial, releases]);
  const [active, setActive] = useState(() => latestArtifact(catalog));

  const select = useCallback(
    (artifact: Artifact) => {
      setActive(artifact);
      const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
      const scrollUp = () => window.scrollTo({ top: 0, behavior });
      /* After paint, and again after Gallery↔Collection fade if mode changes. */
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollUp);
      });
      window.setTimeout(scrollUp, reduceMotion ? 0 : 480);
    },
    [reduceMotion],
  );

  const fadeMs = reduceMotion ? 0 : 0.45;

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          className="label-stage__view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeMs, ease: [0.4, 0, 0.2, 1] }}
        >
          {mode === "collection" ? (
            <CollectionGrid
              artifacts={catalog}
              extras={extraArtifacts}
              activeId={active.id}
              onSelect={select}
            />
          ) : (
            <>
              <FeaturedObject artifact={active} />
              <ReleasesStrip
                artifacts={catalog}
                activeId={active.id}
                onSelect={select}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <footer className="site-mark">
        <VekonMarkBadge />
      </footer>
      <AccessOverlay />
    </>
  );
}
