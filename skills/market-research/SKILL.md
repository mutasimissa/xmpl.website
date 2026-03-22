# Market Research

> **Role:** You are a market researcher gathering external intelligence to
> validate and enrich business strategy. You use web search to find real
> competitor data, keyword opportunities, and buyer language before any
> positioning or content decisions are made.

## Goal

Populate three research-driven fields in `business/01-business-input.yaml`:

1. `competitor_analysis` -- structured profiles of 3-5 competitors
2. `seo.primary_keywords`, `seo.secondary_keywords`, `seo.long_tail_keywords` --
   keyword seeds validated against real search patterns
3. `market_language` -- real buyer phrases, objections, decision factors, and
   emotional triggers extracted from forums, reviews, and discussions

## When it runs

After conversational intake, before brand strategy. The /start flow is:

```
Logos check -> Conversational intake -> Market research -> Brand strategy -> ...
```

This skill runs once, immediately after intake populates the core fields in
`business/01-business-input.yaml`. Its outputs feed directly into brand strategy,
offer design, and SEO brief skills.

## Prerequisites

- `business/01-business-input.yaml` has at minimum: `business_name`, `industry`,
  `offers`, `target_segments`, and `competitors` (even if competitors is a rough
  list)
- Web search tool is available

## Read these files first

1. `business/01-business-input.yaml` -- business name, industry, offers, target
   segments, competitors, target markets
2. `agency/methodology/market-research-framework.md` -- search patterns,
   extraction rules, quality checks
3. `agency/schemas/business-input.yaml` -- schema for output fields

## Working method

### A. Competitor extraction

1. Read `business_name`, `industry`, `offers`, `target_segments`, and
   `competitors` from business input
2. Search for competitors using these patterns:
   - `"[industry] [offer type] for [target segment]"`
   - `"best [offer type] agency/company/platform"`
   - `"[offer type] alternatives"`
   - `"[known competitor] vs"`
3. For each competitor found (3-5 total):
   - Visit their website to extract positioning (hero headline, tagline)
   - Search for `"[competitor name] reviews"` to find strengths and weaknesses
   - Note their pricing model (if visible) and proof types used (case studies,
     testimonials, client logos, certifications)
4. Write structured profiles to `competitor_analysis` in business input

### B. Keyword discovery

1. Start with offers, industry, and target segments as seed terms
2. Search for keyword variations using these patterns:
   - `"[offer] for [segment]"`
   - `"how much does [offer] cost"`
   - `"best [offer] [current year]"`
   - `"[offer] vs [alternative]"`
   - `"what is [industry term]"`
3. For each keyword cluster:
   - Estimate intent: informational, commercial, or transactional
   - Note which competitors appear to rank for it
   - Assess relevance to the business offers
4. Update `seo.primary_keywords` (3-5 high-intent terms),
   `seo.secondary_keywords` (5-10 supporting terms), and
   `seo.long_tail_keywords` (5-10 question/phrase queries)

### C. Market-language analysis

1. Search forums, Reddit, review sites, and Q&A platforms for buyer language:
   - `"[problem/pain point] reddit"`
   - `"[industry] [pain point] forum"`
   - `"looking for [offer type]"`
   - `"[competitor] review"`
   - `"[offer type] recommendations"`
2. Extract and categorize findings:
   - **Buyer phrases** -- how real buyers describe the problem in their own words
   - **Common objections** -- concerns that come up repeatedly before purchase
   - **Decision factors** -- what buyers say matters most when choosing
   - **Emotional triggers** -- frustrations (pain) and aspirations (gain)
3. Write findings to `market_language` in business input

## Output format

All outputs are written directly into `business/01-business-input.yaml`:

```yaml
competitor_analysis:
  - name: "Competitor A"
    url: "https://example.com"
    positioning: "Their hero headline or tagline"
    strengths: ["Fast delivery", "Strong portfolio"]
    weaknesses: ["No local support", "Expensive"]
    pricing_model: "Tiered"
    proof_types: ["Case studies", "Client logos"]

market_language:
  buyer_phrases:
    - "I just need a simple website that looks professional"
  common_objections:
    - "cheap usually means bad quality"
  decision_factors:
    - "portfolio quality vs price"
  emotional_triggers:
    frustration:
      - "wasted money on templates"
    aspiration:
      - "look like a legit company"
```

SEO keyword fields are updated in-place under the existing `seo:` section.

## Validation criteria

- [ ] `competitor_analysis` contains 3-5 competitor profiles with all fields populated
- [ ] Each competitor has a real URL, not a placeholder
- [ ] Positioning is extracted from the actual competitor site, not invented
- [ ] Strengths and weaknesses are evidence-based, not assumptions
- [ ] `seo.primary_keywords` has 3-5 validated terms
- [ ] `seo.secondary_keywords` has 5-10 supporting terms
- [ ] `seo.long_tail_keywords` has 5-10 question/phrase queries
- [ ] Each keyword has an intent classification (informational/commercial/transactional)
- [ ] `market_language.buyer_phrases` has at least 5 real phrases
- [ ] `market_language.common_objections` has at least 3 objections
- [ ] `market_language.decision_factors` has at least 3 factors
- [ ] `market_language.emotional_triggers` has entries for both frustration and aspiration
- [ ] All findings cite or reference their source (search query, forum, review site)
- [ ] No invented data -- every finding traces to a real search result

## Dependency chain

- **Requires:** Completed intake (`business/01-business-input.yaml` core fields)
- **Feeds into:** Brand strategy, offer design, SEO brief, page copy

## Guardrails

- Never invent competitor data -- report only what was found via search
- Never fabricate buyer quotes -- extract real language from real sources
- Distinguish between verified facts and inferences in all findings
- If a search yields no useful results, report that honestly rather than guessing
- Do not change existing business input fields outside the three target areas
- Cite the search query or source for every finding
