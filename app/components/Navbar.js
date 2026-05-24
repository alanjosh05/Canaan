"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Anchor, X, Menu } from "lucide-react";

const NAV_ITEMS = ["Home", "About", "Service", "Fleet", "Clients", "Contact"];

function LogoPlaceholder() {
  return (
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
      <Anchor size={16} className="text-white" strokeWidth={2} />
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
        onClick={handleLogoClick}
        className="fixed cursor-pointer z-50 top-0 left-0 bg-[#f5f4f0] px-4 py-3 sm:px-5 sm:py-4 rounded-br-2xl flex items-center gap-2.5 sm:gap-3"
      >
        <LogoPlaceholder />
        <div className="leading-tight">
          <div
            className="font-bold tracking-tight text-neutral-900"
            style={{ fontSize: 14, letterSpacing: "-0.02em" }}
          >
            Canaan
          </div>
          <div
            className="font-semibold tracking-tight text-neutral-500"
            style={{ fontSize: 10, letterSpacing: "0.01em" }}
          >
            Global International
          </div>
        </div>
      </div>

      {/* ── TOP RIGHT — desktop nav + hamburger ── */}
      <div className="fixed z-50 top-0 right-0 bg-[#f5f4f0] px-4 py-3 sm:px-7 sm:py-5 rounded-bl-2xl flex items-center gap-3">

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center bg-black/[0.07] border border-black/10 rounded-full pl-4 pr-1.5 h-11 gap-0">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => navigateTo(item)}
              className="bg-transparent border-none text-neutral-900 font-medium text-[13.5px] tracking-tight px-3 cursor-pointer hover:text-neutral-500 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger — 44×44 tap target */}
        <button
          className="sm:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen
            ? <X size={20} className="text-neutral-900" />
            : <Menu size={20} className="text-neutral-900" />
          }
        </button>
      </div>

      {/* ── MOBILE MENU — full-screen overlay, fixed to viewport ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer — slides down from top, avoids both corner widgets */}
          <div className="fixed z-40 sm:hidden"
            style={{
              top: "4.5rem",          // clears the ~72px top bar
              left: "0.75rem",
              right: "0.75rem",
            }}
          >
            <div className="bg-[#f5f4f0] border border-black/10 rounded-2xl overflow-hidden shadow-lg">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`w-full text-left px-5 py-4 text-[15px] font-medium transition-colors
                    hover:bg-black/5 active:bg-black/10
                    ${i < NAV_ITEMS.length - 1 ? "border-b border-black/5" : ""}
                    text-neutral-900`}
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