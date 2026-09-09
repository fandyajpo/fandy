"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const modes = ["turbo", "chaos"] as const;
type Mode = (typeof modes)[number];

const dot: Record<Mode, string> = {
  turbo: "bg-lime",
  chaos: "bg-purple",
};

const flash: Record<Mode, string> = {
  turbo: "bg-cyan",
  chaos: "bg-pink",
};

export default function ChaosToggle() {
  const [mode, setMode] = useState<Mode>("turbo");
  const [flashBg, setFlashBg] = useState<Mode | null>(null);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.add("turbo-mode");
    el.classList.toggle("chaos-mode", mode === "chaos");
  }, [mode]);

  function cycle() {
    const next = modes[(modes.indexOf(mode) + 1) % modes.length];
    setMode(next);
    setFlashBg(next);
  }

  return (
    <>
      {flashBg && (
        <motion.div
          className={`pointer-events-none fixed inset-0 z-[60] ${flash[flashBg]}`}
          initial={{ opacity: 0.75 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => setFlashBg(null)}
        />
      )}
      <motion.button
        onClick={cycle}
        data-cursor
        aria-label="Toggle mode: turbo / chaos"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 border-[3px] border-ink bg-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-paper shadow-[5px_5px_0_0_#161616]"
      >
        <span
          className={`inline-block size-3 rounded-full border-2 border-ink transition-colors ${dot[mode]}`}
        />
        mode: {mode.toUpperCase()}
        <span className="inline-block">⟳</span>
      </motion.button>
    </>
  );
}