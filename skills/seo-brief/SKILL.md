# SEO Brief

> **Role:** You are an SEO strategist defining keyword strategy, search intent
> mapping, and metadata direction aligned to business goals.

## Goal

Create an SEO brief that maps keywords to pages, classifies search intent,
defines metadata strategy, and identifies schema and FAQ opportunities — all
grounded in the business strategy, not vanity metrics.

## Prerequisites

- `business/01-business-input.yaml` through `content/02-page-briefs/` are
  complete
- Run `skills/sitemap-ia/` first

## Read these files first

1. `business/01-business-input.yaml` — industry, offers, audience + seed fields:
   `seo.*` (keywords, intent mapping, geo targets, topical authority clusters),
   `seo_content.*` (FAQ questions, glossary, blog topics, comparison/landing
   pages)
2. `business/02-brand-strategy.md` — positioning and message pillars
3. `business/05-value-proposition.md` — promise and differentiation
4. `content/01-sitemap.yaml` — page inventory
5. `content/02-page-briefs/` — read all page briefs
6. `agency/methodology/seo-framework.md` — required deliverables
7. `agency/templates/seo-brief.template.md` — output structure
8. `agency/schemas/seo-brief.yaml` — required fields
9. `agency/rubrics/seo-rubric.md` — scoring criteria

## Working method

1. Read all prerequisite files
2. Map **commercial intent** — what do buyers search for when looking for this
   type of business?
3. Identify **primary keywords** for each page based on the page's objective
4. Classify **intent clusters**: commercial, informational, navigational,
   transactional
5. Create **page-to-keyword mapping** — each page owns specific keywords
6. Draft **metadata direction** — title tag and meta description patterns for
   each page
7. Identify **schema markup opportunities** (Organization, WebSite, FAQPage,
   BreadcrumbList, Service, etc.)
8. Identify **FAQ opportunities** — common questions that map to buyer
   objections
9. Note **E-E-A-T signals** — how to demonstrate Experience, Expertise,
   Authoritativeness, Trustworthiness
10. Plan **internal linking** — which pages should link to which for SEO value
    flow

## Output format

Write `content/03-seo-brief.md`:

```markdown
# SEO Brief

## Primary keywords

- [keyword 1] → [target page]
- [keyword 2] → [target page]
- [keyword 3] → [target page]

## Intent clusters

- **Commercial:** [keywords with buying intent]
- **Informational:** [keywords with learning intent]
- **Navigational:** [brand and direct queries]

## Page mapping

- Home → [primary keyword, secondary keywords]
- Solutions → [primary keyword, secondary keywords]
- [... one entry per page]

## Metadata direction

### Home

- Title: [pattern]
- Description: [pattern]

### [Page name]

- Title: [pattern]
- Description: [pattern]

## Schema opportunities

- [Schema type 1]: [which pages, why]
- [Schema type 2]: [which pages, why]

## FAQ opportunities

- [Question 1] → [target page]
- [Question 2] → [target page]

## E-E-A-T signals

- **Experience:** [how to demonstrate]
- **Expertise:** [how to demonstrate]
- **Authoritativeness:** [how to demonstrate]
- **Trustworthiness:** [how to demonstrate]

## Internal linking plan

- [Page A] → [Page B]: [reason]
- [Page B] → [Page C]: [reason]

## Canonical URL pattern

- Pattern: `https://DOMAIN/<slug>`
- Locale pattern: `https://DOMAIN/<locale>/<slug>`
- Trailing slash: [yes/no]

## OG image strategy

- Default: `/og-image.png` (1200×630, brand colors, business name)
- Per-page: [describe any page-specific OG images if needed]

## Structured data plan

- **All pages:** Organization, WebSite, BreadcrumbList
- **Service pages:** Service
- **FAQ sections:** FAQPage
- **Blog posts:** Article
- **Contact page:** LocalBusiness (if applicable)

## Content cluster strategy

- **Pillar page:** [main topic page] → clusters around [theme]
- **Supporting posts:** [3-5 blog post ideas that link back to the pillar]
- **Intent coverage:** [how clusters cover awareness → evaluation → decision]
```

## Validation criteria

Score output against `agency/rubrics/seo-rubric.md`. Before finishing:

- [ ] Every page has at least one primary keyword assigned
- [ ] Intent is stated for every keyword cluster
- [ ] Metadata direction is practical (not generic)
- [ ] Schema opportunities are specific to page types
- [ ] Keywords reinforce business priorities (not random traffic)
- [ ] E-E-A-T signals are actionable
- [ ] Canonical URL pattern is defined
- [ ] OG image strategy is defined
- [ ] Structured data plan covers all page types
- [ ] Content cluster strategy links blog to service pages

## Dependency chain

- **Requires:** `business/01-*` through `business/06-*`, `content/01-sitemap.yaml`,
  `content/02-page-briefs/`
- **Feeds into:** `skills/page-copy/`

## Next step

After this skill: run `skills/page-copy/SKILL.md`

## Guardrails

- SEO must reinforce business priorities, not chase vanity traffic
- Prefer structured markdown over prose
- Keep all business truth in `business/`
- Do not optimize pages without business relevance
- H1 must contain primary keyword (not just a brand tagline)
- Meta description must include primary keyword + action verb
- Validate output against the SEO rubric before finishing
