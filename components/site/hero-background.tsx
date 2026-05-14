"use client";

import { useId } from "react";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo do hero: espaço em perspectiva (paredes + piso + fundo central),
 * texturas tipo labirinto/grelha e blocos isométricos — inspirado em composições
 * arquitectónicas / caligráficas de referência, adaptado a paleta neutra do site.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const uid = useId().replace(/\W/g, "");
  const sky = `heroArchSky-${uid}`;
  const mazeWall = `heroArchMazeWall-${uid}`;
  const mazeCenter = `heroArchMazeCenter-${uid}`;
  const mazeFloor = `heroArchMazeFloor-${uid}`;
  const clipLeft = `heroArchClipL-${uid}`;
  const clipRight = `heroArchClipR-${uid}`;
  const clipCenter = `heroArchClipC-${uid}`;
  const clipFloor = `heroArchClipF-${uid}`;
  const clipCeil = `heroArchClipCeil-${uid}`;
  const vignette = `heroArchVig-${uid}`;

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
          <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4e2ea" />
            <stop offset="42%" stopColor="#cdd4dc" />
            <stop offset="100%" stopColor="#8e98a5" />
          </linearGradient>

          {/* Grelha labiríntica — traços finos (eco das superfícies cheias de linha). */}
          <pattern
            id={mazeWall}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0h7M0 0v7M3.5 0v3.5M0 3.5h3.5M3.5 3.5H7M3.5 3.5V7"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.35"
              strokeOpacity="0.35"
            />
          </pattern>

          <pattern
            id={mazeCenter}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0h5M0 0v5M2.5 0v2.5M0 2.5h2.5M2.5 2.5H5M2.5 2.5V5"
              fill="none"
              stroke="#7a9a96"
              strokeWidth="0.28"
              opacity="0.14"
            />
          </pattern>

          <pattern
            id={mazeFloor}
            width="8"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 1h8M0 3h8M1 0v5M4 0v5M7 0v5"
              fill="none"
              stroke="#5c6670"
              strokeWidth="0.25"
              opacity="0.18"
            />
          </pattern>

          <clipPath id={clipLeft}>
            <polygon points="0,0 36,0 26,100 0,100" />
          </clipPath>
          <clipPath id={clipRight}>
            <polygon points="64,0 100,0 100,100 74,100" />
          </clipPath>
          <clipPath id={clipCenter}>
            <polygon points="33,3 67,3 62,97 38,97" />
          </clipPath>
          <clipPath id={clipFloor}>
            <polygon points="0,100 100,100 77,70 23,70" />
          </clipPath>
          <clipPath id={clipCeil}>
            <polygon points="0,0 100,0 72,14 28,14" />
          </clipPath>
          <radialGradient id={vignette} cx="50%" cy="44%" r="78%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.16" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#${sky})`} />

        {/* Tecto em perspectiva — muito suave. */}
        <g clipPath={`url(#${clipCeil})`}>
          <rect
            x="0"
            y="0"
            width="100"
            height="16"
            fill="#b8c0ca"
            fillOpacity="0.35"
          />
          <rect
            x="0"
            y="0"
            width="100"
            height="16"
            fill={`url(#${mazeWall})`}
            fillOpacity="0.4"
          />
        </g>

        {/* Parede esquerda (frio). */}
        <polygon points="0,0 36,0 26,100 0,100" fill="#5a6672" fillOpacity="0.42" />
        <g clipPath={`url(#${clipLeft})`}>
          <rect
            x="0"
            y="0"
            width="40"
            height="100"
            fill={`url(#${mazeWall})`}
            fillOpacity="0.75"
          />
        </g>

        {/* Parede direita (ligeiramente mais quente). */}
        <polygon points="64,0 100,0 100,100 74,100" fill="#6d5f5e" fillOpacity="0.36" />
        <g clipPath={`url(#${clipRight})`}>
          <rect
            x="60"
            y="0"
            width="45"
            height="100"
            fill={`url(#${mazeWall})`}
            fillOpacity="0.45"
          />
        </g>

        {/* Fundo central (“fundo da sala”) — mais claro. */}
        <polygon points="33,3 67,3 62,97 38,97" fill="#ebe9e4" fillOpacity="0.94" />
        <g clipPath={`url(#${clipCenter})`}>
          <rect x="30" y="0" width="40" height="100" fill={`url(#${mazeCenter})`} />
        </g>

        {/* Piso em perspectiva. */}
        <polygon points="0,100 100,100 77,70 23,70" fill="#9aa4ae" fillOpacity="0.45" />
        <g clipPath={`url(#${clipFloor})`}>
          <rect x="0" y="65" width="100" height="40" fill={`url(#${mazeFloor})`} />
        </g>

        {/* Linhas de caixa — reforçam perspectiva. */}
        <g
          fill="none"
          stroke="#404040"
          strokeWidth="0.22"
          strokeOpacity="0.18"
        >
          <line x1="36" y1="0" x2="26" y2="100" />
          <line x1="64" y1="0" x2="74" y2="100" />
          <line x1="33" y1="3" x2="23" y2="70" />
          <line x1="67" y1="3" x2="77" y2="70" />
          <line x1="38" y1="97" x2="23" y2="70" />
          <line x1="62" y1="97" x2="77" y2="70" />
        </g>

        {/* Cubo isométrico central (três faces visíveis). */}
        <g opacity="0.88">
          <polygon
            points="50,26 64,36 50,46 36,36"
            fill="#3a3f45"
            fillOpacity="0.55"
          />
          <polygon
            points="36,36 50,46 50,62 36,52"
            fill="#2c3036"
            fillOpacity="0.62"
          />
          <polygon
            points="50,46 64,36 64,52 50,62"
            fill="#525a62"
            fillOpacity="0.5"
          />
          <g
            fill="none"
            stroke="#d4d4d4"
            strokeWidth="0.2"
            strokeOpacity="0.15"
          >
            <line x1="50" y1="26" x2="50" y2="46" />
            <line x1="36" y1="36" x2="64" y2="36" />
            <line x1="36" y1="36" x2="50" y2="46" />
            <line x1="50" y1="46" x2="64" y2="36" />
          </g>
        </g>

        {/* Degrau de volumes miúdos (eco pirâmide isométrica de cubos). */}
        <g
          fill="#f5f5f4"
          fillOpacity="0.55"
          stroke="#404040"
          strokeWidth="0.12"
          strokeOpacity="0.35"
        >
          <polygon points="50,66 53,68 50,70 47,68" />
          <polygon points="47,70 50,72 47,74 44,72" />
          <polygon points="50,72 53,70 56,72 53,74" />
          <polygon points="44,74 47,76 44,78 41,76" />
          <polygon points="47,76 50,78 47,80 44,78" />
          <polygon points="50,78 53,76 56,78 53,80" />
          <polygon points="53,76 56,74 59,76 56,78" />
        </g>

        {/* Traços orgânicos suaves (sugestão de caligrafia em camada). */}
        <g
          fill="none"
          stroke="#525252"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.07"
        >
          <path d="M8 42 Q22 28 38 44 T62 38" />
          <path d="M78 22 Q92 36 88 58" />
          <path d="M12 78 Q30 88 48 72 Q66 60 88 74" />
        </g>
        <g
          fill="none"
          stroke="#737373"
          strokeWidth="0.28"
          strokeLinecap="round"
          opacity="0.055"
        >
          <path d="M42 12 Q50 8 58 14" />
          <path d="M24 58 Q36 52 48 62" />
        </g>

        <rect width="100" height="100" fill={`url(#${vignette})`} />
      </svg>
    </div>
  );
}
