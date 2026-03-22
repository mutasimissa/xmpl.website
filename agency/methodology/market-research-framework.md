# Market Research Framework

This framework defines how the market research skill gathers external
intelligence. It covers search patterns, extraction rules, output structure, and
quality checks.

## Search patterns

### Competitor extraction

Use these search patterns in sequence, adapting `[placeholders]` from the
business input fields.

**Discovery searches:**

| Pattern | Purpose |
|---|---|
| `"[industry] [offer type] for [target segment]"` | Find competitors targeting the same audience |
| `"best [offer type] agency/company/platform"` | Find top-ranked competitors in the category |
| `"[offer type] alternatives"` | Find competitors positioned as alternatives |
| `"[known competitor] vs"` | Find head-to-head comparisons |
| `"top [industry] companies [target market]"` | Find market leaders in the geography |

**Validation searches (per competitor):**

| Pattern | Purpose |
|---|---|
| `"[competitor name] reviews"` | Collect customer feedback |
| `"[competitor name] pricing"` | Understand pricing model |
| `"[competitor name] case studies"` | Identify proof types used |
| `site:[competitor URL]` | Scan their site structure and messaging |

### Keyword discovery

**Core keyword patterns:**

| Pattern | Intent | Purpose |
|---|---|---|
| `"[offer] for [segment]"` | Commercial | Match buyer search behavior |
| `"how much does [offer] cost"` | Transactional | Capture pricing-stage queries |
| `"best [offer] [year]"` | Commercial | Capture comparison-stage queries |
| `"[offer] vs [alternative]"` | Commercial | Capture evaluation-stage queries |
| `"what is [industry term]"` | Informational | Capture awareness-stage queries |
| `"how to [problem the offer solves]"` | Informational | Capture problem-aware queries |
| `"[offer] near me" / "[offer] in [city]"` | Transactional | Capture local intent queries |

**Expansion technique:** After initial searches, extract related queries from
search suggestions, "People also ask" boxes, and related searches.

### Market language

**Forum and discussion searches:**

| Pattern | Source type | Purpose |
|---|---|---|
| `"[problem/pain point] reddit"` | Reddit | Raw buyer frustrations |
| `"[industry] [pain point] forum"` | Industry forums | Domain-specific language |
| `"looking for [offer type]"` | Various | Buyer intent language |
| `"[competitor] review"` | Review sites | Satisfaction and complaint patterns |
| `"[offer type] recommendations"` | Q&A sites | Decision criteria |
| `"[problem] frustrated/annoyed/hate"` | Forums | Emotional triggers (frustration) |
| `"[desired outcome] finally/love"` | Forums | Emotional triggers (aspiration) |

## Extraction rules

### Competitor profiles

For each competitor, extract:

| Field | Extraction method |
|---|---|
| `name` | Company/brand name from their website |
| `url` | Homepage URL |
| `positioning` | Hero headline or primary tagline from their homepage |
| `strengths` | Positive patterns from reviews + apparent advantages from site |
| `weaknesses` | Negative patterns from reviews + gaps visible in their offering |
| `pricing_model` | Visible pricing structure (free, freemium, tiered, custom, etc.) |
| `proof_types` | Types of social proof on their site (case studies, testimonials, logos, etc.) |

**Rules:**

- Extract positioning verbatim from the competitor site -- do not paraphrase
- Strengths and weaknesses must come from external evidence (reviews, forums),
  not from assumptions
- If pricing is not publicly visible, note "Not publicly listed"
- List only proof types that are actually present on the site

### Keyword data

For each keyword, record:

| Field | Description |
|---|---|
| Keyword | The exact search phrase |
| Intent | informational, commercial, or transactional |
| Relevance | How closely it maps to the business offers (high/medium/low) |
| Competitor presence | Which competitors appear to target this keyword |

**Classification rules:**

- **Informational:** "what is", "how to", "guide", "examples" -- buyer is
  learning
- **Commercial:** "best", "top", "vs", "comparison", "for [segment]" -- buyer is
  evaluating
- **Transactional:** "pricing", "buy", "hire", "book", "near me", "cost" --
  buyer is ready to act

### Market language

For each finding, record:

| Field | Description |
|---|---|
| Quote/phrase | The exact language used by the buyer |
| Source type | Reddit, forum, review site, Q&A |
| Search query used | The search that surfaced this finding |
| Category | buyer_phrase, objection, decision_factor, or emotional_trigger |

**Rules:**

- Prefer direct quotes over paraphrases
- Capture language diversity -- collect phrases from different people describing
  the same problem
- For emotional triggers, distinguish frustration (pain to move away from) and
  aspiration (gain to move toward)
- Minimum 5 buyer phrases, 3 objections, 3 decision factors, 3 emotional
  triggers per category

## Output structure

All outputs are written to `business/01-business-input.yaml`.

### competitor_analysis (new array field)

```yaml
competitor_analysis:
  - name: "Competitor Name"
    url: "https://competitor.com"
    positioning: "Their actual hero headline"
    strengths:
      - "Specific strength from evidence"
    weaknesses:
      - "Specific weakness from evidence"
    pricing_model: "Tiered / Custom / Freemium / etc."
    proof_types:
      - "Case studies"
      - "Client logos"
```

### SEO keywords (update existing seo section)

```yaml
seo:
  primary_keywords:
    - "high-intent keyword 1"
  secondary_keywords:
    - "supporting keyword 1"
  long_tail_keywords:
    - "long phrase or question query 1"
  search_intent:
    informational:
      - "what is keyword"
    commercial:
      - "best keyword for segment"
    transactional:
      - "keyword pricing"
```

### market_language (new object field)

```yaml
market_language:
  buyer_phrases:
    - "How real buyers describe the problem"
  common_objections:
    - "Recurring concern before purchase"
  decision_factors:
    - "What matters most when choosing"
  emotional_triggers:
    frustration:
      - "Pain point expressed emotionally"
    aspiration:
      - "Desired outcome expressed emotionally"
```

## Quality checks

Run these checks after completing all three research tasks.

### Completeness

- [ ] 3-5 competitor profiles with all 7 fields populated
- [ ] At least 3 primary keywords, 5 secondary keywords, 5 long-tail keywords
- [ ] search_intent has entries in all three categories
- [ ] market_language has at least 5 buyer phrases, 3 objections, 3 decision
      factors
- [ ] emotional_triggers has entries in both frustration and aspiration

### Accuracy

- [ ] Every competitor URL resolves to a real website
- [ ] Positioning quotes are extracted verbatim, not invented
- [ ] Strengths/weaknesses come from external evidence, not assumptions
- [ ] Keywords reflect actual search patterns, not just industry jargon
- [ ] Buyer phrases are real language from real people, not marketing copy

### Traceability

- [ ] Every finding can be linked to a specific search query
- [ ] Sources are identified by type (Reddit, review site, forum, search results)
- [ ] Inferences are clearly distinguished from verified facts

### Relevance

- [ ] All competitors are in the same market space as the business
- [ ] Keywords map to the business offers and target segments
- [ ] Market language reflects the actual buyer audience, not a different segment
- [ ] Findings are recent enough to be actionable (within last 2 years)
