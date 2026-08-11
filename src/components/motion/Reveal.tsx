"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "mask" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const build = (variant: RevealVariant, duration: number, delay: number): Variants => {
  const transition = { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  switch (variant) {
    case "mask":
      return {
        hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 24 },
        shown: { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0, transition },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        shown: { opacity: 1, scale: 1, transition },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
        shown: { opacity: 1, filter: "blur(0px)", y: 0, transition },
      };
    default:
      return {
        hidden: { opacity: 0, y: 32 },
        shown: { opacity: 1, y: 0, transition },
      };
  }
};

/**
 * Scroll-triggered entrance. Under `prefers-reduced-motion` the children are
 * rendered in their final state with no animation and no transform, rather
 * than being animated more slowly.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={build(variant, duration, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any `RevealItem` descendants as the group enters view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={build(variant, 0.65, 0)}>
      {children}
    </motion.div>
  );
}
