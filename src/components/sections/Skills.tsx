import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GhostMark } from "@/components/motion/GhostMark";
import { Parallax } from "@/components/motion/Parallax";

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

const marqueeItems = skillGroups.flatMap((g) => g.skills);

export function Skills() {
  return (
    <section id="stack" className="relative overflow-hidden border-t border-border-subtle py-20 md:py-32">
      <Parallax distance={60} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-40" />
      </Parallax>
      <GhostMark className="bottom-4 left-0 w-full" from={-14} to={10}>
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
        {/* Fade the ticker into the page edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <Reveal variant="mask">
          <Parallax distance={-40}>
            <h2 className="mb-14 text-[clamp(2rem,4.5vw,3.25rem)] font-medium tracking-tight">
              Stack
            </h2>
          </Parallax>
        </Reveal>

        <RevealGroup className="grid gap-px overflow-hidden border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group, i) => (
            <RevealItem key={group.title} className="h-full">
              <Parallax distance={[28, -34, 22, -26, 30][i]} className="h-full">
                <div className="edge-light group h-full bg-background p-6 transition-colors duration-500 hover:bg-surface">
                  <div className="mb-6 flex items-baseline justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {group.title}
                    </h3>
                    <span className="font-mono text-[10px] text-foreground/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
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
              </Parallax>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
