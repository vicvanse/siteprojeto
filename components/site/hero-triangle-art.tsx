import { useId } from "react";

interface HeroTriangleArtProps {
  className?: string;
  /** Espelha horizontalmente (para o lado direito da página). */
  mirror?: boolean;
  /** Cores mais fortes (útil no lado direito do hero, sobre fundo claro). */
  emphasis?: boolean;
}

function clampOpacity(v: number): number {
  return Math.min(0.92, Math.max(0.04, v));
}

/**
 * Decoração: composição abstracta só com triângulos (sem a arte antiga em formas orgânicas).
 * Cores alinhadas à marca (musgo / floresta).
 */
export function HeroTriangleArt({
  className = "",
  mirror = false,
  emphasis = false,
}: HeroTriangleArtProps) {
  const uid = useId().replace(/\W/g, "");
  const idA = `heroTriFillA-${uid}`;
  const idB = `heroTriFillB-${uid}`;
  const idC = `heroTriFillC-${uid}`;
  const m = emphasis ? 1.65 : 1;

  return (
    <div
      aria-hidden
      className={`${mirror ? "-scale-x-100 origin-[100%_50%]" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 420 680"
        className="h-full w-full"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={idA}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#4a7c44"
              stopOpacity={clampOpacity(0.38 * m)}
            />
            <stop
              offset="100%"
              stopColor="#2d4c3b"
              stopOpacity={clampOpacity(0.1 * m)}
            />
          </linearGradient>
          <linearGradient
            id={idB}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#356040"
              stopOpacity={clampOpacity(0.28 * m)}
            />
            <stop
              offset="100%"
              stopColor="#4a7c44"
              stopOpacity={clampOpacity(0.06 * m)}
            />
          </linearGradient>
          <linearGradient id={idC} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop
              offset="0%"
              stopColor="#7ea04d"
              stopOpacity={clampOpacity(0.22 * m)}
            />
            <stop
              offset="100%"
              stopColor="#a7bdb5"
              stopOpacity={clampOpacity(0.08 * m)}
            />
          </linearGradient>
        </defs>

        <polygon points="0,0 268,168 0,312" fill={`url(#${idA})`} />
        <polygon points="0,220 244,468 0,680" fill={`url(#${idB})`} />
        <polygon points="32,96 208,52 118,248" fill={`url(#${idC})`} />
        <polygon
          points="48,360 236,320 132,548"
          fill="#4a7c44"
          fillOpacity={clampOpacity(0.12 * m)}
        />
        <polygon
          points="12,520 188,440 96,620"
          fill="#2d4c3b"
          fillOpacity={clampOpacity(0.1 * m)}
        />

        <g
          stroke="#356040"
          strokeOpacity={clampOpacity(0.22 * m)}
          strokeWidth="1.15"
          fill="none"
          strokeLinejoin="round"
        >
          <path d="M0 48 L196 156 L28 268" />
          <path d="M0 380 L214 492 L44 640" />
          <path d="M72 120 L188 96 L118 208" />
        </g>

        <g fill="#2d4c3b" fillOpacity={clampOpacity(0.35 * m)}>
          <polygon points="156,72 168,72 162,84" />
          <polygon points="88,312 100,312 94,324" />
          <polygon points="52,592 64,592 58,604" />
        </g>
      </svg>
    </div>
  );
}
