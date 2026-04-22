"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./Arrow";

type Entry = {
  wide?: boolean;
  img: string;
  alt: string;
  tag: string;
  no: string;
  h: React.ReactNode;
  p: string;
  foot: string;
};

const entries: Entry[] = [
  {
    wide: true,
    img: "/images/web/ja-hats.jpg",
    alt: "Jackson Academy hat run",
    tag: "Feature № 01",
    no: "Entry I · Headwear",
    h: (
      <>
        Hats &amp; <em>caps.</em>
      </>
    ),
    p: "Richardson, Yupoong, KATI, Outdoor Cap — trucker, rope front, structured, five-panel. Flat direct on structured crowns, 3D foam where it reads best.",
    foot: "RICH 112 · YP 6006 · KATI LC5M",
  },
  {
    img: "/images/web/jps-polos.jpg",
    alt: "Polos",
    tag: "Feature № 02",
    no: "Entry II · Apparel",
    h: (
      <>
        Polos &amp; <em>shirts.</em>
      </>
    ),
    p: "Staff uniforms, company polos, team layers. Left chest, sleeve, back yoke — or wherever your brand needs to live.",
    foot: "LC · Sleeve · Back",
  },
  {
    img: "/images/web/leather-bag.jpg",
    alt: "Leather tote",
    tag: "Feature № 03",
    no: "Entry III · Goods",
    h: (
      <>
        Bags &amp; <em>accessories.</em>
      </>
    ),
    p: "Totes, duffels, leather goods, aprons and promo. If it holds a needle, we can put your brand on it.",
    foot: "Leather · Canvas · Nylon",
  },
  {
    img: "/images/web/sevenoaks-shirt.jpg",
    alt: "Performance fleece",
    tag: "Feature № 04",
    no: "Entry IV · Outerwear",
    h: (
      <>
        Jackets &amp; <em>outerwear.</em>
      </>
    ),
    p: "Quarter-zips, vests, puffers and performance fleece — embroidered without skipping a stitch on tricky fabrics.",
    foot: "Q-Zip · Vest · Puffer",
  },
  {
    img: "/images/web/production.jpg",
    alt: "Teams production",
    tag: "Feature № 05",
    no: "Entry V · Schools & teams",
    h: (
      <>
        Schools &amp; <em>teams.</em>
      </>
    ),
    p: "Sports, spirit, band, clubs. We scale for programs of every size and turn around for game day.",
    foot: "Game-day turn",
  },
  {
    wide: true,
    img: "/images/web/beanies.jpg",
    alt: "Pop-up shop",
    tag: "Feature № 06",
    no: "Entry VI · Programs",
    h: (
      <>
        Pop-up <em>shops.</em>
      </>
    ),
    p: "We build a time-limited online store for your group, collect orders over a set window, then fulfill everything in bulk — zero inventory for you.",
    foot: "Custom storefront · Bulk fulfillment",
  },
];

export default function FieldGuide() {
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

      /* staggered card reveal */
      root.querySelectorAll<HTMLElement>(".gi").forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });

        /* clip-path wipe on the photo */
        const photo = card.querySelector<HTMLElement>(".gi-photo");
        const img = card.querySelector<HTMLElement>(".gi-photo img");
        if (photo && img) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: photo, start: "top 88%", once: true },
            }
          );
          /* counter-scale the image so it doesn't appear to move */
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: photo, start: "top 88%", once: true },
            }
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="s"
      id="services"
      style={{ paddingTop: "clamp(40px, 5vw, 80px)" }}
      ref={rootRef}
    >
      <div className="wrap">
        <div className="s-head">
          <div className="mark">
            <div className="num">§ 04 / 05</div>
          </div>
          <div>
            <h2>
              A field guide to
              <br />
              <em>everything embroidered.</em>
            </h2>
            <p className="kicker">
              From a single custom hat to a full fleet of branded workwear — one
              cap logo or two hundred polos, same bench, same eye.
            </p>
          </div>
        </div>

        <div className="guide-grid">
          {entries.map((e) => (
            <article key={e.tag} className={`gi${e.wide ? " wide" : ""}`}>
              <div className="gi-photo">
                <img src={e.img} alt={e.alt} />
                <span className="gi-tag">{e.tag}</span>
              </div>
              <div className="gi-body">
                <div className="gi-no">{e.no}</div>
                <h3>{e.h}</h3>
                <p>{e.p}</p>
                <div className="gi-foot">
                  <span>{e.foot}</span>
                  <a href="#services">
                    Read entry <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
