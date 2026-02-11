"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Menu, X, ArrowRight, Github } from "lucide-react";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiJavascript,
  SiPostgresql,
  SiGit,
  SiNvidia,
  SiAmd,
  SiIntel,
  SiAsus,
} from "react-icons/si";
import PortfolioVideo from "./PortfolioVideo";

const ChipScroll = dynamic(() => import("./ChipScroll"), { ssr: false });
const ChipScrollIvania = dynamic(() => import("./ChipScrollIvania"), {
  ssr: false,
});
const ChipScrollPLC = dynamic(() => import("./ChipScrollPLC"), {
  ssr: false,
});
const ContributionGrid = dynamic(() => import("./ContributionGrid"), {
  ssr: false,
});

/* ── Font shortcuts ── */
const fInter = "font-[var(--font-inter)]";
const fManrope = "font-[var(--font-manrope)]";
const fCabin = "font-[var(--font-cabin)]";
const fInstrument = "font-[var(--font-instrument)]";

/* ── Data ── */

const navLinks = [
  { label: "Acerca", href: "#about" },
  { label: "Tecnologías", href: "#technologies" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const technologies = [
  { name: "React", icon: SiReact, color: "text-blue-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Git", icon: SiGit, color: "text-orange-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
];

const hardware = [
  { name: "NVIDIA | CUDA", icon: SiNvidia, color: "text-green-500" },
  { name: "AMD", icon: SiAmd, color: "text-red-500" },
  { name: "Intel", icon: SiIntel, color: "text-blue-500" },
  { name: "ASUS", icon: SiAsus, color: "text-red-600" },
];

/* ── Animations ── */

const stagger: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.15,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  }),
};

const fadeInView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

/* ── GlassFilters ── */

function GlassFilters() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
      aria-hidden
    >
      <defs>
        {/* Subtle refraction — usable via backdrop-filter: url(#glass-refract) in Chrome
            or filter: url(#glass-refract) cross-browser on overlay elements */}
        <filter
          id="glass-refract"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          {/* 1. Slight pre-blur to soften displacement edges */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="preblur" />
          {/* 2. Organic noise for natural glass distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.012"
            numOctaves="2"
            seed="42"
            result="noise"
          />
          {/* 3. Smooth noise into soft displacement field */}
          <feGaussianBlur in="noise" stdDeviation="3" result="smooth" />
          {/* 4. Displacement: scale 8 = subtle edge refraction */}
          <feDisplacementMap
            in="preblur"
            in2="smooth"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* 5. Slight saturation boost through glass */}
          <feColorMatrix in="displaced" type="saturate" values="1.3" />
        </filter>

        {/* Stronger refraction for hero/special elements */}
        <filter
          id="glass-refract-strong"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="preblur" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.010"
            numOctaves="3"
            seed="42"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="4" result="smooth" />
          <feDisplacementMap
            in="preblur"
            in2="smooth"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix in="displaced" type="saturate" values="1.5" />
        </filter>
      </defs>
    </svg>
  );
}

