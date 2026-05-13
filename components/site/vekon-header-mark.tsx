"use client";

import styles from "./vekon-header-mark.module.css";

export interface VekonHeaderMarkProps {
  onActivate: () => void;
  /** Destaque quando o painel Vekon está aberto */
  active?: boolean;
  className?: string;
}

/**
 * Ícone de duas rodas (grande + pequena, sentidos opostos) para a barra preta mobile.
 */
export function VekonHeaderMark({
  onActivate,
  active = false,
  className = "",
}: VekonHeaderMarkProps) {
  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label="Abrir Vekon"
      aria-pressed={active}
      className={`${styles.wrap} flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        active ? "opacity-100 ring-1 ring-white/35" : "opacity-95 hover:opacity-100"
      } ${className}`}
    >
      <svg
        className="h-9 w-9"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g className={styles.spinCw}>
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray="5 4"
            fill="none"
          />
        </g>
        <g className={styles.spinCcw}>
          <circle
            cx="18"
            cy="18"
            r="8.5"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3.5"
            fill="none"
          />
        </g>
      </svg>
    </button>
  );
}
