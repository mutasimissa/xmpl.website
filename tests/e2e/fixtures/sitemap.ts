import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

export interface TestPage {
  name: string;
  slug: string;
  route: string;
  isNav: boolean;
  isSecondary: boolean;
  goal: string;
}

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ROOT = path.resolve(__dirname, "../../../");

export function loadSitemapPages(): TestPage[] {
  const sitemapPath = path.join(ROOT, "content/01-sitemap.yaml");
  if (!fs.existsSync(sitemapPath)) return [];

  const raw = fs.readFileSync(sitemapPath, "utf-8");
  const data = parseYaml(raw) as Record<string, unknown>;

  const primary = (data.primary_navigation as string[]) || [];
  const secondary = (data.secondary_pages as string[]) || [];
  const goals = (data.page_goals as Record<string, string>) || {};

  const pages: TestPage[] = [];

  for (const name of primary) {
    const slug = toSlug(name);
    pages.push({
      name,
      slug,
      route: slug === "home" ? "/" : `/${slug}`,
      isNav: true,
      isSecondary: false,
      goal: goals[name] || "",
    });
  }

  for (const name of secondary) {
    const slug = toSlug(name);
    pages.push({
      name,
      slug,
      route: `/${slug}`,
      isNav: false,
      isSecondary: true,
      goal: goals[name] || "",
    });
  }

  return pages;
}

export function getNavPages(): TestPage[] {
  return loadSitemapPages().filter((p) => p.isNav);
}

export function getAllRoutes(): string[] {
  return loadSitemapPages().map((p) => p.route);
}
