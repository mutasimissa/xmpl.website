# Launch QA

> **Role:** You are a quality assurance reviewer conducting a structured
> prelaunch audit across business alignment, content, SEO, conversion, and
> accessibility readiness.

## Goal

Review all business files for consistency, completeness, and launch readiness.
Produce a scored checklist that surfaces any gaps, contradictions, or missing
elements before implementation begins.

## Prerequisites

- All business files (`business/01-*` through `business/06-*`) and content
  files (`content/01-*` through `content/04-*`) should be complete
- Content deck should have copy for all primary pages

## Read these files first

1. `business/01-business-input.yaml` — business facts
2. `business/02-brand-strategy.md` — positioning and tone
3. `business/04-business-model.md` — offers and conversion path
4. `business/05-value-proposition.md` — promise and proof
5. `business/06-personas-jtbd.md` — buyer needs
6. `content/01-sitemap.yaml` — page inventory
7. `content/02-page-briefs/` — all page briefs
8. `content/03-seo-brief.md` — keywords and metadata
9. `content/04-content-deck.md` — page copy
10. `agency/methodology/qa-framework.md` — review layers
11. `agency/rubrics/launch-rubric.md` — scoring criteria
12. `agency/rubrics/strategy-rubric.md` — strategy scoring
13. `agency/rubrics/copy-rubric.md` — copy scoring
14. `agency/rubrics/seo-rubric.md` — SEO scoring

## Working method

1. **Business alignment review**
   - Is the positioning consistent across all files?
   - Do the offers in the business model match the solutions page?
   - Are personas addressed in the copy?

2. **CTA logic review**
   - Is the primary CTA consistent across all pages?
   - Does the conversion path make sense?
   - Are there clear next steps on every page?

3. **Content completeness review**
   - Does every page in the sitemap have a brief?
   - Does every brief have corresponding copy in the content deck?
   - Are proof elements identified and sourced?

4. **SEO readiness review**
   - Does every page have a primary keyword?
   - Is metadata direction defined for every page?
   - Are schema opportunities identified?

5. **Conversion readiness review**
   - Is the contact page clear and low-friction?
   - Are trust signals present on key pages?
   - Are objections addressed (FAQ, proof, process)?

6. **Accessibility and compliance review**
   - Are legal pages planned (privacy, terms)?
   - Is the contact pathway accessible?
   - Are image alt text guidelines noted?

7. **Automated test verification**
   - Run `deno task test:smoke` to verify technical readiness
   - Check CI pipeline status if available
   - Include test results in the launch checklist

8. Score each rubric and produce the checklist

## Output format

Write `content/05-checklist.md`:

```markdown
# Launch Checklist

## Business alignment

- [x] Positioning consistent across all files
- [x] Offers match between business model and solutions page
- [ ] [Any gap found]

## CTA logic

- [x] Primary CTA consistent across pages
- [x] Conversion path documented
- [ ] [Any gap found]

## Content completeness

- [x] Every sitemap page has a brief
- [x] Every brief has copy in the content deck
- [ ] [Any gap found]

## SEO readiness

- [x] Keywords mapped to all pages
- [x] Metadata direction defined
- [x] Schema opportunities identified
- [ ] OGMeta component on every page with page-specific props
- [ ] JSON-LD structured data on every page (Organization, Service, FAQ,
      Breadcrumb)
- [ ] Canonical URL set on every page
- [ ] robots.txt present with Sitemap directive
- [ ] sitemap.xml route returns valid XML
- [ ] manifest.json present with brand colors
- [ ] Custom 404 page renders
- [ ] [Any gap found]

## Conversion readiness

- [x] Contact page is clear and low-friction
- [x] Trust signals present on key pages
- [ ] [Any gap found]

## Accessibility and compliance

- [ ] Legal pages planned
- [ ] Analytics requirements captured
- [ ] [Any gap found]

## Rubric scores

- Strategy: [score]/5
- Copy: [score]/5
- SEO: [score]/5
- Launch: [score]/5

## Open issues

1. [Issue description and recommended fix]
2. [Issue description and recommended fix]
```

## Validation criteria

- [ ] Every section of the checklist has been reviewed (not skipped)
- [ ] No critical business contradictions remain
- [ ] No primary page is missing copy
- [ ] CTA logic is consistent and documented
- [ ] All rubric scores are recorded
- [ ] Open issues have actionable recommendations

## Dependency chain

- **Requires:** All business files (`business/01-*` through `business/06-*`) and
  all content files (`content/01-*` through `content/04-*`)
- **Feeds into:** Website implementation (`skills/website-init/`)

## Next step

After this skill: resolve any open issues, then run `deno task init-website` to
bootstrap the website.

## Guardrails

- Be thorough — check every file, not just a sample
- Be specific — name the exact file and section where issues exist
- Be actionable — every issue must have a recommended fix
- Do not pass a checklist item that has real gaps
- Validate against all four rubrics before finishing
