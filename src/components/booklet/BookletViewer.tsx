"use client";

import { Children, useState, type ReactNode } from "react";
import "./booklet.css";

type Mode = "sequence" | "spreads";

type Props = {
  code: string;
  objectLabel: string;
  children: ReactNode;
};

export function BookletViewer({ code, objectLabel, children }: Props) {
  const [mode, setMode] = useState<Mode>("spreads");
  const pages = Children.toArray(children);

  const spreads: ReactNode[][] = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push(pages.slice(i, i + 2));
  }

  return (
    <div className="booklet-desk" data-mode={mode}>
      <header className="booklet-desk__bar">
        <div className="booklet-desk__identity">
          <p className="booklet-desk__meta">
            <a href="/">← Papers</a>
            <span className="booklet-desk__sep" aria-hidden>
              /
            </span>
            <span>{code}</span>
          </p>
          <p className="booklet-desk__object">{objectLabel}</p>
        </div>

        <div className="booklet-desk__controls">
          <p className="booklet-desk__note">A5 · 148 × 210 mm · 6 / 16</p>
          <div className="booklet-desk__modes" role="group" aria-label="Visualização">
            <button
              type="button"
              className={`booklet-desk__mode${mode === "sequence" ? " booklet-desk__mode--active" : ""}`}
              aria-pressed={mode === "sequence"}
              onClick={() => setMode("sequence")}
            >
              Sequência
            </button>
            <button
              type="button"
              className={`booklet-desk__mode${mode === "spreads" ? " booklet-desk__mode--active" : ""}`}
              aria-pressed={mode === "spreads"}
              onClick={() => setMode("spreads")}
            >
              Spreads
            </button>
          </div>
        </div>
      </header>

      {mode === "sequence" ? (
        <div className="booklet-flow">
          {pages.map((page, i) => (
            <div key={`page-${i}`} className="booklet-flow__item">
              {page}
            </div>
          ))}
        </div>
      ) : (
        <div className="booklet-flow booklet-flow--spreads">
          {spreads.map((pair, i) => (
            <div key={`spread-${i}`} className="booklet-spread">
              {pair.map((page, j) => (
                <div key={`spread-${i}-${j}`} className="booklet-spread__page">
                  {page}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