/* ── Navbar ── */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div className="glass mx-auto max-w-7xl rounded-[20px]">
        <div className="relative flex h-[62px] items-center px-5 sm:px-6">
          {/* Brand */}
          <a
            href="#"
            className={`${fInter} inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-white`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            Juan Fernandez
          </a>

          {/* Center nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`${fManrope} inline-flex h-9 items-center rounded-xl px-4 text-[13.5px] font-medium text-white/60 transition hover:bg-white/[0.07] hover:text-white`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: GitHub */}
          <a
            href="https://github.com/Z1Code"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto hidden lg:flex items-center justify-center rounded-full bg-white/[0.04] p-2.5 text-white/60 ring-1 ring-white/[0.08] transition hover:bg-white/[0.08] hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="ml-auto lg:hidden rounded-xl bg-white/[0.04] p-2.5 text-white/70 ring-1 ring-white/[0.1] transition hover:bg-white/[0.08]"
            aria-label="Menu"
          >
            {open ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-label="Close"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="glass relative z-50 mx-auto mt-2 max-w-7xl rounded-[20px]"
            >
              <div className="relative p-3">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`${fManrope} block rounded-xl px-3 py-3 text-[15px] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white`}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <a
                  href="https://github.com/Z1Code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${fManrope} inline-flex items-center gap-2.5 rounded-xl px-3 py-3 text-[15px] font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white`}
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ── Hero ── */

function HeroSection() {
  return (
    <section
      id="about"
      className="relative mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 pt-20 text-center"
    >
      {/* Badge */}
      <motion.div
        custom={0}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="glass-pill mb-8 inline-flex items-center gap-2.5 rounded-full px-1.5 py-1.5 pr-5"
      >
        <span
          className={`${fCabin} rounded-full bg-green-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white`}
        >
          Open
        </span>
        <span className={`${fManrope} text-[13px] font-medium text-white/70`}>
          Disponible para proyectos
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`${fInter} text-[clamp(36px,8vw,72px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white`}
      >
        Hola, soy{" "}
        <span className={`${fInstrument} font-normal italic`}>
          Juan Fernandez
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        custom={2}
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`${fManrope} mx-auto mt-6 max-w-lg text-[17px] leading-[1.7] text-white/55`}
      >
        Desarrollador Full Stack especializado en crear aplicaciones
        escalables y eficientes con tecnologías modernas.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        custom={3}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/56937111513?text=¡Hola!%20Me%20interesa%20contactarte%20para%20un%20proyecto."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
          <span
            className={`${fCabin} relative z-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]`}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-white/20" />
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
            <ArrowRight className="h-4 w-4 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </a>

        {/* Ver Proyectos */}
        <a
          href="#projects"
          className={`${fCabin} rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08] hover:scale-[1.03] active:scale-[0.98]`}
        >
          Ver Proyectos
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        custom={4}
        variants={stagger}
        initial="hidden"
        animate="show"
        className={`${fInter} mt-10 flex flex-wrap items-center justify-center gap-6 text-[14px] font-medium text-white/40 sm:gap-8`}
      >
        <span>
          <span className="font-bold text-white/70">1</span> Año
        </span>
        <span className="hidden h-4 w-px bg-white/15 sm:block" />
        <span>
          <span className="font-bold text-white/70">7</span> Proyectos
        </span>
      </motion.div>
    </section>
  );
}

/* ── Contributions ── */

function ContributionsSection() {
  return (
    <section id="contributions" className="px-6 py-14">
      <motion.div {...fadeInView} className="mx-auto max-w-3xl">
        <h2
          className={`${fInter} mb-6 text-center text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl`}
        >
          Contribuciones
        </h2>

        <div className="glass-card overflow-hidden rounded-2xl px-5 py-4">
          <ContributionGrid />
        </div>
      </motion.div>
    </section>
  );
}

/* ── Technologies ── */

