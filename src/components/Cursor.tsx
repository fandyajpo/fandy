"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.9 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.9 });
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-off");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      setSupported(true);
    };
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, input, [data-cursor]"
      );
      setActive(Boolean(target));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("cursor-off");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!supported) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-1 -mt-1 size-2 rounded-full bg-ink"
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1, scale: active ? 0.3 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 size-8 rounded-full border-[2px] border-ink"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: active ? 1.7 : 1,
          backgroundColor: active ? "rgba(255,93,115,0.3)" : "rgba(255,93,115,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}