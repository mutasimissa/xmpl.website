import { fileExists, readYaml, readText } from "./_shared/files.ts";
import { printSuccess, printError, printInfo, printSection } from "./_shared/log.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Unified Check                    ║
╚══════════════════════════════════════════════════════════╝
`);

let totalPasses = 0;
let totalIssues = 0;
const checklistLines: string[] = ["# Pre-Launch Checklist", "", `Generated: ${new Date().toISOString().split("T")[0]}`, ""];

const pass = (msg: string) => {
  console.log(`  \u2713 ${msg}`);
  totalPasses++;
  checklistLines.push(`- [x] ${msg}`);
};
const fail = (msg: string) => {
  printError(`  ${msg}`);
  totalIssues++;
  checklistLines.push(`- [ ] ${msg}`);
};

// ── 1. Logo gate ─────────────────────────────────────────

printSection("1/7 — Logo Gate", "Checking required logo files.");
checklistLines.push("", "## Logo Gate", "");

const LOGOS = [
  { file: "assets/brand/logo.svg", label: "Primary logo (SVG)" },
  { file: "assets/brand/logo-icon.svg", label: "Square icon (SVG)" },
];

for (const logo of LOGOS) {
  if (fileExists(logo.file)) {
    pass(`${logo.file} — ${logo.label}`);
  } else {
    fail(`Missing: ${logo.file} — ${logo.label}`);
  }
}

// ── 2. Business files ────────────────────────────────────

printSection("2/7 — Business Files", "Checking business source-of-truth files.");
checklistLines.push("", "## Business Files", "");

const BUSINESS_FILES = [
  "business/01-business-input.yaml",
  "business/02-brand-strategy.md",
  "business/03-brand-identity.yaml",
  "business/04-business-model.md",
  "business/05-value-proposition.md",
  "business/06-personas-jtbd.md",
];

for (const file of BUSINESS_FILES) {
  if (fileExists(file)) {
    pass(file);
  } else {
    fail(`Missing: ${file}`);
  }
}

// Required YAML keys
const REQUIRED_YAML_KEYS: Record<string, string[]> = {
  "business/01-business-input.yaml": ["business_name", "website_goal", "industry"],
  "business/03-brand-identity.yaml": ["brand_philosophy", "colors", "typography"],
};

for (const [file, keys] of Object.entries(REQUIRED_YAML_KEYS)) {
  if (!fileExists(file)) continue;
  try {
    const data = readYaml<Record<string, unknown>>(file);
    for (const key of keys) {
      if (data[key] === undefined || data[key] === null || data[key] === "") {
        fail(`Missing key "${key}" in ${file}`);
      } else {
        pass(`${file}: ${key} present`);
      }
    }
  } catch (e) {
    fail(`Parse error in ${file}: ${e}`);
  }
}

// ── 3. Content files ─────────────────────────────────────

printSection("3/7 — Content Files", "Checking derived content files.");
checklistLines.push("", "## Content Files", "");

const CONTENT_FILES = [
  "content/01-sitemap.yaml",
  "content/03-seo-brief.md",
  "content/04-content-deck.md",
  "content/05-checklist.md",
];

for (const file of CONTENT_FILES) {
  if (fileExists(file)) {
    pass(file);
  } else {
    fail(`Missing: ${file}`);
  }
}

// ── 4. Brand assets ──────────────────────────────────────

printSection("4/7 — Brand Assets", "Checking generated brand assets.");
checklistLines.push("", "## Brand Assets", "");

const GENERATED_ASSETS = [
  { file: "assets/brand/logo-white.svg", label: "White variant" },
  { file: "assets/brand/logo-black.svg", label: "Black variant" },
  { file: "assets/brand/logo-icon.png", label: "Icon raster" },
  { file: "assets/brand/favicon.ico", label: "Favicon" },
  { file: "assets/brand/og-image.png", label: "OG image" },
  { file: "assets/brand/apple-touch-icon.png", label: "Apple touch icon" },
];

for (const asset of GENERATED_ASSETS) {
  if (fileExists(asset.file)) {
    pass(`${asset.file} — ${asset.label}`);
  } else {
    printInfo(`  Pending: ${asset.file} — ${asset.label}`);
    checklistLines.push(`- [ ] ${asset.file} — ${asset.label} (generate with brand-identity skill)`);
  }
}

// ── 5. Content audit ─────────────────────────────────────

printSection("5/7 — Content Audit", "Checking sitemap ↔ brief ↔ copy coverage.");
checklistLines.push("", "## Content Audit", "");

try {
  const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
  const primary = (sitemap.primary_navigation as string[]) || [];
  const secondary = (sitemap.secondary_pages as string[]) || [];
  const allPages = [...primary, ...secondary];

  if (allPages.length === 0) {
    fail("Sitemap is empty — no pages defined");
  }

  // Check briefs
  for (const page of allPages) {
    const slug = page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const briefPath = `content/02-page-briefs/${slug}.md`;
    if (fileExists(briefPath)) {
      pass(`${page} → brief exists`);
    } else {
      fail(`${page} — missing brief: ${briefPath}`);
    }
  }

  // Check content deck coverage
  if (fileExists("content/04-content-deck.md")) {
    const deck = readText("content/04-content-deck.md");
    for (const page of allPages) {
      const regex = new RegExp(`##\\s+${page}`, "i");
      if (regex.test(deck)) {
        pass(`${page} → copy in content deck`);
      } else {
        fail(`${page} — no section in content deck`);
      }
    }
  }

  // Check SEO coverage
  if (fileExists("content/03-seo-brief.md")) {
    const seo = readText("content/03-seo-brief.md");
    for (const page of primary) {
      const regex = new RegExp(page, "i");
      if (regex.test(seo)) {
        pass(`${page} → mentioned in SEO brief`);
      } else {
        fail(`${page} — not in SEO brief`);
      }
    }
  }
} catch {
  fail("Could not read content/01-sitemap.yaml");
}

