"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Labels = {
  sheet: string;
  close: string;
  fit: string;
  zoomIn: string;
  zoomOut: string;
  prev: string;
  next: string;
  hint: string;
};

type Props = {
  /** 1-based sheet number currently open. */
  sheet: number;
  sheets: number;
  roman: string[];
  /** High-resolution image for a sheet. */
  hd: (n: number) => string;
  /** Low-resolution image, shown while the HD one loads. */
  lo: (n: number) => string;
  /** Natural size of the HD images. */
  width: number;
  height: number;
  labels: Labels;
  onSheet: (n: number) => void;
  onClose: () => void;
};

type View = { s: number; x: number; y: number };

const BAR = 64; // toolbar height
const PAD = 24;
const MAX_FACTOR = 4; // max zoom relative to "fit"

/** Full-screen sheet viewer: wheel/pinch zoom at the cursor, drag to pan. */
export function ZoomViewer({
  sheet,
  sheets,
  roman,
  hd,
  lo,
  width,
  height,
  labels,
  onSheet,
  onClose,
}: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ s: 0, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const fitRef = useRef(1);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ d: number; mx: number; my: number } | null>(null);
  const lastTap = useRef(0);

  const box = () => {
    const el = areaRef.current;
    return el ? el.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
  };

  /* Keep the sheet on screen: centered when smaller, edges bounded when larger. */
  const clamp = useCallback(
    (v: View): View => {
      const { width: vw, height: vh } = box();
      const w = width * v.s;
      const h = height * v.s;
      const x = w <= vw - PAD * 2 ? (vw - w) / 2 : Math.min(PAD, Math.max(vw - w - PAD, v.x));
      const y = h <= vh - PAD * 2 ? (vh - h) / 2 : Math.min(PAD, Math.max(vh - h - PAD, v.y));
      return { s: v.s, x, y };
    },
    [width, height],
  );

  const fit = useCallback(() => {
    const { width: vw, height: vh } = box();
    const s = Math.min((vw - PAD * 2) / width, (vh - PAD * 2) / height);
    fitRef.current = s;
    setView(clamp({ s, x: 0, y: 0 }));
  }, [width, height, clamp]);

  /* Zoom keeping the point (px, py), in area coordinates, fixed on screen. */
  const zoomAt = useCallback(
    (factor: number, px?: number, py?: number) => {
      const v = viewRef.current;
      const { width: vw, height: vh } = box();
      const cx = px ?? vw / 2;
      const cy = py ?? vh / 2;
      const min = fitRef.current;
      const s = Math.min(min * MAX_FACTOR, Math.max(min, v.s * factor));
      const k = s / v.s;
      setView(clamp({ s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k }));
    },
    [clamp],
  );

  useLayoutEffect(() => {
    fit();
  }, [fit, sheet]);

  useEffect(() => {
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);

  /* Wheel: pinch / ctrl+wheel zooms, plain wheel pans. Non-passive to stop page zoom. */
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
      } else {
        const v = viewRef.current;
        setView(clamp({ s: v.s, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, clamp]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomAt(1.25);
      else if (e.key === "-") zoomAt(0.8);
      else if (e.key === "0") fit();
      else if (e.key === "ArrowRight" && sheet < sheets) onSheet(sheet + 1);
      else if (e.key === "ArrowLeft" && sheet > 1) onSheet(sheet - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, zoomAt, fit, onSheet, sheet, sheets]);

  /* Lock page scroll behind the viewer. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const local = (e: React.PointerEvent) => {
    const r = box();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, local(e));
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()] as [
        { x: number; y: number },
        { x: number; y: number },
      ];
      pinch.current = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
      };
    }
    /* Double tap / double click: toggle between fit and 2.5× at that point. */
    const now = Date.now();
    if (pointers.current.size === 1 && now - lastTap.current < 300) {
      const p = local(e);
      const atFit = viewRef.current.s <= fitRef.current * 1.05;
      if (atFit) zoomAt(2.5, p.x, p.y);
      else fit();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const p = local(e);
    pointers.current.set(e.pointerId, p);
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()] as [
        { x: number; y: number },
        { x: number; y: number },
      ];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const v = viewRef.current;
      const min = fitRef.current;
      const s = Math.min(min * MAX_FACTOR, Math.max(min, v.s * (d / pinch.current.d)));
      const k = s / v.s;
      setView(
        clamp({
          s,
          x: mx - (pinch.current.mx - v.x) * k,
          y: my - (pinch.current.my - v.y) * k,
        }),
      );
      pinch.current = { d, mx, my };
    } else if (pointers.current.size === 1) {
      const v = viewRef.current;
      setView(clamp({ s: v.s, x: v.x + (p.x - prev.x), y: v.y + (p.y - prev.y) }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  const percent = fitRef.current ? Math.round((view.s / fitRef.current) * 100) : 100;
  const zoomed = view.s > fitRef.current * 1.01;

  return (
    <div className="zv" role="dialog" aria-modal="true" aria-label={`${labels.sheet} ${roman[sheet - 1]}`}>
      <div className="zv__bar" style={{ height: BAR }}>
        <div className="zv__group">
          <button
            type="button"
            className="zv__btn"
            onClick={() => onSheet(sheet - 1)}
            disabled={sheet <= 1}
            aria-label={labels.prev}
          >
            ‹
          </button>
          <span className="zv__label">
            {labels.sheet} {roman[sheet - 1]} / {roman[sheets - 1]}
          </span>
          <button
            type="button"
            className="zv__btn"
            onClick={() => onSheet(sheet + 1)}
            disabled={sheet >= sheets}
            aria-label={labels.next}
          >
            ›
          </button>
        </div>
        <div className="zv__group zv__seg">
          <button type="button" onClick={() => zoomAt(0.8)} aria-label={labels.zoomOut}>
            −
          </button>
          <span className="zv__pct">{percent}%</span>
          <button type="button" onClick={() => zoomAt(1.25)} aria-label={labels.zoomIn}>
            +
          </button>
          <button type="button" onClick={fit} aria-pressed={!zoomed}>
            {labels.fit}
          </button>
        </div>
        <button type="button" className="zv__btn zv__btn--text" onClick={onClose} autoFocus>
          {labels.close}
        </button>
      </div>

      <div
        ref={areaRef}
        className={`zv__area${zoomed ? " zv__area--zoomed" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {view.s > 0 ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={sheet}
            className="zv__img"
            src={hd(sheet)}
            alt=""
            draggable={false}
            width={width}
            height={height}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
              backgroundImage: `url(${lo(sheet)})`,
            }}
          />
        ) : null}
      </div>
      <p className="zv__hint">{labels.hint}</p>
    </div>
  );
}
