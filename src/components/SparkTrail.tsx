"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  dx: number;
  dy: number;
  rot: number;
};

const colors = [
  "var(--color-pop)",
  "var(--color-pink)",
  "var(--color-cyan)",
  "var(--color-lime)",
  "var(--color-purple)",
  "var(--color-orange)",
];

let nextId = 0;

export default function SparkTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const last = useRef({ x: 0, y: 0, at: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const lastPos = last.current;
      const dist = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);
      if (now - lastPos.at < 26 || dist < 14) return;
      last.current = { x: e.clientX, y: e.clientY, at: now };

      const id = nextId++;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      const particle: Particle = {
        id,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 8,
        dx: Math.cos(angle) * speed * 8,
        dy: Math.sin(angle) * speed * 8 - 10,
        rot: Math.random() * 360,
      };
      setParticles((prev) => [...prev.slice(-40), particle]);
      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 750);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute border-[2px] border-ink shadow-[2px_2px_0_0_#161616]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.dx, y: p.dy, rotate: p.rot, scale: 0.4 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}