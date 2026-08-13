import { describe, expect, it } from "vitest";
import { projectsData, type Project } from "@/data/projects";

const requiredKeys: (keyof Project)[] = [
  "slug",
  "title",
  "description",
  "tags",
  "fullDescription",
  "challenges",
  "architecture",
];

describe("projectsData", () => {
  it("has at least one project", () => {
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it("uses unique slugs", () => {
    const slugs = projectsData.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps slugs URL-safe", () => {
    for (const project of projectsData) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("includes required copy on every project", () => {
    for (const project of projectsData) {
      for (const key of requiredKeys) {
        const value = project[key];
        if (Array.isArray(value)) {
          expect(value.length, `${project.slug}.${key}`).toBeGreaterThan(0);
        } else {
          expect(String(value).trim(), `${project.slug}.${key}`).not.toBe("");
        }
      }
    }
  });

  it("does not publish a DeepFract compression ratio", () => {
    const deepfract = projectsData.find((p) => p.slug === "deepfract");
    expect(deepfract).toBeDefined();
    expect(deepfract?.metric).toBeUndefined();
    expect(deepfract?.fullDescription).not.toMatch(/\d+\s*:\s*1/);
  });

  it("includes the flagship and case-study slugs", () => {
    const slugs = projectsData.map((p) => p.slug);
    expect(slugs).toEqual(
      expect.arrayContaining(["deepfract", "techtips", "bt2", "real-time-quiz-platform"])
    );
  });

  it("only uses cover or contain for imageDisplay", () => {
    for (const project of projectsData) {
      if (project.imageDisplay) {
        expect(["cover", "contain"]).toContain(project.imageDisplay);
      }
    }
  });
});
