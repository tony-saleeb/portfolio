import { ArrowUpRight } from "lucide-react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
        <Reveal variant="mask">
          <p className="eyebrow mb-6">Contact</p>
        </Reveal>

        <Reveal variant="mask" delay={0.05}>
          <h2 className="mb-6 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
            Open to full-stack, mobile, and{" "}
            <span className="text-gradient">applied&nbsp;AI</span> roles.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-12 max-w-xl text-lg text-foreground/60">
            Get in touch directly — no form, no gatekeeping.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Magnetic className="mb-12 block w-full sm:mb-16 sm:inline-block sm:w-auto">
            <a
              href="mailto:tonysaleeb23@gmail.com"
              className="glow-accent sheen group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition-transform duration-300 active:scale-[0.98] sm:w-auto sm:justify-start sm:rounded-none sm:hover:scale-[1.03]"
            >
              Start a conversation
              <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        </Reveal>

        <RevealGroup className="grid max-w-4xl gap-px overflow-hidden border border-border-subtle bg-border-subtle sm:grid-cols-3">
          {links.map(({ label, value, href, icon: Icon }) => (
            <RevealItem key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="edge-light group flex min-h-[5.5rem] h-full flex-col gap-3 bg-background p-5 transition-colors duration-500 active:bg-surface sm:p-6 sm:hover:bg-surface"
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    className="text-foreground/40 transition-colors group-hover:text-accent"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    {label}
                  </span>
                </span>
                <span className="break-all text-foreground/80 transition-colors group-hover:text-accent">
                  {value}
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
