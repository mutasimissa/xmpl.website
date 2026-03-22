import { test, expect } from "@playwright/test";
import { loadSitemapPages } from "../fixtures/sitemap";

const pages = loadSitemapPages();

test.describe("JSON-LD Structured Data", () => {
  for (const sitePage of pages) {
    test(`${sitePage.name} has valid JSON-LD`, async ({ page }) => {
      await page.goto(sitePage.route);
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      expect(count, `No JSON-LD on ${sitePage.name}`).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        expect(() => JSON.parse(content!), `Invalid JSON-LD on ${sitePage.name}`).not.toThrow();
      }
    });
  }

  test("home page has Organization schema", async ({ page }) => {
    await page.goto("/");
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    let hasOrg = false;

    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      const data = JSON.parse(content!);
      if (data["@type"] === "Organization" || (Array.isArray(data["@graph"]) && data["@graph"].some((item: Record<string, string>) => item["@type"] === "Organization"))) {
        hasOrg = true;
      }
    }

    expect(hasOrg, "Home page missing Organization schema").toBe(true);
  });
});
