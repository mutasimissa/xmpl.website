# Contenty v4

**Build a complete, SEO-ready website from a conversation about your business.**

Tell an AI about your business in natural language. It researches your market,
builds strategy, writes content, and generates a production-ready website.
One repo, one business, one website.

```
business/  ──>  AI skills + blueprints  ──>  content/  ──>  website/
(your facts)    (methodology)               (derived)      (Fresh 2.2+ / Tailwind CSS 4)
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [What's New in v4](#whats-new-in-v4)
- [How It Works](#how-it-works)
- [Site Types](#site-types)
- [The Build Process](#the-build-process)
- [Content Lifecycle](#content-lifecycle)
- [Project Structure](#project-structure)
- [Build & Test Tasks](#build--test-tasks)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Agents](#agents)
- [Quality Rubrics](#quality-rubrics)
- [Internationalization](#internationalization)
- [Customization](#customization)
- [Architecture](#architecture)
- [Operating Principles](#operating-principles)
- [License](#license)

---

## Quick Start

### Prerequisites

- [Deno 2.x](https://deno.land/) -- runtime and task runner
- [Git](https://git-scm.com/) -- version control
- [Claude Code](https://claude.ai/) -- AI-powered development

### Get started in 3 steps

```bash
# 1. Clone the template
git clone https://github.com/your-org/contenty.git my-site
cd my-site

# 2. Place your logo files
#    assets/brand/logo.svg       (primary logo)
#    assets/brand/logo-icon.svg  (square icon)

# 3. Open Claude Code and run /start
```

Tell Claude about your business in natural language. It detects your project
state, guides you through each phase conversationally, and tells you exactly
what to do next. No configuration needed.

---

## What's New in v4

- **Single entry point** -- one `/start` command replaces 15 separate commands.
  It detects project state and routes conversationally.
- **Two-directory architecture** -- `business/` holds human-authored source of
  truth, `content/` holds derived deliverables that regenerate from business/.
- **Conversational intake** -- tell the AI about your business in natural
  language instead of filling a rigid questionnaire. Your exact words become
  copy seeds.
- **Market research** -- AI automatically researches competitors, discovers
  keywords, and captures real buyer language from forums and reviews.
- **Full business model** -- 12-dimension Business Model Canvas maps every
  business element to specific page decisions.
- **Full value proposition** -- Value Proposition Canvas with JTBD, pain/gain
  mapping, and proof matrix. Every website claim traces to verified evidence.
- **Component variants** -- Hero (4 variants), Section (6 variants), CTA (3
  variants) so pages look visually distinct instead of template-like.
- **Trust signal components** -- SocialProof, StatsBar, TestimonialCard,
  CaseStudyCard render conditionally when proof data exists.
- **Dynamic page generation** -- individual service pages from offers, audience
  pages from segments, blog infrastructure auto-scaffolded.
- **Context7 MCP** -- fetches up-to-date library docs for Fresh, Tailwind,
  Preact during development. No outdated API patterns.
- **Centralized validation** -- `deno task check` runs unified 7-section
  validation and auto-generates the QA checklist.

---

## How It Works

Contenty follows a structured pipeline where **business files are the source of
truth** and everything downstream is derived from them.

```
You talk about your business
        |
        v
business/01-business-input.yaml     <-- Your facts + AI-captured language
        |
        v
AI researches your market            <-- Competitors, keywords, buyer language
        |
        v
AI generates strategy, identity,
business model, value proposition     <-- Deep business analysis
        |
        v
content/ generated from business/    <-- Sitemap, briefs, SEO, copy
        |
        v
