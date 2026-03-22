# SEO Quality

- Every page must have a unique title tag (50-60 chars) and meta description
  (150-160 chars)
- Metadata must reflect the actual page content — no misleading titles
- Keywords must map to real buyer intent, not vanity traffic
- Use schema markup per `content/03-seo-brief.md` (Organization, FAQPage,
  BreadcrumbList, Service)
- Primary keyword appears naturally in the H1 and first paragraph
- Internal links create logical pathways between pages — follow the linking plan
  in the SEO brief
- Heading hierarchy must be clean: one H1 per page, H2 for sections, H3 for
  subsections
- Images must have descriptive alt text incorporating relevant keywords where
  natural
- Implement E-E-A-T signals: credentials, process documentation, case studies,
  clear contact info
- Target Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- robots.txt must exist at website/static/robots.txt with Sitemap directive
- XML sitemap route must exist at website/routes/sitemap.xml.ts
- Canonical URL on every page via OGMeta component
- OG tags on every page: og:title, og:description, og:url, og:image, og:type
- Twitter card meta on every page: twitter:card, twitter:title,
  twitter:description
- JSON-LD structured data per page type: Organization on all, Service on service
  pages, FAQPage on FAQ sections, BreadcrumbList on all inner pages
- manifest.json must exist at website/static/manifest.json
- Custom 404 page must exist at website/routes/_404.tsx
