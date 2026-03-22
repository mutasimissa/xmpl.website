import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test("footer element exists", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("footer has copyright text", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const text = await footer.textContent();
    expect(text).toMatch(/©|\u00A9|copyright/i);
  });

  test("footer links resolve", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("footer a[href^='/']");
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      if (href) {
        const response = await page.request.get(href);
        expect(response.status(), `Footer link ${href} broken`).toBe(200);
      }
    }
  });
});