website/ built from content/         <-- Fresh 2.2+ / Tailwind CSS 4
```

### The 10-phase pipeline

1. **Conversational intake** -- you describe your business naturally; AI extracts
   structured data and captures your verbatim language
2. **Market research** -- AI researches competitors, discovers keywords, and
   captures real buyer language from forums and reviews
3. **Brand strategy** -- AI builds positioning, tone, messaging pillars
4. **Brand identity** -- AI extracts colors from your logo SVGs and generates
   design tokens (palette, typography, spacing)
5. **Business model** -- AI maps all 12 dimensions of your business
   (segments, channels, partnerships, competitive advantages, etc.)
6. **Value proposition** -- AI builds the full value proposition canvas with
   JTBD framework and proof matrix
7. **Sitemap & IA** -- AI plans pages, writes briefs, defines navigation
8. **SEO brief** -- AI defines keywords, metadata, schema markup, internal links
9. **Page copy** -- AI writes structured copy for every page
10. **Website build** -- CLI scaffolds Fresh project, AI fills routes with content

Every step produces files in `business/` or `content/`. The website reads those
files. Change the business files, and everything downstream follows.

---

## Site Types

Contenty auto-detects your site type from your intake answers and adjusts the
entire pipeline -- which phases run, which pages are created, and which validation
rules apply. You don't need to choose; it figures it out.

| Type | Best for | Pages | What gets built |
|------|----------|-------|-----------------|
| **Corporate** | Companies with services, team, blog | 8-15 | Full site with services, about, contact, blog, case studies |
| **Service** | Agencies, consultants, freelancers | 5-10 | Service pages with quote/booking flows, testimonials |
| **Personal Blog** | Authors, thought leaders, creators | 3-5 + posts | Blog-first site with about page, newsletter signup |
| **Booking** | Coaches, therapists, consultants | 1-3 | Focused site with prominent book-a-call widget |
| **Single Page** | Product launches, events, portfolios | 1 | Scrolling one-pager with all sections |
| **Coming Soon** | Pre-launch audience building | 1 | Placeholder page with email capture |

A coming-soon site skips SEO brief, sitemap, and page copy. A personal blog
skips offer design. A booking site skips sitemap planning. The system adapts
automatically.

---

## The Build Process

### Starting from scratch

Run `/start` in Claude Code. It walks you through each phase:

| # | Phase | What happens |
|---|-------|-------------|
| 1 | Conversational intake | Tell AI about your business in natural language |
| 2 | Market research | AI researches competitors, keywords, buyer language |
| 3 | Brand strategy | AI builds positioning, tone, messaging |
| 3b | Brand identity | AI extracts colors from logos, generates design tokens |
| 4 | Business model | AI maps 12 dimensions (segments, channels, advantages) |
| 4b | Value proposition | AI builds JTBD canvas and proof matrix |
| 4c | Personas | AI defines buyer personas with jobs, pains, gains |
| 5 | Sitemap & IA | AI plans pages and writes page briefs |
| 6 | SEO brief | AI defines keywords, metadata, schema |
| 7 | Page copy | AI writes structured copy for every page |
| 8 | Launch QA | AI scores everything against quality rubrics |
| 9 | Website build | CLI scaffolds Fresh project, AI fills routes |

All phases are accessed through `/start`. Phases that don't apply to your site
type are skipped automatically.

### How `/start` works

`/start` detects your project state and routes conversationally:

- **Empty project** -- opens with "Tell me about your business..." and guides
  you through the full pipeline
- **In-progress project** -- shows what's done and what's next, asks if you want
  to continue or change something
- **Launched project** -- asks what you'd like to do: add a page, write a blog
  post, update copy, add a language, run QA, etc.

---

## Content Lifecycle

### Adding and updating content

After your site is built, run `/start` and tell Claude what you want:

| Task | What to say |
|------|-------------|
| Add a page | "I want to add an FAQ page" |
| Add a blog post | "Write a blog post about X" |
| Add a landing page | "Create a landing page for our new offer" |
| Add a language | "Add Arabic to the site" |
| Remove a page | "Remove the pricing page" |
| Update content | "Update the homepage headline" |
| Run QA | "Check everything before launch" |

Claude routes to the right workflow based on your request.

### Dependency graph

Changes cascade through the pipeline. When you change a file, everything
downstream becomes stale:

```
business/01-business-input.yaml
  └─> business/02-brand-strategy.md
        ├─> business/03-brand-identity.yaml ──> website/assets/styles.css
        ├─> business/04-business-model.md ──┐
        ├─> business/05-value-proposition.md ├──> content/01-sitemap.yaml
        └─> business/06-personas-jtbd.md ──┘       └─> content/03-seo-brief.md
                                                          └─> content/04-content-deck.md
                                                                └─> website/routes/
