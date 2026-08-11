"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

/**
 * BT2 phone gallery — scroll-driven filmstrip. Mobile skips rotation/scale
 * and uses direct scroll mapping so the strip stays butter-smooth.
 */
export function Showcase() {
  const project = projectsData.find((p) => p.slug === "bt2");
  const screens = project?.gallery ?? [];
  if (screens.length === 0) return null;
  return <ShowcaseActive screens={screens} />;
}

function ShowcaseActive({ screens }: { screens: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);

  const x = useTransform(progress, [0, 1], mobile ? ["8%", "-55%"] : ["12%", "-62%"]);
  const rotateDesktop = useSpring(
    useTransform(scrollYProgress, [0, 1], [2.5, -2.5]),
    { stiffness: 60, damping: 24 }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border-subtle py-20 md:py-32"
    >
      <div className="container mx-auto mb-10 px-5 sm:px-6 md:mb-14 md:px-12">
        <Reveal variant="mask">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="eyebrow mb-3 sm:mb-4">Fig. 02 — In the app</p>
              <h2 className="text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-tight">
                BT2 — numerical methods, visualised
              </h2>
            </div>
            <Link
              href="/projects/bt2"
              className="link-underline py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent"
            >
              Open case study
            </Link>
          </div>
        </Reveal>
      </div>

      {reduced ? (
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:gap-5 sm:px-6 md:px-12">
          {screens.map((src, i) => (
            <div key={src} className="snap-center">
              <Screen src={src} alt={`BT2 screen ${i + 1}`} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          style={{
            x,
            rotate: mobile ? 0 : rotateDesktop,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          className="flex w-max gap-4 px-5 sm:gap-5 sm:px-6 md:px-12"
        >
          {screens.map((src, i) => (
            <ParallaxScreen
              key={src}
              src={src}
              alt={`BT2 screen ${i + 1}`}
              progress={progress}
              index={i}
              lite={mobile}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}

function ParallaxScreen({
  src,
  alt,
  progress,
  index,
  lite,
}: {
  src: string;
  alt: string;
  progress: MotionValue<number>;
  index: number;
  lite: boolean;
}) {
  const depth = lite ? [36, -28, 20][index % 3] : [70, -46, 28][index % 3];
  const y = useTransform(progress, [0, 1], [depth, -depth]);
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    lite ? [1, 1, 1] : [0.94, 1, 0.94]
  );

  return (
    <motion.div style={{ y, scale, willChange: "transform", backfaceVisibility: "hidden" }}>
      <Screen src={src} alt={alt} />
    </motion.div>
  );
}

function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-[152px] shrink-0 overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background-elevated p-1.5 sm:w-[180px] md:w-[210px]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.4rem]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 152px, 210px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
