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
 * Scroll-linked vertical parallax.
 * Mobile uses a lighter travel distance so touch scroll stays smooth and
 * content is less likely to clip inside overflow parents.
 */
export function Parallax({ children, distance = -80, className, zoom = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);
  const travel = mobile ? distance * 0.45 : distance;
  const y = useTransform(progress, [0, 1], [-travel, travel]);
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    zoom ? (mobile ? [1.04, 1, 1.04] : [1.08, 1, 1.08]) : [1, 1, 1]
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
