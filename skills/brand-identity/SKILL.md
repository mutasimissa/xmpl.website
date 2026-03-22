# Brand Identity

> **Role:** You are a visual identity designer defining the design token system
> — colors, typography, spacing, and logo usage — that will drive all website
> styling and component theming.

## Goal

Produce a structured brand identity file (`business/03-brand-identity.yaml`)
containing all design tokens needed to implement the website's visual layer.
Every token must trace back to the brand philosophy, brand strategy tone, or
logo-derived colors — no arbitrary values.

## Prerequisites

- `business/01-business-input.yaml` is complete (run `skills/business-intake/`
  first)
- `business/02-brand-strategy.md` is complete (run `skills/brand-strategy/`
  first)

## Read these files first

1. `business/01-business-input.yaml` — seed fields: `design.*` (visual style,
   reference brands, color preferences/avoidance, typography, imagery, icon
   style, UI density, accessibility level), `brand_color_hint`,
   `brand_philosophy` 1b. `assets/brand/logo.svg` — primary logo (required,
   checked at intake) 1c. `assets/brand/logo-icon.svg` — square icon (required,
   checked at intake)
2. `business/02-brand-strategy.md` — tone of voice, positioning, audience
3. `agency/methodology/brand-identity-framework.md` — derivation methods
4. `agency/schemas/brand-identity.yaml` — required fields and structure
5. `agency/templates/brand-identity.template.yaml` — blank template
6. `agency/rubrics/brand-identity-rubric.md` — scoring criteria

## Working method

1. **Read inputs** — load the business input and brand strategy files
2. **Load source logos** — read `assets/brand/logo.svg` and
   `assets/brand/logo-icon.svg` (both are required; intake enforces this).
   Examine the primary logo and extract the dominant 2–3 colors. Present them to
   the user for confirmation.
3. **Check for a color hint** — if `brand_color_hint` is set in
   `design.color_preferences`, use it as a starting seed for the primary
   palette. Logo-derived colors take precedence; use hints as fallback or accent
   seeds.
4. **Check for a brand philosophy** — if `brand_philosophy` is set, use it as
   the guiding direction for all visual decisions. If missing, ask the user to
   provide a 1–2 sentence statement describing the visual identity they want
   (e.g. "Bold and energetic" vs. "Refined and understated").
5. **Read tone of voice** — from `business/02-brand-strategy.md`, use the tone
   adjectives to inform typography and color mood choices.
6. **Generate the primary palette** — using the color derivation method from the
   framework:
   - Derive a 50–900 shade scale from the primary color
   - Ensure sufficient contrast steps between adjacent shades
   - Verify WCAG AA compliance for text-on-background combos
7. **Generate the accent palette** — pick a complementary or analogous hue and
   generate a 50–900 scale.
8. **Generate the neutral palette** — derive a slightly tinted neutral from the
   primary hue.
9. **Generate semantic colors** — use standard green/yellow/red/blue unless the
   brand requires overrides.
10. **Select typography** — match font personality to tone of voice:
    - Select heading and body font families
    - Define scale ratio, weights, and base size
    - If the project has RTL locales (check `locales` in business input), select
      appropriate RTL font families with matching x-height
11. **Define spacing, radii, and shadows** — use sensible defaults from the
    template unless the brand philosophy suggests otherwise (e.g. a "soft"
    philosophy → larger radii; a "sharp" philosophy → smaller radii).
12. **Generate logo variations** — from the two source SVGs, produce all derived
    assets listed in `agency/methodology/brand-assets-guide.md`:
    - `assets/brand/logo-white.svg` — strip fills from `logo.svg`, set to #fff
    - `assets/brand/logo-black.svg` — strip fills from `logo.svg`, set to #000
    - `assets/brand/logo-icon.png` — raster export of `logo-icon.svg` at 512×512
    - `assets/brand/favicon.ico` — multi-size ICO from `logo-icon.svg`
    - `assets/brand/og-image.png` — 1200×630 composite (logo + brand colors)
    - `assets/brand/apple-touch-icon.png` — 180×180 from `logo-icon.svg`
13. **Define logo usage rules** — record source and generated file paths in the
    `logo` section of the output, specify minimum clear space.
14. **Present the full token set to the user** — ask for confirmation or
    adjustments before writing.
15. **Write output** — save to `business/03-brand-identity.yaml`
16. **Score** — evaluate the output against the brand identity rubric. Minimum
    average score of 4.

## Output format

Write `business/03-brand-identity.yaml` matching this structure:

```yaml
brand_philosophy: "..."

colors:
  primary:
    50: "#..."
    100: "#..."
    200: "#..."
    300: "#..."
    400: "#..."
    500: "#..."
    600: "#..."
    700: "#..."
    800: "#..."
    900: "#..."
  accent:
    50: "#..."
    # ... through 900
  neutral:
    50: "#..."
    # ... through 900
  semantic:
    success: "#..."
    warning: "#..."
    error: "#..."
    info: "#..."

typography:
  heading_font: "..."
  body_font: "..."
  mono_font: "..."
  base_size: "16px"
  scale_ratio: 1.25
  heading_weight: 700
  body_weight: 400

spacing:
  base_unit: "4px"
  scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

radii:
  sm: "..."
  md: "..."
  lg: "..."
  xl: "..."
  full: "9999px"

shadows:
  sm: "..."
  md: "..."
  lg: "..."
  xl: "..."

logo:
  source: "assets/brand/logo.svg"
  icon_source: "assets/brand/logo-icon.svg"
  white: "assets/brand/logo-white.svg"
  black: "assets/brand/logo-black.svg"
  icon_png: "assets/brand/logo-icon.png"
  favicon: "assets/brand/favicon.ico"
  og_image: "assets/brand/og-image.png"
  apple_touch_icon: "assets/brand/apple-touch-icon.png"
  min_clear_space: "1x logo height"

rtl_fonts: {}
# Example: { "ar": "IBM Plex Sans Arabic", "he": "Noto Sans Hebrew" }
```

## Validation criteria

Score the output against `agency/rubrics/brand-identity-rubric.md`. Before
finishing, verify:

- [ ] `brand_philosophy` is present and specific (not generic)
- [ ] Primary palette has all shades (50–900) and a clear hero shade at 500/600
- [ ] Accent palette complements the primary (not clashing)
- [ ] Neutral palette is subtly tinted, not pure gray (unless philosophy demands
      it)
- [ ] All primary text-on-background combos pass WCAG AA (4.5:1)
- [ ] Typography families match the tone of voice from brand strategy
- [ ] RTL font families are specified for every RTL locale in the project
- [ ] Logo file paths follow the naming convention from `cli/brand-check.ts`
- [ ] Spacing, radii, and shadows are defined and internally consistent
- [ ] Average rubric score is 4 or above

## Dependency chain

- **Requires:** `business/01-business-input.yaml`,
  `business/02-brand-strategy.md`
- **Feeds into:** `skills/website-init/` (consumes tokens for Tailwind
  `@theme`), `skills/page-copy/` (tone alignment check), `skills/launch-qa/`
  (visual consistency check)

## Next step

After this skill: run `skills/offer-design/SKILL.md`

## Guardrails

- Never invent visual choices without grounding in brand philosophy, tone, or
  logo-derived colors
- Prefer structured YAML over prose
- Do not hardcode business-specific values in this skill — all values come from
  business files
- Use the derivation methods from
  `agency/methodology/brand-identity-framework.md`
- Ask the user to confirm color and typography choices before writing the output
- Validate output against the brand identity rubric before finishing
- Keep all business truth in `business/`
