"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, LANGUAGE_INITIALS, LANGUAGE_NAMES, type Language } from "@/lib/i18n";
import { withBase } from "@/lib/base-path";
import { ACCENT_PALETTES, ACCENT_ORDER, type AccentHue } from "@/lib/accent";
import { LivingRingMark } from "@/components/label/LivingRingMark";
import { useAccent } from "@/components/AccentProvider";
import "./vekon-home.css";

/*
 * Links into Vekon Life (/landing, /auth/login) leave this app, so they are
 * plain <a> with absolute paths: next/link would prefix them with /papers.
 * Papers links are plain <a> too, so moving between Vekon and Papers is a full
 * page load and the cross-document view transition (soft.css) plays.
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

/** First day of Vekon (local midnight). */
const VEKON_DAY_ONE = new Date(2026, 10, 11);

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
  /* Day N of Vekon, counted from the first day (Nov 11, 2026 = Day 1), local time. */
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const vekonDay = Math.round((today.getTime() - VEKON_DAY_ONE.getTime()) / 86_400_000) + 1;
  const word = DAY_WORD[language] ?? "Day";
  const dayLabel = /^zh/.test(loc) ? `${word} ${vekonDay} 天` : /^(ja|ko)$/.test(loc) ? `${vekonDay}${word}` : `${word} ${vekonDay}`;
  return (
    <time className="vh-bar__meta" dateTime={now.toISOString().slice(0, 10)}>
      <span className="vh-dot" aria-hidden />
      {weekday} · {date}
      <br />
      Vekon · {dayLabel}
    </time>
  );
}

/** Arriving at Papers or the Life landing from here plays the Living Ring entrance. */
function markDoor() {
  try {
    sessionStorage.setItem("vekon-door", "1");
  } catch {
    /* storage unavailable: no entrance, navigation still works */
  }
}

