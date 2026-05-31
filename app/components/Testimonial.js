import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Mehta",
    title: "Head of Supply Chain",
    company: "Nexora Industries",
    country: "India",
    flag: "🇮🇳",
    quote: "Canaan Global handled our first cross-border shipment to Germany flawlessly. Customs was cleared in record time, and we had real-time visibility throughout. They've become our only logistics partner.",
    metric: "98%",
    metricLabel: "On-time rate",
  },
  {
    id: 2,
    name: "Sarah O'Brien",
    title: "Director of Operations",
    company: "Atlantic Trade Co.",
    country: "Ireland",
    flag: "🇮🇪",
    quote: "What sets Canaan apart is their people. Our account manager knew every detail of our shipment without us having to chase. That kind of proactive service is rare in freight forwarding.",
    metric: "3×",
    metricLabel: "Faster clearance",
  },
  {
    id: 3,
    name: "Lena Hoffmann",
    title: "Procurement Manager",
    company: "Bauwerk GmbH",
    country: "Germany",
    flag: "🇩🇪",
    quote: "We ship sensitive industrial equipment across 12 countries every month. Canaan's end-to-end documentation management has eliminated delays entirely. I can't imagine going back to our old provider.",
    metric: "12",
    metricLabel: "Countries covered",
  },
  {
    id: 4,
    name: "Marcus Williams",
    title: "CEO",
    company: "Horizon Retail Group",
    country: "United States",
    flag: "🇺🇸",
    quote: "We scaled from 200 to over 2,000 shipments per quarter with Canaan. Their infrastructure just grew with us — no hiccups, no delays, no excuses. Exactly what a growing business needs.",
    metric: "10×",
    metricLabel: "Volume scaled",
  },
  {
    id: 5,
    name: "Priya Nair",
    title: "Logistics Coordinator",
    company: "SunBridge Exports",
    country: "UAE",
    flag: "🇦🇪",
    quote: "The team handled an urgent perishable shipment to Tokyo over a weekend with zero fuss. Temperature-controlled, on time, and perfectly documented. That experience made us a lifelong client.",
    metric: "72h",
    metricLabel: "Emergency delivery",
  },
  {
    id: 6,
    name: "Chen Wei",
    title: "Import Manager",
    company: "Silk Road Trading",
    country: "China",
    flag: "🇨🇳",
    quote: "Canaan's knowledge of Asian trade lanes is unmatched. They navigated complex regulatory requirements across Southeast Asia without a single compliance issue. Our shipments arrive exactly when promised.",
    metric: "99.2%",
    metricLabel: "Compliance rate",
  },
  {
    id: 7,
    name: "Fatima Al-Hassan",
    title: "VP of Procurement",
    company: "Gulf Bridge Logistics",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    quote: "We moved our entire regional distribution to Canaan after just one trial shipment. The visibility dashboard alone saved us 20 hours a week in tracking calls. A truly modern freight partner.",
    metric: "20h",
    metricLabel: "Saved weekly",
  },
];

const AUTOPLAY_INTERVAL = 4000;

function Avatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colors = [
    ["#e8e3d4", "#6b6450"],
    ["#d4e3e0", "#4a6b64"],
    ["#e3d4e0", "#6b4a68"],
    ["#d4dde3", "#4a5e6b"],
    ["#e3ddd4", "#6b5e4a"],
  ];
  const [bg, fg] = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: 13, color: fg, letterSpacing: "0.04em", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function TestimonialCard({ t, position, handleMove, cardSize }) {
  const isCenter = position === 0;

  const centerCard = {
    background: "#0a0908",
    color: "#f5f4f0",
    border: "2px solid #0a0908",
    zIndex: 10,
    boxShadow: "0px 8px 0px 4px #c8c5bc",
  };

  const sideCard = {
    background: "#ffffff",
    color: "#0a0908",
    border: "2px solid #e5e4df",
    zIndex: 0,
    boxShadow: "none",
  };

  return (
    <div
      onClick={() => handleMove(position)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        cursor: "pointer",
        padding: "28px",
        transition: "all 500ms ease-in-out",
        borderRadius: 0,
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        ...(isCenter ? centerCard : sideCard),
      }}
    >
      {/* Clipped corner accent line */}
      <span style={{
        position: "absolute",
        display: "block",
        transformOrigin: "top right",
        transform: "rotate(45deg)",
        backgroundColor: isCenter ? "#a0998c" : "#e5e4df",
        right: -2,
        top: 48,
        width: SQRT_5000,
        height: 2,
      }} />

      {/* Quote icon */}
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: isCenter ? "#2a2926" : "#f5f4f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14, flexShrink: 0,
      }}>
        <Quote size={14} color={isCenter ? "#a0998c" : "#a0998c"} />
      </div>

      {/* Quote text */}
      <p style={{
        margin: 0,
        fontSize: "0.85rem",
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: "-0.01em",
        color: isCenter ? "#f5f4f0" : "#0a0908",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        "{t.quote}"
      </p>

      {/* Author — pinned to bottom */}
      <div style={{
        position: "absolute",
        bottom: 24,
        left: 28,
        right: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={t.name} />
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: isCenter ? "#f5f4f0" : "#0a0908", letterSpacing: "-0.01em" }}>
              {t.name}
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#a0998c", marginTop: 1 }}>
              {t.title} · {t.flag}
            </p>
          </div>
        </div>

        {/* Metric badge — only on center card */}
        {isCenter && (
          <div style={{
            background: "#2a2926",
            borderRadius: 10,
            padding: "6px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f5f4f0", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {t.metric}
            </span>
            <span style={{ fontSize: 9, fontWeight: 500, color: "#a0998c", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>
              {t.metricLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StaggerTestimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(TESTIMONIALS);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const handleMove = useCallback((steps) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => handleMove(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [handleMove, paused]);

  useEffect(() => {
    const updateSize = () => {
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <style>{`
        .tnav-btn { transition: background 0.18s, transform 0.12s; }
        .tnav-btn:hover { background: #2a2926 !important; }
        .tnav-btn:active { transform: scale(0.95); }
        .tpip { transition: width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s; border: none; padding: 0; cursor: pointer; }
      `}</style>

      <section
        style={{ background: "#f5f4f0", padding: "1.25rem 1.25rem", fontFamily: "sans-serif", position: "relative" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a0998c", margin: 0, marginBottom: 6 }}>
              Client voices
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0a0908", margin: 0 }}>
              Trusted by businesses<br /> <span style={{color: "#96841dff"}}>around the world</span>
            </h2>
          </div>
        </div>

        {/* Stagger card stage */}
        <div
          style={{ position: "relative", overflow: "hidden", height: 560 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonialsList.map((testimonial, index) => {
            const position =
              testimonialsList.length % 2
                ? index - (testimonialsList.length + 1) / 2
                : index - testimonialsList.length / 2;
            return (
              <TestimonialCard
                key={testimonial.id + "-" + index}
                testimonial={testimonial}
                t={testimonial}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
        </div>

        {/* Bottom row: pips + nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
          {/* Pips */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {TESTIMONIALS.map((_, i) => {
              const centerIndex = Math.floor(testimonialsList.length / 2);
              const activeId = testimonialsList[centerIndex]?.id;
              const isActive = TESTIMONIALS[i].id === activeId;
              return (
                <button
                  key={i}
                  className="tpip"
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    height: 4,
                    width: isActive ? 28 : 10,
                    borderRadius: 9999,
                    background: isActive ? "#0a0908" : "#c8c5bc",
                  }}
                />
              );
            })}
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => handleMove(-1)}
              className="tnav-btn"
              aria-label="Previous testimonial"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "1.5px solid #d5d2ca", background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#0a0908",
              }}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => handleMove(1)}
              className="tnav-btn"
              aria-label="Next testimonial"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "none", background: "#0a0908",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#f5f4f0",
              }}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}