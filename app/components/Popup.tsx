"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./Arrow";

const STEPS = [
  { i: "01", h: "Set a window", p: "Open for 10 days or a month — you decide." },
  {
    i: "02",
    h: "We build the store",
    p: "Logo, mockups, sizes, colorways — your storefront, ready to share.",
  },
  {
    i: "03",
    h: "Collect & stitch",
    p: "Orders come in. We stitch in bulk at the window's close.",
  },
  {
    i: "04",
    h: "Hand off",
    p: "Bulk delivery, shipping, or on-site pickup — your call.",
  },
];

export default function Popup() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(
        root.querySelectorAll(".popup-grid > div:first-child > *"),
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        }
      );
      gsap.from(root.querySelectorAll(".popup-step"), {
        x: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.querySelector(".popup-side"),
          start: "top 80%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="s popup" id="how" ref={rootRef}>
      <div className="wrap">
        <div className="popup-grid">
          <div>
            <div
              className="mono"
              style={{ color: "rgba(255,255,255,.75)", marginBottom: 16 }}
            >
              Programs · Pop-Up Shops
            </div>
            <h2>
              Need a store for <em>your team?</em>
            </h2>
            <p>
              We set up a custom online storefront, collect orders over a set
              window, then fulfill everything in bulk. No inventory, no upfront
              cost, no one chasing size charts in a group text.
            </p>
            <div className="popup-actions">
              <a
                href="mailto:info@yazoothreads.com"
                className="btn btn-cream"
              >
                Ask about pop-up shops
                <Arrow />
              </a>
              <a href="tel:6013836128" className="btn btn-white-ghost">
                Call the shop
              </a>
            </div>
          </div>

          <aside className="popup-side">
            <div className="popup-steps">
              {STEPS.map((s) => (
                <div className="popup-step" key={s.i}>
                  <span className="idx">{s.i}</span>
                  <div>
                    <h4>{s.h}</h4>
                    <p>{s.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
