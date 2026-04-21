import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: "28px 24px", borderTop: "1px solid var(--nav-border)", textAlign: "center" }}>
      <p className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        © 2025 Wynbernard Deysolong — Built with React & Tailwind
      </p>
    </footer>
  );
};

export default Footer;
