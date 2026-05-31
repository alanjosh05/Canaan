"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Anchor, Globe, Ship, Package } from "lucide-react";

const COMPANIES = [
  {
    name: "Canaan Global Logistics",
    abbr: "CGL",
    category: "Freight",
    Icon: Anchor,
    tagline: "Where cargo, oceans, and infrastructure move in synchronized rhythm.",
    role: "The operational backbone of the network.",
    body: "From freight movement to cargo coordination, CGL orchestrates the complex mechanics behind global transportation — whether cargo moves by land, sea, or through interconnected transit systems.",
    ops: ["Freight Forwarding", "Multimodal Transportation", "Vessel Operations", "NVOCC Services", "Cargo Consolidation"],
    abstract: "Where cargo movement becomes synchronized precision.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=85",
    accent: "#85660c",
  },
  {
    name: "Canaan Global Shipping Services",
    abbr: "CGSS",
    category: "Trade",
    Icon: Globe,
    tagline: "Behind every successful shipment lies precision invisible to the eye.",
    role: "The regulatory and clearance arm.",
    body: "CGSS operates at the intersection of compliance and movement — managing customs procedures, import/export clearances, and documentation flow required to keep cargo crossing borders without friction.",
    ops: ["Customs Brokerage", "Import Handling", "Export Processing", "Trade Documentation", "Port Clearance Coordination"],
    abstract: "Navigating borders before cargo even reaches them.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1400&q=85",
    accent: "#85660c",
  },
  {
    name: "Canaan Global International",
    abbr: "CGI",
    category: "Sea Freight",
    Icon: Ship,
    tagline: "The operational nerve center connecting commerce, coordination, and execution.",
    role: "The commercial intelligence layer.",
    body: "CGI manages the financial, nomination, and coordination infrastructure supporting the wider Canaan network — connecting operational execution with administrative control.",
    ops: ["Nominations & Coordination", "Billing Infrastructure", "Invoice Processing", "Transport Commercial Management", "Internal Operational Integration"],
    abstract: "Connecting operations with commercial flow.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    accent: "#85660c",
  },
  {
    name: "Rehoboth Transports",
    abbr: "RT",
    category: "Port Services",
    Icon: Package,
    tagline: "The final momentum behind the supply chain.",
    role: "The ground-movement engine.",
    body: "Rehoboth handles transport execution for both internal logistics operations and external clients — designed for flexibility across raw material movement, customer logistics support, and multi-channel coordination.",
    ops: ["Cargo Transportation", "Fleet Coordination", "External Logistics Support", "Raw Material Movement", "Integrated Transport Handling"],
    abstract: "Keeping industries moving beyond the port.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    accent: "#85660c",
  },
];

