"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Artifact, ArtifactLang } from "@/data/artifacts";
import {
  formatPrice,
  hasManifestation,
  relatedBanner,
} from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useViewMode } from "@/components/ViewModeProvider";
import { PENDING_GET_KEY } from "./pending-get";
import { artifactDescriptionKey } from "@/lib/i18n";
import { ArtifactFrame } from "./ArtifactFrame";
import { ArtworkCover } from "./ArtworkCover";
import { PanelHud } from "./Hud";
import { ViewportTools } from "./ViewportTools";

type Props = {
  artifact: Artifact;
  /** Collection desktop: unavailable object — black panel, B&W art, Gallery CTAs. */
  variant?: "default" | "missing";
};

export function FeaturedObject({ artifact, variant = "default" }: Props) {
  const { t, language } = useLanguage();
  const { authenticated, openOverlay } = useAccess();
  const { setMode } = useViewMode();

  /* Not signed in: go to Collection and ask for login; remember the object
     so it is focused there after the magic link brings the user back. */
  const handleGet = () => {
    if (authenticated) return; // checkout comes here once payments exist
    try {
      localStorage.setItem(PENDING_GET_KEY, artifact.id);
    } catch {}
    setMode("collection");
    window.scrollTo({ top: 0 });
    openOverlay("form");
  };
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleH, setTitleH] = useState(0);
  const missing = variant === "missing";
  const descKey = artifactDescriptionKey(artifact.id);
  const description = descKey ? t(descKey) : artifact.description;
  const banner = relatedBanner(artifact);
  const showVekonManifestation =
    hasManifestation(artifact, "banner") && Boolean(banner);
  const bannerLabel = banner
    ? `${banner.title.split(/\s*\/\s*/)[0]!.trim()} BANNER`
    : "";
  const freeDownload =
    artifact.status === "free" && artifact.downloads
      ? (artifact.downloads[language as ArtifactLang] ?? artifact.downloads.en)
      : undefined;
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
    <section
      id="viewport"
      className={`viewport${missing ? " viewport--missing" : ""}`}
      aria-labelledby="featured-title"
    >
      <div className="viewport__panel">
        <PanelHud artifact={artifact} />
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
                {freeDownload ? (
                  <a
                    className="get-btn"
                    href={freeDownload}
                    target="_blank"
                    rel="noopener"
                  >
                    {t("get")}
                  </a>
                ) : (
                  <button type="button" className="get-btn" onClick={handleGet}>
                    {t("get")}
                  </button>
                )}
                {artifact.edition ? (
                  <a className="read-btn" href={artifact.edition}>
                    {t("read")}
                  </a>
                ) : null}
              </div>

              {showVekonManifestation ? (
                <div
                  className="manifestations"
                  role="group"
                  aria-label={t("manifestations")}
                >
                  <p className="manifestations__label">{t("manifestations")}</p>
                  <div className="manifestations__row">
                    <span className="manifestations__channel">
                      {t("manifestations.papers")}
                    </span>
                    <span className="manifestations__item">
                      {t("manifestations.pdfBooklet")}
                    </span>
                    <span className="manifestations__meta">
                      {artifact.pages ?? 0} {t("pages").toLowerCase()}
                    </span>
                  </div>
                  <div className="manifestations__row">
                    <span className="manifestations__channel">
                      {t("manifestations.vekon")}
                    </span>
                    <span className="manifestations__item">{bannerLabel}</span>
                    <span className="manifestations__meta">
                      {t("manifestations.bannerCosmetic")}
                    </span>
                  </div>
                </div>
              ) : null}

              {artifact.themes?.length || artifact.references?.length ? (
                <div className="cx-themes">
                  {artifact.themes?.length ? (
                    <div className="cx-themes__row">
                      <span className="cx-themes__label">{t("themes")}</span>
                      <div className="cx-themes__list">
                        {artifact.themes.map((key) => (
                          <span key={key} className="cx-themes__tag">
                            {t(key)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {artifact.references?.length ? (
                    <div className="cx-themes__row">
                      <span className="cx-themes__label">{t("references")}</span>
                      <div className="cx-themes__ref">
                        {artifact.references.map((key) => (
                          <span key={key}>{t(key)}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <p className="edition-note">{t("edition.note")}</p>
            </div>
          </div>
        </div>

        <ViewportTools />
      </div>
    </section>
  );
}
