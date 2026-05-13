interface HeroBackgroundProps {
  className?: string;
}

/** Fundo do hero: mint uniforme (a arte triangular fica só em `HeroTriangleArt` nas laterais). */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#f0f4f2] ${className}`}
    />
  );
}
