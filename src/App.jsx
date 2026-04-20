import { useState, useEffect, useRef } from "react";
import profileImg from "./assets/wynbernard_id.png";

const skills = {
  Frontend: [
    { name: "HTML", level: 100 },
    { name: "CSS", level: 100 },
    { name: "JavaScript", level: 100 },
    { name: "Bootstrap", level: 75 },
    { name: "NodeJS", level: 50 },
    { name: "Tailwind CSS", level: 40 },
    { name: "ReactJS", level: 40 },
  ],
  Backend: [
    { name: "MySQL", level: 100 },
    { name: "PHP", level: 100 },
    { name: "Java", level: 70 },
    { name: "Express.js", level: 50 },
    { name: "PostgreSQL", level: 40 },
    { name: "Laravel", level: 25 },
    { name: "C++", level: 25 },
  ],
  Others: [
    { name: "Figma", level: 50 },
    { name: "Android Java", level: 50 },
    { name: "Photo Editing", level: 50 },
    { name: "Flash Animation", level: 50 },
    { name: "Video Editing", level: 50 },
  ],
};

const projects = [
  {
    title: "Farm Management System",
    date: "Feb 2026 – Ongoing",
    type: "OJT Project",
    desc: "A multi-tenant farm management platform featuring timesheet tracking with approval workflows, task management, inventory, accounting, and role-based access control.",
    tech: ["NextJS", "TailwindCSS", "NodeJS", "PostgreSQL"],
    tag: "ongoing",
  },
  {
    title: "Disaster Evacuation Management System",
    date: "Mar – Dec 2025",
    type: "Capstone + Hackathon",
    desc: "An AI-driven evacuation system with predictive analytics for resilient urban futures. Won Best Smart Communities Innovation & People's Choice Award among 17 solutions in Western Visayas.",
    tech: ["JavaScript", "HTML", "CSS", "PHP", "Python", "MySQL", "Bootstrap"],
    tag: "award",
  },
  {
    title: "Bantay Kalusugan Management System",
    date: "November 2025",
    type: "2nd BSIS Hackathon",
    desc: "A web-based platform to support community health monitoring. Enables health workers and barangay officials to track residents' medical records, check-ups, and vaccinations.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "Bootstrap", "PHP"],
    tag: null,
  },
  {
    title: "Book Inventory Management System",
    date: "Jan – Mar 2024",
    type: "Class Project",
    desc: "A web-based tool to manage and track books in a bookstore or library. Supports adding, updating, deleting, and searching book records with easy reporting.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "Bootstrap", "PHP"],
    tag: null,
  },
];

