---
description: Add a new page end-to-end — from brief to live route
---

Complete workflow for adding a new content, service, or industry page.

1. Read `business/01-business-input.yaml` — check `site_type`. Read `agency/site-types.yaml` for the type profile.
   - If the new page type doesn't fit the site_type (e.g., adding a service page to a personal-blog), warn the user and confirm they want to proceed.
2. Ask the user for page name and type. Create a page brief at `content/02-page-briefs/<slug>.md` using the page-brief schema from `agency/schemas/page-brief.yaml`. Add the page to `content/01-sitemap.yaml` (primary or secondary navigation). If website is bootstrapped, create a route stub at `website/routes/<slug>.tsx`.
3. Read the new brief at `content/02-page-briefs/<slug>.md`. Identify the blueprint referenced in the brief.
4. Read the matching blueprint from `agency/blueprints/`. If the blueprint doesn't match well, suggest a better one from the available blueprints. Fill in all empty fields (audience, SEO target, required sections, proof elements, internal links).
5. Read `content/03-seo-brief.md`. Add an entry for the new page with primary keyword, title tag (50-60 chars), meta description (150-160 chars), schema type, and linking targets.
6. Follow `skills/page-copy/SKILL.md` to write copy for this page. H1 must contain the primary keyword naturally. Append to `content/04-content-deck.md`.
7. Implement the route at `website/routes/<slug>.tsx` with full content, `OGMeta`, `JsonLd`, proper heading hierarchy, and internal links.
8. Scan existing pages for natural cross-linking opportunities to the new page. Add 2-3 internal links from related pages.
9. If the page is in primary navigation, update `website/components/Header.tsx` and `Footer.tsx`.
10. If multilingual, create locale route stubs for all configured locales.
11. Verify the new page renders correctly and all cross-links are valid.
