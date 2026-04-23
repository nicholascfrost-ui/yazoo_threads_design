"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#how", label: "How It Works" },
  { href: "#work", label: "Gallery" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
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
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={link.href === "#home" ? "active" : ""}>
                  {link.label}
                </a>
              </li>
            ))}
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

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobileMenu}
          role="presentation"
        />
      )}
      <aside className={`mobile-sidebar${mobileOpen ? " open" : ""}`}>
        <div className="mobile-sidebar-header">
          <h2>Menu</h2>
          <button
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-sidebar-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-sidebar-footer">
          <a href="tel:6013836128" className="mobile-phone-link">
            (601) 383-6128
          </a>
        </div>
      </aside>
    </>
  );
}
