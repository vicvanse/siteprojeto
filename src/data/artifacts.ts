export type ArtifactType =
  | "booklet"
  | "poster"
  | "deck"
  | "wallpaper"
  | "experiment"
  | "object";

/** Publication / collectible kind — drives Collection filters & CTAs. */
export type ArtifactKind = "booklet" | "essay" | "field-guide" | "extra";

export type ArtifactStatus = "available" | "free" | "incubating" | "archived";

export type ArtifactLang = "en" | "pt" | "es" | "fr" | "de" | "it" | "ja" | "ko";

/** How an OBJECT exists in Papers / Vekon — only set when not the default. */
export type ArtifactManifestation = "pdf" | "banner";

export type Artifact = {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  type: ArtifactType;
  kind: ArtifactKind;
  status: ArtifactStatus;
  price?: number;
  currency?: "BRL" | "USD";
  format?: string;
  pages?: number;
  releaseDate?: string;
  description?: string;
  version?: string;
  /** Edition languages available for this object. */
  languages?: ArtifactLang[];
  /**
   * Explicit manifestations when not the default
   * (publication → pdf, extra → banner).
   */
  manifestations?: ArtifactManifestation[];
  /**
   * Canonical Papers → Vekon link (publication only).
   * Inverse: relatedPublication(banner).
   */
  relatedBannerId?: string;
  /** Banner used as cover art (temporary stand-in). */
  cover?: string;
  /** Avatar overlaid on cover (temporary stand-in). */
  avatar?: string;
};

export const featuredArtifact: Artifact = {
  id: "001",
  slug: "youre-not-depressed",
  number: "001",
  title: "YOU'RE NOT DEPRESSED",
  subtitle: "YOU'RE JUST JOBLESS",
  type: "booklet",
  kind: "essay",
  status: "available",
  price: 7,
  currency: "BRL",
  format: "PDF",
  pages: 8,
  releaseDate: "26.10.26",
  version: "1.0",
  languages: ["en", "pt"],
  description:
    "Chapter one of a week that never clocks in. Eight pages on the gap between a mood and a calendar — mornings that feel like endings, inboxes that feel like weather, and the quiet math of being between jobs without calling it a crisis.",
  cover: "/covers/001-clover2.gif",
  avatar: "/avatars/001-cat.gif",
};

export const incubatingEgg: Artifact = {
  id: "002",
  slug: "unknown-object",
  number: "002",
  title: "UNKNOWN OBJECT",
  type: "experiment",
  kind: "booklet",
  status: "incubating",
  releaseDate: undefined,
};

