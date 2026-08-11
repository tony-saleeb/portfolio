"use client";
import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollTarget } from "@/hooks/useScrollTarget";

/**
 * Image that drifts inside its own frame as the frame scrolls past, so the
 * subject and its container move at different rates. Overscaled on purpose -
 * without the extra height the drift would expose the frame edges.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  travel = 14,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  travel?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScrollTarget(ref);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          y: reduced ? 0 : y,
          top: `-${travel}%`,
          bottom: `-${travel}%`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={imageClassName}
          />
        </div>
      </motion.div>
    </div>
  );
}
