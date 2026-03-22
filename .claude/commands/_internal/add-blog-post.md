---
description: Write and publish a new blog post end-to-end
---

Complete workflow for creating a blog post from topic to live page.

1. Read `business/01-business-input.yaml` — check `site_type`. If site_type is `coming-soon` or `single-page`, warn that blog posts aren't typical for this site type.
2. Ask the user for post title, category, and primary keyword. Create the blog post file with frontmatter (title, slug, date, author, category, tags, draft: true, description, primary_keyword). Create blog routes if they don't exist.
3. Read `business/02-brand-strategy.md` (tone), `content/03-seo-brief.md` (keywords), `business/06-personas-jtbd.md` (audience), and `agency/blueprints/blog-post.md` (structure).
4. Write the full blog post content following the blueprint:
   - H1 with primary keyword placed naturally
   - Introduction that hooks the reader and establishes relevance
   - Body sections with H2/H3 hierarchy, each covering a distinct subtopic
   - Key takeaways or summary section
   - CTA linking to relevant service/product pages
   - Optional FAQ section if keyword intent warrants it
5. Add internal links: 2-3 links to relevant service pages, 1-2 links to related blog posts if they exist.
6. Update `website/routes/blog/index.tsx` to include the new post in the listing.
7. Set frontmatter `draft: false` when content is finalized.
8. Verify the blog post renders correctly and the blog index lists it.
