"use client";

import { motion } from "motion/react";
import Chaotic from "./Chaotic";
import FloatingBlobs from "./FloatingBlobs";

const categories = [
  {
    name: "Frontend",
    color: "bg-cyan",
    icon: "▘",
    skills: ["Next.js", "React", "TypeScript", "Tailwind", "Motion", "Zustand", "React Query"],
  },
  {
    name: "Backend",
    color: "bg-lime",
    icon: "▙",
    skills: ["Node.js", "PostgreSQL", "Prisma", "REST", "WebSockets", "Redis", "GraphQL"],
  },
  {
    name: "DevOps",
    color: "bg-pop",
    icon: "▟",
    skills: ["Docker", "Vercel", "GitHub Actions", "CI/CD", "AWS", "Nginx", "Terraform"],
  },
  {
    name: "Garage",
    color: "bg-pink",
    icon: "⚙",
    skills: ["Flat-six engines", "Detailing", "Track driving", "Manual welding", "Parts research", "Full send", "Budget math"],
  },
];

const cta = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "TAILWIND",
  "MOTION",
  "NODE.JS",
  "POSTGRES",
  "DOCKER",
  "GIT",
  "AWS",
  "PRISMA",
  "WEB ASSEMBLY",
  "GRAPHQL",
  "CI/CD",
  "PERFORMANCE",
];

const levels = [
  { skill: "TypeScript / React", pct: 95 },
  { skill: "Next.js / App Router", pct: 92 },
  { skill: "Node.js / APIs", pct: 88 },
  { skill: "UI Engineering / Motion", pct: 90 },
  { skill: "Database / SQL", pct: 82 },
  { skill: "DevOps / Shipping", pct: 78 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative isolate border-t-[3px] border-ink bg-cyan py-24">
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
            Weapons of choice
          </motion.div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="brutal bg-paper p-8"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">
              / Confidence meters
            </p>
            <div className="mt-6 space-y-6">
              {levels.map((item, i) => (
                <div key={item.skill}>
                  <div className="flex items-baseline justify-between font-mono text-sm font-bold uppercase tracking-wider">
                    <span>{item.skill}</span>
                    <span className="text-ink/60">{item.pct}%</span>
                  </div>
                  <div className="mt-2 h-6 border-[3px] border-ink bg-cream">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true, amount: 0.9 }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                      className={`flex h-full items-center justify-end pr-2 ${i % 2 === 0 ? "bg-pop" : "bg-lime"}`}
                    >
                      <span className="font-mono text-[10px] font-bold text-chip">▮</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category cards */}
          <div className="grid content-start gap-6 sm:grid-cols-2">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Chaotic data-cursor className="brutal bg-paper p-5">
                  <div className="flex items-center justify-between">
                    <h3 className={`border-2 border-ink px-3 py-1 font-display text-lg uppercase tracking-tight text-chip ${cat.color}`}>
                      {cat.name}
                    </h3>
                    <span className="font-display text-2xl">{cat.icon}</span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.li
                        key={skill}
                        whileHover={{ y: -3, rotate: -2 }}
                        className="border-2 border-ink bg-cream px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#161616]"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </Chaotic>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill marquee */}
      <div className="mt-16 -rotate-1">
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
    </section>
  );
}