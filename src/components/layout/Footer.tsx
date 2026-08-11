import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const socials = [
  { href: "https://github.com/tony-saleeb", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://linkedin.com/in/antony-saleeb-2588a625a",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  { href: "mailto:tonysaleeb23@gmail.com", label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-border-subtle bg-background pb-[env(safe-area-inset-bottom)]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-5 py-8 sm:px-6 md:flex-row md:px-12">
        <p className="font-mono text-xs tracking-wide text-foreground/40">
          &copy; 2026 Antony Saleeb.
        </p>

        <div className="flex gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center border border-border-subtle text-foreground/50 transition-all duration-300 active:border-accent/50 active:text-accent sm:h-10 sm:w-10 sm:hover:-translate-y-0.5 sm:hover:border-accent/50 sm:hover:text-accent"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <div className="container mx-auto border-t border-border-subtle px-5 py-4 sm:px-6 md:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
          Set in Newsreader &amp; IBM Plex Mono. Built with Next.js.
          <span className="ml-2 text-accent/50" aria-hidden="true">
            &#9632;
          </span>
        </p>
      </div>
    </footer>
  );
}
