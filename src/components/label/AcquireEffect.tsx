"use client";

import { useEffect, useRef, useState } from "react";
import type { Artifact } from "@/data/artifacts";
import { useLanguage } from "@/components/LanguageProvider";
import { artifactSubtitleKey } from "@/lib/i18n";

/** Fire after a free GET (signed in) or a confirmed purchase. */
export function announceAcquired(artifact: Artifact) {
  window.dispatchEvent(new CustomEvent<Artifact>("papers:acquired", { detail: artifact }));
}

type Phase = "in" | "stamp" | "fly" | "out";

/**
 * Acquisition moment: the object lands on a soft plate, the seal is pressed
 * onto it ("Acquired"), then the plate shrinks into the Collection tab.
 */
export function AcquireEffect() {
  const { t } = useLanguage();
  const [item, setItem] = useState<Artifact | null>(null);
  const [phase, setPhase] = useState<Phase>("in");
  const [fly, setFly] = useState<{ x: number; y: number } | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
    const onAcquired = (event: Event) => {
      const artifact = (event as CustomEvent<Artifact>).detail;
      if (!artifact) return;
      clear();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setItem(artifact);
      setFly(null);
      setPhase("in");
      if ("vibrate" in navigator) navigator.vibrate?.([12, 40, 18]);
      const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
      at(reduced ? 0 : 420, () => setPhase("stamp"));
      at(reduced ? 1400 : 1900, () => {
        /* Fly toward the Collection tab in the header. */
        const target = [...document.querySelectorAll<HTMLElement>(".view-pill")].pop();
        if (target) {
          const r = target.getBoundingClientRect();
          setFly({
            x: r.left + r.width / 2 - window.innerWidth / 2,
            y: r.top + r.height / 2 - window.innerHeight / 2,
          });
          target.classList.add("view-pill--ping");
          window.setTimeout(() => target.classList.remove("view-pill--ping"), 900);
        }
        setPhase("fly");
      });
      at(reduced ? 1600 : 2550, () => setPhase("out"));
      at(reduced ? 1700 : 2700, () => setItem(null));
    };
    window.addEventListener("papers:acquired", onAcquired);
    return () => {
      window.removeEventListener("papers:acquired", onAcquired);
      clear();
    };
  }, []);

  /* Return from checkout: /?acquired=<id> is fired by the page that knows the artifact. */
  if (!item) return null;

  const subKey = artifactSubtitleKey(item.id);
  const today = new Date();
  const stamp = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getFullYear()).slice(-2)}`;

  return (
    <div
      className={`acquire acquire--${phase}`}
      role="status"
      aria-live="polite"
      onClick={() => setItem(null)}
    >
      <div
        className="acquire__plate"
        style={
          fly && (phase === "fly" || phase === "out")
            ? { transform: `translate(${fly.x}px, ${fly.y}px) scale(0.12)`, opacity: 0 }
            : undefined
        }
      >
        <div className="acquire__cover">
          {item.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={item.cover} alt="" draggable={false} />
          ) : null}
          {item.avatar ? (
            <span className="acquire__seal" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.avatar} alt="" draggable={false} />
            </span>
          ) : null}
        </div>
        <p className="acquire__kicker">
          {t("object")} / {item.number}
        </p>
        <p className="acquire__title">{item.title}</p>
        {subKey ? <p className="acquire__sub">{t(subKey)}</p> : null}
        <p className="acquire__stamp">
          <span>{t("acquire.title")}</span>
          <span>{stamp}</span>
        </p>
        <p className="acquire__note">{t("acquire.note")}</p>
      </div>
    </div>
  );
}
