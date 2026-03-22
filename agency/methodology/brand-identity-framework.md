# Brand Identity Framework

## Purpose

Define the visual identity system that translates brand strategy into concrete
design tokens — colors, typography, spacing, and logo usage rules — so every
implementation decision traces back to a deliberate brand choice.

## Required outputs

- Brand philosophy statement
- Color palettes (primary, accent, neutral, semantic)
- Typography system (families, scale, weights)
- Spacing scale
- Border radius tokens
- Shadow/elevation tokens
- Logo variants and usage rules
- RTL font overrides (if applicable)

## Questions to answer

1. What is the brand's visual personality? (e.g. bold vs. understated, warm vs. cool, playful vs. serious)
2. Does a logo exist? If so, what colors does it use?
3. Does the user have an existing color preference or brand color?
4. What feeling should the color palette evoke for the target audience?
5. What typography style matches the tone of voice from the brand strategy?
6. Are there RTL locales that need specific font families?
7. Are there accessibility requirements beyond WCAG AA?
8. Are there existing brand guidelines or a style guide to respect?

## Color derivation method

1. **Logo extraction** — if a logo file exists, extract the dominant 2–3 colors
2. **Brand color hint** — if a hex color is provided, use it as primary-500
3. **Brand philosophy** — use the stated visual direction to guide palette mood
4. **Generate shades** — for each base color, generate a 50–900 scale ensuring:
   - 50 is near-white tinted with the hue
   - 500 is the base/hero shade
   - 900 is near-black tinted with the hue
   - Adjacent shades have sufficient contrast steps
5. **Accent selection** — pick a complementary or analogous accent hue
6. **Neutral selection** — derive a slightly tinted neutral from the primary hue
7. **Semantic colors** — use standard green/yellow/red/blue unless brand requires overrides
8. **Contrast check** — verify all text-on-background combinations pass WCAG AA (4.5:1 for normal text, 3:1 for large text)

## Typography derivation method

1. Read tone of voice from brand strategy
2. Match font personality to tone (e.g. geometric sans for "modern", humanist for "approachable")
3. Select heading and body families (can be the same)
4. Define a modular scale ratio (1.125 minor second through 1.333 perfect fourth)
5. For RTL locales, select fonts with proper glyph coverage and matching x-height

## Deliverable target

Write tokens so they can directly inform:
- Tailwind CSS `@theme` configuration
- Component styling defaults
- Dark mode variants (future)
- Print stylesheets (future)
- Design tool exports (Figma tokens, etc.)
