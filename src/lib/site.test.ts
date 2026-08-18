import { describe, expect, it, vi, afterEach } from "vitest";
import { DEFAULT_SITE_URL } from "@/lib/site";

describe("getSiteUrl", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();
  });

  it("defaults to the canonical domain", async () => {
    const { getSiteUrl } = await import("@/lib/site");
    expect(getSiteUrl()).toBe(DEFAULT_SITE_URL);
  });

  it("strips a trailing slash from NEXT_PUBLIC_SITE_URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://antonysaleeb.com/";
    vi.resetModules();
    const { getSiteUrl } = await import("@/lib/site");
    expect(getSiteUrl()).toBe("https://antonysaleeb.com");
  });
});
