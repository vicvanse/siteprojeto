interface HeroBackgroundProps {
  className?: string;
}

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[#f0f4f2]" />

      <div
        className="absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "224px 224px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 82% 28%, rgba(74, 124, 68, 0.09), transparent 22%),
            radial-gradient(circle at 82% 72%, rgba(74, 124, 68, 0.08), transparent 24%),
            radial-gradient(circle at 68% 38%, rgba(74, 124, 68, 0.04), transparent 18%),
            radial-gradient(circle at 30% 45%, rgba(0, 0, 0, 0.02), transparent 18%)
          `,
        }}
      />

      <div
        className="absolute inset-y-0 right-0 w-[46%] opacity-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(240,244,242,0) 0%, rgba(74,124,68,0.015) 30%, rgba(74,124,68,0.03) 60%, rgba(74,124,68,0.045) 100%)",
        }}
      />
    </div>
  );
}
