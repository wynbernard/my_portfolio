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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const navLinks = ["home", "about", "skills", "projects", "contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: "-40% 0px -40% 0px"
    });

    const sections = navLinks.map(id => document.getElementById(id)).filter(Boolean);
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--container-bg)", color: "var(--container-text)", fontFamily: "'Inter', sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s", position: "relative" }}>
      {/* Light cursor effect */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 9999,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(96, 165, 250, 0.15), transparent 40%)`
        }}
      />
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