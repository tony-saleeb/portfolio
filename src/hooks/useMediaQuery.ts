"use client";
import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query without causing a hydration mismatch —
 * the server and the first client render both return `false`, then the real
 * value snaps in after mount.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** True below the Tailwind `md` breakpoint (768px). */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

/** True when the primary input is touch (phones, most tablets). */
export function useIsCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}
