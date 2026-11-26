"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button, { SecondaryLink } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, MapPin } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { profile, scenes } from "@/data/portfolio";
import WireframeSea from "./WireframeSea";
import Alpine from "./scenes/Alpine";
import Coastal from "./scenes/Coastal";
import Desert from "./scenes/Desert";
import NightCity from "./scenes/NightCity";

const sceneComponents = [Alpine, Coastal, Desert, NightCity];

export default function Hero() {
  const [index, setIndex] = useState(1);
  const reduced = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const active = scenes[index];

  const goTo = useCallback((next: number) => {
    setIndex((next + scenes.length) % scenes.length);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (document.querySelector("dialog[open]")) return;
      event.preventDefault();
      setIndex((current) =>
        event.key === "ArrowRight"
          ? (current + 1) % scenes.length
          : (current - 1 + scenes.length) % scenes.length,
      );
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Pointer moves tilt the whole stage in 3D (--rx / --ry) and shift the
  // scene layer inside it, so the hero has real depth rather than a flat pan.
  useEffect(() => {
    if (reduced) return;
    const plane = parallaxRef.current;
    const stage = stageRef.current;
    if (!plane || !stage) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      plane.style.setProperty("--px", `${(currentX * -26).toFixed(2)}px`);
      plane.style.setProperty("--py", `${(currentY * -16).toFixed(2)}px`);
      stage.style.setProperty("--ry", `${(currentX * 1.35).toFixed(2)}deg`);
      stage.style.setProperty("--rx", `${(currentY * -0.9).toFixed(2)}deg`);

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
      plane.style.removeProperty("--px");
      plane.style.removeProperty("--py");
      stage.style.removeProperty("--rx");
      stage.style.removeProperty("--ry");
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={stageRef}
      className="hero-stage relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* 3D plane: the scenes and the wireframe sea sit behind the content */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="hero-plane absolute inset-0">
          <div
            ref={parallaxRef}
            className="parallax-layer absolute inset-0"
            style={{
              transform:
                "translate3d(var(--px, 0px), var(--py, 0px), 0) scale(1.06)",
            }}
          >
            {sceneComponents.map((Scene, i) => (
              <div
                key={scenes[i].id}
                className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  pointerEvents: i === index ? "auto" : "none",
                }}
              >
                <Scene />
              </div>
            ))}
          </div>

          <WireframeSea />
          <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-1/2" />
        </div>
      </div>

      {/* content, lifted toward the viewer in 3D */}
      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-44 pt-32 text-center md:pb-40"
        style={{ transform: "translateZ(34px)" }}
      >
        <p className="label text-peach">{profile.eyebrow}</p>

        <h1
          className="display mt-7 text-cream"
          style={{ fontSize: "clamp(46px, 11vw, 190px)" }}
        >
          {profile.headline[0]}
          <br />
          {profile.headline[1]}
        </h1>

        <p
          className="mt-8 max-w-2xl whitespace-pre-line text-[11px] uppercase leading-[2] tracking-[0.22em] text-cream/85 sm:text-[13px]"
        >
          {profile.pitch}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Button href="#work">See my work</Button>
          <SecondaryLink href="/cv.pdf" download>
            Download resume
          </SecondaryLink>
        </div>
      </div>

      {/* bottom bar */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 border-t border-cream/20 bg-ocean-deep/40 px-4 py-4 backdrop-blur-sm md:px-8 md:py-5"
        style={{ transform: "translateZ(18px)" }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <MapPin className="size-4 shrink-0 text-peach" />
            <span className="label hidden truncate text-cream/80 sm:inline">
              {profile.city}, {profile.country}
            </span>
            <span className="label hidden text-cream/60 xl:inline">
              {profile.coordinates}
            </span>
          </div>

          <span className="hidden h-8 w-px bg-cream/30 md:block" />

          <div
            key={active.id}
            className="label animate-fade-up whitespace-nowrap"
            style={{ color: active.accent }}
            aria-live="polite"
          >
            <span className="hidden sm:inline">{active.chapter} · </span>
            {active.name}
          </div>

          <span className="label hidden text-cream/55 lg:inline">
            Scroll to wander ↓
          </span>

          <div className="flex shrink-0 items-center gap-3">
            <span
              className="label tabular-nums text-cream/80"
              style={{ color: active.accent }}
            >
              {active.num} / 04
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous scene"
                onClick={() => goTo(index - 1)}
                className="grid size-9 place-items-center rounded-full border border-cream/50 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="h-5 w-px bg-cream/40" />
              <button
                type="button"
                aria-label="Next scene"
                onClick={() => goTo(index + 1)}
                className="grid size-9 place-items-center rounded-full border border-cream/50 text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
