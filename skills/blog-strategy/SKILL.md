# Blog Strategy

> **Role:** You are a content strategist defining the blog's purpose, categories,
> content clusters, and publishing plan to build topical authority and capture
> informational search intent.

## Goal

Produce a blog strategy that aligns blog content with service pillars, maps
posts to buyer journey stages, and creates content clusters that build SEO
authority and drive readers to commercial pages.

## Prerequisites

- `business/02-brand-strategy.md` is complete
- `content/01-sitemap.yaml` is complete
- `content/03-seo-brief.md` is complete

## Read these files first

1. `business/01-business-input.yaml` — business context
2. `business/02-brand-strategy.md` — tone of voice, message pillars
3. `content/01-sitemap.yaml` — service pages to support
4. `content/03-seo-brief.md` — keyword opportunities, content clusters
5. `business/06-personas-jtbd.md` — audience context
6. `agency/methodology/content-strategy-framework.md` — content cluster model
7. `agency/methodology/seo-framework.md` — content cluster strategy
8. `agency/blueprints/blog-post.md` — post structure

## Working method

1. **Identify service pillars** — list the main service/solution pages from the
   sitemap. Each pillar becomes a content cluster hub.
2. **Define blog categories** — 3-5 categories aligned to service pillars and
   buyer interests (e.g. "Insights", "Guides", "Case Studies", "News").
3. **Plan content clusters** — for each pillar, plan 3-5 supporting blog posts:
   - Each post targets an informational keyword related to the pillar
   - Each post links back to the pillar page
   - Posts cover different buyer journey stages (awareness, evaluation, decision)
4. **Map posts to buyer journey** — classify each planned post:
   - **Awareness:** "What is X?", "Why does X matter?"
   - **Evaluation:** "How to choose X", "X vs Y comparison"
   - **Decision:** Case studies, implementation guides, ROI analyses
5. **Define the blog post template** — standard frontmatter fields, required
   sections, SEO requirements (from `agency/blueprints/blog-post.md`)
6. **Plan internal linking** — how blog posts link to service pages and to each
   other
7. **Define publishing cadence** — frequency and quality bar
8. **Present the plan** — ask the user to confirm categories, clusters, and
   priority posts before writing

## Output format

Write `business/11-blog-strategy.md` with this structure:

```markdown
# Blog Strategy

## Categories

- [Category 1]: [description, what topics it covers]
- [Category 2]: [description]
- [Category 3]: [description]

## Content clusters

### [Service Pillar 1] cluster

- **Pillar page:** [page name] ([primary keyword])
- **Supporting posts:**
  1. [Post title] — [keyword] — [journey stage]
  2. [Post title] — [keyword] — [journey stage]
  3. [Post title] — [keyword] — [journey stage]

### [Service Pillar 2] cluster

- **Pillar page:** [page name] ([primary keyword])
- **Supporting posts:**
  1. [Post title] — [keyword] — [journey stage]
  2. [Post title] — [keyword] — [journey stage]
  3. [Post title] — [keyword] — [journey stage]

## Publishing plan

- **Cadence:** [frequency]
- **Quality bar:** [minimum word count, required elements]
- **Priority order:** [which posts to write first and why]

## Internal linking rules

- Every post links to its pillar page
- Every post links to at least 1 related post
- Every post links to the contact page in the CTA section
- Pillar pages link back to their cluster posts
```

## Validation criteria

Before finishing, verify:

- [ ] Categories align with service pillars and buyer interests
- [ ] Every content cluster has 3-5 posts with specific keywords
- [ ] Posts are distributed across buyer journey stages
- [ ] Internal linking rules are clear and actionable
- [ ] Publishing cadence is realistic for the business
- [ ] Priority posts target keywords with real search volume

## Dependency chain

- **Requires:** `business/02-brand-strategy.md`, `content/01-sitemap.yaml`,
  `content/03-seo-brief.md`, `business/06-personas-jtbd.md`
- **Feeds into:** `/add-blog-post` (category selection),
  `skills/page-copy/` (blog post writing)

## Next step

After this skill: use `/add-blog-post` to scaffold individual posts, then
write content following `agency/blueprints/blog-post.md`

## Guardrails

- Blog must support commercial pages, not create standalone content islands
- Every post must map to a keyword with business relevance
- Quality over quantity — don't plan more posts than the business can maintain
- Never invent business facts — ask the user
- Keep all content strategy in `business/`
