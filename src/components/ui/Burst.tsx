interface BurstProps {
  label: string;
  className?: string;
}

export default function Burst({ label, className = "" }: BurstProps) {
  const words = label.split(" ");
  const split = Math.ceil(words.length / 2);
  const first = words.slice(0, split).join(" ");
  const second = words.slice(split).join(" ");

  return (
    <div className={`burst ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <polygon
          points="100,4 118,42 160,26 154,68 196,84 164,112 186,154 142,150 128,192 100,160 72,192 58,150 14,154 36,112 4,84 46,68 40,26 82,42"
          fill="#FFC400"
          stroke="#141414"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <text
          x="100"
          y={second ? "92" : "110"}
          textAnchor="middle"
          fill="#141414"
          fontSize="27"
          fontWeight="900"
          fontFamily="inherit"
          letterSpacing="0.5"
        >
          {first}
        </text>
        {second && (
          <text
            x="100"
            y="122"
            textAnchor="middle"
            fill="#141414"
            fontSize="27"
            fontWeight="900"
            fontFamily="inherit"
            letterSpacing="0.5"
          >
            {second}
          </text>
        )}
      </svg>
    </div>
  );
}
