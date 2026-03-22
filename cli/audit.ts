import { fileExists, readText, readYaml } from "./_shared/files.ts";
import { printSection, printSuccess, printError, printInfo } from "./_shared/log.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Content Audit                    ║
╚══════════════════════════════════════════════════════════╝
`);

let issues = 0;
let passes = 0;

const pass = (msg: string) => { console.log(`  ✓ ${msg}`); passes++; };
const fail = (msg: string) => { printError(`  ${msg}`); issues++; };

// ── 1. Sitemap coverage ──────────────────────────────────

printSection("1/5 — Sitemap Coverage", "Does every page in the sitemap have a brief?");

try {
  const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
  const primary = (sitemap.primary_navigation as string[]) || [];
  const secondary = (sitemap.secondary_pages as string[]) || [];
  const allPages = [...primary, ...secondary];

  if (allPages.length === 0) {
    fail("Sitemap is empty — no pages defined");
  } else {
    for (const page of allPages) {
      const slug = page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const briefPath = `content/02-page-briefs/${slug}.md`;
      if (fileExists(briefPath)) {
        pass(`${page} → ${briefPath}`);
      } else {
        fail(`${page} — missing brief: ${briefPath}`);
      }
    }
  }
} catch {
  fail("Could not read content/01-sitemap.yaml");
}

// ── 2. Brief → Content deck coverage ─────────────────────

printSection("2/5 — Copy Coverage", "Does every page brief have content in the content deck?");

try {
  const deck = readText("content/04-content-deck.md");
  const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
  const primary = (sitemap.primary_navigation as string[]) || [];
  const secondary = (sitemap.secondary_pages as string[]) || [];
  const allPages = [...primary, ...secondary];

  for (const page of allPages) {
    const regex = new RegExp(`##\\s+${page}`, "i");
    if (regex.test(deck)) {
      pass(`${page} has copy in content deck`);
    } else {
      fail(`${page} — no section found in content deck`);
    }
  }
} catch {
  fail("Could not read content deck or sitemap");
}

// ── 3. SEO coverage ──────────────────────────────────────

printSection("3/5 — SEO Coverage", "Does every page have keyword mapping in the SEO brief?");

try {
  const seo = readText("content/03-seo-brief.md");
  const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
  const primary = (sitemap.primary_navigation as string[]) || [];

  for (const page of primary) {
    const regex = new RegExp(page, "i");
    if (regex.test(seo)) {
      pass(`${page} mentioned in SEO brief`);
    } else {
      fail(`${page} — not found in SEO brief`);
    }
  }
} catch {
  fail("Could not read SEO brief or sitemap");
}

// ── 4. Route coverage ────────────────────────────────────

printSection("4/5 — Route Coverage", "Does every sitemap page have a Fresh route? (skip if website not bootstrapped)");

if (!fileExists("website/deno.json") && !fileExists("website/fresh.config.ts")) {
  printInfo("Website not bootstrapped yet — skipping route check.");
} else {
  try {
    const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
    const primary = (sitemap.primary_navigation as string[]) || [];

    for (const page of primary) {
      const slug = page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const routePath = slug === "home" ? "website/routes/index.tsx" : `website/routes/${slug}.tsx`;
      if (fileExists(routePath)) {
        pass(`${page} → ${routePath}`);
      } else {
        fail(`${page} — missing route: ${routePath}`);
      }
    }
  } catch {
    fail("Could not read sitemap for route check");
  }
}

// ── 5. CTA consistency ───────────────────────────────────

printSection("5/5 — CTA Consistency", "Is the primary CTA referenced in the content deck?");

try {
  const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
  const cta = (input.primary_cta as string) || "";

  if (!cta) {
    fail("No primary CTA defined in business input");
  } else {
    const deck = readText("content/04-content-deck.md");
    const ctaRegex = new RegExp(cta.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    if (ctaRegex.test(deck)) {
      pass(`Primary CTA "${cta}" found in content deck`);
    } else {
      fail(`Primary CTA "${cta}" not found in content deck — may be inconsistent`);
    }
  }
} catch {
  fail("Could not check CTA consistency");
}

// ── 6. Launch checklist progress ─────────────────────────

printSection("6/7 — Launch Checklist", "How many launch checklist items remain?");

try {
  if (!fileExists("content/05-checklist.md")) {
    fail("Launch checklist not found: content/05-checklist.md");
  } else {
    const checklist = readText("content/05-checklist.md");
    const done = (checklist.match(/- \[x\]/gi) || []).length;
    const todo = (checklist.match(/- \[ \]/g) || []).length;
    const total = done + todo;
    if (total === 0) {
      printInfo("  No checklist items found.");
    } else if (todo === 0) {
      pass(`All ${total} checklist items complete`);
    } else {
      fail(`${todo}/${total} checklist items remaining`);
    }
  }
} catch {
  fail("Could not read launch checklist");
}

// ── 7. Website SEO technical checks ─────────────────────

printSection("7/7 — SEO Technical", "Checking technical SEO in website routes (if bootstrapped).");

const websiteExists = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

if (!websiteExists) {
  printInfo("  Website not bootstrapped — skipping SEO technical checks.");
} else {
  const seoChecks = [
    { file: "website/static/robots.txt", label: "robots.txt" },
    { file: "website/components/OGMeta.tsx", label: "OG meta component" },
    { file: "website/components/JsonLd.tsx", label: "JSON-LD component" },
    { file: "website/routes/sitemap.xml.ts", label: "Sitemap XML route" },
    { file: "website/static/manifest.json", label: "PWA manifest" },
    { file: "website/routes/_404.tsx", label: "Custom 404 page" },
  ];

  for (const check of seoChecks) {
    if (fileExists(check.file)) {
      pass(`${check.label} exists`);
    } else {
      fail(`Missing: ${check.label} (${check.file})`);
    }
  }

  // Check route files for OG meta usage
  try {
    const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
    const primary = (sitemap.primary_navigation as string[]) || [];
    let ogPresent = 0;
    let ogMissing = 0;

    for (const page of primary) {
      const slug = page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const routePath = slug === "home" ? "website/routes/index.tsx" : `website/routes/${slug}.tsx`;
      if (fileExists(routePath)) {
        const content = readText(routePath);
        if (content.includes("OGMeta")) {
          ogPresent++;
        } else {
          ogMissing++;
          fail(`${page} route missing OGMeta component`);
        }
      }
    }

    if (ogMissing === 0 && ogPresent > 0) {
      pass(`All ${ogPresent} route(s) include OGMeta`);
    }
  } catch {
    // Skip if sitemap can't be read — already reported in section 1
  }
}

// ── Summary ──────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);
console.log(`  Audit Results: ${passes} passed, ${issues} issues`);
console.log(`${"═".repeat(60)}\n`);

if (issues === 0) {
  printSuccess("All content audit checks passed.");
} else {
  printError(`${issues} issue(s) found. Fix them before proceeding.`);
  Deno.exit(1);
}
