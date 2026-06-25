import { useLenis } from "./hooks/useLenis";
import Nav from "./components/Nav";
import FloatingNav from "./components/FloatingNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();

  return (
    <>
      {/* atmosphere overlays */}
      <div className="grain-overlay" aria-hidden />
      <div className="vignette-overlay" aria-hidden />

      <Nav />
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
