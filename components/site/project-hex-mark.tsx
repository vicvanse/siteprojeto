"use client";

import { useId } from "react";
import styles from "./project-hex-mark.module.css";

/** Hexágono plano (raio apotema ~44 no viewBox centrado em 0,0). */
const HEX_FLAT =
  "0,-44 38.105,-22 38.105,22 0,44 -38.105,22 -38.105,-22";

export interface ProjectHexMarkProps {
  /** Texto visível por cima do emblema (ex.: «PROJETO X»). */
  label: string;
  className?: string;
}

/**
 * Marca «Projeto X»: título com efeito pontilhado (como Vekon) por cima,
 * hexágono exterior a girar lentamente, círculo interior com anéis animados.
 * Decorativo: use um `<h1 className="sr-only">` junto para acessibilidade / SEO.
 */
export function ProjectHexMark({
  label,
  className = "",
}: ProjectHexMarkProps) {
  const uid = useId().replace(/\W/g, "");
  const gradientId = `projHexRingGrad-${uid}`;

  return (
    <div
      className={`flex flex-col items-center text-center ${className}`}
      aria-hidden
    >
      <div className={styles.titleShell}>
        <div className={styles.titleMeasure} aria-hidden>
          {label}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={styles.titleDots}>{label}</span>
        </div>
      </div>

      <div className={styles.stack}>
        <svg
          className={styles.svg}
          viewBox="-52 -52 104 104"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="0.55" stopColor="rgba(0,0,0,0.45)" />
              <stop offset="1" stopColor="rgba(0,0,0,0.1)" />
            </linearGradient>
          </defs>

          <g className={styles.hexSpin}>
            <polygon
              points={HEX_FLAT}
              fill="none"
              stroke="#64748b"
              strokeWidth="2.4"
              strokeOpacity="0.65"
            />
          </g>

          <circle
            cx="0"
            cy="0"
            r="31"
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="2.2"
          />
          <circle
            cx="0"
            cy="0"
            r="27"
            fill="none"
            stroke="rgba(0,0,0,0.14)"
            strokeWidth="1.2"
          />

          <g className={styles.ringSpin}>
            <circle
              cx="0"
              cy="0"
              r="28"
              className={styles.ringBase}
              strokeWidth="5.5"
              fill="none"
            />
            <circle
              cx="0"
              cy="0"
              r="28"
              stroke={`url(#${gradientId})`}
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="20 8"
              className={styles.ringPulse}
            />
            <g className={styles.ringWobble}>
              <circle
                cx="0"
                cy="0"
                r="21"
                className={styles.ringInnerThin}
                strokeWidth="1.6"
                fill="none"
                strokeDasharray="8 6"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
