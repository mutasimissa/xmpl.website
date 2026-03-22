import { test, expect } from "@playwright/test";

test.describe("Pre-launch Smoke Tests @smoke", () => {
  test("home page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    expect(errors, `Console errors: ${errors.join(", ")}`).toEqual([]);
  });

  test("home page has visible CTA", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator('a[href*="contact"], a[href*="book"], a[href*="schedule"], button:has-text("Contact"), button:has-text("Book"), button:has-text("Get")');
    const count = await cta.count();
    expect(count, "No visible CTA on home page").toBeGreaterThan(0);
  });

  test("no console errors on any page", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("robots.txt accessible", async ({ page }) => {
    const response = await page.request.get("/robots.txt");
    expect(response.status()).toBe(200);
  });

  test("sitemap.xml accessible", async ({ page }) => {
    const response = await page.request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const content = await response.text();
    expect(content).toContain("<?xml");
  });

  test("manifest.json accessible", async ({ page }) => {
    const response = await page.request.get("/manifest.json");
    expect(response.status()).toBe(200);
  });

  test("404 page returns 404 status with branded content", async ({ page }) => {
    const response = await page.goto("/this-page-definitely-does-not-exist-12345");
    expect(response?.status()).toBe(404);
    // Verify 404 page has actual content (not blank or default server error)
    const body = await page.textContent("body");
    expect(body?.length).toBeGreaterThan(50);
    // Should contain a link back to home
    const homeLink = page.locator('a[href="/"]');
    expect(await homeLink.count()).toBeGreaterThan(0);
  });
});
