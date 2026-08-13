import { afterEach, describe, expect, it, vi } from "vitest";
import { projectsData } from "@/data/projects";
import { DEFAULT_SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();
  });

  it("lists the home page and every project", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain(DEFAULT_SITE_URL);
    for (const project of projectsData) {
      expect(urls).toContain(`${DEFAULT_SITE_URL}/projects/${project.slug}`);
    }
    expect(entries).toHaveLength(1 + projectsData.length);
  });

  it("honors NEXT_PUBLIC_SITE_URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test";
    vi.resetModules();
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = sitemap().map((e) => e.url);
    expect(urls[0]).toBe("https://example.test");
    expect(urls).toContain("https://example.test/projects/techtips");
  });
});

describe("robots", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();
  });

  it("allows all crawlers and points at the sitemap", async () => {
    const { default: robots } = await import("@/app/robots");
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${DEFAULT_SITE_URL}/sitemap.xml`);
  });
});
