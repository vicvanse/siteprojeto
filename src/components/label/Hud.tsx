import type { Artifact } from "@/data/artifacts";
import { formatPrice } from "@/data/artifacts";

/**
 * Technical HUD layer: small mono labels around the panels.
 * Decorative only (aria-hidden), desktop only (hidden ≤900px in soft.css).
 */

/** Deterministic barcode bars from the object number. */
function bars(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 118) {
    h = (h * 1103515245 + 12345) >>> 0;
    const w = 1 + ((h >>> 16) % 3);
    const gap = 1 + ((h >>> 20) % 3);
    if (x + w > 120) break;
    out.push({ x, w });
    x += w + gap;
  }
  return out;
}

export function PanelHud({ artifact }: { artifact: Artifact }) {
  const status = formatPrice(artifact);
  return (
    <>
      <div className="cx cx-log" aria-hidden>
        <span className="cx-dot" />
        ARCHIVE_LOG · NODE {artifact.number}
        <br />
        STATUS: {status} · PDF
      </div>
      <div className="cx cx-code" aria-hidden>
        <svg width="120" height="22" fill="currentColor">
          {bars(artifact.number).map((b) => (
            <rect key={b.x} x={b.x} width={b.w} height={22} />
          ))}
        </svg>
        <div className="cx-code__label">
          VKP-{artifact.number} · {artifact.releaseDate ?? "—"}
        </div>
      </div>
      <div className="cx cx-rule" aria-hidden />
    </>
  );
}

export function ReleasesHud({ first, last }: { first: string; last: string }) {
  return (
    <div className="cx cx-index" aria-hidden>
      <span className="cx-dot" />
      INDEX {first} → {last} · EXPLORE VEKON
    </div>
  );
}

export function SideHud({ first, last }: { first: string; last: string }) {
  return (
    <>
      <div className="cx cx-side cx-side--left" aria-hidden>
        VEKON — PAPERS — ARCHIVE 2026
      </div>
      <div className="cx cx-side cx-side--right" aria-hidden>
        OBJECTS {last} — {first} · INDEPENDENT PRINTED MATTER
      </div>
    </>
  );
}
