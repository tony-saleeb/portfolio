import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test("loads the hero and primary sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Antony/);
    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#background")).toBeAttached();
    await expect(page.locator("#stack")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main-content/);
  });
});
