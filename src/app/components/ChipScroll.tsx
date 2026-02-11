"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

const BG_COLOR = "#0a0a0a";
const TOTAL_FRAMES = 210;
const FPS = 24;

interface TextOverlay {
  title: string;
  subtitle?: string;
  position: "center" | "left" | "right";
  startFrame: number;
  endFrame: number;
  gradientColors?: string;
}

const textOverlays: TextOverlay[] = [
  {
    title: "NVIDIA RTX Tensor Cores",
    subtitle: "El Futuro de la IA.",
    position: "center",
    startFrame: 0,
    endFrame: 42,
  },
  {
    title: "8 | 12 | 16 | 32 GB",
    subtitle: "512 Millones de Parámetros.",
    position: "left",
    startFrame: 50,
    endFrame: 98,
    gradientColors:
      "linear-gradient(90deg, #fef9c3, #fde047, #7dd3fc, #fde047, #fef9c3)",
  },
  {
    title: "VRAM GDDR7",
    subtitle: "Diseñadas para Escalar.",
    position: "right",
    startFrame: 106,
    endFrame: 140,
    gradientColors:
      "linear-gradient(270deg, #fef9c3, #fde68a, #f87171, #fde68a, #fef9c3)",
  },
  {
    title: "Velocity Setups",
    subtitle: "Una nueva era, la inteligencia artificial.",
    position: "center",
    startFrame: 145,
    endFrame: 209,
    gradientColors:
      "linear-gradient(90deg, #fef9c3, #fde68a, #6ee7b7, #fde68a, #fef9c3)",
  },
];

/* ────────── Text overlay item ────────── */

function TextOverlayItem({
  overlay,
  currentFrame,
}: {
  overlay: TextOverlay;
  currentFrame: number;
}) {
  const isVisible =
    currentFrame >= overlay.startFrame && currentFrame <= overlay.endFrame;

  const fadeRange = 5;
  let opacity = 0;
  if (isVisible) {
    if (currentFrame < overlay.startFrame + fadeRange) {
      opacity = (currentFrame - overlay.startFrame) / fadeRange;
    } else if (currentFrame > overlay.endFrame - fadeRange) {
      opacity = (overlay.endFrame - currentFrame) / fadeRange;
    } else {
      opacity = 1;
    }
  }
  if (opacity <= 0) return null;

  const progress =
    (currentFrame - overlay.startFrame) /
    (overlay.endFrame - overlay.startFrame);
  const gradPos = progress * 200;

  const defaultGrad =
    "linear-gradient(90deg, #fef3c7, #fde68a, #6ee7b7, #fde68a, #fef3c7)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 ${
        overlay.position === "left"
          ? "md:items-start md:pl-6"
          : overlay.position === "right"
            ? "md:items-end md:pr-6"
            : "items-center"
      }`}
      style={{ opacity, transition: "opacity 0.15s ease-out" }}
    >
      <div
        className={`max-w-full text-center ${
          overlay.position === "left"
            ? "md:text-left"
            : overlay.position === "right"
              ? "md:text-right"
              : ""
        }`}
      >
        <h2
          className="bg-clip-text text-lg font-bold tracking-tight text-transparent drop-shadow-2xl sm:text-xl md:text-2xl"
          style={{
            backgroundImage: overlay.gradientColors || defaultGrad,
            backgroundSize: "200% 100%",
            backgroundPosition: `${gradPos}% 0`,
            filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
          }}
        >
          {overlay.title}
        </h2>
        {overlay.subtitle && (
          <p
            className="mt-1 text-xs font-light tracking-tight text-white/80 sm:text-sm"
            style={{ textShadow: "0 0 30px rgba(0,0,0,0.9)" }}
          >
            {overlay.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/* ────────── Main component ────────── */

export default function ChipScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  /* Preload all 210 frames */
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.webp`;

      const onDone = () => {
        loaded++;
        setLoadProgress(loaded / TOTAL_FRAMES);
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoading(false);
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
      images[i - 1] = img;
    }
  }, []);

  /* Draw a frame to canvas (cover mode) */
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[idx];
    if (!canvas || !ctx || !img?.complete || img.naturalWidth === 0) return;

    const container = containerRef.current;
    const dpr = window.devicePixelRatio || 1;
    const w = container?.clientWidth || 400;
    const h = container?.clientHeight || 192;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Crop 12% black bars + 5% zoom
    const crop = 0.12;
    const sx = img.naturalWidth * crop;
    const sw = img.naturalWidth * (1 - crop * 2);
    const sh = img.naturalHeight;
    const zoom = 1.05;
    const dw = w * zoom;
    const dh = h * zoom;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.drawImage(img, sx, 0, sw, sh, dx, dy, dw, dh);

    // Vignette
    const grad = ctx.createRadialGradient(
      w / 2, h / 2, Math.min(w, h) * 0.3,
      w / 2, h / 2, Math.max(w, h) * 0.7,
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.7, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, []);

  /* Auto-play loop at 24fps */
  useEffect(() => {
    if (isLoading || imagesRef.current.length === 0) return;

    let raf: number;
    const frameDur = 1000 / FPS;
    let last = Date.now();

    const tick = () => {
      const now = Date.now();
      if (now - last >= frameDur) {
        last = now - ((now - last) % frameDur);
        const next = (frameRef.current + 1) % TOTAL_FRAMES;
        frameRef.current = next;
        setCurrentFrame(next);
        drawFrame(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading, drawFrame]);

  /* Resize handler */
  useEffect(() => {
    const onResize = () => drawFrame(frameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: BG_COLOR }}
    >
      {/* Loading bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: BG_COLOR }}
          >
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-2 text-[11px] font-medium tracking-wide text-white/40">
              {Math.round(loadProgress * 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas */}
      {!isLoading && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          {textOverlays.map((overlay, i) => (
            <TextOverlayItem
              key={i}
              overlay={overlay}
              currentFrame={currentFrame}
            />
          ))}
        </>
      )}
    </div>
  );
}