```

`/start` detects these cascades and updates all downstream files automatically.

---

## Project Structure

```
contenty/
│
├── business/                   Source of truth (human-authored)
│   ├── 01-business-input.yaml      Core info, audiences, offers, design seeds
│   ├── 02-brand-strategy.md        Positioning, tone, messaging
│   ├── 03-brand-identity.yaml      Design tokens (colors, fonts, spacing)
│   ├── 04-business-model.md        Full 12-dimension business model
│   ├── 05-value-proposition.md     Value proposition canvas with proof matrix
│   └── 06-personas-jtbd.md         Personas with jobs/pains/gains
│
├── content/                    Derived (regeneratable from business/)
│   ├── 01-sitemap.yaml             Page inventory and navigation
│   ├── 02-page-briefs/             One brief per page
│   ├── 03-seo-brief.md             Keywords, metadata, schema
│   ├── 04-content-deck.md          Page-by-page copy
│   └── 05-checklist.md             Auto-generated QA tracking
│
├── agency/                     Reusable methodology
│   ├── blueprints/                  14 page structure templates
│   ├── methodology/                 Strategy and quality frameworks
│   ├── rubrics/                     8 scoring rubrics
│   ├── schemas/                     12 YAML validation schemas
│   ├── templates/                   12 starting templates for deliverables
│   └── site-types.yaml              Site type profiles and pipeline rules
│
├── skills/                     AI instructions (12 skills)
│   ├── business-intake/             Conversational intake
│   ├── market-research/             Competitor, keyword, and market language research
│   ├── brand-strategy/              Positioning and tone
│   ├── brand-identity/              Visual identity and design tokens
│   ├── offer-design/                Business model, value prop, personas
│   ├── sitemap-ia/                  Page structure and briefs
│   ├── seo-brief/                   Keyword strategy and metadata
│   ├── page-copy/                   Structured page copy
│   ├── blog-strategy/               Blog planning
│   ├── launch-qa/                   Pre-launch review
│   ├── website-init/                Fresh website scaffolding
│   └── testing/                     Automated test suite execution
│
├── tests/                      Testing infrastructure
│   ├── unit/                        Deno unit tests (34 tests)
│   ├── e2e/                         Playwright E2E specs (13 specs)
│   ├── features/                    BDD feature files (5 features)
│   ├── steps/                       Cucumber step definitions
│   ├── support/                     BDD world and hooks
│   └── ci/                          CI scripts (schema validation, drift check)
│
├── .github/                    CI/CD
│   ├── workflows/ci.yml             Validation, lint, unit tests, audit, drift
│   ├── workflows/preview.yml        Build, E2E, Lighthouse, broken links, visual diff, PR report
│   └── lighthouse/                  Lighthouse CI config
│
├── cli/                        Deno CLI automation
│   ├── check.ts                     Unified 7-section validator
│   ├── validate.ts                  Business file validator
│   ├── audit.ts                     Content coverage auditor
│   └── init-website.ts              Fresh project bootstrapper
│
├── website/                    Generated website (Fresh 2.2+ / Tailwind CSS 4)
├── assets/brand/               Logo files (logo.svg + logo-icon.svg)
└── docs/decisions/             Implementation decision records
```

---

## Build & Test Tasks

Run with `deno task <command>`:

### Validation

| Command | What it does |
|---------|-------------|
| `check` | Unified validation: logos, business files, brand assets, content audit, website SEO, CTA consistency. Auto-generates `content/05-checklist.md`. |
| `validate` | Check business files, YAML keys, brand assets, SEO files |
| `audit` | Content coverage audit (sitemap vs briefs vs copy vs routes vs SEO) |

### Building

| Command | What it does |
|---------|-------------|
| `init-website` | Bootstrap Fresh 2.2+ project in `website/` |

### Testing

| Command | What it does |
|---------|-------------|
| `test` | Run all tests (unit + E2E) |
| `test:unit` | Deno unit tests for CLI utilities |
| `test:e2e` | Playwright E2E tests against running website |
| `test:smoke` | Quick pre-launch smoke suite (critical subset of E2E) |
| `prelaunch` | Full pre-launch gate: `check` + `test:smoke` |

---

## Testing

Contenty includes a comprehensive testing infrastructure with unit tests, E2E
browser tests, and BDD feature specs. Tests are **data-driven** -- they read your
`content/01-sitemap.yaml` and site type config to dynamically generate test
cases for your specific site.

### Unit tests

```bash
deno task test:unit
```

34 tests covering CLI utilities:

- **Slug generation** -- `toSlug()` function (8 tests)
- **State detection** -- `detectStage()` for all 6 site types (12 tests)
- **Dependency graph** -- cascade traversal, stale file detection (9 tests)
- **Sitemap parsing** -- YAML to route expectations (5 tests)

### E2E tests (Playwright)

```bash
# Install Playwright (one-time)
cd tests/e2e && npm install && npx playwright install chromium

