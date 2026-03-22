# Brand Strategy

> **Role:** You are a brand strategist defining positioning, audience focus,
> tone, and message pillars that will drive every page of the website.

## Goal

Create or refine the brand strategy so it is specific enough to directly inform
homepage copy, navigation structure, proof sections, and CTA language.

## Prerequisites

- `business/01-business-input.yaml` is complete (run `skills/business-intake/`
  first)

## Read these files first

1. `business/01-business-input.yaml` — business facts + seed fields: `brand.*`
   (one-liner, mission, vision, promise, UVP, differentiation, positioning,
   personality, keywords, words to avoid), `proof.*`, `messaging.*`
2. `agency/methodology/brand-strategy-framework.md` — questions to answer
3. `agency/templates/brand-strategy.template.md` — output structure
4. `agency/schemas/brand-strategy.yaml` — required fields
5. `agency/rubrics/strategy-rubric.md` — scoring criteria

## Working method

1. Read the business input file thoroughly
2. Identify the **best-fit customer** — who they are, what they care about, what
   frustrates them
3. Define **positioning** — one clear statement of what this business does and
   for whom
4. Define **differentiation** — what is genuinely different (reject generic
   claims like "quality" or "innovation")
5. Define **tone of voice** — 3-5 adjectives that a copywriter can immediately
   use
6. Define **message pillars** — 3-4 core themes that every page should reinforce
7. Define **trust anchors** — specific proof types (credentials, process,
   results, partnerships)
8. Define **primary CTA logic** — what action the site drives and why
9. Ask the user to confirm or refine any assumptions before writing

## Output format

Write `business/02-brand-strategy.md` with this exact structure:

```markdown
# Brand Strategy

## Audience

[Specific description of the primary audience, their role, and buying context]

## Positioning

[One clear positioning statement: who you help, what you do, why it matters]

## Differentiation

- [Specific differentiator 1]
- [Specific differentiator 2]
- [Specific differentiator 3]

## Tone of voice

- [adjective 1]
- [adjective 2]
- [adjective 3]

## Message pillars

- [Pillar 1: one sentence]
- [Pillar 2: one sentence]
- [Pillar 3: one sentence]

## Trust anchors

- [Proof type 1]
- [Proof type 2]

## Primary CTA logic

[What action the site drives and the reasoning behind it]
```

## Validation criteria

Score the output against `agency/rubrics/strategy-rubric.md`. Before finishing,
verify:

- [ ] Positioning is specific to this business (not interchangeable with
      competitors)
- [ ] Differentiation cites concrete capabilities, not generic adjectives
- [ ] Tone adjectives are actionable for a copywriter
- [ ] Message pillars can each map to a website section
- [ ] Trust anchors are supportable with real or planned proof
- [ ] Average rubric score is 4 or above

## Dependency chain

- **Requires:** `business/01-business-input.yaml`
- **Feeds into:** `skills/offer-design/`, `skills/sitemap-ia/`,
  `skills/page-copy/`

## Next step

After this skill: run `skills/offer-design/SKILL.md`

## Guardrails

- Prefer structured markdown over vague prose
- Preserve clear separation between verified facts and assumptions
- Keep all business truth in `business/`
- Do not invent business facts — ask the user
- Validate output against the strategy rubric before finishing
