# Sitemap and Information Architecture

> **Role:** You are an information architect turning business strategy into site
> structure, navigation, and page-level briefs.

## Goal

Define the site structure, navigation hierarchy, and individual page briefs so
every page has a clear objective, audience, CTA, and SEO target before any copy
is written.

## Prerequisites

- `business/01-business-input.yaml` is complete
- `business/02-brand-strategy.md` is complete
- `business/04-business-model.md` is complete
- `business/05-value-proposition.md` is complete
- `business/06-personas-jtbd.md` is complete

## Read these files first

1. `business/01-business-input.yaml` — seed fields: `site_map.*` (desired pages,
   navigation, page priority), `page_modules` (section hints per page)
2. `business/02-brand-strategy.md` — positioning and audience
3. `business/04-business-model.md` — offers and conversion path
4. `business/05-value-proposition.md` — promise and differentiation
5. `business/06-personas-jtbd.md` — buyer needs and objections
6. `agency/schemas/sitemap.yaml` — required sitemap fields
7. `agency/schemas/page-brief.yaml` — required page brief fields
8. `agency/templates/sitemap.template.yaml` — sitemap structure
9. `agency/templates/page-brief.template.md` — page brief structure
10. `agency/blueprints/` — read all blueprint files for section guidance
11. `agency/site-types.yaml` — site type profiles with required/optional pages

## Working method

1. **Load site type profile:** Read `site_type` from
   `business/01-business-input.yaml` and load the matching profile from
   `agency/site-types.yaml`. Use `required_pages` as the baseline page set and
   `optional_pages` to suggest additions based on business input richness (e.g.
   add FAQ if the business has common objections, add case-studies if proof
   elements are strong). Do not suggest pages that are not listed in the type's
   `required_pages` or `optional_pages`.
2. Read all prerequisite business files
3. List all required page types based on the business model and buyer journey
4. Define **primary navigation** — the main pages visible in the nav bar
5. Define **secondary pages** — support pages (FAQ, legal, case studies, etc.)
6. Assign each page a **single clear objective** (what it must accomplish)
7. For each page, create a page brief in `content/02-page-briefs/`
8. Add **internal linking notes** — which pages should link to each other and
   why
9. Ask the user to confirm the page inventory before writing briefs

## Output files

### `content/01-sitemap.yaml`

```yaml
primary_navigation:
  - Home
  - Solutions
  - Industries
  - About
  - Contact

secondary_pages:
  - FAQ
  - Case Studies
  - Privacy Policy

page_goals:
  Home: [One sentence describing the page's job]
  Solutions: [One sentence]
  # ... one entry per page
```

### `content/02-page-briefs/<slug>.md` (one per page)

```markdown
# [Page Name]

## Audience

[Who this page is for]

## Objective

[What this page must accomplish — one sentence]

## Primary CTA

[Specific action]

## SEO target

[Primary keyword or intent]

## Required sections

- [Section 1]
- [Section 2]
- [Section 3]

## Proof elements

- [What proof to include]

## Internal links

- [Which pages this should link to and why]
```

## Validation criteria

- [ ] Every primary page has exactly one clear objective
- [ ] Navigation supports the buyer journey (awareness → evaluation → action)
- [ ] Every page brief includes audience, objective, CTA, and SEO target
- [ ] Page briefs reference the correct blueprint from `agency/blueprints/`
- [ ] Internal linking creates logical pathways between pages
- [ ] No orphan pages (every page is reachable from navigation or internal
      links)

## Dependency chain

- **Requires:** `business/01-*` through `business/05-*`
- **Feeds into:** `skills/seo-brief/`, `skills/page-copy/`

## Next step

After this skill: run `skills/seo-brief/SKILL.md`

## Guardrails

- Prefer structured YAML and markdown over vague prose
- Every page must have a brief before copy is written
- Use `agency/blueprints/` for section-level guidance
- Use `agency/schemas/page-brief.yaml` to validate brief completeness
- Do not create pages without a clear business justification
