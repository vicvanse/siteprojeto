"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LivingRingMark } from "./LivingRingMark";

/** Header living ring — 1:1 with View/PAPERS on mobile; larger on desktop. */
export function HeaderLivingRing() {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const view = document.querySelector(".label-header__view-panel");
    const brand = document.querySelector(".label-header__brand-panel");
    if (!view && !brand) return;

    const sync = () => {
      const h = Math.max(
        Math.round((view as HTMLElement | null)?.offsetHeight ?? 0),
        Math.round((brand as HTMLElement | null)?.offsetHeight ?? 0),
      );
      if (h <= 0) return;
      const desktop = window.matchMedia("(min-width: 901px)").matches;
      setSize(Math.round(h * (desktop ? 1.42 : 1)));
    };

    sync();
    const ro = new ResizeObserver(sync);
    if (view) ro.observe(view);
    if (brand) ro.observe(brand);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <Link
      href="/"
      className="label-header__ring"
      aria-label="Vekon — Memory · Personas"
      title="Vekon"
      style={
        size > 0
          ? { width: size, height: size }
          : { width: 96, height: 96 }
      }
    >
      <LivingRingMark />
    </Link>
  );
}
