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
            <div className="num">§ 01 / 04</div>
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
            Formerly Yazoo Embroidery — for two decades, we served customers all
            over Mississippi and across the country. As of 2025, the business
            relocated to Jackson, MS and under new ownership continues to deliver
            the highest quality embroidery using state-of-the-art equipment.
          </p>

          <div className="drop-cols">
            <p>
              We specialize in commercial embroidery — custom solutions for
              businesses, schools, teams, events and organizations. Hats, shirts,
              jackets, bags, blankets, promotional products and more. Whatever
              your brand needs, we bring it to life with precision and care.
            </p>
            <p>
              Locally, we hand-deliver. Everywhere else, we box it up and ship it.
              When you call, you talk to someone standing next to a machine — not
              a ticket queue two states away.
            </p>
          </div>
        </div>

        <div className="specs">
          <div className="spec">
            <div className="label">Address</div>
            <div className="val">1445 Lelia <em>Dr · Jackson, MS</em></div>
          </div>
          <div className="spec">
            <div className="label">Phone</div>
            <div className="val"><a href="tel:6013836128">(601) 383-6128</a></div>
          </div>
          <div className="spec">
            <div className="label">Email</div>
            <div className="val"><a href="mailto:info@yazoothreads.com">info@yazoothreads.com</a></div>
          </div>
          <div className="spec">
            <div className="label">Instagram</div>
            <div className="val"><a href="https://www.instagram.com/yazoothreadsms" target="_blank" rel="noopener">@yazoothreadsms</a></div>
          </div>
          <div className="spec">
            <div className="label">Minimum</div>
            <div className="val">5 <em>pieces</em></div>
          </div>
        </div>
      </div>
    </section>
  );
}
