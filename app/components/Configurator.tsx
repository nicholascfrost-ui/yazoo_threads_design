"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./Arrow";

type Field = { label: string; value: string };

const ITEM_TYPES = ["Hats & caps", "Polos & shirts", "Jackets & outerwear", "Bags & accessories", "Aprons", "Other"];
const GARMENT_OPTIONS = ["Customer Supplied", "Yazoo Threads Wholesale"];
const PLACEMENTS = ["Chest", "Sleeve", "Back yoke", "Front + back", "Front hat", "Not sure yet"];
const TIMELINES = ["Standard · 7–10 days", "Priority · 3–5 days", "Rush · 48 hr", "Flexible"];

function SelectChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="chips">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`chip${value === o ? " on" : ""}`}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Configurator() {
  const rootRef = useRef<HTMLElement>(null);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    itemType: "",
    garments: "",
    qty: "",
    placement: "",
    timeline: "",
    notes: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<"idle"|"submitting"|"success"|"error">("idle");

  const set = (k: keyof typeof fields) => (v: string) =>
    setFields((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".s-head .num, .s-head h2, .s-head .kicker"), {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(root.querySelectorAll(".cfg-card, .result-card"), {
        y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".cfg-grid"), start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");

    const data = new FormData();
    data.append("name",      fields.name);
    data.append("email",     fields.email);
    data.append("phone",     fields.phone);
    data.append("org",       fields.org);
    data.append("itemType",  fields.itemType);
    data.append("garments",  fields.garments);
    data.append("qty",       fields.qty);
    data.append("placement", fields.placement);
    data.append("timeline",  fields.timeline);
    data.append("notes",     fields.notes);
    if (uploadedFile) data.append("file", uploadedFile);

    try {
      const res = await fetch("/api/send", { method: "POST", body: data });
      if (res.ok) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section className="s cfg" id="quote" ref={rootRef}>
      <div className="wrap cfg-inner">
        <div className="s-head">
          <div className="mark">
            <div className="num">§ 05 / 05</div>
          </div>
          <div>
            <h2>Start a <em>quote request.</em></h2>
            <p className="kicker">
              Tell us what you need — we&apos;ll get back to you with a
              turnaround and price within one business day.
            </p>
          </div>
        </div>

        <div className="cfg-grid">
          {/* form */}
          <div className="cfg-card">
            <span className="corner">Form YT-042</span>
            <div className="head">
              <div><div className="ticket">Quote Request · Open</div></div>
              <div><div className="ticket">info@yazoothreads.com</div></div>
            </div>
            <h3>Tell us what you need.</h3>

            <form onSubmit={handleSubmit} style={{ marginTop: 28 }}>

              {/* contact row 1 */}
              <div className="qf-row">
                <div className="qf-field">
                  <label className="qf-label">Your name *</label>
                  <input
                    className="qf-input"
                    required
                    value={fields.name}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </div>
                <div className="qf-field">
                  <label className="qf-label">Email *</label>
                  <input
                    className="qf-input"
                    type="email"
                    required
                    value={fields.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </div>
              </div>

              {/* contact row 2 */}
              <div className="qf-row">
                <div className="qf-field">
                  <label className="qf-label">Phone</label>
                  <input
                    className="qf-input"
                    type="tel"
                    value={fields.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                  />
                </div>
                <div className="qf-field">
                  <label className="qf-label">Organization / company</label>
                  <input
                    className="qf-input"
                    value={fields.org}
                    onChange={(e) => set("org")(e.target.value)}
                  />
                </div>
              </div>

              {/* item type */}
              <div className="field" style={{ marginTop: 4 }}>
                <div className="field-label"><span>Item type</span></div>
                <SelectChips options={ITEM_TYPES} value={fields.itemType} onChange={set("itemType")} />
              </div>

              {/* garments */}
              <div className="field">
                <div className="field-label"><span>Garments</span></div>
                <SelectChips options={GARMENT_OPTIONS} value={fields.garments} onChange={set("garments")} />
              </div>

              {/* quantity */}
              <div className="qf-row" style={{ marginBottom: 0 }}>
                <div className="qf-field">
                  <label className="qf-label">Quantity (approx.)</label>
                  <input
                    className="qf-input"
                    value={fields.qty}
                    onChange={(e) => set("qty")(e.target.value)}
                  />
                </div>
              </div>

              {/* placement */}
              <div className="field">
                <div className="field-label"><span>Placement</span></div>
                <SelectChips options={PLACEMENTS} value={fields.placement} onChange={set("placement")} />
              </div>

              {/* timeline */}
              <div className="field">
                <div className="field-label"><span>Timeline needed</span></div>
                <SelectChips options={TIMELINES} value={fields.timeline} onChange={set("timeline")} />
              </div>

              {/* file upload */}
              <div className="field">
                <div className="field-label"><span>Upload logo or artwork</span></div>
                <label className="qf-upload">
                  <span className="qf-upload-icon">↑</span>
                  <span className="qf-upload-text">
                    {uploadedFile
                      ? uploadedFile.name
                      : "Choose file"}
                  </span>
                  <span className="qf-upload-formats">AI · EPS · PDF · PNG · JPG</span>
                  <input
                    type="file"
                    accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg"
                    style={{ display: "none" }}
                    onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              {/* notes */}
              <div className="field" style={{ marginBottom: 0 }}>
                <div className="field-label"><span>Anything else we should know?</span></div>
                <textarea
                  className="qf-input qf-textarea"
                  rows={3}
                  value={fields.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                />
              </div>

              <div style={{ marginTop: 24 }}>
                {submitState === "success" ? (
                  <div style={{
                    padding: "18px 24px",
                    background: "rgba(72,128,144,0.12)",
                    border: "1px solid var(--blue)",
                    borderRadius: 4,
                    fontFamily: "var(--mono)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    color: "var(--blue)",
                    textAlign: "center",
                  }}>
                    Quote request sent — we&apos;ll be in touch within one business day.
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      disabled={submitState === "submitting"}
                    >
                      {submitState === "submitting" ? "Sending…" : "Send quote request"}
                      {submitState !== "submitting" && <Arrow />}
                    </button>
                    {submitState === "error" && (
                      <p style={{
                        marginTop: 10,
                        fontFamily: "var(--mono)",
                        fontSize: "0.72rem",
                        color: "#c0392b",
                        textAlign: "center",
                      }}>
                        Something went wrong — please email us directly at info@yazoothreads.com
                      </p>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>

          {/* info panel */}
          <div className="result-card">
            <div className="result-inner">
              <div className="result-head">
                <span>What happens next</span>
                <span>JXN/EMB</span>
              </div>

              <div className="result-title">
                We&apos;ll get back to you <em>fast.</em>
              </div>
              <div className="result-sub">Usually within one business day</div>

              <div className="summary" style={{ marginTop: 32 }}>
                <div className="summary-row">
                  <span className="k">Step 01</span>
                  <span className="v" style={{ fontSize: "1.05rem" }}>You send us the form</span>
                </div>
                <div className="summary-row">
                  <span className="k">Step 02</span>
                  <span className="v" style={{ fontSize: "1.05rem" }}>We review &amp; quote</span>
                </div>
                <div className="summary-row">
                  <span className="k">Step 03</span>
                  <span className="v" style={{ fontSize: "1.05rem" }}>Sewout proof before full run</span>
                </div>
                <div className="summary-row">
                  <span className="k">Step 04</span>
                  <span className="v" style={{ fontSize: "1.05rem" }}>Stitched &amp; delivered</span>
                </div>
              </div>

              <p className="note">
                Minimum order is 5 pieces. Rush orders available — just select
                the timeline above and we&apos;ll confirm availability.
              </p>

              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="tel:6013836128" className="btn btn-cream">
                  Call the shop — (601) 383-6128
                </a>
                <a href="mailto:info@yazoothreads.com" className="btn btn-white-ghost">
                  Email directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
