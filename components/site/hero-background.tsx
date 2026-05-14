"use client";

import { useId } from "react";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo do hero inspirado no `AmbientLayer` do Atlas (psychovox):
 * bruma radial, massas poligonais grandes fragmentadas, linhas de varredura,
 * hairlines e rotor concêntrico — em cinza, sem animação SMIL.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const uid = useId().replace(/\W/g, "");
  const radialBloom = `heroAtlasBloom-${uid}`;
  const scanGrad = `heroAtlasScan-${uid}`;
  const patDot = `heroAtlasDot-${uid}`;

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
          <radialGradient id={radialBloom} cx="48%" cy="52%" r="55%">
            <stop offset="0%" stopColor="#737373" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#737373" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#a3a3a3" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={scanGrad} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#525252" stopOpacity="0" />
            <stop offset="50%" stopColor="#525252" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#525252" stopOpacity="0" />
          </linearGradient>
          <pattern
            id={patDot}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.2" cy="1.2" r="0.35" fill="#737373" fillOpacity="0.12" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="#f4f4f5" />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patDot})`}
          opacity="0.22"
        />

        {/* Bruma central (eco do ambientStrongFocus). */}
        <circle cx="52" cy="50" r="42" fill={`url(#${radialBloom})`} />

        {/* Anel “scaffold” discreto, canto superior esquerdo. */}
        <g
          fill="none"
          stroke="#404040"
          strokeWidth="0.35"
          strokeOpacity="0.14"
        >
          <circle cx="18" cy="22" r="11" />
          <circle
            cx="18"
            cy="22"
            r="7"
            strokeDasharray="1.5 5"
            strokeOpacity="0.12"
          />
        </g>

        {/* Massa poligonal esquerda (pentágono orgânico). */}
        <polygon
          points="4,24 26,14 40,36 24,58 7,46"
          fill="#525252"
          fillOpacity="0.07"
        />

        {/* Bloco superior direito — partido em três peças (eco morph-b break). */}
        <polygon
          points="62,12 90,9 86,28 58,26"
          fill="#404040"
          fillOpacity="0.055"
        />
        <polygon
          points="58,26 86,28 82,44 54,40"
          fill="#737373"
          fillOpacity="0.045"
        />
        <polygon
          points="90,9 98,7 96,26 86,28"
          fill="#262626"
          fillOpacity="0.04"
        />

        {/* Faixa inferior — decomposição em três polígonos (eco morph-c). */}
        <polygon
          points="6,70 36,64 40,80 10,86"
          fill="#525252"
          fillOpacity="0.05"
        />
        <polygon
          points="40,80 88,74 50,92 10,86"
          fill="#404040"
          fillOpacity="0.045"
        />
        <polygon
          points="36,64 70,60 88,74 40,80"
          fill="#737373"
          fillOpacity="0.04"
        />

        {/* Peça extra: quadrilátero inclinado (meio). */}
        <polygon
          points="44,38 72,32 78,52 36,56"
          fill="#525252"
          fillOpacity="0.035"
        />

        {/* Sistema de varredura horizontal (eco ambient-scan-system). */}
        <g strokeLinecap="round" strokeWidth="0.45" fill="none">
          <line
            x1="3"
            y1="20"
            x2="97"
            y2="20"
            stroke={`url(#${scanGrad})`}
            strokeOpacity="0.9"
          />
          <line
            x1="3"
            y1="34"
            x2="97"
            y2="34"
            stroke={`url(#${scanGrad})`}
            strokeOpacity="0.75"
          />
          <line
            x1="3"
            y1="54"
            x2="97"
            y2="54"
            stroke={`url(#${scanGrad})`}
            strokeOpacity="0.6"
          />
        </g>

        {/* Hairlines diagonais / guias. */}
        <g
          stroke="#404040"
          strokeWidth="0.28"
          strokeOpacity="0.12"
          fill="none"
          strokeLinecap="round"
        >
          <line x1="0" y1="46" x2="100" y2="30" />
          <line x1="14" y1="0" x2="14" y2="100" />
          <line x1="0" y1="68" x2="100" y2="68" strokeOpacity="0.09" />
        </g>

        {/* Rotor concêntrico + arcos (eco ambient-big-rotor), posição ~ centro-direita. */}
        <g transform="translate(58 48)">
          <g fill="none" stroke="#525252" strokeWidth="0.32" strokeOpacity="0.14">
            <circle r="9" />
            <circle r="6" />
            <circle r="3.2" />
          </g>
          <g
            fill="none"
            stroke="#404040"
            strokeWidth="0.35"
            strokeOpacity="0.11"
            strokeLinecap="round"
          >
            <path d="M 0 -9 A 9 9 0 0 1 7.8 -4.5" />
            <path d="M 9 0 A 9 9 0 0 1 3.5 8.3" />
            <path d="M -7.8 4.5 A 9 9 0 0 1 -7.8 -4.5" />
          </g>
          <circle r="0.9" fill="#525252" fillOpacity="0.35" cx="0" cy="0" />
          <circle r="0.55" fill="#404040" fillOpacity="0.4" cx="0" cy="-9" />
          <circle r="0.55" fill="#404040" fillOpacity="0.35" cx="9" cy="0" />
        </g>
      </svg>
    </div>
  );
}
