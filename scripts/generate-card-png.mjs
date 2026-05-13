/**
 * Gera PNGs de preview a 300 dpi a partir dos SVG em public/print/.
 * Cartões: gabarito 92x52 mm (corte 88x48 mm, sangria 2 mm).
 */
import { readFileSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const printDir = join(root, "public", "print");
const outDir = join(printDir, "preview-png-300dpi");

const DPI = 300;
/** 92 mm @ 300 dpi */
const cardWidthPx = Math.round((92 / 25.4) * DPI);
const cardHeightPx = Math.round((52 / 25.4) * DPI);

const jobs = [
  { file: "card-front-vekon.svg", w: cardWidthPx },
  { file: "card-back-vekon.svg", w: cardWidthPx },
  { file: "card-front-victor.svg", w: cardWidthPx },
  { file: "card-back-victor.svg", w: cardWidthPx },
  { file: "vekon-symbol-clean.svg", w: 600 },
  { file: "victor-star-symbol.svg", w: 600 },
  { file: "qr-sugestoes.svg", w: 1024 },
];

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

for (const { file, w } of jobs) {
  const path = join(printDir, file);
  const svg = readFileSync(path, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: w },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const outName = file.replace(/\.svg$/i, ".png");
  writeFileSync(join(outDir, outName), pngBuffer);
  const img = pngData;
  console.log(
    "wrote",
    join("public/print/preview-png-300dpi", outName),
    `(${img.width}×${img.height})`,
  );
}

console.log(
  `Cartões rasterizados a ~300 dpi na largura de sangria (${cardWidthPx}×${cardHeightPx} px esperados para card-*.png).`,
);
