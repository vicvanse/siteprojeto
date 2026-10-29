import type { CSSProperties, ReactNode } from "react";
import { BOOKLET_001, CROPS, type CropId } from "@/data/booklet-001";

const COVER = BOOKLET_001.object.cover;

export function TechnicalLabel({
  children,
  muted,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span className={`bk-label${muted ? " bk-label--muted" : ""}`}>
      {children}
    </span>
  );
}

export function BlackPill({ children }: { children: ReactNode }) {
  return <span className="bk-pill">{children}</span>;
}

export function BookletPage({
  page,
  total = "016",
  children,
  ariaLabel,
  framed,
  bareFoot,
}: {
  page: string;
  total?: string;
  children: ReactNode;
  ariaLabel: string;
  /** Thin inner plate — Gathering Moss / editorial margin. */
  framed?: boolean;
  /** Page supplies its own footer. */
  bareFoot?: boolean;
}) {
  return (
    <article
      className={`bk-page${framed ? " bk-page--framed" : ""}`}
      aria-label={ariaLabel}
    >
      <div className="bk-page__inner">
        {children}
        {bareFoot ? null : (
          <footer className="bk-page__foot">
            <span>PAPERS / 001</span>
            <span className="bk-page__foot-num">
              {page} / {total}
            </span>
          </footer>
        )}
      </div>
    </article>
  );
}

type CropProps = {
  crop: CropId;
  aspect?: string;
  fig?: string;
  caption?: string;
  className?: string;
  frameClassName?: string;
};

function parseFocus(position: string): { fx: number; fy: number } {
  const [x = "50%", y = "50%"] = position.split(/\s+/);
  const toFrac = (v: string) => {
    if (v.endsWith("%")) return Number.parseFloat(v) / 100;
    return Number.parseFloat(v) || 0.5;
  };
  return { fx: toFrac(x), fy: toFrac(y) };
}

/** Zoomed reinterpretation of the same banner — not a separate asset. */
function cropImgStyle(position: string, zoom = 1): CSSProperties {
  const { fx, fy } = parseFocus(position);
  if (zoom <= 1) {
    return { objectPosition: position };
  }
  return {
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: "none",
    left: `calc(50% - ${fx * zoom * 100}%)`,
    top: `calc(50% - ${fy * zoom * 100}%)`,
    right: "auto",
    bottom: "auto",
    objectFit: "cover",
  };
}

export function SpecimenCrop({
  crop,
  aspect = "16 / 9",
  fig,
  caption,
  className,
  frameClassName,
}: CropProps) {
  const def = CROPS[crop];
  const zoom = def.zoom ?? 1;
  const style = {
    aspectRatio: aspect,
  } as CSSProperties;

  return (
    <figure className={`bk-crop${className ? ` ${className}` : ""}`}>
      <div
        className={`bk-crop__frame${frameClassName ? ` ${frameClassName}` : ""}`}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COVER}
          alt=""
          style={cropImgStyle(def.position, zoom)}
          draggable={false}
          decoding="async"
        />
      </div>
      {fig || caption ? (
        <figcaption className="bk-crop__cap">
          <span>{fig ?? ""}</span>
          <span>{caption ?? def.note}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function BannerMedia({
  className,
  aspect = "16 / 9",
  position = "50% 45%",
  zoom = 1,
}: {
  className?: string;
  aspect?: string;
  position?: string;
  zoom?: number;
}) {
  return (
    <div
      className={`bk-media${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={COVER}
        alt=""
        draggable={false}
        decoding="async"
        style={{
          objectPosition: position,
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transformOrigin: position,
        }}
      />
    </div>
  );
}

export function ObjectMetadata() {
  const o = BOOKLET_001.object;
  const rows: [string, string][] = [
    ["TITLE", o.title],
    ["TYPE", o.type],
    ["SOURCE", o.source],
    ["DATE", o.date],
    ["DIMENSIONS", o.dimensions],
    ["MEDIUM", o.medium],
    ["COLLECTION", o.collection],
  ];

  return (
    <dl className="bk-meta-sheet">
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: "contents" }}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
