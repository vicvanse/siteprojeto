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
  /** Se false, marca puramente decorativa (sem clique nem foco). */
  interactive?: boolean;
}

export function VekonHeroMark({
  sizePx = MARK_PX,
  className = "",
  onActivate,
  interactive = true,
}: VekonHeroMarkProps) {
  const s = sizePx;
  const shellStyle = {
    ["--vekon-size" as string]: `${s}px`,
  } as const;

  const shellClass = `${styles.root} mx-auto block border-0 bg-transparent p-0 ${className}`;

  const rings = (
    <>
      <div className={`absolute inset-0 rounded-full ${styles.ringOuter}`} />
      <div
        className={`absolute rounded-full ${styles.ringInner} ${styles.ringInnerInset}`}
      />
      <div className={`absolute ${styles.livingWrap} ${styles.livingInset}`}>
        <LivingRingHero />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        <DottedWordmarkHero text="VEKON" />
      </div>
    </>
  );

  if (!interactive) {
    return (
      <div
        role="presentation"
        aria-hidden
        className={`${shellClass} cursor-default`}
        style={shellStyle}
      >
        {rings}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label="Abrir Vekon"
      className={`${shellClass} cursor-pointer outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#404040]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]`}
      style={shellStyle}
    >
      {rings}
    </button>
  );
}
