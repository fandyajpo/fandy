"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Scroll progress for one element, written as CSS variables so nothing
// re-renders while scrolling:
//   --sp  0..1 across the viewport (0 when its top hits the bottom edge)
//   --vis bell curve: 0 off screen, 1 while it sits in the middle
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const span = viewport + rect.height;

      const raw = rect.height ? (viewport - rect.top) / span : 0.5;
      const progress = Math.min(1, Math.max(0, raw));

      const enter = Math.min(1, Math.max(0, (progress - 0.04) / 0.16));
      const exit = Math.min(1, Math.max(0, (0.98 - progress) / 0.18));

      node.style.setProperty("--sp", progress.toFixed(4));
      node.style.setProperty("--vis", (enter * exit).toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      node.style.removeProperty("--sp");
      node.style.removeProperty("--vis");
    };
  }, [reduced]);

  return ref;
}
