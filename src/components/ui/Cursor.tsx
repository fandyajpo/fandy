"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const SELECTOR = "a, button, [data-cursor]";
const FINE_POINTER = "(pointer: fine)";

function subscribeToPointer(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getFinePointer() {
  return window.matchMedia(FINE_POINTER).matches;
}

function getServerFinePointer() {
  return false;
}

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const fine = useSyncExternalStore(
    subscribeToPointer,
    getFinePointer,
    getServerFinePointer,
  );

  useEffect(() => {
    if (!fine) return;

    document.documentElement.classList.add("cursor-off");

    const onMove = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const onOver = (event: PointerEvent) => {
      const node = event.target as Element | null;
      setActive(Boolean(node?.closest(SELECTOR)));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("cursor-off");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <svg
        width="26"
        height="28"
        viewBox="0 0 20 24"
        fill="none"
        style={{ transform: "translate(-3px, -2px)" }}
      >
        <path
          d="M3 2 L3 21 L8 16 L11.5 23.5 L15 22 L11.5 15 L18 15 Z"
          fill={active ? "#F2A66B" : "#FBEBD0"}
          stroke="#17130A"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="transition-[fill] duration-200"
        />
      </svg>
    </div>
  );
}
