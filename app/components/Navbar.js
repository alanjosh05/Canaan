"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Anchor, X, Menu } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const NAV_ITEMS = ["Home", "About", "Service", "Fleet", "Clients", "Contact"];

function LogoPlaceholder() {
  return (
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0a0908] flex items-center justify-center shrink-0">
      <Anchor size={16} className="text-white" strokeWidth={2} />
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Init AOS once on mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 0,
    });
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Show logo only in hero section (top ~100vh)
  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY < window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogoClick() {
    setMobileOpen(false);
    if (pathname !== "/") {
      await router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function navigateTo(item) {
    const id = item.toLowerCase();
    setMobileOpen(false);

    if (item === "Home") {
      if (pathname !== "/") {
        await router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (item === "About") {
      if (pathname !== "/about") {
        await router.push("/about");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (item === "Service") {
      const targetId = "customers";
      if (pathname !== "/") {
        await router.push("/");
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (pathname !== "/") {
      await router.push("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* ── TOP LEFT — logo ── */}
      <div
        data-aos="fade-down-right"
        data-aos-delay="350"
        data-aos-duration="600"
        onClick={handleLogoClick}
        className="fixed cursor-pointer z-50 top-0 left-0 bg-[#f5f4f0] px-4 py-3 sm:px-5 sm:py-4 rounded-br-2xl flex items-center gap-2.5 sm:gap-3"
        style={{
          opacity: showLogo ? 1 : 0,
          pointerEvents: showLogo ? "auto" : "none",
          //transition: "opacity 0.3s ease",
        }}
      >
        <img src="log.png" width={150} height={50} />

      </div>

      {/* ── TOP RIGHT — desktop nav + hamburger ── */}
      <div
        data-aos="fade-down-left"
        data-aos-delay="600"
        data-aos-duration="400"
        className="fixed z-50 top-0 right-0 bg-[#f5f4f0] px-4 py-3 sm:px-7 sm:py-5 rounded-bl-2xl flex items-center gap-3"
      >
        {/* Desktop nav — each item staggered */}
        <nav className="hidden sm:flex items-center bg-black/[0.07] border border-black/10 rounded-full pl-4 pr-1.5 h-11 gap-0">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              data-aos="fade-down-left"
              onClick={() => navigateTo(item)}
              className="bg-transparent border-none text-[#0a0908] font-medium text-[13.5px] tracking-tight px-3 cursor-pointer hover:text-neutral-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen
            ? <X size={20} className="text-[#0a0908]" />
            : <Menu size={20} className="text-[#0a0908]" />
          }
        </button>
      </div>

      {/* ── MOBILE MENU — full-screen overlay ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div
            className="fixed z-40 sm:hidden"
            style={{ top: "4.5rem", left: "0.75rem", right: "0.75rem" }}
          >
            <div
              data-aos="fade-down"
              data-aos-duration="300"
              className="bg-[#f5f4f0] border border-black/10 rounded-2xl overflow-hidden shadow-lg"
            >
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item}
                  data-aos="fade-right"
                  data-aos-delay={i * 50}
                  data-aos-duration="250"
                  onClick={() => navigateTo(item)}
                  className={`w-full text-left px-5 py-4 text-[15px] font-medium transition-colors
                    hover:bg-black/5 active:bg-black/10
                    ${i < NAV_ITEMS.length - 1 ? "border-b border-black/5" : ""}
                    text-[#0a0908]`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}