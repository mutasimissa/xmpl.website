import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Contenty } from "../support/world";
import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = path.resolve(__dirname, "../../");

function getLocales(): { defaultLocale: string; locales: string[] } {
  try {
    const raw = fs.readFileSync(path.join(ROOT, "business/01-business-input.yaml"), "utf-8");
    const data = parseYaml(raw) as Record<string, unknown>;
    return {
      defaultLocale: (data.default_locale as string) || "en",
      locales: (data.locales as string[]) || [],
    };
  } catch {
    return { defaultLocale: "en", locales: [] };
  }
}

Given("the site has multiple locales", function (this: Contenty) {
  const { locales } = getLocales();
  if (locales.length <= 1) {
    return "skipped";
  }
});

Then("each non-default locale route should return {int}", async function (this: Contenty, status: number) {
  const { defaultLocale, locales } = getLocales();
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const response = await this.page.goto(`/${locale}/`);
    expect(response?.status(), `/${locale}/ failed`).toBe(status);
  }
});

Then("hreflang tags should exist for all locales", async function (this: Contenty) {
  const { locales } = getLocales();
  for (const locale of locales) {
    const tag = this.page.locator(`link[rel="alternate"][hreflang="${locale}"]`);
    const count = await tag.count();
    expect(count, `Missing hreflang for ${locale}`).toBe(1);
  }
});