/** Additional magazines — Vekon banners as covers for now. */
export const releaseArtifacts: Artifact[] = [
  {
    id: "003",
    slug: "late-shift-overpass",
    number: "003",
    title: "LATE SHIFT",
    subtitle: "OVERPASS NOTES",
    type: "booklet",
    kind: "essay",
    status: "available",
    price: 9,
    currency: "BRL",
    format: "PDF",
    pages: 12,
    releaseDate: "12.09.26",
    version: "1.0",
    languages: ["en", "pt", "es"],
    description:
      "Twelve pages from the concrete ledge after midnight. Trains below, neon above, and a notebook that only opens when the city thinks nobody is watching. Half reportage, half apology to whoever still waits for the last bus.",
    cover: "/covers/003-default2.gif",
    avatar: "/avatars/003-astro.gif",
  },
  {
    id: "004",
    slug: "violet-pasture",
    number: "004",
    title: "VIOLET HOUR",
    subtitle: "TWO SHEEP",
    type: "booklet",
    kind: "booklet",
    status: "available",
    price: 6,
    currency: "BRL",
    format: "PDF",
    pages: 6,
    releaseDate: "03.08.26",
    version: "1.0",
    languages: ["en", "pt"],
    description:
      "A short field chapter under a lavender sky. Two sheep, one fence, and the hour when the grass turns the color of bruises that heal. Six pages of quiet looking — almost a prayer, almost a joke.",
    cover: "/covers/004-landscape-roxo.gif",
    avatar: "/avatars/004-baker.gif",
  },
  {
    id: "005",
    slug: "pier-notes",
    number: "005",
    title: "PIER NOTES",
    subtitle: "LONG CAST",
    type: "booklet",
    kind: "essay",
    status: "available",
    price: 11,
    currency: "BRL",
    format: "PDF",
    pages: 16,
    releaseDate: "21.07.26",
    version: "1.0",
    languages: ["en"],
    description:
      "Sixteen pages of salt, rods, and the patience of not catching anything. Line in the water, phone in the pocket, stories from people who measure time in casts instead of clocks. A pier essay that refuses a clean ending.",
    cover: "/covers/005-pier.gif",
    avatar: "/avatars/005-croc.gif",
  },
  {
    id: "006",
    slug: "terrace-catalog",
    number: "006",
    title: "TERRACE",
    subtitle: "FROM BELOW",
    type: "booklet",
    kind: "essay",
    status: "available",
    price: 8,
    currency: "BRL",
    format: "PDF",
    pages: 10,
    releaseDate: "02.06.26",
    version: "1.0",
    languages: ["en", "pt"],
    description:
      "Skyline inventory written from under the overhang. Balconies, AC units, laundry flags — a catalog of lives stacked one floor at a time. Ten pages of looking up until your neck learns a new posture.",
    cover: "/covers/006-terrace.gif",
    avatar: "/avatars/006-blazer.gif",
  },
  {
    id: "007",
    slug: "towers-catalog",
    number: "007",
    title: "TOWERS",
    subtitle: "A FIELD CATALOG",
    type: "booklet",
    kind: "field-guide",
    status: "available",
    price: 8,
    currency: "BRL",
    format: "PDF",
    pages: 10,
    releaseDate: "18.05.26",
    version: "1.2",
    languages: ["en", "pt", "es", "fr"],
    description:
      "Soft towers, hard edges — a field guide to silhouettes that pretend to be architecture. Ten pages of naming what sticks out of the land when the light is wrong and the horizon won't stay still.",
    cover: "/covers/007-towers4.gif",
    avatar: "/avatars/003-astro.gif",
  },
  {
    id: "008",
    slug: "courtyard-gate",
    number: "008",
    title: "COURTYARD",
    subtitle: "THROUGH THE GATE",
    type: "booklet",
    kind: "booklet",
    status: "available",
    price: 7,
    currency: "BRL",
    format: "PDF",
    pages: 8,
    releaseDate: "04.05.26",
    version: "1.0",
    languages: ["en", "pt"],
    description:
      "Bars, a bicycle, and the light that still finds a way through. Eight pages from the wrong side of a gate — neighbors as silhouettes, afternoons as evidence, and the small politics of a shared courtyard.",
    cover: "/covers/008-courtyard.gif",
    avatar: "/avatars/004-baker.gif",
  },
  {
    id: "009",
    slug: "pasture-three",
    number: "009",
    title: "THREE HORSES",
    subtitle: "PASTURE STUDY",
    type: "booklet",
    kind: "booklet",
    status: "available",
    price: 9,
    currency: "BRL",
    format: "PDF",
    pages: 12,
    releaseDate: "22.04.26",
    version: "1.0",
    languages: ["en"],
    manifestations: ["pdf", "banner"],
    relatedBannerId: "b004",
    description:
      "Sunset field notes with three subjects who refuse to pose. Twelve pages on distance, muscle, and the color the grass becomes when the day finally gives up. A study that keeps circling the same fence.",
    cover: "/covers/009-pasture.gif",
    avatar: "/avatars/001-cat.gif",
  },
];

