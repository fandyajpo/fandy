"use client";

import { motion } from "motion/react";

type Shape = {
  top?: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  dur: number;
  dx: number;
  dy: number;
  rot: number;
  round?: boolean;
  opacity?: number;
};

const shapes: Shape[] = [
  { top: "8%", left: "5%", size: 64, color: "bg-pop", dur: 9, dx: 34, dy: 22, rot: 20 },
  { top: "72%", left: "10%", size: 44, color: "bg-pink", dur: 7, dx: -26, dy: 16, rot: -25, round: true },
  { top: "78%", right: "8%", size: 56, color: "bg-lime", dur: 11, dx: -30, dy: -22, rot: 15 },
  { top: "12%", right: "7%", size: 40, color: "bg-cyan", dur: 8, dx: -16, dy: 26, rot: 30, round: true },
  { top: "46%", left: "4%", size: 26, color: "bg-purple", dur: 6, dx: 22, dy: -30, rot: 40, opacity: 0.8 },
  { top: "48%", left: "44%", size: 84, color: "bg-orange", dur: 13, dx: -26, dy: 12, rot: 8, opacity: 0.6 },
  { top: "2%", left: "38%", size: 32, color: "bg-cyan", dur: 10, dx: -40, dy: 30, rot: 45, round: true, opacity: 0.7 },
  { top: "58%", right: "14%", size: 36, color: "bg-pop", dur: 8, dx: 30, dy: -18, rot: 22, round: true },
];

export default function FloatingBlobs({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute border-[3px] border-ink shadow-[4px_4px_0_0_#161616] ${shape.color} ${shape.round ? "rounded-full" : ""}`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity ?? 0.85,
          }}
          animate={{ x: [0, shape.dx, 0], y: [0, shape.dy, 0], rotate: [0, shape.rot, 0] }}
          transition={{ duration: shape.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}