/** Same hue set + palettes as Vekon Mudar estilo. */
export type AccentHue =
  | "blue"
  | "pink"
  | "yellow"
  | "green"
  | "red"
  | "purple"
  | "white"
  | "cyan"
  | "brown";

export type AccentPalette = {
  selected: string;
  selectedAlt: string;
  surfaceOdd: string;
  ring: string;
  ringSelected: string;
};

export const DEFAULT_ACCENT_HUE: AccentHue = "white";

/** Top row — classic Vekon set (no black). */
export const OFFICIAL_ACCENT_HUES: AccentHue[] = [
  "blue",
  "pink",
  "yellow",
  "green",
];

/** Bottom row — atelier set. */
export const ATELIER_ACCENT_HUES: AccentHue[] = [
  "red",
  "purple",
  "white",
  "cyan",
  "brown",
];

export const ACCENT_ORDER: AccentHue[] = [
  ...OFFICIAL_ACCENT_HUES,
  ...ATELIER_ACCENT_HUES,
];

export const ACCENT_ROWS: AccentHue[][] = [
  OFFICIAL_ACCENT_HUES,
  ATELIER_ACCENT_HUES,
];

/** Selected chrome border — same as Vekon Mudar estilo. */
export const STYLE_SELECTED = "#9e9e9e";

export const ACCENT_PALETTES: Record<AccentHue, AccentPalette> = {
  blue: {
    selected: "#434c5e",
    selectedAlt: "#344054",
    surfaceOdd: "#d3d7de",
    ring: "#9ca3af",
    ringSelected: "#1f2937",
  },
  red: {
    selected: "#5c2228",
    selectedAlt: "#4a1a20",
    surfaceOdd: "#deced1",
    ring: "#af9a9e",
    ringSelected: "#3a1218",
  },
  yellow: {
    selected: "#5e5743",
    selectedAlt: "#544e38",
    surfaceOdd: "#ded8d3",
    ring: "#afaa9c",
    ringSelected: "#37311f",
  },
  green: {
    selected: "#435e4c",
    selectedAlt: "#385443",
    surfaceOdd: "#d3ded7",
    ring: "#9caf9c",
    ringSelected: "#1f3725",
  },
  purple: {
    selected: "#4e435e",
    selectedAlt: "#443854",
    surfaceOdd: "#d7d3de",
    ring: "#a39caf",
    ringSelected: "#251f37",
  },
  pink: {
    selected: "#5e4354",
    selectedAlt: "#54384c",
    surfaceOdd: "#ded3da",
    ring: "#af9ca8",
    ringSelected: "#371f2d",
  },
  white: {
    selected: "#525252",
    selectedAlt: "#404040",
    surfaceOdd: "#f5f5f5",
    ring: "#d4d4d4",
    ringSelected: "#262626",
  },
  cyan: {
    selected: "#43585e",
    selectedAlt: "#384c54",
    surfaceOdd: "#d3dbde",
    ring: "#9ca8af",
    ringSelected: "#1f3337",
  },
  brown: {
    selected: "#5e4843",
    selectedAlt: "#544038",
    surfaceOdd: "#ded6cc",
    ring: "#afa49c",
    ringSelected: "#37291f",
  },
};

export function applyAccentToDocument(hue: AccentHue) {
  if (typeof document === "undefined") return;
  const palette = ACCENT_PALETTES[hue];
  const root = document.documentElement;
  root.dataset.accentHue = hue;
  root.style.setProperty("--conquest-fill", palette.selected);
  root.style.setProperty("--conquest-fill-alt", palette.selectedAlt);
  root.style.setProperty("--conquest-fill-ring", palette.ringSelected);
}
