import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Contenty } from "../support/world";

Then("I should see a navigation element", async function (this: Contenty) {
  const nav = this.page.locator("nav");
  await expect(nav).toBeVisible();
});

Then("every primary navigation page should have a nav link", async function (this: Contenty) {
  const navPages = this.sitemapPages.filter((p) => p.isNav && p.slug !== "home");
  for (const p of navPages) {
    const link = this.page.locator(`nav a[href="${p.route}"], nav a[href="${p.route}/"]`);
    const count = await link.count();
    expect(count, `No nav link for ${p.name}`).toBeGreaterThan(0);
  }
});

When("I click the first non-home nav link", async function (this: Contenty) {
  const target = this.sitemapPages.find((p) => p.isNav && p.slug !== "home");
  if (!target) return;
  await this.page.locator(`nav a[href="${target.route}"], nav a[href="${target.route}/"]`).first().click();
  await this.page.waitForLoadState("networkidle");
});

Then("I should be on the linked page", async function (this: Contenty) {
  const target = this.sitemapPages.find((p) => p.isNav && p.slug !== "home");
  if (!target) return;
  expect(this.page.url()).toContain(target.slug);
});
