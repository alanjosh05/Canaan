"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, Anchor, Globe, Ship, Package } from "lucide-react";

const COMPANIES = [
  {
    name: "Canaan Shipping Services",
    desc: "Full-service freight forwarding and end-to-end logistics management",
    icon: Anchor,
    tag: "Freight",
    link: "/canaan-shipping-services"
  },
  {
    name: "Canaan International",
    desc: "Cross-border trade facilitation and international cargo operations",
    icon: Globe,
    tag: "Trade",
    link: "/canaan-shipping-services"
  },
  {
    name: "Canaan Shipping",
    desc: "Sea freight operations and vessel coordination across major trade lanes",
    icon: Ship,
    tag: "Sea Freight",
    link: "/canaan-shipping-services"
  },
  {
    name: "Rehoboth Shipping & Services",
    desc: "Specialised cargo handling and comprehensive port-side services",
    icon: Package,
    tag: "Port Services",
    link: "/canaan-shipping-services"
  },
];

// ── CARD ──────────────────────────────────────────────────────
function Card({ co, i, phase, link }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const tiltRef = useRef({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = co.icon;
  const delay = 0.1 + i * 0.12;

  const handleMouseMove = useCallback((e) => {
    if (phase !== "idle") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rx = -((cy / h) - 0.5) * 8;
      const ry = ((cx / w) - 0.5) * 8;
      tiltRef.current = { rx, ry };
      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      }
    });
  }, [phase]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    tiltRef.current = { rx: 0, ry: 0 };
    setHovered(false);
  }, []);

  const entranceTransform =
    phase === "hidden"
      ? "perspective(900px) rotateX(10deg) translateY(40px)"
      : "perspective(900px) rotateX(0deg) translateY(0px)";

  const idleTransform =
    `perspective(900px) rotateX(${tiltRef.current.rx}deg) rotateY(${tiltRef.current.ry}deg) translateY(${hovered ? -4 : 0}px)`;

  const transform = phase === "idle" ? idleTransform : entranceTransform;

  const transition =
    phase === "reveal"
      ? `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      : phase === "idle" && !hovered
      ? "transform 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease"
      : "box-shadow 0.3s ease";

  return (
    <a href={link}>
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        background: hovered ? "#ffffff" : "rgba(255,255,255,0.7)",
        border: `1.5px solid ${hovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 20,
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        opacity: phase === "hidden" ? 0 : 1,
        transform,
        transition,
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: hovered
          ? "0 20px 56px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        minHeight: 280,
      }}
    >
      {/* Glossy shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
        borderRadius: "20px 20px 0 0",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* TOP LEFT — tag */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        background: "rgba(245,244,240,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderTop: "none", borderLeft: "none",
        borderRadius: "0 0 14px 0",
        padding: "8px 14px",
        zIndex: 2,
      }}>
        <span style={{
          fontSize: 9, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#a0998c",
        }}>
          {co.tag}
        </span>
      </div>

      {/* TOP RIGHT — icon */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        background: "rgba(245,244,240,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderTop: "none", borderRight: "none",
        borderRadius: "0 0 0 14px",
        padding: "8px 12px",
        zIndex: 2,
      }}>
        <Icon size={13} color="#a0998c" strokeWidth={1.8} />
      </div>

      {/* CONTENT */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        flex: 1, padding: "52px 20px 20px",
      }}>

        {/* Image placeholder */}
        <div style={{
          borderRadius: 14,
          overflow: "hidden",
          background: "#f0ede8",
          border: "1px solid rgba(0,0,0,0.06)",
          aspectRatio: "16 / 9",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          flexShrink: 0,
          position: "relative",
        }}>
          <Icon size={28} color="rgba(0,0,0,0.1)" strokeWidth={1.2} />
          <span style={{
            position: "absolute", bottom: 8, left: 10,
            fontSize: 9, color: "rgba(0,0,0,0.2)",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Image
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontSize: 15, fontWeight: 700,
          color: "#1a1916", letterSpacing: "-0.02em",
          lineHeight: 1.25, margin: "0 0 6px",
        }}>
          {co.name}
        </h3>

        {/* Divider */}
        <div style={{
          width: 24, height: 1.5,
          background: "rgba(0,0,0,0.15)",
          borderRadius: 2, marginBottom: 8,
        }} />

        {/* Description */}
        <p style={{
          fontSize: 12, lineHeight: 1.7,
          color: hovered ? "#6b6560" : "#a0998c",
          margin: "0 0 16px",
          transition: "color 0.3s ease",
          flex: 1,
        }}>
          {co.desc}
        </p>

        {/* Arrow CTA */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: hovered ? "#1a1916" : "#c8c0b8",
            transition: "color 0.3s ease",
          }}>
            Learn more
          </span>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: `1px solid ${hovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hovered ? "#1a1916" : "transparent",
            transition: "all 0.3s ease",
          }}>
            <ArrowRight
              size={12}
              color={hovered ? "#f5f4f0" : "#a0998c"}
              style={{ transition: "color 0.3s ease" }}
            />
          </div>
        </div>
      </div>
    </div>
    </a>
  );
}

// ── SECTION ───────────────────────────────────────────────────
export default function GroupSection() {
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState("hidden");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("reveal");
          obs.disconnect();
          setTimeout(() => setPhase("idle"), 1400);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f4f0] mt-14 font-sans flex flex-col p-4 sm:p-5 gap-3"
    >

      {/* ── HEADER CARD ── */}
      <div
        className="relative rounded-2xl overflow-hidden min-h-[160px] sm:min-h-[180px]"
        style={{
          opacity: phase === "hidden" ? 0 : 1,
          transform: phase === "hidden" ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2070"
          alt="Canaan Group"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* TOP LEFT — label */}
        

        {/* TOP RIGHT — count */}
        <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-3 sm:px-7 sm:py-5 rounded-bl-2xl z-10">
          <span className="text-[11px] sm:text-sm font-medium text-neutral-900 tracking-tight">
            The Canaan Group
          </span>
        </div>

        {/* BOTTOM — heading */}
        <div className="absolute bottom-0 left-0 right-0 sm:right-auto bg-white/90 backdrop-blur-sm px-5 py-5 sm:px-7 sm:py-6 rounded-tr-2xl z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold tracking-[-0.03em] leading-[1.18] text-neutral-900">
            Four companies,<br className="hidden sm:block" />
            <span className="text-neutral-400"> one mission.</span>
          </h2>
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPANIES.map((co, i) => (
          <Card key={i} co={co} i={i} phase={phase} link={co.link} />
        ))}
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div className="flex flex-wrap gap-2 px-1">
        {[
          "Canaan Shipping Services",
          "Canaan International",
          "Canaan Shipping",
          "Rehoboth Shipping",
          "Freight Forwarding",
          "Customs Brokerage",
          "Port Services",
        ].map((tag) => (
          <span
            key={tag}
            className="bg-white/80 border border-black/10 text-neutral-700 text-xs font-medium px-4 py-2 rounded-full tracking-tight"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}