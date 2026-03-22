import { test, expect } from "@playwright/test";
import { loadSiteTypeConfig } from "../fixtures/site-type";
import { loadSitemapPages } from "../fixtures/sitemap";

const config = loadSiteTypeConfig();
const pages = loadSitemapPages();

test.describe("Hreflang & Locale Routes", () => {
  test.skip(!config.isMultilingual, "Site is not multilingual");

  for (const locale of config.locales) {
    if (locale === config.defaultLocale) continue;

    test(`/${locale}/ route exists`, async ({ page }) => {
      const response = await page.goto(`/${locale}/`);
      expect(response?.status(), `/${locale}/ returned ${response?.status()}`).toBe(200);
    });
  }

  test("home page has hreflang tags for all locales", async ({ page }) => {
    await page.goto("/");
    for (const locale of config.locales) {
      const hreflang = page.locator(`link[rel="alternate"][hreflang="${locale}"]`);
      await expect(hreflang, `Missing hreflang for ${locale}`).toHaveCount(1);
    }
  });

  test("locale pages have hreflang tags", async ({ page }) => {
    for (const locale of config.locales) {
      if (locale === config.defaultLocale) continue;
      await page.goto(`/${locale}/`);
      const hreflangDefault = page.locator(`link[rel="alternate"][hreflang="${config.defaultLocale}"]`);
      await expect(hreflangDefault, `/${locale}/ missing hreflang for ${config.defaultLocale}`).toHaveCount(1);
    }
  });
});
