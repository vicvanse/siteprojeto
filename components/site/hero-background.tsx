"use client";

import { useId } from "react";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo do hero: base cinza claro + tesselação densa de triângulos (tons de cinza),
 * em tela cheia — sem recortes laterais; o conteúdo fica por cima com z-index maior.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const uid = useId().replace(/\W/g, "");
  const gFill = `heroBgGF-${uid}`;
  const patA = `heroBgPatA-${uid}`;
  const patB = `heroBgPatB-${uid}`;
  const patC = `heroBgPatC-${uid}`;

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
            <stop offset="0%" stopColor="#525252" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#262626" stopOpacity="0.05" />
          </linearGradient>
          {/* Losangos / triângulos — célula 36×31 (metade da antiga 72×62) para malha mais densa. */}
          <pattern
            id={patA}
            width="36"
            height="31"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <polygon
              points="0,0 18,0 9,15.5"
              fill={`url(#${gFill})`}
              fillOpacity="0.5"
            />
            <polygon
              points="18,0 36,0 27,15.5"
              fill="#404040"
              fillOpacity="0.055"
            />
            <polygon
              points="9,15.5 27,15.5 18,31"
              fill="#737373"
              fillOpacity="0.05"
            />
            <polygon
              points="0,15.5 9,15.5 4.5,23.25"
              fill="#525252"
              fillOpacity="0.04"
            />
            <polygon
              points="27,15.5 36,15.5 31.5,23.25"
              fill="#262626"
              fillOpacity="0.045"
            />
          </pattern>
          <pattern
            id={patB}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(22 24 24)"
          >
            <polygon
              points="0,24 24,0 48,24"
              fill="none"
              stroke="#404040"
              strokeOpacity="0.065"
              strokeWidth="0.75"
            />
            <polygon
              points="0,24 24,48 48,24"
              fill="none"
              stroke="#525252"
              strokeOpacity="0.055"
              strokeWidth="0.75"
            />
          </pattern>
          {/* Terceira camada fina para preencher ritmo visual (triângulos miúdos). */}
          <pattern
            id={patC}
            width="24"
            height="21"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="translate(6 4)"
          >
            <polygon
              points="0,0 12,0 6,10.5"
              fill="#525252"
              fillOpacity="0.035"
            />
            <polygon
              points="12,0 24,0 18,10.5"
              fill="#404040"
              fillOpacity="0.03"
            />
            <polygon
              points="6,10.5 18,10.5 12,21"
              fill="#262626"
              fillOpacity="0.028"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="#f4f4f5" />
        <rect width="100%" height="100%" fill={`url(#${patA})`} />
        <rect width="100%" height="100%" fill={`url(#${patC})`} opacity="0.9" />
        <rect width="100%" height="100%" fill={`url(#${patB})`} opacity="0.82" />

        {/* Volumetria suave em escala da viewport (percentagens), muito baixa opacidade. */}
        <g opacity="0.07" fill="#525252">
          <polygon points="4,8 14,5 9,18" />
          <polygon points="86,10 96,6 92,22" />
          <polygon points="48,4 62,2 54,20" />
          <polygon points="22,78 34,74 26,92" />
          <polygon points="74,82 92,76 82,96" />
          <polygon points="44,44 58,40 50,58" />
        </g>
      </svg>
    </div>
  );
}
