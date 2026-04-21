import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navLinks = ["home", "about", "skills", "projects", "contact"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--container-bg)", color: "var(--container-text)", fontFamily: "'Inter', sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navLinks={navLinks}
        scrollTo={scrollTo}
      />
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}