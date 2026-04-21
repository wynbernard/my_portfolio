import React from 'react';

const Navbar = ({ scrolled, activeSection, menuOpen, setMenuOpen, navLinks, scrollTo }) => {
  return (
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
  );
};

export default Navbar;
