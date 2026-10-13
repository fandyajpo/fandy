const backWindows = [
  { x: 60, y: 620 },
  { x: 96, y: 646 },
  { x: 132, y: 620 },
  { x: 470, y: 600 },
  { x: 506, y: 630 },
  { x: 542, y: 600 },
  { x: 900, y: 640 },
  { x: 936, y: 664 },
  { x: 1300, y: 620 },
  { x: 1336, y: 648 },
  { x: 1372, y: 620 },
];

const stars = [
  { cx: 120, cy: 90, r: 3 },
  { cx: 260, cy: 160, r: 2.4 },
  { cx: 380, cy: 70, r: 3.4 },
  { cx: 520, cy: 140, r: 2.2 },
  { cx: 640, cy: 60, r: 3 },
  { cx: 760, cy: 170, r: 2.4 },
  { cx: 880, cy: 96, r: 3.2 },
  { cx: 1010, cy: 150, r: 2.2 },
  { cx: 1480, cy: 120, r: 3 },
  { cx: 1540, cy: 230, r: 2.4 },
  { cx: 60, cy: 260, r: 2.6 },
  { cx: 430, cy: 240, r: 2.2 },
  { cx: 1140, cy: 320, r: 2.6 },
  { cx: 700, cy: 300, r: 2.2 },
];

export default function NightCity({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04161C" />
          <stop offset="55%" stopColor="#061E22" />
          <stop offset="100%" stopColor="#0C3A40" />
        </linearGradient>
        <pattern
          id="night-win"
          width="34"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <rect x="6" y="8" width="10" height="13" fill="#4FC3B0" opacity="0.85" />
          <rect x="20" y="24" width="10" height="13" fill="#F2A66B" opacity="0.6" />
        </pattern>
        <pattern
          id="night-ht"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="#FBEBD0" opacity="0.5" />
        </pattern>
        <linearGradient id="night-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061E22" stopOpacity="0" />
          <stop offset="100%" stopColor="#061E22" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="night-street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2A66B" stopOpacity="0" />
          <stop offset="100%" stopColor="#F2A66B" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1600" height="900" fill="url(#night-sky)" />

      {/* stars */}
      <g fill="#FBEBD0">
        {stars.map((star, i) => (
          <circle
            key={`${star.cx}-${star.cy}`}
            className={i % 3 === 0 ? "twinkle" : undefined}
            style={i % 3 === 0 ? { animationDelay: `${i * 0.45}s` } : undefined}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
          />
        ))}
      </g>

      {/* moon */}
      <circle cx="1240" cy="180" r="112" fill="#FBEBD0" opacity="0.12" />
      <circle cx="1240" cy="180" r="66" fill="#FBEBD0" />
      <circle cx="1218" cy="164" r="13" fill="#F2A66B" opacity="0.55" />
      <circle cx="1256" cy="200" r="9" fill="#F2A66B" opacity="0.45" />
      <circle cx="1240" cy="180" r="66" fill="url(#night-ht)" opacity="0.2" />

      {/* night clouds */}
      <g fill="#0C3A40" opacity="0.55" className="cloud-b">
        <rect x="200" y="250" width="330" height="26" rx="13" />
        <rect x="300" y="292" width="190" height="18" rx="9" opacity="0.7" />
      </g>
      <g fill="#0C3A40" opacity="0.45" className="cloud-a" style={{ animationDelay: "7s" }}>
        <rect x="900" y="330" width="380" height="24" rx="12" />
      </g>

      {/* far skyline */}
      <g fill="#061E22">
        <rect x="0" y="560" width="150" height="340" />
        <rect x="170" y="620" width="120" height="280" />
        <rect x="310" y="520" width="140" height="380" />
        <rect x="470" y="600" width="110" height="300" />
        <rect x="600" y="540" width="150" height="360" />
        <rect x="770" y="620" width="120" height="280" />
        <rect x="910" y="560" width="130" height="340" />
        <rect x="1060" y="610" width="120" height="290" />
        <rect x="1200" y="520" width="150" height="380" />
        <rect x="1370" y="590" width="120" height="310" />
        <rect x="1510" y="550" width="90" height="350" />
      </g>
      <g fill="url(#night-win)" opacity="0.5">
        {backWindows.map((w) => (
          <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="86" height="140" />
        ))}
      </g>

      {/* near skyline */}
      <g fill="#17130A">
        <rect x="40" y="660" width="190" height="240" />
        <rect x="250" y="700" width="150" height="200" />
        <rect x="420" y="630" width="180" height="270" />
        <rect x="620" y="690" width="140" height="210" />
        <rect x="780" y="640" width="200" height="260" />
        <rect x="1000" y="710" width="150" height="190" />
        <rect x="1170" y="650" width="180" height="250" />
        <rect x="1370" y="700" width="190" height="200" />
      </g>
      <rect x="0" y="620" width="1600" height="280" fill="url(#night-win)" opacity="0.75" />

      {/* tower + beacon */}
      <g>
        <rect x="694" y="440" width="14" height="250" fill="#17130A" />
        <rect x="668" y="560" width="66" height="130" fill="#17130A" />
        <circle className="twinkle" cx="701" cy="436" r="8" fill="#D2552B" />
      </g>
      <g>
        <rect x="1268" y="420" width="12" height="100" fill="#17130A" />
        <circle className="twinkle" cx="1274" cy="414" r="7" fill="#4FC3B0" style={{ animationDelay: "1.6s" }} />
      </g>

      {/* halftone shimmer on lit faces */}
      <rect x="420" y="630" width="180" height="120" fill="url(#night-ht)" opacity="0.12" />
      <rect x="780" y="640" width="200" height="130" fill="url(#night-ht)" opacity="0.12" />

      {/* street glow */}
      <rect x="0" y="740" width="1600" height="160" fill="url(#night-street)" />

      {/* bottom fade */}
      <rect x="0" y="580" width="1600" height="320" fill="url(#night-fade)" />
    </svg>
  );
}
