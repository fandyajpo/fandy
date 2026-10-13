import Reveal from "@/components/ui/Reveal";
import { MapPin } from "@/components/ui/Icons";
import { experience } from "@/data/portfolio";

export default function Timeline() {
  return (
    <div className="mt-14">
      <Reveal>
        <p className="label text-peach">Experience</p>
      </Reveal>

      <div className="relative mt-8 space-y-10 border-l-2 border-dashed border-cream/40 pl-8 md:pl-14">
        {experience.map((job, index) => (
          <div key={`${job.company}-${job.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[45px] top-2 grid size-8 place-items-center rounded-full border-2 border-cream bg-ocean md:-left-[65px] md:size-9"
            >
              <MapPin className="size-4 text-peach md:size-5" />
            </span>

            <Reveal delay={index * 0.05}>
              <article className="border border-cream/25 bg-ocean-deep/40 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="label rounded-full bg-peach px-4 py-1.5 text-ink">
                    {job.period}
                  </span>
                  <span className="label text-cream/50">{job.location}</span>
                </div>

                <h4 className="display mt-5 text-2xl text-cream md:text-3xl">
                  {job.role}
                </h4>
                <p className="label mt-2 text-peach">{job.company}</p>

                <ul className="mt-5 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-relaxed text-cream/80 md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-lime"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
