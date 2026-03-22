import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { Contenty } from "./world";

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch();
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: Contenty) {
  this.browser = browser;
  const context = await browser.newContext({ baseURL: "http://localhost:8000" });
  this.page = await context.newPage();
  this.loadSitemap();
});

After(async function (this: Contenty) {
  await this.page.context().close();
});
