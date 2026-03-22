import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = path.resolve(__dirname, "../../");

export interface TestPage {
  name: string;
  slug: string;
  route: string;
  isNav: boolean;
  goal: string;
}

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export class Contenty extends World {
  browser!: Browser;
  page!: Page;
  sitemapPages: TestPage[] = [];
  lastResponse: { status: number } | null = null;

  loadSitemap(): void {
    const sitemapPath = path.join(ROOT, "content/01-sitemap.yaml");
    if (!fs.existsSync(sitemapPath)) return;
    const raw = fs.readFileSync(sitemapPath, "utf-8");
    const data = parseYaml(raw) as Record<string, unknown>;
    const primary = (data.primary_navigation as string[]) || [];
    const secondary = (data.secondary_pages as string[]) || [];
    const goals = (data.page_goals as Record<string, string>) || {};

    for (const name of [...primary, ...secondary]) {
      const slug = toSlug(name);
      this.sitemapPages.push({
        name,
        slug,
        route: slug === "home" ? "/" : `/${slug}`,
        isNav: primary.includes(name),
        goal: goals[name] || "",
      });
    }
  }
}

setWorldConstructor(Contenty);
