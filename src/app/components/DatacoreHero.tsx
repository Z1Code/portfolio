"use client";

import { useState } from "react";
import { Command, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import DatacoreVideo from "./DatacoreVideo";

/* ═══════════════════════════ DESIGN TOKENS ═══════════════════════════ */

const PURPLE = "#7b39fc";
const PURPLE_HOVER = "#6a2ce0";
const DARK = "#2b2344";
const DARK_HOVER = "#352b54";
const ORANGE = "#f87b52";
const GLASS_BORDER = "rgba(164,132,215,0.5)";
const GLASS_BG = "rgba(85,80,110,0.4)";

/* Font shorthand classes */
const fontManrope = "font-[var(--font-manrope)]";
const fontInter = "font-[var(--font-inter)]";
const fontCabin = "font-[var(--font-cabin)]";
const fontInstrument = "font-[var(--font-instrument)]";

/* ═══════════════════════════════ NAVBAR ══════════════════════════════ */

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services", hasChevron: true },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact us", href: "#contact" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
            <Command className="h-5 w-5 text-black" strokeWidth={2.2} />
          </div>
          <span
            className={`${fontInter} text-lg font-bold tracking-tight text-white`}
          >
            Datacore
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`${fontManrope} inline-flex items-center gap-1 rounded-lg px-4 py-2 text-[14px] font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white`}
            >
              {l.label}
              {l.hasChevron && (
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              )}
            </a>
          ))}
        </div>

        {/* ── Desktop Auth ── */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Sign In — glass */}
          <a
            href="#"
            className={`${fontCabin} rounded-full px-5 py-2.5 text-[14px] font-semibold text-white/90 backdrop-blur-md transition-all hover:text-white`}
            style={{
              background: GLASS_BG,
              border: `1px solid ${GLASS_BORDER}`,
            }}
          >
            Sign&nbsp;In
          </a>

          {/* Get Started — purple */}
          <a
            href="#"
            className={`${fontCabin} rounded-full px-5 py-2.5 text-[14px] font-semibold text-white transition-colors`}
            style={{ background: PURPLE }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = PURPLE_HOVER)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = PURPLE)
            }
          >
            Get&nbsp;Started
          </a>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-center rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-black md:hidden">
          {/* Top bar (mirrors navbar) */}
          <div className="flex items-center justify-between px-6 py-5">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                <Command className="h-5 w-5 text-black" strokeWidth={2.2} />
              </div>
              <span
                className={`${fontInter} text-lg font-bold tracking-tight text-white`}
              >
                Datacore
              </span>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-col gap-1 px-6 pt-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`${fontManrope} flex items-center gap-2 rounded-xl px-4 py-4 text-[18px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white`}
              >
                {l.label}
                {l.hasChevron && (
                  <ChevronDown className="h-4 w-4 opacity-60" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile auth */}
          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6">
            <a
              href="#"
              className={`${fontCabin} rounded-full py-3.5 text-center text-[15px] font-semibold text-white/90 backdrop-blur-md`}
              style={{
                background: GLASS_BG,
                border: `1px solid ${GLASS_BORDER}`,
              }}
            >
              Sign&nbsp;In
            </a>
            <a
              href="#"
              className={`${fontCabin} rounded-full py-3.5 text-center text-[15px] font-semibold text-white`}
              style={{ background: PURPLE }}
            >
              Get&nbsp;Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═════════════════════════ GLASS BADGE ═══════════════════════════════ */

function Badge() {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full px-1.5 py-1.5 pr-5 backdrop-blur-md"
      style={{
        background: GLASS_BG,
        border: `1px solid ${GLASS_BORDER}`,
      }}
    >
      <span
        className={`${fontCabin} rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white`}
        style={{ background: ORANGE }}
      >
        New
      </span>
      <span
        className={`${fontManrope} text-[13px] font-medium text-white/80`}
      >
        Say Hello to Datacore v3.2
      </span>
    </div>
  );
}

/* ═══════════════════════════ CTA BUTTONS ═════════════════════════════ */

function PrimaryButton() {
  return (
    <a
      href="#"
      className={`group ${fontCabin} inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-900/40 active:scale-[0.98]`}
      style={{ background: PURPLE }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = PURPLE_HOVER)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = PURPLE)
      }
    >
      Book a Free Demo
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function SecondaryButton() {
  return (
    <a
      href="#"
      className={`${fontCabin} inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.98]`}
      style={{
        background: DARK,
        border: `1px solid rgba(164,132,215,0.25)`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = DARK_HOVER)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = DARK)
      }
    >
      Get Started Now
    </a>
  );
}

/* ══════════════════════ MAIN HERO EXPORT ═════════════════════════════ */

export default function DatacoreHero() {
  return (
    <div
      className={`${fontManrope} relative min-h-screen overflow-hidden bg-black`}
    >
      {/* Background Video + overlay */}
      <DatacoreVideo />

      {/* Navbar */}
      <Navbar />

      {/* Hero content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-4xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <Badge />

        {/* Headline */}
        <h1
          className={`${fontInter} mt-8 text-[clamp(40px,8vw,76px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white`}
        >
          Your Networks.
          <br />
          One Rapid{" "}
          <span
            className={`${fontInstrument} italic font-normal`}
          >
            Interface
          </span>
          .
        </h1>

        {/* Subtext */}
        <p
          className={`${fontManrope} mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-white/60`}
        >
          Platform helps admins control access, logs, and servers
          with&nbsp;purpose.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </section>
    </div>
  );
}
