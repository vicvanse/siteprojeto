"use client";

import { useEffect, useMemo, useState } from "react";
import type { Artifact, ArtifactKind } from "@/data/artifacts";
import { isExtra, isPublication, kindLabel } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { ArtworkCover } from "./ArtworkCover";
import { OwnedObject } from "./OwnedObject";

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
  const { authenticated, owns, openOverlay } = useAccess();
  const { t } = useLanguage();
  const { setMode } = useViewMode();
  const [filter, setFilter] = useState<Filter>("all");

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

  const active =
    ownedObjects.find((a) => a.id === activeId) ??
    ownedExtras.find((a) => a.id === activeId) ??
    ownedObjects[0] ??
    null;

  useEffect(() => {
    if (!authenticated || !active) return;
    if (activeId !== active.id) onSelect(active);
  }, [authenticated, active, activeId, onSelect]);

  if (!authenticated) {
    const lockedObjects = [...publications].sort(byNumberDesc);
    const lockedExtras = extras.filter((a) => isExtra(a));
    const objectCount = String(lockedObjects.length).padStart(2, "0");
    const extraCount = String(lockedExtras.length).padStart(2, "0");
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
            <button type="button" className="collection__gate" onClick={unlock}>
              {t("logIn")} →
            </button>
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

        {lockedExtras.length > 0 ? (
          <div className="collection__extras-block">
            <header className="collection__section-head">
              <h2 className="collection__section-title">
                {t("collection.extras")} / {extraCount}
              </h2>
            </header>
            <ul className="extras-shelf">
              {lockedExtras.map((artifact, index) => (
                <li
                  key={artifact.id}
                  className={`extras-shelf__item extras-shelf__item--${(index % 3) + 1}`}
                >
                  <button
                    type="button"
                    className="extra-card extra-card--missing"
                    onClick={unlock}
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
                      <span className="extra-card__dl">{t("collection.locked")}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    );
  }

  const objectCount = String(ownedObjects.length).padStart(2, "0");
  const extraCount = String(ownedExtras.length).padStart(2, "0");

  return (
    <section className="collection collection--library" aria-labelledby="collection-title">
      <div className="collection__stage">
        {active ? <OwnedObject artifact={active} /> : null}
      </div>

      <div className="collection__shelf-block">
        <header className="collection__section-head collection__section-head--shelf collection__section-head--below-panel">
          <h1 id="collection-title" className="collection__title">
            <span className="collection__title-main">{t("collection.yours")}</span>
            <span className="collection__title-count">
              {`: ${objectCount} ${t("objects").toUpperCase()}`}
            </span>
          </h1>
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
        </header>

        {shelfObjects.length === 0 ? (
          <p className="collection__empty">{t("collection.emptyFilter")}</p>
        ) : (
          <ul className="collection-shelf">
            {shelfObjects.map((artifact) => {
              const held = owns(artifact.id);
              const selected = held && active?.id === artifact.id;
              return (
                <li key={artifact.id} className="collection-shelf__item">
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
                      if (held) {
                        onSelect(artifact);
                        return;
                      }
                      /* Missing slot → Gallery so GET is one click away. */
                      onSelect(artifact);
                      setMode("gallery");
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
                            ? kindLabel(artifact.kind)
                            : t("collection.missing")}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
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
