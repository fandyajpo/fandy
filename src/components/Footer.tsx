import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-5">
        <p className="label text-cream/55">
          © {new Date().getFullYear()} {profile.fullName}. Made by hand.
        </p>
        <a
          href="#top"
          className="label text-cream/70 transition-colors duration-300 hover:text-peach"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
