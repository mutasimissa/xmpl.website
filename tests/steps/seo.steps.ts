import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Contenty } from "../support/world";

Then("the page should have an og:title tag", async function (this: Contenty) {
  const tag = await this.page.locator('meta[property="og:title"]').getAttribute("content");
  expect(tag).toBeTruthy();
});

Then("the page should have an og:description tag", async function (this: Contenty) {
  const tag = await this.page.locator('meta[property="og:description"]').getAttribute("content");
  expect(tag).toBeTruthy();
});

Then("the page should have an og:url tag", async function (this: Contenty) {
  const tag = await this.page.locator('meta[property="og:url"]').getAttribute("content");
  expect(tag).toBeTruthy();
});

Then("the page should have a canonical URL", async function (this: Contenty) {
  const tag = await this.page.locator('link[rel="canonical"]').getAttribute("href");
  expect(tag).toBeTruthy();
});

Then("the page should have JSON-LD structured data", async function (this: Contenty) {
  const scripts = this.page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  expect(count).toBeGreaterThan(0);
});
