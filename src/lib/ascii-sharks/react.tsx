"use client";

import { useEffect, useRef } from "react";
import { OceanEngine, type OceanEngineOptions } from "./engine";
import type { SharkSpec } from "./world";

/** Glyphs come from the canvas's font-family, so give it (or a parent) a monospace font. */
export function AsciiOcean({
  className,
  sharks,
  fishCount,
  theme = "dark",
  showGrid,
}: {
  className?: string;
  sharks?: SharkSpec[];
  fishCount?: number;
  theme?: OceanEngineOptions["theme"];
  showGrid?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new OceanEngine(canvas, {
      sharks,
      fishCount,
      theme,
      showGrid,
    });
    return () => engine.destroy();
    // Roster fixed for the life of the canvas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`ascii-ocean ${className ?? ""}`}
    />
  );
}
