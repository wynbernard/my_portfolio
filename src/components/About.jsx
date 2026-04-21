import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { achievements } from '../data/constants';

const About = () => {
  return (
    <section id="about" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label"><div className="section-bar" /><span className="section-tag">About</span></div>

        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <RevealOnScroll>
              <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: "var(--container-text)" }}>
                Crafting digital<br /><span className="gtext">experiences</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
                I'm a detail-oriented software developer from Bago City, Philippines, currently pursuing my Bachelor of Science in Information System at Bago City College (2022–present).
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 36, fontSize: 15 }}>
                With hands-on experience in both frontend and backend development, I've contributed to award-winning hackathon projects, capstone systems, and OJT platforms. I'm highly adaptable, a fast learner, and committed to continuous improvement and delivering user-centered solutions.
              </p>
            </RevealOnScroll>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { label: "Location", value: "Bago City, Philippines" },
                { label: "Email", value: "wynber11@gmail.com" },
                { label: "Contact", value: "09630539038" },
                { label: "Education", value: "BSIS · Bago City College" },
              ].map((item, index) => (
                <RevealOnScroll key={item.label} delay={0.3 + index * 0.1} style={{ height: '100%' }}>
                  <div className="card" style={{ padding: "14px 16px", height: '100%' }}>
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 5 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: "var(--container-text)", fontWeight: 500 }}>{item.value}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <div>
            <RevealOnScroll>
              <p className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--container-text)", marginBottom: 20 }}>Key Achievements</p>
            </RevealOnScroll>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {achievements.map((a, index) => (
                <RevealOnScroll key={a.title} delay={0.1 + index * 0.1}>
                  <div className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 22 }}>{a.icon}</span>
                    <div>
                      <p style={{ fontSize: 14, color: "var(--container-text)", fontWeight: 500 }}>{a.title}</p>
                      <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{a.year}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
