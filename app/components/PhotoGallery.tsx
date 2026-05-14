"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Photo = { src: string; alt: string; label: string; wide?: boolean };

const PHOTOS: Photo[] = [
  { src: "/images/web/ja-hats.jpg",        alt: "Jackson Academy hat run",          label: "Hats · Jackson Academy",    wide: true },
  { src: "/images/web/sevenoaks-trio.jpg",  alt: "Seven Oaks apparel trio",          label: "Apparel · Seven Oaks" },
  { src: "/images/web/rhc-green.jpg",       alt: "River Hills green hat",            label: "Headwear · River Hills" },
  { src: "/images/web/jps-polos.jpg",       alt: "JPS staff polos",                  label: "Polos · Staff Uniforms" },
  { src: "/images/web/leather-bag.jpg",     alt: "Embroidered leather tote",         label: "Bags & Accessories" },
  { src: "/images/web/beanies.jpg",         alt: "Knit beanie bulk run",             label: "Headwear · Bulk Run",       wide: true },
  { src: "/images/web/rhsc-navy.jpg",       alt: "RHSC navy hats",                   label: "Hats · RHSC" },
  { src: "/images/web/slews-hat.jpg",       alt: "Slews hat",                        label: "Headwear" },
  { src: "/images/web/rys-hat.jpg",         alt: "RYS hat",                          label: "Headwear" },
  { src: "/images/web/realsouth-hats.jpg",  alt: "Real South hats",                  label: "Hats · Real South",         wide: true },
  { src: "/images/web/emmys-hat.jpg",       alt: "Emmy's embroidered hat",           label: "Headwear" },
  { src: "/images/web/abneys-apron.jpg",    alt: "Abney's embroidered apron",        label: "Accessories · Apron" },
  { src: "/images/web/sevenoaks-shirt.jpg", alt: "Seven Oaks performance shirt",     label: "Apparel · Seven Oaks" },
  { src: "/images/web/production.jpg",      alt: "Teams production run",             label: "Schools & Teams" },
  { src: "/images/web/riverhills-navy.jpg", alt: "River Hills navy hat",             label: "Headwear · River Hills" },
  { src: "/images/web/detail-1.jpg",        alt: "Embroidery close-up detail",       label: "Detail · Stitchwork" },
  { src: "/images/web/detail-2.jpg",        alt: "Embroidery close-up detail",       label: "Detail · Stitchwork" },
  { src: "/images/web/detail-3.jpg",        alt: "Embroidery close-up detail",       label: "Detail · Stitchwork" },
  { src: "/images/web/machine-2.jpg",       alt: "Tajima multi-head machine",        label: "Studio · Jackson, MS",      wide: true },
];

export default function PhotoGallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".s-head .num, .s-head h2, .s-head .kicker"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });

      root.querySelectorAll<HTMLElement>(".pg-item").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });

        const photo = card.querySelector<HTMLElement>(".pg-photo");
        const img = card.querySelector<HTMLElement>(".pg-photo img");
        if (photo && img) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.0,
              ease: "power3.inOut",
              scrollTrigger: { trigger: photo, start: "top 92%", once: true },
            }
          );
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.0,
              ease: "power3.inOut",
              scrollTrigger: { trigger: photo, start: "top 92%", once: true },
            }
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="s" ref={rootRef} style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
      <div className="wrap">
        <div className="s-head">
          <div className="mark">
            <div className="num" style={{ color: "var(--blue-ink)" }}>Sewout Log</div>
          </div>
          <div>
            <h2>
              Work off<br />
              <em>the bench.</em>
            </h2>
            <p className="kicker">
              A running record of recent runs — hats, shirts, bags, aprons and
              everything in between. Jackson-made, stitch by stitch.
            </p>
          </div>
        </div>

        <div className="guide-grid">
          {PHOTOS.map((photo, i) => (
            <article
              key={photo.src}
              className={`gi pg-item${photo.wide ? " wide" : ""}`}
            >
              <div className="pg-photo gi-photo">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="gi-tag">{photo.label}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
