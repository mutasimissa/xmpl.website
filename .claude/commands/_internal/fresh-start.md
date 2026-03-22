---
description: Full guided build from scratch — intake through live website
---

Run the complete Contenty pipeline from business intake to a fully built website.

## Phase 1: Business Foundation
1. Ask the user 5 core questions conversationally:
   1. Business name
   2. What the business does / website goal
   3. Industry
   4. Who it serves (target audience)
   5. Primary CTA (what should visitors do)
   Write the answers into `business/01-business-input.yaml`. Check for logo files at `assets/brand/logo.svg` and `assets/brand/logo-icon.svg`.
2. Run `/init-business` to expand all seed fields conversationally.
3. Read `business/01-business-input.yaml` — check the `site_type` field.
   - If empty, detect from `website_goal`, `offers`, `primary_cta`:
     - No offers + blog focus → `personal-blog`
     - Single CTA is booking link → `booking`
     - "coming soon" or "placeholder" → `coming-soon`
     - "single page" or "one page" → `single-page`
     - Multiple services + team → `corporate`
     - Service-heavy + quote/contact → `service`
   - Confirm detected type with the user. Write to `site_type` field.
4. Read `agency/site-types.yaml` — identify which skills to run and which to skip for this site_type.
5. **Checkpoint:** Show the user the build plan — list phases that will run and which are skipped. Wait for confirmation.

## Phase 2: Brand & Strategy
6. Read `skills/brand-strategy/SKILL.md`. Follow every step to produce `business/02-brand-strategy.md`. Score against `agency/rubrics/strategy-rubric.md` — minimum average 4.
7. Read `skills/brand-identity/SKILL.md`. Follow every step to produce `business/03-brand-identity.yaml`. Score against `agency/rubrics/brand-identity-rubric.md` — minimum average 4.

## Phase 3: Offers & Structure (skip for coming-soon, single-page)
8. If site_type requires it: Read `skills/offer-design/SKILL.md`. Follow every step to produce `business/04-business-model.md`, `business/05-value-proposition.md`, and `business/06-personas-jtbd.md`.
9. If site_type requires it: Read `skills/sitemap-ia/SKILL.md`. Use `agency/site-types.yaml` required_pages as baseline. Follow every step to produce `content/01-sitemap.yaml` and page briefs in `content/02-page-briefs/`.

## Phase 4: SEO & Content
10. If site_type requires it: Read `skills/seo-brief/SKILL.md`. Follow every step to produce `content/03-seo-brief.md`. Score against `agency/rubrics/seo-rubric.md` — minimum average 4.
11. For each page in `content/01-sitemap.yaml` (or the single page for single-page/coming-soon types), read the page brief and follow `skills/page-copy/SKILL.md` to write copy. Append each page's copy to `content/04-content-deck.md`. Score against `agency/rubrics/copy-rubric.md`.

## Phase 5: QA & Validation
12. **Checkpoint:** Run `deno task validate` to verify all business files are complete and valid. Show results to user. Fix any issues before proceeding.
13. If site_type requires it: Read `skills/launch-qa/SKILL.md`. Score all business files against all rubrics. Produce `content/05-checklist.md`.

## Phase 6: Website Build
14. Run `deno task init-website` to scaffold the Fresh project and generate branded files.
15. Read `skills/website-init/SKILL.md`. Populate every route with content from the content deck, SEO metadata from the SEO brief, OG tags via `OGMeta` component, and JSON-LD via `JsonLd` component.
16. **Checkpoint:** Run `deno task audit` to verify content coverage. Show results to user.
17. Verify that all routes render correctly and content matches the content deck.
