"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export function AnimatedLogo() {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.4;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, duration: 1.5, ease: "easeInOut" },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  return (
    <Link href="/#home" aria-label="Home" className="group flex items-center relative z-50" data-cursor="hover">
      <div className="relative w-12 h-12">
        {/* Glow effect behind the SVG on hover */}
        <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <motion.svg
          width="56"
          height="56"
          viewBox="0 0 120 100"
          initial="hidden"
          animate="visible"
          className="overflow-visible relative z-10"
          fill="transparent"
        >
          {/* The "A" */}
          <motion.path
            d="M 17 85 L 37 15 L 57 85 M 25 60 L 49 60"
            variants={draw}
            custom={0}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-foreground group-hover:stroke-accent transition-colors duration-500"
          />
          
          {/* The "S" */}
          <motion.path
            d="M 95 25 C 95 10, 65 10, 65 30 C 65 50, 100 50, 100 70 C 100 90, 70 90, 70 75"
            variants={draw}
            custom={1}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-foreground group-hover:stroke-accent transition-colors duration-500"
          />

          {/* Accent dot */}
          <motion.circle
            cx="110"
            cy="85"
            r="5"
            className="fill-accent stroke-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
          />
        </motion.svg>
      </div>
    </Link>
  );
}
