import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectsData, type Project } from "@/data/projects";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { GhostMark } from "@/components/motion/GhostMark";
import { Parallax } from "@/components/motion/Parallax";

function CardVisual({ project }: { project: Project }) {
  const isScreenshot =
    Boolean(project.cardImage) && project.cardImage !== project.image;
  const src = project.cardImage ?? project.image;

  if (!src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span className="text-[clamp(3rem,7vw,4.5rem)] font-medium leading-none text-gradient">
          <Counter to={80} />
        </span>
        <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
          concurrent players, live
        </span>
      </div>
    );
  }

  if (isScreenshot) {
    return (
      <Image
        src={src}
        alt={`${project.title} preview`}
        width={900}
        height={675}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]">
      <Image
        src={src}
        alt={project.title}
        width={420}
        height={420}
        className="h-[72%] w-auto max-w-[78%] object-contain drop-shadow-[0_12px_32px_color-mix(in_oklab,var(--accent)_35%,transparent)] transition-transform duration-700 group-hover:scale-[1.05]"
      />
    </div>
  );
}

export function Projects() {
  const rest = projectsData.filter((p) => p.slug !== "deepfract");

  const cardDepth = [-36, 28, -22];

  return (
    <section className="relative overflow-hidden border-t border-border-subtle py-20 md:py-32">
      <Parallax distance={70} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-35" />
      </Parallax>
      <GhostMark className="right-0 top-8 w-full" from={8} to={-16}>
        SELECTED WORK
      </GhostMark>

      <div className="container relative mx-auto px-5 sm:px-6 md:px-12">
        <Reveal variant="mask">
          <Parallax distance={-48}>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
              <h2 className="text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-tight">
                Also built
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                {String(rest.length).padStart(2, "0")} projects
              </p>
            </div>
          </Parallax>
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <RevealItem key={project.slug} variant="scale" className="h-full">
              <Parallax distance={cardDepth[i % cardDepth.length]} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="glass edge-light sheen group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent/40"
                  >
                    <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden border-b border-border-subtle bg-background-elevated transform-[translateZ(0)]">
                      <CardVisual project={project} />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
                          {project.title}
                        </h3>
                        <ArrowUpRight
                          size={18}
                          className="mt-1 shrink-0 text-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </div>

                      <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/60">
                        {project.description}
                      </p>

                      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                        {project.tags.slice(0, 4).map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </TiltCard>
              </Parallax>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
