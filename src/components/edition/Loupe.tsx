"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** High-resolution image shown inside the loupe. */
  hd: string;
  children: React.ReactNode;
  className?: string;
  label: string;
};

const W = 280; // loupe width
const H = 190; // loupe height
const MIN = 1.5;
const MAX = 6;
const START = 2.5;
const TOUCH_HOLD_MS = 260;

type State = { x: number; y: number; rx: number; ry: number; w: number; h: number; touch: boolean };

/**
 * Magnifier over a sheet: a rounded window follows the mouse and shows
 * that spot enlarged. Wheel changes the magnification. On touch, press and
 * hold to bring it up, then drag; it sits above the finger.
 */
export function Loupe({ hd, children, className, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State | null>(null);
  const [zoom, setZoom] = useState(START);
  const hold = useRef<{ timer: number; x: number; y: number } | null>(null);
  const touchActive = useRef(false);

  /* Warm the HD image the first time the sheet is approached. */
  const warmed = useRef(false);
  const warm = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    const img = new Image();
    img.src = hd;
  }, [hd]);

  useEffect(() => {
    warmed.current = false;
  }, [hd]);

  const place = useCallback((clientX: number, clientY: number, touch: boolean) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = Math.min(Math.max(clientX - r.left, 0), r.width);
    const ry = Math.min(Math.max(clientY - r.top, 0), r.height);
    setState({ x: clientX, y: clientY, rx, ry, w: r.width, h: r.height, touch });
  }, []);

  /* Mouse: hover shows it, wheel sets the magnification. */
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    warm();
    place(e.clientX, e.clientY, false);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setState(null);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!state || state.touch) return;
      e.preventDefault();
      setZoom((z) => Math.min(MAX, Math.max(MIN, z * Math.exp(-e.deltaY * 0.0025))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [state]);

  /* Touch: press and hold, then drag. A quick swipe still scrolls the page. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cancelHold = () => {
      if (hold.current) window.clearTimeout(hold.current.timer);
      hold.current = null;
    };
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        cancelHold();
        return;
      }
      const t = e.touches[0]!;
      warm();
      cancelHold();
      hold.current = {
        x: t.clientX,
        y: t.clientY,
        timer: window.setTimeout(() => {
          touchActive.current = true;
          place(t.clientX, t.clientY, true);
        }, TOUCH_HOLD_MS),
      };
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if (touchActive.current) {
        e.preventDefault();
        place(t.clientX, t.clientY, true);
      } else if (hold.current && Math.hypot(t.clientX - hold.current.x, t.clientY - hold.current.y) > 10) {
        cancelHold(); // it's a scroll
      }
    };
    const onEnd = () => {
      cancelHold();
      touchActive.current = false;
      setState(null);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      cancelHold();
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [place, warm]);

  const lens = state
    ? (() => {
        const bw = state.w * zoom;
        const bh = state.h * zoom;
        const left = state.x - W / 2;
        /* On touch, lift it above the finger so it isn't hidden. */
        const top = state.touch ? state.y - H - 36 : state.y - H / 2;
        return {
          left,
          top,
          backgroundSize: `${bw}px ${bh}px`,
          backgroundPosition: `${W / 2 - state.rx * zoom}px ${H / 2 - state.ry * zoom}px`,
        };
      })()
    : null;

  return (
    <div
      ref={ref}
      className={`loupe-host${state && !state.touch ? " loupe-host--on" : ""}${className ? ` ${className}` : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onContextMenu={(e) => {
        if (touchActive.current) e.preventDefault();
      }}
      aria-label={label}
    >
      {children}
      {lens ? (
        <div
          className="loupe"
          aria-hidden
          style={{
            left: lens.left,
            top: lens.top,
            width: W,
            height: H,
            backgroundImage: `url(${hd})`,
            backgroundSize: lens.backgroundSize,
            backgroundPosition: lens.backgroundPosition,
          }}
        >
          <span className="loupe__zoom">{zoom.toFixed(1)}×</span>
        </div>
      ) : null}
    </div>
  );
}
