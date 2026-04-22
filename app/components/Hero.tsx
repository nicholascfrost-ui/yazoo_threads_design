"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Arrow } from "./Arrow";

function SplitWords({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <span className="word-inner" style={{ display: "inline-block" }}>
            {word}
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-top",          { opacity: 0, y: -14 });
      gsap.set(".hero-panel",        { opacity: 0, y: 24 });
      gsap.set(".word-inner",        { y: "105%" });
      gsap.set(".hero-panel .lede",  { opacity: 0, y: 18 });
      gsap.set(".hero-actions",      { opacity: 0, y: 14 });
      gsap.set(".hero-side",         { opacity: 0, x: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
      tl.to(".hero-top",            { y: 0, opacity: 1, duration: 0.8 });
      tl.to(".hero-panel",          { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");
      tl.to(".word-inner",          { y: "0%", duration: 0.75, stagger: 0.05, ease: "power3.out" }, "-=0.6");
      tl.to(".hero-panel .lede",    { y: 0, opacity: 1, duration: 0.75 }, "-=0.3");
      tl.to(".hero-actions",        { y: 0, opacity: 1, duration: 0.65 }, "-=0.45");
      tl.to(".hero-side",           { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.85");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero"
      id="home"
      ref={sectionRef}
      style={{ backgroundImage: "url('/images/web/machine-1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg,rgba(23,24,28,.15) 0%,rgba(23,24,28,0) 30%,rgba(23,24,28,0) 60%,rgba(23,24,28,.25) 100%), linear-gradient(100deg,rgba(23,24,28,.38) 0%,rgba(23,24,28,0) 55%)",
        pointerEvents: "none",
      }} />

      <div className="wrap hero-wrap">
        <div className="hero-top">
          <div className="mono">Vol. XII — Commercial Embroidery / Jackson, Mississippi</div>
          <div className="hero-ticker">
            <span className="pulse" />
            <span>Machines running · Studio open today</span>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-panel">
            <div className="mono">№ 01 / The Field Guide</div>
            <h1>
              <SplitWords>Your brand,</SplitWords>
              <br />
              <em><SplitWords>stitched to last.</SplitWords></em>
            </h1>
            <p className="lede">
              Commercial embroidery for businesses, schools, teams and
              organizations — made on Tajima multi-head machines by people who
              answer the phone.
            </p>
            <div className="hero-actions">
              <a href="#quote" className="btn btn-primary">
                Start a Quote <Arrow />
              </a>
              <a href="#how" className="btn btn-ghost">How It Works</a>
            </div>
          </div>

          <aside className="hero-side">
            <div className="hero-side-h">
              <span>Now on the Frames</span>
              <span>Live</span>
            </div>
            <div className="hero-side-title">On the Tajimas</div>
            <div className="mono-sm" style={{ color: "rgba(255,255,255,.7)" }}>
              Six-head run · Production floor · Jackson, MS
            </div>
            <div className="hero-side-meta">
              <span>Multi-head Tajima</span>
              <span>Commercial grade</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
