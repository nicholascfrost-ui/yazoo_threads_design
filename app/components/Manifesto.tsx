"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: root, start: "top 75%", once: true };
      gsap.from(root.querySelectorAll(".s-head .num, .s-head h2"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
      gsap.from(root.querySelectorAll(".drop .lead-para, .drop-cols p"), {
        y: 22,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { ...trigger, start: "top 70%" },
      });
      gsap.from(root.querySelectorAll(".specs .spec"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".specs"), start: "top 85%", once: true },
      });

      /* Animate the specs border lines from width 0 */
      const specsEl = root.querySelector<HTMLElement>(".specs");
      if (specsEl) {
        gsap.fromTo(
          specsEl,
          { "--line-scaleX": 0 },
          {
            "--line-scaleX": 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: specsEl, start: "top 85%", once: true },
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="s manifesto" id="about" ref={rootRef}>
      <div className="topo" />
      <div className="wrap manifesto-inner">
        <div className="s-head">
          <div className="mark">
            <div className="num">§ 01 / 05</div>
          </div>
          <div>
            <h2>
              We do one thing.
              <br />
              <em>We do it well.</em>
            </h2>
          </div>
        </div>

        <div className="drop">
          <p className="lead-para">
            Yazoo Threads is Jackson&apos;s commercial embroidery shop —{" "}
            <em>specialists, not generalists.</em> No screen printing, no heat
            transfer, no shortcuts. Just needle and thread on commercial Tajima
            machines, proofed once and run right.
          </p>

          <div className="drop-cols">
            <p>
              Most orders start with a file you already have — an AI, an EPS, a
              PDF, a PNG, even a screenshot. We digitize in-house, return a
              stitch file within a working window, then show you a sewout proof
              on the same fabric before a single full run goes on the frames.
            </p>
            <p>
              When the proof is right, we load the heads and go. Multi-head
              means six pieces move at once on the same color-way; it&apos;s the
              difference between a Tuesday quote and a Friday delivery.
            </p>
            <p>
              Locally, we hand-deliver. Everywhere else, we box it up and ship
              it. When you call, you talk to someone standing next to a machine
              — not a ticket queue two states away.
            </p>
          </div>
        </div>

        <div className="specs">
          <div className="spec">
            <div className="label">Address</div>
            <div className="val">
              1445 Lelia <em>Dr</em>
            </div>
          </div>
          <div className="spec">
            <div className="label">Coordinates</div>
            <div className="val">
              32.34°N <em>90.16°W</em>
            </div>
          </div>
          <div className="spec">
            <div className="label">Equipment</div>
            <div className="val">
              Tajima <em>multi-head</em>
            </div>
          </div>
          <div className="spec">
            <div className="label">Minimum</div>
            <div className="val">
              5 <em>pieces</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
