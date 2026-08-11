import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, ImageOff } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return {};

  const title = `${project.title} | Antony Saleeb`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.image ? [{ url: project.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Parallax distance={60} className="absolute inset-x-0 -top-[10vh] -z-10 h-[90vh]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-70" />
      </Parallax>

      <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-12">
        <Link
          href="/#work"
          className="group mb-8 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40 transition-colors hover:text-accent sm:mb-12"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to work
        </Link>

        <Reveal variant="mask">
          <h1 className="mb-6 text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-tight">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mb-8 max-w-2xl text-xl leading-snug text-foreground/60">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mb-10 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="border border-border-subtle bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/60"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        {(project.liveUrl || project.githubUrl) && (
          <Reveal delay={0.15}>
            <div className="mb-20 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-accent sheen inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-background transition-transform duration-300 hover:scale-[1.03]"
                >
                  <ExternalLink size={15} />
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <GithubIcon size={15} />
                  Source
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* Hero visual */}
        <div className="mb-20">
          {project.imageDisplay === "contain" && project.image ? (
            <div className="glass edge-light mx-auto max-w-md p-8">
              <div className="relative aspect-square w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 80vw, 448px"
                  className="animate-float object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="glass relative aspect-video w-full overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/35">
                  <ImageOff size={26} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                    Preview coming soon
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_300px] md:gap-16">
          <div className="max-w-2xl space-y-14">
            <Reveal>
              <div>
                <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  Overview
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80">
                  {project.fullDescription}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  Hard parts
                </h2>
                <ul className="space-y-4">
                  {project.challenges.map((challenge, i) => (
                    <li
                      key={challenge}
                      className="flex gap-4 border-b border-border-subtle pb-4"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed text-foreground/75">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Parallax distance={-24} className="md:pt-4">
            <aside className="glass edge-light p-6">
              <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                Architecture
              </h2>
              <ul className="space-y-3">
                {project.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 border-b border-border-subtle pb-3 text-sm leading-snug text-foreground/70 last:border-0 last:pb-0"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </Parallax>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-28">
            <Reveal variant="mask">
              <h2 className="mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                Gallery
              </h2>
            </Reveal>

            <RevealGroup
              className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
              stagger={0.05}
            >
              {project.gallery.map((img, i) => (
                <RevealItem key={img} variant="scale">
                  <div className="group w-[62vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background-elevated p-1.5 transition-colors duration-300 hover:border-accent/40 sm:w-[230px]">
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.4rem]">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 62vw, 230px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </div>
  );
}
