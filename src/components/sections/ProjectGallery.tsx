"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Project case-study gallery — horizontal snap strip with desktop arrow
 * controls flanking the screenshots. Does not touch homepage Showcase.
 */
export function ProjectGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync, images.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-gallery-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowClass =
    "hidden h-10 w-10 shrink-0 items-center justify-center self-center border border-border-subtle text-foreground/70 transition-colors hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-30 sm:inline-flex";

  return (
    <div className="mt-28">
      <Reveal variant="mask">
        <h2 className="mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
          Gallery
        </h2>
      </Reveal>

      <div className="flex items-stretch gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Previous screenshot"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className={arrowClass}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollerRef}
          className="hide-scrollbar min-w-0 flex-1 overflow-x-auto overscroll-x-contain pb-6"
        >
          <RevealGroup
            className="flex w-max snap-x snap-mandatory gap-5"
            stagger={0.05}
          >
            {images.map((img, i) => (
              <RevealItem key={img} variant="scale">
                <div
                  data-gallery-card
                  className="group w-[62vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background-elevated p-1.5 transition-colors duration-300 hover:border-accent/40 sm:w-57.5"
                >
                  <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.4rem]">
                    <Image
                      src={img}
                      alt={`${title} screenshot ${i + 1}`}
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

        <button
          type="button"
          aria-label="Next screenshot"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className={arrowClass}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
