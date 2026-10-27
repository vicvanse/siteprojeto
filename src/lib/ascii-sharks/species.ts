export interface Species {
  name: string;
  cruise: number;
  maxSpeed: number;
  minSpeed: number;
  /** Relative odds of a new school being this species. */
  weight: number;
  schoolSize: [number, number];
  /** Personal space in grid cells (x, y), so every fish gets its own glyph. */
  spacing: [number, number];
  // Behaviour weights. Different mixes produce different collective shapes
  // (Couzin et al. 2002): strong alignment gives polarised schools and
  // ribbons, low alignment gives swarms, and a tangential pull gives a mill.
  align: number;
  cohesion: number;
  jitter: number;
  /** Tangential pull around the local centre: >0 makes a rotating bait ball. */
  mill: number;
  /** Damps vertical speed; real fish mostly cruise level. */
  verticalDrag: number;
}

/** Pond / open-water schools — no predators. Sardines school; koi wander as small groups. */
export const SPECIES: Species[] = [
  {
    name: "sardine",
    cruise: 36,
    maxSpeed: 64,
    minSpeed: 18,
    weight: 5,
    schoolSize: [16, 26],
    spacing: [1.8, 1.1],
    align: 1.8,
    cohesion: 1.7,
    jitter: 35,
    mill: 55,
    verticalDrag: 0.5,
  },
  {
    name: "koi",
    cruise: 22,
    maxSpeed: 42,
    minSpeed: 10,
    weight: 2,
    schoolSize: [3, 6],
    spacing: [3.2, 2.0],
    align: 0.6,
    cohesion: 1.1,
    jitter: 55,
    mill: 20,
    verticalDrag: 0.8,
  },
];

const TOTAL_WEIGHT = SPECIES.reduce((sum, s) => sum + s.weight, 0);

export function pickSpecies() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (let i = 0; i < SPECIES.length; i++) {
    r -= SPECIES[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}
