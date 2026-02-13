"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

const WORKLOAD = 70;

export default function AvailabilityBanner() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="availability-glow glass-card mx-auto mb-10 w-full max-w-sm rounded-2xl border-t border-amber-500/40"
    >
      {/* Amber accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

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

        {/* Workload bar */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-[var(--font-inter)] text-xs text-white/50">
              {t.availability.workload}
            </span>
            <span className="font-[var(--font-inter)] text-xs font-semibold text-amber-400">
              {WORKLOAD}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${WORKLOAD}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="bar-shimmer relative h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500"
            />
          </div>
        </div>

        {/* Info text */}
        <p className="flex items-center gap-1.5 font-[var(--font-inter)] text-xs text-white/40">
          <Zap className="h-3 w-3 text-amber-400/80" />
          {t.availability.limitedAvailability} &middot;{" "}
          {t.availability.premiumRates}
        </p>
      </div>
    </motion.div>
  );
}