# Start your dev server
cd website && deno task start

# Run E2E tests
deno task test:e2e
```

13 spec files testing the running website:

| Spec | What it verifies |
|------|-----------------|
| `page-existence` | Every sitemap page returns HTTP 200 |
| `navigation` | Nav links match sitemap, correct hrefs, clickable |
| `footer` | Footer renders, links resolve, copyright present |
| `contact-form` | Form fields, validation, submission (per site type) |
| `booking-widget` | Booking link/widget renders with actual URL from business input (booking sites) |
| `broken-links` | All internal links on every page return 200 |
| `missing-images` | All `<img>` tags load successfully |
| `seo-meta` | OG tags, title length, description, canonical URL |
| `json-ld` | Valid JSON-LD structured data on every page |
| `hreflang` | Locale routes and hreflang tags (multilingual only) |
| `accessibility` | One H1/page, heading hierarchy, skip link, alt text |
| `smoke` | Critical pre-launch: CTA, robots.txt, sitemap.xml, 404 with branded content |
| `snapshots` | Full-page visual regression screenshots |

### BDD features (Cucumber)

5 feature files with Given/When/Then scenarios:

- **Page existence** -- all sitemap pages accessible
- **Navigation** -- nav bar visible, links match sitemap, clickable
- **Contact form** -- form present, fields exist, validation works
- **SEO** -- OG tags, JSON-LD, canonical URLs
- **Locale switching** -- alternate locale routes, hreflang tags

### Pre-launch gate

```bash
deno task prelaunch
```

Chains `check` + `test:smoke` into a single command. If any step fails, the
pipeline stops. Run this before publishing.

### MCP tools

Two MCP servers are configured in `.mcp.json`:

- **Playwright MCP** -- interactive browser testing within Claude Code. Claude
  can navigate your site, click elements, fill forms, take screenshots, and
  verify page behavior in real time.
- **Context7 MCP** -- real-time library documentation lookup. Claude fetches
  up-to-date API docs for Fresh, Tailwind CSS 4, Preact, and Deno before
  generating code. Prevents outdated patterns.

---

## CI/CD Pipeline

Two GitHub Actions workflows run automatically:

### `ci.yml` -- every push and PR

Fast checks that don't require a running server:

| Job | What it checks | Fails PR if |
|-----|----------------|-------------|
| **YAML & Schema Validation** | YAML syntax, required fields, schema compliance | Syntax errors or missing required fields |
| **Markdown Lint** | Formatting in `business/`, `agency/`, `skills/`, `docs/` | Markdown formatting issues |
| **Unit Tests** | All Deno unit tests | Any test failure |
| **Content Audit** | Sitemap vs briefs vs copy vs routes vs SEO coverage | Coverage gaps |
| **Drift Check** | Business files vs website routes alignment | Orphaned routes, missing routes, stale styles, locale mismatches |

### `preview.yml` -- PR only (requires website)

Full browser-based checks against the running dev server:

| Job | What it checks | Fails PR if |
|-----|----------------|-------------|
| **Build Preview** | Website compiles successfully | Build failure |
| **E2E Tests** | Full Playwright suite against dev server | Any E2E test failure |
| **Broken Links** | Crawl all links via lychee | Any broken link |
| **Lighthouse CI** | Performance, accessibility, SEO scores | Score below 0.9 |
| **Visual Diff** | Screenshot comparison against main branch | Uploads diffs as artifacts (advisory) |
| **PR Report** | Summary comment with all check statuses | Never (advisory) |

Lighthouse audits all pages in your sitemap (not just the homepage).
Visual diff snapshots are uploaded as build artifacts for manual review.

---

## Agents

Claude Code uses specialized agents that activate based on the task:

| Agent | Role | Key skills |
|-------|------|-----------|
| **strategist** | Positioning, audience, messaging, offers, sitemap | brand-strategy, offer-design, sitemap-ia |
| **copywriter** | Page copy, blog posts, tone alignment | page-copy, blog-strategy |
| **seo** | Keywords, metadata, schema, internal linking | seo-brief |
| **builder** | Website implementation from business files | website-init (uses Context7 MCP for current API docs) |
| **reviewer** | QA across all quality rubrics | launch-qa |
| **researcher** | Market research: competitors, keywords, buyer language | market-research + WebSearch |
| **qa-runner** | Automated validation + rubric scoring + smoke tests | CLI tools + all rubrics |

Each agent has a definition file in `.claude/agents/` with its role, owned
skills, source files, and guardrails. Agents adapt their behavior to your site
type -- a copywriter produces ultra-brief copy for a coming-soon site and
comprehensive multi-page content for a corporate site.

---

## Quality Rubrics

Every AI output is scored against rubrics before proceeding. Minimum average
score: **4/5** (accessibility and performance allow 3/5).

| Rubric | What it scores | Key criteria |
|--------|---------------|--------------|
| **Strategy** | Brand positioning | Audience clarity, differentiation, CTA alignment, proof readiness |
| **Copy** | Page content | Clarity, relevance, tone fit, trust signals, readability |
| **SEO** | Search optimization | Keyword targeting, metadata, schema, internal links, Core Web Vitals |
| **Brand Identity** | Visual design system | Palette coherence, contrast compliance, token completeness |
| **Accessibility** | Inclusive design | Semantic HTML, keyboard nav, WCAG AA contrast, ARIA labels |
| **Performance** | Page speed | LCP < 2.5s, INP < 200ms, CLS < 0.1, image optimization |
| **Launch** | Release readiness | Message consistency, conversion readiness, compliance |
| **Testing** | Automated test coverage | Unit tests, E2E coverage, smoke suite, CI pipeline status |

Rubric definitions live in `agency/rubrics/`. The `qa-runner` agent scores all
applicable rubrics and produces `content/05-checklist.md` with specific,
actionable fix recommendations.

---

## Internationalization

Contenty supports multilingual sites with locale-aware routing and RTL support.

### Adding a language

Run `/start` and say "Add Arabic to the site." Claude will:

- Create locale route directories (`website/routes/[locale]/`)
- Translate UI strings (`website/locales/[locale].json`)
- Add `<link rel="alternate" hreflang="...">` tags
- Update the locale switcher component
- Apply RTL styling if needed (Arabic, Hebrew, Farsi, Urdu, etc.)

### How locales work

- `business/01-business-input.yaml` defines `default_locale` and `locales`
- Translation files live in `website/locales/[locale].json`
- Locale routes are nested under `website/routes/[locale]/`
- RTL detection is automatic for: ar, he, fa, ur, ku, ps, sd, ug, yi
- E2E tests verify locale routes and hreflang tags when locales are configured

---

## Customization

### Page blueprints

Page blueprints in `agency/blueprints/` define the section structure for each
page type. Edit these to change what sections appear on your pages. 14 blueprints
are included:

`homepage`, `about-page`, `service-page`, `contact-page`, `faq-page`,
`pricing-page`, `blog-index`, `blog-post`, `case-study`, `industry-page`,
`market-page`, `local-landing-page`, `component-variants`, `dynamic-pages`

The AI reads blueprints when writing copy and building routes.

### YAML schemas

Schemas in `agency/schemas/` define the structure of each business file. The CI
pipeline validates your business files against these schemas on every push.
12 schemas are included:

`business-input`, `brand-strategy`, `brand-identity`, `business-model`,
`value-proposition`, `personas-jtbd`, `page-brief`, `seo-brief`, `content-deck`,
`blog-post`, `sitemap`, `build-spec`

### Site type profiles

`agency/site-types.yaml` defines which pages, skills, blueprints, and validation
rules apply for each site type. You can modify these profiles or add new site
types.

### Methodology frameworks

`agency/methodology/` contains frameworks for accessibility, brand identity,
business model, business intake, content strategy, CRO, market research, QA,
SEO, value proposition, and website delivery lifecycle. These guide the AI's
approach but can be customized.

---

## Architecture

### Technology stack

| Layer | Technology |
|-------|-----------|
| Runtime | [Deno 2.x](https://deno.land/) |
| Frontend | [Fresh 2.2+](https://fresh.deno.dev/) (Preact, server-rendered) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| Testing | [Playwright](https://playwright.dev/) (E2E) + Deno test (unit) + [Cucumber](https://cucumber.io/) (BDD) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| AI | [Claude Code](https://claude.ai/) with Playwright MCP + Context7 MCP |
| Link checking | [lychee](https://github.com/lycheeverse/lychee) |
| Performance | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) |

### Two-directory architecture

```
business/   Human-authored source of truth (6 files)
            Never auto-generated. Only the user or AI-with-user-approval edits these.

