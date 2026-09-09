"use client";

import { motion } from "motion/react";

const links = [
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-ink bg-cream"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          className="brutal-sm flex items-center gap-3 bg-paper px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wider"
        >
          <span className="inline-block h-3 w-3 bg-pink" />
          fandy.dev
        </a>

        <nav className="hidden gap-2 font-mono text-sm font-bold uppercase tracking-wide sm:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              data-cursor
              whileHover={{ y: -3, rotate: -1.5 }}
              className="border-[3px] border-ink bg-paper px-3 py-2 shadow-[3px_3px_0_0_#161616]"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="/cv/CV-FandyAhmadJanurPratama-Frontend.pdf"
          download
          data-cursor
          whileHover={{ y: -3, rotate: 1.5 }}
          whileTap={{ scale: 0.95 }}
          className="border-[3px] border-ink bg-pop px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-chip shadow-[4px_4px_0_0_#161616]"
        >
          ↓ CV
        </motion.a>
      </div>
    </motion.header>
  );
}
