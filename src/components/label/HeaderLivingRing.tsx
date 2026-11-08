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
      /* Anchor: Object / NN pill; on the locked Collection, the title. */
      const pill =
        document.querySelector(".object-id-pill") ??
        document.querySelector(".collection__title");

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
      const pillH = pill?.classList.contains("object-id-pill")
        ? Math.round(pill.getBoundingClientRect().height)
        : 23;
      const nextSize = Math.max(44, Math.round(pillH * 2.15));
      setSize(nextSize);

      const el = ringRef.current;
      if (!el || !header || !pill) return;
      /* Measure against the ring's own positioning box (the header row). */
      const headerRect = (el.offsetParent ?? header).getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      /* Same vertical center as Object / NN. */
      const top = pillRect.top - headerRect.top + pillRect.height / 2 - nextSize / 2;
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

    /* The entrance animation moves the panels; measure again once it settles. */
    document.addEventListener("animationend", sync, true);
    const settle = window.setTimeout(sync, 2700);

    /* Object / NN mounts after Gallery/Collection swaps — catch late pills. */
    const mo = new MutationObserver(sync);
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("animationend", sync, true);
      window.clearTimeout(settle);
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
