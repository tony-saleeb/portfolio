import { describe, expect, it, vi } from "vitest";
import { projectsData } from "@/data/projects";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound,
}));

const { generateStaticParams, generateMetadata, default: ProjectPage } = await import(
  "@/app/projects/[slug]/page"
);

describe("project case-study page", () => {
  it("prebuilds a route for every project slug", () => {
    expect(generateStaticParams()).toEqual(projectsData.map((p) => ({ slug: p.slug })));
  });

  it("builds metadata from the matching project", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "techtips" }) });
    expect(meta.title).toBe("TechTips | Antony Saleeb");
    expect(meta.description).toContain("OS Tips");
    expect(meta.openGraph?.type).toBe("article");
  });

  it("returns empty metadata for an unknown slug", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "missing" }) });
    expect(meta).toEqual({});
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
