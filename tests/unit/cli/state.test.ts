import { assertEquals } from "@std/assert";

// Re-implement detectStage logic for testing (mirrors cli/_shared/state.ts)
type ProjectStage = "empty" | "intake-done" | "strategy-done" | "identity-done" | "offers-done" | "sitemap-done" | "content-done" | "launched" | "live";
type SiteType = "corporate" | "service" | "personal-blog" | "booking" | "single-page" | "coming-soon" | null;

const detectStage = (completed: string[], siteType: SiteType): ProjectStage => {
  const has = (f: string) => completed.includes(f);

  if (siteType === "coming-soon" || siteType === "single-page") {
    if (
      has("business/02-brand-strategy.md") &&
      has("business/03-brand-identity.yaml") &&
      has("content/04-content-deck.md")
    ) {
      return "content-done";
    }
  }

  if (siteType === "booking") {
    if (
      has("business/04-business-model.md") &&
      has("business/05-value-proposition.md") &&
      has("business/06-personas-jtbd.md") &&
      has("content/04-content-deck.md")
    ) {
      return "content-done";
    }
  }

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

Deno.test("detectStage: empty when no files", () => {
  assertEquals(detectStage([], null), "empty");
});

Deno.test("detectStage: intake-done with business input", () => {
  assertEquals(detectStage(["business/01-business-input.yaml"], null), "intake-done");
});

Deno.test("detectStage: strategy-done with brand strategy", () => {
  assertEquals(
    detectStage(["business/01-business-input.yaml", "business/02-brand-strategy.md"], null),
    "strategy-done"
  );
});

Deno.test("detectStage: identity-done with brand identity", () => {
  assertEquals(
    detectStage([
      "business/01-business-input.yaml",
      "business/02-brand-strategy.md",
      "business/03-brand-identity.yaml",
    ], "corporate"),
    "identity-done"
  );
});

Deno.test("detectStage: offers-done with all offer files", () => {
  assertEquals(
    detectStage([
      "business/01-business-input.yaml",
      "business/02-brand-strategy.md",
      "business/03-brand-identity.yaml",
      "business/04-business-model.md",
      "business/05-value-proposition.md",
      "business/06-personas-jtbd.md",
    ], "corporate"),
    "offers-done"
  );
});

Deno.test("detectStage: sitemap-done with sitemap and SEO brief", () => {
  assertEquals(
    detectStage([
      "business/01-business-input.yaml",
      "business/02-brand-strategy.md",
      "business/03-brand-identity.yaml",
      "business/04-business-model.md",
      "business/05-value-proposition.md",
      "business/06-personas-jtbd.md",
      "content/01-sitemap.yaml",
      "content/03-seo-brief.md",
    ], "corporate"),
    "sitemap-done"
  );
});

Deno.test("detectStage: content-done with content deck and checklist", () => {
  assertEquals(
    detectStage([
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
    ], "corporate"),
    "content-done"
  );
});

// Site-type-specific shortcuts
Deno.test("detectStage: coming-soon shortcut to content-done", () => {
  assertEquals(
    detectStage([
      "business/02-brand-strategy.md",
      "business/03-brand-identity.yaml",
      "content/04-content-deck.md",
    ], "coming-soon"),
    "content-done"
  );
});

Deno.test("detectStage: single-page shortcut to content-done", () => {
  assertEquals(
    detectStage([
      "business/02-brand-strategy.md",
      "business/03-brand-identity.yaml",
      "content/04-content-deck.md",
    ], "single-page"),
    "content-done"
  );
});

Deno.test("detectStage: booking shortcut to content-done", () => {
  assertEquals(
    detectStage([
      "business/04-business-model.md",
      "business/05-value-proposition.md",
      "business/06-personas-jtbd.md",
      "content/04-content-deck.md",
    ], "booking"),
    "content-done"
  );
});

Deno.test("detectStage: booking without content deck is offers-done", () => {
  assertEquals(
    detectStage([
      "business/04-business-model.md",
      "business/05-value-proposition.md",
      "business/06-personas-jtbd.md",
    ], "booking"),
    "offers-done"
  );
});

Deno.test("detectStage: personal-blog follows standard path", () => {
  assertEquals(
    detectStage([
      "business/01-business-input.yaml",
      "business/02-brand-strategy.md",
    ], "personal-blog"),
    "strategy-done"
  );
});
