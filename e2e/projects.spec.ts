import { test, expect } from "@playwright/test";
import { projectsData } from "../src/data/projects";

test.describe("project pages", () => {
  for (const project of projectsData) {
    test(`${project.title} case study returns 200`, async ({ page }) => {
      const response = await page.goto(`/projects/${project.slug}`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
      await expect(page.getByRole("link", { name: /Back to work/i })).toBeVisible();
    });
  }

  test("unknown slug is a 404", async ({ page }) => {
    const response = await page.goto("/projects/this-slug-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("TechTips gallery arrows are present on desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "arrows are desktop-only");
    await page.goto("/projects/techtips");
    await expect(page.getByRole("button", { name: "Previous screenshot" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next screenshot" })).toBeVisible();
  });
});
