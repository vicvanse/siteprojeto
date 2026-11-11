"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, LANGUAGE_NAMES, type Language } from "@/lib/i18n";
import { withBase } from "@/lib/base-path";
import { LivingRingMark } from "@/components/label/LivingRingMark";
import "./vekon-home.css";

/*
 * Links into Vekon Life (/landing, /auth/login) leave this app, so they are
 * plain <a> with absolute paths: next/link would prefix them with /papers.
 */

/** Deterministic barcode bars (same idea as the Papers HUD). */
function bars(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 118) {
    h = (h * 1103515245 + 12345) >>> 0;
    const w = 1 + ((h >>> 16) % 3);
    const gap = 1 + ((h >>> 20) % 3);
    if (x + w > 120) break;
    out.push({ x, w });
    x += w + gap;
  }
  return out;
}

function Barcode({ seed, label }: { seed: string; label: string }) {
  return (
    <div className="vh-code" aria-hidden>
      <svg width="120" height="20" fill="currentColor">
        {bars(seed).map((b) => (
          <rect key={b.x} x={b.x} width={b.w} height={20} />
        ))}
      </svg>
      <span>{label}</span>
    </div>
  );
}

const DAY_WORD: Record<Language, string> = {
  en: "Day", pt: "Dia", es: "Día", de: "Tag", fr: "Jour", it: "Giorno",
  ja: "日", ko: "일", "zh-CN": "第", "zh-TW": "第",
} as Record<Language, string>;

/** Today's date, as a diary page header: weekday · day month year / day N of the year. */
function TodayLine() {
  const { language } = useLanguage();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return <div className="vh-bar__meta" aria-hidden />;
  const loc = language as string;
  const weekday = new Intl.DateTimeFormat(loc, { weekday: "short" }).format(now).replace(/\.$/, "");
  const date = new Intl.DateTimeFormat(loc, { day: "numeric", month: "short", year: "numeric" }).format(now).replace(/\./g, "");
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000) + 1;
  const leap = new Date(now.getFullYear(), 1, 29).getMonth() === 1;
  const total = leap ? 366 : 365;
  const word = DAY_WORD[language] ?? "Day";
  const dayLabel = /^zh/.test(loc) ? `${word} ${dayOfYear} 天` : /^(ja|ko)$/.test(loc) ? `${dayOfYear}${word}` : `${word} ${dayOfYear}`;
  return (
    <time className="vh-bar__meta" dateTime={now.toISOString().slice(0, 10)}>
      <span className="vh-dot" aria-hidden />
      {weekday} · {date}
      <br />
      {dayLabel} / {total}
    </time>
  );
}

function LangSelect() {
  const { t, language, setLanguage } = useLanguage();
  return (
    <label className="vh-lang">
      <span className="vh-sr">{t("language")}</span>
      <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
        {LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

export function VekonHome() {
  const { t } = useLanguage();

  return (
    <div className="vekon-home">
      <div className="vh-side vh-side--left" aria-hidden>
        VEKON — INDEX — 2026
      </div>
      <div className="vh-side vh-side--right" aria-hidden>
        LIFE · PAPERS — OBSERVE BEFORE INTERPRETING
      </div>

      <header className="vh-bar">
        <TodayLine />
        <span className="vh-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/vekon-logo.png")} alt="Vekon" width={720} height={249} draggable={false} />
        </span>
        <div className="vh-bar__end">
          <nav className="vh-jump" aria-label="Vekon">
            <a href="/landing">Life</a>
            <Link href="/">Papers</Link>
          </nav>
          <LangSelect />
        </div>
      </header>

      <section className="vh-hero" aria-labelledby="vh-title" style={{ ["--i" as string]: 1 }}>
        <div className="vh-hero__top" aria-hidden>
          <span className="vh-pill">INDEX / 000</span>
          <Barcode seed="vekon-000" label="VKN-000 · 2026" />
        </div>
        <div className="vh-hero__grid">
          <div className="vh-hero__text">
            <p className="vh-label">
              <span className="vh-dot" aria-hidden />
              {t("home.kicker")}
            </p>
            <h1 id="vh-title" className="vh-title">
              {t("home.title")}
            </h1>
            <p className="vh-body">{t("home.body")}</p>
            <ul className="vh-facts" aria-hidden>
              <li>02 doors</li>
              <li>Life · Papers</li>
              <li>Memory · Personas</li>
            </ul>
          </div>
          <figure className="vh-mark">
            <div className="vh-mark__well">
              <span className="vh-mark__disc">
                <LivingRingMark className="vh-mark__ring" />
              </span>
            </div>
            <figcaption aria-hidden>
              <span>LIVING RING</span>
              <span>V-000</span>
              <span>1:1</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <p className="vh-doors-label" style={{ ["--i" as string]: 2 }}>
        <span className="vh-dot" aria-hidden />
        {t("home.doors")}
      </p>

      <div className="vh-doors">
        <article className="vh-door vh-door--life" style={{ ["--i" as string]: 2 }}>
          <div className="vh-door__top" aria-hidden>
            <span className="vh-pill">DOOR / 01</span>
            <span className="vh-door__route">/landing</span>
          </div>
          <div className="vh-door__well vh-door__well--dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/vekon-life-icon.png")} alt="" width={180} height={180} draggable={false} />
          </div>
          <div className="vh-door__head">
            <span className="vh-door__icon vh-door__icon--dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase("/vekon-life-icon.png")} alt="" width={56} height={56} draggable={false} />
            </span>
            <div>
              <p className="vh-door__kind">{t("home.life.label")}</p>
              <h2 className="vh-door__name">
                <span>Vekon</span> Life
              </h2>
            </div>
          </div>
          <p className="vh-door__body">{t("home.life.body")}</p>
          <div className="vh-door__actions">
            <a className="vh-btn vh-btn--soft" href="/landing">
              {t("home.life.learn")}
            </a>
            <a className="vh-btn vh-btn--dark" href="/auth/login">
              {t("home.life.enter")} <span aria-hidden>→</span>
            </a>
          </div>
        </article>

        <article className="vh-door vh-door--papers" style={{ ["--i" as string]: 3 }}>
          <div className="vh-door__top" aria-hidden>
            <span className="vh-pill">DOOR / 02</span>
            <span className="vh-door__route">/papers</span>
          </div>
          <div className="vh-door__well">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/vekon-papers-icon.png")} alt="" width={180} height={180} draggable={false} />
          </div>
          <div className="vh-door__head">
            <span className="vh-door__icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase("/vekon-papers-icon.png")} alt="" width={56} height={56} draggable={false} />
            </span>
            <div>
              <p className="vh-door__kind">{t("home.papers.label")}</p>
              <h2 className="vh-door__name">
                <span>Vekon:</span> Papers
              </h2>
            </div>
          </div>
          <p className="vh-door__body">{t("home.papers.body")}</p>
          <div className="vh-door__actions">
            <Link className="vh-btn vh-btn--dark" href="/">
              {t("home.papers.open")} <span aria-hidden>→</span>
            </Link>
          </div>
        </article>
      </div>

      <p className="vh-foot">Vekon · Memory · Personas</p>
    </div>
  );
}
