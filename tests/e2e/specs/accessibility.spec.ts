import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("Accessibility Basics", () => {
  for (const sitePage of pages) {
    test.describe(sitePage.name, () => {
      test("has exactly one H1", async ({ page }) => {
        await page.goto(sitePage.route);
        const h1s = page.locator("h1");
        const count = await h1s.count();
        expect(count, `${sitePage.name} has ${count} H1 tags (expected 1)`).toBe(1);
      });

      test("heading hierarchy is valid", async ({ page }) => {
        await page.goto(sitePage.route);
        const headings = await page.evaluate(() => {
          const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
          return Array.from(elements).map((el) => parseInt(el.tagName[1]));
        });

        for (let i = 1; i < headings.length; i++) {
          const jump = headings[i] - headings[i - 1];
          expect(jump, `Heading level jumps from H${headings[i - 1]} to H${headings[i]}`).toBeLessThanOrEqual(1);
        }
      });
    });
  }

  test("page has skip-to-content link", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"], a[href="#content"], a.skip-link, a.skip-to-content');
    const count = await skipLink.count();
    expect(count, "Missing skip-to-content link").toBeGreaterThan(0);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      const src = await images.nth(i).getAttribute("src");
      expect(alt, `Image ${src} missing alt text`).not.toBeNull();
    }
  });
});
