"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    setReady(true);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        ${ready ? "transition-all duration-700 ease-out" : ""}
        ${
          !ready || visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }
        motion-reduce:transform-none
        motion-reduce:opacity-100
        ${className}
      `}
    >
      {children}
    </div>
  );
}