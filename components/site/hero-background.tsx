"use client";

import { useId } from "react";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo do hero: base cinza claro + várias camadas de padrões e formas
 * (triângulos, trapézios, hexágonos achatados, traços, fragmentos) em tons de cinza.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const uid = useId().replace(/\W/g, "");
  const gFill = `heroBgGF-${uid}`;
  const gFillAlt = `heroBgGFA-${uid}`;
  const gFillWarm = `heroBgGFW-${uid}`;
  const patA = `heroBgPatA-${uid}`;
  const patB = `heroBgPatB-${uid}`;
  const patC = `heroBgPatC-${uid}`;
  const patD = `heroBgPatD-${uid}`;
  const patE = `heroBgPatE-${uid}`;
  const patF = `heroBgPatF-${uid}`;
  const patG = `heroBgPatG-${uid}`;
  const patH = `heroBgPatH-${uid}`;
  const patI = `heroBgPatI-${uid}`;
  const patJ = `heroBgPatJ-${uid}`;

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
          <linearGradient id={gFillAlt} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#404040" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#737373" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id={gFillWarm} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#737373" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#404040" stopOpacity="0.03" />
          </linearGradient>
          {/* Malha base: losangos / triângulos pequenos. */}
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
          <pattern
            id={patD}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <polygon
              points="0,32 16,0 32,32"
              fill={`url(#${gFillAlt})`}
              fillOpacity="0.35"
            />
            <polygon
              points="0,0 12,0 0,14"
              fill="#525252"
              fillOpacity="0.038"
            />
            <polygon
              points="26,4 32,0 32,18"
              fill="#262626"
              fillOpacity="0.032"
            />
            <polygon
              points="8,22 20,32 4,30"
              fill="#737373"
              fillOpacity="0.03"
            />
            <line
              x1="0"
              y1="20"
              x2="22"
              y2="32"
              stroke="#404040"
              strokeOpacity="0.055"
              strokeWidth="0.55"
            />
          </pattern>
          <pattern
            id={patE}
            width="44"
            height="38"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="translate(3 2)"
          >
            <polygon
              points="0,12 18,0 40,8 22,38"
              fill="#525252"
              fillOpacity="0.028"
            />
            <polygon
              points="4,38 44,28 36,38"
              fill="#404040"
              fillOpacity="0.032"
            />
            <polygon
              points="30,0 44,0 38,16"
              fill="#262626"
              fillOpacity="0.026"
            />
            <polygon
              points="12,18 28,14 20,32"
              fill="#737373"
              fillOpacity="0.025"
            />
          </pattern>
          <pattern
            id={patF}
            width="56"
            height="52"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="rotate(-11 28 26)"
          >
            <polygon
              points="8,4 28,20 4,24"
              fill="none"
              stroke="#525252"
              strokeOpacity="0.05"
              strokeWidth="0.65"
            />
            <polygon
              points="36,8 52,28 30,44"
              fill="none"
              stroke="#404040"
              strokeOpacity="0.045"
              strokeWidth="0.6"
            />
            <polygon
              points="20,36 44,32 48,48 24,50"
              fill="none"
              stroke="#262626"
              strokeOpacity="0.04"
              strokeWidth="0.55"
            />
            <polygon
              points="0,40 14,46 8,52"
              fill="#737373"
              fillOpacity="0.022"
            />
          </pattern>
          {/* Fragmentos: só triângulos escalenos / agulha — célula 28×36. */}
          <pattern
            id={patG}
            width="28"
            height="36"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="translate(11 7)"
          >
            <polygon
              points="0,2 22,0 6,24"
              fill={`url(#${gFillWarm})`}
              fillOpacity="0.4"
            />
            <polygon
              points="24,8 28,28 10,20"
              fill="#404040"
              fillOpacity="0.03"
            />
            <polygon
              points="2,32 18,36 0,36"
              fill="#262626"
              fillOpacity="0.034"
            />
            <polygon
              points="14,12 26,6 20,22"
              fill="#525252"
              fillOpacity="0.026"
            />
          </pattern>
          {/* Faixas diagonais de triângulos muito alongados — 40×34. */}
          <pattern
            id={patH}
            width="40"
            height="34"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="rotate(31 20 17)"
          >
            <polygon
              points="0,0 38,6 4,34"
              fill="#525252"
              fillOpacity="0.022"
            />
            <polygon
              points="8,0 40,18 0,12"
              fill="#737373"
              fillOpacity="0.02"
            />
            <polygon
              points="20,4 36,0 32,20"
              fill="#404040"
              fillOpacity="0.024"
            />
            <line
              x1="0"
              y1="22"
              x2="40"
              y2="8"
              stroke="#262626"
              strokeOpacity="0.04"
              strokeWidth="0.45"
            />
          </pattern>
          {/* Hex achatado + triângulo obtuso — 48×42. */}
          <pattern
            id={patI}
            width="48"
            height="42"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="translate(-4 3)"
          >
            <polygon
              points="24,2 38,10 38,26 24,34 10,26 10,10"
              fill="#525252"
              fillOpacity="0.018"
            />
            <polygon
              points="0,18 16,8 20,40"
              fill="#404040"
              fillOpacity="0.026"
            />
            <polygon
              points="44,0 48,20 32,12"
              fill="#262626"
              fillOpacity="0.022"
            />
            <polygon
              points="30,38 48,42 40,28"
              fill="#737373"
              fillOpacity="0.02"
            />
          </pattern>
          {/* Rede de contornos: triângulos vazios de tamanhos diferentes — 64×58. */}
          <pattern
            id={patJ}
            width="64"
            height="58"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            patternTransform="rotate(7 32 29)"
          >
            <polygon
              points="4,6 22,4 10,26"
              fill="none"
              stroke="#525252"
              strokeOpacity="0.038"
              strokeWidth="0.5"
            />
            <polygon
              points="34,8 58,20 40,42"
              fill="none"
              stroke="#404040"
              strokeOpacity="0.032"
              strokeWidth="0.48"
            />
            <polygon
              points="12,38 44,32 28,54"
              fill="none"
              stroke="#262626"
              strokeOpacity="0.03"
              strokeWidth="0.42"
            />
            <polygon
              points="48,44 62,48 54,56"
              fill="#737373"
              fillOpacity="0.018"
            />
            <polygon
              points="0,48 12,52 4,58"
              fill="none"
              stroke="#525252"
              strokeOpacity="0.035"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="#f4f4f5" />
        <rect width="100%" height="100%" fill={`url(#${patA})`} />
        <rect width="100%" height="100%" fill={`url(#${patD})`} opacity="0.72" />
        <rect width="100%" height="100%" fill={`url(#${patG})`} opacity="0.68" />
        <rect width="100%" height="100%" fill={`url(#${patC})`} opacity="0.88" />
        <rect width="100%" height="100%" fill={`url(#${patH})`} opacity="0.55" />
        <rect width="100%" height="100%" fill={`url(#${patE})`} opacity="0.65" />
        <rect width="100%" height="100%" fill={`url(#${patI})`} opacity="0.58" />
        <rect width="100%" height="100%" fill={`url(#${patB})`} opacity="0.78" />
        <rect width="100%" height="100%" fill={`url(#${patF})`} opacity="0.7" />
        <rect width="100%" height="100%" fill={`url(#${patJ})`} opacity="0.62" />

        {/* Formas únicas na viewport — preenchimento. */}
        <g opacity="0.085" fill="#525252">
          <polygon points="4,8 14,5 9,18" />
          <polygon points="86,10 96,6 92,22" />
          <polygon points="48,4 62,2 54,20" />
          <polygon points="22,78 34,74 26,92" />
          <polygon points="74,82 92,76 82,96" />
          <polygon points="44,44 58,40 50,58" />
          <polygon points="2,42 8,38 12,52 5,56" fill="#404040" fillOpacity="0.9" />
          <polygon points="88,48 98,44 100,58 90,62" fill="#262626" fillOpacity="0.85" />
          <polygon points="30,8 42,6 44,18 32,20" fill="#737373" fillOpacity="0.75" />
          <polygon points="60,2 60,16 78,8" />
          <polygon points="12,58 12,72 28,68" fill="#404040" fillOpacity="0.88" />
          <polygon points="52,62 70,58 64,78" />
          <polygon points="0,88 0,98 16,94" fill="#262626" fillOpacity="0.9" />
          <polygon points="34,28 52,22 40,46" />
          <polygon points="6,24 18,20 10,38" fill="#737373" fillOpacity="0.8" />
          <polygon points="70,30 88,26 82,48" />
          <polygon points="50,88 58,82 66,88 58,94" fill="#404040" fillOpacity="0.75" />
          <polygon points="18,88 24,84 30,90 22,96" />
          {/* Novas peças: pentágonos irregulares, cunhas, agulhas */}
          <polygon points="92,68 100,62 100,78 94,82 88,76" fill="#525252" fillOpacity="0.82" />
          <polygon points="40,72 55,68 48,88 32,86" fill="#404040" fillOpacity="0.78" />
          <polygon points="14,2 28,0 22,14 8,12" fill="#737373" fillOpacity="0.7" />
          <polygon points="66,48 82,44 90,58 72,62" />
          <polygon points="0,28 6,22 14,36 2,40" fill="#262626" fillOpacity="0.85" />
          <polygon points="56,18 72,12 68,32 52,30" />
          <polygon points="38,92 52,88 46,100 34,98" fill="#404040" fillOpacity="0.72" />
          <polygon points="76,2 90,0 84,16" />
          <polygon points="20,46 32,42 28,58 14,54" fill="#737373" fillOpacity="0.68" />
        </g>

        <g opacity="0.055" fill="none" stroke="#404040" strokeWidth="0.35">
          <polygon points="10,12 22,8 16,26" />
          <polygon points="76,20 92,14 88,34" />
          <polygon points="38,52 54,46 48,66" />
          <polygon points="8,62 20,58 14,76" stroke="#525252" />
          <polygon points="82,38 96,42 90,58" stroke="#262626" />
          <polygon points="46,12 58,18 52,4" />
          <polygon points="24,32 36,28 32,44" stroke="#737373" />
          <polygon points="2,18 16,14 8,30" stroke="#525252" />
          <polygon points="62,70 78,66 70,88" stroke="#404040" />
          <polygon points="32,78 48,74 40,92" stroke="#262626" />
        </g>

        {/* Fragmentos com curva (não só triângulos) — opacidade baixa. */}
        <g
          opacity="0.04"
          fill="none"
          stroke="#404040"
          strokeWidth="0.4"
          strokeLinejoin="round"
        >
          <path d="M 6 48 Q 18 38 28 52 T 44 46" />
          <path d="M 72 12 Q 88 22 82 40" stroke="#525252" />
          <path d="M 48 24 Q 62 18 70 32 T 88 28" stroke="#262626" />
        </g>

        <g opacity="0.04">
          <polygon points="56,36 64,34 60,44" fill="#525252" fillOpacity="0.55" />
          <polygon points="8,50 14,48 10,58" fill="#404040" fillOpacity="0.5" />
          <polygon points="94,26 100,24 98,32" fill="#737373" fillOpacity="0.45" />
          <polygon points="42,18 50,16 46,26" fill="#262626" fillOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
