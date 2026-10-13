import Reveal from "@/components/ui/Reveal";
import Skills from "./Skills";
import Timeline from "./Timeline";
import Button from "@/components/ui/Button";
import { certifications, contact, education, profile } from "@/data/portfolio";

export default function Resume() {
  return (
    <section
      id="resume"
      className="relative border-t border-cream/15 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* print-only header for the downloaded CV */}
        <div className="print-only mb-8 border-b border-black pb-4">
          <p className="display" style={{ fontSize: 34 }}>
            {profile.fullName} — {profile.role}
          </p>
          <p style={{ fontSize: 13, marginTop: 8 }}>
            {contact.email} · {profile.city}, {profile.country} ·{" "}
            {profile.coordinates}
          </p>
        </div>

        <div className="no-print">
          <Reveal>
            <p className="label text-peach">04 — Resume</p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <h2
                className="display text-cream"
                style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
              >
                The route
                <br />
                so far.
              </h2>

              <div className="flex flex-col items-start gap-3">
                <p className="label max-w-[260px] text-cream/55">
                  Every stop, what I carried, what I shipped.
                </p>
                <Button
                  href="/cv.pdf"
                  download
                  ariaLabel="Download CV as PDF"
                >
                  Download CV
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Timeline />

        <div className="mt-16">
          <Reveal>
            <p className="label text-peach">Education</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {education.map((item) => (
              <Reveal key={item.school}>
                <article className="border border-cream/25 bg-ocean-deep/40 p-6 md:p-8">
                  <p className="label text-cream/50">{item.period}</p>
                  <h4 className="display mt-3 text-2xl text-cream">
                    {item.school}
                  </h4>
                  {item.degree && (
                    <p className="mt-2 text-sm leading-relaxed text-cream/80 md:text-base">
                      {item.degree}
                    </p>
                  )}
                  {item.note && (
                    <p className="label mt-3 text-peach">{item.note}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Skills />

        {certifications.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <p className="label text-peach">Certifications & awards</p>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {certifications.map((item) => (
                <Reveal key={item.title}>
                  <article className="border border-cream/25 p-6">
                    <p className="label text-cream/50">{item.year}</p>
                    <h4 className="display mt-3 text-xl text-cream">
                      {item.title}
                    </h4>
                    <p className="label mt-2 text-peach">{item.issuer}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
