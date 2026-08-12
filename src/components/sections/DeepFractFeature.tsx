"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { GhostMark } from "@/components/motion/GhostMark";
import { DeepFractLaptop } from "@/components/sections/DeepFractLaptop";

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
    </section>
  );
}
