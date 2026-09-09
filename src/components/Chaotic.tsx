"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

type ChaoticProps = {
  children: ReactNode;
  className?: string;
  "data-cursor"?: boolean;
};

export default function Chaotic({
  children,
  className = "",
  "data-cursor": dataCursor,
}: ChaoticProps) {
  const [t, setT] = useState({ x: 0, y: 0, rotate: 0 });

  function jitter() {
    setT({
      x: Math.round(Math.random() * 10 - 5),
      y: Math.round(Math.random() * 10 - 5),
      rotate: Math.round(Math.random() * 6 - 3),
    });
  }

  return (
    <motion.div
      className={className}
      data-cursor={dataCursor ? "true" : undefined}
      animate={t}
      onHoverStart={jitter}
      onHoverEnd={() => setT({ x: 0, y: 0, rotate: 0 })}
      transition={{ type: "spring", stiffness: 320, damping: 14 }}
    >
      {children}
    </motion.div>
  );
}