"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  "/images/web/beanies.jpg",
  "/images/web/slews-hat.jpg",
  "/images/web/riverhills-navy.jpg",
  "/images/web/rys-hat.jpg",
  "/images/web/leather-bag.jpg",
  "/images/web/emmys-hat.jpg",
  "/images/web/realsouth-hats.jpg",
  "/images/web/rhsc-navy.jpg",
  "/images/web/jps-polos.jpg",
  "/images/web/ja-hats.jpg",
  "/images/web/sevenoaks-shirt.jpg",
  "/images/web/abneys-apron.jpg",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".s-head .num, .s-head h2"), {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      gsap.from(root.querySelectorAll(".marquee-item"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.querySelector(".marquee-outer"),
          start: "top 90%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="marquee-sec" ref={rootRef}>
      <div className="wrap">
        <div className="s-head" style={{ marginBottom: 8 }}>
          <div className="mark">
            <div className="num">§ 03 / 05</div>
          </div>
          <div>
            <h2>A ledger of <em>recent stitches.</em></h2>
          </div>
        </div>
      </div>

      <div className="marquee-outer" aria-label="Recent work">
        <div className="marquee-track">
          {doubled.map((src, i) => (
            <div
              className="marquee-item"
              key={`${src}-${i}`}
              aria-hidden={i >= items.length ? "true" : undefined}
            >
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
