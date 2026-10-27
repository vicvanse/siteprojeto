"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Artifact } from "@/data/artifacts";
import { formatPrice } from "@/data/artifacts";
import { useLanguage } from "@/components/LanguageProvider";
import { artifactDescriptionKey, type MessageKey } from "@/lib/i18n";
import { ArtifactFrame } from "./ArtifactFrame";
import { ArtworkCover } from "./ArtworkCover";

type Props = {
  artifact: Artifact;
};

const EDITION_KEYS = [
  "edition.readColour",
  "edition.readBw",
  "edition.printA4Colour",
  "edition.printA4Bw",
  "edition.printLetterColour",
  "edition.printLetterBw",
  "edition.folding",
] as const satisfies readonly MessageKey[];

export function FeaturedObject({ artifact }: Props) {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleH, setTitleH] = useState(0);
  const descKey = artifactDescriptionKey(artifact.id);
  const description = descKey ? t(descKey) : artifact.description;
  const plaques = [
    `PDF`,
    `${String(artifact.pages ?? 0).padStart(2, "0")} ${t("pages")}`,
    artifact.releaseDate ?? "—",
  ];

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const sync = () => setTitleH(Math.round(el.getBoundingClientRect().height));
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [artifact.id, artifact.title, artifact.subtitle]);

  return (
    <section id="viewport" className="viewport" aria-labelledby="featured-title">
      <div className="viewport__panel">
        <p className="viewport__id">
          <span className="object-id-pill">
            {t("object")} / {artifact.number}
          </span>
        </p>

        <div className="viewport__stage">
          <div className="viewport__mount">
            <div className="viewport__frame">
              <ArtifactFrame
                objectId={artifact.number}
                coords="X 0.42 · Y 0.31"
                plaques={plaques}
              >
                <ArtworkCover artifact={artifact} size="featured" />
              </ArtifactFrame>

            </div>
          </div>

          <div
            className="object-stack"
            style={
              titleH > 0
                ? ({ ["--title-h"]: `${titleH}px` } as CSSProperties)
                : undefined
            }
          >
            <span className="object-stack__foil" aria-hidden />

            <div className="object-stack__title" ref={titleRef}>
              <h1 id="featured-title" className="object-stack__heading">
                {artifact.title}
              </h1>
              {artifact.subtitle ? (
                <p className="object-stack__sub">{artifact.subtitle}</p>
              ) : null}
            </div>

            <div className="object-stack__leg" aria-hidden />

            <div className="object-stack__body">
              {description ? (
                <p className="object-stack__desc">{description}</p>
              ) : null}
              <div className="object-stack__acquire">
                <span className="price-chip">
                  {artifact.status === "free" ? t("free") : formatPrice(artifact)}
                </span>
                <button type="button" className="get-btn">
                  {t("get")}
                </button>
              </div>

              <div className="edition-pills" role="group" aria-label={t("editions")}>
                {EDITION_KEYS.map((key) => (
                  <button key={key} type="button" className="edition-pill">
                    {t(key)}
                  </button>
                ))}
              </div>
              <p className="edition-note">{t("edition.note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
