"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, LANGUAGE_NAMES, type Language } from "@/lib/i18n";
import { withBase } from "@/lib/base-path";
import "./vekon-home.css";

/*
 * Links into Vekon Life (/landing, /auth/login) leave this app, so they are
 * plain <a> with absolute paths: next/link would prefix them with /papers.
 */
export function VekonHome() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="vekon-home">
      <div className="vh-bar">
        <span className="vh-plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/vekon-mark.png")} alt="" width={30} height={30} draggable={false} />
          <span className="vh-plate__word">Vekon</span>
        </span>
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
      </div>

      <section className="vh-hero" aria-labelledby="vh-title" style={{ ["--i" as string]: 1 }}>
        <p className="vh-label">
          <span className="vh-dot" aria-hidden />
          {t("home.kicker")}
        </p>
        <h1 id="vh-title" className="vh-title">
          {t("home.title")}
        </h1>
        <p className="vh-body">{t("home.body")}</p>
      </section>

      <p className="vh-doors-label" style={{ ["--i" as string]: 2 }}>
        {t("home.doors")}
      </p>

      <div className="vh-doors">
        <article className="vh-door vh-door--life" style={{ ["--i" as string]: 2 }}>
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

      <p className="vh-foot">Vekon · {t("intro.since")}</p>
    </div>
  );
}
