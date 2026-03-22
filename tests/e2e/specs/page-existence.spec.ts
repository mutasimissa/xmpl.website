import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("Page Existence @smoke", () => {
  for (const page of pages) {
    test(`${page.name} (${page.route}) returns 200`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(page.route);
      expect(response?.status()).toBe(200);
    });
  }

  test.skip(pages.length === 0, "No pages in sitemap");
});
