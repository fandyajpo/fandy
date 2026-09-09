"use client";

import { motion } from "motion/react";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import FloatingBlobs from "./FloatingBlobs";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate mt-24 border-t-[3px] border-ink bg-purple"
    >
      <FloatingBlobs />
      <Marquee
        items={[
          "LET'S BUILD SOMETHING",
          "LET'S TALK CARS",
          "LET'S SHIP IT",
          "GAS IS ON ME",
          "OPEN FOR WORK",
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display uppercase leading-[0.9] tracking-tight text-chip"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          Let&apos;s
          <br />
          <span className="relative inline-block bg-lime px-4 shadow-[8px_8px_0_0_#161616]">
            roll
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-chip"
        >
          Got a project in mind — or a track day booking?
          <br className="hidden sm:block" />
          Both are handled with the same urgency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic className="inline-block">
            <motion.a
              href="/cv/CV-FandyAhmadJanurPratama-Frontend.pdf"
              download
              data-cursor
              whileHover={{ y: -4, rotate: 1.5 }}
              whileTap={{ scale: 0.96 }}
              className="brutal bg-pink px-8 py-4 font-mono text-lg font-bold uppercase tracking-wider text-paper"
            >
              ↓ Download CV
            </motion.a>
          </Magnetic>
          <Magnetic className="inline-block">
            <motion.a
              href="mailto:hello@fandy.dev"
              data-cursor
              whileHover={{ y: -4, rotate: -1.5 }}
              whileTap={{ scale: 0.96 }}
              className="brutal bg-paper px-8 py-4 font-mono text-lg font-bold uppercase tracking-wider"
            >
              hello@fandy.dev
            </motion.a>
          </Magnetic>
        </motion.div>

        <div className="mt-14 border-t-[3px] border-ink pt-6 font-mono text-xs font-bold uppercase tracking-widest text-chip">
          © {new Date().getFullYear()} Fandy Ahmad — Built with Next.js +
          Motion.
          <br className="sm:hidden" /> No pixels were neutral in the making of
          this site.
        </div>
      </div>
    </footer>
  );
}
