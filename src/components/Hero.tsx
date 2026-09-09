"use client";

import { motion, type Variants } from "motion/react";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import FloatingBlobs from "./FloatingBlobs";

const marqueeItems = [
  "REV TILL YOU DIE",
  "NEO-BRUTALISM",
  "NEXT.JS",
  "RAW AESTHETICS",
  "FULL SEND",
  "TURBO MODE",
  "HAND-CRAFTED",
  "NO CLUTCH OIL REQUIRED",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 60, rotate: 12 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  },
};

const words = [
  { text: "Fandy", cls: "text-ink" },
  { text: "Ahmad", cls: "text-pink" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <FloatingBlobs />
      <div className="dots absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block border-[3px] border-ink bg-pop px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest shadow-[5px_5px_0_0_#161616] text-chip"
        >
          ✳ Portfolio / v1.1 / est. 2019
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-baseline gap-x-4 font-display uppercase leading-[0.9] tracking-tight text-ink"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="whitespace-nowrap">
              {word.text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  className={`inline-block ${word.cls}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            variants={letter}
            className="hidden h-10 w-10 items-center justify-center border-[3px] border-ink bg-pop font-mono text-xl text-chip shadow-[3px_3px_0_0_#161616] sm:flex"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="inline-block"
            >
              ⚡
            </motion.span>
          </motion.span>
        </motion.h1>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          >
            <p className="max-w-xl border-l-4 border-ink bg-paper p-5 text-xl leading-relaxed shadow-[6px_6px_0_0_#161616]">
              I build{" "}
              <span className="bg-lime px-1 font-bold">
                fast, loud, unapologetic
              </span>{" "}
              web experiences. Engineer by day,{" "}
              <span className="bg-cyan px-1 font-bold">car lunatic</span> by
              sundown. This is my garage / workspace / gallery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start justify-center gap-4"
          >
            <Magnetic className="inline-block">
              <motion.a
                href="/cv/CV-FandyAhmadJanurPratama-Frontend.pdf"
                download
                data-cursor
                whileHover={{ y: -4, rotate: -1.5 }}
                whileTap={{ scale: 0.96 }}
                className="brutal flex items-center gap-3 bg-pink px-8 py-4 font-mono text-lg font-bold uppercase tracking-wider text-paper"
              >
                <span className="flex size-8 items-center justify-center bg-ink font-display text-xl text-inverted">
                  ↓
                </span>
                Download CV
              </motion.a>
            </Magnetic>
            <Magnetic className="inline-block">
              <a
                href="#hobbies"
                data-cursor
                className="brutal-sm flex items-center gap-3 bg-paper px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider"
              >
                <span className="inline-block h-3 w-3 animate-pulse bg-lime" />
                Scroll to my garage
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="absolute -left-3 top-24 hidden h-24 w-24 items-center justify-center border-[3px] border-ink bg-cyan font-display text-5xl shadow-[6px_6px_0_0_#161616] lg:flex">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          ⚙
        </motion.span>
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 16 }}
        className="sticker absolute right-6 top-28 hidden bg-purple px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-paper md:block"
      >
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          🔥
        </motion.span>{" "}
        Fresh build
      </motion.div>

      <div className="relative mt-10">
        <Marquee items={marqueeItems} />
      </div>
      <div className="relative mt-3">
        <Marquee items={marqueeItems} reverse slow />
      </div>
    </section>
  );
}
