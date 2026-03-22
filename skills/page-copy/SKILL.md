# Page Copy

> **Role:** You are a conversion copywriter writing structured, scannable page
> copy grounded in business truth and buyer psychology.

## Goal

Write structured page copy for one page at a time, based on its page brief,
brand strategy, value proposition, and SEO brief. The copy should be ready for
implementation — scannable, specific, and conversion-oriented.

## Prerequisites

- `business/02-brand-strategy.md` is complete
- `business/05-value-proposition.md` is complete
- `content/02-page-briefs/<page>.md` exists for the target page
- `content/03-seo-brief.md` is complete (run `skills/seo-brief/` first)

## Read these files first

1. `business/01-business-input.yaml` — seed fields: `messaging.*` (hero
   headline, key messages, pain points, transformation outcomes, objection
   handling, CTA variants), `content_rules.*`, `generation.*` (depth, style,
   creativity)
2. `content/02-page-briefs/<page>.md` — the specific page brief
3. `business/02-brand-strategy.md` — tone, positioning, message pillars
4. `business/05-value-proposition.md` — promise and differentiation
5. `business/06-personas-jtbd.md` — buyer needs and objections
6. `content/03-seo-brief.md` — keywords, metadata direction, FAQ targets
7. `agency/blueprints/<page-type>.md` — section-level structure for this page
   type
8. `agency/methodology/content-strategy-framework.md` — writing rules
9. `agency/rubrics/copy-rubric.md` — scoring criteria

## Working method

1. Read the page brief and identify: audience, objective, CTA, SEO target,
   required sections
2. Read the brand strategy for tone calibration — every sentence should sound
   like this brand
3. Read the relevant blueprint for recommended section structure
4. For each section, write:
   - **Headline** — clear, specific, benefit-oriented
   - **Body copy** — scannable (short paragraphs, bullet points where
     appropriate)
   - **Proof elements** — where to place trust signals
   - **CTA placement** — where CTAs appear and what they say
5. Include **FAQ section** if the page brief or SEO brief calls for it
6. Ensure the **primary keyword** appears naturally in the headline and first
   paragraph
7. Keep all claims supportable — flag any that need proof the business doesn't
   yet have

## Output format

Append to or update `content/04-content-deck.md`:

```markdown
## [Page Name]

### Hero

- **Headline:** [Clear, benefit-oriented headline]
- **Subheadline:** [Supporting statement]
- **CTA:** [Button text]

### [Section Name]

- **Headline:** [Section headline]
- **Body:** [2-4 sentences, scannable]
- **Proof:** [Trust signal or evidence to include]

### [Section Name]

...

### FAQ (if applicable)

- **Q:** [Question] **A:** [Answer]

### Metadata

- **Title tag:** [50-60 chars]
- **Meta description:** [150-160 chars]
```

## Validation criteria

Score output against `agency/rubrics/copy-rubric.md`. Before finishing:

- [ ] Hero headline is clear and specific (not generic)
- [ ] H1 contains the primary keyword naturally (not just a brand tagline)
- [ ] Copy matches the brand tone from `business/02-brand-strategy.md`
- [ ] Every section serves the page objective from the brief
- [ ] Claims are supportable (flag unsupported claims)
- [ ] CTA is consistent with the page brief and brand strategy
- [ ] Primary keyword appears naturally in headline and opening
- [ ] Meta description includes primary keyword + action verb (150-160 chars)
- [ ] OG description is shorter than meta desc and action-oriented
- [ ] FAQ sections use structured Q&A format (for FAQPage schema)
- [ ] Copy is scannable — short paragraphs, bullet points, clear headings
- [ ] Average rubric score is 4 or above

## Dependency chain

- **Requires:** `business/02-*`, `business/04-*`, `business/05-*`,
  `content/02-page-briefs/<page>.md`, `content/03-seo-brief.md`
- **Feeds into:** `skills/launch-qa/`

## Next step

Repeat for each page. After all pages are done: run `skills/launch-qa/SKILL.md`

## Guardrails

- Write for the real buyer, not a generic audience
- Avoid fluff, filler, and unsupported superlatives
- Keep CTA language consistent across all pages
- Prefer specific business language over marketing jargon
- Do not invent facts — flag gaps for the user to fill
- Validate output against the copy rubric before finishing
