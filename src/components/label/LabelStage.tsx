"use client";

import { useCallback, useMemo, useState } from "react";
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
  const catalog = useMemo(() => {
    const byId = new Map<string, Artifact>();
    for (const artifact of [initial, ...releases]) {
      byId.set(artifact.id, artifact);
    }
    return Array.from(byId.values());
  }, [initial, releases]);
  const [active, setActive] = useState(() => latestArtifact(catalog));

  const select = useCallback((artifact: Artifact) => {
    setActive(artifact);
    /* After paint: open at top panel and scroll the page up to it. */
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("viewport")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }, []);

  return (
    <>
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
      <footer className="site-mark">
        <VekonMarkBadge />
      </footer>
      <AccessOverlay />
    </>
  );
}
