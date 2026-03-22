# Conversational Business Intake Framework

Reference methodology for the `skills/business-intake/` skill. Defines the
five-phase conversational extraction approach, entity patterns, and follow-up
strategies.

## The five-phase approach

| Phase | Name | Purpose | Agent action |
|-------|------|---------|--------------|
| 1 | Free talk | Gather raw signal | Ask one open question, then listen |
| 2 | Extract | Structure the signal | Parse entities silently |
| 3 | Validate | Fill gaps | Ask natural follow-ups for missing required fields |
| 4 | Capture | Preserve voice | Store verbatim quotes in `user_language` |
| 5 | Confirm | Lock data | Present summary, get user sign-off, write file |

Phases 2 and 4 run in parallel throughout the conversation. They are not
separate turns -- extraction and capture happen continuously as the user speaks.

## Entity extraction patterns

What to listen for in natural language and where it maps in the schema.

### Direct mentions

| Pattern | Maps to | Example |
|---------|---------|---------|
| "We are [Name]" / "The company is [Name]" | `business_name` | "We're Meridian Digital" |
| "We do [X]" / "We sell [X]" / "We build [X]" | `offers` | "We build custom dashboards for logistics companies" |
| "Our clients are [X]" / "[X] hires us" | `target_segments` | "Mostly ops managers at mid-size manufacturers" |
| "We're based in [X]" / "We serve [X]" | `target_markets` | "We serve the whole GCC but mostly Saudi" |
| "I want people to [X]" / "The site should [X]" | `website_goal`, `primary_cta` | "I want people to book a demo" |
| "Unlike [X]..." / "[X] is our main competitor" | `competitors` | "Unlike HubSpot, we actually..." |

### Indirect signals

| Signal | Infer | Example |
|--------|-------|---------|
| Industry jargon density | `industry` | Heavy use of "SLA", "uptime", "NOC" signals IT/infrastructure |
| Formal vs casual register | `desired_tone` | "We partner with enterprise stakeholders" vs "We help small shops get online" |
| Specificity of client descriptions | `target_segments` depth | "Fortune 500 CFOs" vs "small businesses" |
| Unsolicited proof | `proof` seeds | "We've been doing this 12 years" / "ISO certified" |
| Emotional language about competitors | `differentiation` | "Most agencies just throw a template at you" |

### Tone inference

The user's speaking style is a strong signal for `desired_tone`. Map observed
patterns:

| Observed pattern | Likely tone adjectives |
|-----------------|----------------------|
| Short sentences, direct statements | Direct, confident, no-nonsense |
| Technical terms used naturally | Technical, precise, expert |
| Humor, casual asides | Friendly, approachable, conversational |
| Formal language, hedging | Professional, measured, credible |
| Passionate, emphatic phrasing | Bold, energetic, passionate |
| Story-driven, anecdotal | Warm, narrative, human |

Always confirm inferred tone with the user. Present 3-5 adjectives and ask if
they feel right.

## Required vs optional parameters

### Required (must be filled before writing the file)

| Field | Minimum threshold |
|-------|------------------|
| `business_name` | Non-empty string |
| `website_goal` | Describes a measurable outcome |
| `industry` | Non-empty string |
| `offers` | At least 1 item |
| `target_segments` | At least 2 items |
| `primary_cta` | Specific action verb + object |
| `desired_tone` | At least 3 adjectives |

### Optional (capture if mentioned, do not force)

- `target_markets`
- `competitors`
- `constraints`
- `brand` seeds (one_liner, mission, vision, etc.)
- `audience` detail (personas, decision makers, etc.)
- `proof` seeds (testimonials, certifications, stats)
- `messaging` seeds (headlines, pain points)
- `design` preferences
- `conversion` details (booking link, email, phone)
- `operations` facts (founded year, team size)

## Follow-up question strategy

### Rules

1. Ask at most 3 questions per turn.
2. Frame questions as curiosity, not as form fields.
3. Use the user's own words in the question when possible.
4. Prioritize: business-critical gaps first, nice-to-have gaps later.
5. If the user says "I don't know" or "I'll figure that out later", mark the
   field as an open question and move on.

### Question templates by missing field

**Audience gaps:**
- "You mentioned [offer]. Who specifically buys that -- what's their role?"
- "Can you tell me more about who you're trying to reach with this site?"
- "Is there a second type of buyer or audience beyond [first segment]?"

**Differentiation gaps:**
- "What makes someone choose you over the alternatives?"
- "You mentioned [competitor]. What do you do differently?"
- "If a customer had to explain why they picked you, what would they say?"

**CTA gaps:**
- "When someone visits your site, what's the one thing you want them to do?"
- "How do new customers typically start working with you?"
- "What's the first step for someone who's interested?"

**Tone gaps:**
- "If your website had a personality, how would you describe it?"
- "You sound pretty [observed trait] -- is that how you want the site to feel too?"
- "Any brands or websites whose tone you admire?"

**Goal gaps:**
- "What's the main thing you want this website to do for your business?"
- "If the site is working perfectly six months from now, what's different?"
- "Are you looking for leads, sales, credibility, or something else?"

## Verbatim language capture

### What to capture

Store exact phrases that have copy potential. Look for:

- **Strong opinions:** "we're fast but not cheap"
- **Vivid descriptions:** "we basically babysit their servers"
- **Pain articulation:** "most agencies just throw a template at you"
- **Aspirational statements:** "I want people to land on the site and just get it"
- **Value props in natural words:** "we don't disappear after launch"
- **Metaphors and analogies:** "it's like having a mechanic on call 24/7"
- **Emotional peaks:** moments where the user's language becomes more intense

### What not to capture

- Generic filler ("um", "you know", "basically")
- Restated questions
- Purely logistical statements ("my email is...")

### Storage format

Store in the `user_language` array field in `business/01-business-input.yaml`:

```yaml
user_language:
  - "I just want a site that doesn't look like a template"
  - "we're fast but not cheap"
  - "most agencies ghost you after launch"
```

### Downstream use

The `user_language` array feeds into:
- `skills/brand-strategy/` -- seed material for brand voice and messaging
- `skills/page-copy/` -- raw headlines, taglines, and proof language
- `skills/seo-brief/` -- natural keyword phrases from real buyer language

Copy skills should attempt to use or riff on verbatim language before inventing
new phrasing. The user's own words are almost always more authentic than
generated alternatives.
