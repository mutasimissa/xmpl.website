# Offer Design

> **Role:** You are a business strategist clarifying the commercial offer
> structure, value proposition, buyer personas, and website conversion logic.

## Goal

Define the business model, value proposition, and buyer personas so the website
can present clear offers with a logical conversion path.

## Prerequisites

- `business/01-business-input.yaml` is complete
- `business/02-brand-strategy.md` is complete (run `skills/brand-strategy/`
  first)

## Read these files first

1. `business/01-business-input.yaml` — business facts + seed fields:
   `audience.*` (personas, decision makers, influencers, buyer journey),
   `offers_detail`, `conversion.*` (goals, sales model, lead capture,
   qualification questions)
2. `business/02-brand-strategy.md` — positioning and audience
3. `agency/methodology/business-model-framework.md` — what to capture
4. `agency/methodology/value-proposition-framework.md` — value prop structure
   (including JTBD framework, pain/gain mapping, and proof matrix)
5. `agency/templates/business-model.template.md` — output structure
6. `agency/templates/value-proposition.template.md` — value proposition canvas

## Working method

1. Read the business input and brand strategy
2. Ask the user about:
   - **Customer segments** — specific roles, industries, company sizes, and
     decision-making contexts. Push past "everyone" to the top 2-3 segments
     that generate 80% of revenue.
   - **Revenue model** — project-based, subscription, retainer, usage-based,
     licensing, etc.
   - **Core offers** — what specifically does the business sell?
   - **Channels** — how do customers find and evaluate the business? Organic
     search, referrals, social, paid, events, partnerships?
   - **Sales motion** — consultative, self-serve, demo-driven, hybrid?
   - **Conversion event** — what action on the website counts as success?
   - **Packaging** — how are offers structured for buyers?
   - **Pricing context** — any pricing to show, or custom-quoted?
   - **Key partnerships and resources** — technology partners, certifications,
     proprietary tools, notable team expertise?
   - **Competitive advantages** — what is genuinely hard for competitors to
     copy? Apply the VRIN test (Valuable, Rare, Inimitable, Non-substitutable).
     Push past generic claims like "great service" or "experienced team."
   - **Metrics they track** — customer outcome metrics (time saved, cost
     reduced, revenue increased) and business health metrics (retention,
     customer count, growth rate).
3. Ask about **Jobs-to-be-Done** for each buyer segment:
   - Functional jobs — what specific tasks are they trying to accomplish?
   - Social jobs — how do they want to be perceived by peers, clients, or
     their market?
   - Emotional jobs — what feelings do they seek (confidence, relief, control)
     or avoid (embarrassment, anxiety, regret)?
4. Map the **conversion architecture**: awareness → consideration → decision →
   action. For each stage, identify the buyer's question, the content that
   answers it, the page that delivers it, and the CTA that moves them forward.
5. Define the **value proposition** using the full canvas:
   - Customer profile: jobs, pains, gains
   - Value map: products/services, pain relievers, gain creators
   - Fit statement per segment
6. Map **pains to pain relievers** one-to-one — every pain must have a
   corresponding relief mechanism, every relief must trace to a real pain
7. Map **gains to gain creators** one-to-one — every gain must have a
   corresponding creator, every creator must trace to a real gain
8. Build the **proof matrix** — every claim the website will make must have
   evidence, a source, and a status (Verified / Assumption / Gap)
9. Create **per-segment fit statements** if multiple customer segments exist,
   following the pattern: For [segment] who [job], [business] is the
   [category] that [key benefit] unlike [alternatives] because [proof]
10. Define **buyer personas** with integrated JTBD, pains, gains, objections,
    and decision criteria
11. Build the **website implications** table mapping each business model
    element to specific site decisions
12. Write all three output files

## Output files

### `business/04-business-model.md`