/* ─────────────────────────── STYLES ─────────────────────────── */
const CSS = `
  
  :root {
    --gold: #85660c;
    --gold-light: rgba(200,168,75,0.18);
    --gold-subtle: rgba(200,168,75,0.08);
    --ink: #0a0908;
    --ink-60: rgba(10,9,8,0.60);
    --ink-35: rgba(10,9,8,0.35);
    --ink-15: rgba(10,9,8,0.15);
    --paper: #f5f4f0;
    --paper-dark: #eceae3;
    --white: #ffffff;
  }

  .gs-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .gs-wrap { font-family: "Open Sans", sans-serif; background: var(--paper); }

  /* ── SECTION HEADER ── */
  .gs-header {
    padding: 64px 24px 40px;
    text-align: center;
  }
  .gs-header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  
    font-family: "Oswald", sans-serif;}
  .gs-header-eyebrow::before,
  .gs-header-eyebrow::after {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }
  .gs-header-title {
    font-family: "Montserrat", sans-serif;
    font-size: clamp(2.2rem, 7vw, 3.6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--ink);
  }
  .gs-header-title em {
    font-style: italic;
    color: var(--gold);
  }
  .gs-header-sub {
    margin-top: 14px;
    font-size: 0.875rem;
    color: var(--ink-35);
    max-width: 380px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
  }

  /* ─────────── MOBILE CARDS ─────────── */
  .gs-mobile { display: block; }
  .gs-desktop { display: none; }

  @media (min-width: 1024px) {
    .gs-mobile { display: none; }
    .gs-desktop { display: block; }
    .gs-header { padding: 80px 88px 56px; text-align: left; }
    .gs-header-eyebrow { justify-content: flex-start; 
    font-family: "Oswald", sans-serif;}
  }

  /* Nav tabs */
  .gs-tabs {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    gap: 6px;
    padding: 0 24px 24px;
    -webkit-overflow-scrolling: touch;
  }
  .gs-tabs::-webkit-scrollbar { display: none; }
  .gs-tab {
    flex-shrink: 0;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1.5px solid var(--ink-15);
    background: transparent;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-60);
    cursor: pointer;
    transition: all 0.28s ease;
    white-space: nowrap;
  }
  .gs-tab.active {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--white);
  }

  /* Mobile card */
  .gs-mobile-card {
    margin: 0 16px 32px;
    border-radius: 20px;
    overflow: hidden;
    background: var(--white);
    box-shadow: 0 2px 12px rgba(10,9,8,0.07), 0 1px 2px rgba(10,9,8,0.04);
  }
  .gs-card-img-wrap {
    position: relative;
    height: 220px;
    overflow: hidden;
  }
  .gs-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  .gs-card-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,9,8,0.0) 0%,
      rgba(10,9,8,0.62) 100%
    );
  }
  .gs-card-img-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px;
    border-radius: 100px;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.22);
  }
  .gs-card-img-badge span {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.9);
    text-transform: uppercase;
  }
  .gs-card-abbr-overlay {
    position: absolute;
    bottom: 12px;
    right: 18px;
    font-family: "Montserrat", sans-serif;
    font-size: 4.5rem;
    font-weight: 700;
    color: rgba(255,255,255,0.1);
    line-height: 1;
    letter-spacing: -0.05em;
    pointer-events: none;
  }
  .gs-card-body {
    padding: 22px 22px 24px;
  }
  .gs-card-name {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--ink);
    line-height: 1.1;
    margin-bottom: 4px;
  }
  .gs-card-role {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
  
    font-family: "Oswald", sans-serif;}
  .gs-card-divider {
    height: 1px;
    background: var(--ink-15);
    margin-bottom: 14px;
  }
  .gs-card-desc {
    font-size: 0.82rem;
    color: var(--ink-60);
    line-height: 1.75;
    margin-bottom: 18px;
  }
  .gs-card-ops-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-35);
    margin-bottom: 10px;
  }
  .gs-card-ops-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 18px;
  }
  .gs-card-op-chip {
    padding: 5px 11px;
    border-radius: 100px;
    background: var(--gold-subtle);
    border: 1px solid rgba(200,168,75,0.2);
    font-size: 11px;
    font-weight: 500;
    color: rgba(10,9,8,0.65);
    white-space: nowrap;
  }
  .gs-card-quote {
    border-left: 2px solid var(--gold);
    padding: 10px 0 10px 14px;
  }
  .gs-card-quote p {
    font-family: "Montserrat", sans-serif;
    font-size: 0.95rem;
    font-style: italic;
    color: var(--gold);
    line-height: 1.55;
    letter-spacing: 0.01em;
  }
  .gs-mobile-count {
    text-align: center;
    padding: 0 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .gs-mobile-dot {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: var(--ink-15);
    transition: width 0.4s cubic-bezier(0.34,1.2,0.64,1), background 0.3s ease;
  }
  .gs-mobile-dot.active {
    width: 20px;
    background: var(--gold);
  }

  /* ─────────── DESKTOP STICKY SCROLL ─────────── */
  .gs-sticky-outer {
    position: relative;
  }
  .gs-sticky-inner {
    position: sticky;
    top: 0;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  /* Left panel */
  .gs-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(40px, 6vw, 88px);
    padding-top: 0;
    padding-bottom: 0;
    background: var(--paper);
    z-index: 2;
  }
  .gs-left-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: clamp(24px, 4vh, 40px);
    left: clamp(40px, 6vw, 88px);
    right: 32px;
  }
  .gs-nav-dots {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .gs-nav-dot {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px 6px 7px;
    border-radius: 100px;
    border: 1.5px solid transparent;
    transition: all 0.3s ease;
    background: transparent;
  }
  .gs-nav-dot.active {
    border-color: var(--gold);
    background: var(--gold-light);
  }
  .gs-nav-dot-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ink-15);
    transition: background 0.3s ease;
  }
  .gs-nav-dot.active .gs-nav-dot-circle {
    background: var(--gold);
  }
  .gs-nav-dot-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--ink-35);
    transition: color 0.3s ease;
  
    font-family: "Oswald", sans-serif;}
  .gs-nav-dot.active .gs-nav-dot-label {
    color: var(--gold);
  
    font-family: "Oswald", sans-serif;}
  .gs-counter-display {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--ink-35);
    letter-spacing: 0.04em;
  }
  .gs-counter-display strong {
    font-size: 1.4rem;
    color: var(--ink);
    font-weight: 700;
  }

  /* Left content animations */
  @keyframes dsUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dsLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .ds-animate { animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }

  .gs-category-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 100px;
    background: var(--gold-subtle);
    border: 1px solid rgba(200,168,75,0.25);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
    width: fit-content;
    animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s both;
  
    font-family: "Oswald", sans-serif;}
  .gs-main-name {
    font-family: "Montserrat", sans-serif;
    font-size: clamp(2rem, 3.4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--ink);
    margin-bottom: 6px;
    animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }
  .gs-role-line {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-35);
    margin-bottom: 20px;
    animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.14s both;
  
    font-family: "Oswald", sans-serif;}
  .gs-gold-rule {
    height: 2px;
    width: 52px;
    background: linear-gradient(to right, var(--gold), rgba(200,168,75,0.2));
    border-radius: 2px;
    margin-bottom: 18px;
    transform-origin: left center;
    animation: dsLine 0.55s cubic-bezier(0.22,1,0.36,1) 0.18s both;
  }
  .gs-body-text {
    font-size: 0.875rem;
    color: var(--ink-60);
    line-height: 1.8;
    margin-bottom: 22px;
    max-width: 440px;
    animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  .gs-ops-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-35);
    margin-bottom: 12px;
  
    font-family: "Oswald", sans-serif;}
  .gs-ops-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 22px;
  }
  .gs-ops-list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    animation: dsUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }
  .gs-ops-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(200,168,75,0.7);
    flex-shrink: 0;
  }
  .gs-ops-name {
    font-size: 0.83rem;
    color: var(--ink-60);
    font-weight: 500;
  }
  .gs-quote-block {
    border-left: 2px solid rgba(200,168,75,0.5);
    padding: 10px 0 10px 16px;
    animation: dsUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.55s both;
  }
  .gs-quote-block p {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--gold);
    line-height: 1.6;
    letter-spacing: 0.005em;
  }

  /* Right panel — image */
  .gs-right {
    position: relative;
    overflow: hidden;
  }
  .gs-right-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: opacity 1.1s cubic-bezier(0.4,0,0.2,1);
  }
  .gs-right-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(245,244,240,0.35) 0%,
      rgba(245,244,240,0) 60%
    );
    z-index: 1;
  }
  .gs-right-ghost {
    position: absolute;
    bottom: 5%;
    right: 4%;
    font-family: "Montserrat", sans-serif;
    font-size: clamp(6rem, 14vw, 12rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 1;
    color: rgba(255,255,255,0.09);
    z-index: 2;
    pointer-events: none;
    user-select: none;
    transition: opacity 0.7s ease;
  }
  .gs-right-category-badge {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 3;
    padding: 8px 16px;
    border-radius: 100px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    transition: opacity 0.6s ease;
  
    font-family: "Oswald", sans-serif;}

  /* Progress bar */
  .gs-progress-track {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--ink-15);
    z-index: 10;
  }
  .gs-progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--gold), rgba(200,168,75,0.5));
    border-radius: 0 2px 2px 0;
    transition: width 0.05s linear;
  }
`;

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function GroupSection() {
  const sectionRef = useRef(null);
  const progressFillRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);

  /* Detect viewport */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Desktop scroll */
  useEffect(() => {
    if (!isDesktop) return;
    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrolled = -rect.top;
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;
        const prog = Math.max(0, Math.min(1, scrolled / scrollable));
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${prog * 100}%`;
        }
        const newIdx = Math.min(COMPANIES.length - 1, Math.round(prog * (COMPANIES.length - 1)));
        if (newIdx !== activeIdxRef.current) {
          activeIdxRef.current = newIdx;
          setActiveIdx(newIdx);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  const co = COMPANIES[activeIdx];

  return (
    <div className="gs-wrap">
      <style>{CSS}</style>

      {/* ── SECTION HEADER ── */}
<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem", padding: "4rem 5.5rem" }}>
  <img src="/ship.png" alt="Ship" width={170} style={{ flexShrink: 0 }} />
  <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
    <h2 className="gs-header-title">
      Four pillars of<br /><em>global movement</em>
    </h2>
    <p className="gs-header-sub" style={{ marginLeft: 0, marginRight: 0, textAlign: "left" }}>
      Each company plays a distinct role in an integrated logistics ecosystem built for precision at every layer.
    </p>
  </div>
</div>

      {/* ══════════ MOBILE ══════════ */}
      <div className="gs-mobile">
        {/* Tab navigation */}
        <div className="gs-tabs">
          {COMPANIES.map((c, i) => (
            <button
              key={i}
              className={`gs-tab${i === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              {c.abbr}
            </button>
          ))}
        </div>

        {/* Single active card */}
        {COMPANIES.map((c, i) => {
          if (i !== activeIdx) return null;
          const Icon = c.Icon;
          return (
            <div key={i} className="gs-mobile-card">
              {/* Image */}
              <div className="gs-card-img-wrap">
                <img src={c.image} alt={c.name} />
                <div className="gs-card-img-overlay" />
                <div className="gs-card-img-badge">
                  <Icon size={13} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                  <span>{c.category}</span>
                </div>
                <div className="gs-card-abbr-overlay">{c.abbr}</div>
              </div>

              {/* Body */}
              <div className="gs-card-body">
                <h3 className="gs-card-name">{c.name}</h3>
                <p className="gs-card-role">{c.role}</p>
                <div className="gs-card-divider" />
                <p className="gs-card-desc">{c.body}</p>

                <p className="gs-card-ops-label">Core Operations</p>
                <div className="gs-card-ops-grid">
                  {c.ops.map((op) => (
                    <span key={op} className="gs-card-op-chip">{op}</span>
                  ))}
                </div>

                <div className="gs-card-quote">
                  <p>"{c.abstract}"</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Dot progress */}
        <div className="gs-mobile-count">
          {COMPANIES.map((_, i) => (
            <div
              key={i}
              className={`gs-mobile-dot${i === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(i)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      {/* ══════════ DESKTOP STICKY SCROLL ══════════ */}
      <div
        className="gs-desktop"
        ref={sectionRef}
        style={{ height: `${COMPANIES.length * 100}vh` }}
      >
        <div className="gs-sticky-inner">

          {/* LEFT */}
          <div className="gs-left">
            {/* Top bar */}
            <div className="gs-left-top">
              <div className="gs-nav-dots">
                {COMPANIES.map((c, i) => (
                  <div
                    key={i}
                    className={`gs-nav-dot${i === activeIdx ? " active" : ""}`}
                    onClick={() => {
                      setActiveIdx(i);
                      activeIdxRef.current = i;
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="gs-nav-dot-circle" />
                    <span className="gs-nav-dot-label">{c.abbr}</span>
                  </div>
                ))}
              </div>
              <div className="gs-counter-display">
                <strong>{String(activeIdx + 1).padStart(2, "0")}</strong>
                &thinsp;/&thinsp;{String(COMPANIES.length).padStart(2, "0")}
              </div>
            </div>

            {/* Animated content */}
            <div>
              <div key={`cat-${activeIdx}`} className="gs-category-tag">
                <co.Icon size={11} strokeWidth={2.5} />
                {co.category}
              </div>

              <h2 key={`name-${activeIdx}`} className="gs-main-name">{co.name}</h2>
              <p key={`role-${activeIdx}`} className="gs-role-line">{co.role}</p>
              <div key={`rule-${activeIdx}`} className="gs-gold-rule" />
              <p key={`body-${activeIdx}`} className="gs-body-text">{co.body}</p>

              <div key={`ops-${activeIdx}`}>
                <p className="gs-ops-label">Core Operations</p>
                <div className="gs-ops-list">
                  {co.ops.map((op, j) => (
                    <div
                      key={op}
                      className="gs-ops-list-item"
                      style={{ animationDelay: `${0.22 + j * 0.055}s` }}
                    >
                      <div className="gs-ops-dot" />
                      <span className="gs-ops-name">{op}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div key={`quote-${activeIdx}`} className="gs-quote-block">
                <p>"{co.abstract}"</p>
              </div>
            </div>
          </div>

          {/* RIGHT — image panel */}
          <div className="gs-right">
            {COMPANIES.map((c, i) => (
              <img
                key={i}
                className="gs-right-img"
                src={c.image}
                alt=""
                aria-hidden="true"
                style={{ opacity: i === activeIdx ? 1 : 0 }}
              />
            ))}
            <div className="gs-right-overlay" />

            {/* Ghost abbr */}
            {COMPANIES.map((c, i) => (
              <div
                key={i}
                className="gs-right-ghost"
                style={{ opacity: i === activeIdx ? 1 : 0 }}
              >
                {c.abbr}
              </div>
            ))}

            {/* Category badge */}
            {COMPANIES.map((c, i) => (
              <div
                key={i}
                className="gs-right-category-badge"
                style={{ opacity: i === activeIdx ? 1 : 0 }}
              >
                {c.category}
              </div>
            ))}

            {/* Progress bar */}
            
          </div>

        </div>
      </div>
    </div>
  );
}