"use client";

import { useState } from "react";
import type { Artifact } from "@/data/artifacts";
import { formatPrice } from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { ArtworkCover } from "./ArtworkCover";

type Props = {
  artifacts: Artifact[];
  onOpenOwned: (artifact: Artifact) => void;
};

/** All objects side by side — owned in colour, locked in grey. */
export function CollectionGrid({ artifacts, onOpenOwned }: Props) {
  const { authenticated, owns, openOverlay } = useAccess();
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleSelect(artifact: Artifact) {
    if (!authenticated) {
      openOverlay("form");
      return;
    }
    if (!owns(artifact.id)) return;
    setActiveId(artifact.id);
    onOpenOwned(artifact);
  }

  return (
    <section className="collection" aria-labelledby="collection-title">
      <header className="collection__head">
        <p className="collection__kicker">{t("collection.kicker")}</p>
        <h1 id="collection-title" className="collection__title">
          {t("collection")}
        </h1>
        <p className="collection__meta">
          {authenticated
            ? t("collection.ownedMeta").replace(
                "{count}",
                String(artifacts.filter((a) => owns(a.id)).length),
              )
            : t("collection.lockedMeta")}
        </p>
      </header>

      <ul className="collection__grid">
        {artifacts.map((artifact) => {
          const owned = authenticated && owns(artifact.id);
          const locked = !owned;
          return (
            <li key={artifact.id}>
              <button
                type="button"
                className={`collection-card${owned ? " collection-card--owned" : " collection-card--locked"}${
                  activeId === artifact.id ? " collection-card--active" : ""
                }`}
                aria-label={
                  owned
                    ? t("showObject")
                        .replace("{number}", artifact.number)
                        .replace("{title}", artifact.title)
                    : `${artifact.number} · ${artifact.title}`
                }
                aria-pressed={owned ? activeId === artifact.id : undefined}
                disabled={authenticated && locked}
                onClick={() => handleSelect(artifact)}
              >
                <span className="collection-card__frame">
                  <ArtworkCover artifact={artifact} size="release" />
                </span>
                <span className="collection-card__meta">
                  <span className="collection-card__num">{artifact.number}</span>
                  <span className="collection-card__name">{artifact.title}</span>
                  <span className="collection-card__status">
                    {owned
                      ? t("collection.owned")
                      : authenticated
                        ? formatPrice(artifact)
                        : t("collection.locked")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
