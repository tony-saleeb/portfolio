"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { GhostMark } from "@/components/motion/GhostMark";
import { DeepFractLaptop } from "@/components/sections/DeepFractLaptop";
import { SkillMark } from "@/components/ui/SkillMark";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";

const PARTITION = [
  { name: "PyTorch", role: "Models", index: "03", cell: "hero", delay: "0s", signal: "4.8s" },
  { name: "Flutter", role: "Client", index: "01", cell: "tile", delay: "1.2s", signal: "0s" },
  { name: "FastAPI", role: "Inference", index: "02", cell: "tile", delay: "2.4s", signal: "2.4s" },
  { name: "Python", role: "Runtime", index: "04", cell: "base", delay: "3.6s", signal: "7.2s" },
  { name: "Computer Vision", role: "Perception", index: "05", cell: "field", delay: "4.8s", signal: "9.6s" },
] as const;

/** One spring for the plate and every layer inside it. Heavier than the site default so the drift glides. */
const DEPTH_SPRING = { stiffness: 52, damping: 26, mass: 0.9 } as const;

type Layer = (typeof PARTITION)[number];

/** Scroll offsets for the fields inside the partition. Type stays put. */
type Depth = {
  gridX: MotionValue<number>;
  gridY: MotionValue<number>;
  glowY: MotionValue<number>;
  nodeY: MotionValue<number>;
  latticeX: MotionValue<number>;
  latticeY: MotionValue<number>;
  iconY: MotionValue<number>;
};

function StackPath({ tags }: { tags: string[] }) {
  const present = new Set(tags);
  const placed = PARTITION.filter((layer) => present.has(layer.name));
  const used = new Set<string>(placed.map((layer) => layer.name));
  const extras = tags.filter((tag) => !used.has(tag));
  const composed = placed.length === PARTITION.length;

  return (
    <div className="relative left-1/2 w-[min(56rem,calc(100vw-2.5rem))] -translate-x-1/2 sm:w-[min(56rem,calc(100vw-4rem))]">
      <div className="mb-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40">
            Stack
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Partition
          </p>
        </div>
        <p className="mt-2 max-w-md text-lg leading-snug tracking-tight text-foreground/75 sm:text-xl">
          One cell per job — the same cut the encoder makes.
        </p>
      </div>

      {composed ? (
        <Partition tags={placed} />
      ) : (
        <ul className="flex flex-col gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {extras.length > 0 && composed && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {extras.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Partition({ tags }: { tags: readonly Layer[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScrollTarget(ref);
  const eased = useSpring(scrollYProgress, DEPTH_SPRING);
  const progress = mobile || reduced ? scrollYProgress : eased;
  const k = reduced ? 0 : mobile ? 0.45 : 1;

  const plateY = useTransform(progress, [0, 1], [14 * k, -16 * k]);
  const depth: Depth = {
    gridX: useTransform(progress, [0, 1], [-10 * k, 12 * k]),
    gridY: useTransform(progress, [0, 1], [16 * k, -20 * k]),
    glowY: useTransform(progress, [0, 1], [-14 * k, 18 * k]),
    nodeY: useTransform(progress, [0, 1], [6 * k, -10 * k]),
    latticeX: useTransform(progress, [0, 1], [-8 * k, 12 * k]),
    latticeY: useTransform(progress, [0, 1], [12 * k, -18 * k]),
    iconY: useTransform(progress, [0, 1], [4 * k, -6 * k]),
  };

  return (
    <div ref={ref}>
      <motion.div style={{ y: plateY }} className="relative overflow-hidden bg-accent/40 p-px">
        <ol className="grid grid-cols-2 gap-px sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:grid-rows-[9.25rem_9.25rem_7.75rem]">
          {tags.map((layer) => (
            <Cell key={layer.name} layer={layer} depth={depth} />
          ))}
        </ol>
      </motion.div>
    </div>
  );
}

function Cell({ layer, depth }: { layer: Layer; depth: Depth }) {
  const placement =
    layer.cell === "hero"
      ? "col-span-2 min-h-52 sm:col-span-1 sm:row-span-2 sm:min-h-0"
      : layer.cell === "base" || layer.cell === "field"
        ? "col-span-2 min-h-28 sm:col-span-1 sm:min-h-0"
        : "min-h-32";

  return (
    <li className={`relative flex flex-col overflow-hidden bg-background p-4 sm:p-5 ${placement}`}>
      {layer.cell === "hero" && <HeroField depth={depth} />}
      {layer.cell === "field" && <PerceptionLattice depth={depth} />}
      {layer.cell === "tile" && layer.name === "Flutter" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent"
        />
      )}
      {layer.cell === "base" && (
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-accent/70" />
      )}
      <span aria-hidden className="df-signal pointer-events-none absolute inset-0" style={{ animationDelay: layer.signal }} />

      <div className="relative z-1 flex items-center justify-between">
        <span className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-accent">
          {layer.index}
        </span>
        <span className="df-float" style={{ animationDelay: layer.delay }}>
          <motion.span style={{ y: depth.iconY }} className="block text-accent">
            <SkillMark name={layer.name} size={layer.cell === "hero" ? 22 : 16} />
          </motion.span>
        </span>
      </div>

      <div className="relative z-1 mt-auto pt-6">
        <p
          className={
            layer.cell === "hero"
              ? "text-[clamp(2.6rem,6vw,3.75rem)] leading-[0.88] font-medium tracking-tight"
              : "text-[1.35rem] leading-none font-medium tracking-tight sm:text-[1.65rem]"
          }
        >
          {layer.name}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
          {layer.role}
        </p>
      </div>
    </li>
  );
}

function HeroField({ depth }: { depth: Depth }) {
  return (
    <>
      <motion.span
        aria-hidden
        style={{ y: depth.glowY }}
        className="pointer-events-none absolute -inset-y-10 inset-x-0 bg-[radial-gradient(ellipse_at_28%_30%,color-mix(in_oklab,var(--accent-glow)_32%,transparent),transparent_58%)]"
      />
      <motion.svg
        aria-hidden
        viewBox="0 0 100 70"
        preserveAspectRatio="none"
        style={{ x: depth.gridX, y: depth.gridY }}
        className="pointer-events-none absolute -top-[12%] -left-[8%] h-[84%] w-[116%] text-accent/35"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.35">
          <path d="M50 0 V70 M0 34 H100" />
          <path d="M25 0 V34 M0 17 H50 M75 34 V70 M50 52 H100" />
        </g>
      </motion.svg>
      <span aria-hidden className="pointer-events-none absolute top-[36%] left-1/2 -translate-x-1/2">
        <motion.span
          style={{ y: depth.nodeY }}
          className="df-node block h-1.5 w-1.5 rounded-full bg-accent-glow shadow-[0_0_14px_var(--accent-glow)]"
        />
      </span>
    </>
  );
}

function PerceptionLattice({ depth }: { depth: Depth }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(100deg,transparent,black_42%)]"
    >
      <motion.span
        style={{ x: depth.latticeX, y: depth.latticeY }}
        className="df-lattice absolute -inset-12 opacity-70 [background-image:radial-gradient(circle,var(--accent)_0.7px,transparent_0.85px)] [background-size:13px_13px]"
      />
    </span>
  );
}

