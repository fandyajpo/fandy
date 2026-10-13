export default function Coastal({ className = "" }: { className?: string }) {
  const palms = [
    { x: 1330, y: 806, s: 1 },
    { x: 1452, y: 838, s: 0.82 },
  ];

  // long wavy line starting at x=-320, period 160 (seamless with -320px drift)
  function wavePath(y: number) {
    let d = `M-320,${y} q40,-16 80,0`;
    for (let x = -240; x < 2000; x += 80) d += " t80,0";
    return d;
  }

  const waves = [
    { y: 592, w: 5, o: 0.55, cls: "wave", bob: "wave-bob", delay: "0s" },
    { y: 640, w: 4, o: 0.4, cls: "wave wave-fast", bob: "wave-bob", delay: "-1.6s" },
    { y: 698, w: 4, o: 0.3, cls: "wave wave-slow", bob: "wave-bob", delay: "-3.2s" },
    { y: 762, w: 3, o: 0.22, cls: "wave", bob: "wave-bob", delay: "-2.2s" },
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
        <linearGradient id="coastal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2552B" />
          <stop offset="52%" stopColor="#F2A66B" />
          <stop offset="100%" stopColor="#FBEBD0" />
        </linearGradient>
        <linearGradient id="coastal-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FB9A6" />
          <stop offset="100%" stopColor="#061E22" />
        </linearGradient>
        <linearGradient id="coastal-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061E22" stopOpacity="0" />
          <stop offset="100%" stopColor="#061E22" stopOpacity="0.95" />
        </linearGradient>
        <pattern
          id="coastal-ht"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="#17130A" opacity="0.45" />
        </pattern>
      </defs>

      {/* sky */}
      <rect width="1600" height="540" fill="url(#coastal-sky)" />

      {/* sun */}
      <circle cx="800" cy="512" r="184" fill="#FBEBD0" opacity="0.28" />
      <circle cx="800" cy="512" r="122" fill="#FBEBD0" />
      <circle cx="800" cy="512" r="122" fill="url(#coastal-ht)" opacity="0.12" />

      {/* streak clouds */}
      <g fill="#FBEBD0" opacity="0.85" className="cloud-a">
        <rect x="150" y="128" width="330" height="30" rx="15" />
        <rect x="236" y="170" width="210" height="22" rx="11" opacity="0.7" />
      </g>
      <g fill="#D2552B" opacity="0.75" className="cloud-b">
        <rect x="1010" y="212" width="390" height="34" rx="17" />
        <rect x="1120" y="262" width="230" height="24" rx="12" opacity="0.75" />
      </g>
      <g fill="#FBEBD0" opacity="0.6" className="cloud-a" style={{ animationDelay: "9s" }}>
        <rect x="600" y="320" width="420" height="26" rx="13" />
      </g>

      {/* birds */}
      <g stroke="#17130A" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M420,214 q18,-16 36,0 q18,-16 36,0" />
        <path d="M520,262 q13,-12 26,0 q13,-12 26,0" />
        <path d="M356,286 q11,-10 22,0 q11,-10 22,0" />
      </g>

      {/* sea */}
      <rect x="0" y="540" width="1600" height="360" fill="url(#coastal-sea)" />
      <g fill="#FBEBD0">
        <rect className="glint" x="738" y="566" width="128" height="10" rx="5" opacity="0.9" />
        <rect className="glint-2" x="700" y="606" width="204" height="11" rx="5" opacity="0.75" />
        <rect className="glint" x="756" y="650" width="112" height="9" rx="4" opacity="0.65" style={{ animationDelay: "1.1s" }} />
        <rect className="glint-2" x="676" y="696" width="256" height="12" rx="6" opacity="0.55" />
        <rect className="glint" x="742" y="744" width="150" height="10" rx="5" opacity="0.5" style={{ animationDelay: "0.5s" }} />
      </g>
      <g stroke="#FBEBD0" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4">
        <path d="M60,586 h180" />
        <path d="M1300,620 h220" />
        <path d="M1180,704 h320" />
      </g>

      {/* rolling waves */}
      {waves.map((wave) => (
        <g key={wave.y} className={wave.bob} style={{ animationDelay: wave.delay }}>
          <path
            className={wave.cls}
            d={wavePath(wave.y)}
            stroke="#FBEBD0"
            strokeWidth={wave.w}
            fill="none"
            strokeLinecap="round"
            opacity={wave.o}
            style={{ animationDelay: wave.delay }}
          />
        </g>
      ))}

      {/* sand */}
      <path
        d="M0,690 C300,650 560,742 820,900 L0,900 Z"
        fill="#FBEBD0"
      />
      <path
        d="M0,690 C300,650 560,742 820,900 L0,900 Z"
        fill="url(#coastal-ht)"
        opacity="0.14"
      />
      <path
        d="M0,796 C260,764 520,830 700,900 L0,900 Z"
        fill="#F2A66B"
        opacity="0.55"
      />

      {/* foam line */}
      <path
        d="M0,690 C300,650 560,742 820,900"
        stroke="#FBEBD0"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* palms */}
      {palms.map((palm) => (
        <g
          key={`${palm.x}-${palm.y}`}
          transform={`translate(${palm.x} ${palm.y}) scale(${palm.s})`}
        >
          <path
            d="M0,0 C-14,-90 -8,-190 18,-268"
            stroke="#17130A"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
          <g stroke="#0F4F4A" strokeWidth="16" fill="none" strokeLinecap="round">
            <path d="M18,-268 C-46,-306 -110,-300 -150,-262" />
            <path d="M18,-268 C-24,-330 -74,-360 -128,-368" />
            <path d="M18,-268 C44,-338 96,-364 152,-362" />
            <path d="M18,-268 C64,-306 128,-312 172,-278" />
            <path d="M18,-268 C10,-332 14,-382 34,-424" />
          </g>
          <ellipse cx="-6" cy="-4" rx="52" ry="16" fill="#0F4F4A" />
        </g>
      ))}

      {/* foreground dune */}
      <path
        d="M1040,900 C1180,818 1400,806 1600,844 L1600,900 Z"
        fill="#1C7A6E"
      />
      <path
        d="M1040,900 C1180,818 1400,806 1600,844"
        stroke="#FBEBD0"
        strokeWidth="5"
        fill="none"
        opacity="0.5"
      />

      {/* bottom fade */}
      <rect x="0" y="580" width="1600" height="320" fill="url(#coastal-fade)" />
    </svg>
  );
}
