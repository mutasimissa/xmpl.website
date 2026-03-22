# Website Implementation

> **Role:** You are a frontend developer building a production-ready website
> using Fresh 2.2+, Tailwind CSS 4, and Deno, guided entirely by the business
> files in this repository.

## Goal

Build the website inside `website/` based on the completed business strategy,
content deck, and page briefs. Every page, section, headline, and CTA must trace
back to a business file.

## Tech stack

| Layer         | Technology                           | Version                       |
| ------------- | ------------------------------------ | ----------------------------- |
| **Runtime**   | Deno                                 | 2.x                           |
| **Framework** | Fresh                                | 2.2+                          |
| **Bundler**   | Vite                                 | (bundled with Fresh)          |
| **Styling**   | Tailwind CSS                         | 4.x (via `@tailwindcss/vite`) |
| **Rendering** | Server-side with island architecture | —                             |

## Library documentation

Before generating Fresh routes or Tailwind config, use Context7 MCP to fetch
current documentation for `fresh` (Deno Fresh framework), `tailwindcss` (v4),
and `preact` to ensure correct API usage. This prevents outdated patterns like
v3 `tailwind.config.js` or wrong Vite plugin names.

## Prerequisites

- All business files (`business/01-*` through `business/10-*`) are complete and
  QA'd
- User has run `deno task init-website` to bootstrap the Fresh project in
  `website/`
- `docs/decisions/tech-stack.md` exists

## Read these files first

1. `business/01-business-input.yaml` — seed fields: `conversion.*` (booking
   link, WhatsApp, email, phone, locations), `operations.*`, `localization.*`
2. `content/01-sitemap.yaml` — page inventory and navigation
3. `content/02-page-briefs/` — all page briefs (section structure per page)
4. `content/04-content-deck.md` — all page copy
5. `content/03-seo-brief.md` — metadata, schema markup, keywords
6. `business/02-brand-strategy.md` — tone and message pillars
7. `agency/blueprints/` — section-level page structures
8. `agency/rubrics/launch-rubric.md` — launch readiness criteria
9. `agency/site-types.yaml` — site type profiles and implementation hints

## Working method

1. **Read site type:** Read `site_type` from `business/01-business-input.yaml`.
   Adapt the build approach based on the type:
   - **single-page** and **coming-soon**: Implement as a single-page site with
     scrolling sections on the homepage. Do not create separate routes for
     content pages — all sections live in `index.tsx`.
   - **booking**: Ensure the booking widget or booking link is prominently
     placed in the hero, sticky header, and CTA sections. The booking link
     should be the most visible interactive element on every page.
   - **personal-blog**: Blog infrastructure (index, post routes, RSS) is the
     primary focus. Build the blog system first, then layer on static pages.
2. **Generate dynamic pages** — read `agency/blueprints/dynamic-pages.md` and:
   - Create individual `/services/[slug]` routes for each offer in business input
   - Add trust signal components (SocialProof, StatsBar, TestimonialCard) that
     render conditionally based on proof data — show when data exists, render
     nothing when empty
   - Scaffold blog infrastructure (index, post route, RSS) for corporate,
     service, and personal-blog types
   - Consider `/for/[segment]` audience pages when 3+ target segments exist
3. **Review the sitemap** — confirm which pages to build and their navigation
   order
3. **Set up routing** — create Fresh routes for each page in `website/routes/`
4. **Build shared layout** — header with navigation, footer with CTA and legal
   links
5. **Build each page** following this pattern: a. Read the page brief for
   section structure b. Read the content deck for actual copy c. Read the
   blueprint for section-level guidance d. Implement sections as Fresh
   components e. Use Tailwind CSS 4 for styling f. Add islands only where
   client-side interactivity is required (forms, mobile nav)
6. **Implement SEO** — add meta tags, Open Graph, schema markup per the SEO
   brief
7. **Implement contact form** — as an island component with server-side handling
8. **Add accessibility** — semantic HTML, ARIA labels, keyboard navigation, skip
   links
9. **Test** — verify all pages render, navigation works, CTAs link correctly

## Architecture principles

- **Server-first:** Render everything on the server. Only use islands for
  interactive elements.
- **Minimal JS:** No client-side JavaScript unless strictly necessary (forms,
  mobile menu).
- **Semantic HTML:** Use proper heading hierarchy, landmarks, and ARIA where
  needed.
- **Performance:** No layout shift, fast first paint, minimal bundle size.
- **Content-driven:** Every heading, paragraph, and CTA comes from
  `content/04-content-deck.md`.

## File structure guidance

```
website/
  routes/
    index.tsx          # Home page
    solutions.tsx      # Solutions page
    industries.tsx     # Industries page
    about.tsx          # About page
    contact.tsx        # Contact page
    _layout.tsx        # Shared layout (header + footer)
    _404.tsx           # 404 page
  islands/
    ContactForm.tsx    # Interactive contact form
    MobileNav.tsx      # Mobile navigation toggle
  components/
    Header.tsx         # Site header with navigation
    Footer.tsx         # Site footer
    Hero.tsx           # Reusable hero section
    CTA.tsx            # Reusable CTA block
    Section.tsx        # Reusable content section wrapper
    OGMeta.tsx         # Open Graph + Twitter card meta tags
    JsonLd.tsx         # JSON-LD structured data components
  static/
    styles.css         # Tailwind CSS entry point
    robots.txt         # Search engine crawl rules
    manifest.json      # PWA manifest with brand colors
```

## Validation criteria

- [ ] Every page in `content/01-sitemap.yaml` has a corresponding route
- [ ] All copy matches `content/04-content-deck.md` exactly
- [ ] Primary CTA is consistent across all pages
- [ ] Meta tags match `content/03-seo-brief.md` metadata direction
- [ ] Schema markup is implemented where noted in SEO brief
- [ ] Navigation matches the sitemap primary navigation order
- [ ] Contact form works and submits to a handler
- [ ] Site is accessible (semantic HTML, keyboard nav, skip links)
- [ ] No layout shift, images have dimensions, fonts are optimized
- [ ] OGMeta component used on every page with page-specific title, description,
      path
- [ ] JSON-LD Organization + WebSite on every page;
      Service/FAQPage/BreadcrumbList where appropriate
- [ ] Canonical URL set on every page via OGMeta
- [ ] robots.txt present with Sitemap directive
- [ ] sitemap.xml route returns valid XML with all pages
- [ ] manifest.json present with brand colors
- [ ] Custom 404 page renders with branding
- [ ] Blog index and post routes exist at /blog/ and /blog/[slug]

## Dependency chain

- **Requires:** All business files complete, `deno task init-website` already
  run
- **This is the final implementation phase**

## Guardrails

- Never invent copy — all text comes from business files
- Never add pages not in the sitemap without updating `content/01-sitemap.yaml`
- Prefer server rendering over client-side JavaScript
- Record any implementation decisions in `docs/decisions/`
- Keep components small and composable
- Use Tailwind utility classes — no custom CSS unless absolutely necessary
