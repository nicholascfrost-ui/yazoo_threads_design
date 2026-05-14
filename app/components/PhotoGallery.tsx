"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Photo = { src: string; alt: string; wide?: boolean };

// Each row must total exactly 12 cols (wide=8, regular=4).
// Rows: [w+r]=12, [r+w]=12, [r+r+r]=12. Never [r+r+w] — that pushes wide to next row with a gap.
const PHOTOS: Photo[] = [
  // Row 1 — 8+4=12
  { src: "/images/web/ja-hats.jpg",        alt: "Jackson Academy hat run",          wide: true },
  { src: "/images/web/IMG_9076.jpeg",       alt: "Hats on the bench" },
  // Row 2 — 4+4+4=12
  { src: "/images/web/sevenoaks-trio.jpg",  alt: "Seven Oaks apparel trio" },
  { src: "/images/web/IMG_8836.jpeg",       alt: "Polos and shirts" },
  { src: "/images/web/rhc-green.jpg",       alt: "River Hills green hat" },
  // Row 3 — 4+8=12
  { src: "/images/web/jps-polos.jpg",       alt: "JPS staff polos" },
  { src: "/images/web/beanies.jpg",         alt: "Knit beanie bulk run",             wide: true },
  // Row 4 — 4+4+4=12
  { src: "/images/web/leather-bag.jpg",     alt: "Embroidered leather tote" },
  { src: "/images/web/IMG_0364.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_0563.jpeg",       alt: "Embroidery work" },
  // Row 5 — 4+4+4=12
  { src: "/images/web/rhsc-navy.jpg",       alt: "RHSC navy hats" },
  { src: "/images/web/slews-hat.jpg",       alt: "Slews hat" },
  { src: "/images/web/rys-hat.jpg",         alt: "RYS hat" },
  // Row 6 — 8+4=12
  { src: "/images/web/realsouth-hats.jpg",  alt: "Real South hats",                  wide: true },
  { src: "/images/web/IMG_0568.jpeg",       alt: "Embroidery work" },
  // Row 7 — 4+4+4=12
  { src: "/images/web/IMG_0583.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/emmys-hat.jpg",       alt: "Emmy's embroidered hat" },
  { src: "/images/web/abneys-apron.jpg",    alt: "Abney's embroidered apron" },
  // Row 8 — 4+8=12
  { src: "/images/web/IMG_0765.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_0802.jpeg",       alt: "Embroidery work",                  wide: true },
  // Row 9 — 4+4+4=12
  { src: "/images/web/sevenoaks-shirt.jpg", alt: "Seven Oaks performance shirt" },
  { src: "/images/web/IMG_0806.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/production.jpg",      alt: "Teams production run" },
  // Row 10 — 4+4+4=12
  { src: "/images/web/riverhills-navy.jpg", alt: "River Hills navy hat" },
  { src: "/images/web/IMG_0843.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_8380.jpeg",       alt: "Embroidery work" },
  // Row 11 — 4+8=12
  { src: "/images/web/IMG_8830.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_9554.jpeg",       alt: "Embroidery work",                  wide: true },
  // Row 12 — 4+4+4=12
  { src: "/images/web/IMG_9371.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_9974.jpeg",       alt: "Embroidery work" },
  { src: "/images/web/IMG_9983.jpeg",       alt: "Embroidery work" },
  // Row 13 — 4+8=12
  { src: "/images/web/detail-1.jpg",        alt: "Embroidery close-up detail" },
  { src: "/images/web/machine-2.jpg",       alt: "Tajima multi-head machine",        wide: true },
];

export default function PhotoGallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelector(".gallery-heading"), {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });

      root.querySelectorAll<HTMLElement>(".pg-item").forEach((card) => {
        const img = card.querySelector<HTMLElement>("img");
        if (!img) return;
        gsap.fromTo(
          card,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.0,
            ease: "power3.inOut",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.0,
            ease: "power3.inOut",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="s"
      ref={rootRef}
      style={{ paddingTop: "clamp(32px, 4vw, 56px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}
    >
      <div className="wrap">
        <h2
          className="gallery-heading"
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(4rem, 10vw, 8rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(28px, 4vw, 52px)",
            color: "var(--ink)",
          }}
        >
          Gallery
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 12,
          }}
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="pg-item"
              style={{
                gridColumn: photo.wide ? "span 8" : "span 4",
                position: "relative",
                overflow: "hidden",
                background: "var(--ink)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: photo.wide ? "16 / 9" : "4 / 3",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
