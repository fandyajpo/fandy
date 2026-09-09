"use client";

import { motion } from "motion/react";
import Chaotic from "./Chaotic";
import FloatingBlobs from "./FloatingBlobs";

const jobs = [
  {
    period: "2024 — Present",
    role: "Senior Frontend Engineer",
    company: "Speedworks Labs",
    tag: "CURRENT",
    color: "bg-cyan",
    points: [
      "Leading the design system powering 4 product lines.",
      "Cut bundle size 42% and shipped motion-driven UI kits.",
      "Mentoring 3 juniors in React + performance debugging.",
    ],
  },
  {
    period: "2021 — 2024",
    role: "Full-Stack Developer",
    company: "Racetrack Digital",
    tag: "SHIFT + SEND",
    color: "bg-lime",
    points: [
      "Built real-time dashboards tracking 120k vehicles / day.",
      "OTT map tooling with GPS + telemetry pipelines.",
      "Promoted twice in 3 years. Yes, the pedal stays down.",
    ],
  },
  {
    period: "2019 — 2021",
    role: "Web Developer",
    company: "Vroom Studio",
    tag: "LEARNED THE ROPES",
    color: "bg-pop",
    points: [
      "Shipped 20+ marketing & e-commerce sites for car brands.",
      "First taste of Next.js and fell in love hard.",
      "Learned CSS grid, may never financially recover.",
    ],
  },
  {
    period: "2016 — 2019",
    role: "Intern → Junior Dev",
    company: "Pixel Workshop",
    tag: "FIRST START",
    color: "bg-pink",
    points: [
      "Fixed bugs. Broke things. Fixed them again. Learned a lot.",
      "Bought my first project car with internship savings.",
      "Discovered that semicolons and torque specs share a vibe.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative isolate border-t-[3px] border-ink bg-paper py-24">
      <FloatingBlobs />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            The
            <br />
            Journey
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, rotate: 10 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticker bg-pop px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-chip"
          >
            7+ years in the driver&apos;s seat
          </motion.div>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-y-0 left-[19px] w-[3px] bg-ink md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-14">
            {jobs.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={job.period}
                  className={`relative grid items-start gap-6 md:grid-cols-2 md:gap-16`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: left ? -60 : 60, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`pl-14 ${left ? "md:col-start-1 md:pl-0 md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}`}
                  >
                    <Chaotic
                      data-cursor
                      className={`brutal block w-full bg-paper p-6 text-left md:inline-block ${left ? "rot-2" : "rot-1"}`}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
                        <span className={`border-2 border-ink px-2 py-1 text-chip ${job.color}`}>{job.tag}</span>
                        <span className="opacity-70">{job.period}</span>
                      </div>
                      <h3 className="font-display text-2xl uppercase tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mt-1 font-mono text-sm font-bold uppercase tracking-wider text-ink/60">
                        {job.company}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                        {job.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-1 inline-block size-2 shrink-0 bg-pink" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Chaotic>
                  </motion.div>

                  <div
                    className={`absolute left-[19px] top-3 z-10 flex size-10 -translate-x-1/2 items-center justify-center border-[3px] border-ink bg-ink font-mono text-sm font-bold text-inverted md:left-1/2 md:-translate-x-1/2`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}