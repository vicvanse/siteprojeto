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

const PER_ROW = 5;

function chunkRows(items: Artifact[], size: number) {
  const rows: Artifact[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

/** Secondary magazine rows — each row is its own panel; click swaps featured. */
export function ReleasesStrip({ artifacts, activeId, onSelect }: Props) {
  const { t } = useLanguage();
  const rows = chunkRows(artifacts, PER_ROW);

  return (
    <section className="releases" aria-labelledby="releases-title">
      <div className="releases__head">
        <p className="meta" id="releases-title">
          {t("releases")}
        </p>
        <p className="releases__count meta">
          {String(artifacts.length).padStart(2, "0")} {t("objects")}
        </p>
      </div>

      <div className="releases__rows">
        {rows.map((row, rowIndex) => (
          <ul
            key={`releases-row-${rowIndex}`}
            className="releases__rail releases__rail--panel"
          >
            {row.map((artifact) => {
              const active = artifact.id === activeId;
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
                    <div className="release-slot__shell">
                      <div className="release-slot__well">
                        <div className="release-slot__mount">
                          <ArtworkCover artifact={artifact} size="release" />
                        </div>
                      </div>
                      <span className="release-slot__badge">
                        {artifact.number}
                      </span>
                    </div>
                    <div className="release-slot__meta">
                      <p className="release-slot__title">{artifact.title}</p>
                      {artifact.subtitle ? (
                        <p className="release-slot__sub">{artifact.subtitle}</p>
                      ) : null}
                      <p className="release-slot__price meta">
                        {artifact.status === "free"
                          ? t("free")
                          : formatPrice(artifact)}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
