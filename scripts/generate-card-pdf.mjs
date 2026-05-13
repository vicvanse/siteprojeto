/**
 * PDF 92x52 mm por pagina (corte 88x48 mm + sangria 2 mm).
 * - Ficheiros individuais por face
 * - PDFs de impressao: 2 paginas (frente, verso) por versao
 *
 * NAO e PDF/X-1a nem CMYK: e PDFKit (RGB). Graficas que exigem PDF/X-1a devem
 * receber ficheiro reexportado no Illustrator/Acrobat — ver
 * public/print/INSTRUCOES-PDF-X.txt
 */
import { createWriteStream, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const printDir = join(root, "public", "print");
const outDir = join(printDir, "preview-pdf");

function mmToPt(mm) {
  return (mm * 72) / 25.4;
}

const W_PT = mmToPt(92);
const H_PT = mmToPt(52);

const PDF_INFO_BASE = {
  Author: "victorcorreard.com",
  Subject:
    "RGB preview (not PDF/X-1a). See public/print/INSTRUCOES-PDF-X.txt for print shop export.",
  Keywords: "92x52mm bleed; 88x48mm trim; business card",
};

function stripXmlComments(s) {
  return s.replace(/<!--[\s\S]*?-->/g, "");
}

function loadSvg(name) {
  return stripXmlComments(readFileSync(join(printDir, name), "utf8"));
}

function renderPage(doc, svg) {
  SVGtoPDF(doc, svg, 0, 0, { width: W_PT, height: H_PT });
}

async function writePdfToFile(doc, outPath) {
  const stream = createWriteStream(outPath);
  doc.pipe(stream);
  doc.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const singles = [
  "card-front-vekon.svg",
  "card-back-vekon.svg",
  "card-front-victor.svg",
  "card-back-victor.svg",
];

for (const name of singles) {
  const svg = loadSvg(name);
  const doc = new PDFDocument({
    size: [W_PT, H_PT],
    margin: 0,
    autoFirstPage: true,
    info: {
      ...PDF_INFO_BASE,
      Title: name.replace(/\.svg$/i, ""),
    },
  });
  renderPage(doc, svg);
  const outPath = join(outDir, name.replace(/\.svg$/i, ".pdf"));
  await writePdfToFile(doc, outPath);
  console.log("wrote", join("public/print/preview-pdf", name.replace(/\.svg$/i, ".pdf")));
}

const pairs = [
  {
    out: "card-vekon-print.pdf",
    title: "Cartao Vekon — frente e verso",
    front: "card-front-vekon.svg",
    back: "card-back-vekon.svg",
  },
  {
    out: "card-victor-print.pdf",
    title: "Cartao Victor — frente e verso",
    front: "card-front-victor.svg",
    back: "card-back-victor.svg",
  },
];

for (const { out, title, front, back } of pairs) {
  const doc = new PDFDocument({
    size: [W_PT, H_PT],
    margin: 0,
    autoFirstPage: false,
    info: { ...PDF_INFO_BASE, Title: title },
  });
  doc.addPage({ size: [W_PT, H_PT], margin: 0 });
  renderPage(doc, loadSvg(front));
  doc.addPage({ size: [W_PT, H_PT], margin: 0 });
  renderPage(doc, loadSvg(back));
  const outPath = join(outDir, out);
  await writePdfToFile(doc, outPath);
  console.log("wrote", join("public/print/preview-pdf", out), "(pag.1 frente, pag.2 verso)");
}

console.log(
  `Tamanho por pagina: ${W_PT.toFixed(2)} x ${H_PT.toFixed(2)} pt (92 x 52 mm).`,
);
