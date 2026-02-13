"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

const WORKLOAD = 70;

export default function AvailabilityBanner() {
  const { t } = useTranslation();
  const stages = [
    { key: "available", label: t.availability.available, active: false },
    { key: "moderate", label: t.availability.moderate, active: false },
    { key: "busy", label: t.availability.busy, active: true },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="availability-glow glass-card mx-auto mb-8 w-full max-w-md overflow-hidden rounded-2xl border-t-2 border-amber-500/60"
    >
      <div className="p-5">
        {/* Header: pulse dot + HIGH DEMAND */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          <span className="font-[var(--font-inter)] text-xs font-bold uppercase tracking-widest text-amber-400">
            {t.availability.highDemand}
          </span>
        </div>

        {/* 3-stage indicator */}
        <div className="mb-5 flex gap-2">
          {stages.map((s) => (
            <button
              key={s.key}
              disabled
              className={`flex-1 rounded-lg px-3 py-2 text-center font-[var(--font-inter)] text-xs font-semibold tracking-wide transition-all ${
                s.active
                  ? "bg-gradient-to-r from-amber-500/90 to-red-500/80 text-white shadow-lg shadow-amber-500/20"
                  : "bg-white/[0.04] text-white/30"
              }`}
            >
              {s.active ? `\u2605 ${s.label} \u2605` : s.label}
            </button>
          ))}
        </div>

        {/* Workload bar */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-[var(--font-inter)] text-xs text-white/50">
              {t.availability.workload}
            </span>
            <span className="font-[var(--font-inter)] text-xs font-semibold text-amber-400">
              {WORKLOAD}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${WORKLOAD}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="bar-shimmer relative h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500"
            />
          </div>
        </div>

        {/* Info text */}
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1.5 font-[var(--font-inter)] text-xs text-white/40">
            <Zap className="h-3 w-3 text-amber-400" />
            {t.availability.limitedAvailability} &middot;{" "}
            {t.availability.premiumRates}
          </p>
          <p className="font-[var(--font-inter)] text-xs text-white/30">
            {t.availability.responseTime}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
