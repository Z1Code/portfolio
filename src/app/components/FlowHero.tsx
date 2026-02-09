"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

/* ═══════════════════════════ FONTS ═══════════════════════════ */
const fontInter = "font-[var(--font-inter)]";

/* ═══════════════════════ FLOWING TUBES BG ═══════════════════ */

/*
  Each tube is 3 layered strokes on the same path:
    1. Outer glow  — thick + blurred + tinted color (the "halo")
    2. Body        — medium width, semi-transparent white (the glass tube)
    3. Core        — thin bright white center (the light inside)
  All share the `.flow-line` animation class from globals.css.
*/

const tubes = [
  { d: "M-100,320 C150,260 350,100 700,180 C1050,260 1250,80 1600,140",  delay: "0s",   color: "#6e8efb" },
  { d: "M-60,360 C200,290 420,130 720,210 C1020,290 1200,110 1600,190",   delay: "0.5s", color: "#8b5cf6" },
  { d: "M-120,400 C130,340 350,180 680,270 C1010,360 1220,160 1600,240",  delay: "1s",   color: "#a78bfa" },
  { d: "M-80,340 C180,270 400,90 740,170 C1080,250 1260,60 1600,120",     delay: "0.3s", color: "#7dd3fc" },
  { d: "M-140,420 C110,370 330,220 660,310 C990,400 1180,210 1600,280",   delay: "1.4s", color: "#c084fc" },
  { d: "M-40,300 C220,230 440,70 760,150 C1080,230 1280,40 1600,100",     delay: "0.8s", color: "#93c5fd" },
  { d: "M-100,380 C160,310 380,150 700,240 C1020,330 1230,130 1600,210",  delay: "0.6s", color: "#818cf8" },
  { d: "M-160,440 C90,390 310,250 640,340 C970,430 1160,240 1600,310",    delay: "1.8s", color: "#a5b4fc" },
  { d: "M-50,330 C210,250 430,80 750,160 C1070,240 1270,50 1600,110",     delay: "1.1s", color: "#67e8f9" },
  { d: "M-130,410 C120,360 340,210 670,300 C1000,390 1190,200 1600,270",  delay: "0.2s", color: "#7c3aed" },
];

function FlowingLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[-5%] left-[-5%] h-[75%] w-[110%]"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Blur filter for the outer glow layer */}
          <filter id="tubeGlow">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* Ambient radial glow behind all tubes */}
          <radialGradient id="ambientGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.06)" />
            <stop offset="60%" stopColor="rgba(99,102,241,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Soft ambient light */}
        <ellipse cx="800" cy="260" rx="750" ry="200" fill="url(#ambientGlow)" />

        {tubes.map((tube, i) => {
          const del = `${tube.delay}, ${tube.delay}`;
          return (
            <g key={i}>
              {/* Layer 1 — Outer glow (colored, thick, blurred) */}
              <path
                d={tube.d}
                stroke={tube.color}
                strokeWidth={12}
                strokeLinecap="round"
                fill="none"
                filter="url(#tubeGlow)"
                opacity={0.25}
                className="flow-line"
                style={{ animationDelay: del }}
              />
              {/* Layer 2 — Glass body (semi-transparent white) */}
              <path
                d={tube.d}
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                opacity={0.12}
                className="flow-line"
                style={{ animationDelay: del }}
              />
              {/* Layer 3 — Bright core (thin white center) */}
              <path
                d={tube.d}
                stroke="white"
                strokeWidth={1.2}
                strokeLinecap="round"
                fill="none"
                opacity={0.6}
                className="flow-line"
                style={{ animationDelay: del }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════ NAVBAR ═══════════════════════════ */

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* Pre-computed sunburst logo — avoids Math.cos/sin hydration mismatch */
function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <circle cx="14" cy="14" r="3" fill="white" />
      {/* 12 rays at 30-degree increments, pre-computed */}
      <line x1="19" y1="14" x2="23" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.33" y1="16.5" x2="23.53" y2="19" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="16.5" y1="18.33" x2="19" y2="23.53" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="19" x2="14" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="11.5" y1="18.33" x2="9" y2="23.53" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.67" y1="16.5" x2="4.47" y2="19" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="9" y1="14" x2="5" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.67" y1="11.5" x2="4.47" y2="9" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="11.5" y1="9.67" x2="9" y2="4.47" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="9" x2="14" y2="3" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="16.5" y1="9.67" x2="19" y2="4.47" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.33" y1="11.5" x2="23.53" y2="9" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <LogoIcon />
          <span className={`${fontInter} text-[17px] font-semibold tracking-[-0.01em] text-white`}>
            Logoipsum
          </span>
        </a>

        {/* Center pill nav (desktop) */}
        <div className="hidden md:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 backdrop-blur-sm">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`${fontInter} rounded-full px-5 py-2 text-[13.5px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA (desktop) */}
        <div className="hidden md:flex">
          <a
            href="#"
            className={`${fontInter} rounded-full border border-white/[0.12] bg-transparent px-6 py-2.5 text-[13.5px] font-medium text-white transition-all hover:border-white/25 hover:bg-white/[0.05]`}
          >
            Get Started for Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-center rounded-lg p-2 text-white/70 transition-colors hover:bg-white/[0.06] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-50 border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`${fontInter} rounded-lg px-4 py-3.5 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white`}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 border-t border-white/[0.06] pt-4">
                <a
                  href="#"
                  className={`${fontInter} block rounded-full border border-white/[0.12] py-3 text-center text-[14px] font-medium text-white transition-all hover:bg-white/[0.05]`}
                >
                  Get Started for Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════ HERO ═══════════════════════════ */

export default function FlowHero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Abstract flowing light trails */}
      <FlowingLines />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-3xl flex-col items-center justify-center px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${fontInter} text-[clamp(38px,8vw,72px)] font-medium leading-[1.06] tracking-[-0.035em] text-white`}
        >
          Where Innovation
          <br />
          Meets Execution
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className={`${fontInter} mx-auto mt-7 max-w-lg text-[15px] leading-[1.7] font-normal text-white/45`}
        >
          Once your solution is ready, we ensure a smooth launch
          with rigorous testing and deployment. Post-launch, we
          continuously analyze performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary — outlined / glass */}
          <a
            href="#"
            className={`${fontInter} rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3 text-[14px] font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08]`}
          >
            Get Started for Free
          </a>

          {/* Secondary — darker filled */}
          <a
            href="#"
            className={`${fontInter} rounded-full border border-white/[0.08] bg-white/[0.06] px-7 py-3 text-[14px] font-medium text-white/60 transition-all hover:bg-white/[0.10] hover:text-white/80`}
          >
            Let&apos;s Get Connected
          </a>
        </motion.div>
      </section>
    </div>
  );
}
