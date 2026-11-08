"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type { Artifact, ArtifactKind } from "@/data/artifacts";
import { formatPrice, isExtra, isPublication } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, LANGUAGE_NAMES, kindKey, type Language } from "@/lib/i18n";
import { useViewMode } from "@/components/ViewModeProvider";
import { ArtworkCover } from "./ArtworkCover";
import { FeaturedObject } from "./FeaturedObject";
import { OwnedObject } from "./OwnedObject";

const DESKTOP_MQ = "(min-width: 901px)";

type Filter = "all" | Exclude<ArtifactKind, "extra">;

type Props = {
  artifacts: Artifact[];
  extras: Artifact[];
  activeId: string | null;
  onSelect: (artifact: Artifact) => void;
};

const FILTERS: { id: Filter; labelKey: "collection.filterAll" | "collection.filterBooklets" | "collection.filterEssays" | "collection.filterGuides" }[] = [
  { id: "all", labelKey: "collection.filterAll" },
  { id: "booklet", labelKey: "collection.filterBooklets" },
  { id: "essay", labelKey: "collection.filterEssays" },
  { id: "field-guide", labelKey: "collection.filterGuides" },
];

function byNumberDesc(a: Artifact, b: Artifact) {
  return b.number.localeCompare(a.number, undefined, { numeric: true });
}

