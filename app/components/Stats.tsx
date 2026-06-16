"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const counters = root.querySelectorAll<HTMLElement>("[data-counter]");
      counters.forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="strip" ref={rootRef}>
      <div className="wrap strip-inner" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", maxWidth: 840, margin: "0 auto" }}>
        <div className="stat">
          <span className="n">
            <span data-counter data-count="5">
              0
            </span>
            <span className="u">+ pc</span>
          </span>
          <span className="l">Order Minimum</span>
        </div>
        <div className="stat">
          <span className="n" style={{ fontFamily: "var(--serif-display)" }}>
            Any
            <span className="u" style={{ marginLeft: "6px" }}>
              file
            </span>
          </span>
          <span className="l">Format Accepted</span>
        </div>
        <div className="stat">
          <span className="n">
            <span data-counter data-count="29">
              0
            </span>
            <span className="u">heads</span>
          </span>
          <span className="l">Tajima Commercial</span>
        </div>
      </div>
    </section>
  );
}
