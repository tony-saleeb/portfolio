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
import { Parallax } from "@/components/motion/Parallax";
import { GhostMark } from "@/components/motion/GhostMark";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

/** `filmstrip` = BT2-style lateral track. `cascade` = TechTips fan with reverse drift. */
type ShowcaseVariant = "filmstrip" | "cascade";

type ShowcaseProps = {
  slug: string;
  eyebrow: string;
  title: string;
  variant?: ShowcaseVariant;
};

/**
 * Scroll-driven phone gallery. Variants keep TechTips and BT2 visually distinct
 * while both staying scroll-linked. Mobile skips heavy rotate/scale.
 */
export function Showcase({
  slug,
  eyebrow,
  title,
  variant = "filmstrip",
}: ShowcaseProps) {
  const project = projectsData.find((p) => p.slug === slug);
  const screens = project?.gallery ?? [];
  if (screens.length === 0) return null;

  return (
    <ShowcaseActive
      screens={screens}
      eyebrow={eyebrow}
      title={title}
      href={`/projects/${slug}`}
      label={project!.title}
      variant={variant}
    />
  );
}

function ShowcaseActive({
  screens,
  eyebrow,
  title,
  href,
  label,
  variant,
}: {
  screens: string[];
  eyebrow: string;
  title: string;
  href: string;
  label: string;
  variant: ShowcaseVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScrollTarget(ref);
  const progress = useScrollMotion(scrollYProgress);

  // Filmstrip drifts left; cascade drifts the opposite way so the two sections
  // never feel like the same animation replayed.
  const xRange =
    variant === "cascade"
      ? mobile
        ? (["-28%", "6%"] as const)
        : (["-58%", "14%"] as const)
      : mobile
        ? (["4%", "-38%"] as const)
        : (["12%", "-62%"] as const);

  const x = useTransform(progress, [0, 1], [...xRange]);
  const rotateDesktop = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      variant === "cascade" ? [-3.2, 3.2] : [2.5, -2.5]
    ),
    { stiffness: 60, damping: 24 }
  );

  const ghost = label.toUpperCase();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border-subtle py-20 md:py-32"
    >
      <Parallax distance={55} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-30" />
      </Parallax>
      <GhostMark
        className="right-0 top-6 w-full"
        from={variant === "cascade" ? -12 : 10}
        to={variant === "cascade" ? 14 : -12}
      >
        {ghost}
      </GhostMark>

      <div className="container relative mx-auto mb-10 px-5 sm:px-6 md:mb-14 md:px-12">
        <Reveal variant="mask">
          <Parallax distance={variant === "cascade" ? 36 : -42}>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
              <div>
                <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p>
                <h2 className="text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-tight">
                  {title}
                </h2>
              </div>
              <Link
                href={href}
                className="link-underline py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent"
              >
                Open case study
              </Link>
            </div>
          </Parallax>
        </Reveal>
      </div>

      {reduced ? (
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:gap-5 sm:px-6 md:px-12">
          {screens.map((src, i) => (
            <div key={src} className="snap-center">
              <Screen src={src} alt={`${label} screen ${i + 1}`} />
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
          className={
            variant === "cascade"
              ? "flex w-max items-end gap-3 px-5 sm:gap-4 sm:px-6 md:gap-5 md:px-12"
              : "flex w-max gap-4 px-5 sm:gap-5 sm:px-6 md:px-12"
          }
        >
          {screens.map((src, i) =>
            // Cascade fan is desktop-only — on mobile both variants share the
            // gentler filmstrip depths so phones don't tip out of frame.
            variant === "cascade" && !mobile ? (
              <CascadeScreen
                key={src}
                src={src}
                alt={`${label} screen ${i + 1}`}
                progress={progress}
                index={i}
                lite={false}
              />
            ) : (
              <FilmstripScreen
                key={src}
                src={src}
                alt={`${label} screen ${i + 1}`}
                progress={progress}
                index={i}
                lite={mobile}
              />
            )
          )}
        </motion.div>
      )}
    </section>
  );
}

/** BT2: depth-layered lateral track with gentle scale breathe. */
function FilmstripScreen({
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
  const depth = lite ? [12, -10, 8][index % 3] : [70, -46, 28][index % 3];
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

/**
 * TechTips: fan cascade — phones tip individually, rise/fall on a sine-like
 * stagger, and ease opacity so the strip reads as a deck, not a conveyor.
 */
function CascadeScreen({
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
  const mid = (index - 5.5) / 5.5;
  const tip = lite ? mid * 4 : mid * 9;
  const rise = lite
    ? [18, -32, 26, -14, 22, -28][index % 6]
    : [48, -72, 56, -40, 64, -52][index % 6];

  const y = useTransform(progress, [0, 1], [rise, -rise * 0.85]);
  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    lite ? [tip * 0.35, tip, tip * 0.35] : [tip * 0.4, tip, -tip * 0.55]
  );
  const scale = useTransform(
    progress,
    [0, 0.45, 1],
    lite ? [1, 1, 1] : [0.88, 1.04, 0.9]
  );
  const opacity = useTransform(
    progress,
    [0, 0.2, 0.55, 1],
    lite ? [1, 1, 1, 1] : [0.55, 1, 1, 0.65]
  );

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        opacity,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transformOrigin: "50% 100%",
      }}
    >
      <Screen src={src} alt={alt} />
    </motion.div>
  );
}

function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-38 shrink-0 overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background-elevated p-1.5 sm:w-45 md:w-52.5">
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
