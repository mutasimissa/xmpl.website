import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Contenty } from "../support/world";

Then("I should see a form element", async function (this: Contenty) {
  const form = this.page.locator("form");
  await expect(form).toBeVisible();
});

Then("the form should have a name field", async function (this: Contenty) {
  const field = this.page.locator('input[name="name"], input[name="fullName"], input[type="text"]').first();
  await expect(field).toBeVisible();
});

Then("the form should have an email field", async function (this: Contenty) {
  const field = this.page.locator('input[name="email"], input[type="email"]').first();
  await expect(field).toBeVisible();
});

Then("the form should have a submit button", async function (this: Contenty) {
  const btn = this.page.locator('button[type="submit"], input[type="submit"]');
  await expect(btn).toBeVisible();
});

When("I submit the form without filling it", async function (this: Contenty) {
  const btn = this.page.locator('button[type="submit"], input[type="submit"]').first();
  await btn.click();
});

Then("I should still be on the contact page", function (this: Contenty) {
  expect(this.page.url()).toContain("contact");
});
