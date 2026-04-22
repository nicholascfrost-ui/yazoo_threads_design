"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Spread() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      /* Clip-path curtain reveal on the image */
      const photo = root.querySelector<HTMLElement>(".spread-img");
      const img = root.querySelector<HTMLElement>(".spread-img img");
      if (photo && img) {
        gsap.fromTo(
          photo,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: photo, start: "top 82%", once: true },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: photo, start: "top 82%", once: true },
          }
        );
      }

      gsap.from(
        root.querySelectorAll(
          ".spread-grid > div:last-child > .mono, .pull, .attribution"
        ),
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        }
      );
      gsap.from(root.querySelectorAll(".spread-grid .specs .spec"), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.querySelector(".spread-grid .specs"),
          start: "top 85%",
          once: true,
        },
      });

      /* Subtle parallax on image */
      gsap.to(img, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="s spread" id="work" ref={rootRef}>
      <div className="wrap">
        <div className="spread-grid">
          <div className="spread-img">
            <img
              src="/images/web/riverhills-dof.jpg"
              alt="River Hills Open hats"
            />
            <div className="stamp">Proof № 2604-A · Stitched in JXN</div>
          </div>
          <div>
            <div
              className="mono"
              style={{ color: "var(--blue-ink)", marginBottom: 18 }}
            >
              From a Client File
            </div>
            <p className="pull">
              Sent a screenshot on a Monday, had a sewout on Wednesday, wore{" "}
              <em>the hats on Saturday.</em> That&apos;s it. That&apos;s the
              story.
            </p>
            <div className="attribution">Tournament org · River Hills Open</div>

            <div
              className="specs"
              style={{ marginTop: 44, borderBottom: 0, paddingBottom: 0 }}
            >
              <div className="spec">
                <div className="label">File in</div>
                <div className="val">
                  Mon <em>9:12a</em>
                </div>
              </div>
              <div className="spec">
                <div className="label">Sewout</div>
                <div className="val">
                  Wed <em>2:40p</em>
                </div>
              </div>
              <div className="spec">
                <div className="label">Delivery</div>
                <div className="val">
                  Fri <em>by 4p</em>
                </div>
              </div>
              <div className="spec">
                <div className="label">Run</div>
                <div className="val">
                  128 <em>pcs</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
