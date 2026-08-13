"use client";
import { useEffect, useRef, useState } from "react";

type Blob = {
  tone: "accent" | "glow" | "violet";
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  r: number;
  speed: number;
  phase: number;
};

const BLOBS: Blob[] = [
  { tone: "accent", cx: 0.28, cy: 0.32, ax: 0.16, ay: 0.12, r: 0.62, speed: 0.16, phase: 0 },
  { tone: "glow", cx: 0.72, cy: 0.28, ax: 0.14, ay: 0.16, r: 0.5, speed: 0.21, phase: 1.9 },
  { tone: "violet", cx: 0.55, cy: 0.72, ax: 0.2, ay: 0.1, r: 0.68, speed: 0.13, phase: 3.4 },
  { tone: "accent", cx: 0.86, cy: 0.68, ax: 0.12, ay: 0.14, r: 0.42, speed: 0.25, phase: 5.1 },
];

/**
 * Soft light field. On mobile the canvas freezes while the user is scrolling
 * so parallax transforms keep the GPU to themselves, then resumes idle drift.
 */
export function AuroraField({
  className,
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const SCALE = isMobile ? 0.07 : 0.09;
    const blobs = isMobile ? BLOBS.slice(0, 3) : BLOBS;
    const canTrack = interactive && !coarse;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let scrolling = false;
    let t = 0;
    let light = false;
    let scrollTimer = 0;
    let frameSkip = 0;

    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    const tones = {
      accent: [59, 157, 255],
      glow: [34, 211, 238],
      violet: [129, 96, 255],
    };

    const parse = (value: string, fallback: number[]) => {
      const hex = value.trim().replace("#", "");
      if (hex.length !== 3 && hex.length !== 6) return fallback;
      const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
      const n = parseInt(full, 16);
      if (Number.isNaN(n)) return fallback;
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      tones.accent = parse(s.getPropertyValue("--accent"), tones.accent);
      tones.glow = parse(s.getPropertyValue("--accent-glow"), tones.glow);
      light = document.documentElement.classList.contains("light");
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const rw = Number.isFinite(rect.width) ? rect.width : 0;
      const rh = Number.isFinite(rect.height) ? rect.height : 0;
      // Skip until the canvas has a real layout box — otherwise paint gets NaNs.
      if (rw < 1 || rh < 1) return;
      w = Math.max(1, Math.round(rw * SCALE));
      h = Math.max(1, Math.round(rh * SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const paint = () => {
      if (w < 1 || h < 1) return;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      const diag = Math.hypot(w, h);
      const peak = light ? 0.28 : 0.5;

      const draw = (x: number, y: number, radius: number, rgb: number[], alpha: number) => {
        if (
          !Number.isFinite(x) ||
          !Number.isFinite(y) ||
          !Number.isFinite(radius) ||
          radius <= 0
        ) {
          return;
        }
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
        g.addColorStop(0.55, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha * 0.32})`);
        g.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      };

      for (const b of blobs) {
        const x = (b.cx + Math.cos(t * b.speed + b.phase) * b.ax) * w;
        const y = (b.cy + Math.sin(t * b.speed * 1.3 + b.phase) * b.ay) * h;
        draw(x, y, b.r * diag * 0.5, tones[b.tone], peak);
      }

      if (canTrack) {
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        draw(pointer.x * w, pointer.y * h, diag * 0.22, tones.glow, peak * 0.9);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const frame = () => {
      // Freeze while scrolling on mobile — parallax owns the frame budget.
      if (isMobile && scrolling) {
        raf = requestAnimationFrame(frame);
        return;
      }

      // ~30fps on mobile when idle is enough for drifting light.
      if (isMobile) {
        frameSkip = (frameSkip + 1) % 2;
        if (frameSkip !== 0) {
          raf = requestAnimationFrame(frame);
          return;
        }
      }

      t += isMobile ? 0.02 : 0.016;
      paint();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onScroll = () => {
      if (!isMobile) return;
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
      }, 120);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    readPalette();
    resize();
    paint();
    if (!reduced) start();

    const ro = new ResizeObserver(() => {
      resize();
      paint();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden || !visible) stop();
      else start();
    };

    const themeObserver = new MutationObserver(() => {
      readPalette();
      paint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.addEventListener("visibilitychange", onVisibility);
    if (isMobile) window.addEventListener("scroll", onScroll, { passive: true });
    if (canTrack) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      stop();
      window.clearTimeout(scrollTimer);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        // Lighter blur on mobile — still soft, much cheaper to composite.
        filter: mobile ? "blur(14px) saturate(130%)" : "blur(28px) saturate(135%)",
        transform: "translateZ(0) scale(1.12)",
        willChange: "transform",
      }}
    />
  );
}
