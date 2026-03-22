import { assertEquals } from "@std/assert";
import { toSlug } from "../../../cli/_shared/files.ts";

Deno.test("toSlug: simple name", () => {
  assertEquals(toSlug("Services"), "services");
});

Deno.test("toSlug: multi-word name", () => {
  assertEquals(toSlug("Case Studies"), "case-studies");
});

Deno.test("toSlug: name with special characters", () => {
  assertEquals(toSlug("FAQ & Help"), "faq-help");
});

Deno.test("toSlug: name with leading/trailing hyphens", () => {
  assertEquals(toSlug("--test--"), "test");
});

Deno.test("toSlug: Home page", () => {
  assertEquals(toSlug("Home"), "home");
});

Deno.test("toSlug: already lowercase", () => {
  assertEquals(toSlug("about"), "about");
});

Deno.test("toSlug: numbers preserved", () => {
  assertEquals(toSlug("Step 1 Guide"), "step-1-guide");
});

Deno.test("toSlug: multiple spaces collapsed", () => {
  assertEquals(toSlug("Privacy   Policy"), "privacy-policy");
});
