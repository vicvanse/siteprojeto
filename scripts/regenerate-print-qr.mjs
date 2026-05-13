/**
 * Gera public/print/qr-sugestoes.svg com URL que activa isSugestoesQrVisit (?ref=qr)
 * e copia o traçado para card-back-vekon.svg e card-back-victor.svg.
 *
 * Depois: npm run print:pdf && npm run print:png
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const printDir = join(root, "public", "print");

const SUGESTOES_QR_URL =
  "https://victorcorreard.com/victor/sugestoes?ref=qr";

const qrPath = join(printDir, "qr-sugestoes.svg");
await QRCode.toFile(qrPath, SUGESTOES_QR_URL, {
  type: "svg",
  width: 512,
  margin: 1,
  color: { dark: "#2a2a2a", light: "#fafafa" },
});
console.log("wrote", qrPath);

const qrSvg = readFileSync(qrPath, "utf8");
const m = qrSvg.match(/stroke="#2a2a2a" d="([^"]+)"/);
if (!m) throw new Error("Could not parse QR stroke path from generated SVG");
const d = m[1];

for (const name of ["card-back-vekon.svg", "card-back-victor.svg"]) {
  const p = join(printDir, name);
  let s = readFileSync(p, "utf8");
  s = s.replace(
    /stroke="#2a2a2a"\s+d="[^"]+"/,
    `stroke="#2a2a2a"\n      d="${d}"`,
  );
  writeFileSync(p, s);
  console.log("updated", name);
}
