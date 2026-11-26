interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item) => (
              <span className="label marquee-item" key={`${copy}-${item}`}>
                {item}
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
