export type Category = "Company" | "Freelance" | "Personal";
export type IconName = "mail" | "linkedin" | "github" | "instagram" | "medium";

export interface Profile {
  firstName: string;
  fullName: string;
  wordmark: string;
  role: string;
  eyebrow: string;
  headline: [string, string];
  pitch: string;
  city: string;
  country: string;
  coordinates: string;
  timeZone: string;
  bio: string[];
  workStyle: string;
  quickFacts: { label: string; value: string }[];
  stats: { value: number; suffix: string; label: string }[];
}

export interface Scene {
  id: string;
  num: string;
  name: string;
  chapter: string;
  accent: string;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  category: Category;
  context: string;
  summary: string;
  stack: string[];
  url: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface Education {
  period: string;
  school: string;
  degree?: string;
  note?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface SocialLink {
  label: string;
  display: string;
  href: string;
  icon: IconName;
}

export interface Contact {
  email: string;
  availability: string;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  locale: string;
}

export const site: SiteMeta = {
  title: "Fandy Ahmad — Frontend Developer",
  description:
    "Portfolio of Fandy Ahmad, frontend developer from Denpasar, Bali. Build Boldly. Be Remembered. Web platforms for property, hospitality, edtech and AI.",
  url: "https://fandy.dev",
  locale: "en_US",
};

export const profile: Profile = {
  firstName: "Fandy",
  fullName: "Fandy Ahmad",
  wordmark: "Fandy.",
  role: "Frontend Developer",
  eyebrow: "A Different Kind of Frontend Developer",
  headline: ["Build Boldly.", "Be Remembered."],
  pitch:
    "Frontend developer from Denpasar, Bali — turning ideas into fast, felt web experiences.\nFive years of shipping: property, hospitality, edtech, and AI.",
  city: "Denpasar",
  country: "Indonesia",
  coordinates: "-8.6500° S, 115.2167° E",
  timeZone: "Asia/Makassar",
  bio: [
    "I'm a frontend developer based in Denpasar, Bali. For five years I've turned Figma files, loose briefs, and half-formed ideas into products that real people rely on — property investment platforms, a beach club in Seminyak, e-learning tools, and an AI writing app.",
    "I care about the unglamorous parts: honest loading times, state that behaves, keyboard paths that work, and the tiny detail nobody notices until it's missing. Good work should feel inevitable — like the page could not have been arranged any other way.",
    "When I'm not shipping, I'm usually outdoors — camping around the island, chasing coastline, and taking the long road home. That same instinct drives how I build: go somewhere worth arriving at, and leave the trail cleaner than you found it.",
  ],
  workStyle:
    "Independent, curious, and adaptable. I enjoy taking ownership of tasks, learning through hands-on work, and finding practical solutions to technical problems. I am comfortable working independently or with a team, and I use AI tools thoughtfully to improve research, development, documentation, and productivity.",
  quickFacts: [
    { label: "Based in", value: "Denpasar, Bali, Indonesia" },
    { label: "Field", value: "Frontend engineering & design systems" },
    { label: "Experience", value: "5+ years shipping production web" },
    { label: "Languages", value: "Indonesian (native), English (professional)" },
    { label: "Status", value: "Open to work & freelance" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 15, suffix: "+", label: "Projects shipped" },
    { value: 8, suffix: "+", label: "Clients & teams" },
  ],
};

export const scenes: Scene[] = [
  { id: "alpine", num: "01", name: "Alpine", chapter: "Origin", accent: "#F2A66B" },
  { id: "coastal", num: "02", name: "Coastal", chapter: "Craft", accent: "#A9C23A" },
  { id: "desert", num: "03", name: "Desert", chapter: "Projects", accent: "#D2552B" },
  { id: "night-city", num: "04", name: "Night City", chapter: "Next", accent: "#FBEBD0" },
];

export const navItems: NavItem[] = [
  { label: "About.", href: "#about" },
  { label: "Work.", href: "#work" },
  { label: "Resume.", href: "#resume" },
  { label: "Contact.", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "elle-resort-bali",
    num: "01",
    title: "Elle Resort and Beach Club",
    category: "Company",
    context: "PT. Miravelle Sunzaryn",
    summary: "Sun, sand, and shipping — a hospitality site for a beach club in Seminyak.",
    stack: ["Next.js", "Vercel"],
    url: "https://elleresortandbeachclubbali.com/",
  },
  {
    id: "geonet-properties",
    num: "02",
    title: "Geonet Properties",
    category: "Company",
    context: "PT. Miravelle Sunzaryn",
    summary: "Property investment platform — listings, yields and trust in one fast site.",
    stack: ["Turborepo", "Next.js", "Vercel"],
    url: "https://geonet.properties/",
  },
  {
    id: "geonet-admin-portal",
    num: "03",
    title: "Admin Portal",
    category: "Company",
    context: "PT. Miravelle Sunzaryn",
    summary: "Internal admin portal for the Geonet ecosystem — content and operations in one place.",
    stack: ["Next.js", "Vercel"],
    url: "https://ap.geonet.properties/",
  },
  {
    id: "geonet-investor-portal",
    num: "04",
    title: "Investor Portal",
    category: "Company",
    context: "PT. Miravelle Sunzaryn",
    summary: "Investor-facing portal — portfolios, documents and status at a glance.",
    stack: ["Next.js", "Vercel"],
    url: "https://investor.geonet.properties/",
  },
  {
    id: "geonet-platform-backend",
    num: "05",
    title: "Platform Backend",
    category: "Company",
    context: "PT. Miravelle Sunzaryn",
    summary: "Node.js REST API behind the admin portal, investor portal, and Geonet Properties.",
    stack: ["Node.js", "REST API"],
    url: "https://api2.squaremetre.io/rest-api",
  },
  {
    id: "btw-edutech",
    num: "06",
    title: "BTW Edutech",
    category: "Company",
    context: "PT Bina Taruna Wiratama",
    summary: "E-learning platform — admin tooling for teachers to build and manage student questions.",
    stack: ["Vite", "React", "TypeScript"],
    url: "https://btwedutech.com/",
  },
  {
    id: "ases-ai",
    num: "07",
    title: "Ases AI",
    category: "Company",
    context: "PT Bina Taruna Wiratama",
    summary: "AI writing platform — contributed frontend for the editor and generation flows.",
    stack: ["Vite", "React", "TypeScript"],
    url: "https://asesai.com/",
  },
  {
    id: "wimah-photobooth",
    num: "08",
    title: "Wimah Photobooth",
    category: "Freelance",
    context: "Freelance",
    summary: "Photobooth service site — say cheese.",
    stack: ["Next.js", "Vercel"],
    url: "https://wimahphotobooth.id/",
  },
  {
    id: "wimah-ngundang",
    num: "09",
    title: "Wimah Ngundang",
    category: "Freelance",
    context: "Freelance",
    summary: "Digital wedding invitation — built and shipped with Next.js.",
    stack: ["Next.js", "Vercel"],
    url: "https://wimah-ngundang.vercel.app/",
  },
  {
    id: "towing-fa",
    num: "10",
    title: "Towing Fa",
    category: "Freelance",
    context: "Freelance",
    summary: "Towing service site — fast dispatch, faster builds.",
    stack: ["Next.js", "Vercel"],
    url: "https://towingfa.com/",
  },
  {
    id: "pikm",
    num: "11",
    title: "PIK M Janadi Sahwahita",
    category: "Personal",
    context: "Campus organization",
    summary: "Site for the campus student organization PIK M Janadi Sahwahita.",
    stack: [],
    url: "https://pikm.vercel.app/",
  },
  {
    id: "love-booth",
    num: "12",
    title: "Love Booth",
    category: "Personal",
    context: "Personal project",
    summary: "A little booth of love, deployed and live.",
    stack: ["Astro", "Vercel"],
    url: "https://lovebooth-phi.vercel.app/",
  },
  {
    id: "lorely",
    num: "13",
    title: "PR & Artist Communication Portfolio",
    category: "Personal",
    context: "Personal project",
    summary: "Portfolio site for PR & artist communication work.",
    stack: ["Astro", "Vercel"],
    url: "https://lorely-flax.vercel.app/",
  },
  {
    id: "notain",
    num: "14",
    title: "Invoice Platform",
    category: "Personal",
    context: "Personal project",
    summary: "Invoicing on Astro, Cloudflare Pages, and Appwrite.",
    stack: ["Astro", "Cloudflare", "Appwrite"],
    url: "https://notain.pages.dev/",
  },
  {
    id: "tkaku",
    num: "15",
    title: "TKaku",
    category: "Personal",
    context: "Personal project",
    summary: "Math learning package for students — Astro on Netlify.",
    stack: ["Astro", "Netlify"],
    url: "https://tkaku-annisa.netlify.app/",
  },
];

export const experience: Experience[] = [
  {
    period: "Oct 2022 — Jun 2026",
    role: "Fullstack Developer",
    company: "PT. Miravelle Sunzaryn",
    location: "Bali, Indonesia",
    bullets: [
      "Managed and maintained client websites including property investment platforms serving live investor traffic.",
      "Led website migration to a new architecture with improved performance and a reusable component system.",
      "Shipped the Geonet investor portal and admin panel from empty repo to production.",
    ],
  },
  {
    period: "Sep 2024 — Jan 2025",
    role: "Frontend Developer (Internship)",
    company: "PT Bina Taruna Wiratama",
    location: "Bali, Indonesia",
    bullets: [
      "Implemented Figma designs into responsive dashboard interfaces.",
      "Contributed to the development of the AI writing platform, Ases AI.",
      "Built an e-learning admin for teachers to create and manage student questions.",
    ],
  },
  {
    period: "Apr 2021 — Aug 2022",
    role: "Frontend Developer",
    company: "PT Semua Aplikasi Indonesia",
    location: "Bali, Indonesia",
    bullets: [
      "Where the coding journey started — first hands-on with Next.js, React Native, Tailwind CSS, and ArangoDB.",
      "Helped develop landing pages and backend database work using Next.js and ArangoDB.",
      "Built responsive web and mobile views across early client projects.",
    ],
  },
];

export const education: Education[] = [
  {
    period: "2022 – 2026",
    school: "INSTIKI",
    degree: "Information Technology",
    note: "Graduated",
  },
  {
    period: "2018 – 2021",
    school: "SMK Negeri 3 Mataram",
  },
  {
    period: "2015 – 2018",
    school: "SMP Negeri 8 Mataram",
  },
  {
    period: "2009 – 2015",
    school: "SD 4 Benoa",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Integration",
    skills: ["Node.js", "REST API", "Webhooks"],
  },
  {
    title: "Data & State",
    skills: [
      "MongoDB",
      "Firebase",
      "TanStack Query",
      "React Hook Form",
      "Zustand",
    ],
  },
  {
    title: "Tools & Environment",
    skills: ["Git", "Docker", "Vercel", "Linux", "VS Code", "OpenCode", "Cline"],
  },
  {
    title: "AI",
    skills: [
      "AI Prompting",
      "AI-assisted Development",
      "AI-assisted Research & Analysis",
    ],
  },
  {
    title: "Domain",
    skills: [
      "Investment Platforms",
      "Investor Portals",
      "Admin Portals",
      "Portfolio Tracking",
      "Financial Reporting",
    ],
  },
];

export const certifications: Certification[] = [];

export const contact: Contact = {
  email: "fandyglitch3@gmail.com",
  availability: "Open to work & freelance — usually replies within a day.",
  socials: [
    {
      label: "Email",
      display: "fandyglitch3@gmail.com",
      href: "mailto:fandyglitch3@gmail.com",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      display: "fandy-ahmad-b95b70229",
      href: "https://www.linkedin.com/in/fandy-ahmad-b95b70229/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      display: "fandyajpo",
      href: "https://github.com/fandyajpo",
      icon: "github",
    },
    {
      label: "Instagram",
      display: "fanvercel",
      href: "https://www.instagram.com/fanvercel",
      icon: "instagram",
    },
  ],
};
