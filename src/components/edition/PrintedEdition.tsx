"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { Loupe } from "./Loupe";
import "./edition.css";
import { VekonWordmark } from "@/components/VekonWordmark";
import { VEKON_HOME_URL, withBase } from "@/lib/base-path";

type EditionLang = "en" | "pt";
type Mode = "spreads" | "sequence";

type Props = {
  /** Folder under /public/editions, e.g. "009". */
  id: string;
  /** Public object number shown in the bar (defaults to the folder id). */
  number?: string;
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
    pdf: string;
    back: string;
  }
> = {
  en: {
    edition: "Printed edition",
    sheet: "Sheet",
    spreads: "Spreads",
    sequence: "Sequence",
    note: "Hover a sheet to magnify it and scroll to change the zoom. On a phone, touch and hold. This is the edition exactly as printed.",
    pdf: "PDF ↓",
    back: "← Papers",
  },
  pt: {
    edition: "Edição impressa",
    sheet: "Folha",
    spreads: "Lado a lado",
    sequence: "Sequência",
    note: "Passe o mouse sobre a folha para ampliar e role para mudar o aumento. No celular, toque e segure. Esta é a edição exatamente como impressa.",
    pdf: "PDF ↓",
    back: "← Papers",
  },
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Sheets as designed (page images), side by side or in sequence. */
export function PrintedEdition({ id, number, title, sheets, langs, downloads }: Props) {
  const { language } = useLanguage();
  const [lang, setLang] = useState<EditionLang>(langs[0] ?? "en");
  const [mode, setMode] = useState<Mode>("spreads");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const wanted = (fromUrl ?? language) as EditionLang;
    if (langs.includes(wanted)) setLang(wanted);
  }, [language, langs]);

  const c = COPY[lang];
  const pages = Array.from({ length: sheets }, (_, i) => i + 1);
  const src = (n: number) => withBase(`/editions/${id}/${lang}-${n}.jpg`);
  const pdf = downloads?.[lang] ?? downloads?.en;

  return (
    <div className="edition">
      <header className="edition__bar">
        <div className="edition__left">
          <a className="edition__btn edition__back" href={withBase("/")}>
            {c.back}
          </a>
          <p className="edition__id">
            <span className="edition__dot" aria-hidden />
            <b>Object / {number ?? id}</b> · {title} · {c.edition}
          </p>
        </div>
        {/* Same black Vekon: Papers plate as the site header, for continuity. */}
        <a className="label-header__brand-panel edition__brand is-logo" href={VEKON_HOME_URL} aria-label="Vekon">
          <span className="label-header__logo-wrap">
            <VekonWordmark className="label-header__logo" />
            <span className="label-header__logo-sub">Papers</span>
          </span>
        </a>
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
          <div className="edition__seg edition__seg--mode" role="group" aria-label="View">
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
            <Loupe
              className="edition__page"
              hd={withBase(`/editions/${id}/${lang}-${n}-hd.webp`)}
              lo={src(n)}
              label={`${c.sheet} ${ROMAN[n - 1]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(n)}
                alt={`${title}, ${c.sheet} ${ROMAN[n - 1]}`}
                draggable={false}
              />
            </Loupe>
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

    </div>
  );
}
