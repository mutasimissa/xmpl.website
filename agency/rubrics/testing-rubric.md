# Testing Rubric

## Scoring (1-5 scale, minimum 3.0)

### Unit test coverage
- **1** — No unit tests exist
- **2** — Some tests but missing core utilities
- **3** — Core CLI utilities tested (slug, state, dep-graph)
- **4** — All shared functions tested with edge cases
- **5** — Comprehensive coverage including component logic

### Page existence coverage
- **1** — No page tests
- **2** — Home page only
- **3** — Primary navigation pages tested
- **4** — All sitemap pages (primary + secondary) tested
- **5** — All pages + locale variants tested

### SEO automation
- **1** — No SEO tests
- **2** — Title tag check only
- **3** — Title + description + OG tags
- **4** — Full OG + JSON-LD + canonical
- **5** — Full SEO + hreflang + schema type validation

### Form testing
- **1** — No form tests
- **2** — Form element exists check
- **3** — Form fields present + submit button
- **4** — Validation tested + submission tested
- **5** — Full end-to-end with error states and success

### Broken link detection
- **1** — Not checked
- **2** — Home page links only
- **3** — Primary pages checked
- **4** — Full crawl of all internal links
- **5** — Full crawl + external link validation

### Accessibility automation
- **1** — Not tested
- **2** — H1 count only
- **3** — Heading hierarchy + alt text
- **4** — + skip link + keyboard navigation
- **5** — + ARIA labels + contrast checks

### Pre-launch smoke suite
- **1** — No smoke suite
- **2** — Manual checks only
- **3** — Basic automated smoke (home loads, no errors)
- **4** — Smoke covers CTA, robots.txt, sitemap.xml, 404
- **5** — Full smoke suite passes with zero failures

### CI pipeline
- **1** — No CI
- **2** — Basic lint only
- **3** — Lint + unit tests
- **4** — + E2E + drift check
- **5** — Full pipeline: lint, tests, E2E, Lighthouse, visual diff
