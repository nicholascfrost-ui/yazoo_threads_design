"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BRANDS = [
  "Adidas", "American Apparel", "Bella+Canvas", "Branded Bills",
  "Brooks Brothers", "Cap America", "Carhartt", "Champion",
  "Columbia", "Comfort Colors", "Core365", "Cornerstone",
  "Cotopaxi", "Dri-Duck", "Flexfit", "Gildan",
  "Huk", "Imperial", "Kati", "Legacy",
  "Liberty Bags", "Nautica", "Nike", "OGIO",
  "Otto Cap", "Outdoor Cap", "Paragon", "Port & Co",
  "Puma Golf", "Realtree", "Richardson", "Russell",
  "Sport-Tek", "Tasc", "Team365", "The Game",
  "The North Face", "Tommy Bahama", "TravisMatthew", "Under Armour",
  "ValuCap", "Vineyard Vines", "YP Classics", "Yupoong",
  "& others",
];

export default function Brands() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".s-head .num, .s-head h2, .s-head .kicker"), {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(root.querySelectorAll(".brand-item"), {
        y: 16, opacity: 0, duration: 0.6, stagger: 0.03, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".brands-grid"), start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="s" id="brands" ref={rootRef}>
      <div className="wrap">
        <div className="s-head">
          <div className="mark">
            <div className="num">§ 04 / 05</div>
          </div>
          <div>
            <h2>Brands we <em>carry.</em></h2>
            <p className="kicker">
              We source blanks from the industry&apos;s top wholesale suppliers —
              so you get the right garment and the right stitch in one order.
            </p>
          </div>
        </div>

        <div className="brands-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "2px",
          marginTop: "clamp(40px, 5vw, 64px)",
          borderTop: "1px solid var(--rule)",
        }}>
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="brand-item"
              style={{
                padding: "18px 20px",
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink)",
                borderBottom: "1px solid var(--rule)",
                borderRight: "1px solid var(--rule)",
              }}
            >
              {brand}
            </div>
          ))}
        </div>

        <p style={{
          marginTop: "clamp(28px, 3vw, 40px)",
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}>
          Brand availability subject to change · Contact us for current inventory
        </p>
      </div>
    </section>
  );
}
