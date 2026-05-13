interface HeroBackgroundProps {
  className?: string;
}

/** Fundo da faixa do cabeçalho: cor única, sem grelha nem vinhetas. */
export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#f0f4f2] ${className}`}
    />
  );
}
