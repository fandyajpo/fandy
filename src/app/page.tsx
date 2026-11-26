import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About";
import Work from "@/components/Work/Work";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/ui/Marquee";

const marqueeItems = [
  "Build boldly",
  "Be remembered",
  "Frontend developer",
  "Denpasar, Bali",
  "Open to work",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Marquee items={marqueeItems} />
        <Work />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
