import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="label text-peach">Core skills</p>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05}>
            <div className="border border-cream/20 p-6 md:p-8">
              <h4 className="display text-2xl text-cream">{group.title}</h4>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="label border border-cream/25 px-3 py-1.5 text-cream/75 transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
