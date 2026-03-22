import { assertEquals } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";

interface TestPage {
  name: string;
  slug: string;
  route: string;
  isNav: boolean;
  goal: string;
}

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const parseSitemap = (yaml: string): TestPage[] => {
  const data = parseYaml(yaml) as Record<string, unknown>;
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
      goal: goals[name] || "",
    });
  }

  return pages;
};

Deno.test("parseSitemap: basic corporate site", () => {
  const yaml = `
primary_navigation:
  - Home
  - Services
  - About
  - Contact
secondary_pages:
  - Privacy Policy
  - FAQ
page_goals:
  Home: Introduce the business
  Services: Explain offerings
  About: Build trust
  Contact: Capture leads
  Privacy Policy: Legal compliance
  FAQ: Answer common questions
`;
  const pages = parseSitemap(yaml);
  assertEquals(pages.length, 6);
  assertEquals(pages[0].route, "/");
  assertEquals(pages[0].isNav, true);
  assertEquals(pages[1].route, "/services");
  assertEquals(pages[4].route, "/privacy-policy");
  assertEquals(pages[4].isNav, false);
});

Deno.test("parseSitemap: home route is /", () => {
  const yaml = `
primary_navigation:
  - Home
secondary_pages: []
page_goals: {}
`;
  const pages = parseSitemap(yaml);
  assertEquals(pages[0].route, "/");
  assertEquals(pages[0].slug, "home");
});

Deno.test("parseSitemap: empty sitemap", () => {
  const yaml = `
primary_navigation: []
secondary_pages: []
page_goals: {}
`;
  const pages = parseSitemap(yaml);
  assertEquals(pages.length, 0);
});

Deno.test("parseSitemap: goals populated", () => {
  const yaml = `
primary_navigation:
  - Home
secondary_pages: []
page_goals:
  Home: Introduce the business and route visitors
`;
  const pages = parseSitemap(yaml);
  assertEquals(pages[0].goal, "Introduce the business and route visitors");
});

Deno.test("parseSitemap: missing goals default to empty", () => {
  const yaml = `
primary_navigation:
  - Home
secondary_pages: []
page_goals: {}
`;
  const pages = parseSitemap(yaml);
  assertEquals(pages[0].goal, "");
});
