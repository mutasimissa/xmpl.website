---
description: Wipe and regenerate the website from business files
---

Completely regenerate the website from the current business files.

1. Run `deno task validate` to confirm all business files are present and valid.
2. Run `deno task audit` to check content coverage before rebuilding.
3. Read `business/01-business-input.yaml` — note the `site_type`. Read `agency/site-types.yaml` for the type profile.
4. **Checkpoint:** Show the user what will be rebuilt — list all pages from the sitemap and the site type. Confirm before proceeding.
5. Run `deno task init-website` to regenerate the Fresh scaffold and all branded files.
6. Read `skills/website-init/SKILL.md`. For every route:
   - Read the corresponding page brief and content deck section.
   - Populate with content, `OGMeta`, `JsonLd`, proper heading hierarchy, internal links.
   - Verify accessibility: semantic HTML, alt text, form labels, keyboard navigation.
7. Run `deno task audit` to verify the rebuild is complete.
8. Verify all routes render correctly and content matches the content deck.
