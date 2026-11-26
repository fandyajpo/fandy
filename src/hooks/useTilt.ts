"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Pointer-driven 3D tilt. Writes --rx / --ry (degrees) and --mx / --my
// (percent, for the shine) as CSS variables on the element, so the transform
// itself stays in CSS and nothing re-renders on pointer move.
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      node.style.setProperty("--ry", `${currentX.toFixed(2)}deg`);
      node.style.setProperty("--rx", `${currentY.toFixed(2)}deg`);

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = x * max * 2;
      targetY = y * max * 2;

      node.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
      kick();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    node.addEventListener("blur", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      node.removeEventListener("blur", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, reduced]);

  return ref;
}
