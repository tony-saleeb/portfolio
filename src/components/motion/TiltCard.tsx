"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { useIsCoarsePointer } from "@/hooks/useMediaQuery";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the edges of the card. */
  intensity?: number;
  /** Renders a cursor-tracking highlight over the surface. */
  glare?: boolean;
}

/**
 * Pointer-tracked 3D tilt. Disabled for coarse pointers (touch) — tilt on a
 * phone just fights the scroll gesture and never settles.
 */
export function TiltCard({ children, className, intensity = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const [active, setActive] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.35 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), springCfg);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), springCfg);

  const glareLeft = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareTop = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(240px circle at ${glareLeft} ${glareTop}, color-mix(in oklab, var(--accent) 20%, transparent), transparent 70%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    setActive(false);
  };

  if (reduced || coarse) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={handleMove}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{ background: glareBg, opacity: active ? 1 : 0 }}
          />
        )}
      </motion.div>
    </div>
  );
}
