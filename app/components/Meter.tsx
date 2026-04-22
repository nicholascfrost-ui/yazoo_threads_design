"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Meter() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(".bar .fill").forEach((el) => {
        const w = Number(el.dataset.w ?? 0);
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: `${w}%`,
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.from(root.querySelectorAll(".meter-left > *"), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      gsap.from(root.querySelector(".meter-card"), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="s meter" ref={rootRef}>
      <div className="wrap">
        <div
          className="s-head"
          style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}
        >
          <div className="mark">
            <div className="num" style={{ color: "var(--tan-light)" }}>
              § 02 / 05
            </div>
          </div>
          <div />
        </div>

        <div className="meter-grid">
          <div className="meter-left">
            <div className="mono">The Digitizing Bench</div>
            <h2>
              Hours, not <em>days.</em>
            </h2>
            <p>
              Most shops quote in business days. We quote in working hours. The
              bench turns files fast — and because we digitize in-house, we
              never wait on a third party to fix a tight cap logo or an
              off-angle sleeve mark.
            </p>
          </div>

          <div className="meter-card">
            <div className="head">
              <span>
                <span className="dot" />
                Bench open · Real-time
              </span>
              <span>JXN/EMB · 04:22</span>
            </div>

            <div className="counter">
              <span data-counter data-count="4">
                0
              </span>
              <span>–</span>
              <span data-counter data-count="6">
                0
              </span>
              <span className="u">hr</span>
            </div>
            <div className="counter-l">
              Avg. digitizing turnaround · file in → DST out
            </div>

            <div className="meter-bars">
              <div className="bar">
                <span className="bl">Industry avg</span>
                <span className="track">
                  <span
                    className="fill"
                    data-w="92"
                    style={{ background: "rgba(255,255,255,.25)" }}
                  />
                </span>
                <span className="bv">2–3 days</span>
              </div>
              <div className="bar">
                <span className="bl">Yazoo bench</span>
                <span className="track">
                  <span className="fill tan" data-w="28" />
                </span>
                <span className="bv">4–6 hr</span>
              </div>
              <div className="bar">
                <span className="bl">Rush lane</span>
                <span className="track">
                  <span
                    className="fill"
                    data-w="14"
                    style={{ background: "var(--blue)" }}
                  />
                </span>
                <span className="bv">~90 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
