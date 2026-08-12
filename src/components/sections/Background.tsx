import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { GhostMark } from "@/components/motion/GhostMark";

const timeline = [
  {
    date: "2026",
    title: "B.Sc. Computer Science",
    org: "MTI University",
    description:
      "Software engineering, AI, and scalable full-stack applications. Active in coding competitions and hackathons.",
  },
  {
    date: "2023 — Present",
    title: "Freelance Full-Stack Developer",
    org: "Self-employed",
    description:
      "Custom web and mobile applications for clients — real-time event platforms, AI-enhanced mobile tools, and everything in between.",
  },
];

export function Background() {
  return (
    <section
      id="background"
      className="relative overflow-x-clip border-t border-border-subtle py-20 md:py-32"
    >
      <GhostMark className="left-0 top-10 w-full" from={-10} to={14}>
        BACKGROUND
      </GhostMark>

      <div className="container relative mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-16 xl:gap-20">
          <div>
            <Reveal variant="mask">
              <Parallax distance={-36}>
                <h2 className="mb-8 text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-tight md:mb-10">
                  Background
                </h2>
              </Parallax>
            </Reveal>

            <Reveal>
              <Parallax distance={24}>
                <p className="mb-5 max-w-2xl text-lg leading-relaxed text-foreground/80 md:mb-6 md:text-xl">
                  I am a Computer Science graduate (MTI University, 2026) who builds
                  AI-assisted, full-stack applications — from mobile UI through
                  backend infrastructure.
                </p>
              </Parallax>
            </Reveal>

            <Reveal delay={0.05}>
              <Parallax distance={40}>
                <p className="max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg">
                  I care about building things that work under real constraints, with
                  real users and real data, not just in a tutorial. Whether it&apos;s
                  real-time syncing for multiplayer apps, orchestrating models for a
                  hard vision problem, or architecting a backend, I bring ideas to
                  life with clean, maintainable code.
                </p>
              </Parallax>
            </Reveal>

            <RevealGroup className="mt-10 space-y-px overflow-hidden border border-border-subtle bg-border-subtle md:mt-14">
              {timeline.map((item, i) => (
                <RevealItem key={item.title}>
                  <Parallax distance={i === 0 ? 18 : -22}>
                    <div className="edge-light group bg-background p-5 transition-colors duration-500 hover:bg-surface sm:flex sm:gap-8 sm:p-6">
                      <p className="mb-2 shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:mb-0 sm:w-36">
                        {item.date}
                      </p>
                      <div>
                        <h3 className="text-lg font-medium sm:text-xl">{item.title}</h3>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-foreground/40">
                          {item.org}
                        </p>
                        <p className="leading-relaxed text-foreground/60">{item.description}</p>
                      </div>
                    </div>
                  </Parallax>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="order-first lg:order-0 lg:pt-16">
            <Parallax distance={-48}>
              <figure className="mx-auto w-full max-w-[220px] sm:max-w-[240px] lg:max-w-none">
                <div className="relative border border-border-subtle">
                  <ParallaxImage
                    src="/tony.jpeg"
                    alt="Antony Saleeb"
                    className="aspect-4/5 w-full bg-background-elevated"
                    imageClassName="object-cover object-top"
                    travel={12}
                    sizes="240px"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    Antony Saleeb
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
                    Cairo
                  </p>
                </figcaption>
              </figure>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
