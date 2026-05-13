import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORDER = [
  "love-death-and-robots",
  "ichika-nito-away-official-music-video",
  "pina-2011",
  "channel-5-andrew-callaghan",
  "lamp-koibito-e-hirogaru-namida",
  "julie-feminine-adornments",
  "bonjr-its-ok-youre-ok",
  "blue-foundation-eyes-on-fire-official-music-video",
  "christian-loffler-ensemble-live-volksbuhne-berlin",
  "resilience-memory-reboot",
  "the-big-push",
  "vice-documentarios",
];

const d = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(d, "batch2-frags");
const out = path.join(d, "batch-2-tail.json");
const merged = {};
for (const key of ORDER) {
  const f = path.join(dir, `${key}.json`);
  if (!fs.existsSync(f)) {
    throw new Error(`Missing fragment: ${f}`);
  }
  merged[key] = JSON.parse(fs.readFileSync(f, "utf8"));
}
fs.writeFileSync(
  out,
  JSON.stringify(merged, null, 2) + "\n",
  "utf8",
);
console.log("Wrote", out, ORDER.length, "slugs (ordered).");
