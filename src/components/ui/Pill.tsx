import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-cream/40 px-4 py-1.5 label text-cream/85 ${className}`}
    >
      {children}
    </span>
  );
}
