import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About";
import Work from "@/components/Work/Work";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
