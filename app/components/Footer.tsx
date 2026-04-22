"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelector(".wordmark"), {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      gsap.from(root.querySelectorAll(".foot-top > *"), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef}>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <h3>
              Yazoo{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--tan-light)",
                  fontFamily: "var(--serif)",
                }}
              >
                Threads.
              </em>
            </h3>
            <p>
              Commercial embroidery for businesses, schools, teams and
              organizations across Mississippi and beyond — built in Jackson.
            </p>
          </div>

          <div className="foot-col">
            <div className="foot-h">Navigate</div>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#how">How It Works</a>
              </li>
              <li>
                <a href="#work">Gallery</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#quote">Get a Quote</a>
              </li>
            </ul>
          </div>

          <div className="foot-col foot-contact">
            <div className="foot-h">Shop</div>
            <p>
              1445 Lelia Dr<br />
              Jackson, MS 39216
            </p>
            <p>
              <a href="tel:6013836128">(601) 383-6128</a>
            </p>
            <p>
              <a href="mailto:info@yazoothreads.com">info@yazoothreads.com</a>
            </p>
          </div>

          <div className="foot-col">
            <div className="foot-h">Elsewhere</div>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/yazoothreadsms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @yazoothreadsms
                </a>
              </li>
              <li>
                <a href="#quote">Send a file</a>
              </li>
              <li>
                <a href="#work">Sewout gallery</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wordmark">Yazoo Threads</div>

        <div className="foot-bottom">
          <span>© 2026 Yazoo Threads · All rights reserved</span>
          <span>Set in Newsreader &amp; DM Sans · Jackson, MS</span>
        </div>
      </div>
    </footer>
  );
}
