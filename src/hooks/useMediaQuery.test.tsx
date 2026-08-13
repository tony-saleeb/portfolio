import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsCoarsePointer, useIsMobile, useMediaQuery } from "@/hooks/useMediaQuery";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useMediaQuery", () => {
  it("returns the live matchMedia value after mount", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("(max-width: 767px)"));
    expect(result.current).toBe(true);
  });

  it("useIsMobile tracks the md breakpoint query", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("useIsCoarsePointer tracks pointer: coarse", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsCoarsePointer());
    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith("(pointer: coarse)");
  });
});
