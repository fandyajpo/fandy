export default function Desert({ className = "" }: { className?: string }) {
  const cactus = [
    { x: 300, y: 760, s: 1 },
    { x: 1268, y: 742, s: 0.78 },
  ];

  return (
    <svg
      className={`h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="desert-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A2810" />
          <stop offset="38%" stopColor="#A8531F" />
          <stop offset="74%" stopColor="#D2552B" />
          <stop offset="100%" stopColor="#F2A66B" />
        </linearGradient>
        <linearGradient id="desert-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241A0A" stopOpacity="0" />
          <stop offset="100%" stopColor="#241A0A" stopOpacity="0.95" />
        </linearGradient>
        <pattern
          id="desert-ht"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="#FBEBD0" opacity="0.6" />
        </pattern>
      </defs>

      {/* sky */}
      <rect width="1600" height="620" fill="url(#desert-sky)" />

      {/* sun */}
      <circle cx="1140" cy="470" r="176" fill="#FBEBD0" opacity="0.22" />
      <circle cx="1140" cy="470" r="108" fill="#FBEBD0" />
      <circle cx="1140" cy="470" r="108" fill="url(#desert-ht)" opacity="0.14" />

      {/* high streaks */}
      <g fill="#FBEBD0" opacity="0.5" className="cloud-b">
        <rect x="180" y="150" width="360" height="24" rx="12" />
        <rect x="300" y="196" width="210" height="18" rx="9" opacity="0.7" />
      </g>
      <g fill="#F2A66B" opacity="0.55" className="cloud-a" style={{ animationDelay: "4s" }}>
        <rect x="880" y="240" width="430" height="26" rx="13" />
        <rect x="990" y="286" width="240" height="18" rx="9" opacity="0.7" />
      </g>

      {/* birds */}
      <g stroke="#241A0A" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M540,300 q16,-14 32,0 q16,-14 32,0" />
        <path d="M640,344 q12,-11 24,0 q12,-11 24,0" />
      </g>

      {/* dunes */}
      <path
        d="M0,560 C260,500 520,556 780,600 C1040,644 1320,584 1600,540 L1600,900 L0,900 Z"
        fill="#F2A66B"
      />
      <path
        d="M0,560 C260,500 520,556 780,600 C1040,644 1320,584 1600,540 L1600,620 L0,640 Z"
        fill="url(#desert-ht)"
        opacity="0.28"
      />
      <path
        d="M0,668 C300,606 640,700 940,736 C1200,768 1420,706 1600,668 L1600,900 L0,900 Z"
        fill="#D2552B"
      />
      <path
        d="M0,668 C300,606 640,700 940,736 C1200,768 1420,706 1600,668 L1600,724 L0,756 Z"
        fill="url(#desert-ht)"
        opacity="0.22"
      />
      <path
        d="M0,790 C340,730 720,822 1060,846 C1300,864 1460,830 1600,804 L1600,900 L0,900 Z"
        fill="#8C3416"
      />
      <path
        d="M0,860 C380,822 800,884 1180,890 L1600,874 L1600,900 L0,900 Z"
        fill="#5E1F0E"
      />

      {/* cacti */}
      {cactus.map((c) => (
        <g
          key={`${c.x}-${c.y}`}
          transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
          fill="#3D5210"
        >
          <path d="M-20,0 h40 v-150 a20,20 0 0 0 -40,0 Z" />
          <path d="M-64,-58 h26 v-16 a13,13 0 0 1 26,0 v52 a16,16 0 0 1 -16,16 h-36 Z" />
          <path d="M38,-96 h24 v-14 a12,12 0 0 1 24,0 v48 a16,16 0 0 1 -16,16 h-32 Z" />
          <rect x="-70" y="-2" width="140" height="8" rx="4" fill="#5E1F0E" opacity="0.5" />
        </g>
      ))}

      {/* little rocks */}
      <g fill="#5E1F0E">
        <ellipse cx="620" cy="812" rx="46" ry="16" />
        <ellipse cx="678" cy="820" rx="26" ry="11" opacity="0.8" />
        <ellipse cx="1480" cy="840" rx="58" ry="18" />
      </g>

      {/* bottom fade */}
      <rect x="0" y="580" width="1600" height="320" fill="url(#desert-fade)" />
    </svg>
  );
}
