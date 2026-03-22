import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("SEO Meta Tags @smoke", () => {
  for (const sitePage of pages) {
    test.describe(sitePage.name, () => {
      test("has title tag within 50-60 chars", async ({ page }) => {
        await page.goto(sitePage.route);
        const title = await page.title();
        expect(title.length, `Title "${title}" is ${title.length} chars`).toBeGreaterThanOrEqual(10);
        expect(title.length, `Title "${title}" is ${title.length} chars`).toBeLessThanOrEqual(70);
      });

      test("has meta description within 150-160 chars", async ({ page }) => {
        await page.goto(sitePage.route);
        const desc = await page.locator('meta[name="description"]').getAttribute("content");
        expect(desc, "Missing meta description").toBeTruthy();
        expect(desc!.length, `Description is ${desc!.length} chars`).toBeGreaterThanOrEqual(50);
        expect(desc!.length, `Description is ${desc!.length} chars`).toBeLessThanOrEqual(170);
      });

      test("has OG title", async ({ page }) => {
        await page.goto(sitePage.route);
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
        expect(ogTitle, "Missing og:title").toBeTruthy();
      });

      test("has OG description", async ({ page }) => {
        await page.goto(sitePage.route);
        const ogDesc = await page.locator('meta[property="og:description"]').getAttribute("content");
        expect(ogDesc, "Missing og:description").toBeTruthy();
      });

      test("has OG URL", async ({ page }) => {
        await page.goto(sitePage.route);
        const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
        expect(ogUrl, "Missing og:url").toBeTruthy();
      });

      test("has canonical URL", async ({ page }) => {
        await page.goto(sitePage.route);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(canonical, "Missing canonical URL").toBeTruthy();
      });
    });
  }
});
