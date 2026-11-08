import type { Metadata } from "next";
import { PrintedEdition } from "@/components/edition/PrintedEdition";

export const metadata: Metadata = {
  title: "Manifesto · Printed edition",
  description:
    "What Remains of the Journey / O Que Fica da Jornada. Object 001, two sheets in one blue ink.",
};

export default function Edition001Page() {
  return (
    <PrintedEdition
      id="009"
      number="001"
      title="Manifesto"
      sheets={2}
      langs={["en", "pt"]}
      downloads={{
        en: "/downloads/what-remains-of-the-journey-en.pdf",
        pt: "/downloads/o-que-fica-da-jornada-pt.pdf",
      }}
    />
  );
}
