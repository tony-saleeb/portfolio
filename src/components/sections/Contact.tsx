import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { GhostMark } from "@/components/motion/GhostMark";

const links = [
  {
    label: "Email",
    value: "tonysaleeb23@gmail.com",
    href: "mailto:tonysaleeb23@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/tony-saleeb",
    href: "https://github.com/tony-saleeb",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "in/antony-saleeb",
    href: "https://linkedin.com/in/antony-saleeb-2588a625a",
    icon: LinkedinIcon,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border-subtle py-20 md:py-40"
    >
      <Parallax distance={70} className="absolute inset-x-0 -top-1/4 -z-10 h-[150%]">
        <div aria-hidden="true" className="light-wash h-full w-full opacity-70" />
      </Parallax>
      <GhostMark className="bottom-0 left-0 w-full" from={10} to={-14}>
        LET&rsquo;S TALK
      </GhostMark>

      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal variant="mask">
              <p className="eyebrow mb-6">Contact</p>
            </Reveal>

            <Reveal variant="mask" delay={0.05}>
              <Parallax distance={-56}>
                <h2 className="mb-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
                  Open to full-stack, mobile, and{" "}
                  <span className="text-gradient">applied&nbsp;AI</span> roles.
                </h2>
              </Parallax>
            </Reveal>

            <Reveal delay={0.1}>
              <Parallax distance={32}>
                <p className="mb-10 max-w-xl text-lg text-foreground/60">
                  Get in touch directly — no form, no gatekeeping.
                </p>
              </Parallax>
            </Reveal>

            <Reveal delay={0.15}>
              <Magnetic className="block w-full sm:inline-block sm:w-auto">
                <a
                  href="mailto:tonysaleeb23@gmail.com"
                  className="glow-accent sheen group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition-transform duration-300 active:scale-[0.98] sm:w-auto sm:justify-start sm:rounded-none sm:hover:scale-[1.03]"
                >
                  Start a conversation
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <article className="edge-light relative overflow-hidden border border-border-subtle bg-background-elevated p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="relative mb-8 flex items-start justify-between gap-4">
                <BrandMark />
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                  Cairo · EG
                </span>
              </div>

              <p className="relative text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                Antony Saleeb
              </p>
              <p className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Full-Stack &amp; Applied-AI
              </p>

              <ul className="relative mt-8 divide-y divide-border-subtle border-y border-border-subtle">
                {links.map(({ label, value, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 py-3.5 transition-colors"
                    >
                      <Icon
                        size={16}
                        className="shrink-0 text-foreground/35 transition-colors group-hover:text-accent"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/35">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-foreground/85 transition-colors group-hover:text-accent">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-foreground/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
                Available for roles &amp; collaborations
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
