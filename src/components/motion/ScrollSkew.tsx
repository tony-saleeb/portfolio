"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Velocity skew — desktop only. On mobile it fights iOS/Android momentum
 * scrolling and is the main source of "glitchy" parallax feel.
 */
export function ScrollSkew({
  children,
  className,
  max = 3,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 180, damping: 42, mass: 0.35 });

  const skewY = useTransform(smooth, [-2500, 0, 2500], [max, 0, -max], { clamp: true });
  const scaleY = useTransform(smooth, [-2500, 0, 2500], [1.03, 1, 1.03], { clamp: true });

  if (reduced || mobile) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ skewY, scaleY }}>
      {children}
    </motion.div>
  );
}