/** Mobile: the language as a single circle (initials), like the Papers header. */
function LangCircle() {
  const { t, language, setLanguage } = useLanguage();
  return (
    <label className="vh-langdot" title={LANGUAGE_NAMES[language]}>
      <span aria-hidden>{LANGUAGE_INITIALS[language]}</span>
      <select aria-label={t("language")} value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
        {LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Mobile header: the Papers color, beside the language. Tap to open the
 *  colors (same choice as in Papers). */
function ColorDot() {
  const { hue, setHue, ready } = useAccent();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  const swatch = (h: AccentHue) => ({
    background: ACCENT_PALETTES[h].selected,
  });
  return (
    <span className="vh-colordot" ref={ref}>
      <button type="button" className="vh-colordot__btn" aria-label="Color" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="vh-colordot__chip" style={ready ? swatch(hue) : undefined} />
      </button>
      {open ? (
        <span className="vh-colordot__tray" role="listbox" aria-label="Color">
          {ACCENT_ORDER.map((h) => (
            <button
              key={h}
              type="button"
              role="option"
              aria-selected={h === hue}
              aria-label={h}
              className={`vh-colordot__opt${h === hue ? " is-on" : ""}`}
              onClick={() => {
                setHue(h);
                setOpen(false);
              }}
            >
              <span className="vh-colordot__chip" style={swatch(h)} />
            </button>
          ))}
        </span>
      ) : null}
    </span>
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

/** Two different Papers colors, drawn at random on each visit (mobile button tint). */
function useDoorColors() {
  const [colors, setColors] = useState<[string, string] | null>(null);
  useEffect(() => {
    const pool = ACCENT_ORDER.filter((h) => h !== "white").map((h) => ACCENT_PALETTES[h].selected);
    const a = Math.floor(Math.random() * pool.length);
    let b = Math.floor(Math.random() * (pool.length - 1));
    if (b >= a) b += 1;
    setColors([pool[a], pool[b]]);
  }, []);
  return colors;
}

/** The word that gets the pencil strike-through, per language. */
const FORGET_WORD: Record<string, string> = {
  en: "forget", pt: "esquecer", es: "olvidarás", de: "vergessen", fr: "oublierez",
  it: "dimenticherai", ja: "忘れ", ko: "잊게", "zh-CN": "忘记", "zh-TW": "忘記", zh: "忘记",
};

/**
 * The about text in two voices: the first sentence as a handwritten-feeling
 * serif headline (with "forget" struck through in pencil), then Vekon's
 * answer, smaller and quieter.
 */
function AboutLines({ text, lang }: { text: string; lang: string }) {
  const cut = text.indexOf("Vekon");
  const head = (cut > 0 ? text.slice(0, cut) : text).trim();
  const tail = cut > 0 ? text.slice(cut).trim() : "";
  const word = FORGET_WORD[lang] ?? FORGET_WORD[lang.split("-")[0]] ?? "";
  const at = word ? head.indexOf(word) : -1;
  return (
    <>
      <span className="vh-body-head">
        {at < 0 ? (
          head
        ) : (
          <>
            {head.slice(0, at)}
            <span className="vh-forget">
              {word}
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <path
                  className="vh-forget__line"
                  pathLength={1}
                  d="M2 12 C 14 8, 22 15, 34 10 S 56 7, 66 12 S 86 13, 98 8"
                />
              </svg>
            </span>
            {head.slice(at + word.length)}
          </>
        )}
      </span>
      {tail ? <span className="vh-body-tail">{tail}</span> : null}
    </>
  );
}

/**
 * Mobile: the blocks below the Living Ring rise into place as they scroll in,
 * one at a time, instead of all animating on load out of sight.
 */
function useScrollReveal() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".vekon-home .vh-projects, .vekon-home .vh-door, .vekon-home .vh-rule, .vekon-home .vh-flame, .vekon-home .vh-mark--m, .vekon-home .vh-seal",
      ),
    );
    const fold = window.innerHeight * 0.92;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    for (const el of els) {
      // Already on screen at load: leave it to the entrance animation.
      if (el.getBoundingClientRect().top < fold) continue;
      el.classList.add("vh-reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
}

export function VekonHome() {
  const { t, language: lang } = useLanguage();
  useScrollReveal();
  const doorColors = useDoorColors();
  /* The color picked in Papers (same site, so the same saved choice). */
  const { hue, ready: accentReady } = useAccent();
  const papersAccent = accentReady ? ACCENT_PALETTES[hue] : null;

  return (
    <div
      className="vekon-home"
      style={
        {
          ...(doorColors ? { ["--door-a" as string]: doorColors[0], ["--door-b" as string]: doorColors[1] } : {}),
          ...(papersAccent
            ? { ["--papers-accent" as string]: papersAccent.selected, ["--papers-accent-soft" as string]: papersAccent.surfaceOdd }
            : {}),
        } as CSSProperties
      }
    >
      <div className="vh-side vh-side--left" aria-hidden>
        VEKON · MEMORY · PERSONAS
      </div>
      <div className="vh-side vh-side--right" aria-hidden>
        LIFE · PAPERS — OBSERVE BEFORE INTERPRETING
      </div>

      <header className="vh-bar">
        {/* Mobile: the language as a circle in the top-left corner */}
        <span className="vh-toplang">
          <LangCircle />
          <ColorDot />
        </span>
        <TodayLine />
        <span className="vh-logo" aria-hidden />
        <div className="vh-bar__end">
          <span className="vh-bar__name">Vekon</span>
          <nav className="vh-jump" aria-label="Vekon">
            <a onClick={markDoor} href="/landing">Life</a>
            <a onClick={markDoor} href={withBase("/")}>Papers</a>
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
            {/* Mobile: the label as in Papers' about block */}
            <p className="papers-intro__label vh-aboutlabel">
              <span className="papers-intro__dot" aria-hidden />
              {t("home.aboutLabel")}
            </p>
            <p className="vh-label">
              <span className="vh-dot" aria-hidden />
              {t("home.kicker")}
            </p>
            <h1 id="vh-title" className="vh-title">
              {t("home.title")}
            </h1>
            <p className="vh-body vh-body--full"><AboutLines text={t("home.body")} lang={lang} /></p>
            <p className="vh-body vh-body--lead"><AboutLines text={t("home.bodyLead")} lang={lang} /></p>
            <div className="vh-hero__foot">
              <ul className="vh-facts" aria-hidden>
                <li>02 doors</li>
                <li>Life · Papers</li>
                <li>Memory · Personas</li>
              </ul>
            </div>
          </div>
          {/* Mobile: the maned wolf at the top, with the clouds */}
          <figure className="vh-medal vh-medal--emblem vh-medal--top vh-medal--wolf" aria-label="Maned wolf howling at a black sun">
            <img className="vh-mcloud vh-mcloud--a" src={withBase("/vekon/cloud-a3.webp")} alt="" aria-hidden width={760} height={259} />
            <img className="vh-mcloud vh-mcloud--b" src={withBase("/vekon/cloud-b3.webp")} alt="" aria-hidden width={640} height={297} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-wolf" src={withBase("/vekon/wolf-sun-ink.webp")} alt="" width={760} height={760} loading="eager" draggable={false} />
          </figure>
          <figure className="vh-mark">
            {/* Mobile: a band in the Papers color along the top of the panel,
                thin at the right, following the well's curve down the left. */}
            <span className="vh-band" aria-hidden>
              <span className="vh-band__shine" />
            </span>
            {/* Mobile: two clouds at the height of the ring */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-mcloud vh-mcloud--a" src={withBase("/vekon/cloud-a3.webp")} alt="" aria-hidden width={760} height={259} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-mcloud vh-mcloud--b" src={withBase("/vekon/cloud-b3.webp")} alt="" aria-hidden width={640} height={297} />
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

      <section className="vh-projects-panel" aria-label={t("home.projects")}>
        <div className="vh-projects-box">
          {/* Mobile: the wolf's sun, alone, turning slowly above the projects */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="vh-sun" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-sun__f vh-sun__f--1" src={withBase("/vekon/sun-ink-1.webp")} alt="" width={300} height={300} draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-sun__f vh-sun__f--2" src={withBase("/vekon/sun-ink-2.webp")} alt="" width={300} height={300} draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-sun__f vh-sun__f--3" src={withBase("/vekon/sun-ink-3.webp")} alt="" width={300} height={300} draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-sun__f vh-sun__f--4" src={withBase("/vekon/sun-ink-4.webp")} alt="" width={300} height={300} draggable={false} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vh-sun__f vh-sun__f--5" src={withBase("/vekon/sun-ink-5.webp")} alt="" width={300} height={300} draggable={false} />
          </span>
          <p className="vh-projects">
            <span className="vh-dot" aria-hidden />
            {t("home.projects")}
          </p>
          <p className="vh-projects-line">{t("home.projectsLine")}</p>
        </div>

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
                  <span>Vekon:</span> Life
                </h2>
              </div>
            </div>
            <p className="vh-door__body">{t("home.life.body")}</p>
            <div className="vh-door__actions">
              <a onClick={markDoor} className="vh-btn vh-btn--soft" href="/landing">
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
              <a onClick={markDoor} className="vh-btn vh-btn--dark" href={withBase("/")}>
                {t("home.papers.open")} <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Mobile: plates, laid out like the pages of the manifesto */}
      {/* Mobile: a thin rule with a star in the middle, drawn from the centre */}
      <div className="vh-rule" aria-hidden>
        <svg viewBox="0 0 240 24">
          <path className="vh-rule__l" pathLength={1} d="M110 12 H8" />
          <path className="vh-rule__r" pathLength={1} d="M130 12 H232" />
          <path className="vh-rule__star" d="M120 2 C121 9 123 11 130 12 C123 13 121 15 120 22 C119 15 117 13 110 12 C117 11 119 9 120 2 Z" />
          <circle cx="8" cy="12" r="1.6" className="vh-rule__dot" />
          <circle cx="232" cy="12" r="1.6" className="vh-rule__dot" />
        </svg>
      </div>
      <p className="vh-foot">Vekon · Memory · Personas</p>
      {/* Mobile: the Living Ring, under the rule */}
      <figure className="vh-mark vh-mark--m" aria-hidden>
        {/* Mobile: the motto set in an arc over the ring, like a seal */}
        <svg className="vh-arc" viewBox="0 0 300 300" aria-hidden>
          <defs>
            <path id="vh-arc-path" d="M 22 150 A 128 128 0 0 1 278 150" />
          </defs>
          <text>
            <textPath href="#vh-arc-path" startOffset="50%" textAnchor="middle">
              VEKON ✦ MEMORY ✦ PERSONAS
            </textPath>
          </text>
        </svg>
        <span className="vh-crosses" aria-hidden>
          <span>+ + + + +</span>
          <span>+ + +</span>
          <span>+</span>
        </span>
        {/* Mobile: ink stars twinkling around the Living Ring */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-star vh-star--1" src={withBase("/vekon/star-ink-1.webp")} alt="" width={207} height={220} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-star vh-star--3" src={withBase("/vekon/star-ink-3.webp")} alt="" width={207} height={220} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-star vh-star--5" src={withBase("/vekon/star-ink-5.webp")} alt="" width={207} height={220} draggable={false} />
        {/* Mobile: a band in the Papers color along the top of the panel,
            thin at the right, following the well's curve down the left. */}
        <span className="vh-band" aria-hidden>
          <span className="vh-band__shine" />
        </span>
        {/* Mobile: two clouds at the height of the ring */}
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
      {/* Mobile: the closing stamp */}
      <div className="vh-seal" aria-hidden>
        <p className="vh-seal__main">All memories reserved</p>
        <p className="vh-seal__sub">© Vekon · keep what&apos;s worth keeping</p>
      </div>
      {/* Mobile: the flame, last thing on the page, under the closing stamp */}
      <span className="vh-lotus vh-flame" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-flame__f vh-flame__f--1" src={withBase("/vekon/flame-ink-1.webp")} alt="" width={200} height={200} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-flame__f vh-flame__f--2" src={withBase("/vekon/flame-ink-2.webp")} alt="" width={200} height={200} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-flame__f vh-flame__f--3" src={withBase("/vekon/flame-ink-3.webp")} alt="" width={200} height={200} draggable={false} />
      </span>
    </div>
  );
}
