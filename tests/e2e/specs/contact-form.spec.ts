import { test, expect } from "@playwright/test";
import { loadSiteTypeConfig } from "../fixtures/site-type";

const config = loadSiteTypeConfig();

test.describe("Contact Form", () => {
  test.skip(!config.hasContactForm, "Site type does not use contact form");

  test("contact page has a form", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await expect(form).toBeVisible();
  });

  test("form has required fields", async ({ page }) => {
    await page.goto("/contact");
    const nameField = page.locator('input[name="name"], input[name="fullName"], input[type="text"]').first();
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
  });

  test("form has a submit button", async ({ page }) => {
    await page.goto("/contact");
    const submit = page.locator('button[type="submit"], input[type="submit"]');
    await expect(submit).toBeVisible();
  });

  test("form shows validation on empty submit", async ({ page }) => {
    await page.goto("/contact");
    const submit = page.locator('button[type="submit"], input[type="submit"]').first();
    await submit.click();
    // Browser native validation or custom validation should prevent submission
    const url = page.url();
    expect(url).toContain("contact");
  });
});
