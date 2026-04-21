import React, { useState, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { skills } from '../data/constants';

const Skills = () => {
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    setAnimatedBars(false);
    const t = setTimeout(() => setAnimatedBars(true), 100);
    return () => clearTimeout(t);
  }, [activeSkillTab]);

  return (
    <section id="skills" style={{ padding: "100px 24px", background: "var(--section-bg-subtle)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label"><div className="section-bar" /><span className="section-tag">Skills</span></div>

        <RevealOnScroll>
          <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, color: "var(--container-text)", marginBottom: 36 }}>
            Area of <span className="gtext">Expertise</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
            {Object.keys(skills).map(tab => (
              <button key={tab} className={`tab-btn ${activeSkillTab === tab ? "active" : ""}`} onClick={() => setActiveSkillTab(tab)}>{tab}</button>
            ))}
          </div>
        </RevealOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {skills[activeSkillTab].map((skill, index) => (
            <RevealOnScroll key={skill.name} delay={index * 0.05} style={{ height: "100%" }}>
              <div className="card" style={{ padding: "18px 20px", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "var(--container-text)" }}>{skill.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: animatedBars ? `${skill.level}%` : "0%" }} />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
