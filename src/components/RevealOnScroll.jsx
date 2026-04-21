import { useState, useEffect, useRef } from "react";

const RevealOnScroll = ({ children, className = "", style = {}, delay = 0, as: Component = "div", ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`${className} reveal ${isVisible ? "reveal-active" : ""}`.trim()}
      style={{ ...style, transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default RevealOnScroll;
