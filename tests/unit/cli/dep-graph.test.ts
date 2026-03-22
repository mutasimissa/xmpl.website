import { assertEquals } from "@std/assert";
import { getStaleFiles } from "../../../cli/_shared/dep-graph.ts";

Deno.test("getStaleFiles: business input change cascades to brand strategy", () => {
  const stale = getStaleFiles(["business/01-business-input.yaml"]);
  assertEquals(stale.includes("business/02-brand-strategy.md"), true);
});

Deno.test("getStaleFiles: brand strategy cascades to identity and model", () => {
  const stale = getStaleFiles(["business/02-brand-strategy.md"]);
  assertEquals(stale.includes("business/03-brand-identity.yaml"), true);
  assertEquals(stale.includes("business/04-business-model.md"), true);
  assertEquals(stale.includes("business/05-value-proposition.md"), true);
  assertEquals(stale.includes("business/06-personas-jtbd.md"), true);
});

Deno.test("getStaleFiles: brand identity cascades to website styles", () => {
  const stale = getStaleFiles(["business/03-brand-identity.yaml"]);
  assertEquals(stale.includes("website/assets/styles.css"), true);
});

Deno.test("getStaleFiles: sitemap cascades to SEO brief", () => {
  const stale = getStaleFiles(["content/01-sitemap.yaml"]);
  assertEquals(stale.includes("content/03-seo-brief.md"), true);
});

Deno.test("getStaleFiles: deep cascade from business input", () => {
  const stale = getStaleFiles(["business/01-business-input.yaml"]);
  // Should cascade: input → strategy → identity → styles
  assertEquals(stale.includes("business/02-brand-strategy.md"), true);
  assertEquals(stale.includes("business/03-brand-identity.yaml"), true);
  assertEquals(stale.includes("website/assets/styles.css"), true);
});

Deno.test("getStaleFiles: no cascade for leaf files", () => {
  const stale = getStaleFiles(["content/05-checklist.md"]);
  assertEquals(stale.length, 0);
});

Deno.test("getStaleFiles: empty input returns empty", () => {
  const stale = getStaleFiles([]);
  assertEquals(stale.length, 0);
});

Deno.test("getStaleFiles: content deck cascades to routes", () => {
  const stale = getStaleFiles(["content/04-content-deck.md"]);
  assertEquals(stale.includes("website/routes/"), true);
});

Deno.test("getStaleFiles: multiple changes don't duplicate", () => {
  const stale = getStaleFiles([
    "business/04-business-model.md",
    "business/05-value-proposition.md",
  ]);
  // Both cascade to sitemap, should only appear once
  const sitemapCount = stale.filter(f => f === "content/01-sitemap.yaml").length;
  assertEquals(sitemapCount, 1);
});
