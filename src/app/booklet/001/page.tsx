import type { Metadata } from "next";
import {
  CoverPage,
  MutumEssayPage,
  ObjectSpecimenPage,
  ReturnPage,
  UnnoticedPage,
  WaysOfSeeingPage,
} from "@/components/booklet/Booklet001Pages";
import { BookletViewer } from "@/components/booklet/BookletViewer";
import { BOOKLET_001 } from "@/data/booklet-001";

export const metadata: Metadata = {
  title: "Booklet 001 — O mundo que estava lá",
  description:
    "Preview editorial A5: Papers / Booklet 001 · Object 009 · Three Horses.",
};

export default function Booklet001Page() {
  return (
    <BookletViewer
      code={BOOKLET_001.code}
      objectLabel={`OBJECT / ${BOOKLET_001.object.id} · ${BOOKLET_001.object.title}`}
    >
      <CoverPage />
      <ObjectSpecimenPage />
      <MutumEssayPage />
      <UnnoticedPage />
      <WaysOfSeeingPage />
      <ReturnPage />
    </BookletViewer>
  );
}
