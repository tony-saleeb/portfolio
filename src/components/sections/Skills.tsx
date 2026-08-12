"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GhostMark } from "@/components/motion/GhostMark";
import { Parallax } from "@/components/motion/Parallax";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";
import { useScrollMotion } from "@/hooks/useScrollMotion";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "REST APIs"],
  },
  {
    title: "Mobile",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "AI / Data",
    skills: ["PyTorch", "Computer Vision", "Attention models"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Supabase"],
  },
];

/** Per-column travel — alternating depths so the row shears as you scroll. */
const COLUMN_MOTION = [
  { y: 110, rotate: -1.6, x: 14 },
  { y: -78, rotate: 1.2, x: -8 },
  { y: 96, rotate: -0.8, x: 4 },
  { y: -88, rotate: 1.5, x: -12 },
  { y: 72, rotate: -1.1, x: 10 },
] as const;

const marqueeItems = skillGroups.flatMap((g) => g.skills);

export function Skills() {
  return (
    <section
      id="stack"
      className="relative overflow-x-clip border-t border-border-subtle py-20 md:py-32"
    >
      <Parallax distance={100} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-40" />
      </Parallax>
      <GhostMark className="bottom-4 left-0 w-full" from={-22} to={18}>
        TOOLING
      </GhostMark>

      {/* Endless ticker of the stack, doubled so the loop is seamless */}
      <div className="relative mb-14 flex overflow-hidden border-y border-border-subtle py-4 md:mb-20 md:py-5">
        <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-10 font-mono text-sm uppercase tracking-[0.18em] text-foreground/45"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent"
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <Reveal variant="mask">
          <Parallax distance={-56}>
            <h2 className="mb-10 text-[clamp(2rem,4.5vw,3.25rem)] font-medium tracking-tight md:mb-14">
              Stack
            </h2>
          </Parallax>
        </Reveal>

        <StackColumns />
      </div>
    </section>
  );
}

function StackColumns() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScrollTarget(trackRef, ["start end", "end start"]);
  const progress = useScrollMotion(scrollYProgress);

  return (
    <div
      ref={trackRef}
      className="relative -mx-1 px-1 py-10 md:py-16"
    >
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {skillGroups.map((group, i) => (
          <RevealItem key={group.title} className="h-full">
            <StackColumn
              index={i}
              progress={progress}
              reduced={!!reduced}
              mobile={mobile}
              title={group.title}
              skills={group.skills}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

function StackColumn({
  index,
  progress,
  reduced,
  mobile,
  title,
  skills,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  mobile: boolean;
  title: string;
  skills: string[];
}) {
  const motionCfg = COLUMN_MOTION[index];
  const factor = mobile ? 0.4 : 1;
  const yTravel = motionCfg.y * factor;
  const xTravel = motionCfg.x * factor;
  const rotTravel = motionCfg.rotate * factor;

  const y = useTransform(progress, [0, 1], [-yTravel, yTravel]);
  const x = useTransform(progress, [0, 1], [-xTravel, xTravel]);
  const rotate = useTransform(progress, [0, 1], [-rotTravel, rotTravel]);

  const card = (
    <div className="edge-light group h-full border border-border-subtle bg-background p-6 transition-colors duration-500 hover:bg-surface">
      <div className="mb-6 flex items-baseline justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          {title}
        </h3>
        <span className="font-mono text-[10px] text-foreground/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="flex items-center gap-2.5 text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90"
          >
            <span className="h-px w-3 bg-accent/50 transition-all duration-500 group-hover:w-5" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );

  if (reduced) {
    // Static staircase so the row still has rhythm without scroll motion
    const offset = (index - 2) * 12;
    return (
      <div className="h-full" style={{ transform: `translateY(${offset}px)` }}>
        {card}
      </div>
    );
  }

  return (
    <motion.div
      className="h-full will-change-transform"
      style={{
        y,
        x,
        rotate,
        backfaceVisibility: "hidden",
      }}
    >
      {card}
    </motion.div>
  );
}
