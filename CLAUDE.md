# Claude Instructions

This repository represents **one business and one website only**.

## Priority order

1. `PROJECT.md`
2. `business/` as source of truth (human-authored)
3. `content/` as derived deliverables (regeneratable from business/)
4. `agency/` as methodology
5. `skills/` as AI instructions
6. `website/` as implementation target

## Two-directory architecture

```
business/   Source of truth (human-authored, not auto-generated)
  01-business-input.yaml    Core facts, offers, proof, seeds
  02-brand-strategy.md      Positioning, tone, pillars, CTA logic
  03-brand-identity.yaml    Colors, fonts, tokens (from logo)
  04-business-model.md      Full 12-dimension business model
  05-value-proposition.md   Value proposition canvas with proof matrix
  06-personas-jtbd.md       Personas with jobs/pains/gains

content/    Derived (fully regeneratable from business/)
  01-sitemap.yaml           Pages, navigation, goals, linking
  02-page-briefs/           Per-page briefs
  03-seo-brief.md           Keywords, metadata, schema plan
  04-content-deck.md        Actual page copy
  05-checklist.md           Auto-generated QA tracking
```

**Regeneration rule:** `content/` is fully regenerated from `business/` anytime.

## How to use skills

Each skill is a `SKILL.md` file in `skills/<name>/`. When asked to perform a
delivery phase, read and follow the corresponding skill file. It contains: role,
prerequisites, files to read, working method, output format, and validation
criteria.

Skills are site-type-aware. Check `site_type` in `business/01-business-input.yaml`
and consult `agency/site-types.yaml` to determine which skills, pages, and
validation rules apply for the current project.

## Build & test tasks

Run with `deno task <command>`:

- `validate` — check business files, YAML keys, brand assets, and SEO files
- `audit` — content audit (sitemap / brief / copy / route / SEO coverage)
- `check` — unified validation: logos, business, brand assets, content, rubrics
- `init-website` — bootstrap Fresh 2.2+ project in `website/`
- `test` — run all tests (unit + E2E)
- `test:unit` — Deno unit tests for CLI utilities
- `test:e2e` — Playwright E2E tests against running website
- `test:smoke` — quick pre-launch smoke suite (subset of E2E)
- `prelaunch` — full pre-launch gate: validate + audit + smoke tests

## Testing

Tests are data-driven from `content/01-sitemap.yaml` and site type config.

- **Unit tests** (`tests/unit/`) — Deno native, test CLI utilities
- **E2E tests** (`tests/e2e/specs/`) — Playwright, test the running website
- **BDD features** (`tests/features/`) — Cucumber Given/When/Then scenarios
- **CI scripts** (`tests/ci/`) — schema validation, drift detection, Lighthouse URLs
- **Playwright MCP** — interactive browser testing via Claude

### CI/CD (GitHub Actions)

- `.github/workflows/ci.yml` — YAML validation, markdown lint, unit tests,
  content audit, business/website drift check (every push and PR)
- `.github/workflows/preview.yml` — build preview, E2E tests, broken link check,
  Lighthouse CI, visual diff snapshots, PR summary report (PR only, requires website)

## Entry point

One command: `/start`. It detects project state and routes to the right workflow
based on conversation, not command names.

## Site types

The `site_type` field in `business/01-business-input.yaml` controls which pages,
skills, and validation rules apply. Defined in `agency/site-types.yaml`:

- **corporate** — multi-page company site (services, about, contact, blog), 8-15 pages
- **service** — service-oriented with booking/quote flows, 5-10 pages
- **personal-blog** — author-focused blog with about + posts, 3-5 pages + posts
- **booking** — book-a-call / appointment-driven, 1-3 pages
- **single-page** — one-page scrolling site with all sections, 1 page
- **coming-soon** — placeholder with email capture, minimal SEO, 1 page

## SEO requirements

Every page must have:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL via OGMeta
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)

The website must have: robots.txt, sitemap.xml route, manifest.json, custom 404.

## Agents

- `strategist` — positioning, audience, messaging, offers, sitemap
- `copywriter` — page copy, blog posts, tone alignment
- `seo` — keywords, metadata, OG tags, schema, internal linking
- `reviewer` — QA across all rubrics, launch checklist
- `builder` — website implementation from business files
- `researcher` — market validation, competitor research, keyword data
- `qa-runner` — automated QA via CLI tools, rubric scoring, structured reports

## Mandatory rules

- Never invent business facts outside `business/`.
- Never change positioning, audience, offers, or claims without updating the
  relevant file in `business/`.
- Use `agency/templates/` and `agency/schemas/` before generating new
  deliverables.
- Use `agency/blueprints/` for page structure and section logic.
- Validate outputs against `agency/rubrics/` — minimum average score of 4.
- Prefer reuse over reinvention.
- Keep implementation decisions documented in `docs/decisions/`.

## Boundaries

- Do not create extra businesses or project folders.
- Do not put business truth into code files only.
- Do not bypass `business/` when generating copy, metadata, or navigation.
- Do not skip to website implementation before business files are coherent.
- `content/` files are always derived — edit `business/` and regenerate.
