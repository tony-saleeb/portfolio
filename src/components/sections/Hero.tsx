"use client";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AuroraField } from "@/components/ui/AuroraField";
import { Magnetic } from "@/components/motion/Magnetic";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

const NAME = "Antony Saleeb";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScrollTarget(ref, ["start start", "end start"]);
  const p = useScrollMotion(scrollYProgress);

  // Strong enough to feel cinematic; not so extreme it tears on a phone refresh.
  const amp = mobile ? 0.45 : 1;
  const auroraY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${30 * amp}%`]);
  const auroraScale = useTransform(p, [0, 1], [1, reduced ? 1 : 1 + 0.28 * amp]);
  const ghostX = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${-14 * amp}%`]);
  const eyebrowY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${-100 * amp}%`]);
  const titleY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${-55 * amp}%`]);
  const bodyY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${-90 * amp}%`]);
  const ctaY = useTransform(p, [0, 1], ["0%", reduced ? "0%" : `${-130 * amp}%`]);
  const fade = useTransform(p, [0, 0.7], [1, reduced ? 1 : 0]);
  // Scroll-linked blur is a GPU tax on mobile — opacity-only fade instead.
  const blur = useTransform(
    p,
    [0, 1],
    ["blur(0px)", reduced || mobile ? "blur(0px)" : "blur(5px)"]
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-[max(5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <motion.div
        style={{ y: auroraY, scale: auroraScale, willChange: "transform", backfaceVisibility: "hidden" }}
        className="absolute inset-0 -z-30 origin-top"
      >
        <AuroraField className="h-full w-full opacity-90" />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,transparent_20%,var(--background)_95%)]"
      />

      <motion.span
        aria-hidden="true"
        style={{ x: ghostX }}
        className="pointer-events-none absolute left-0 top-[58%] -z-10 select-none whitespace-nowrap text-[28vw] font-medium leading-none tracking-tighter text-foreground/3.5 md:text-[22vw] md:text-foreground/3"
      >
        engineer · engineer ·
      </motion.span>

      <motion.div
        style={{
          opacity: fade,
          filter: blur,
          willChange: mobile ? "opacity" : "opacity, filter",
          backfaceVisibility: "hidden",
        }}
        className="container relative mx-auto w-full px-5 sm:px-6 md:px-12"
      >
        <div className="max-w-4xl">
          <motion.p
            style={{ y: eyebrowY }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow mb-6 flex items-center gap-3 sm:mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-glow" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-glow" />
            </span>
            Full-Stack &amp; Applied-AI Engineer
          </motion.p>

          <motion.h1
            style={{ y: titleY }}
            className="mb-6 text-[clamp(2.75rem,12vw,8rem)] font-medium leading-[0.92] tracking-tight sm:mb-8"
          >
            {NAME.split(" ").map((word, i) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduced ? undefined : { y: "110%" }}
                  animate={reduced ? undefined : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={i === 1 ? "text-gradient" : undefined}>{word}</span>
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            style={{ y: bodyY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mb-8 max-w-2xl text-lg leading-snug text-foreground/70 sm:mb-12 sm:text-xl md:text-2xl"
          >
            I build real-time systems and applied-AI products end to end — from
            orchestrated PyTorch models to the Flutter and Next.js apps that ship
            them.
          </motion.p>

          <motion.div
            style={{ y: ctaY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#work"
                className="glow-accent sheen group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition-transform duration-300 active:scale-[0.98] sm:w-auto sm:justify-start sm:py-3.5 sm:hover:scale-[1.04]"
              >
                See the work
                <ArrowUpRight size={15} />
              </a>
            </Magnetic>

            <div className="flex items-center justify-center gap-8 sm:justify-start">
              <a
                href={`/${encodeURIComponent("Antonyy Saleeb's CV.pdf")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline py-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60 transition-colors hover:text-foreground"
              >
                Résumé
              </a>
              <a
                href="#contact"
                className="link-underline py-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60 transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-foreground/35 transition-colors hover:text-accent"
      >
        <ArrowDown size={18} className="animate-float" />
      </motion.a>
    </section>
  );
}
