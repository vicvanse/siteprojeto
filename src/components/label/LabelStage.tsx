"use client";

import { useCallback, useState } from "react";
import type { Artifact } from "@/data/artifacts";
import { FeaturedObject } from "./FeaturedObject";
import { ReleasesStrip } from "./ReleasesStrip";
import { VekonMarkBadge } from "./VekonMarkBadge";

type Props = {
  initial: Artifact;
  releases: Artifact[];
};

export function LabelStage({ initial, releases }: Props) {
  const [active, setActive] = useState(initial);
  const catalog = [initial, ...releases];

  const select = useCallback((artifact: Artifact) => {
    setActive(artifact);
    document.getElementById("viewport")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  return (
    <>
      <FeaturedObject artifact={active} />
      <ReleasesStrip
        artifacts={catalog}
        activeId={active.id}
        onSelect={select}
      />
      <footer className="site-mark">
        <VekonMarkBadge />
      </footer>
    </>
  );
}
