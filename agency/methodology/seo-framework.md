# SEO Framework

## Required deliverables

- Keyword clusters with intent classification
- Page-to-keyword mapping (one primary keyword per page)
- Search intent classification (commercial, informational, navigational,
  transactional)
- Metadata strategy (title tags, meta descriptions, Open Graph)
- Internal link plan with rationale
- Schema markup opportunities per page
- FAQ targets mapped to buyer objections

## E-E-A-T signals

Google prioritizes content demonstrating Experience, Expertise,
Authoritativeness, and Trustworthiness. Plan for:

- **Experience** — first-hand knowledge (case studies, project examples, process
  documentation)
- **Expertise** — credentials, team qualifications, industry-specific language
- **Authoritativeness** — industry recognition, partnerships, published thought
  leadership
- **Trustworthiness** — clear contact information, privacy policy, secure site,
  honest claims

## Core Web Vitals targets

| Metric                              | Target  | Impact                       |
| ----------------------------------- | ------- | ---------------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5s  | Page load speed              |
| **INP** (Interaction to Next Paint) | < 200ms | Interactivity responsiveness |
| **CLS** (Cumulative Layout Shift)   | < 0.1   | Visual stability             |

Implementation notes:

- Optimize images (WebP/AVIF, explicit dimensions, lazy loading)
- Minimize render-blocking resources
- Use server-side rendering (Fresh handles this by default)
- Preload critical fonts

## Technical SEO checklist

- [ ] XML sitemap generated and submitted
- [ ] robots.txt configured
- [ ] Canonical URLs on all pages
- [ ] Structured data validated (Google Rich Results Test)
- [ ] No duplicate content or thin pages
- [ ] 301 redirects for any moved pages
- [ ] HTTPS enforced
- [ ] Mobile-responsive (responsive design, not separate mobile site)

## Content cluster strategy

A content cluster groups a pillar page (core service/topic) with supporting blog
posts that link back to it. This builds topical authority and captures
informational search intent that feeds commercial pages.

- **Pillar page** — a comprehensive service or topic page targeting a commercial
  keyword
- **Cluster posts** — 3-5 blog posts targeting informational keywords related to
  the pillar topic
- **Linking rule** — every cluster post links to the pillar page; the pillar
  page links to each cluster post

## OG / social sharing strategy

- Every page must have `og:title`, `og:description`, `og:url`, `og:image`,
  `og:type`
- Every page must have `twitter:card`, `twitter:title`, `twitter:description`,
  `twitter:image`
- Default OG image: `assets/brand/og-image.png` (1200×630)
- Blog posts use `og:type = article` with `article:published_time` and
  `article:author`
- Canonical URL on every page via `<link rel="canonical">`

## E-E-A-T implementation checklist

- [ ] Author bios with credentials on blog posts
- [ ] Case studies or project examples (Experience)
- [ ] Team qualifications page or section (Expertise)
- [ ] Industry partnerships or certifications (Authoritativeness)
- [ ] Clear contact information on every page (Trustworthiness)
- [ ] Privacy policy and terms of service (Trustworthiness)
- [ ] HTTPS enforced (Trustworthiness)
- [ ] Process documentation or methodology pages (Experience + Expertise)

## Rule

SEO should reinforce business priorities, not create random content for vanity
traffic. Every keyword must map to a page with a clear business purpose.
