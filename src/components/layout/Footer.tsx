import { Code, Briefcase, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-foreground/60 mb-4 md:mb-0">
          © 2026 Antony Saleeb. Built with Next.js.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/tony-saleeb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Code size={20} />
          </a>
          <a
            href="https://linkedin.com/in/antony-saleeb-2588a625a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Briefcase size={20} />
          </a>
          <a
            href="mailto:tonysaleeb23@gmail.com"
            className="text-foreground/60 hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