const achievements = [
  { icon: "🏆", title: "Programmer of the Year", year: "2024" },
  { icon: "🌐", title: "Web Developer of the Year", year: "2025" },
  { icon: "⭐", title: "Best Smart Communities Innovation", year: "2025" },
  { icon: "🎯", title: "People's Choice Award", year: "2025" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [scrolled, setScrolled] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [typedFirst, setTypedFirst] = useState("");
  const [typedLast, setTypedLast] = useState("");
  const [typingPhase, setTypingPhase] = useState("first");
  const [isDragging, setIsDragging] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Window-level drag — card is position:fixed so it moves freely across the entire viewport
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      setCardPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const onUp = () => {
      setIsDragging(false);
      // Spring back to origin
      setCardPos(originPos);
      // After animation, release fixed position
      setTimeout(() => setIsFixed(false), 680);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, dragOffset, originPos]);

  useEffect(() => {
    setAnimatedBars(false);
    const t = setTimeout(() => setAnimatedBars(true), 100);
    return () => clearTimeout(t);
  }, [activeSkillTab]);

  useEffect(() => {
    const first = "Wynbernard";
    const last = "Deysolong";
    let timeout;
    if (typingPhase === "first") {
      if (typedFirst.length < first.length) {
        timeout = setTimeout(() => setTypedFirst(first.slice(0, typedFirst.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setTypingPhase("pause"), 400);
      }
    } else if (typingPhase === "pause") {
      if (typedLast.length < last.length) {
        timeout = setTimeout(() => setTypedLast(last.slice(0, typedLast.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setTypingPhase("erase-last"), 1400);
      }
    } else if (typingPhase === "erase-last") {
      if (typedLast.length > 0) {
        timeout = setTimeout(() => setTypedLast(typedLast.slice(0, -1)), 55);
      } else {
        timeout = setTimeout(() => setTypingPhase("erase-first"), 120);
      }
    } else if (typingPhase === "erase-first") {
      if (typedFirst.length > 0) {
        timeout = setTimeout(() => setTypedFirst(typedFirst.slice(0, -1)), 55);
      } else {
        timeout = setTimeout(() => setTypingPhase("first"), 500);
      }
    }
    return () => clearTimeout(timeout);
  }, [typingPhase, typedFirst, typedLast]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navLinks = ["home", "about", "skills", "projects", "contact"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--container-bg)", color: "var(--container-text)", fontFamily: "'Inter', sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@600;700;800&display=swap');

        :root {
          --nav-text: #94a3b8;
          --nav-active-bg: rgba(96, 165, 250, 0.1);
          --nav-active-text: #93c5fd;
          --text-muted: #94a3b8;
          --text-h: #f8fafc;
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-border: rgba(255, 255, 255, 0.06);
          --skill-track-bg: rgba(255, 255, 255, 0.06);
          --tag-bg: rgba(96, 165, 250, 0.1);
          --tag-border: rgba(96, 165, 250, 0.2);
          --tag-text: #93c5fd;
          --tab-btn-text: #64748b;
          --tab-btn-border: rgba(255, 255, 255, 0.1);
          --field-bg: rgba(255, 255, 255, 0.03);
          --field-border: rgba(255, 255, 255, 0.1);
          --field-text: #f1f5f9;
          --field-placeholder: #475569;
          --section-label-tag: #60a5fa;
          --nav-bg: rgba(8, 8, 15, 0.9);
          --nav-border: rgba(255, 255, 255, 0.08);
          --blob-opacity: 0.3;
          --container-bg: #08080f;
          --container-text: #cbd5e1;
          --section-bg-subtle: rgba(255, 255, 255, 0.015);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { width: 100%; margin: 0; padding: 0; }
        body { width: 100%; margin: 0 !important; padding: 0 !important; background: #08080f; }
        #root { width: 100%; margin: 0; padding: 0; }

        .gtext {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 55%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .syne { font-family: 'Outfit', sans-serif; letter-spacing: -0.01em; }
        .mono { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

        .nav-pill {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 99px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--nav-text);
        }
        .nav-pill:hover { color: var(--nav-active-text); }
        .nav-pill.active {
          background: var(--nav-active-bg);
          color: var(--nav-active-text);
        }

        .card {
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          border-radius: 16px;
          transition: transform 0.25s, border-color 0.25s;
          box-shadow: none;
        }
        .card:hover {
          transform: translateY(-3px);
          border-color: rgba(96,165,250,0.15);
        }

        .skill-track {
          height: 3px;
          background: var(--skill-track-bg);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 10px;
        }
        .skill-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.9s cubic-bezier(0.4,0,0.2,1);
        }

        .tech-tag {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 5px;
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          color: var(--tag-text);
        }

        .tab-btn {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          padding: 7px 18px;
          border-radius: 8px;
          border: 1px solid var(--tab-btn-border);
          background: transparent;
          color: var(--tab-btn-text);
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: var(--nav-active-bg);
          border-color: rgba(96,165,250,0.3);
          color: var(--nav-active-text);
        }

        .btn-main {
          background: linear-gradient(135deg, #3b82f6, #7c3aed);
          color: #fff;
          border: none;
          padding: 13px 36px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-main:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent;
          color: var(--nav-text);
          border: 1px solid var(--tab-btn-border);
          padding: 13px 36px;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.05em;
        }
        .btn-ghost:hover { color: var(--nav-active-text); border-color: rgba(96,165,250,0.3); }

        .field {
          background: var(--field-bg);
          border: 1px solid var(--field-border);
          border-radius: 10px;
          color: var(--field-text);
          padding: 13px 16px;
          width: 100%;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .field:focus { border-color: rgba(96,165,250,0.35); }
        .field::placeholder { color: var(--field-placeholder); }

        .section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 48px;
        }
        .section-bar {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg,#3b82f6,#8b5cf6);
          border-radius: 99px;
          flex-shrink: 0;
        }
        .section-tag {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--section-label-tag);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(96,165,250,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(90px);
          opacity: var(--blob-opacity);
          animation: bpulse 6s ease-in-out infinite;
        }
        @keyframes bpulse {
          0%,100% { opacity: 0.3; }
          50% { opacity: 0.55; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .fu  { animation: fadeUp 0.65s ease both; }
        .fu1 { animation: fadeUp 0.65s 0.12s ease both; }
        .fu2 { animation: fadeUp 0.65s 0.24s ease both; }
        .fu3 { animation: fadeUp 0.65s 0.36s ease both; }

        @keyframes idSwing {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg); }
        }
        .id-card-hang {
          animation: idSwing 4s ease-in-out infinite;
          transform-origin: top center;
        }
        .id-card-hang:hover {
          animation-play-state: paused;
          transform: rotate(0deg) scale(1.03);
          transition: transform 0.3s ease;
        }

        .tag-active {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 5px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          color: #6ee7b7;
          text-transform: uppercase;
        }
        .tag-award {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 5px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.25);
          color: #fcd34d;
          text-transform: uppercase;
        }

        .mobile-toggle { display: none; }
        .desktop-nav { display: flex; gap: 4px; }

        @media (max-width: 768px) {
          .hero-title { font-size: 11vw !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none; }
          .mobile-toggle { display: block; }
          .logo-text { display: none; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--nav-border)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: scrolled ? "12px 24px" : "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "padding 0.3s" }}>
          <span className="syne gtext logo-text" style={{ fontSize: 22, fontWeight: 800 }}>WD.</span>

          <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
            {navLinks.map(l => (
              <button key={l} className={`nav-pill ${activeSection === l ? "active" : ""}`} onClick={() => { scrollTo(l); setMenuOpen(false); }}>{l}</button>
            ))}
          </div>

          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-h)" }} className="mobile-toggle" aria-label="Toggle menu">
            <div style={{ width: 20, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none", transition: "0.3s" }} />
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "0.3s" }} />
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none", transition: "0.3s" }} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div style={{
            position: "fixed", top: "100%", left: 0, right: 0, height: "calc(100vh - 100%)",
            background: "rgba(8, 8, 15, 0.95)", backdropFilter: "blur(25px)",
            padding: "40px 24px", display: "flex", flexDirection: "column", gap: 24,
            zIndex: 99, borderTop: "1px solid var(--nav-border)"
          }}>
            {navLinks.map((l, idx) => (
              <button
                key={l}
                className="syne"
                style={{
                  textAlign: "left", background: "none", border: "none",
                  fontSize: "max(24px, 5vh)", fontWeight: 700, color: activeSection === l ? "var(--nav-active-text)" : "var(--container-text)",
                  textTransform: "capitalize", cursor: "pointer",
                  animation: `fadeUp 0.4s ${idx * 0.05}s ease both`
                }}
                onClick={() => scrollTo(l)}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 80 }}>
        {/* Blob container — clips blobs but lets the card overflow freely */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
          <div className="blob" style={{ width: 420, height: 420, background: "#1d4ed8", top: "5%", right: "-8%" }} />
          <div className="blob" style={{ width: 300, height: 300, background: "#6d28d9", bottom: "10%", left: "-5%", animationDelay: "3s" }} />
        </div>


        <div className="hero-content" style={{ position: "relative", zIndex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "60px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px", justifyContent: "center" }}>

          {/* LEFT — Hanging ID Card */}
          <div className="hero-image-col" style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>

            {/* Lanyard + Card wrapper */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none", position: "relative" }}>
              
              {/* Anchor Point — where the cord is tied */}
              <div ref={anchorRef} style={{ position: "absolute", top: 0, left: "50%", width: 1, height: 1 }} />

              {/* Cord */}
              {!isFixed ? (
                <div style={{
                  width: 18, height: 50,
                  background: "#0f172a",
                  borderLeft: "2px solid #3b82f6",
                  borderRight: "2px solid #3b82f6",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.8)",
                  flexShrink: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "flex-end",
                  position: "relative",
                  zIndex: 2
                }}>
                  {/* Hardware clip */}
                  <div style={{ 
                    width: 14, height: 28, 
                    background: "linear-gradient(to bottom, #94a3b8, #475569)", 
                    borderRadius: "3px 3px 8px 8px", 
                    border: "1px solid #1e293b", 
                    transform: "translateY(12px)", 
                    display: "flex", justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    position: "relative",
                  }}>
                    {/* Metal Hook */}
                    <div style={{ width: 6, height: 12, border: "2px solid #f1f5f9", borderRadius: 10, position: "absolute", bottom: -6 }} />
                  </div>
                </div>
              ) : (() => {
                // Dynamic Cord Calculation
                const anchorRect = anchorRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0 };
                const ax = anchorRect.left + anchorRect.width / 2;
                const ay = anchorRect.top;
                const hx = cardPos.x + 120; // card center
                const hy = cardPos.y + 19;  // hole center
                const dx = hx - ax;
                const dy = hy - ay;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;

                return (
                  <div style={{
                    position: "fixed",
                    left: ax - 9, // half of 18px width
                    top: ay,
                    width: 18,
                    height: dist - 19, // leave space for the hardware clip below
                    background: "#0f172a",
                    borderLeft: "2px solid #3b82f6",
                    borderRight: "2px solid #3b82f6",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.8)",
                    transformOrigin: "top center",
                    transform: `rotate(${angle}deg)`,
                    zIndex: 9998,
                    pointerEvents: "none",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "flex-end",
                    transition: isDragging ? "none" : "height 0.65s cubic-bezier(0.34,1.56,0.64,1), transform 0.65s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    {/* Hardware clip */}
                    <div style={{ 
                      width: 14, height: 28, 
                      background: "linear-gradient(to bottom, #94a3b8, #475569)", 
                      borderRadius: "3px 3px 8px 8px", 
                      border: "1px solid #1e293b", 
                      transform: "translateY(12px)", 
                      display: "flex", justifyContent: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                      position: "relative",
                    }}>
                      {/* Metal Hook */}
                      <div style={{ width: 6, height: 12, border: "2px solid #f1f5f9", borderRadius: 10, position: "absolute", bottom: -6 }} />
                    </div>
                  </div>
                );
              })()}

              {/* Placeholder keeps layout space when card is fixed */}
              {isFixed && <div style={{ width: 240, height: 290, flexShrink: 0 }} />}

              {/* ID Card */}
              <div
                ref={cardRef}
                className={isFixed ? "" : "id-card-hang"}
                onMouseDown={e => {
                  e.preventDefault();
                  const rect = cardRef.current.getBoundingClientRect();
                  setOriginPos({ x: rect.left, y: rect.top });
                  setCardPos({ x: rect.left, y: rect.top });
                  setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  setIsFixed(true);
                  setIsDragging(true);
                }}
                style={{
                  width: 240,
                  borderRadius: 16,
                  border: "1px solid rgba(96,165,250,0.25)",
                  overflow: "hidden",
                  position: isFixed ? "fixed" : "relative",
                  left: isFixed ? cardPos.x : "auto",
                  top: isFixed ? cardPos.y : "auto",
                  background: "linear-gradient(160deg, rgba(15,23,42,0.95), rgba(8,8,15,0.98))",
                  boxShadow: isDragging
                    ? "0 40px 90px rgba(0,0,0,0.7), 0 0 60px rgba(96,165,250,0.2)"
                    : "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(96,165,250,0.1)",
                  cursor: isDragging ? "grabbing" : "grab",
                  transition: isDragging
                    ? "box-shadow 0.1s"
                    : "left 0.65s cubic-bezier(0.34,1.56,0.64,1), top 0.65s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
                  willChange: "left, top",
                  zIndex: isFixed ? 9999 : 1,
                }}
              >
                {/* Clip hole at top */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px", background: "rgba(96,165,250,0.04)", borderBottom: "1px solid rgba(96,165,250,0.08)" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #475569", background: "rgba(8,8,15,0.8)" }} />
                </div>

                {/* Photo */}
                <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 120, height: 140, borderRadius: 10, overflow: "hidden", border: "2px solid rgba(96,165,250,0.2)" }}>
                    <img
                      src={profileImg}
                      alt="Wynbernard Deysolong"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                </div>

                {/* ID Info */}
                <div style={{ padding: "8px 16px 16px", textAlign: "center" }}>
                  <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 2 }}>Wynbernard D.</p>
                  <p className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: "#60a5fa", marginBottom: 10 }}>Backend Developer</p>
                  <div style={{ height: 1, background: "rgba(96,165,250,0.1)", marginBottom: 10 }} />
                  <p className="mono" style={{ fontSize: 8, letterSpacing: "0.1em", color: "#475569" }}>Bago City College · 2022–present</p>
                </div>

                {/* Bottom stripe */}
                <div style={{ height: 6, background: "linear-gradient(90deg, #3b82f6, #7c3aed, #f472b6)" }} />
              </div>
            </div>

            {/* status badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 99, padding: "6px 16px", transition: "all 0.4s" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 6px #10b981", transition: "all 0.4s" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "#6ee7b7", transition: "color 0.4s" }}>Available for work</span>
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="fu1" style={{ flex: 1, minWidth: 300, maxWidth: 560 }}>
            <p className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(96,165,250,0.6)", marginBottom: 20 }}>Backend Developer · Philippines</p>

            <h1 className="syne hero-title" style={{ fontWeight: 800, marginBottom: 24, minHeight: "2.2em" }}>
              <span className="gtext">{typedFirst}</span>
              <span style={{ color: "var(--text-h)" }}> {typedLast}<span style={{ display: "inline-block", width: 3, height: "0.85em", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", borderRadius: 2, marginLeft: 2, verticalAlign: "middle", animation: "blink 0.75s step-end infinite" }} /></span>
            </h1>

            <p className="fu2" style={{ color: "#64748b", fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
              A motivated software developer building web-based applications, information systems, and database-driven solutions — blending frontend craft with backend logic.
            </p>

            <div className="fu3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
              <button className="btn-main" onClick={() => scrollTo("projects")}>View Projects</button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get in Touch</button>
            </div>

            <div className="fu3" style={{ display: "flex", gap: 32, flexWrap: "wrap", borderTop: "1px solid var(--nav-border)", paddingTop: 32 }}>
              {[{ label: "Programmer of the Year", year: "2024" }, { label: "Web Dev of the Year", year: "2025" }].map(a => (
                <div key={a.label}>
                  <p className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{a.label}</p>
                  <p className="syne" style={{ fontSize: 18, fontWeight: 700, color: "var(--container-text)" }}>{a.year}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label"><div className="section-bar" /><span className="section-tag">About</span></div>

          <div className="two-col" style={{ alignItems: "start" }}>
            <div>
              <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: "var(--container-text)" }}>
                Crafting digital<br /><span className="gtext">experiences</span>
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
                I'm a detail-oriented software developer from Bago City, Philippines, currently pursuing my Bachelor of Science in Information System at Bago City College (2022–present).
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 36, fontSize: 15 }}>
                With hands-on experience in both frontend and backend development, I've contributed to award-winning hackathon projects, capstone systems, and OJT platforms. I'm highly adaptable, a fast learner, and committed to continuous improvement and delivering user-centered solutions.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "Location", value: "Bago City, Philippines" },
                  { label: "Email", value: "wynber11@gmail.com" },
                  { label: "Contact", value: "09630539038" },
                  { label: "Education", value: "BSIS · Bago City College" },
                ].map(item => (
                  <div key={item.label} className="card" style={{ padding: "14px 16px" }}>
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 5 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: "var(--container-text)", fontWeight: 500 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--container-text)", marginBottom: 20 }}>Key Achievements</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {achievements.map(a => (
                  <div key={a.title} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 22 }}>{a.icon}</span>
                    <div>
                      <p style={{ fontSize: 14, color: "var(--container-text)", fontWeight: 500 }}>{a.title}</p>
                      <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{a.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 24px", background: "var(--section-bg-subtle)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label"><div className="section-bar" /><span className="section-tag">Skills</span></div>

          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 36 }}>
            Area of <span className="gtext">Expertise</span>
          </h2>

          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
            {Object.keys(skills).map(tab => (
              <button key={tab} className={`tab-btn ${activeSkillTab === tab ? "active" : ""}`} onClick={() => setActiveSkillTab(tab)}>{tab}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {skills[activeSkillTab].map(skill => (
              <div key={skill.name} className="card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "var(--container-text)" }}>{skill.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: animatedBars ? `${skill.level}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label"><div className="section-bar" /><span className="section-tag">Projects</span></div>

          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 40 }}>
            Project <span className="gtext">Experience</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))", gap: 18 }}>
            {projects.map(p => (
              <div key={p.title} className="card" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>{p.type}</p>
                    <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--container-text)", lineHeight: 1.3 }}>{p.title}</h3>
                  </div>
                  {p.tag === "ongoing" && <span className="tag-active">Active</span>}
                  {p.tag === "award" && <span className="tag-award">Award</span>}
                </div>

                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75 }}>{p.desc}</p>

                <div style={{ borderTop: "1px solid var(--nav-border)", paddingTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{p.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 24px", background: "var(--section-bg-subtle)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label"><div className="section-bar" /><span className="section-tag">Contact</span></div>

          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 10 }}>
            Let's <span className="gtext">Connect</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 40 }}>Open to opportunities, collaborations, and new projects.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <div className="two-col" style={{ gap: 14 }}>
              <input className="field" placeholder="Your name" />
              <input className="field" type="email" placeholder="Your email" />
            </div>
            <input className="field" placeholder="Subject" />
            <textarea className="field" placeholder="Your message..." rows={5} style={{ resize: "none" }} />
          </div>

          <button className="btn-main" style={{ width: "100%" }}>Send Message</button>

          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[
              { label: "Email", value: "wynber11@gmail.com", href: "mailto:wynber11@gmail.com" },
              { label: "Phone", value: "09630539038", href: "tel:09630539038" },
              { label: "Location", value: "Bago City, Philippines", href: null },
            ].map(item => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <p className="mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>{item.label}</p>
                {item.href
                  ? <a href={item.href} style={{ fontSize: 13, color: "#60a5fa", textDecoration: "none" }}>{item.value}</a>
                  : <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.value}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "28px 24px", borderTop: "1px solid var(--nav-border)", textAlign: "center" }}>
        <p className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          © 2025 Wynbernard Deysolong — Built with React & Tailwind
        </p>
      </footer>
    </div>
  );
}