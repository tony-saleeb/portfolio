"use client";
import { useSpring, type MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const DESKTOP_SPRING = { stiffness: 110, damping: 32, mass: 0.35 } as const;

/**
 * Desktop: spring-smoothed progress (cinematic lag).
 * Mobile: raw scroll progress — springs fight touch momentum and look glitchy.
 */
export function useScrollMotion(progress: MotionValue<number>): MotionValue<number> {
  const mobile = useIsMobile();
  const sprung = useSpring(progress, DESKTOP_SPRING);
  return mobile ? progress : sprung;
}