// ── 6. Website SEO ───────────────────────────────────────

printSection("6/7 — Website SEO", "Checking technical SEO (if website exists).");
checklistLines.push("", "## Website SEO", "");

const hasWebsite = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

if (!hasWebsite) {
  printInfo("  Website not bootstrapped — skipping website checks.");
  checklistLines.push("- [ ] Website not yet bootstrapped");
} else {
  const seoFiles = [
    { file: "website/static/robots.txt", label: "robots.txt" },
    { file: "website/static/manifest.json", label: "PWA manifest" },
    { file: "website/components/OGMeta.tsx", label: "OG meta component" },
    { file: "website/components/JsonLd.tsx", label: "JSON-LD component" },
    { file: "website/routes/sitemap.xml.ts", label: "Sitemap XML route" },
    { file: "website/routes/_404.tsx", label: "Custom 404 page" },
    { file: "website/vite.config.ts", label: "Vite config with Tailwind" },
    { file: "website/utils/site-config.ts", label: "Centralized site config" },
  ];

  for (const item of seoFiles) {
    if (fileExists(item.file)) {
      pass(`${item.label}`);
    } else {
      fail(`Missing: ${item.file} — ${item.label}`);
    }
  }

  // Check route coverage
  try {
    const sitemap = readYaml<Record<string, unknown>>("content/01-sitemap.yaml");
    const primary = (sitemap.primary_navigation as string[]) || [];
    for (const page of primary) {
      const slug = page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const routePath = slug === "home" ? "website/routes/index.tsx" : `website/routes/${slug}.tsx`;
      if (fileExists(routePath)) {
        pass(`Route: ${page} → ${routePath}`);
      } else {
        fail(`Missing route: ${page} → ${routePath}`);
      }
    }
  } catch { /* sitemap already checked */ }
}

// ── 7. CTA consistency ───────────────────────────────────

printSection("7/7 — CTA Consistency", "Checking primary CTA across content.");
checklistLines.push("", "## CTA Consistency", "");

try {
  const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
  const cta = (input.primary_cta as string) || "";
  if (!cta) {
    fail("No primary CTA defined in business input");
  } else if (fileExists("content/04-content-deck.md")) {
    const deck = readText("content/04-content-deck.md");
    const ctaRegex = new RegExp(cta.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    if (ctaRegex.test(deck)) {
      pass(`Primary CTA "${cta}" found in content deck`);
    } else {
      fail(`Primary CTA "${cta}" not found in content deck`);
    }
  }
} catch {
  fail("Could not check CTA consistency");
}

// ── Write checklist ──────────────────────────────────────

checklistLines.push("", "---", "", `**Summary:** ${totalPasses} passed, ${totalIssues} issues`);

try {
  await Deno.writeTextFile(
    new URL("../../content/05-checklist.md", import.meta.url).pathname,
    checklistLines.join("\n") + "\n",
  );
  printInfo("  Wrote content/05-checklist.md");
} catch {
  // content/ dir may not exist yet in template state
}

// ── Summary ──────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);
console.log(`  Results: ${totalPasses} passed, ${totalIssues} issues`);
console.log(`${"═".repeat(60)}\n`);

if (totalIssues === 0) {
  printSuccess("All checks passed. Ready for launch.");
} else {
  printError(`${totalIssues} issue(s) found. Fix them before proceeding.`);
  Deno.exit(1);
}
