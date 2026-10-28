import { LabelStage } from "@/components/label/LabelStage";
import { catalogArtifacts, latestArtifact } from "@/data/artifacts";

export default function HomePage() {
  const initial = latestArtifact(catalogArtifacts);
  return (
    <LabelStage
      initial={initial}
      releases={catalogArtifacts.filter((a) => a.id !== initial.id)}
    />
  );
}
