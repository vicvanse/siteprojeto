"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Artifact } from "@/data/artifacts";
import { latestArtifact, publishedExtras } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { PENDING_GET_KEY } from "./pending-get";
import { AccessOverlay } from "./AccessOverlay";
import { CollectionGrid } from "./CollectionGrid";
import { FeaturedObject } from "./FeaturedObject";
import { SideHud } from "./Hud";
import { PapersIntro } from "./PapersIntro";
import { AcquireEffect, announceAcquired } from "./AcquireEffect";
import { ReleasesStrip } from "./ReleasesStrip";
import { VekonMarkBadge } from "./VekonMarkBadge";

type Props = {
  initial: Artifact;
  releases: Artifact[];
};

export function LabelStage({ initial, releases }: Props) {
  const { mode, setMode } = useViewMode();
  const { authenticated } = useAccess();
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

  /* Back from checkout: /?acquired=<id> plays the acquisition moment once. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("acquired");
    if (!id) return;
    params.delete("acquired");
    const rest = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${rest ? `?${rest}` : ""}`);
    const target = catalog.find((a) => a.id === id);
    if (target) window.setTimeout(() => announceAcquired(target), 600);
  }, [catalog]);

  /* Back from login with a pending GET: focus that object in Collection. */
  useEffect(() => {
    if (!authenticated) return;
    let pending: string | null = null;
    try {
      pending = localStorage.getItem(PENDING_GET_KEY);
      localStorage.removeItem(PENDING_GET_KEY);
    } catch {}
    const target = pending ? catalog.find((a) => a.id === pending) : undefined;
    if (!target) return;
    setActive(target);
    setMode("collection");
  }, [authenticated, catalog, setMode]);

  const fadeMs = reduceMotion ? 0 : 0.45;
  const numbers = catalog.map((a) => a.number).sort();
  const firstNo = numbers[numbers.length - 1] ?? "";
  const lastNo = numbers[0] ?? "";

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
              extras={publishedExtras}
              activeId={active.id}
              onSelect={select}
            />
          ) : (
            <>
              <FeaturedObject artifact={active} />
              <PapersIntro objectCount={catalog.length} />
              <ReleasesStrip
                artifacts={catalog}
                activeId={active.id}
                onSelect={select}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <SideHud first={firstNo} last={lastNo} />
      <footer className="site-mark">
        <VekonMarkBadge />
      </footer>
      <AccessOverlay />
      <AcquireEffect />
    </>
  );
}
