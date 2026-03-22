import { parse as parseYaml } from "jsr:@std/yaml@^1";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "");

const fileExists = (path: string): boolean => {
  try {
    Deno.statSync(`${ROOT}/${path}`);
    return true;
  } catch {
    return false;
  }
};

const readYaml = <T>(path: string): T => {
  const content = Deno.readTextFileSync(`${ROOT}/${path}`);
  return parseYaml(content) as T;
};

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

let driftIssues = 0;

const pass = (msg: string) => console.log(`  ✓ ${msg}`);
const drift = (msg: string) => { console.error(`  ✗ DRIFT: ${msg}`); driftIssues++; };

console.log("\n🔄 Business/Website Drift Check\n");

// 1. Check sitemap pages have routes
console.log("  Routes vs Sitemap:");
try {
  const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
  const primary = (sitemap.primary_navigation as string[]) || [];
  const secondary = (sitemap.secondary_pages as string[]) || [];
  const allPages = [...primary, ...secondary];

  for (const page of allPages) {
    const slug = toSlug(page);
    const routePath = slug === "home" ? "website/routes/index.tsx" : `website/routes/${slug}.tsx`;
    if (fileExists(routePath)) {
      pass(`${page} → ${routePath}`);
    } else {
      drift(`${page} in sitemap but no route at ${routePath}`);
    }
  }

  // Check for orphaned routes
  try {
    const routeDir = `${ROOT}/website/routes`;
    for (const entry of Deno.readDirSync(routeDir)) {
      if (!entry.isFile || !entry.name.endsWith(".tsx")) continue;
      if (entry.name.startsWith("_")) continue; // _404.tsx, _app.tsx, etc.
      if (entry.name === "sitemap.xml.ts") continue;

      const routeSlug = entry.name === "index.tsx" ? "home" : entry.name.replace(".tsx", "");
      const matchesPage = allPages.some((p) => toSlug(p) === routeSlug);
      if (!matchesPage) {
        drift(`Route ${entry.name} exists but no matching page in sitemap`);
      }
    }
  } catch {
    // Routes directory may not exist
  }
} catch {
  console.log("  ⊘ Could not read sitemap — skipping route check");
}

// 2. Check brand identity vs styles freshness
console.log("\n  Brand Identity Freshness:");
try {
  const brandMtime = Deno.statSync(`${ROOT}/business/03-brand-identity.yaml`).mtime;
  const stylesMtime = Deno.statSync(`${ROOT}/website/assets/styles.css`).mtime;
  if (brandMtime && stylesMtime && brandMtime > stylesMtime) {
    drift("Brand identity is newer than website styles — styles need regeneration");
  } else {
    pass("Website styles are up to date with brand identity");
  }
} catch {
  console.log("  ⊘ Could not compare brand identity timestamps — skipping");
}

// 3. Check locale files match business input
console.log("\n  Locale Consistency:");
try {
  const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
  const locales = (input.locales as string[]) || [];

  if (locales.length > 1) {
    for (const locale of locales) {
      const defaultLocale = (input.default_locale as string) || "en";
      if (locale === defaultLocale) continue;

      const localePath = `website/locales/${locale}.json`;
      if (fileExists(localePath)) {
        pass(`Locale file exists: ${localePath}`);
      } else {
        drift(`Locale "${locale}" defined in business input but missing ${localePath}`);
      }

      const routeDir = `website/routes/${locale}`;
      try {
        Deno.statSync(`${ROOT}/${routeDir}`);
        pass(`Locale route directory exists: ${routeDir}`);
      } catch {
        drift(`Locale "${locale}" defined but missing route directory ${routeDir}`);
      }
    }
  } else {
    pass("Single-locale site — no locale drift possible");
  }
} catch {
  console.log("  ⊘ Could not check locales — skipping");
}

// Summary
console.log(`\n${"═".repeat(50)}`);
if (driftIssues > 0) {
  console.error(`  ${driftIssues} drift issue(s) detected. Fix before merging.`);
  Deno.exit(1);
} else {
  console.log("  No drift detected between business/ and website/.");
}
