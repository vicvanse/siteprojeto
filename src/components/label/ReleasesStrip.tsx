"use client";

import type { Artifact } from "@/data/artifacts";
import { formatPrice } from "@/data/artifacts";
import { useLanguage } from "@/components/LanguageProvider";
import { ArtworkCover } from "./ArtworkCover";

type Props = {
  artifacts: Artifact[];
  activeId: string;
  onSelect: (artifact: Artifact) => void;
};

function byNumberDesc(a: Artifact, b: Artifact) {
  return b.number.localeCompare(a.number, undefined, { numeric: true });
}

/**
 * Releases — museum moldura with title/price hang pill.
 * Mobile also centers subtitle above See more.
 */
export function ReleasesStrip({ artifacts, activeId, onSelect }: Props) {
  const { t } = useLanguage();
  const ordered = [...artifacts].sort(byNumberDesc);

  return (
    <section className="releases" aria-labelledby="releases-title">
      <div className="releases__head">
        <p className="releases__title-pill" id="releases-title">
          {t("releases")}
        </p>
        <p className="releases__count-pill">
          {String(ordered.length).padStart(2, "0")} {t("objects")}
        </p>
      </div>

      <ul className="releases__grid">
        {ordered.map((artifact) => {
          const active = artifact.id === activeId;
          const price =
            artifact.status === "free" ? t("free") : formatPrice(artifact);
          return (
            <li key={artifact.id} className="release-slot">
              <button
                type="button"
                className={`release-slot__btn${active ? " release-slot__btn--active" : ""}`}
                aria-pressed={active}
                aria-label={t("showObject", {
                  number: artifact.number,
                  title: artifact.title,
                })}
                onClick={() => onSelect(artifact)}
              >
                <span className="release-slot__frame">
                  <span className="release-slot__shell">
                    <span className="release-slot__well">
                      <span className="release-slot__mount">
                        <ArtworkCover artifact={artifact} size="release" />
                      </span>
                    </span>
                    <span className="release-slot__badge">{artifact.number}</span>
                  </span>
                  <span className="release-slot__hang">
                    <span className="release-slot__title">{artifact.title}</span>
                    <span className="release-slot__price">{price}</span>
                  </span>
                </span>
                <span className="release-slot__meta">
                  {artifact.subtitle ? (
                    <span className="release-slot__sub">{artifact.subtitle}</span>
                  ) : null}
                  <span className="release-slot__more">{t("seeMore")}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
