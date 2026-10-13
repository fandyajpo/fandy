import { ArrowUpRight } from "@/components/ui/Icons";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group animate-fade-up flex min-h-[250px] flex-col justify-between border border-cream/25 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cream hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
      style={{ animationDelay: `${index * 0.05}s` }}
      aria-label={`${project.title}, opens live site in a new tab`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label text-peach transition-colors duration-300 group-hover:text-ink">
          {project.num}
        </span>
        <ArrowUpRight className="size-5 shrink-0 text-cream/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
      </div>

      <div className="mt-10">
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
                className="label rounded-full border border-cream/30 px-3 py-1 text-cream/65 transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}
