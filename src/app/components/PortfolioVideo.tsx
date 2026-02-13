"use client";

import { memo } from "react";

function PortfolioVideoInner() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020818]">
      {/* Liquid glass blobs */}
      <div className="absolute inset-0">
        {/* Primary blob — large, slow drift */}
        <div
          className="liquid-blob absolute h-[70vmax] w-[70vmax] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(0, 100, 255, 0.4), rgba(80, 0, 200, 0.2) 50%, transparent 70%)",
            top: "-20%",
            left: "-10%",
            animation: "liquid-drift-1 18s ease-in-out infinite alternate",
          }}
        />

        {/* Secondary blob — warm accent */}
        <div
          className="liquid-blob absolute h-[55vmax] w-[55vmax] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle at 60% 50%, rgba(120, 0, 255, 0.35), rgba(200, 0, 100, 0.15) 50%, transparent 70%)",
            bottom: "-15%",
            right: "-10%",
            animation: "liquid-drift-2 22s ease-in-out infinite alternate",
          }}
        />

        {/* Tertiary blob — teal accent */}
        <div
          className="liquid-blob absolute h-[45vmax] w-[45vmax] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 200, 180, 0.3), rgba(0, 80, 200, 0.15) 50%, transparent 70%)",
            top: "40%",
            left: "30%",
            animation: "liquid-drift-3 25s ease-in-out infinite alternate",
          }}
        />

        {/* Small highlight blob — adds depth */}
        <div
          className="liquid-blob absolute h-[30vmax] w-[30vmax] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, rgba(100, 140, 255, 0.4), transparent 60%)",
            top: "10%",
            right: "20%",
            animation: "liquid-drift-4 20s ease-in-out infinite alternate",
          }}
        />

        {/* Subtle warm blob — bottom left */}
        <div
          className="liquid-blob absolute h-[35vmax] w-[35vmax] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 100, 50, 0.2), rgba(200, 50, 100, 0.1) 50%, transparent 70%)",
            bottom: "5%",
            left: "10%",
            animation: "liquid-drift-5 28s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Noise texture overlay for organic feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(2, 8, 24, 0.95), transparent)",
        }}
      />
    </div>
  );
}

const PortfolioVideo = memo(PortfolioVideoInner);
PortfolioVideo.displayName = "PortfolioVideo";

export default PortfolioVideo;
