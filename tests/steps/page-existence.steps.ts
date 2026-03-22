import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Contenty } from "../support/world";

Given("I navigate to {string}", async function (this: Contenty, route: string) {
  const response = await this.page.goto(route);
  this.lastResponse = { status: response?.status() || 0 };
});

Then("the page should return status {int}", function (this: Contenty, status: number) {
  expect(this.lastResponse?.status).toBe(status);
});

Then("the page should have an H1", async function (this: Contenty) {
  const h1 = this.page.locator("h1");
  const count = await h1.count();
  expect(count).toBeGreaterThan(0);
});

Given("the sitemap is loaded", function (this: Contenty) {
  expect(this.sitemapPages.length).toBeGreaterThan(0);
});

When("I visit each sitemap page", async function (this: Contenty) {
  const results: { name: string; status: number }[] = [];
  for (const p of this.sitemapPages) {
    const response = await this.page.goto(p.route);
    results.push({ name: p.name, status: response?.status() || 0 });
  }
  this.attach(JSON.stringify(results, null, 2), "application/json");
});

Then("all pages should return status {int}", async function (this: Contenty, status: number) {
  for (const p of this.sitemapPages) {
    const response = await this.page.goto(p.route);
    expect(response?.status(), `${p.name} (${p.route})`).toBe(status);
  }
});
