import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMounted } from "@/hooks/useIsMounted";

describe("useIsMounted", () => {
  it("is true after the client render in jsdom", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBe(true);
  });
});
