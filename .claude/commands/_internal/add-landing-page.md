---
description: Add a conversion-focused landing page end-to-end
---

Complete workflow for creating a conversion-focused landing page.

1. Read `business/01-business-input.yaml` — check `site_type` and `primary_cta`.
2. Ask the user for landing page name and CTA goal. Create a page brief at `content/02-page-briefs/<slug>.md`. Add to `content/01-sitemap.yaml`. Create route stub at `website/routes/<slug>.tsx` if the website exists.
3. Read the brief, `agency/blueprints/local-landing-page.md`, `agency/methodology/cro-framework.md`, and `business/05-value-proposition.md`.
4. Fill in the brief completely with audience, SEO target, conversion-focused sections, and proof elements.
5. Read `content/03-seo-brief.md`. Add an entry for the landing page with primary keyword, title tag, meta description, and schema type.
6. Write conversion-focused copy following the CRO framework:
   - Hero + primary CTA above the fold
   - Problem statement that resonates with the target audience
   - Solution summary tied to business value proposition
   - Proof section (testimonials, stats, credentials)
   - Objection handling (FAQ or comparison)
   - Final CTA with urgency or scarcity element
   - CTA text describes the outcome, not the action
7. Implement the route with minimal navigation (focused conversion), `OGMeta`, `JsonLd`, and mobile-first CTA placement.
8. Verify the landing page renders correctly with proper conversion flow.
