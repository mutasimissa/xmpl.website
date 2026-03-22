import { fileExists, readYaml, readText, getLocales, resolve } from "./files.ts";

export type ProjectStage =
  | "empty"
  | "intake-done"
  | "strategy-done"
  | "identity-done"
  | "offers-done"
  | "sitemap-done"
  | "content-done"
  | "launched"
  | "live";

export type SiteType =
  | "corporate"
  | "service"
  | "personal-blog"
  | "booking"
  | "single-page"
  | "coming-soon"
  | null;

export interface ProjectState {
  stage: ProjectStage;
  businessName: string;
  siteType: SiteType;
  completedFiles: string[];
  missingFiles: string[];
  hasWebsite: boolean;
  hasBrandIdentity: boolean;
  isBrandingStale: boolean;
  locales: string[];
  defaultLocale: string;
  brandAssets: { present: string[]; missing: string[] };
}

const BUSINESS_FILES = [
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

const BRAND_ASSET_FILES = [
  "assets/brand/logo.svg",
  "assets/brand/logo-icon.svg",
];

const isPopulated = (path: string): boolean => {
  if (!fileExists(path)) return false;
  try {
    const content = readText(path);
    if (path.endsWith(".yaml") || path.endsWith(".yml")) {
      const data = readYaml<Record<string, unknown>>(path);
      const vals = Object.values(data);
      return vals.some((v) =>
        v !== null && v !== undefined && v !== "" &&
        !(Array.isArray(v) && v.length === 0) &&
        !(typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0)
      );
    }
    const stripped = content.replace(/^#.*$/gm, "").replace(/<!--.*?-->/gs, "").replace(/^-\s*$/gm, "").trim();
    return stripped.length > 20;
  } catch {
    return false;
  }
};

const detectStage = (completed: string[], siteType: SiteType): ProjectStage => {
  const has = (f: string) => completed.includes(f);

  // Site-type-aware shortcuts: some types skip intermediate phases
  if (siteType === "coming-soon" || siteType === "single-page") {
    // These types skip offers, sitemap, seo-brief — jump from strategy to content
    if (
      has("business/02-brand-strategy.md") &&
      has("business/03-brand-identity.yaml") &&
      has("content/04-content-deck.md")
    ) {
      return "content-done";
    }
  }

  if (siteType === "booking") {
    // Booking skips sitemap — if offers are done and content exists, it's content-done
    if (
      has("business/04-business-model.md") &&
      has("business/05-value-proposition.md") &&
      has("business/06-personas-jtbd.md") &&
      has("content/04-content-deck.md")
    ) {
      return "content-done";
    }
  }

  // Default detection logic
  if (has("content/04-content-deck.md") && has("content/05-checklist.md")) {
    return "content-done";
  }
  if (has("content/01-sitemap.yaml") && has("content/03-seo-brief.md")) {
    return "sitemap-done";
  }
  if (has("business/04-business-model.md") && has("business/05-value-proposition.md") && has("business/06-personas-jtbd.md")) {
    return "offers-done";
  }
  if (has("business/03-brand-identity.yaml")) {
    return "identity-done";
  }
  if (has("business/02-brand-strategy.md")) {
    return "strategy-done";
  }
  if (has("business/01-business-input.yaml")) {
    return "intake-done";
  }
  return "empty";
};

export const getProjectState = (): ProjectState => {
  const completed: string[] = [];
  const missing: string[] = [];

  for (const f of BUSINESS_FILES) {
    if (isPopulated(f)) {
      completed.push(f);
    } else {
      missing.push(f);
    }
  }

  let businessName = "";
  let siteType: SiteType = null;
  try {
    const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
    businessName = (input.business_name as string) || "";
    const rawType = (input.site_type as string) || "";
    const validTypes: SiteType[] = ["corporate", "service", "personal-blog", "booking", "single-page", "coming-soon"];
    if (validTypes.includes(rawType as SiteType)) {
      siteType = rawType as SiteType;
    }
  } catch { /* empty */ }

  const hasWebsite = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

  const { defaultLocale, locales } = getLocales();

  const stage = hasWebsite
    ? (detectStage(completed, siteType) === "content-done" ? "launched" : detectStage(completed, siteType))
    : detectStage(completed, siteType);

  const brandPresent: string[] = [];
  const brandMissing: string[] = [];
  for (const f of BRAND_ASSET_FILES) {
    if (fileExists(f)) {
      brandPresent.push(f);
    } else {
      brandMissing.push(f);
    }
  }

  const hasBrandIdentity = isPopulated("business/03-brand-identity.yaml");

  const isBrandingStale = (() => {
    if (!hasWebsite || !hasBrandIdentity) return false;
    try {
      const brandMtime = Deno.statSync(resolve("business/03-brand-identity.yaml")).mtime;
      const stylesMtime = Deno.statSync(resolve("website/assets/styles.css")).mtime;
      if (brandMtime && stylesMtime) return brandMtime > stylesMtime;
    } catch { /* file doesn't exist */ }
    return false;
  })();

  return {
    stage,
    businessName,
    siteType,
    completedFiles: completed,
    missingFiles: missing,
    hasWebsite,
    hasBrandIdentity,
    isBrandingStale,
    locales,
    defaultLocale,
    brandAssets: { present: brandPresent, missing: brandMissing },
  };
};

export const STAGE_LABELS: Record<ProjectStage, string> = {
  "empty": "Not started",
  "intake-done": "Intake complete — needs brand strategy",
  "strategy-done": "Brand strategy done — needs brand identity",
  "identity-done": "Brand identity done — needs offer design",
  "offers-done": "Offers done — needs sitemap & IA",
  "sitemap-done": "Sitemap done — needs content",
  "content-done": "Content complete — ready to build",
  "launched": "Website bootstrapped",
  "live": "Live",
};
