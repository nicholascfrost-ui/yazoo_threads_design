"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Arrow } from "./Arrow";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 8) el.classList.add("scrolled");
      else el.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" ref={navRef}>
      <div className="wrap nav-inner">
        <a href="#home" className="brand" aria-label="Yazoo Threads">
          <Image
            src="/logos/logo-nav.png"
            alt=""
            width={58}
            height={58}
            priority
          />
          <div className="brand-text">
            <span className="name">Yazoo Threads</span>
            <span className="sub">
              <svg
                className="cotton-mark"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="3" fill="#488090" />
                <circle cx="6" cy="7" r="2.5" fill="none" stroke="#488090" strokeWidth="1" />
                <circle cx="14" cy="7" r="2.5" fill="none" stroke="#488090" strokeWidth="1" />
                <circle cx="6" cy="13" r="2.5" fill="none" stroke="#488090" strokeWidth="1" />
                <circle cx="14" cy="13" r="2.5" fill="none" stroke="#488090" strokeWidth="1" />
              </svg>
              Est. Jackson, MS
            </span>
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#home" className="active">
              Home
            </a>
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
        </ul>
        <div className="nav-right">
          <a href="tel:6013836128" className="nav-phone">
            (601) 383-6128
          </a>
          <a href="#quote" className="btn btn-primary">
            Get a Quote
            <Arrow />
          </a>
        </div>
      </div>
    </nav>
  );
}
