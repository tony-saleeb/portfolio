"use client";
import { motion, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

interface ParallaxProps {
  children: ReactNode;
  /** Pixels of travel across the element's full scroll pass. Negative = up. */
  distance?: number;
  className?: string;
  /** Adds a subtle scale drift alongside the translation. */
  zoom?: boolean;
}

/**
 * Scroll-linked vertical parallax. Mobile uses direct scroll mapping (no spring)
 * so layers stay locked to the finger — strong depth without jitter.
 */
export function Parallax({ children, distance = -80, className, zoom = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const travel = mobile ? distance * 1.15 : distance;

  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);
  const y = useTransform(progress, [0, 1], [-travel, travel]);
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    // Scale on mobile is skipped — compositing scale+translate every frame is costly.
    zoom && !mobile ? [1.08, 1, 1.08] : [1, 1, 1]
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y, scale, willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