function TechnologiesSection() {
  return (
    <section id="technologies" className="px-6 py-14">
      <motion.div {...fadeInView} className="mx-auto max-w-6xl">
        <h2
          className={`${fInter} mb-4 text-center text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl`}
        >
          Tecnologías
        </h2>
        <p
          className={`${fManrope} mx-auto mb-8 max-w-md text-center text-[15px] text-white/50`}
        >
          Herramientas y tecnologías que domino para crear soluciones
          excepcionales
        </p>

        {/* Dev stack */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="glass-card group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <Icon
                    className={`text-3xl ${tech.color} transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12`}
                  />
                  <span
                    className={`${fManrope} text-[12px] font-medium text-white/60 transition-colors group-hover:text-white/90`}
                  >
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hardware */}
        <h3
          className={`${fInter} mb-6 mt-10 text-center text-xl font-bold text-white/80`}
        >
          Hardware
        </h3>
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {hardware.map((hw) => {
            const Icon = hw.icon;
            return (
              <div
                key={hw.name}
                className="glass-card group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <Icon
                    className={`text-3xl ${hw.color} transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6`}
                  />
                  <span
                    className={`${fManrope} text-[12px] font-medium text-white/60 transition-colors group-hover:text-white/90`}
                  >
                    {hw.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ── Projects ── */

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-14">
      <motion.div {...fadeInView} className="mx-auto max-w-6xl">
        <h2
          className={`${fInter} mb-8 text-center text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl`}
        >
          Proyectos
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* VelocitySetups */}
          <div className="glass-card group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <ChipScroll />
            </div>
            <div className="p-6">
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
              <h3
                className={`${fInter} mb-3 text-lg font-bold text-white transition-colors group-hover:text-blue-400`}
              >
                VelocitySetups
              </h3>
              <p
                className={`${fManrope} mb-4 text-[14px] leading-relaxed text-white/50`}
              >
                Plataforma web especializada en la venta de builds de PC
                optimizados para gaming.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["React", "Next.js", "E-commerce"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill rounded-full px-3 py-1 text-[12px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://velocitysetups.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${fManrope} text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  Ver Sitio Web
                </a>
                <a
                  href="#"
                  className={`${fManrope} inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  <FaGithub className="h-3.5 w-3.5" /> Código
                </a>
              </div>
            </div>
          </div>

          {/* IvaniaBeauty */}
          <div className="glass-card group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <ChipScrollIvania />
            </div>
            <div className="p-6">
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
              <h3
                className={`${fInter} mb-3 text-lg font-bold text-white transition-colors group-hover:text-pink-400`}
              >
                IvaniaBeauty
              </h3>
              <p
                className={`${fManrope} mb-4 text-[14px] leading-relaxed text-white/50`}
              >
                Tienda online de fajas colombianas premium con envios a todo
                Chile.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["React", "Next.js", "E-commerce"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill rounded-full px-3 py-1 text-[12px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://ivaniabeauty.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${fManrope} text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  Ver Sitio Web
                </a>
                <a
                  href="#"
                  className={`${fManrope} inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  <FaGithub className="h-3.5 w-3.5" /> Código
                </a>
              </div>
            </div>
          </div>

          {/* ProLevelCode */}
          <div className="glass-card group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <ChipScrollPLC />
            </div>
            <div className="p-6">
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
              <h3
                className={`${fInter} mb-3 text-lg font-bold text-white transition-colors group-hover:text-cyan-400`}
              >
                ProLevelCode
              </h3>
              <p
                className={`${fManrope} mb-4 text-[14px] leading-relaxed text-white/50`}
              >
                Plataforma de cursos de desarrollo web e inteligencia artificial
                para llevar tu codigo al siguiente nivel.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["React", "Next.js", "Cursos IA"].map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill rounded-full px-3 py-1 text-[12px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://prolevelcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${fManrope} text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  Ver Sitio Web
                </a>
                <a
                  href="#"
                  className={`${fManrope} inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white`}
                >
                  <FaGithub className="h-3.5 w-3.5" /> Código
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Contact ── */

function ContactSection() {
  return (
    <section id="contact" className="px-6 py-14">
      <motion.div {...fadeInView} className="mx-auto max-w-2xl text-center">
        <h2
          className={`${fInter} mb-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl`}
        >
          ¿Tienes un proyecto en mente?
        </h2>
        <p className={`${fManrope} mb-8 text-[16px] text-white/50`}>
          Estoy disponible para nuevos proyectos y colaboraciones.
          ¡Hablemos!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/56937111513?text=¡Hola!%20Me%20interesa%20contactarte%20para%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
            <span
              className={`${fCabin} relative z-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]`}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-white/20" />
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Z1Code"
            target="_blank"
            rel="noopener noreferrer"
            className={`${fCabin} inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08] hover:scale-[1.03]`}
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="px-4 pb-4">
      <div className="glass mx-auto max-w-7xl rounded-[20px] px-6 py-8">
        <div className="relative z-10 text-center">
          <p className={`${fManrope} text-[13px] text-white/35`}>
            © 2026 Juan Fernandez. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Main export ── */

export default function PortfolioHome() {
  return (
    <div className={`${fManrope} relative min-h-screen`}>
      <GlassFilters />
      <PortfolioVideo />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ContributionsSection />
        <TechnologiesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