content/    Derived deliverables (5 files/dirs)
            Fully regeneratable from business/ at any time.
            Edit business/, then regenerate content/.

website/    Implementation derived from content/
            Built by CLI scaffolding + AI route population.
```

### Component variant system

Pages use shared components (Hero, Section, CTA) but each page type uses
different **variants** to look visually distinct:

| Component | Variants |
|-----------|----------|
| **Hero** | `centered` (default), `split` (two-column), `minimal` (compact), `image-bg` (full-width background) |
| **Section** | `default`, `cards` (grid), `split` (two-column), `full-bleed` (edge-to-edge), `stats` (metrics row), `testimonials` (quote cards) |
| **CTA** | `banner` (full-width), `inline` (compact), `card` (boxed) |

Each page type maps to specific variants in `agency/blueprints/component-variants.md`.

### Dynamic page generation

Pages automatically generated from business data:

- **Service pages** -- one `/services/[slug]` per offer in business input
- **Trust signals** -- SocialProof, StatsBar, TestimonialCard, CaseStudyCard
  components that render when proof data exists and disappear when empty
- **Blog infrastructure** -- `/blog` index + `/blog/[slug]` posts auto-scaffolded
  for corporate, service, and personal-blog types
- **Audience pages** -- `/for/[segment]` pages when 3+ target segments exist
  with distinct positioning

### SEO requirements (built-in)

Every page automatically includes:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)
- Twitter card meta tags

The website includes: `robots.txt`, `sitemap.xml` route, `manifest.json`, and a
custom 404 page with branding.

### Accessibility standards

- Semantic HTML (header, nav, main, section, article, footer)
- Proper heading hierarchy (one H1, H2 for sections, H3 for subsections)
- ARIA labels, skip-to-content link, visible focus indicators
- WCAG 2.2 AA color contrast (4.5:1 normal text, 3:1 large text)
- Keyboard navigable (Tab, Shift+Tab, Enter, Escape)
- Touch targets at least 44x44px
- Descriptive alt text on all images

### Performance targets

- LCP (Largest Contentful Paint) < 2.5s
- INP (Interaction to Next Paint) < 200ms
- CLS (Cumulative Layout Shift) < 0.1
- Server-side rendering by default (Fresh)
- Minimal client-side JavaScript (islands architecture)
- Lazy-loaded images with explicit width/height

### File dependency tracking

Claude handles dependency tracking between business and content files.
When you change a file, it identifies all downstream files that need updating:

```
business/01-business-input.yaml
  └─> business/02-brand-strategy.md
        ├─> business/03-brand-identity.yaml ──> website/assets/styles.css
        ├─> business/04-business-model.md ──┐
        ├─> business/05-value-proposition.md ├──> content/01-sitemap.yaml
        └─> business/06-personas-jtbd.md ──┘       └─> content/03-seo-brief.md
                                                          └─> content/04-content-deck.md
                                                                └─> website/routes/
```

### Business/website drift detection

The CI pipeline includes a drift checker (`tests/ci/drift-check.ts`) that fails
the PR if:

- A page in `content/01-sitemap.yaml` has no matching route in `website/routes/`
- A route exists in `website/routes/` but isn't in the sitemap (orphaned)
- Brand identity is newer than website styles (stale CSS)
- Locale files don't match the locales defined in business input

---

## Operating Principles

1. `business/` defines truth. `content/` is derived. `agency/` defines method.
   `website/` is implementation.
2. Never skip to code before business files are coherent.
3. Never invent business facts -- everything traces to `business/`.
4. Enrich with market research before making strategic decisions.
5. Always rebuild the website from business files, not the other way around.
6. Validate outputs against rubrics -- minimum average score of 4/5.
7. Record implementation decisions in `docs/decisions/`.
8. Prefer reuse over reinvention -- check blueprints, templates, and schemas first.

---

## License

[MIT](LICENSE) -- Copyright (c) 2025-2026 Mutasim Issa <@mutasimissa>
