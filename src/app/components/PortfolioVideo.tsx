"use client";

import { memo } from "react";

function PortfolioVideoInner() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/hover.mp4" type="video/mp4" />
      </video>

      {/* Overlay — subtle enough to show video detail, dark enough for text */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "contrast(1.05) saturate(1.1)" }}
      />
    </div>
  );
}

const PortfolioVideo = memo(PortfolioVideoInner);
PortfolioVideo.displayName = "PortfolioVideo";

export default PortfolioVideo;
