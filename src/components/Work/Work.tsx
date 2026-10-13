"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/portfolio";
import type { Category } from "@/data/portfolio";

const filters: ("All" | Category)[] = ["All", "Company", "Freelance", "Personal"];

export default function Work() {
  const [filter, setFilter] = useState<"All" | Category>("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="work"
      className="relative border-t border-cream/15 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="label text-peach">03 — Work</p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="display text-cream"
              style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
            >
              Things I&apos;ve
              <br />
              shipped.
            </h2>
            <p className="label max-w-[300px] text-cream/55">
              {projects.length} live projects — click any card to visit the
              site.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-10 flex flex-wrap gap-3"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                data-cursor
                className={`label rounded-full px-5 py-2.5 transition-all duration-300 ${
                  filter === item
                    ? "bg-cream text-ink"
                    : "border border-cream/35 text-cream/75 hover:border-cream hover:text-cream"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={filter}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="mt-12 border border-dashed border-cream/30 p-12 text-center">
            <p className="label text-cream/60">
              Nothing filed under {filter} yet.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              data-cursor
              className="label mt-4 border-b border-cream/60 pb-1 text-cream transition-colors hover:border-peach hover:text-peach"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