export function DeepFractFeature() {
  const project = projectsData.find((p) => p.slug === "deepfract");
  if (!project) return null;

  return (
    <section id="work" className="relative overflow-x-clip border-t border-border-subtle">
      <Parallax distance={90} className="pointer-events-none absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-60" />
      </Parallax>

      {/* Laptop dive — sticky hosts DEEPFRACT watermark (opaque panel would cover a section-level one) */}
      <DeepFractLaptop />

      {/* Write-up coda */}
      <div className="container relative mx-auto px-5 pb-20 sm:px-6 md:px-12 md:pb-32">
        <GhostMark className="left-0 top-8 w-full" from={8} to={-10}>
          DEEPFRACT
        </GhostMark>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Parallax distance={30}>
              <p className="text-lg leading-relaxed text-foreground/80">
                {project.fullDescription}
              </p>
            </Parallax>
          </Reveal>

          <Reveal delay={0.05}>
            <Parallax distance={-24}>
              <blockquote className="pull-quote my-12 border-l-2 border-accent pl-6 text-foreground">
                Several specialised models, orchestrated — so ratio and detail
                both stay high without paying for it in encode time.
              </blockquote>
            </Parallax>
          </Reveal>

          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Classical fractal compression is slow because the encoder searches
              an enormous space of block self-similarities. DeepFract splits that
              job across specialised networks that each handle one part of the
              decision, then uses quad-tree partitioning to spend detail only
              where the image actually needs it.
            </p>
          </Reveal>

          <div className="mt-16 space-y-10">
            <Reveal>
              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  Hard parts
                </h3>
                <ul className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <li key={c} className="group flex gap-4 border-b border-border-subtle pb-4">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed text-foreground/75">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <StackPath tags={project.tags} />
            </Reveal>

            <Reveal>
              <div className="border-t border-border-subtle pt-6">
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  Methodology &amp; results
                </h3>
                <p className="leading-relaxed text-foreground/60">
                  Evaluated on rate–distortion — compression ratio against PSNR —
                  versus classical fractal and transform-coding baselines. The
                  benchmark set is being re-verified against a fixed test corpus
                  before the headline numbers go up here.
                </p>
                {/*
                  TODO(phase-1, deepfract metric): replace the paragraph above with
                  the verified rate-distortion chart (bpp vs PSNR) plus the derived
                  ratio and a named baseline comparison. Do not restore the old
                  "7,167x at 40.57 dB" figure without re-derivation.
                */}
              </div>
            </Reveal>

            <Reveal>
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent"
              >
                <span className="link-underline">Full write-up</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
