"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BrandMark } from "@/components/ui/BrandMark";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Background", href: "#background" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div
          className={`flex h-12 items-center justify-between px-3 transition-all duration-500 sm:px-4 ${
            scrolled || isOpen
              ? "glass rounded-2xl shadow-lg shadow-black/20 sm:rounded-full"
              : "border border-transparent"
          }`}
        >
          <Link
            href="/#home"
            aria-label="Home"
            className="inline-flex items-center text-foreground transition-colors hover:text-foreground/80"
            onClick={() => setIsOpen(false)}
          >
            <BrandMark />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <div className="ml-1 flex items-center gap-5 border-l border-border-subtle pl-5">
              <ThemeToggle />
              <a
                href="/Antony_Saleeb_Fakhry_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-background"
              >
                Résumé
              </a>
            </div>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="glass absolute inset-x-3 top-[calc(100%-0.25rem)] z-50 flex max-h-[min(80svh,calc(100svh-5rem))] flex-col overflow-y-auto rounded-2xl py-6 sm:inset-x-6 md:hidden"
        >
          <div className="flex flex-col items-stretch gap-1 px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-xl px-4 py-3.5 font-mono text-sm uppercase tracking-[0.16em] text-foreground/85 transition-colors active:bg-surface hover:bg-surface hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/Antony_Saleeb_Fakhry_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mx-4 inline-flex items-center justify-center border border-accent/40 px-4 py-3.5 font-mono text-sm uppercase tracking-[0.16em] text-accent"
              onClick={() => setIsOpen(false)}
            >
              Résumé
            </a>
            <div className="flex justify-center pt-5">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Tap outside to close */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 -z-10 bg-background/50 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
