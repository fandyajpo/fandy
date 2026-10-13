"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(target: number, active: boolean, duration = 1400): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduced]);

  if (active && reduced) return target;
  return value;
}
