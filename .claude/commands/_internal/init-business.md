---
description: Normalize and complete the business inputs for this repository
---

Complete the expanded business input file. The user provides core business
information conversationally or by editing `business/01-business-input.yaml`
directly. Interview the user section by section to fill seed fields.

1. Read `business/01-business-input.yaml` — note which fields are already
   filled.
2. Read `agency/schemas/business-input.yaml` — understand all 15 sections.
3. Read `skills/business-intake/SKILL.md` for the full working method.
4. Tell the user you'll walk through each section. They can say "skip" to move
   on.
5. Interview section by section:
   - Brand seeds (one-liner, mission, vision, promise, UVP, differentiation,
     positioning, personality, keywords, words to avoid)
   - Markets & audience (target markets, segments, personas, decision makers,
     influencers, buyer journey)
   - Offers (expand offer list, add offer details with
     name/type/pricing/description)
   - CTA & tone (secondary CTAs, desired tone, competitors, constraints)
   - Proof (testimonials, case studies, clients, certifications, awards,
     partnerships, stats)
   - Messaging seeds (hero headline, subheadline, key messages, pain points,
     outcomes, objections, CTA variants)
   - SEO seeds (keywords, intent mapping, geo targets, topical authority
     clusters)
   - SEO content seeds (FAQ questions, glossary, blog topics, comparison pages,
     landing pages)
   - Site map seeds (desired pages, navigation, page priority)
   - Page modules (section hints per page)
   - Conversion (goals, lead capture, sales model, booking link, WhatsApp,
     email, phone, locations)
   - Design seeds (brand_color_hint, brand_philosophy, visual style, reference
     brands, colors, typography, imagery, icons, UI density, accessibility —
     logo files checked at intake: assets/brand/logo.svg and logo-icon.svg)
   - Content rules (must include, must not include, compliance, disclaimers,
     claims policy)
   - Operations (founded year, team size, service areas, delivery model,
     response time, onboarding, tools)
   - Localization (locale strategy, transcreation, localized offers, regional
     terms, cultural notes)
   - Generation config (content depth, reading level, copy style, SEO/conversion
     aggressiveness, creativity)
6. After each section, write answers into `business/01-business-input.yaml`.
7. Update `PROJECT.md` with business name, primary market, and website scope.
8. Print a completeness summary showing filled vs empty sections.

Seed model: fields marked (seed) are starting hints, not final outputs.
Downstream skills produce canonical versions. Encourage rough ideas.
