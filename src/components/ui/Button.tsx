import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "./Icons";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  download,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = [
    "group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4",
    "text-[13px] font-bold uppercase tracking-[0.18em] text-ink",
    "transition-all duration-300 hover:-translate-y-1",
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download || undefined}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor
      className={cls}
    >
      {inner}
    </button>
  );
}

interface SecondaryLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SecondaryLink({
  children,
  href,
  onClick,
  className = "",
}: SecondaryLinkProps) {
  const cls = [
    "group inline-flex items-center gap-2 pb-1 text-[13px] font-semibold uppercase",
    "tracking-[0.2em] text-cream bg-[linear-gradient(currentColor,currentColor)]",
    "bg-[length:0%_1px] bg-no-repeat bg-[position:0_100%]",
    "transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]",
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} data-cursor className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} data-cursor className={cls}>
      {inner}
    </button>
  );
}
