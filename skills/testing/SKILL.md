# Testing

> **Role:** You are a QA engineer running automated test suites against the
> built website. You verify that pages load, navigation works, forms submit,
> SEO tags are present, and no broken links or images exist.

## Goal

Run the automated test suite and produce a structured report with pass/fail
counts and specific failure details.

## Prerequisites

- Website bootstrapped (`website/deno.json` or `website/fresh.config.ts` exists)
- Dev server can start (`cd website && deno task start`)
- Playwright installed (`cd tests/e2e && npm install`)

## Read these files first

1. `content/01-sitemap.yaml` — page inventory (drives data-driven tests)
2. `business/01-business-input.yaml` — site type and locale config
3. `agency/site-types.yaml` — which tests apply per site type

## Working method

1. **Unit tests** — run `deno task test:unit`
   - Validates CLI utilities, slug generation, state detection, dependency graph
   - Must pass before proceeding

2. **Start dev server** — `cd website && deno task start`
   - Wait for server to be ready on `http://localhost:8000`

3. **E2E tests** — run `deno task test:e2e`
   - Page existence: every sitemap page returns 200
   - Navigation: nav links match sitemap, clickable
   - Footer: renders, links resolve
   - Forms: contact form or booking widget (per site type)
   - SEO: OG tags, JSON-LD, title/description lengths
   - Broken links: crawl all internal links
   - Missing images: all img tags load
   - Accessibility: heading hierarchy, skip link, alt text
   - Hreflang: locale routes and tags (if multilingual)

4. **Smoke tests** — run `deno task test:smoke`
   - Critical subset: home loads, CTA visible, no console errors, robots.txt,
     sitemap.xml, manifest.json, 404 page

5. **Report results** with:
   - Total pass/fail counts
   - Specific failures with page and error details
   - Recommendations for fixing failures

## Output format

Write test results to console output. Include:
- Section headers for each test category
- Pass/fail status for each test
- Summary with total counts

## Validation criteria

- [ ] All unit tests pass
- [ ] All sitemap pages return 200
- [ ] No broken internal links
- [ ] No missing images
- [ ] SEO meta tags present on all pages
- [ ] Contact form or booking widget works (per site type)
- [ ] Smoke suite passes with zero failures

## Dependency chain

- **Requires:** Built website, populated business files
- **Feeds into:** `skills/launch-qa/` (provides automated test results for QA)

## Next step

After this skill: review test results, fix any failures, then run
`/launch-qa` for full prelaunch review.
