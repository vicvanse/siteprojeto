"use client";

import { useCallback, useState } from "react";
import type { Artifact } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
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
  const { authenticated, owns } = useAccess();
  const [active, setActive] = useState(initial);
  const [openedFromCollection, setOpenedFromCollection] = useState(false);
  const catalog = [initial, ...releases];

  const select = useCallback((artifact: Artifact) => {
    setActive(artifact);
    document.getElementById("viewport")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  const openOwned = useCallback((artifact: Artifact) => {
    setActive(artifact);
    setOpenedFromCollection(true);
    window.requestAnimationFrame(() => {
      document.getElementById("viewport")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, []);

  const showCollectionReader =
    mode === "collection" &&
    authenticated &&
    openedFromCollection &&
    owns(active.id);

  return (
    <>
      {mode === "collection" ? (
        <>
          <CollectionGrid artifacts={catalog} onOpenOwned={openOwned} />
          {showCollectionReader ? <FeaturedObject artifact={active} /> : null}
        </>
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
      <footer className="site-mark">
        <VekonMarkBadge />
      </footer>
      <AccessOverlay />
    </>
  );
}