/** Private drawer — only owned objects; shelves + extras, not a second shop. */
export function CollectionGrid({
  artifacts,
  extras,
  activeId,
  onSelect,
}: Props) {
  const { authenticated, owns, openOverlay, email, signOut } = useAccess();
  const { t, language, setLanguage } = useLanguage();
  const { setMode } = useViewMode();
  const [filter, setFilter] = useState<Filter>("all");
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const publications = useMemo(
    () => artifacts.filter((a) => isPublication(a)),
    [artifacts],
  );

  const ownedObjects = useMemo(
    () => [...publications.filter((a) => owns(a.id))].sort(byNumberDesc),
    [publications, owns],
  );

  const ownedExtras = useMemo(
    () => extras.filter((a) => isExtra(a) && owns(a.id)),
    [extras, owns],
  );

  /* Owned first (number desc), missing last (number desc). */
  const shelfObjects = useMemo(() => {
    const pool =
      filter === "all" ? publications : publications.filter((a) => a.kind === filter);
    const held = pool.filter((a) => owns(a.id)).sort(byNumberDesc);
    const missing = pool.filter((a) => !owns(a.id)).sort(byNumberDesc);
    return [...held, ...missing];
  }, [publications, filter, owns]);

  const focused =
    publications.find((a) => a.id === activeId) ??
    extras.find((a) => a.id === activeId) ??
    null;
  const focusedMissing =
    Boolean(focused) && isPublication(focused!) && !owns(focused!.id);
  const showMissingPreview = desktop && focusedMissing;

  const active =
    (focused && owns(focused.id) ? focused : null) ??
    (showMissingPreview ? focused : null) ??
    ownedObjects[0] ??
    ownedExtras[0] ??
    null;

  useEffect(() => {
    if (!authenticated || !active) return;
    if (activeId !== active.id) onSelect(active);
  }, [authenticated, active, activeId, onSelect]);

  if (!authenticated) {
    const lockedObjects = [...publications].sort(byNumberDesc);
    const objectCount = String(lockedObjects.length).padStart(2, "0");
    const unlock = () => openOverlay("form");

    return (
      <section
        className="collection collection--library collection--locked"
        aria-labelledby="collection-title"
      >
        <div className="collection__shelf-block collection__shelf-block--locked">
          <header className="collection__section-head collection__section-head--shelf">
            <div className="collection__intro">
              <p className="collection__kicker">{t("collection.locked")}</p>
              <h1 id="collection-title" className="collection__title">
                <span className="collection__title-main">{t("collection.yours")}</span>
                <span className="collection__title-count">
                  {`: ${objectCount} ${t("objects").toUpperCase()}`}
                </span>
              </h1>
              <p className="collection__meta">{t("collection.lockedMeta")}</p>
            </div>
            <div className="collection__gate-row">
              <label className="collection__lang">
                <span className="collection__lang-label">{t("language")}</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                >
                  {LANGUAGES.map((code) => (
                    <option key={code} value={code}>
                      {LANGUAGE_NAMES[code]}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="collection__gate" onClick={unlock}>
                {t("logIn")} →
              </button>
            </div>
          </header>

          <ul className="collection-shelf">
            {lockedObjects.map((artifact) => (
              <li key={artifact.id} className="collection-shelf__item">
                <button
                  type="button"
                  className="shelf-card shelf-card--missing"
                  aria-label={t("collection.missingObject")
                    .replace("{number}", artifact.number)
                    .replace("{title}", artifact.title)}
                  onClick={unlock}
                >
                  <span className="shelf-card__frame">
                    <span className="shelf-card__shell">
                      <span className="shelf-card__well">
                        <span className="shelf-card__mount">
                          <ArtworkCover artifact={artifact} size="release" />
                        </span>
                      </span>
                      <span className="shelf-card__badge">{artifact.number}</span>
                    </span>
                    <span className="shelf-card__hang">
                      <span className="shelf-card__name">{artifact.title}</span>
                      <span className="shelf-card__kind">
                        {t("collection.locked")}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

      </section>
    );
  }

  const objectCount = String(ownedObjects.length).padStart(2, "0");
  const extraCount = String(ownedExtras.length).padStart(2, "0");
  const totalCount = String(publications.length).padStart(2, "0");
  const progress = publications.length ? ownedObjects.length / publications.length : 0;
  const ring = 2 * Math.PI * 13;
  const firstMissingId = shelfObjects.find((a) => !owns(a.id))?.id;
  const missingCount = String(shelfObjects.filter((a) => !owns(a.id)).length).padStart(2, "0");

  return (
    <section className="collection collection--library" aria-labelledby="collection-title">
      <header className="collection__section-head collection__section-head--above-stage">
        <h1 id="collection-title" className="collection__title">
          <span className="collection__title-main">{t("collection.yours")}</span>
          <span className="collection__title-count">
            {`: ${objectCount} ${t("objects").toUpperCase()}`}
          </span>
          <span className="cx-prog">
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
              <circle cx="17" cy="17" r="13" fill="none" stroke="#c3c6cd" strokeWidth="3" />
              <circle
                cx="17"
                cy="17"
                r="13"
                fill="none"
                stroke="#2a2a2e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(ring * progress).toFixed(1)} ${ring.toFixed(1)}`}
                transform="rotate(-90 17 17)"
              />
              <circle cx="17" cy="4" r="2" fill="#e8582a" />
            </svg>
            {objectCount} / {totalCount} {t("objects")}
          </span>
        </h1>
        <div className="cx-account">
          <span>{t("collection.owner")}</span>
          <button type="button" title={email ?? undefined} onClick={() => void signOut()}>
            {t("collection.logOut")}
          </button>
        </div>
      </header>

      <div className="collection__stage">
        {active ? (
          showMissingPreview ? (
            <FeaturedObject artifact={active} variant="missing" />
          ) : (
            <OwnedObject artifact={active} />
          )
        ) : null}
      </div>

      <div className="collection__shelf-block">
        <nav className="collection__filters" aria-label={t("collection.filters")}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`collection-filter${filter === f.id ? " collection-filter--active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </nav>

        {shelfObjects.length === 0 ? (
          <p className="collection__empty">{t("collection.emptyFilter")}</p>
        ) : (
          <ul className="collection-shelf">
            {shelfObjects.map((artifact) => {
              const held = owns(artifact.id);
              const selected =
                active?.id === artifact.id && (held || (desktop && !held));
              return (
                <Fragment key={artifact.id}>
                {artifact.id === firstMissingId ? (
                  <li className="cx-miss-head">
                    {t("collection.notYet", { n: missingCount })}
                  </li>
                ) : null}
                <li className="collection-shelf__item">
                  <button
                    type="button"
                    className={`shelf-card${selected ? " shelf-card--active" : ""}${held ? "" : " shelf-card--missing"}`}
                    aria-pressed={selected}
                    aria-label={
                      held
                        ? t("showObject")
                            .replace("{number}", artifact.number)
                            .replace("{title}", artifact.title)
                        : t("collection.missingObject")
                            .replace("{number}", artifact.number)
                            .replace("{title}", artifact.title)
                    }
                    onClick={() => {
                      onSelect(artifact);
                      /* Mobile missing → Gallery; desktop stays in Collection. */
                      if (!held && !window.matchMedia(DESKTOP_MQ).matches) {
                        setMode("gallery");
                      }
                    }}
                  >
                    <span className="shelf-card__frame">
                      <span className="shelf-card__shell">
                        <span className="shelf-card__well">
                          <span className="shelf-card__mount">
                            <ArtworkCover artifact={artifact} size="release" />
                          </span>
                        </span>
                        <span className="shelf-card__badge">{artifact.number}</span>
                      </span>
                      <span className="shelf-card__hang">
                        <span className="shelf-card__name">{artifact.title}</span>
                        <span className="shelf-card__kind">
                          {held
                            ? t(kindKey(artifact.kind)).toUpperCase()
                            : artifact.status === "free"
                              ? t("free")
                              : formatPrice(artifact)}
                        </span>
                      </span>
                      {held ? null : (
                        <span className="cx-miss-cta">{t("collection.seeInGallery")}</span>
                      )}
                    </span>
                  </button>
                </li>
                </Fragment>
              );
            })}
          </ul>
        )}
      </div>

      {ownedExtras.length > 0 ? (
        <div className="collection__extras-block">
          <header className="collection__section-head">
            <h2 className="collection__section-title">
              {t("collection.extras")} / {extraCount}
            </h2>
          </header>
          <ul className="extras-shelf">
            {ownedExtras.map((artifact, index) => {
              const selected = active?.id === artifact.id;
              return (
                <li
                  key={artifact.id}
                  className={`extras-shelf__item extras-shelf__item--${(index % 3) + 1}`}
                >
                  <button
                    type="button"
                    className={`extra-card${selected ? " extra-card--active" : ""}`}
                    aria-pressed={selected}
                    onClick={() => onSelect(artifact)}
                  >
                    <span className="extra-card__frame">
                      <span className="extra-card__shell">
                        <span className="extra-card__well">
                          <span className="extra-card__mount">
                            <ArtworkCover artifact={artifact} size="release" />
                          </span>
                        </span>
                        <span className="extra-card__badge">{artifact.number}</span>
                      </span>
                    </span>
                    <span className="extra-card__meta">
                      <span className="extra-card__id">
                        {t("collection.banner")} {artifact.number}
                      </span>
                      <span className="extra-card__name">{artifact.title}</span>
                      <span className="extra-card__dl">{t("collection.download")}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="collection__foot">
        <button
          type="button"
          className="collection__explore"
          onClick={() => setMode("gallery")}
        >
          {t("collection.explore")}
        </button>
      </div>
    </section>
  );
}
