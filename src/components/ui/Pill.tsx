import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-cream/30 px-3 py-1.5 label text-cream/80 ${className}`}
    >
      {children}
    </span>
  );
}
