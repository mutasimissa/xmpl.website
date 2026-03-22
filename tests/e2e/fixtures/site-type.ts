import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";

export type SiteType = "corporate" | "service" | "personal-blog" | "booking" | "single-page" | "coming-soon" | null;

const ROOT = path.resolve(__dirname, "../../../");

export interface SiteTypeConfig {
  siteType: SiteType;
  requiredPages: string[];
  defaultConversion: string;
  hasContactForm: boolean;
  hasBookingWidget: boolean;
  isMultilingual: boolean;
  locales: string[];
  defaultLocale: string;
}

export function loadSiteTypeConfig(): SiteTypeConfig {
  let siteType: SiteType = null;
  let locales: string[] = [];
  let defaultLocale = "en";

  try {
    const inputPath = path.join(ROOT, "business/01-business-input.yaml");
    const raw = fs.readFileSync(inputPath, "utf-8");
    const data = parseYaml(raw) as Record<string, unknown>;
    siteType = (data.site_type as SiteType) || null;
    locales = (data.locales as string[]) || [];
    defaultLocale = (data.default_locale as string) || "en";
  } catch {
    // File doesn't exist yet
  }

  const conversionMap: Record<string, string> = {
    corporate: "contact-form",
    service: "quote-request",
    "personal-blog": "newsletter",
    booking: "booking-link",
    "single-page": "contact-form",
    "coming-soon": "email-capture",
  };

  const requiredPagesMap: Record<string, string[]> = {
    corporate: ["home", "about", "contact"],
    service: ["home", "services", "contact"],
    "personal-blog": ["home", "about", "blog"],
    booking: ["home"],
    "single-page": ["home"],
    "coming-soon": ["home"],
  };

  const defaultConversion = siteType ? conversionMap[siteType] || "contact-form" : "contact-form";
  const requiredPages = siteType ? requiredPagesMap[siteType] || ["home"] : ["home"];

  return {
    siteType,
    requiredPages,
    defaultConversion,
    hasContactForm: ["contact-form", "quote-request"].includes(defaultConversion),
    hasBookingWidget: siteType === "booking",
    isMultilingual: locales.length > 1,
    locales,
    defaultLocale,
  };
}
