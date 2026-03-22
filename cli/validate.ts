import { fileExists, readYaml } from "./_shared/files.ts";
import { printSuccess, printError, printInfo, printSection } from "./_shared/log.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Validate                         ║
╚══════════════════════════════════════════════════════════╝
`);

let hasErrors = false;
const pass = (msg: string) => console.log(`  ✓ ${msg}`);
const fail = (msg: string) => { printError(`  ${msg}`); hasErrors = true; };

// ── 1. Business files ───────────────────────────────────

const REQUIRED_FILES = [
  "business/01-business-input.yaml",
  "business/02-brand-strategy.md",
  "business/03-brand-identity.yaml",
  "business/04-business-model.md",
  "business/05-value-proposition.md",
  "business/06-personas-jtbd.md",
  "content/01-sitemap.yaml",
  "content/03-seo-brief.md",
  "content/04-content-deck.md",
  "content/05-checklist.md",
];

printSection("1/5 — Business Files", "Checking required business files exist.");

for (const file of REQUIRED_FILES) {
  if (!fileExists(file)) {
    fail(`Missing: ${file}`);
  } else {
    pass(file);
  }
}

// ── 2. YAML key validation ──────────────────────────────

const REQUIRED_YAML_KEYS: Record<string, string[]> = {
  "business/01-business-input.yaml": [
    "business_name",
    "website_goal",
    "industry",
  ],
  "business/03-brand-identity.yaml": [
    "brand_philosophy",
    "colors",
    "typography",
  ],
};

printSection("2/5 — YAML Keys", "Validating required keys in structured files.");

for (const [file, keys] of Object.entries(REQUIRED_YAML_KEYS)) {
  if (!fileExists(file)) continue;

  printInfo(`  ${file}`);
  try {
    const data = readYaml<Record<string, unknown>>(file);
    for (const key of keys) {
      if (data[key] === undefined || data[key] === null || data[key] === "") {
        fail(`Missing or empty key "${key}" in ${file}`);
      } else {
        pass(key);
      }
    }
  } catch (e) {
    fail(`Failed to parse ${file}: ${e}`);
  }
}

// ── 2b. Business input completeness ─────────────────────

printSection("2b/5 — Intake Completeness", "Checking how many seed sections have content.");

const SEED_SECTIONS = [
  "brand", "audience", "offers_detail", "secondary_ctas", "proof",
  "messaging", "seo", "seo_content", "site_map", "page_modules",
  "conversion", "design", "content_rules", "operations", "localization",
  "generation",
];

if (fileExists("business/01-business-input.yaml")) {
  try {
    const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
    let filled = 0;
    let empty = 0;

    const isSectionFilled = (val: unknown): boolean => {
      if (val === null || val === undefined || val === "") return false;
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === "object") {
        const entries = Object.values(val as Record<string, unknown>);
        return entries.some((v) =>
          v !== null && v !== undefined && v !== "" &&
          !(Array.isArray(v) && v.length === 0) &&
          !(typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0)
        );
      }
      return true;
    };

    for (const section of SEED_SECTIONS) {
      if (isSectionFilled(input[section])) {
        pass(`${section}`);
        filled++;
      } else {
        printInfo(`  ○ ${section} — empty`);
        empty++;
      }
    }

    const total = filled + empty;
    const pct = Math.round((filled / total) * 100);
    console.log(`\n  Seed completeness: ${filled}/${total} sections (${pct}%)`);
    if (filled < 5) {
      printInfo("  Run /start in your AI tool to fill more sections.");
    }
  } catch { /* skip if unparseable */ }
}

// ── 3. Brand assets ─────────────────────────────────────

printSection("3/5 — Brand Assets", "Checking logo files and brand assets.");

const REQUIRED_BRAND_ASSETS = [
  { file: "assets/brand/logo.svg", label: "Primary logo (SVG)" },
  { file: "assets/brand/logo-icon.svg", label: "Square icon (SVG)" },
];

const GENERATED_BRAND_ASSETS = [
  { file: "assets/brand/logo-white.svg", label: "White variant (generated)" },
  { file: "assets/brand/logo-black.svg", label: "Black variant (generated)" },
  { file: "assets/brand/logo-icon.png", label: "Icon raster (generated)" },
  { file: "assets/brand/favicon.ico", label: "Favicon (generated)" },
  { file: "assets/brand/og-image.png", label: "OG image (generated)" },
  { file: "assets/brand/apple-touch-icon.png", label: "Apple touch icon (generated)" },
];

let brandPresent = 0;
let brandMissing = 0;

for (const asset of REQUIRED_BRAND_ASSETS) {
  if (fileExists(asset.file)) {
    pass(`${asset.file} — ${asset.label}`);
    brandPresent++;
  } else {
    fail(`Missing: ${asset.file} — ${asset.label}`);
    brandMissing++;
  }
}

for (const asset of GENERATED_BRAND_ASSETS) {
  if (fileExists(asset.file)) {
    pass(`${asset.file} — ${asset.label}`);
  } else {
    printInfo(`  Generated (pending): ${asset.file} — ${asset.label}`);
  }
}

console.log(`\n  Brand assets: ${brandPresent}/${brandPresent + brandMissing} required files present`);

// ── 4. Website SEO files (post-build) ───────────────────

printSection("4/5 — Website SEO", "Checking technical SEO files (if website is bootstrapped).");

const hasWebsite = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

if (!hasWebsite) {
  printInfo("  Website not bootstrapped — skipping SEO file checks.");
} else {
  const seoFiles = [
    { file: "website/static/robots.txt", label: "robots.txt" },
    { file: "website/static/manifest.json", label: "PWA manifest" },
    { file: "website/components/OGMeta.tsx", label: "OG meta component" },
    { file: "website/components/JsonLd.tsx", label: "JSON-LD component" },
  ];

  for (const item of seoFiles) {
    if (fileExists(item.file)) {
      pass(`${item.file} — ${item.label}`);
    } else {
      fail(`Missing: ${item.file} — ${item.label}`);
    }
  }
}

// ── Summary ─────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);

if (hasErrors) {
  printError("Validation failed. Fix the issues above before proceeding.");
  Deno.exit(1);
} else {
  printSuccess("All checks passed.");
}
