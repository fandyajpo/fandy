"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { toast } from "@/components/ui/Toast";
import {
  ArrowUpRight,
  CopyIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MediumIcon,
} from "@/components/ui/Icons";
import { useLocalTime } from "@/hooks/useLocalTime";
import { contact, profile } from "@/data/portfolio";
import type { IconName } from "@/data/portfolio";

const iconMap: Record<
  IconName,
  React.ComponentType<{ className?: string }>
> = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  medium: MediumIcon,
};

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: FormValues = { name: "", email: "", message: "" };

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That email doesn't look right.";
  if (values.message.trim().length < 10)
    errors.message = "A few more words, please — at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const time = useLocalTime(profile.timeZone);

  const setField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("error");
      return;
    }

    try {
      const subject = encodeURIComponent(
        `Portfolio enquiry from ${values.name.trim()}`,
      );
      const body = encodeURIComponent(
        `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`,
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      toast("Copied!");
    } catch {
      toast("Copy failed");
    }
  };

  const fieldClass =
    "w-full border-b border-cream/35 bg-transparent py-3 text-cream placeholder:text-cream/35 transition-colors duration-300 focus:border-peach";

  return (
    <section
      id="contact"
      className="relative border-t border-cream/15 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="label text-peach">05 — Get in touch</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            className="display mt-6 text-cream"
            style={{ fontSize: "clamp(46px, 9vw, 150px)" }}
          >
            Let&apos;s go somewhere
            <br />
            together.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* form */}
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="space-y-7">
              <div>
                <label htmlFor="contact-name" className="label text-cream/60">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={fieldClass}
                />
                {errors.name && (
                  <p id="contact-name-error" className="label mt-2 text-rust">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="label text-cream/60">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={fieldClass}
                />
                {errors.email && (
                  <p id="contact-email-error" className="label mt-2 text-rust">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="label text-cream/60">
                  What are we building?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="A little about the project, timeline, and budget range..."
                  value={values.message}
                  onChange={(event) => setField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className={`${fieldClass} resize-y`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="label mt-2 text-rust">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  data-cursor
                  className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-1"
                >
                  Send message
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>

                {status === "success" && (
                  <p className="label text-lime" role="status">
                    Your mail app should be opening — thank you!
                  </p>
                )}
                {status === "error" && (
                  <p className="label text-rust" role="status">
                    Mind fixing the fields above?
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* details */}
          <Reveal delay={0.12} className="space-y-8">
            <div className="border border-cream/25 bg-ocean-deep/40 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="label text-peach">Local time</p>
                <p className="label flex items-center gap-2 text-cream/70">
                  <span
                    aria-hidden="true"
                    className="size-2 animate-pulse rounded-full bg-lime"
                  />
                  {profile.city}
                </p>
              </div>
              <p
                className="display mt-3 text-cream tabular-nums"
                style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
              >
                {time || "--:--:--"}
              </p>
              <p className="label mt-2 text-cream/50">{profile.timeZone}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/75">
                {contact.availability}
              </p>
            </div>

            <ul className="divide-y divide-cream/15 border border-cream/25">
              {contact.socials.map((social) => {
                const Icon = iconMap[social.icon];

                if (social.icon === "mail") {
                  return (
                    <li key={social.label} className="flex items-center gap-4 p-4 md:p-5">
                      <Icon className="size-5 shrink-0 text-peach" />
                      <div className="min-w-0">
                        <p className="label text-cream/50">{social.label}</p>
                        <p className="truncate text-sm text-cream md:text-base">
                          {social.display}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={copyEmail}
                        data-cursor
                        className="label ml-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/45 px-4 py-2 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
                        aria-label="Copy email address"
                      >
                        <CopyIcon className="size-4" />
                        Copy
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="group flex items-center gap-4 p-4 transition-colors duration-300 hover:bg-cream/5 md:p-5"
                    >
                      <Icon className="size-5 shrink-0 text-peach" />
                      <div className="min-w-0">
                        <p className="label text-cream/50">{social.label}</p>
                        <p className="truncate text-sm text-cream md:text-base">
                          {social.display}
                        </p>
                      </div>
                      <ArrowUpRight className="ml-auto size-5 shrink-0 text-cream/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-peach" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
