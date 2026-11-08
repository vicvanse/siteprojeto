"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Props = { objectCount: number };

/** "About" block between the featured object and Releases (Gallery only). */
export function PapersIntro({ objectCount }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  /* Match the width of the featured panel above (it is fit-content). */
  useEffect(() => {
    const el = ref.current;
    const panel = document.querySelector<HTMLElement>("#viewport .viewport__panel");
    if (!el || !panel) return;
    const sync = () => {
      if (window.innerWidth > 900) {
        el.style.setProperty("--intro-w", `${panel.getBoundingClientRect().width}px`);
      } else {
        el.style.removeProperty("--intro-w");
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(panel);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  const facts = [
    `${String(objectCount).padStart(2, "0")} ${t("objects")}`,
    "PDF",
    "EN · PT",
    t("intro.since"),
  ];

  return (
    <section ref={ref} className="papers-intro" aria-labelledby="papers-intro-title">
      <div>
        <p className="papers-intro__label">
          <span className="papers-intro__dot" aria-hidden />
          {t("intro.label")}
        </p>
        <h2 id="papers-intro-title" className="papers-intro__h">
          {t("intro.title")}
        </h2>
      </div>
      <div>
        <p className="papers-intro__p">{t("intro.body")}</p>
        <ul className="papers-intro__facts">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
