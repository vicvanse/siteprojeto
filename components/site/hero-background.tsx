"use client";

import { useId } from "react";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo do hero: base mint + camada densa de triângulos (mesma família cromática
 * que `HeroTriangleArt`), sem ocupar o mesmo ficheiro para não duplicar IDs de defs.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const uid = useId().replace(/\W/g, "");
  const patA = `heroBgPatA-${uid}`;
  const patB = `heroBgPatB-${uid}`;
  const gFill = `heroBgGF-${uid}`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gFill} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a7c44" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2d4c3b" stopOpacity="0.06" />
          </linearGradient>
          {/* Tesselação de triângulos (metade de losango horizontal). */}
          <pattern
            id={patA}
            width="72"
            height="62"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <polygon
              points="0,0 36,0 18,31"
              fill={`url(#${gFill})`}
              fillOpacity="0.55"
            />
            <polygon
              points="36,0 72,0 54,31"
              fill="#356040"
              fillOpacity="0.06"
            />
            <polygon
              points="18,31 54,31 36,62"
              fill="#7ea04d"
              fillOpacity="0.05"
            />
            <polygon
              points="0,31 18,31 9,46.5"
              fill="#4a7c44"
              fillOpacity="0.04"
            />
            <polygon
              points="54,31 72,31 63,46.5"
              fill="#2d4c3b"
              fillOpacity="0.045"
            />
          </pattern>
          <pattern
            id={patB}
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(24 48 48)"
          >
            <polygon
              points="0,48 48,0 96,48"
              fill="none"
              stroke="#356040"
              strokeOpacity="0.07"
              strokeWidth="0.9"
            />
            <polygon
              points="0,48 48,96 96,48"
              fill="none"
              stroke="#4a7c44"
              strokeOpacity="0.06"
              strokeWidth="0.9"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="#f0f4f2" />
        <rect width="100%" height="100%" fill={`url(#${patA})`} />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patB})`}
          opacity="0.85"
        />

        {/* Grandes triângulos soltos (eco da composição lateral). */}
        <g opacity="0.11">
          <polygon
            points="8,12 22,8 12,28"
            fill="#4a7c44"
            transform="rotate(-8 15 18)"
          />
          <polygon
            points="78,18 94,12 88,32"
            fill="#356040"
            transform="rotate(6 88 22)"
          />
          <polygon
            points="52,4 68,2 58,22"
            fill="#7ea04d"
            opacity="0.8"
          />
          <polygon
            points="18,72 32,68 22,88"
            fill="#2d4c3b"
            opacity="0.85"
          />
          <polygon
            points="72,78 92,70 82,94"
            fill="#4a7c44"
            opacity="0.75"
          />
          <polygon
            points="40,42 55,38 46,58"
            fill="#356040"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
