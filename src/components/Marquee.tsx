"use client";

export default function Marquee({
  items,
  reverse = false,
  slow = false,
}: {
  items: string[];
  reverse?: boolean;
  slow?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-[3px] border-ink bg-ink py-3">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""} ${slow ? "marquee-slow" : ""}`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-sm font-bold uppercase tracking-widest text-cream"
          >
            {item}
            <span className="text-pop">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}