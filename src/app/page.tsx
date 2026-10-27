import { LabelStage } from "@/components/label/LabelStage";
import { featuredArtifact, releaseArtifacts } from "@/data/artifacts";

export default function HomePage() {
  return (
    <LabelStage initial={featuredArtifact} releases={releaseArtifacts} />
  );
}
