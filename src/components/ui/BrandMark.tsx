"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Quiet lockup: real mono type, accent period, one entrance. No badge,
 * no sheen, no looping gimmicks — the kind of mark that stays out of the way.
 */
export function BrandMark({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <span
      className={`inline-flex items-baseline font-mono text-[1.05rem] font-semibold tracking-[0.22em] ${className ?? ""}`}
      aria-label="AS."
    >
      {"AS".split("").map((letter, i) => (
        <span key={letter} className="inline-block overflow-hidden leading-none">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.55,
              delay: 0.08 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}

      <motion.span
        aria-hidden="true"
        className="ml-[0.02em] text-accent-glow"
        initial={reduced ? false : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        .
      </motion.span>
    </span>
  );
}
