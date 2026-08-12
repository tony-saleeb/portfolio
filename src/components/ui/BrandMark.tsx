"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AS_GRADIENTS, AS_SHARDS, AS_VIEWBOX } from "@/components/ui/asMarkShards";
import { useIsMounted } from "@/hooks/useIsMounted";

/**
 * Animated AS mark for the top nav.
 * Paths stay static through SSR/hydration, then assemble on the client
 * so Framer Motion never mismatches server HTML.
 */
export function BrandMark({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const live = useIsMounted();
  const animate = live && !reduced;

  return (
    <motion.span
      className={`relative inline-flex h-8 w-[3.55rem] items-center sm:h-9 sm:w-16 ${className ?? ""}`}
      aria-label="AS"
      whileHover={animate ? { scale: 1.05 } : undefined}
      whileTap={animate ? { scale: 0.96 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <svg
        viewBox={AS_VIEWBOX}
        className="h-full w-full overflow-visible"
        role="img"
        aria-hidden="true"
      >
        <defs dangerouslySetInnerHTML={{ __html: AS_GRADIENTS }} />
        <title>AS</title>

        {AS_SHARDS.map((shard, i) => {
          const fillOpacity = shard.opacity ? Number(shard.opacity) : 1;

          if (!animate) {
            return (
              <path
                key={i}
                d={shard.d}
                fill={shard.fill}
                fillOpacity={fillOpacity}
              />
            );
          }

          const delay = 0.05 + i * 0.032;
          const angle = (i / AS_SHARDS.length) * Math.PI * 2;
          const dist = 28 + (i % 4) * 10;
          // Fixed precision avoids SSR/client float string mismatches
          const x = Number((Math.cos(angle) * dist).toFixed(2));
          const y = Number((Math.sin(angle) * dist).toFixed(2));

          return (
            <motion.path
              key={i}
              d={shard.d}
              fill={shard.fill}
              fillOpacity={fillOpacity}
              initial={{ opacity: 0, scale: 0.55, x, y }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.65,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
            />
          );
        })}
      </svg>
    </motion.span>
  );
}
