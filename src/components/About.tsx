"use client";

import Reveal from "@/components/ui/Reveal";
import Drift from "@/components/ui/Drift";
import Veil from "@/components/ui/Veil";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { profile } from "@/data/portfolio";
import type { Profile } from "@/data/portfolio";

function Stat({
  stat,
  active,
}: {
  stat: Profile["stats"][number];
  active: boolean;
}) {
  const value = useCountUp(stat.value, active);

  return (
    <div className="border-l border-cream/20 pl-4 md:pl-5">
      <p
        className="display text-cream"
        style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
      >
        {value}
        <span className="text-peach">{stat.suffix}</span>
      </p>
      <p className="label mt-2 text-cream/45">{stat.label}</p>
    </div>
  );
}

function Facet() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-auto w-full"
      role="img"
      aria-label="A faceted diamond, the mark of this portfolio"
    >
      <defs>
        <clipPath id="about-frame">
          <path d="M0,500 V200 A200,200 0 0 1 400,200 V500 Z" />
        </clipPath>
        <pattern
          id="about-grid"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M25 0 H0 V25"
            fill="none"
            stroke="#141414"
            strokeWidth="0.6"
            opacity="0.16"
          />
        </pattern>
        <radialGradient id="about-aura" cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#E23A2E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E23A2E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g clipPath="url(#about-frame)">
        <rect width="400" height="500" fill="#FFF6E6" />
        <rect width="400" height="500" fill="url(#about-grid)" />
        <rect width="400" height="500" fill="url(#about-aura)" />

        <g fill="none" stroke="#141414" opacity="0.18">
          <ellipse cx="200" cy="252" rx="152" ry="50" />
          <ellipse cx="200" cy="252" rx="88" ry="148" opacity="0.55" />
        </g>

        <g transform="translate(200 252)">
          <polygon points="0,-150 -104,0 0,160 104,0" fill="#E23A2E" opacity="0.18" />
          <polygon points="0,-150 -104,0 0,18" fill="#141414" opacity="0.92" />
          <polygon points="0,-150 0,18 104,0" fill="#2F6BFF" opacity="0.9" />
          <polygon points="0,18 104,0 0,160" fill="#E23A2E" opacity="0.85" />
          <polygon points="0,18 0,160 -104,0" fill="#141414" opacity="0.22" />
          <polygon
            points="0,-150 -104,0 0,18 104,0"
            fill="none"
            stroke="#141414"
            strokeWidth="2.4"
          />
          <polygon
            points="0,18 -104,0 0,160 104,0"
            fill="none"
            stroke="#141414"
            strokeWidth="1"
            opacity="0.55"
          />
        </g>

        <g stroke="#2F6BFF" strokeWidth="2" opacity="0.65">
          <path d="M28 66 h16 M28 66 v16" />
          <path d="M372 66 h-16 M372 66 v16" />
          <path d="M28 434 h16 M28 434 v-16" />
          <path d="M372 434 h-16 M372 434 v-16" />
        </g>
      </g>

      <path
        d="M0,500 V200 A200,200 0 0 1 400,200 V500 Z"
        fill="none"
        stroke="#141414"
        strokeWidth="2"
        opacity="0.75"
      />
    </svg>
  );
}

export default function About() {
  const [statsRef, statsInView] = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="label text-peach">02</span>
            <span className="h-px w-10 bg-cream/25" />
            <span className="label text-cream/50">About</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <Veil>
            <h2
              className="display mt-6 text-cream"
              style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
            >
              Hello, I&apos;m {profile.firstName}.
            </h2>
          </Veil>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="space-y-6">
              {profile.bio.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-cream/80 md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div
              ref={statsRef}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              {profile.stats.map((stat) => (
                <Stat key={stat.label} stat={stat} active={statsInView} />
              ))}
            </div>

            <Reveal delay={0.1} className="mt-12">
              <div className="border border-cream/20 p-6 md:p-8">
                <p className="label text-peach">Work style</p>
                <p className="mt-5 text-base leading-relaxed text-cream/80 md:text-lg">
                  {profile.workStyle}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="space-y-8">
            <Drift speed={-60} className="mx-auto max-w-[340px]">
              <Facet />
            </Drift>

            <div className="border border-cream/20 p-6 md:p-8">
              <p className="label text-peach">Quick facts</p>
              <dl className="mt-5 space-y-4">
                {profile.quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 border-b border-cream/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="label w-40 shrink-0 text-cream/40">
                      {fact.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-cream/85 md:text-base">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
