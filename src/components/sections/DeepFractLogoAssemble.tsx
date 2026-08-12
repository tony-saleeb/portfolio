"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  useMotionValueEvent,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import {
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

const CX = 250;
const CY = 250;

/**
 * DeepFract crystal mark — shards fly in, then the pristine logo locks in.
 *
 * Gradients + any transform = corrupted fills in browsers. So particles use
 * solid paints only; the final mark is the untouched /deepfract-logo.svg.
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

  // Particles dominate early; pristine logo takes over as pieces lock
  const particlesOpacity = useTransform(assemble, [0, 0.72, 0.92], [1, 1, 0]);
  const logoOpacity = useTransform(assemble, [0.55, 0.82, 1], [0, 1, 1]);

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
          delay: seeded(i + 4) * 0.68,
        };
      }),
    []
  );

  const apply = useCallback(
    (v: number) => {
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
        el.setAttribute(
          "transform",
          `translate(${CX} ${CY}) translate(${x} ${y}) rotate(${r}) scale(${s}) translate(${-CX} ${-CY})`
        );
        el.setAttribute("opacity", String(clamp01(e * 1.25)));
      }

      if (glowRef.current) {
        const g = clamp01((v - 0.7) / 0.3);
        glowRef.current.setAttribute("opacity", String(0.12 + g * 0.58));
        glowRef.current.setAttribute("r", String(72 + g * 30));
      }
    },
    [offsets]
  );

  useMotionValueEvent(assemble, "change", apply);
  useEffect(() => {
    apply(assemble.get());
  }, [apply, assemble]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-black ${className}`}
    >
      <div className="relative h-auto w-[min(72%,280px)] sm:w-[min(68%,320px)]">
        {/* Soft core glow */}
        <svg
          viewBox={DEEPFRACT_VIEWBOX}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="deepfract-boot-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#42E7F3" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#215093" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx={CX}
            cy={CY}
            r="80"
            fill="url(#deepfract-boot-glow)"
            opacity="0.2"
          />
        </svg>

        {/* Flying solid shards (no gradients) */}
        <motion.svg
          viewBox={DEEPFRACT_VIEWBOX}
          style={{ opacity: particlesOpacity }}
          className="relative h-auto w-full"
          aria-hidden
        >
          <g ref={groupRef}>
            {DEEPFRACT_SHARDS.map((shard, i) => (
              <g key={i}>
                <path d={shard.d} fill={shard.paint} />
              </g>
            ))}
          </g>
        </motion.svg>

        {/* Pristine mark — untouched SVG, never transformed */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deepfract-logo.svg"
            alt="DeepFract"
            width={500}
            height={500}
            className="h-full w-full"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
