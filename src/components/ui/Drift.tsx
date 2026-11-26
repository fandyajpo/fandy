"use client";

import type { CSSProperties, ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface DriftProps {
  children: ReactNode;
  className?: string;
  // px travelled over a full pass through the viewport; negative moves slower
  // than the page, positive faster.
  speed?: number;
}

export default function Drift({
  children,
  className = "",
  speed = 60,
}: DriftProps) {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`drift ${className}`}
      style={{ "--drift": `${speed}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
