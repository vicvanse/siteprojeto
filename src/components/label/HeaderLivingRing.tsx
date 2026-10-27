"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LivingRingMark } from "./LivingRingMark";

/** Desktop-only header ring. Mobile ring lives beside Object ID in FeaturedObject. */
export function HeaderLivingRing() {
  const [size, setSize] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const applyMq = () => setDesktop(mq.matches);
    applyMq();
    mq.addEventListener("change", applyMq);

    const view = document.querySelector(".label-header__view-panel");
    const brand = document.querySelector(".label-header__brand-panel");
    if (!view && !brand) {
      return () => mq.removeEventListener("change", applyMq);
    }

    const sync = () => {
      const h = Math.max(
        Math.round((view as HTMLElement | null)?.offsetHeight ?? 0),
        Math.round((brand as HTMLElement | null)?.offsetHeight ?? 0),
      );
      if (h <= 0) return;
      setSize(Math.round(h * (mq.matches ? 1.42 : 1)));
    };

    sync();
    const ro = new ResizeObserver(sync);
    if (view) ro.observe(view);
    if (brand) ro.observe(brand);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", applyMq);
    };
  }, []);

  if (!desktop) return null;

  return (
    <Link
      href="/"
      className="label-header__ring"
      aria-label="Vekon — Memory · Personas"
      title="Vekon"
      style={
        size > 0
          ? { width: size, height: size }
          : { width: 120, height: 120 }
      }
    >
      <LivingRingMark />
    </Link>
  );
}
