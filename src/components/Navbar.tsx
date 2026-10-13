"use client";

import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";
import Button from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/Icons";
import { navItems, profile } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((node): node is Element => node !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-cream/15 bg-garden/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3.5 md:px-8 md:py-4">
          <a
            href="#top"
            className="display text-[26px] text-cream transition-opacity hover:opacity-75 md:text-3xl"
            aria-label={`${profile.fullName} — home`}
          >
            {profile.wordmark}
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`label transition-colors duration-300 ${
                  active === item.href
                    ? "text-peach"
                    : "text-cream/75 hover:text-cream"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="#contact"
              className="hidden px-5 py-2.5 text-[11px] md:inline-flex"
            >
              Let&apos;s talk
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-cream/60 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
