"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import "./edition.css";

type EditionLang = "en" | "pt";
type Mode = "spreads" | "sequence";

type Props = {
  /** Folder under /public/editions, e.g. "009". */
  id: string;
  title: string;
  sheets: number;
  /** Edition languages that have page images. */
  langs: EditionLang[];
  /** PDF per language, offered as download. */
  downloads?: Partial<Record<EditionLang, string>>;
};

const COPY: Record<
  EditionLang,
  {
    edition: string;
    sheet: string;
    spreads: string;
    sequence: string;
    note: string;
    close: string;
    pdf: string;
    back: string;
  }
> = {
  en: {
    edition: "Printed edition",
    sheet: "Sheet",
    spreads: "Spreads",
    sequence: "Sequence",
    note: "Click a sheet to see it at full size. This is the edition exactly as printed.",
    close: "Close ×",
    pdf: "PDF ↓",
    back: "← Papers",
  },
  pt: {
    edition: "Edição impressa",
    sheet: "Folha",
    spreads: "Lado a lado",
    sequence: "Sequência",
    note: "Clique numa folha para ver em tamanho real. Esta é a edição exatamente como impressa.",
    close: "Fechar ×",
    pdf: "PDF ↓",
    back: "← Papers",
  },
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Sheets as designed (page images), side by side or in sequence. */
export function PrintedEdition({ id, title, sheets, langs, downloads }: Props) {
  const { language } = useLanguage();
  const [lang, setLang] = useState<EditionLang>(langs[0] ?? "en");
  const [mode, setMode] = useState<Mode>("spreads");
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const wanted = (fromUrl ?? language) as EditionLang;
    if (langs.includes(wanted)) setLang(wanted);
  }, [language, langs]);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  const c = COPY[lang];
  const pages = Array.from({ length: sheets }, (_, i) => i + 1);
  const src = (n: number) => `/editions/${id}/${lang}-${n}.jpg`;
  const pdf = downloads?.[lang] ?? downloads?.en;

  return (
    <div className="edition">
      <header className="edition__bar">
        <a className="edition__btn" href="/">
          {c.back}
        </a>
        <p className="edition__id">
          <span className="edition__dot" aria-hidden />
          <b>Object / {id}</b> · {title} · {c.edition}
        </p>
        <div className="edition__controls">
          {langs.length > 1 ? (
            <div className="edition__seg" role="group" aria-label="Language">
              {langs.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          ) : null}
          <div className="edition__seg" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed={mode === "spreads"}
              onClick={() => setMode("spreads")}
            >
              {c.spreads}
            </button>
            <button
              type="button"
              aria-pressed={mode === "sequence"}
              onClick={() => setMode("sequence")}
            >
              {c.sequence}
            </button>
          </div>
          {pdf ? (
            <a className="edition__btn edition__btn--dark" href={pdf} download>
              {c.pdf}
            </a>
          ) : null}
        </div>
      </header>

      <main className="edition__stage" data-mode={mode}>
        {pages.map((n) => (
          <figure key={n} className="edition__sheet">
            <button
              type="button"
              className="edition__page"
              onClick={() => setZoom(n)}
              aria-label={`${c.sheet} ${ROMAN[n - 1]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(n)} alt={`${title}, ${c.sheet} ${ROMAN[n - 1]}`} />
            </button>
            <figcaption className="edition__cap">
              <span>
                {c.sheet} {ROMAN[n - 1]} / {ROMAN[sheets - 1]}
              </span>
              <span>A4</span>
            </figcaption>
          </figure>
        ))}
      </main>
      <p className="edition__note">{c.note}</p>

      {zoom !== null ? (
        <div
          className="edition__zoom"
          role="dialog"
          aria-label={`${c.sheet} ${ROMAN[zoom - 1]}`}
          onClick={() => setZoom(null)}
        >
          <button type="button" className="edition__btn edition__close" autoFocus>
            {c.close}
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(zoom)} alt="" />
        </div>
      ) : null}
    </div>
  );
}
