"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { GhostMark } from "@/components/motion/GhostMark";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useScrollTarget } from "@/hooks/useScrollTarget";

/**
 * The encode path, expressed as discrete stages so the sticky panel can walk
 * through them as the reader scrolls. Wording deliberately describes the
 * orchestration without asserting a compression ratio - that number is still
 * pending re-derivation.
 */
const pipeline = [
  { label: "Input image", detail: "Raw bitmap, full detail, uncompressed." },
  { label: "Attention pass", detail: "CBAM and an attention-gated U-Net locate structure worth keeping." },
  { label: "Residual CNN", detail: "Predicts self-similar block candidates instead of searching for them." },
  { label: "Quad-tree split", detail: "Detail-dense regions subdivide further; flat regions stay coarse." },
  { label: "Encoded output", detail: "High ratio with detail retained, in a short encode time." },
];

export function DeepFractFeature() {
  const project = projectsData.find((p) => p.slug === "deepfract");
  if (!project) return null;
  return <DeepFractFeatureActive project={project} />;
}

function DeepFractFeatureActive({
  project,
}: {
  project: NonNullable<ReturnType<typeof projectsData.find>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [stage, setStage] = useState(0);
  const openAll = Boolean(reduced || mobile);

  const { scrollYProgress } = useScrollTarget(ref, ["start center", "end end"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(pipeline.length - 1, Math.max(0, Math.floor(v * pipeline.length)));
    setStage(next);
  });

  return (
    <section id="work" className="relative overflow-hidden border-t border-border-subtle py-20 md:py-32">
      <Parallax distance={90} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-60" />
      </Parallax>
      <GhostMark className="-top-6 left-0 w-full">DEEPFRACT</GhostMark>

      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <Reveal variant="mask">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <p className="eyebrow mb-3 md:mb-4">Fig. 01 — Flagship</p>
              <h2 className="text-[clamp(2.25rem,8vw,4.5rem)] font-medium leading-[0.95] tracking-tight">
                DeepFract
              </h2>
            </div>
            <p className="max-w-md text-base leading-snug text-foreground/60 md:text-lg">
              {project.description}
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky panel: identity + live pipeline state */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass edge-light relative overflow-hidden p-5 sm:p-6">
              <div className="relative mx-auto aspect-square w-full max-w-[200px] sm:max-w-[260px]">
                <Image
                  src={project.image!}
                  alt="DeepFract logo"
                  fill
                  sizes="(max-width: 640px) 200px, 260px"
                  className="object-contain sm:animate-float"
                  priority
                />
              </div>

              <div className="mt-8 border-t border-border-subtle pt-6">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  Encode pipeline
                </p>

                <ol className="space-y-3">
                  {pipeline.map((step, i) => {
                    const active = i === stage;
                    const done = i < stage;
                    return (
                      <li key={step.label} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 ${
                            active
                              ? "scale-150 bg-accent-glow shadow-[0_0_12px_var(--accent-glow)]"
                              : done
                                ? "bg-accent/60"
                                : "bg-border-strong"
                          }`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-500 ${
                              active ? "text-foreground" : "text-foreground/40"
                            }`}
                          >
                            {step.label}
                          </span>
                          <motion.span
                            initial={false}
                            animate={{
                              height: active || openAll ? "auto" : 0,
                              opacity: active || openAll ? 1 : 0,
                            }}
                            transition={{ duration: 0.35 }}
                            className="block overflow-hidden text-sm leading-snug text-foreground/55"
                          >
                            {step.detail}
                          </motion.span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* Scrolling narrative */}
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/80">
                {project.fullDescription}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <blockquote className="pull-quote my-12 border-l-2 border-accent pl-6 text-foreground">
                Several specialised models, orchestrated — so ratio and detail
                both stay high without paying for it in encode time.
              </blockquote>
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
                <div>
                  <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    Stack
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-border-subtle bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
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
      </div>
    </section>
  );
}
