import { describe, expect, it } from "vitest";
import { AS_GRADIENTS, AS_SHARDS, AS_VIEWBOX } from "@/components/ui/asMarkShards";
import { DEEPFRACT_SHARDS, DEEPFRACT_VIEWBOX } from "@/components/sections/deepfractShards";

describe("AS mark shards", () => {
  it("exports a viewBox and gradient defs", () => {
    expect(AS_VIEWBOX).toMatch(/^\d/);
    expect(AS_GRADIENTS).toContain("<linearGradient");
  });

  it("has drawable paths with fills", () => {
    expect(AS_SHARDS.length).toBeGreaterThan(0);
    for (const shard of AS_SHARDS) {
      expect(shard.d.length).toBeGreaterThan(10);
      expect(shard.fill).toBeTruthy();
    }
  });
});

describe("DeepFract shards", () => {
  it("exports a square viewBox and painted paths", () => {
    expect(DEEPFRACT_VIEWBOX).toBe("0 0 500 500");
    expect(DEEPFRACT_SHARDS.length).toBeGreaterThan(0);
    for (const shard of DEEPFRACT_SHARDS) {
      expect(shard.d.startsWith("M")).toBe(true);
      expect(shard.paint).toMatch(/^#/);
    }
  });
});
