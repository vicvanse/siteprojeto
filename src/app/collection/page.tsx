"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccess } from "@/components/AccessProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { LabelStage } from "@/components/label/LabelStage";
import { catalogArtifacts, latestArtifact } from "@/data/artifacts";

/** Direct Collection entry — opens overlay if identification is still required. */
export default function CollectionPage() {
  const router = useRouter();
  const { setMode } = useViewMode();
  const { ready, authenticated, openOverlay } = useAccess();
  const initial = latestArtifact(catalogArtifacts);

  useEffect(() => {
    if (!ready) return;
    setMode("collection");
    if (!authenticated) openOverlay("form");
    router.replace("/?view=collection");
  }, [ready, authenticated, openOverlay, setMode, router]);

  return (
    <LabelStage
      initial={initial}
      releases={catalogArtifacts.filter((a) => a.id !== initial.id)}
    />
  );
}
