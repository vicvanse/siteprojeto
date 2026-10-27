"use client";

import { brand } from "@/brand";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Footer marks — Papers (red star / light) beside Life (black), each with what it is.
 */
export function VekonMarkBadge() {
  const { t } = useLanguage();

  return (
    <aside className="vekon-marks" aria-label="Vekon">
      <a href="/" className="vekon-mark vekon-mark--papers">
        <div className="vekon-mark__plate vekon-mark__plate--papers">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="vekon-mark__glyph"
            src="/vekon-papers-icon.png"
            alt=""
            width={72}
            height={72}
            draggable={false}
            decoding="async"
          />
        </div>
        <p className="vekon-mark__caption">
          <span className="vekon-mark__caption-line">Papers</span>
          <span className="vekon-mark__caption-line vekon-mark__caption-line--soft">
            {t("papersKind")}
          </span>
        </p>
      </a>

      <a
        href={brand.vekonUrl}
        className="vekon-mark vekon-mark--life"
        target="_blank"
        rel="noreferrer"
      >
        <div className="vekon-mark__plate vekon-mark__plate--life">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="vekon-mark__glyph"
            src="/vekon-life-icon.png"
            alt=""
            width={72}
            height={72}
            draggable={false}
            decoding="async"
          />
        </div>
        <p className="vekon-mark__caption">
          <span className="vekon-mark__caption-line">Life</span>
          <span className="vekon-mark__caption-line vekon-mark__caption-line--soft">
            {t("lifeKind")}
          </span>
        </p>
      </a>
    </aside>
  );
}
