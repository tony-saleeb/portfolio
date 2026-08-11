"use client";
import { useEffect, useState } from "react";

const stops = [
  { id: "home", num: "01", label: "Intro" },
  { id: "work", num: "02", label: "Work" },
  { id: "background", num: "03", label: "Background" },
  { id: "stack", num: "04", label: "Stack" },
  { id: "contact", num: "05", label: "Contact" },
];

/*
 * A running index pinned to the true viewport edge (not the content gutter),
 * so it can never collide with the container at any width. Dots-only by
 * default; the number/label only appears on hover/focus, as an absolutely
 * positioned tooltip that doesn't affect the rail's own footprint. Works as
 * a plain anchor list with no JS - the active-section highlight is the only
 * part that needs it.
 */
export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = stops
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-5"
    >
      <span aria-hidden="true" className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border-subtle" />
      {stops.map((stop) => {
        const isActive = active === stop.id;
        return (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-label={`${stop.num} — ${stop.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center py-1"
          >
            <span
              className={`relative z-10 block rounded-full transition-all duration-500 ${
                isActive
                  ? "w-2 h-2 bg-accent-glow shadow-[0_0_10px_var(--accent-glow)]"
                  : "w-1.5 h-1.5 bg-border-strong group-hover:bg-accent/70"
              }`}
            />
            <span
              className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                isActive ? "text-accent" : "text-foreground/70"
              }`}
            >
              {stop.num} &mdash; {stop.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
