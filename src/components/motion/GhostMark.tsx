"use client";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

/**
 * Oversized word that slides horizontally with scroll.
 * Mobile: direct mapping, no spring — avoids rubber-band jitter.
 */
export function GhostMark({
  children,
  from = -12,
  to = 12,
  className,
}: {
  children: string;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const span = mobile ? 1.25 : 1;
  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);
  const x = useTransform(progress, [0, 1], [`${from * span}%`, `${to * span}%`]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute select-none overflow-hidden ${className ?? ""}`}
    >
      <motion.span
        style={{
          x: reduced ? 0 : x,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="block whitespace-nowrap text-[22vw] font-medium leading-none tracking-tighter text-foreground/[0.04] md:text-[18vw] md:text-foreground/[0.035]"
      >
        {children}
      </motion.span>
    </div>
  );
}
