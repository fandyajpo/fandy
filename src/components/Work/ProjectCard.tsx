"use client";

import { ArrowUpRight } from "@/components/ui/Icons";
import { useTilt } from "@/hooks/useTilt";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useTilt<HTMLAnchorElement>(6);

  return (
    <div
      className="tilt-scene animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <a
        ref={cardRef}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        className="tilt-card tick-corners group flex h-full min-h-[250px] flex-col justify-between border border-cream/20 p-6 hover:border-cream/70 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
        aria-label={`${project.title}, opens live site in a new tab`}
      >
        <span className="tilt-shine" aria-hidden="true" />

        <div
          className="flex items-start justify-between gap-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="label text-peach transition-colors duration-300 group-hover:text-ink">
            {project.num}
          </span>
          <ArrowUpRight className="size-5 shrink-0 text-cream/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
        </div>

        <div className="mt-10" style={{ transform: "translateZ(16px)" }}>
          <p className="label text-cream/55 transition-colors duration-300 group-hover:text-ink/70">
            {project.context}
          </p>
          <h3 className="display mt-2 text-[26px] leading-[1.05] text-cream transition-colors duration-300 group-hover:text-ink md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70 transition-colors duration-300 group-hover:text-ink/75">
            {project.summary}
          </p>

          {project.stack.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <li
                  key={tag}
                  className="label border border-cream/25 px-2.5 py-1 text-cream/60 transition-colors duration-300 group-hover:border-ink/25 group-hover:text-ink/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </a>
    </div>
  );
}
