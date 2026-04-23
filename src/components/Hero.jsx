import React, { useState, useEffect, useRef } from "react";
import profileImg from "../assets/profile.jpg";
import sleepImg from "../assets/sleep.png";

const Hero = ({ scrollTo, isDark }) => {
  const [typedFirst, setTypedFirst] = useState("");
  const [typedLast, setTypedLast] = useState("");
  const [typingPhase, setTypingPhase] = useState("first");

  const [isDragging, setIsDragging] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardHeight, setCardHeight] = useState(290);

  const cardRef = useRef(null);
  const anchorRef = useRef(null);
  const innerCardRef = useRef(null);
  const cardVelocity = useRef({ x: 0, y: 0 });
  const lastCardPos = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let frameId;
    const updatePhysics = () => {
      if (cardRef.current && innerCardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const currentX = rect.left;
        const currentY = rect.top;

        if (lastCardPos.current.x !== 0 || lastCardPos.current.y !== 0) {
          const vx = currentX - lastCardPos.current.x;
          const vy = currentY - lastCardPos.current.y;

          cardVelocity.current.x = cardVelocity.current.x * 0.8 + vx * 0.2;
          cardVelocity.current.y = cardVelocity.current.y * 0.8 + vy * 0.2;
        }

        lastCardPos.current.x = currentX;
        lastCardPos.current.y = currentY;

        let tx = cardVelocity.current.y * 1.5;
        let ty = cardVelocity.current.x * 1.5;
        let tz = -cardVelocity.current.x * 1.2;

        tx = Math.max(-45, Math.min(45, tx));
        ty = Math.max(-45, Math.min(45, ty));
        tz = Math.max(-35, Math.min(35, tz));

        const tension = 0.08;
        const friction = 0.82;

        rotationVelocity.current.x += (tx - currentRotation.current.x) * tension;
        rotationVelocity.current.y += (ty - currentRotation.current.y) * tension;
        rotationVelocity.current.z += (tz - currentRotation.current.z) * tension;

        rotationVelocity.current.x *= friction;
        rotationVelocity.current.y *= friction;
        rotationVelocity.current.z *= friction;

        currentRotation.current.x += rotationVelocity.current.x;
        currentRotation.current.y += rotationVelocity.current.y;
        currentRotation.current.z += rotationVelocity.current.z;

        innerCardRef.current.style.transform = `perspective(1000px) rotateX(${currentRotation.current.x}deg) rotateY(${currentRotation.current.y}deg) rotateZ(${currentRotation.current.z}deg)`;
      }
      frameId = requestAnimationFrame(updatePhysics);
    };
    frameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      setCardPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const onUp = () => {
      setIsDragging(false);
      setCardPos(originPos);
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

  return (
    <section id="home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 80 }}>
      {/* Blob container — clips blobs but lets the card overflow freely */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <div className="blob" style={{ width: 420, height: 420, background: "var(--blob-color-1)", top: "5%", right: "-8%" }} />
        <div className="blob" style={{ width: 300, height: 300, background: "var(--blob-color-2)", bottom: "10%", left: "-5%", animationDelay: "3s" }} />
      </div>

      <div className="hero-content" style={{ position: "relative", zIndex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "60px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px", justifyContent: "center" }}>
        {/* LEFT — Hanging ID Card */}
        <div className="hero-image-col" style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {/* Lanyard + Card wrapper */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none", position: "relative" }}>
            {/* Anchor Point — where the cord is tied */}
            <div ref={anchorRef} style={{ position: "absolute", top: -1000, left: "50%", width: 1, height: 1 }} />

            {/* Cord Layout Placeholder / Static Cord */}
            <div style={{ position: "relative", width: 80, height: 60, zIndex: 2, flexShrink: 0 }}>
              {!isFixed && (
                <>
                  {/* Left String */}
                  <div style={{
                    position: "absolute", bottom: 8, left: 35,
                    width: 10, height: 1000,
                    background: "var(--lanyard-string)", borderRight: "2px solid var(--lanyard-string-border)",
                    borderLeft: "1px solid var(--lanyard-string-inner)",
                    transformOrigin: "bottom center", transform: "rotate(-2.3deg)"
                  }} />
                  {/* Right String */}
                  <div style={{
                    position: "absolute", bottom: 8, right: 35,
                    width: 10, height: 1000,
                    background: "var(--lanyard-string)", borderLeft: "2px solid var(--lanyard-string-border)",
                    borderRight: "1px solid var(--lanyard-string-inner)",
                    transformOrigin: "bottom center", transform: "rotate(2.3deg)"
                  }} />

                  {/* Hardware clip */}
                  <div style={{
                    position: "absolute", top: 52, left: 33,
                    width: 14, height: 28,
                    background: "linear-gradient(to bottom, #94a3b8, #475569)",
                    borderRadius: "3px 3px 8px 8px",
                    border: "1px solid #1e293b",
                    display: "flex", justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    zIndex: 3
                  }}>
                    {/* Metal Hook */}
                    <div style={{ width: 6, height: 12, border: "2px solid #f1f5f9", borderRadius: 10, position: "absolute", bottom: -6 }} />
                  </div>
                </>
              )}
            </div>

            {isFixed && (() => {
              // Dynamic Cord Calculation
              const anchorRect = anchorRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0 };
              const ax = anchorRect.left + anchorRect.width / 2;
              const ay = anchorRect.top;

              const hx = cardPos.x + 120; // card center
              const hy = cardPos.y + 19;  // hole center

              // Compute realistic stretch tension
              const dyBase = Math.max(1, hy - ay);
              const restingDy = 1050;
              const stretchFactor = Math.max(1, dyBase / restingDy);

              // Fabric tightens around the neck, and the cord width stretches thin
              const neckSpread = Math.max(15, 40 / Math.pow(stretchFactor, 0.4));
              const stringWidth = Math.max(3, 10 / Math.pow(stretchFactor, 0.6));

              const lax = ax - neckSpread;
              const lay = ay - 10;
              const rax = ax + neckSpread;
              const ray = ay - 10;

              const clipX = hx;
              const clipY = hy - 28;

              // Left side calc
              const ldx = clipX - lax;
              const ldy = clipY - lay;
              const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
              const langle = Math.atan2(ldy, ldx) * 180 / Math.PI - 90;

              // Right side calc
              const rdx = clipX - rax;
              const rdy = clipY - ray;
              const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
              const rangle = Math.atan2(rdy, rdx) * 180 / Math.PI - 90;

              const transCurve = "0.65s cubic-bezier(0.34,1.56,0.64,1)";
              const transitionStyle = isDragging ? "none" : `height ${transCurve}, transform ${transCurve}, left ${transCurve}, top ${transCurve}, width ${transCurve}`;

              return (
                <>
                  {/* Left String */}
                  <div style={{
                    position: "fixed", left: lax - (stringWidth / 2), top: lay,
                    width: stringWidth, height: ldist,
                    background: "var(--lanyard-string)", borderRight: "2px solid var(--lanyard-string-border)",
                    borderLeft: "1px solid var(--lanyard-string-inner)",
                    transformOrigin: "top center", transform: `rotate(${langle}deg)`,
                    transition: transitionStyle,
                    zIndex: 10000, pointerEvents: "none",
                  }} />
                  {/* Right String */}
                  <div style={{
                    position: "fixed", left: rax - (stringWidth / 2), top: ray,
                    width: stringWidth, height: rdist,
                    background: "var(--lanyard-string)", borderLeft: "2px solid var(--lanyard-string-border)",
                    borderRight: "1px solid var(--lanyard-string-inner)",
                    transformOrigin: "top center", transform: `rotate(${rangle}deg)`,
                    transition: transitionStyle,
                    zIndex: 10000, pointerEvents: "none",
                  }} />

                  {/* Hardware clip */}
                  <div style={{
                    position: "fixed", left: clipX - 7, top: clipY,
                    width: 14, height: 28,
                    background: "linear-gradient(to bottom, #94a3b8, #475569)",
                    borderRadius: "3px 3px 8px 8px",
                    border: "1px solid #1e293b",
                    display: "flex", justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    transition: transitionStyle,
                    zIndex: 10000, pointerEvents: "none"
                  }}>
                    {/* Metal Hook */}
                    <div style={{ width: 6, height: 12, border: "2px solid #f1f5f9", borderRadius: 10, position: "absolute", bottom: -6 }} />
                  </div>
                </>
              );
            })()}

            {/* Placeholder keeps layout space when card is fixed */}
            {isFixed && <div style={{ width: 240, height: cardHeight, flexShrink: 0 }} />}

            {/* ID Card */}
            <div
              ref={cardRef}
              className={isFixed ? "" : "id-card-hang"}
              onMouseDown={e => {
                e.preventDefault();
                const rect = cardRef.current.getBoundingClientRect();
                setCardHeight(rect.height);
                setOriginPos({ x: rect.left, y: rect.top });
                setCardPos({ x: rect.left, y: rect.top });
                setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                setIsFixed(true);
                setIsDragging(true);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: 240,
                position: isFixed ? "fixed" : "relative",
                left: isFixed ? cardPos.x : "auto",
                top: isFixed ? cardPos.y : "auto",
                cursor: isDragging ? "grabbing" : "grab",
                transition: isDragging
                  ? "none"
                  : "left 0.65s cubic-bezier(0.34,1.56,0.64,1), top 0.65s cubic-bezier(0.34,1.56,0.64,1)",
                willChange: "left, top",
                zIndex: isFixed ? 9999 : 1,
              }}
            >
              <div
                ref={innerCardRef}
                style={{
                  width: "100%", height: "100%",
                  borderRadius: 16,
                  border: "1px solid var(--id-card-border)",
                  overflow: "hidden",
                  background: "linear-gradient(160deg, var(--id-card-bg-start), var(--id-card-bg-end))",
                  boxShadow: isDragging
                    ? "0 40px 90px var(--id-card-shadow-drag), 0 0 60px var(--id-card-shadow-drag-glow)"
                    : "0 24px 64px var(--id-card-shadow), 0 0 0 1px var(--id-card-shadow-glow)",
                  transition: isDragging ? "box-shadow 0.1s" : "box-shadow 0.4s ease",
                  transformOrigin: "50% 19px",
                  willChange: "transform"
                }}
              >
                {/* Clip hole at top */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px", background: "var(--clip-hole-bg)", borderBottom: "1px solid var(--clip-hole-border)" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid var(--clip-hole-inner-border)", background: "var(--clip-hole-inner)" }} />
                </div>

                {/* Photo */}
                <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 120, height: 140, borderRadius: 10, overflow: "hidden", border: "2px solid var(--id-card-shadow-glow)" }}>
                    <img
                      src={isDark !== isHovered ? profileImg : sleepImg}
                      alt="Wynbernard Deysolong"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                </div>

                {/* ID Info */}
                <div style={{ padding: "8px 16px 16px", textAlign: "center" }}>
                  <p className="syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-h)", marginBottom: 2 }}>Wynbernard D.</p>
                  <p className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 10 }}>Backend Developer</p>
                  <div style={{ height: 1, background: "var(--id-card-shadow-glow)", marginBottom: 10 }} />
                  <p className="mono" style={{ fontSize: 8, letterSpacing: "0.1em", color: "var(--text)" }}>Bago City College · 2022–present</p>
                </div>

                {/* Bottom stripe */}
                <div style={{ height: 6, background: "linear-gradient(90deg, #3b82f6, #7c3aed, #f472b6)" }} />
              </div>
            </div>
          </div>

          {/* status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--status-bg)", border: "1px solid var(--status-border)", borderRadius: 99, padding: "6px 16px", transition: "all 0.4s" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 6px #10b981", transition: "all 0.4s" }} />
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "#10b981", filter: "brightness(1.2)", transition: "color 0.4s" }}>Available for work</span>
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="fu1" style={{ flex: 1, minWidth: 300, maxWidth: 560 }}>
          <p className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(96,165,250,0.6)", marginBottom: 20 }}>Backend Developer · Philippines</p>

          <h1 className="syne hero-title" style={{ fontWeight: 850, marginBottom: 24, minHeight: "2.2em" }}>
            <span className="gtext" style={{ display: "block" }}>
              {typedFirst}
              {(typingPhase === "first" || typingPhase === "erase-first") && <span style={{ display: "inline-block", width: 3, height: "0.85em", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", borderRadius: 2, marginLeft: 2, verticalAlign: "middle", animation: "blink 0.75s step-end infinite" }} />}
            </span>
            <span style={{ color: "var(--text-h)", display: "block", minHeight: "1.2em" }}>
              {typedLast}
              {(typingPhase === "pause" || typingPhase === "erase-last") && <span style={{ display: "inline-block", width: 3, height: "0.85em", background: "linear-gradient(135deg,#60a5fa,#a78bfa)", borderRadius: 2, marginLeft: 2, verticalAlign: "middle", animation: "blink 0.75s step-end infinite" }} />}
            </span>
          </h1>

          <p className="fu2" style={{ color: "#64748b", fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
            A motivated software developer building web-based applications, information systems, and database-driven solutions — blending frontend craft with backend logic.
          </p>

          {/* <div className="fu3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <button className="btn-main" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div> */}

          <div className="fu3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="https://github.com/wynbernard" target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "10px 18px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/wynbernard-deysolong-051017405/" target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "10px 18px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              LinkedIn
            </a>
            {/* <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "10px 18px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a> */}
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
  );
};

export default Hero;