```markdown
# Business Model

## Customer Segments

[Specific segments: role, industry, company size, decision context]
- [Segment 1: description]
- [Segment 2: description]

## Value Propositions (per segment)

[What you promise each segment — different segments may value different aspects]
- [Segment 1]: [Value proposition]
- [Segment 2]: [Value proposition]

## Channels

[How customers find and engage the business]
- [Channel 1: description and intent level]
- [Channel 2: description and intent level]

## Customer Relationships

[How relationships are built and maintained: personal, self-service, automated, community]

## Revenue Streams

[How money flows — per offer, pricing model, payment structure]
- [Stream 1: model and structure]

## Key Activities

[Core activities to deliver the value proposition]
- [Activity 1: what you do and why it matters to the buyer]
- [Activity 2: what you do and why it matters to the buyer]

## Key Resources

[Team, tools, expertise, certifications, proprietary assets]
- [Resource 1: description]

## Key Partnerships

[Technology partners, certifications, industry associations, delivery partners]
- [Partner 1: relationship type and buyer-facing value]

## Cost Structure

[Major cost drivers — informs pricing rationale and positioning]

## Competitive Advantages

[What's genuinely hard for competitors to copy — VRIN tested]
- [Advantage 1: why it's a real moat]

## Metrics That Matter

[Business health and customer outcome KPIs]
- [Metric 1: value and context]

## Conversion Architecture

**Awareness:** [How they discover → content needed → page → CTA]
**Consideration:** [How they evaluate → content needed → page → CTA]
**Decision:** [How they compare → content needed → page → CTA]
**Action:** [How they convert → content needed → page → CTA]

## Website Implications

| Business Model Element | Website Impact |
|----------------------|----------------|
| Customer Segments | [Page/section decisions] |
| Value Propositions | [Hero copy and messaging decisions] |
| Channels | [SEO/content strategy decisions] |
| Customer Relationships | [CTA and follow-up decisions] |
| Revenue Streams | [Pricing page decisions] |
| Key Activities | [Process/how-we-work content] |
| Key Resources | [About page and trust signals] |
| Key Partnerships | [Logo bars and credibility sections] |
| Cost Structure | [Pricing rationale and positioning] |
| Competitive Advantages | [Differentiation copy across pages] |
| Metrics That Matter | [Stats bar and proof sections] |
| Conversion Architecture | [Page flow and CTA placement] |
```

### `business/05-value-proposition.md`

Use the template at `agency/templates/value-proposition.template.md` for full
structure. The output must include:

```markdown
# Value Proposition

## Customer Profile

### Jobs-to-be-Done

**Functional jobs:** What tasks are they trying to accomplish?

- [Specific task 1]
- [Specific task 2]

**Social jobs:** How do they want to be perceived?

- [Perception goal 1]

**Emotional jobs:** What feelings do they seek or avoid?

- [Emotional need 1]

### Pains

What frustrates them about current solutions?

- [Frustration 1]

What risks do they fear?

- [Risk 1]

What's preventing them from solving this?

- [Blocker 1]

What bad outcomes have they experienced?

- [Bad outcome 1]

### Gains

What outcomes would delight them?

- [Delight 1]

What would make their job easier?

- [Ease 1]

What do they aspire to achieve?

- [Aspiration 1]

What would exceed their expectations?

- [Surprise 1]

## Value Map

### Products & Services

Exact list of what you offer — concrete, not abstract.

- [Offer 1]
- [Offer 2]

### Pain Relievers

For each pain listed above: how exactly does your offer address it?

| Pain | Relief | How |
|------|--------|-----|
| [Pain 1] | [Relief 1] | [Mechanism] |

### Gain Creators

For each gain listed above: how does your offer deliver it?

| Gain | Creator | How |
|------|---------|-----|
| [Gain 1] | [Creator 1] | [Mechanism] |

## Fit Statement

For [segment] who [job], [business] is the [category]
that [key benefit] unlike [alternatives] because [proof].

## Per-Segment Positioning

### [Segment Name]

**Fit statement:**

**Key differentiator for this segment:**

**Primary pain addressed:**

**Primary gain delivered:**

## Proof Matrix

| Claim | Evidence | Source | Status |
|-------|----------|--------|--------|
| [Claim 1] | [Evidence] | [Source] | Verified / Assumption / Gap |
```

### `business/06-personas-jtbd.md`

Write each persona with integrated JTBD:

```markdown
# Personas & Jobs-to-be-Done

## Persona: [Name]

### Profile

[Demographics, role, context...]

### Jobs-to-be-Done

- **Functional:** [What tasks they're trying to accomplish]
- **Social:** [How they want to be perceived]
- **Emotional:** [What feelings they seek or avoid]

### Pains

- [Specific frustration 1]
- [Specific frustration 2]

### Gains

- [Desired outcome 1]
- [Desired outcome 2]

### Objections

- "[Specific objection 1]"
- "[Specific objection 2]"

### Decision Criteria

- [What they evaluate when choosing]

### Verbatim Language

<!-- Captured from intake conversation -->
```

## Validation criteria

- [ ] Main offer is obvious and specific (not vague categories)
- [ ] Conversion event is explicitly named
- [ ] Value proposition headline could work in a hero section
- [ ] Each persona has at least 2 specific objections
- [ ] Conversion path maps logically from stranger to qualified lead

## Dependency chain

- **Requires:** `business/01-business-input.yaml`,
  `business/02-brand-strategy.md`
- **Feeds into:** `skills/sitemap-ia/`, `skills/seo-brief/`, `skills/page-copy/`

## Next step

After this skill: run `skills/sitemap-ia/SKILL.md`

## Guardrails

- Prefer structured markdown over vague prose
- Preserve clear separation between verified facts and assumptions
- Keep all business truth in `business/`
- Do not invent business facts — ask the user
- Value proposition must be concrete enough to shape a headline, subheadline,
  and CTA
