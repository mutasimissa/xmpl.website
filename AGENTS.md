# Repository Instructions

This is a **single-business website system** (v4).

## Meaning of folders

- `business/` = source of truth (strategy, offers, personas — human-authored)
- `content/` = derived deliverables (sitemap, briefs, copy, checklist — regeneratable)
- `agency/` = reusable method (frameworks, templates, schemas, rubrics, blueprints)
- `website/` = implementation (Fresh 2.2+ / Tailwind 4 / Deno)
- `skills/` = AI instructions (each skill is a SKILL.md you follow step by step)
- `cli/` = Deno automation scripts (validation, audit, check, website init)

## How to use skills

Each skill is a `SKILL.md` file in `skills/<name>/`. When asked to perform a
delivery phase:

1. Read the SKILL.md
2. Read the files it lists under "Read these files first"
3. Follow the working method step by step
4. Write outputs in the specified format
5. Validate against the criteria before finishing

Skills are site-type-aware. Check `site_type` in `business/01-business-input.yaml`
and consult `agency/site-types.yaml` to determine which skills and pages apply.

## Agents

- **strategist** — positioning, audience, messaging, offer structure, sitemap,
  and business-facing site strategy. Loads all business inputs in parallel and
  validates market claims via web search when available.
- **copywriter** — homepage, service pages, about pages, contact pages, blog
  posts, and structured web copy. Adapts copy depth to site type (ultra-brief
  for coming-soon, comprehensive for corporate).
- **seo** — keyword strategy, intent mapping, metadata, internal links, OG tags,
  schema markup. Produces simplified briefs for minimal-SEO site types and
  validates keywords via web search when available.
- **reviewer** — final quality review against all rubrics and launch-readiness
  checks. Runs CLI validation tools before manual review.
- **builder** — translates approved business and content files into website
  implementation (routes, components, SEO, styling). Uses Context7 MCP for
  up-to-date Fresh/Tailwind/Preact API docs. Reads site type to determine
  required pages and runs scaffolding before implementing routes.
- **researcher** — runs market research after intake: competitor extraction,
  keyword discovery, and market-language analysis. Enriches business input with
  `competitor_analysis`, SEO keyword seeds, and `market_language` fields.
  Supports strategist and SEO agents with verified findings.
- **qa-runner** — automated QA that runs CLI validation tools, scores every
  applicable rubric, and produces a structured report with pass/fail status and
  fix recommendations. Adapts checks to site type.

## Build & test tasks

Run with `deno task <command>`:

- `check` — unified validation: logos, business files, brand assets, content
  audit, website SEO, CTA consistency. Generates `content/05-checklist.md`.
- `validate` — check business files, YAML keys, brand assets, and SEO files
- `audit` — content audit (sitemap / brief / copy / route / SEO coverage)
- `init-website` — bootstrap Fresh 2.2+ project in `website/`
- `test` — run all tests (unit + E2E)
- `test:unit` — Deno unit tests for CLI utilities
- `test:e2e` — Playwright E2E tests against running website
- `test:smoke` — quick pre-launch smoke suite (subset of E2E)
- `prelaunch` — full pre-launch gate: `check` + `test:smoke`

## Entry point

One command: `/start`. It detects project state and routes to the right
workflow conversationally. Users never need to know skill names or file paths.

- **Empty project** — conversational intake, then auto-continues through pipeline
- **In-progress project** — shows progress, asks "continue or change something?"
- **Launched project** — asks what you want to do (add page, blog post, edit, etc.)

## SEO requirements

Every page must have:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL via OGMeta
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)

The website must have: robots.txt, sitemap.xml route, manifest.json, custom 404.

## Rules

- Always read `PROJECT.md` first.
- Use `business/` as the source of truth.
- `content/` is derived from `business/` — regenerate, don't edit directly.
- Use `agency/` for frameworks, templates, schemas, blueprints, and rubrics.
- Only implement into `website/` after business files are coherent.
- Review outputs against `agency/rubrics/` — minimum average score of 4.
- Keep this repository focused on one business only.

## Recommended workflow

```
1. /start              → business/01-business-input.yaml  (conversational intake)
2. market-research     → enriches business input           (competitor, keyword, market language)
3. brand-strategy      → business/02-brand-strategy.md
4. brand-identity      → business/03-brand-identity.yaml   (extracted from logo SVGs)
5. offer-design        → business/04-business-model.md
                         business/05-value-proposition.md
                         business/06-personas-jtbd.md
6. sitemap-ia          → content/01-sitemap.yaml
                         content/02-page-briefs/
7. seo-brief           → content/03-seo-brief.md
8. page-copy           → content/04-content-deck.md
9. launch-qa           → content/05-checklist.md
10. init-website       → website/
```

## Content lifecycle

All content operations route through `/start` when the project is in the
`launched` stage:

- "Add a page" — creates brief, writes copy, generates route
- "Add a blog post" — writes post, publishes
- "Add a landing page" — creates conversion-focused page
- "Add a language" — adds locale routes, translations, hreflang
- "Remove a page" — cleans up sitemap, content, and route

## Output discipline

- Prefer structured outputs first.
- Do not skip straight to code.
- Do not create implementation that contradicts the business files.
- Do not invent business facts — ask the user.
