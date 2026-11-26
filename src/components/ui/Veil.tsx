"use client";

import type { ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Text that appears as it enters the viewport and fades away as it leaves.
interface VeilProps {
  children: ReactNode;
  className?: string;
}

export default function Veil({ children, className = "" }: VeilProps) {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className={`veil ${className}`}>
      {children}
    </div>
  );
}
