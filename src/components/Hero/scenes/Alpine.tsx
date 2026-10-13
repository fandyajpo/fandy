export default function Alpine({ className = "" }: { className?: string }) {
  const posts = [80, 190, 300, 410, 520];

  return (
    <svg
      className={`h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="alpine-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061E22" />
          <stop offset="45%" stopColor="#0C3A40" />
          <stop offset="100%" stopColor="#4FB9A6" />
        </linearGradient>
        <linearGradient id="alpine-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E9B8A" />
          <stop offset="100%" stopColor="#0C3A40" />
        </linearGradient>
        <linearGradient id="alpine-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061E22" stopOpacity="0" />
          <stop offset="100%" stopColor="#061E22" stopOpacity="0.95" />
        </linearGradient>
        <pattern
          id="alpine-ht"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.3" fill="#FBEBD0" opacity="0.55" />
        </pattern>
        <filter id="alpine-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* sky */}
      <rect width="1600" height="900" fill="url(#alpine-sky)" />

      {/* clouds */}
      <g className="cloud-a" opacity="0.95">
        <g fill="#FBEBD0">
          <ellipse cx="330" cy="170" rx="96" ry="46" />
          <ellipse cx="410" cy="146" rx="70" ry="42" />
          <ellipse cx="256" cy="152" rx="58" ry="34" />
        </g>
        <rect
          x="234"
          y="128"
          width="272"
          height="86"
          fill="url(#alpine-ht)"
          opacity="0.35"
        />
      </g>
      <g className="cloud-b" opacity="0.9">
        <g fill="#F2A66B">
          <ellipse cx="1180" cy="250" rx="120" ry="44" />
          <ellipse cx="1268" cy="228" rx="76" ry="40" />
          <ellipse cx="1102" cy="238" rx="62" ry="30" />
        </g>
        <ellipse cx="1180" cy="238" rx="140" ry="52" fill="url(#alpine-ht)" opacity="0.3" />
      </g>
      <g className="cloud-a" opacity="0.75" style={{ animationDelay: "6s" }}>
        <g fill="#FBEBD0">
          <ellipse cx="820" cy="118" rx="84" ry="34" />
          <ellipse cx="884" cy="102" rx="56" ry="30" />
        </g>
      </g>

      {/* distant range */}
      <polygon
        points="0,760 210,470 370,610 520,420 700,760"
        fill="#061E22"
        opacity="0.85"
      />
      <polygon
        points="1040,760 1240,520 1390,640 1560,470 1600,520 1600,760"
        fill="#061E22"
        opacity="0.75"
      />

      {/* main peaks */}
      <g>
        <polygon points="720,200 300,780 660,780" fill="#061E22" />
        <polygon points="720,200 1140,780 790,780" fill="#D2552B" />
        <polygon points="720,200 960,500 790,780 760,430" fill="#F2A66B" opacity="0.85" />
        <polygon points="720,200 640,330 700,356 745,318 790,362 820,330" fill="#FBEBD0" />
        <polygon points="720,200 1140,780 790,780" fill="url(#alpine-ht)" opacity="0.22" />
      </g>
      <g>
        <polygon points="1310,330 1010,780 1270,780" fill="#061E22" />
        <polygon points="1310,330 1600,780 1360,780" fill="#D2552B" />
        <polygon points="1310,330 1460,530 1360,780 1335,470" fill="#F2A66B" opacity="0.8" />
        <polygon points="1310,330 1264,420 1300,438 1332,412 1364,444 1384,424" fill="#FBEBD0" />
      </g>
      <g>
        <polygon points="420,470 190,780 470,780" fill="#061E22" opacity="0.9" />
        <polygon points="420,470 640,780 460,780" fill="#8C3416" />
        <polygon points="420,470 380,530 410,545 442,522 470,548" fill="#FBEBD0" opacity="0.9" />
      </g>

      {/* treeline */}
      <path
        d="M0,700 C260,660 520,720 780,690 C1040,660 1320,710 1600,680 L1600,800 L0,800 Z"
        fill="#0F4F4A"
      />

      {/* lake */}
      <path
        d="M880,782 C1060,744 1320,754 1600,792 L1600,900 L740,900 C790,856 830,812 880,782 Z"
        fill="url(#alpine-lake)"
      />
      <ellipse cx="1330" cy="836" rx="96" ry="26" fill="#1C7A6E" />
      <ellipse cx="1322" cy="806" rx="30" ry="34" fill="#0F4F4A" />
      <ellipse cx="1364" cy="812" rx="20" ry="24" fill="#0F4F4A" />
      <g stroke="#FBEBD0" strokeLinecap="round" fill="none">
        <path className="glint" d="M1010,826 h120" strokeWidth="5" opacity="0.8" />
        <path className="glint-2" d="M1140,856 h170" strokeWidth="6" opacity="0.7" />
        <path className="glint" d="M960,874 h90" strokeWidth="4" opacity="0.6" style={{ animationDelay: "1.4s" }} />
        <path className="glint-2" d="M1330,876 h140" strokeWidth="5" opacity="0.55" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* green slope */}
      <path
        d="M0,648 C240,624 520,712 720,900 L0,900 Z"
        fill="#1C7A6E"
      />
      <path
        d="M0,742 C210,722 430,796 540,900 L0,900 Z"
        fill="#2FA091"
      />

      {/* house */}
      <g>
        <rect x="242" y="686" width="76" height="58" fill="#FBEBD0" />
        <polygon points="228,688 280,646 332,688" fill="#D2552B" />
        <rect x="268" y="712" width="22" height="32" fill="#061E22" />
        <rect x="250" y="698" width="14" height="14" fill="#F2A66B" />
        <rect
          x="242"
          y="686"
          width="76"
          height="58"
          fill="url(#alpine-ht)"
          opacity="0.18"
        />
      </g>

      {/* cypress trees */}
      <g fill="#0F4F4A">
        <path d="M132,760 C112,724 116,662 136,640 C156,662 158,726 140,760 Z" />
        <path d="M394,780 C374,742 378,678 398,656 C418,678 420,744 402,780 Z" />
        <path d="M452,792 C436,762 440,712 456,694 C472,712 474,764 460,792 Z" />
      </g>

      {/* fence */}
      <g stroke="#FBEBD0" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M40,796 Q300,756 570,812" />
        <path d="M40,836 Q300,798 570,850" />
        {posts.map((x) => (
          <path key={x} d={`M${x},${782 + (x % 40)} v58`} strokeWidth="7" />
        ))}
      </g>

      {/* foreground flowers */}
      <g filter="url(#alpine-blur)" opacity="0.85">
        <circle cx="70" cy="852" r="24" fill="#F2A66B" />
        <circle cx="148" cy="874" r="20" fill="#4FC3B0" />
        <circle cx="228" cy="856" r="17" fill="#D2552B" />
        <circle cx="316" cy="880" r="22" fill="#F2A66B" />
        <circle cx="430" cy="866" r="15" fill="#FBEBD0" />
        <circle cx="540" cy="886" r="19" fill="#D2552B" />
      </g>

      {/* bottom fade */}
      <rect x="0" y="580" width="1600" height="320" fill="url(#alpine-fade)" />
    </svg>
  );
}
