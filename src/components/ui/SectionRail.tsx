"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";

const stops = [
  { id: "home", num: "01", label: "Intro" },
  { id: "work", num: "02", label: "Work" },
  { id: "background", num: "03", label: "Background" },
  { id: "stack", num: "04", label: "Stack" },
  { id: "contact", num: "05", label: "Contact" },
];

/**
 * Viewport probe: which section's top has most recently crossed this line
 * owns the active dot. More reliable than IntersectionObserver here — long
 * Gallery / Projects stretches between `#work` and `#background` leave the
 * narrow IO band empty, so the highlight used to freeze on Work.
 */
function readActiveId(): string {
  const probe = window.innerHeight * 0.38;
  let current = stops[0].id;

  for (const stop of stops) {
    const el = document.getElementById(stop.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probe) current = stop.id;
  }

  return current;
}

export function SectionRail() {
  const pathname = usePathname();
  const mounted = useIsMounted();
  const [active, setActive] = useState<string>(stops[0].id);

  const present =
    mounted &&
    pathname === "/" &&
    stops.some((s) => document.getElementById(s.id));

  useEffect(() => {
    if (!present) return;

    let frame = 0;

    const sync = () => {
      frame = 0;
      setActive(readActiveId());
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", sync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", sync);
    };
  }, [present]);

  if (!present) return null;

  return (
    <nav
      aria-label="Section index"
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-border-subtle"
      />
      {stops.map((stop) => {
        const isActive = active === stop.id;
        return (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-label={`${stop.num} — ${stop.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center py-1"
            onClick={() => setActive(stop.id)}
          >
            <span
              className={`relative z-10 block rounded-full transition-all duration-500 ${
                isActive
                  ? "h-2 w-2 bg-accent-glow shadow-[0_0_10px_var(--accent-glow)]"
                  : "h-1.5 w-1.5 bg-border-strong group-hover:bg-accent/70"
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
