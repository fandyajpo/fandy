"use client";

import { useEffect, useRef } from "react";
import Button, { SecondaryLink } from "@/components/ui/Button";
import { MapPin } from "@/components/ui/Icons";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { profile } from "@/data/portfolio";
import DiamondField from "./DiamondField";
import WireframeSea from "./WireframeSea";

const facts = profile.quickFacts.slice(0, 3);

export default function Hero() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const time = useLocalTime(profile.timeZone);

  // Pointer moves tilt the stage in 3D (--rx / --ry) and shift the layers
  // inside it, so the hero reads as depth rather than a flat pan.
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      stage.style.setProperty("--ry", `${(currentX * 1.1).toFixed(2)}deg`);
      stage.style.setProperty("--rx", `${(currentY * -0.8).toFixed(2)}deg`);
      plane.style.setProperty("--px", `${(currentX * -22).toFixed(2)}px`);
      plane.style.setProperty("--py", `${(currentY * -14).toFixed(2)}px`);

      if (
        Math.abs(targetX - currentX) > 0.002 ||
        Math.abs(targetY - currentY) > 0.002
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      stage.style.removeProperty("--rx");
      stage.style.removeProperty("--ry");
      plane.style.removeProperty("--px");
      plane.style.removeProperty("--py");
    };
  }, [reduced]);

  // Scroll drives the hero's exit: the copy lifts, shrinks and fades while the
  // backdrop drifts, so the headline disappears as the next section arrives.
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const viewport = window.innerHeight || 1;
      const page = Math.min(1, Math.max(0, window.scrollY / viewport));
      stage.style.setProperty("--page", page.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      stage.style.removeProperty("--page");
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={stageRef}
      className="hero-stage relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* 3D plane: floor grid and flying diamonds sit behind the type */}
      <div className="depth-layer absolute inset-0" aria-hidden="true">
        <div className="hero-plane absolute inset-0">
          <div
            ref={planeRef}
            className="absolute inset-0"
            style={{
              transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
            }}
          >
            <WireframeSea />
            <DiamondField />
          </div>
          <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-1/2" />
        </div>
        <div className="hero-hatch absolute inset-0" />
      </div>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-20">
        <div className="flex items-center gap-3">
          <span className="label text-peach">01</span>
          <span className="h-px w-10 bg-cream/25" />
          <span className="label text-cream/55">{profile.eyebrow}</span>
        </div>

        <h1
          className="display mt-8 text-cream"
          style={{ fontSize: "clamp(48px, 9.5vw, 164px)" }}
        >
          {profile.headline[0]}
          <br />
          <span className="text-cream/85">{profile.headline[1]}</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="max-w-xl whitespace-pre-line text-sm leading-relaxed text-cream/70 md:text-base">
              {profile.pitch}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#work">See the work</Button>
              <SecondaryLink href="/cv.pdf" download>
                Download resume
              </SecondaryLink>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-l border-cream/15 pl-6 md:grid-cols-1 md:gap-y-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label text-cream/45">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-cream/85">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* instrument bar */}
      <div
        className="relative z-20 border-t border-cream/15 bg-ocean-deep/30 px-6 py-4 backdrop-blur-sm md:px-10"
        style={{ transform: "translateZ(14px)" }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <span className="label flex items-center gap-2 text-cream/70">
            <MapPin className="size-3.5 text-peach" />
            {profile.city}, {profile.country}
          </span>

          <span className="label hidden text-cream/40 md:inline">
            {profile.coordinates}
          </span>

          <span className="label hidden tabular-nums text-cream/40 lg:inline">
            Local time {time || "--:--:--"} · {profile.timeZone}
          </span>

          <a
            href="#about"
            className="label text-cream/70 transition-colors duration-300 hover:text-peach"
          >
            Scroll ↓
          </a>
        </div>
      </div>
    </section>
  );
}
