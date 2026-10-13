import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m14.5 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9.5 5 7 7-7 7" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21.5s7-6.4 7-11.3A7 7 0 1 0 5 10.2c0 4.9 7 11.3 7 11.3Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.3L3.6 20.4l1.4-4.2A8.4 8.4 0 1 1 20.4 11.7Z" />
      <path
        d="M9.3 9.2c.2-.4.4-.4.6-.4h.4c.2 0 .4 0 .6.5l.6 1.5c.1.2 0 .4-.1.6l-.4.4c-.1.2-.2.3 0 .6.3.5.8 1 1.3 1.4.5.4 1 .7 1.3.8.2.1.4 0 .6-.1l.4-.5c.2-.2.3-.2.6-.1l1.5.7c.2.1.4.3.3.5-.1.5-.5 1.2-1 1.4-.5.3-1.3.3-2.2.1-1.3-.4-2.8-1.1-4-2.3-1.1-1.1-1.9-2.5-2.1-3.7-.2-.9 0-1.7.4-2.3Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.6 10.6V17" />
      <circle cx="7.6" cy="7.5" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11.6 17v-6.4" />
      <path d="M11.6 13.4c0-1.6 1-2.7 2.5-2.7s2.4 1.1 2.4 2.7V17" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, strokeWidth: 0 })}>
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-.95-.02-1.86-3.06.66-3.71-1.48-3.71-1.48-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13.88-.24 1.82-.36 2.76-.36s1.88.12 2.76.36c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.4.34.75 1 .75 2.02 0 1.46-.01 2.64-.01 3 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.44C23.01 5.24 18.27.5 12 .5Z"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MediumIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, strokeWidth: 0 })}>
      <ellipse cx="7.6" cy="12" rx="5.6" ry="7.4" fill="currentColor" />
      <ellipse cx="16.4" cy="12" rx="2.6" ry="7.4" fill="currentColor" />
      <ellipse cx="21.2" cy="12" rx="1.1" ry="7.4" fill="currentColor" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}
