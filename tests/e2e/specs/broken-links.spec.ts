import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("Broken Links", () => {
  for (const sitePage of pages) {
    test(`no broken internal links on ${sitePage.name}`, async ({ page }) => {
      await page.goto(sitePage.route);
      const links = page.locator("a[href^='/']");
      const count = await links.count();
      const broken: string[] = [];

      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute("href");
        if (href && !href.startsWith("/#")) {
          const response = await page.request.get(href);
          if (response.status() !== 200) {
            broken.push(`${href} → ${response.status()}`);
          }
        }
      }

      expect(broken, `Broken links on ${sitePage.name}: ${broken.join(", ")}`).toEqual([]);
    });
  }
});
