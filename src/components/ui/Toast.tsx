"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "./Icons";

interface ToastItem {
  id: number;
  message: string;
}

let counter = 0;

export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("app:toast", { detail: message }));
}

export default function Toast() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      const id = ++counter;
      setItems((prev) => [...prev, { id, message }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 2400);
    };

    window.addEventListener("app:toast", onToast);
    return () => window.removeEventListener("app:toast", onToast);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-8 left-1/2 z-[95] flex -translate-x-1/2 flex-col items-center gap-2"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="toast-item flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-ink shadow-[0_10px_30px_rgba(6,30,34,0.45)]"
        >
          <CheckIcon className="size-4 text-rust" />
          {item.message}
        </div>
      ))}
    </div>
  );
}
