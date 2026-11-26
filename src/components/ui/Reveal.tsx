"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const shown = reduced || inView;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(30px) scale(0.965)",
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
