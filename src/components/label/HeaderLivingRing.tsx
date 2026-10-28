"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LivingRingMark } from "./LivingRingMark";

/**
 * Header living ring.
 * Desktop: sized to View/PAPERS stack, absolute in the header row.
 * Mobile: overlays at Object / NN height — no layout space.
 */
export function HeaderLivingRing() {
  const ringRef = useRef<HTMLAnchorElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const view = document.querySelector(".label-header__view-panel");
    const brand = document.querySelector(".label-header__brand-panel");
    const header = document.querySelector(".label-header");
    const mq = window.matchMedia("(min-width: 901px)");

    const sync = () => {
      const desktop = mq.matches;
      const pill = document.querySelector(".object-id-pill");

      if (desktop) {
        const h = Math.max(
          Math.round((view as HTMLElement | null)?.offsetHeight ?? 0),
          Math.round((brand as HTMLElement | null)?.offsetHeight ?? 0),
        );
        if (h > 0) setSize(Math.round(h * 1.42));
        const el = ringRef.current;
        if (el) {
          el.style.top = "";
          el.style.transform = "";
        }
        return;
      }

      /* Mobile: size near the Object / NN pill; pin vertical center to it. */
      const pillH = pill
        ? Math.round(pill.getBoundingClientRect().height)
        : 28;
      const nextSize = Math.max(44, Math.round(pillH * 2.15));
      setSize(nextSize);

      const el = ringRef.current;
      if (!el || !header || !pill) return;
      const headerRect = header.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      /* Sit the ring higher: top third of Object / NN, not dead center. */
      const lift = Math.round(nextSize * 0.48);
      const top =
        pillRect.top -
        headerRect.top +
        pillRect.height / 2 -
        nextSize / 2 -
        lift;
      el.style.top = `${Math.round(top)}px`;
      el.style.transform = "none";
    };

    sync();
    const ro = new ResizeObserver(sync);
    if (view) ro.observe(view);
    if (brand) ro.observe(brand);
    if (header) ro.observe(header);
    const main = document.querySelector(".shell__main");
    if (main) ro.observe(main);
    window.addEventListener("resize", sync);
    mq.addEventListener("change", sync);

    /* Object / NN mounts after Gallery/Collection swaps — catch late pills. */
    const mo = new MutationObserver(sync);
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <Link
      ref={ringRef}
      href="/"
      className="label-header__ring"
      aria-label="Vekon"
      title="Vekon"
      style={
        size > 0
          ? { width: size, height: size }
          : { width: 67, height: 67 }
      }
    >
      <LivingRingMark />
    </Link>
  );
}
