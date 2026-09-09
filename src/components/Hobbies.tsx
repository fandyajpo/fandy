"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import FloatingBlobs from "./FloatingBlobs";

const cars = [
  {
    title: "Porsche 991.1 C4 GTS",
    label: "THE MAIN EVENT",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    alt: "Blue Porsche sports car",
    color: "bg-cyan",
    note: "My daily. My track weapon. My therapist. 3.4s to 97 km/h.",
  },
  {
    title: "Track Day Tactics",
    label: "LAP TIMES ONLY",
    img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    alt: "Sports car racing on a track",
    color: "bg-pop",
    note: "Weekends belong to the circuit. Brake late, carry speed, repeat.",
  },
  {
    title: "Detailing Saturdays",
    label: "RUBBER SIDE DOWN",
    img: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80",
    alt: "Car wheel detail close up",
    color: "bg-lime",
    note: "Two-bucket wash, ceramic wax, and a little too much time on the wheels.",
  },
  {
    title: "Engine Bay Therapy",
    label: "6 CYL. 6 MIND",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
    alt: "Car engine bay",
    color: "bg-pink",
    note: "Nothing calms the nerves like a flat-six firing on all cylinders.",
  },
  {
    title: "Midnight Runs",
    label: "3 AM PETROL",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    alt: "Yellow sports car at night",
    color: "bg-purple",
    note: "Empty roads, loud exhaust, and a playlist that goes to 11.",
  },
  {
    title: "Classic Obsession",
    label: "FUEL INJECTED SOUL",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    alt: "Classic red car",
    color: "bg-orange",
    note: "Old iron, more character. Someday it will be in my garage, too.",
  },
];

const stats = [
  { value: "430", unit: "HP", label: "Twin turbo flat-6" },
  { value: "3.4s", unit: "0-100", label: "Off the line" },
  { value: "302", unit: "KM/H", label: "Top speed" },
  { value: "08+", unit: "YRS", label: "Hooked on cars" },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative isolate border-t-[3px] border-ink bg-cream py-24">
      <FloatingBlobs />
      <div className="dots absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Things I
            <br />
            <span className="text-pink">love</span> most
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, rotate: -8 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticker bg-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-cream"
          >
            Fuel type: curiosity
          </motion.div>
        </div>

        {/* Featured car */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          data-cursor
          className="brutal mt-16 grid overflow-hidden bg-ink md:grid-cols-2"
        >
          <div className="group relative aspect-[4/3] overflow-hidden md:aspect-auto">
            <Image
              src={cars[0].img}
              alt={cars[0].alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute left-4 top-4 border-[3px] border-ink bg-pop px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-chip shadow-[3px_3px_0_0_#161616]">
              Featured
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 text-paper md:p-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display uppercase leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Porsche 991.1 C4 GTS
            </motion.h3>
            <p className="max-w-md text-lg leading-relaxed text-paper/80">
              Flat-six, quad exhaust, and four doors of&nbsp;
              <span className="bg-purple px-1 text-paper">questionable financial decisions</span>.
              Built code by day, breaking rear tires by dusk.
            </p>
            <div className="grid grid-cols-2 gap-3 font-mono text-sm font-bold uppercase tracking-wider">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="border-2 border-paper/40 bg-paper/5 px-4 py-3"
                >
                  <span className="font-display text-3xl text-inverted">{stat.value}</span>
                  <span className="block text-xs text-paper/60">{stat.unit}</span>
                  <span className="block text-xs">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.slice(1).map((car, i) => (
            <CarCard key={car.title} car={car} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarCard({ car, index }: { car: (typeof cars)[number]; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(my, { stiffness: 260, damping: 20 });
  const rotY = useSpring(mx, { stiffness: 260, damping: 20 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 8);
    my.set(py * -8);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor
      className="group relative [transform-style:preserve-3d]"
    >
      <div className="brutal bg-paper">
        <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-ink">
          <Image
            src={car.img}
            alt={car.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-4 border-[3px] border-ink bg-pop px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-chip shadow-[3px_3px_0_0_#161616]"
          >
            {car.label}
          </motion.div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="font-display text-xl uppercase tracking-tight">{car.title}</h3>
          <p className="text-sm leading-relaxed opacity-75">{car.note}</p>
          <div
            className={`flex h-3 w-full ${car.color} border-2 border-ink`}
          />
        </div>
      </div>
    </motion.div>
  );
}