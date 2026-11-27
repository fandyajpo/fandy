"use client";

import { useEffect, useRef } from "react";

// A 3D wireframe sea: a grid of points in world space, rotated and projected
// with a real perspective camera on a 2D canvas. No WebGL, no three.js.
const COLS = 44;
const ROWS = 24;
const HALF_WIDTH = 17;
const Z_NEAR = 6;
const Z_FAR = 70;
const CAMERA_HEIGHT = 2.6;

interface Point {
  x: number;
  y: number;
}

export default function WireframeSea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let pointerX = 0;
    let pointerY = 0;

    const waveHeight = (x: number, z: number, time: number) => {
      const falloff = Math.exp(-z * 0.05);
      return (
        (Math.sin(x * 0.42 + z * 0.2 + time * 0.7) * 0.34 +
          Math.sin(x * 0.16 - z * 0.38 - time * 0.45) * 0.24) *
        falloff
      );
    };

    const draw = (now: number) => {
      if (!width || !height) return;

      const time = reduceQuery.matches ? 1.6 : now / 1000;
      const yaw =
        pointerX * 0.14 +
        (reduceQuery.matches ? 0 : Math.sin(time * 0.18) * 0.03);
      const pitch = -0.03 + pointerY * 0.05;

      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const focal = height * 0.9;
      const originX = width / 2;
      const originY = height * 0.6;

      const project = (x: number, z: number): Point | null => {
        const worldY = waveHeight(x, z, time) - CAMERA_HEIGHT;

        const rotatedX = x * cosYaw - z * sinYaw;
        const rotatedZ = x * sinYaw + z * cosYaw;

        const finalY = worldY * cosPitch - rotatedZ * sinPitch;
        const depth = worldY * sinPitch + rotatedZ * cosPitch;
        if (depth < 1.5) return null;

        return {
          x: originX + (rotatedX / depth) * focal,
          y: originY - (finalY / depth) * focal,
        };
      };

      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      for (let row = 0; row < ROWS; row += 1) {
        const step = row / (ROWS - 1);
        const z = Z_NEAR + step * (Z_FAR - Z_NEAR);
        const alpha = 0.03 + 0.26 * Math.pow(1 - step, 1.6);

        context.beginPath();
        let started = false;

        for (let col = 0; col <= COLS; col += 1) {
          const x = -HALF_WIDTH + (2 * HALF_WIDTH * col) / COLS;
          const point = project(x, z);
          if (!point) {
            started = false;
            continue;
          }
          if (started) context.lineTo(point.x, point.y);
          else {
            context.moveTo(point.x, point.y);
            started = true;
          }
        }

        context.strokeStyle = `rgba(20, 20, 20, ${alpha.toFixed(3)})`;
        context.lineWidth = step < 0.3 ? 1.4 : 1;
        context.stroke();
      }

      for (let col = 0; col <= COLS; col += 3) {
        const x = -HALF_WIDTH + (2 * HALF_WIDTH * col) / COLS;

        context.beginPath();
        let started = false;

        for (let row = 0; row < ROWS; row += 1) {
          const step = row / (ROWS - 1);
          const z = Z_NEAR + step * (Z_FAR - Z_NEAR);
          const point = project(x, z);
          if (!point) {
            started = false;
            continue;
          }
          if (started) context.lineTo(point.x, point.y);
          else {
            context.moveTo(point.x, point.y);
            started = true;
          }
        }

        context.strokeStyle = "rgba(47, 107, 255, 0.22)";
        context.lineWidth = 1;
        context.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      draw(performance.now());
    };

    const tick = (now: number) => {
      if (running) draw(now);
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => resize());
    resizeObserver?.observe(canvas);

    const visibilityObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            running = entries.some((entry) => entry.isIntersecting);
          });
    visibilityObserver?.observe(canvas);

    if (finePointerQuery.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    if (!reduceQuery.matches) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="wireframe-sea pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
