# Dynamic Page Generation

Pages that are automatically created based on business data — not manually
specified in the sitemap.

## Individual Service Pages

**Trigger:** When `business/01-business-input.yaml` has multiple items in
`offers` or `offers_detail`.

**Route:** `/services/[slug]` — one page per offer.

**How to generate:**

1. Read offers from business input
2. For each offer with sufficient detail (name + description):
   - Create a page brief in `content/02-page-briefs/services-[slug].md`
   - Add to `content/01-sitemap.yaml` under `service_pillar_pages`
   - Generate route at `website/routes/services/[slug].tsx`
3. Use the `service-page` blueprint with `split` hero variant
4. Each service page gets its own SEO metadata from the SEO brief

**Content sources per service page:**

- Hero: offer name as H1, offer description as subheadline
- Problem section: from persona pains related to this offer
- Solution section: from value proposition pain relievers
- Features: from offer detail fields
- Process: from business model key activities
- Proof: from proof matrix entries related to this offer
- CTA: primary CTA with offer-specific context

## Trust Signal Components

Components that render conditionally — show when data exists, render nothing
when empty. Never show empty placeholder sections.

### SocialProof

**Renders when:** `proof.clients` has entries in business input.

Shows a row of client logos or names. Use a "Trusted by" or "Our clients"
heading.

### TestimonialCard

**Renders when:** `proof.testimonials` has entries.

Quote card with attribution (name, role, company). Supports single card or
carousel/grid layout.

### StatsBar

**Renders when:** `proof.stats` has entries.

Horizontal row of 3-4 key metrics with large numbers. Each stat has a number
and label (e.g., "500+" / "Projects delivered").

### CaseStudyCard

**Renders when:** `proof.case_studies` has entries.

Card linking to a case study page or expanding inline. Shows: client name,
challenge summary, result summary.

### PartnerLogos

**Renders when:** `proof.partnerships` has entries.

Row of partner logos with "Powered by" or "Partners" heading.

### CertificationBadges

**Renders when:** `proof.certifications` has entries.

Row of certification badges or text list.

**Implementation rule:** Each trust component checks for data at render time.
If the data array is empty, the component returns `null` — no empty sections,
no placeholder text.

## Blog Infrastructure

**Always scaffolded for:** `corporate`, `service`, `personal-blog` site types.

**Routes to generate:**

- `/blog` — blog index with post listing
- `/blog/[slug]` — individual post page
- `/blog/rss.xml` — RSS feed route

**Blog content directory:** `website/content/blog/` — markdown files with
frontmatter (title, date, author, tags, description, image).

**Blog features:**

- Tag filtering on blog index
- Related posts on post pages (by tag overlap)
- Author attribution
- Reading time estimate
- OG meta with `article` type
- JSON-LD `BlogPosting` schema

## Audience / Industry Pages

**Trigger:** When `business/01-business-input.yaml` has 2+ items in
`target_segments` and the segments are distinct enough to warrant dedicated
pages.

**Route:** `/for/[segment-slug]` — one page per audience segment.

**When to suggest:**

- 3+ distinct target segments with different pains/gains
- Business model identifies multiple customer segments
- Per-segment positioning exists in value proposition

**How to generate:**

1. Read target segments from business input
2. Read per-segment positioning from value proposition
3. For each segment:
   - Create audience-specific hero with segment's fit statement
   - Highlight pains and gains specific to this segment
   - Show proof relevant to this segment
   - Use segment-specific CTA language
4. Add to sitemap and generate routes

**Content personalization per segment:**

- Hero headline uses segment's fit statement
- Pain section uses segment-specific pains from personas-JTBD
- Solution section uses segment-specific pain relievers
- Proof section filters for evidence relevant to this segment
- CTA uses language that resonates with this segment's decision criteria
