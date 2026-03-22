import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("Missing Images", () => {
  for (const sitePage of pages) {
    test(`all images load on ${sitePage.name}`, async ({ page }) => {
      await page.goto(sitePage.route);
      await page.waitForLoadState("networkidle");

      const images = page.locator("img");
      const count = await images.count();
      const broken: string[] = [];

      for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute("src");
        const natural = await images.nth(i).evaluate(
          (el: HTMLImageElement) => el.naturalWidth
        );
        if (natural === 0) {
          broken.push(src || "(no src)");
        }
      }

      expect(broken, `Broken images on ${sitePage.name}: ${broken.join(", ")}`).toEqual([]);
    });
  }
});
