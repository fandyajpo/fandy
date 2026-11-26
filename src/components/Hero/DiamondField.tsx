"use client";

import { useEffect, useRef } from "react";

// Flying 3D diamonds: octahedra with per-face shading, drifting toward the
// camera in perspective on a 2D canvas. No WebGL, no three.js.
const IVORY = "236, 230, 215";
const MINT = "125, 233, 195";
const LIME = "216, 255, 107";
const RING = 0.72;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Shard {
  x: number;
  y: number;
  z: number;
  size: number;
  yaw: number;
  pitch: number;
  spin: number;
  speed: number;
  sway: number;
  phase: number;
  accent: boolean;
}

const UNIT: Vec3[] = [
  { x: 0, y: 1, z: 0 },
  { x: RING, y: 0, z: 0 },
  { x: 0, y: 0, z: RING },
  { x: -RING, y: 0, z: 0 },
  { x: 0, y: 0, z: -RING },
  { x: 0, y: -1, z: 0 },
];

const FACES: [number, number, number][] = [
  [0, 1, 2],
  [0, 2, 3],
  [0, 3, 4],
  [0, 4, 1],
  [5, 2, 1],
  [5, 3, 2],
  [5, 4, 3],
  [5, 1, 4],
];

const LIGHT: Vec3 = (() => {
  const x = -0.35;
  const y = 0.72;
  const z = -0.6;
  const length = Math.hypot(x, y, z);
  return { x: x / length, y: y / length, z: z / length };
})();

function rotate(point: Vec3, pitch: number, yaw: number): Vec3 {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;

  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);

  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  };
}

