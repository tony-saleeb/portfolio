import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("navbar section links leave a case study for the homepage", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop nav; mobile uses the hamburger drawer");
    await page.goto("/projects/techtips");
    await expect(page.getByRole("heading", { level: 1, name: "TechTips" })).toBeVisible();
    await page.getByRole("link", { name: "Background" }).click();
    await expect(page).toHaveURL(/\/#background/);
    await expect(page.locator("#background")).toBeInViewport();
  });

  test("work cards open case studies", async ({ page }) => {
    await page.goto("/#work");
    await page.getByRole("link", { name: /TechTips/ }).first().click();
    await expect(page).toHaveURL(/\/projects\/techtips/);
    await expect(page.getByRole("heading", { level: 1, name: "TechTips" })).toBeVisible();
  });
});
