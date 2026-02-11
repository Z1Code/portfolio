"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import BackgroundVideo from "./BackgroundVideo";

/* ───────────────────────────── Navbar ───────────────────────────── */

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a
          href="#"
          className="font-[var(--font-switzer)] text-xl font-semibold tracking-tight text-white"
        >
          Z1&nbsp;Code
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-[var(--font-switzer)] text-[15px] font-medium tracking-tight text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="font-[var(--font-switzer)] text-[15px] font-medium tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Sign&nbsp;In
          </a>
          <a
            href="#"
            className="rounded-full bg-white px-5 py-2 font-[var(--font-switzer)] text-[15px] font-semibold tracking-tight text-black transition-all hover:scale-105 hover:bg-white/90"
          >
            Sign&nbsp;Up
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 font-[var(--font-switzer)] text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                <a
                  href="#"
                  className="rounded-lg px-3 py-3 text-center font-[var(--font-switzer)] text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Sign&nbsp;In
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white px-5 py-3 text-center font-[var(--font-switzer)] text-[15px] font-semibold text-black transition-all hover:bg-white/90"
                >
                  Sign&nbsp;Up
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ──────────────────────── Primary Button ─────────────────────── */

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center justify-center"
    >
      {/* Glow layer */}
      <div className="absolute inset-0 rounded-full bg-orange-600 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-60" />

      {/* Button face */}
      <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF3300] to-[#EE7926] px-7 py-3.5 font-[var(--font-switzer)] text-[15px] font-semibold tracking-tight text-white shadow-lg">
        {/* Inner stroke overlay */}
        <span className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-white/20" />
        {children}
        <span className="inline-flex overflow-hidden">
          <ArrowRight className="h-4 w-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </span>
    </motion.a>
  );
}

/* ─────────────────────── Secondary Button ────────────────────── */

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center justify-center"
    >
      <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-7 py-3.5 font-[var(--font-switzer)] text-[15px] font-semibold tracking-tight text-black shadow-lg backdrop-blur-md transition-colors duration-300 group-hover:bg-white">
        <span className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-black/5" />
        {children}
      </span>
    </motion.a>
  );
}

/* ────────────────────── Avatar Stack ─────────────────────────── */

const avatars = [
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=47",
];

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
      className="flex items-center gap-4"
    >
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="User avatar"
            className="h-10 w-10 rounded-full border-2 border-black object-cover"
          />
        ))}
      </div>
      <p className="font-[var(--font-geist-sans)] text-sm text-white/70">
        Trusted by{" "}
        <span className="font-semibold text-white">210k+</span> stores
        worldwide
      </p>
    </motion.div>
  );
}

/* ══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function Z1CodeHero() {
  /* Stagger config */
  const stagger: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.18,
        duration: 0.7,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background — full opacity, behind everything */}
      <BackgroundVideo />

      {/* Top Gradient Bar — 5px */}
      <div className="absolute top-0 left-0 z-50 h-[5px] w-full bg-gradient-to-r from-[#ccf] via-[#e7d04c] to-[#31fb78]" />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Headline */}
        <motion.h1
          custom={0}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl font-[var(--font-switzer)] text-5xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Manage your online store while save{" "}
          <span className="bg-gradient-to-r from-[#FF3300] to-[#EE7926] bg-clip-text text-transparent">
            3x
          </span>{" "}
          operating cost
        </motion.h1>

        {/* Subhead */}
        <motion.p
          custom={1}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl font-[var(--font-geist-sans)] text-lg leading-relaxed text-white/70"
        >
          ClearInvoice takes the hassle out of billing with easy&#8209;to&#8209;use
          tools.
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={2}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <PrimaryButton>Get Started</PrimaryButton>
          <SecondaryButton>Watch Demo</SecondaryButton>
        </motion.div>

        {/* Social Proof */}
        <div className="mt-12">
          <SocialProof />
        </div>
      </section>
    </div>
  );
}
