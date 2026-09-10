"use client";

import { motion } from "motion/react";
import FloatingBlobs from "./FloatingBlobs";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Zustand",
  "TanStack Query",
  "TanStack Router",
];

const cta = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "TAILWIND",
  "FRAMER MOTION",
  "ZUSTAND",
  "TANSTACK",
  "PERFORMANCE",
  "UI ENGINEERING",
];

export default function Skills() {
  return (
    <section id="skills" className="relative isolate overflow-hidden border-t-[3px] border-ink bg-cyan py-24">
      <FloatingBlobs />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Tech
            <br />
            <span className="relative inline-block bg-paper px-4 shadow-[8px_8px_0_0_#161616]">
              stack
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, rotate: 8 }}
            whileInView={{ opacity: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticker bg-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-cream"
          >
            Frontend developer
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 brutal bg-paper p-8"
        >
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3, rotate: -2 }}
                className="border-2 border-ink bg-cream px-3 py-2 font-mono text-sm font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#161616]"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Skill marquee */}
      <div className="mt-16 overflow-hidden">
        <div className="-rotate-1">
          <div className="overflow-hidden border-y-[3px] border-ink bg-paper py-3">
            <div className="marquee-track marquee-reverse">
            {[...cta, ...cta].map((text, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-2xl uppercase tracking-tight"
              >
                {text}
                <span className="text-pink">✳</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}