export default function DiamondField() {
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
    let focal = 0;
    let centerX = 0;
    let centerY = 0;
    let frame = 0;
    let running = true;
    let pointerX = 0;
    let pointerY = 0;
    let previous = 0;
    let clock = 0;

    const hero: Shard = {
      x: 0,
      y: 0,
      z: 9,
      size: 1.05,
      yaw: 0.5,
      pitch: 0.22,
      spin: 0.28,
      speed: 0,
      sway: 0,
      phase: 0.6,
      accent: true,
    };

    const shards: Shard[] = [];

    const seedShard = (shard: Shard, fresh: boolean) => {
      const spread = width / Math.max(height, 1);
      shard.z = fresh ? 12 + Math.random() * 32 : 38 + Math.random() * 16;
      shard.x = (Math.random() - 0.5) * shard.z * spread * 1.3;
      shard.y = (Math.random() - 0.5) * shard.z * 0.95;
      shard.size = 0.3 + Math.random() * 0.58;
      shard.yaw = Math.random() * Math.PI * 2;
      shard.pitch = (Math.random() - 0.5) * 0.9;
      shard.spin = (Math.random() - 0.5) * 0.8 + 0.18;
      shard.speed = 1.6 + Math.random() * 3.4;
      shard.sway = 0.12 + Math.random() * 0.3;
      shard.phase = Math.random() * Math.PI * 2;
      shard.accent = Math.random() < 0.45;
    };

    const paintShard = (
      shard: Shard,
      spinTime: number,
      camYaw: number,
      camPitch: number,
      fade: number,
    ) => {
      const yaw = shard.yaw + shard.spin * spinTime + camYaw * 0.4;
      const pitch = shard.pitch + camPitch;

      const world: Vec3[] = [];
      for (const vertex of UNIT) {
        const rotated = rotate(vertex, pitch, yaw);
        world.push({
          x: rotated.x * shard.size + shard.x,
          y: rotated.y * shard.size + shard.y,
          z: rotated.z * shard.size + shard.z,
        });
      }

      const cam: Vec3[] = [];
      const screen: ({ x: number; y: number } | null)[] = [];
      let sumX = 0;
      let sumY = 0;
      let visiblePoints = 0;

      for (const point of world) {
        const rotated = rotate(point, camPitch, camYaw);
        cam.push(rotated);

        if (rotated.z < 2) {
          screen.push(null);
          continue;
        }

        const screenX = centerX + (rotated.x / rotated.z) * focal;
        const screenY = centerY - (rotated.y / rotated.z) * focal;
        screen.push({ x: screenX, y: screenY });
        sumX += screenX;
        sumY += screenY;
        visiblePoints += 1;
      }

      if (!visiblePoints) return;

      const midX = sumX / visiblePoints;
      const midY = sumY / visiblePoints;
      const radius = Math.max(
        26,
        (shard.size * focal) / Math.max(shard.z, 4),
      );

      if (shard.accent && shard.size > 0.45) {
        const glow = context.createRadialGradient(
          midX,
          midY,
          0,
          midX,
          midY,
          radius * 1.9,
        );
        glow.addColorStop(0, `rgba(${LIME}, ${(0.14 * fade).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${LIME}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(midX, midY, radius * 1.9, 0, Math.PI * 2);
        context.fill();
      }

      const faces: {
        depth: number;
        a: number;
        b: number;
        c: number;
        lum: number;
      }[] = [];

      for (const [ia, ib, ic] of FACES) {
        const a = cam[ia];
        const b = cam[ib];
        const c = cam[ic];
        if (!a || !b || !c) continue;

        const ux = b.x - a.x;
        const uy = b.y - a.y;
        const uz = b.z - a.z;
        const vx = c.x - a.x;
        const vy = c.y - a.y;
        const vz = c.z - a.z;

        let nx = -(uy * vz - uz * vy);
        let ny = -(uz * vx - ux * vz);
        let nz = -(ux * vy - uy * vx);

        const length = Math.hypot(nx, ny, nz);
        if (!length) continue;
        nx /= length;
        ny /= length;
        nz /= length;

        const gx = (a.x + b.x + c.x) / 3;
        const gy = (a.y + b.y + c.y) / 3;
        const gz = (a.z + b.z + c.z) / 3;

        // the camera sits at the origin, so this culls faces turned away
        if (nx * gx + ny * gy + nz * gz >= 0) continue;

        faces.push({
          depth: gz,
          a: ia,
          b: ib,
          c: ic,
          lum: Math.max(0, nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z),
        });
      }

      faces.sort((first, second) => second.depth - first.depth);

      const tone = shard.accent ? MINT : IVORY;
      const edgeTone = shard.accent ? LIME : IVORY;

      for (const face of faces) {
        const pa = screen[face.a];
        const pb = screen[face.b];
        const pc = screen[face.c];
        if (!pa || !pb || !pc) continue;

        context.beginPath();
        context.moveTo(pa.x, pa.y);
        context.lineTo(pb.x, pb.y);
        context.lineTo(pc.x, pc.y);
        context.closePath();

        context.fillStyle = `rgba(${tone}, ${(
          (0.05 + 0.36 * face.lum) * fade
        ).toFixed(3)})`;
        context.fill();

        context.strokeStyle = `rgba(${edgeTone}, ${(
          fade * (0.2 + 0.24 * face.lum)
        ).toFixed(3)})`;
        context.lineWidth = 1;
        context.stroke();
      }
    };

    const draw = () => {
      if (!width || !height) return;

      const time = reduceQuery.matches ? 1.4 : clock;
      const camYaw = pointerX * 0.1;
      const camPitch = -pointerY * 0.05;

      context.clearRect(0, 0, width, height);
      context.lineJoin = "round";

      const items: { shard: Shard; depth: number; spin: number }[] = [
        { shard: hero, depth: hero.z, spin: time },
      ];

      for (const shard of shards) {
        items.push({ shard, depth: shard.z, spin: time });
      }

      items.sort((first, second) => second.depth - first.depth);

      for (const item of items) {
        const shard = item.shard;
        const fade =
          shard === hero
            ? 1
            : Math.min(1, Math.max(0, (shard.z - 3) / 5)) *
              Math.min(1, Math.max(0, (56 - shard.z) / 14));

        if (fade <= 0.01) continue;
        paintShard(shard, item.spin, camYaw, camPitch, fade);
      }
    };

    const advance = (delta: number, time: number) => {
      if (reduceQuery.matches) return;

      for (const shard of shards) {
        shard.z -= shard.speed * delta;
        shard.x += Math.sin(time * 0.35 + shard.phase) * shard.sway * delta;
        shard.y += Math.cos(time * 0.27 + shard.phase) * shard.sway * 0.6 * delta;

        if (shard.z < 3) seedShard(shard, false);
      }
    };

    const tick = (now: number) => {
      const delta = previous ? Math.min(0.05, (now - previous) / 1000) : 0.016;
      previous = now;
      clock += delta;

      if (running) {
        advance(delta, clock);
        draw();
      }

      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      focal = height * 0.95;
      centerX = width / 2;
      centerY = height * 0.55;

      const anchorX = width * (width > 820 ? 0.72 : 0.62);
      const anchorY = height * (width > 820 ? 0.37 : 0.3);
      hero.z = height > 700 ? 9.5 : 8;
      hero.size = height > 700 ? 1.5 : 1.15;
      hero.x = ((anchorX - centerX) / focal) * hero.z;
      hero.y = -((anchorY - centerY) / focal) * hero.z;

      if (!shards.length) {
        for (let index = 0; index < 16; index += 1) {
          const shard: Shard = {
            x: 0,
            y: 0,
            z: 0,
            size: 0,
            yaw: 0,
            pitch: 0,
            spin: 0,
            speed: 0,
            sway: 0,
            phase: 0,
            accent: false,
          };
          seedShard(shard, true);
          shards.push(shard);
        }
      }

      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
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
      document.addEventListener("pointerleave", onPointerLeave);
    }

    if (!reduceQuery.matches) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
