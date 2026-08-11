"use client";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

/**
 * Oversized word that slides horizontally with scroll.
 * Mobile keeps the effect with shorter travel so it doesn't fight touch scroll.
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

  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);
  const start = mobile ? from * 0.45 : from;
  const end = mobile ? to * 0.45 : to;
  const x = useTransform(progress, [0, 1], [`${start}%`, `${end}%`]);

  if (reduced) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none absolute select-none overflow-hidden ${className ?? ""}`}
      >
        <span className="block whitespace-nowrap text-[18vw] font-medium leading-none tracking-tighter text-foreground/[0.035]">
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute select-none overflow-hidden ${className ?? ""}`}
    >
      <motion.span
        style={{
          x,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="block whitespace-nowrap text-[20vw] font-medium leading-none tracking-tighter text-foreground/[0.04] md:text-[18vw] md:text-foreground/[0.035]"
      >
        {children}
      </motion.span>
    </div>
  );
}
