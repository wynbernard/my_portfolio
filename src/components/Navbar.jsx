import React from 'react';

const Navbar = ({ scrolled, activeSection, menuOpen, setMenuOpen, navLinks, scrollTo, isDark, toggleTheme }) => {


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

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="desktop-nav">
            {navLinks.map(l => (
              <button key={l} className={`nav-pill ${activeSection === l ? "active" : ""}`} onClick={() => { scrollTo(l); setMenuOpen(false); }}>{l}</button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            style={{
              background: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--accent)",
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s"
            }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-h)" }} className="mobile-toggle" aria-label="Toggle menu">
            <div style={{ width: 20, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none", transition: "0.3s" }} />
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "0.3s" }} />
              <span style={{ display: "block", height: 2, background: "currentColor", width: "100%", borderRadius: 2, transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none", transition: "0.3s" }} />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, height: "100vh",
          background: "var(--nav-bg)", backdropFilter: "blur(25px)",
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
              onClick={() => {
                scrollTo(l);
                setMenuOpen(false); // ✅ ADD HERE
              }}
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
