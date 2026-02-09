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
const ContributionGrid = dynamic(() => import("./ContributionGrid"), {
  ssr: false,
});

/* ═══════════════════ FONT SHORTCUTS ═══════════════════ */
const fInter = "font-[var(--font-inter)]";
const fManrope = "font-[var(--font-manrope)]";
const fCabin = "font-[var(--font-cabin)]";
const fInstrument = "font-[var(--font-instrument)]";

/* ═══════════════════ DATA ═══════════════════ */

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

/* ═══════════════════ STAGGER ANIMATION ═══════════════════ */

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

/* ═══════════════════ NAVBAR ═══════════════════ */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand */}
        <a
          href="#"
          className={`${fInter} text-[17px] font-semibold tracking-[-0.01em] text-white`}
        >
          Juan Fernandez
        </a>

        {/* Center pill (desktop) */}
        <div className="hidden md:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 backdrop-blur-sm">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`${fManrope} rounded-full px-4 py-2 text-[13.5px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA (desktop) */}
        <div className="hidden md:flex">
          <a
            href="#contact"
            className={`${fCabin} rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-[13.5px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08]`}
          >
            Contactar
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

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`${fManrope} rounded-lg px-4 py-3.5 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white`}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 border-t border-white/[0.06] pt-4">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className={`${fCabin} block rounded-full border border-white/[0.12] bg-white/[0.04] py-3 text-center text-[14px] font-semibold text-white`}
                >
                  Contactar
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════ HERO SECTION ═══════════════════ */

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
        className="shimmer-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.05] px-1.5 py-1.5 pr-5 backdrop-blur-md"
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
        {/* WhatsApp — green gradient */}
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

        {/* Ver Proyectos — glass */}
        <a
          href="#projects"
          className={`${fCabin} rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08] hover:scale-[1.03] active:scale-[0.98]`}
        >
          Ver Proyectos
        </a>
      </motion.div>

      {/* Stats row */}
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

/* ═══════════════════ CONTRIBUTIONS ═══════════════════ */

function ContributionsSection() {
  return (
    <section id="contributions" className="px-6 py-14">
      <motion.div {...fadeInView} className="mx-auto max-w-3xl">
        <h2
          className={`${fInter} mb-6 text-center text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl`}
        >
          Contribuciones
        </h2>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 backdrop-blur-md">
          <ContributionGrid />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════ TECHNOLOGIES ═══════════════════ */

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
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-white/[0.15] hover:bg-white/[0.08]"
              >
                <Icon
                  className={`text-3xl ${tech.color} transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12`}
                />
                <span
                  className={`${fManrope} text-[12px] font-medium text-white/60 transition-colors group-hover:text-white/90`}
                >
                  {tech.name}
                </span>
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
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-white/[0.15] hover:bg-white/[0.08]"
              >
                <Icon
                  className={`text-3xl ${hw.color} transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6`}
                />
                <span
                  className={`${fManrope} text-[12px] font-medium text-white/60 transition-colors group-hover:text-white/90`}
                >
                  {hw.name}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════ PROJECTS ═══════════════════ */

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
          <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.06]">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <ChipScroll />
            </div>
            <div className="relative p-6">
              <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
              <h3
                className={`${fInter} mb-3 text-lg font-bold text-white transition-colors group-hover:text-blue-400`}
              >
                VelocitySetups
              </h3>
              <p className={`${fManrope} mb-4 text-[14px] leading-relaxed text-white/50`}>
                Plataforma web especializada en la venta de builds de PC
                optimizados para gaming.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["React", "Next.js", "E-commerce"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.15] px-3 py-1 text-[12px] text-white/60"
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

          {/* Coming Soon 1 */}
          <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] opacity-75 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.06] hover:opacity-100">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] transition-all duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10">
              <div className="text-center">
                <div className="mb-2 text-3xl transition-transform duration-300 group-hover:rotate-12">
                  &#9203;
                </div>
                <div className={`${fManrope} text-[14px] font-medium text-white/40`}>
                  Próximamente
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className={`${fInter} mb-3 text-lg font-bold text-white/80`}>
                Proyecto en Desarrollo
              </h3>
              <p className={`${fManrope} mb-4 text-[14px] text-white/40`}>
                Nuevo proyecto innovador en fase de desarrollo.
              </p>
              <span className="rounded-full border border-white/[0.1] px-3 py-1 text-[12px] text-white/40">
                En desarrollo
              </span>
            </div>
          </div>

          {/* Coming Soon 2 */}
          <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] opacity-75 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] hover:bg-white/[0.06] hover:opacity-100">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01] transition-all duration-500 group-hover:from-purple-500/10 group-hover:to-pink-500/10">
              <div className="text-center">
                <div className="mb-2 text-3xl transition-transform duration-300 group-hover:-rotate-12">
                  &#128640;
                </div>
                <div className={`${fManrope} text-[14px] font-medium text-white/40`}>
                  A continuación
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className={`${fInter} mb-3 text-lg font-bold text-white/80`}>
                Futuro Proyecto
              </h3>
              <p className={`${fManrope} mb-4 text-[14px] text-white/40`}>
                Más proyectos innovadores están en camino.
              </p>
              <span className="rounded-full border border-white/[0.1] px-3 py-1 text-[12px] text-white/40">
                Planificación
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════ CONTACT ═══════════════════ */

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

/* ═══════════════════ FOOTER ═══════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/60 px-6 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl text-center">
        <p className={`${fManrope} text-[13px] text-white/35`}>
          © 2025 Juan Fernandez. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */

export default function PortfolioHome() {
  return (
    <div className={`${fManrope} relative min-h-screen`}>
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
