"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The heron, inline so it can be drawn: the strokes ink themselves in
 * when the page opens. Seven taps (we start remembering at seven) and the
 * heron flies off the plate, then is drawn again.
 */
export function HeronEmblem({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const taps = useRef<{ n: number; t: number }>({ n: 0, t: 0 });
  const [state, setState] = useState<"idle" | "draw" | "fly" | "rebirth">("idle");

  // iOS only paints :active (the press-in relief) once a touch listener exists.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("draw");
      return;
    }
    const delay = document.documentElement.hasAttribute("data-enter") ? 1500 : 150;
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          timer = window.setTimeout(() => setState("draw"), delay);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const onTap = () => {
    if (state === "fly") return;
    const now = Date.now();
    const c = taps.current;
    c.n = now - c.t < 700 ? c.n + 1 : 1;
    c.t = now;
    if (c.n >= 7) {
      c.n = 0;
      setState("fly");
      window.setTimeout(() => {
        setState("rebirth");
        requestAnimationFrame(() => requestAnimationFrame(() => setState("draw")));
      }, 2600);
    }
  };

  return (
    <svg
      ref={ref}
      className="vh-heron"
      data-state={state}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      onClick={onTap}
    >
      <g className="vh-heron__frame"><circle pathLength="1" cx="160" cy="160" r="134" fill="none" stroke="#1E3AA8" strokeWidth="2.5"/><circle pathLength="1" cx="160" cy="160" r="126" fill="none" stroke="#1E3AA8" strokeWidth=".9"/><path pathLength="1" d="M160 43 l5 11 -5 11 -5 -11 Z" fill="#1E3AA8"/><path pathLength="1" d="M160 256 l5 11 -5 11 -5 -11 Z" fill="#1E3AA8"/></g>
      <g className="vh-heron__bird"><g fill="none" stroke="#1E3AA8" strokeLinecap="round" strokeLinejoin="round"><path pathLength="1" d="M83 158 Q112 135 135 145 Q150 128 162 118 Q183 106 197 94 Q205 88 217 91 L251 98 L218 102 Q206 99 200 107 Q196 125 189 140 Q181 159 170 167 Q156 171 148 183 Q139 205 121 212" strokeWidth="3"/><path pathLength="1" d="M133 145 Q102 107 64 100 Q82 138 114 161 Q83 146 53 150 Q91 185 139 180" strokeWidth="3"/><path pathLength="1" d="M151 166 Q109 194 74 211 Q114 209 159 187" strokeWidth="2.5"/><path pathLength="1" d="M144 185 L108 237 M153 187 L126 239" strokeWidth="2.5"/><path pathLength="1" d="M108 237 l-13 3 m13 -3 l-5 7 M126 239 l12 4 m-12 -4 l4 8" strokeWidth="1.8"/><path pathLength="1" d="M70 106 Q99 148 134 172" strokeWidth=".7"/><path pathLength="1" d="M77 109 Q103 149.5 136 170.7" strokeWidth=".7"/><path pathLength="1" d="M84 112 Q107 151 138 169.4" strokeWidth=".7"/><path pathLength="1" d="M91 115 Q111 152.5 140 168.1" strokeWidth=".7"/><path pathLength="1" d="M98 118 Q115 154 142 166.8" strokeWidth=".7"/><path pathLength="1" d="M105 121 Q119 155.5 144 165.5" strokeWidth=".7"/><path pathLength="1" d="M112 124 Q123 157 146 164.2" strokeWidth=".7"/><path pathLength="1" d="M119 127 Q127 158.5 148 162.9" strokeWidth=".7"/><path pathLength="1" d="M182 121 Q171 147 155 158 M175 130 Q164 151 148 159" strokeWidth="1"/><circle cx="211" cy="95" r="1.8" fill="#1E3AA8" stroke="none"/></g></g>
      <g className="vh-heron__ticks"><g stroke="#1E3AA8" strokeWidth="1" fill="none"><path pathLength="1" d="M50 157 h18 M252 157 h18"/><path pathLength="1" d="M154 72 h12 M160 66 v12"/></g></g>
    </svg>
  );
}
