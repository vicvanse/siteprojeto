import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Preview — cartões",
  robots: { index: false, follow: false },
};

const cards = [
  {
    id: "vekon",
    label: "Vekon + QR",
    front: "/print/card-front-vekon.svg",
    back: "/print/card-back-vekon.svg",
  },
  {
    id: "victor",
    label: "Estrela Victor + QR",
    front: "/print/card-front-victor.svg",
    back: "/print/card-back-victor.svg",
  },
] as const;

export default async function CartaoPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-[#e8e6e4] px-4 py-10 text-neutral-800">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="font-serif text-2xl tracking-tight text-neutral-900">
            Cartões — preview
          </h1>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-neutral-600">
            Gabarito alinhado a produto{" "}
            <span className="tabular-nums">88 × 48 mm</span> (ex.: FuturaIM):
            ficheiro com sangria{" "}
            <span className="tabular-nums">92 × 52 mm</span> (sangria{" "}
            <span className="tabular-nums">2 mm</span> por lado). Confirme sempre
            com o template oficial da gráfica (tombamento frente/verso, marcas de
            corte). Os cartões abaixo usam cantos arredondados só para ecrã; o
            envio final é rectangular (SVG/PDF).
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600">
            Os PDF gerados aqui são{" "}
            <span className="font-medium text-neutral-800">RGB</span> (PDFKit),{" "}
            <span className="font-medium text-neutral-800">não</span> são{" "}
            <span className="font-medium text-neutral-800">PDF/X-1a</span> nem
            CMYK — servem de base de tamanho/layout; se a gráfica pedir PDF/X-1a
            (ex. FuturaIM), reexporte no Illustrator ou Acrobat conforme{" "}
            <a
              className="text-neutral-900 underline underline-offset-2 hover:no-underline"
              href="/print/INSTRUCOES-PDF-X.txt"
            >
              INSTRUCOES-PDF-X.txt
            </a>
            .
          </p>
          <ul className="mt-3 list-inside list-disc text-sm text-neutral-600">
            <li>
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/vekon-symbol-clean.svg"
              >
                vekon-symbol-clean.svg
              </a>
              ,{" "}
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/victor-star-symbol.svg"
              >
                victor-star-symbol.svg
              </a>
            </li>
            <li>
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/qr-sugestoes.svg"
              >
                qr-sugestoes.svg
              </a>{" "}
              (QR isolado — ao gerar o código, use o URL com{" "}
              <code className="rounded bg-black/5 px-1">?ref=qr</code>, ex.:{" "}
              <code className="rounded bg-black/5 px-1">
                …/victor/sugestoes?ref=qr
              </code>
              , para mostrar o texto introdutório no formulário). Regenerar QR +
              versos:{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                npm run print:qr
              </code>
              , ou tudo:{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                npm run print:assets
              </code>
              .
            </li>
            <li>
              PDF para impressão (preview RGB, não PDF/X-1a):{" "}
              (cada página <span className="tabular-nums">92 × 52 mm</span>):{" "}
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/preview-pdf/card-vekon-print.pdf"
              >
                card-vekon-print.pdf
              </a>{" "}
              (pág. 1 frente, pág. 2 verso),{" "}
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/preview-pdf/card-victor-print.pdf"
              >
                card-victor-print.pdf
              </a>
              . PDFs só com uma face:{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                card-front-*.pdf
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                card-back-*.pdf
              </code>{" "}
              na mesma pasta. Regenerar:{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                npm run print:pdf
              </code>
            </li>
            <li>
              PNGs de preview (~300 dpi na largura, cartões ~1087×614 px):{" "}
              <a
                className="text-neutral-900 underline underline-offset-2 hover:no-underline"
                href="/print/preview-png-300dpi/card-front-vekon.png"
              >
                card-front-vekon.png
              </a>
              , etc. —{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
                npm run print:png
              </code>
            </li>
          </ul>
        </header>

        <div className="flex flex-col gap-14">
          {cards.map((set) => (
            <section key={set.id} aria-labelledby={`h-${set.id}`}>
              <h2
                id={`h-${set.id}`}
                className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500"
              >
                {set.label}
              </h2>
              <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-start">
                <figure className="flex flex-col items-center gap-2">
                  <div
                    className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                    style={{
                      width: "min(94vw, 280px)",
                      aspectRatio: "92 / 52",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={set.front}
                      alt={`Frente — ${set.label}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="text-center text-xs text-neutral-500">
                    Frente —{" "}
                    <a
                      href={set.front}
                      className="text-neutral-700 underline underline-offset-2"
                    >
                      SVG
                    </a>
                  </figcaption>
                </figure>
                <figure className="flex flex-col items-center gap-2">
                  <div
                    className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                    style={{
                      width: "min(94vw, 280px)",
                      aspectRatio: "92 / 52",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={set.back}
                      alt={`Verso — ${set.label}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="text-center text-xs text-neutral-500">
                    Verso —{" "}
                    <a
                      href={set.back}
                      className="text-neutral-700 underline underline-offset-2"
                    >
                      SVG
                    </a>
                  </figcaption>
                </figure>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
