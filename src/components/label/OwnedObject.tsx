"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Artifact, ArtifactLang } from "@/data/artifacts";
import {
  downloadActionLabel,
  kindLabel,
  openActionLabel,
  relatedBanner,
} from "@/data/artifacts";
import { useAccess } from "@/components/AccessProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { artifactDescriptionKey } from "@/lib/i18n";
import { formatAcquiredStamp, personalCopy } from "@/lib/personal-copy";
import { ArtifactFrame } from "./ArtifactFrame";
import { ArtworkCover } from "./ArtworkCover";
import { ViewportTools } from "./ViewportTools";

type Props = {
  artifact: Artifact;
};

const LANG_LABEL: Record<ArtifactLang, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
  ja: "JA",
  ko: "KO",
};

function editionLangs(artifact: Artifact): ArtifactLang[] {
  return artifact.languages?.length ? artifact.languages : ["en"];
}

/**
 * Collection reader — personal exemplar, not a product card.
 * OPEN primary, DOWNLOAD secondary; OWNED + copy sheet instead of GET/price.
 */
export function OwnedObject({ artifact }: Props) {
  const { email, signOut } = useAccess();
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleH, setTitleH] = useState(0);
  const langs = editionLangs(artifact);
  const [editionLang, setEditionLang] = useState<ArtifactLang>(() => langs[0]!);
  const descKey = artifactDescriptionKey(artifact.id);
  const description = descKey ? t(descKey) : artifact.description;
  const copy = personalCopy(email ?? "guest", artifact.id, artifact.version ?? "1.0");
  const isExtra = artifact.kind === "extra";
  const linkedBanner = !isExtra ? relatedBanner(artifact) : undefined;
  const relatedBannerLine = linkedBanner
    ? `${t("manifestations.vekon")} · ${linkedBanner.title.split(/\s*\/\s*/)[0]!.trim()} · Banner`
    : null;
  const ownedStamp = `${t("collection.owned")} / ${formatAcquiredStamp(copy.acquired)}`;
  const plaques = isExtra
    ? [artifact.format ?? "PNG", `BANNER / ${artifact.number}`, ownedStamp]
    : [
        artifact.format ?? "PDF",
        `${String(artifact.pages ?? 0).padStart(2, "0")} ${t("pages")}`,
        LANG_LABEL[editionLang],
        ownedStamp,
      ];

  useLayoutEffect(() => {
    setEditionLang(editionLangs(artifact)[0]!);
  }, [artifact]);

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
    <section id="viewport" className="viewport viewport--owned" aria-labelledby="owned-title">
      <div className="viewport__panel">
        <button
          type="button"
          className="collection__logout"
          title={email ?? undefined}
          onClick={() => void signOut()}
        >
          {t("collection.logOut")}
        </button>
        <p className="viewport__id">
          <span className="object-id-pill">
            {isExtra ? t("collection.banner") : t("object")} / {artifact.number}
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
              <h1 id="owned-title" className="object-stack__heading">
                {artifact.title}
              </h1>
              {artifact.subtitle ? (
                <p className="object-stack__sub">{artifact.subtitle}</p>
              ) : null}
            </div>

            <div className="object-stack__leg" aria-hidden />

            <div className="object-stack__body">
              <p className="owned-kind">
                {kindLabel(artifact.kind)} / {artifact.number}
              </p>

              {description ? (
                <p className="object-stack__desc">{description}</p>
              ) : null}

              <div className="owned-actions">
                {!isExtra ? (
                  <button type="button" className="owned-btn owned-btn--primary">
                    {openActionLabel(artifact.kind)}
                  </button>
                ) : null}
                <button type="button" className="owned-btn owned-btn--ghost">
                  {downloadActionLabel(artifact.kind)}
                </button>
              </div>

              {!isExtra ? (
                <div className="owned-langs" role="group" aria-label={t("language")}>
                  <span className="owned-langs__label">{t("language")}</span>
                  <div className="owned-langs__row">
                    {langs.map((code) => (
                      <button
                        key={code}
                        type="button"
                        className={`owned-lang${editionLang === code ? " owned-lang--active" : ""}`}
                        aria-pressed={editionLang === code}
                        onClick={() => setEditionLang(code)}
                      >
                        {LANG_LABEL[code]}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedBannerLine ? (
                <div className="related-manifestation">
                  <p className="related-manifestation__kicker">
                    {t("manifestations.related")}
                  </p>
                  <p className="related-manifestation__line">{relatedBannerLine}</p>
                </div>
              ) : null}

              <div className="owned-copy">
                <p className="owned-copy__kicker">{t("collection.personalCopy")}</p>
                <dl className="owned-copy__sheet">
                  <div>
                    <dt>{t("object")}</dt>
                    <dd>{artifact.number}</dd>
                  </div>
                  <div>
                    <dt>{t("collection.copy")}</dt>
                    <dd>{copy.copy}</dd>
                  </div>
                  <div>
                    <dt>{t("collection.acquired")}</dt>
                    <dd>{copy.acquired}</dd>
                  </div>
                  <div>
                    <dt>{t("collection.version")}</dt>
                    <dd>{copy.version}</dd>
                  </div>
                  {!isExtra ? (
                    <div>
                      <dt>{t("language")}</dt>
                      <dd>{LANG_LABEL[editionLang]}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <ViewportTools />
      </div>
    </section>
  );
}
