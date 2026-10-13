"use client";

import Reveal from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { profile } from "@/data/portfolio";
import type { Profile } from "@/data/portfolio";

function Stat({ stat, active }: { stat: Profile["stats"][number]; active: boolean }) {
  const value = useCountUp(stat.value, active);

  return (
    <div className="border-l border-cream/25 pl-4 md:pl-6">
      <p
        className="display text-cream"
        style={{ fontSize: "clamp(38px, 5vw, 64px)" }}
      >
        {value}
        <span className="text-peach">{stat.suffix}</span>
      </p>
      <p className="label mt-2 text-cream/60">{stat.label}</p>
    </div>
  );
}

function Avatar() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-auto w-full"
      role="img"
      aria-label="Illustrated portrait of Fandy looking toward the mountains"
    >
      <defs>
        <clipPath id="about-arch">
          <path d="M0,500 V200 A200,200 0 0 1 400,200 V500 Z" />
        </clipPath>
        <linearGradient id="about-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241A0A" />
          <stop offset="100%" stopColor="#7E8B2C" />
        </linearGradient>
        <pattern id="about-ht" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#FBEBD0" opacity="0.5" />
        </pattern>
      </defs>

      <g clipPath="url(#about-arch)">
        <rect width="400" height="500" fill="url(#about-sky)" />
        <rect width="400" height="240" fill="url(#about-ht)" opacity="0.25" />

        <circle cx="286" cy="150" r="76" fill="#F2A66B" />
        <circle cx="286" cy="150" r="76" fill="url(#about-ht)" opacity="0.2" />

        <polygon points="40,340 150,150 260,340" fill="#D2552B" />
        <polygon points="150,150 260,340 176,340" fill="#8C3416" />
        <polygon points="150,150 124,196 146,208 168,190 190,214" fill="#FBEBD0" />
        <polygon points="180,340 270,206 360,340" fill="#241A0A" />
        <polygon points="270,206 360,340 296,340" fill="#5F7A28" />
        <polygon points="270,206 252,240 268,248 286,234 302,252" fill="#FBEBD0" />

        <path
          d="M0,330 C90,304 180,340 250,380 C310,414 360,430 400,428 V500 H0 Z"
          fill="#5C7A1B"
        />
        <path
          d="M0,392 C100,372 210,414 290,462 L320,500 H0 Z"
          fill="#7C9220"
        />

        {/* figure from behind */}
        <g fill="#17130A">
          <circle cx="196" cy="352" r="26" />
          <path d="M164,478 C164,414 176,378 196,378 C216,378 228,414 228,478 Z" />
          <rect x="172" y="386" width="48" height="58" rx="14" fill="#241A0A" />
          <rect x="172" y="386" width="48" height="16" rx="8" fill="#D2552B" />
        </g>
        <path
          d="M150,478 h96"
          stroke="#FBEBD0"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      <path
        d="M0,500 V200 A200,200 0 0 1 400,200 V500 Z"
        fill="none"
        stroke="#FBEBD0"
        strokeWidth="7"
      />
    </svg>
  );
}

export default function About() {
  const [statsRef, statsInView] = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="label text-peach">02 — About</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            className="display mt-6 text-cream"
            style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
          >
            Hello, I&apos;m {profile.firstName}.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="space-y-6">
              {profile.bio.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-cream/85 md:text-lg">
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
              <div className="border border-cream/25 bg-garden-deep/40 p-6 md:p-8">
                <p className="label text-peach">Work style</p>
                <p className="mt-5 text-base leading-relaxed text-cream/85 md:text-lg">
                  {profile.workStyle}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="space-y-8">
            <div className="mx-auto max-w-[340px]">
              <Avatar />
            </div>

            <div className="border border-cream/25 bg-garden-deep/40 p-6 md:p-8">
              <p className="label text-peach">Quick facts</p>
              <dl className="mt-5 space-y-4">
                {profile.quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 border-b border-cream/15 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="label w-40 shrink-0 text-cream/50">
                      {fact.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-cream/90 md:text-base">
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
