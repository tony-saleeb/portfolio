"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** Reading-progress hairline pinned under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent to-accent-glow"
      style={{ scaleX }}
    />
  );
}
