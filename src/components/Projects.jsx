import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { projects } from '../data/constants';

const Projects = () => {
  return (
    <section id="projects" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label"><div className="section-bar" /><span className="section-tag">Projects</span></div>

        <RevealOnScroll>
          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 40 }}>
            Project <span className="gtext">Experience</span>
          </h2>
        </RevealOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))", gap: 18 }}>
          {projects.map((p, index) => (
            <RevealOnScroll key={p.title} delay={index * 0.1} style={{ height: "100%" }}>
              <div className="card" style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
