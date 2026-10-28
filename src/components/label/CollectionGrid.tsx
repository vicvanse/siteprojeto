"use client";

import { useEffect, useMemo, useState } from "react";
import type { Artifact, ArtifactKind } from "@/data/artifacts";
import { isExtra, isPublication, kindLabel } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { identityInitials } from "@/lib/personal-copy";
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

/** Private drawer — only owned objects; shelves + extras, not a second shop. */
export function CollectionGrid({
  artifacts,
  extras,
  activeId,
  onSelect,
}: Props) {
  const { authenticated, owns, email, openOverlay, signOut } = useAccess();
  const { t } = useLanguage();
  const { setMode } = useViewMode();
  const [filter, setFilter] = useState<Filter>("all");

  const ownedObjects = useMemo(
    () => artifacts.filter((a) => isPublication(a) && owns(a.id)),
    [artifacts, owns],
  );

  const ownedExtras = useMemo(
    () => extras.filter((a) => isExtra(a) && owns(a.id)),
    [extras, owns],
  );

  const filteredObjects = useMemo(() => {
    if (filter === "all") return ownedObjects;
    return ownedObjects.filter((a) => a.kind === filter);
  }, [ownedObjects, filter]);

  const active =
    filteredObjects.find((a) => a.id === activeId) ??
    ownedExtras.find((a) => a.id === activeId) ??
    filteredObjects[0] ??
    null;

  useEffect(() => {
    if (!authenticated || !active) return;
    if (activeId !== active.id) onSelect(active);
  }, [authenticated, active, activeId, onSelect]);

  if (!authenticated) {
    return (
      <section className="collection" aria-labelledby="collection-title">
        <header className="collection__head">
          <p className="collection__kicker">{t("collection.yours")}</p>
          <h1 id="collection-title" className="collection__title">
            {t("collection")}
          </h1>
          <p className="collection__meta">{t("collection.lockedMeta")}</p>
          <button
            type="button"
            className="collection__gate"
            onClick={() => openOverlay("form")}
          >
            {t("logIn")} →
          </button>
        </header>
      </section>
    );
  }

  const objectCount = String(ownedObjects.length).padStart(2, "0");
  const extraCount = String(ownedExtras.length).padStart(2, "0");
  const initials = identityInitials(email);

  return (
    <section className="collection collection--library" aria-labelledby="collection-title">
      <header className="collection__head collection__head--row">
        <div className="collection__intro">
          <h1 id="collection-title" className="collection__title">
            {t("collection.yours")}
          </h1>
          <p className="collection__meta">
            {t("collection.objectCount").replace("{count}", objectCount)}
          </p>
        </div>
        <div className="collection__account">
          <span className="collection__vc" title={email ?? undefined}>
            {initials}
          </span>
          <button type="button" className="collection__exit" onClick={() => void signOut()}>
            {t("collection.exit")}
          </button>
        </div>
      </header>

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
      <div className="collection__rule" aria-hidden />

      {active ? <OwnedObject artifact={active} /> : null}

      <div className="collection__shelf-block">
        <header className="collection__section-head">
          <h2 className="collection__section-title">
            {t("collection.yourObjects")} / {objectCount}
          </h2>
        </header>

        {filteredObjects.length === 0 ? (
          <p className="collection__empty">{t("collection.emptyFilter")}</p>
        ) : (
          <ul className="collection-shelf">
            {filteredObjects.map((artifact, index) => {
              const selected = active?.id === artifact.id;
              return (
                <li
                  key={artifact.id}
                  className={`collection-shelf__item collection-shelf__item--${(index % 5) + 1}`}
                >
                  <button
                    type="button"
                    className={`shelf-card${selected ? " shelf-card--active" : ""}`}
                    aria-pressed={selected}
                    aria-label={t("showObject")
                      .replace("{number}", artifact.number)
                      .replace("{title}", artifact.title)}
                    onClick={() => onSelect(artifact)}
                  >
                    <span className="shelf-card__num">{artifact.number}</span>
                    <span className="shelf-card__frame">
                      <ArtworkCover artifact={artifact} size="release" />
                    </span>
                    <span className="shelf-card__meta">
                      <span className="shelf-card__kind">{kindLabel(artifact.kind)}</span>
                      <span className="shelf-card__name">{artifact.title}</span>
                      <span className="shelf-card__langs">
                        {(artifact.languages ?? ["en"]).map((l) => l.toUpperCase()).join(" / ")}
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
          <div className="collection__rule" aria-hidden />
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
