import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("Visual Snapshots @snapshot", () => {
  for (const sitePage of pages) {
    test(`${sitePage.name} visual snapshot`, async ({ page }) => {
      await page.goto(sitePage.route);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${sitePage.slug}.png`, {
        fullPage: true,
        threshold: 0.3,
      });
    });
  }
});
