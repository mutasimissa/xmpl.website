import { test, expect } from "@playwright/test";
import { getNavPages } from "../fixtures/sitemap";

const navPages = getNavPages();

test.describe("Navigation @smoke", () => {
  test("nav element exists", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  for (const navPage of navPages) {
    if (navPage.slug === "home") continue;

    test(`nav contains link to ${navPage.name}`, async ({ page }) => {
      await page.goto("/");
      const link = page.locator(`nav a[href="${navPage.route}"], nav a[href="${navPage.route}/"]`);
      await expect(link).toBeVisible();
    });
  }

  test("nav links are clickable", async ({ page }) => {
    if (navPages.length < 2) return;
    const target = navPages.find((p) => p.slug !== "home");
    if (!target) return;

    await page.goto("/");
    await page.locator(`nav a[href="${target.route}"], nav a[href="${target.route}/"]`).first().click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain(target.slug);
  });
});
