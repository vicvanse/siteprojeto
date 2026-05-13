"use client";

import { useId } from "react";
import styles from "./vekon-hero-mark.module.css";

/** Tamanho base do círculo (login pixellife usa 420px; aqui reduzido para o hero). */
const MARK_PX = 200;

function LivingRingHero() {
  const gradientId = useId().replace(/:/g, "");
  return (
    <div className="relative h-full w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="0.55" stopColor="rgba(0,0,0,0.55)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.12)" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="34"
          className={styles.ringBase}
          strokeWidth="8"
          fill="none"
        />
        <g className={styles.ringSpin}>
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="24 10"
            className={styles.ringPulse}
          />
          <circle
            cx="50"
            cy="50"
            r="26"
            className={`${styles.ringInnerThin} ${styles.ringWobble}`}
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 6"
          />
        </g>
      </svg>
    </div>
  );
}

function DottedWordmarkHero({ text }: { text: string }) {
  return (
    <div className={styles.wordmarkShell}>
      <div className={styles.wordmarkMeasure} aria-hidden>
        {text}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={styles.wordmarkDots}>{text}</span>
      </div>
    </div>
  );
}

export interface VekonHeroMarkProps {
  /** px — default 200 */
  sizePx?: number;
  className?: string;
  onActivate?: () => void;
}

export function VekonHeroMark({
  sizePx = MARK_PX,
  className = "",
  onActivate,
}: VekonHeroMarkProps) {
  const s = sizePx;
  const inner = Math.round((18 / 420) * s);
  const living = Math.round((74 / 420) * s);

  const innerStyle = { top: inner, left: inner, right: inner, bottom: inner };
  const livingStyle = { top: living, left: living, right: living, bottom: living };

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label="Abrir Vekon"
      className={`${styles.root} mx-auto block cursor-pointer border-0 bg-transparent p-0 outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#751027]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2f1] ${className}`}
      style={{
        width: s,
        height: s,
        maxWidth: "min(92vw, 240px)",
        maxHeight: "min(92vw, 240px)",
      }}
    >
      <div className={`absolute inset-0 rounded-full ${styles.ringOuter}`} />
      <div
        className={`absolute rounded-full ${styles.ringInner}`}
        style={innerStyle}
      />
      <div className={`absolute ${styles.livingWrap}`} style={livingStyle}>
        <LivingRingHero />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        <DottedWordmarkHero text="VEKON" />
      </div>
    </button>
  );
}