/** Banner / asset extras — not publications; counted separately. */
export const extraArtifacts: Artifact[] = [
  {
    id: "b004",
    slug: "banner-pasture-dusk",
    number: "004",
    title: "PASTURE / DUSK",
    type: "wallpaper",
    kind: "extra",
    status: "available",
    format: "PNG",
    releaseDate: "22.04.26",
    version: "1.0",
    languages: ["en"],
    description: "Wide pasture still — dusk light, fence line, three silhouettes.",
    cover: "/covers/009-pasture.gif",
  },
  {
    id: "b006",
    slug: "banner-terrace-edge",
    number: "006",
    title: "TERRACE EDGE",
    type: "wallpaper",
    kind: "extra",
    status: "available",
    format: "PNG",
    releaseDate: "02.06.26",
    version: "1.0",
    languages: ["en"],
    description: "Under-overhang crop — balconies stacked against evening sky.",
    cover: "/covers/006-terrace.gif",
  },
  {
    id: "b011",
    slug: "banner-night-walk",
    number: "011",
    title: "NIGHT WALK",
    type: "wallpaper",
    kind: "extra",
    status: "available",
    format: "PNG",
    releaseDate: "12.09.26",
    version: "1.0",
    languages: ["en"],
    description: "Overpass night still — neon spill, empty lane, long walk home.",
    cover: "/covers/003-default2.gif",
  },
];

/** Publications shown in Gallery / Releases. */
export const catalogArtifacts: Artifact[] = [
  featuredArtifact,
  ...releaseArtifacts,
];

/** Everything that can sit in a Collection (objects + extras). */
export const collectibleArtifacts: Artifact[] = [
  ...catalogArtifacts,
  ...extraArtifacts,
];

export function isPublication(artifact: Artifact) {
  return artifact.kind !== "extra";
}

export function isExtra(artifact: Artifact) {
  return artifact.kind === "extra";
}

/** Default: publication → pdf; banner/extra → banner. Override via `manifestations`. */
export function effectiveManifestations(
  artifact: Artifact,
): ArtifactManifestation[] {
  if (artifact.manifestations?.length) return artifact.manifestations;
  return isExtra(artifact) ? ["banner"] : ["pdf"];
}

export function hasManifestation(
  artifact: Artifact,
  kind: ArtifactManifestation,
) {
  return effectiveManifestations(artifact).includes(kind);
}

/** Publication → linked Vekon banner (canonical relatedBannerId). */
export function relatedBanner(
  artifact: Artifact,
  extras: Artifact[] = extraArtifacts,
): Artifact | undefined {
  if (!artifact.relatedBannerId) return undefined;
  return extras.find((e) => e.id === artifact.relatedBannerId);
}

/** Banner → publication that points at it (inverse of relatedBannerId). */
export function relatedPublication(
  banner: Artifact,
  publications: Artifact[] = catalogArtifacts,
): Artifact | undefined {
  return publications.find((p) => p.relatedBannerId === banner.id);
}

/** Highest object number — default featured on open. */
export function latestArtifact(
  artifacts: Artifact[] = catalogArtifacts,
): Artifact {
  return [...artifacts].sort((a, b) =>
    b.number.localeCompare(a.number, undefined, { numeric: true }),
  )[0]!;
}

export function formatPrice(artifact: Artifact) {
  if (artifact.status === "free") return "FREE";
  if (artifact.status === "incubating") return "—";
  if (artifact.price == null) return "—";
  if ((artifact.currency ?? "BRL") === "BRL") return `R$ ${artifact.price}`;
  return `US$ ${artifact.price.toFixed(2)}`;
}

export function kindLabel(kind: ArtifactKind): string {
  switch (kind) {
    case "essay":
      return "ESSAY";
    case "field-guide":
      return "FIELD GUIDE";
    case "extra":
      return "BANNER";
    default:
      return "BOOKLET";
  }
}

export function openActionLabel(kind: ArtifactKind): string {
  switch (kind) {
    case "essay":
      return "READ";
    case "field-guide":
      return "OPEN GUIDE";
    case "extra":
      return "DOWNLOAD ↓";
    default:
      return "VIEW";
  }
}

export function downloadActionLabel(kind: ArtifactKind): string {
  switch (kind) {
    case "essay":
      return "EDITION ↓";
    case "field-guide":
      return "PDF ↓";
    case "extra":
      return "DOWNLOAD ↓";
    default:
      return "PDF ↓";
  }
}
