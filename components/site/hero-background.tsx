"use client";

interface HeroBackgroundProps {
  className?: string;
}

/**
 * Fundo cinza estilo login PixelLife (claro): base #F3F4F6, radiais suaves,
 * vinheta #D7DADE — mais triângulos discretos nas bordas em tons de cinza.
 */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 50% at 50% 32%, rgba(255, 255, 255, 0.42) 0%, transparent 55%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 0%, #d7dade 88%),
            #f3f4f6
          `,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fillOpacity="0.42">
          <polygon points="0,0 22,0 0,26" fill="#64748b" />
          <polygon points="100,0 100,26 78,0" fill="#64748b" />
          <polygon points="0,100 0,74 22,100" fill="#78716c" />
          <polygon points="100,100 78,100 100,74" fill="#78716c" />
        </g>
        <g fillOpacity="0.32">
          <polygon points="0,32 0,52 14,42" fill="#94a3b8" />
          <polygon points="100,32 100,52 86,42" fill="#94a3b8" />
          <polygon points="0,68 14,58 0,48" fill="#64748b" />
          <polygon points="100,68 86,58 100,48" fill="#64748b" />
        </g>
        <g fillOpacity="0.22">
          <polygon points="40,0 60,0 50,12" fill="#71717a" />
          <polygon points="40,100 50,88 60,100" fill="#71717a" />
        </g>
      </svg>
    </div>
  );
}
