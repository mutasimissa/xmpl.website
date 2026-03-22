# Website Delivery Lifecycle

## Goal

Deliver and maintain commercial websites through a repeatable, strategy-first
workflow that supports both initial launch and ongoing operations.

## First Launch (linear, one-time)

| Phase               | Deliverable                                          | Produced by                                       |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| 1. Business intake  | `business/01-business-input.yaml`                    | `/start` (conversational)                         |
| 2. Market research  | Enriches `business/01-business-input.yaml`           | `skills/market-research/`                         |
| 3. Brand strategy   | `business/02-brand-strategy.md`                      | `skills/brand-strategy/`                          |
| 3b. Brand identity  | `business/03-brand-identity.yaml`                    | `skills/brand-identity/`                          |
| 4. Offer design     | `business/04-*`, `05-*`, `06-*`                      | `skills/offer-design/`                            |
| 5. Sitemap & IA     | `content/01-sitemap.yaml`, `content/02-page-briefs/` | `skills/sitemap-ia/`                              |
| 6. SEO brief        | `content/03-seo-brief.md`                            | `skills/seo-brief/`                               |
| 7. Page copy        | `content/04-content-deck.md`                         | `skills/page-copy/`                               |
| 8. Launch QA        | `content/05-checklist.md`                            | `skills/launch-qa/`                               |
| 9. Website build    | `website/`                                           | `deno task init-website` + `skills/website-init/` |

## Ongoing Operations (cyclical, recurring)

### Content operations

- **Add a page** — `/add-page` → brief → copy → route
- **Write a blog post** — `/add-blog-post` → draft → publish
- **Create a landing page** — `/add-landing-page` → brief → copy → route
- **Update page copy** — re-run `skills/page-copy/` for the target page

### Strategy updates

- **Refine positioning** — re-run `skills/brand-strategy/`
- **Add or change offers** — re-run `skills/offer-design/`
- **Expand sitemap** — re-run `skills/sitemap-ia/` or use `/add-page`
- **Refresh SEO** — re-run `skills/seo-brief/`
- **Update personas** — re-run `skills/offer-design/`

### Quality and compliance

- **Validate files** — `deno task validate`
- **Content audit** — `deno task audit`
- **Launch / relaunch QA** — `skills/launch-qa/`
- **Prelaunch check** — `deno task prelaunch`

### Infrastructure

- **Analytics setup** — `deno task analytics` → `docs/decisions/analytics.md`
- **Brand assets** — `deno task brand-check` → verify logo naming
- **Add a locale** — `/add-locale`
- **Bootstrap website** — `deno task init-website`

## Central entry point

Run `/start` in Claude Code for any project state. It detects stage and routes to propagate
changes. Claude detects the project stage and guides you through the right
workflow — whether you're launching for the first time, adding content, updating
strategy, or running an audit.

## Non-negotiables

- Strategy before implementation
- One source of truth in `business/`
- Use page briefs before page copy
- Validate every major output using a rubric
- Never invent business facts — ask the user
- Record decisions in `docs/decisions/`
