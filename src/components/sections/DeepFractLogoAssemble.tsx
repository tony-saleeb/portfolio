"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  DEEPFRACT_GRADIENTS,
  DEEPFRACT_SHARDS,
  DEEPFRACT_VIEWBOX,
} from "@/components/sections/deepfractShards";

function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/**
 * DeepFract crystal mark — shards fly in from orbit and lock together.
 * Drive with a 0→1 MotionValue (scroll or time).
 */
export function DeepFractLogoAssemble({
  assemble,
  className = "",
}: {
  assemble: MotionValue<number>;
  className?: string;
}) {
  const groupRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  const offsets = useMemo(
    () =>
      DEEPFRACT_SHARDS.map((_, i) => {
        const angle = seeded(i) * Math.PI * 2;
        const dist = 70 + seeded(i + 1) * 220;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          r: (seeded(i + 2) - 0.5) * 160,
          s: 0.1 + seeded(i + 3) * 0.5,
          // Wider stagger so shards stream in across most of the scroll window
          delay: seeded(i + 4) * 0.68,
        };
      }),
    []
  );

  useMotionValueEvent(assemble, "change", (v) => apply(v));
  useEffect(() => {
    apply(assemble.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function apply(v: number) {
    const group = groupRef.current;
    if (!group) return;
    const nodes = group.children;
    const n = Math.min(nodes.length, offsets.length);

    for (let i = 0; i < n; i++) {
      const o = offsets[i];
      const span = Math.max(0.28, 1 - o.delay * 0.35);
      const local = clamp01((v - o.delay) / span);
      const e = easeOutQuint(local);
      const el = nodes[i] as SVGGElement;
      const x = o.x * (1 - e);
      const y = o.y * (1 - e);
      const r = o.r * (1 - e);
      const s = o.s + (1 - o.s) * e;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;
      el.style.opacity = String(clamp01(e * 1.25));
    }

    if (glowRef.current) {
      const g = clamp01((v - 0.7) / 0.3);
      glowRef.current.style.opacity = String(0.12 + g * 0.58);
      glowRef.current.setAttribute("r", String(72 + g * 30));
    }
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-black ${className}`}
    >
      <svg
        viewBox={DEEPFRACT_VIEWBOX}
        className="h-auto w-[min(72%,280px)] sm:w-[min(68%,320px)]"
        aria-label="DeepFract"
        role="img"
      >
        <defs dangerouslySetInnerHTML={{ __html: DEEPFRACT_GRADIENTS }} />
        <circle
          ref={glowRef}
          cx="250"
          cy="250"
          r="80"
          fill="url(#deepfract-boot-glow)"
          opacity="0.2"
          style={{ pointerEvents: "none" }}
        />
        <defs>
          <radialGradient id="deepfract-boot-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#42E7F3" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#215093" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g
          ref={groupRef}
          style={{ transformOrigin: "250px 250px", transformBox: "view-box" }}
        >
          {DEEPFRACT_SHARDS.map((shard, i) => (
            <g
              key={i}
              style={{
                transformOrigin: "250px 250px",
                transformBox: "view-box",
                willChange: "transform, opacity",
              }}
            >
              <path
                d={shard.d}
                fill={shard.fill}
                transform={shard.transform}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
