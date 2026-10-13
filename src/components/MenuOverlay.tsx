"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, CloseIcon } from "@/components/ui/Icons";
import { contact, navItems, profile } from "@/data/portfolio";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 bg-garden transition-all duration-500 ${
        open
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <div className="flex h-full flex-col px-6 py-5 md:px-10 md:py-8">
        <div className="flex items-center justify-between">
          <span className="display text-[26px] text-cream md:text-3xl">
            {profile.wordmark}
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-cream/60 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Menu"
          className="flex flex-1 flex-col justify-center gap-1 md:gap-3"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className={`display group flex items-center gap-5 text-cream transition-all duration-500 md:gap-8 ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${0.1 + i * 0.08}s` : "0s",
                fontSize: "clamp(44px, 9vw, 104px)",
              }}
            >
              <span className="label text-peach/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-3">
                {item.label}
              </span>
              <ArrowUpRight className="ml-auto size-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-5">
          <a
            href={`mailto:${contact.email}`}
            tabIndex={open ? 0 : -1}
            className="label text-cream/75 transition-colors hover:text-cream"
          >
            {contact.email}
          </a>
          <span className="label text-cream/50">
            {profile.city}, {profile.country}
          </span>
        </div>
      </div>
    </div>
  );
}
