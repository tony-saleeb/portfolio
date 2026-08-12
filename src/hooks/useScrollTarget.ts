"use client";
import type { RefObject } from "react";
import { useScroll } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";

type ScrollOffsetOption = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Like useScroll({ target }), but waits until after mount before binding
 * the target. Avoids Motion's "Target ref is defined but not hydrated" error
 * under React Strict Mode / Next.js App Router, where a microtask can run
 * after an unmount leaves ref.current null.
 */
export function useScrollTarget(
  target: RefObject<HTMLElement | null>,
  offset: ScrollOffsetOption = ["start end", "end start"]
) {
  const ready = useIsMounted();

  return useScroll({
    target: ready ? target : undefined,
    offset,
  });
}
