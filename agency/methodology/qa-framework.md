# QA Framework

## Review layers

### 1. Business alignment

- Positioning consistent across all pages
- Offers match between business model and site content
- Personas are addressed in the copy
- No contradictions between business files and implementation

### 2. UX and clarity

- Visitor understands the business within 5 seconds of landing
- Navigation is intuitive and matches the sitemap
- Page hierarchy follows the buyer journey
- Mobile experience is fully functional

### 3. SEO readiness

- Every page has a unique title tag and meta description
- Primary keyword appears in heading and first paragraph
- Schema markup is implemented per the SEO brief
- Internal links create logical pathways
- XML sitemap and robots.txt are configured

### 4. Technical readiness

- All pages render correctly on desktop and mobile
- No broken links or missing images
- Forms submit correctly and show confirmation
- Page load time meets Core Web Vitals targets (LCP < 2.5s, INP < 200ms, CLS <
  0.1)
- HTTPS is enforced

### 5. Conversion readiness

- Primary CTA is visible and consistent across pages
- Contact page is low-friction with clear next steps
- Trust signals appear near CTAs
- Objections are handled (FAQ, process, proof)

### 6. Accessibility

- Semantic HTML structure with proper heading hierarchy
- Keyboard navigation works on all interactive elements
- Color contrast meets WCAG 2.2 AA (4.5:1 minimum)
- All images have appropriate alt text
- Forms have associated labels

### 7. Compliance

- Privacy policy is published and linked
- Cookie consent is implemented if required
- Contact information is visible
- Legal disclaimers are present where needed

### 8. Automated testing

- Unit tests pass for all CLI utilities and component logic
- E2E tests verify every sitemap page loads and returns 200
- No broken internal links or missing images
- SEO meta tags verified programmatically on every page
- Form submission tested end-to-end
- Pre-launch smoke suite passes with zero failures

### 9. CI/CD gates

- YAML and schema validation passes
- Markdown linting passes
- Business/website drift check passes (no orphaned routes, no missing routes)
- Lighthouse CI scores meet thresholds (performance, accessibility, SEO ≥ 0.9)
- Visual diff snapshots reviewed for unintended changes

## Minimum checks

- [ ] Message consistency across all pages
- [ ] CTA clarity and consistency
- [ ] Proof visibility on key pages
- [ ] Metadata completeness for all pages
- [ ] Internal linking logic
- [ ] Legal and contact readiness
- [ ] Mobile responsiveness
- [ ] Performance targets met
- [ ] Accessibility baseline met
