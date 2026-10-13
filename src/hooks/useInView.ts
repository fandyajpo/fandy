"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  once?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {},
): [React.RefObject<T | null>, boolean] {
  const {
    once = true,
    root = null,
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.15,
  } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallback = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView];
}
