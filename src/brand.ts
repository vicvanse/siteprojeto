/** Working label identity — swap without touching page structure. */
export const brand = {
  name: "Vekon: Papers",
  /** Stacked mark in the header pill — keeps View/Collection from overflowing on mobile. */
  nameLines: ["Vekon:", "Papers"] as const,
  tagline: "a Vekon project",
  statement: "Objects, by design",
  yearStart: 2026,
  vekonUrl: "https://www.vekonlife.com",
  currency: "BRL" as const,
  locale: "pt-BR",
} as const;
