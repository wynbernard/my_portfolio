import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: "100px 24px", background: "var(--section-bg-subtle)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="section-label"><div className="section-bar" /><span className="section-tag">Contact</span></div>

        <RevealOnScroll>
          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 10 }}>
            Let's <span className="gtext">Connect</span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 40 }}>Open to opportunities, collaborations, and new projects.</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <div className="two-col" style={{ gap: 14 }}>
            <input className="field" placeholder="Your name" />
            <input className="field" type="email" placeholder="Your email" />
          </div>
          <input className="field" placeholder="Subject" />
          <textarea className="field" placeholder="Your message..." rows={5} style={{ resize: "none" }} />
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <button className="btn-main" style={{ width: "100%" }}>Send Message</button>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
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
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;
