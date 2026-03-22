# Component Variant System

Every page uses the same component library, but each page type should look
visually distinct by using different **variants** of shared components.

## Hero Variants

### `centered` (default)

Text-centered hero with headline, subheadline, and CTA buttons centered.
Best for: homepage, about page, generic landing pages.

```
[                                      ]
[         Headline (centered)          ]
[       Subheadline (centered)         ]
[      [Primary CTA]  [Secondary]      ]
[                                      ]
```

### `split`

Two-column layout: text on one side, image/visual on the other.
Best for: service pages, product pages, industry pages.

```
[  Headline          |                 ]
[  Subheadline       |    Image /      ]
[  [Primary CTA]     |    Visual       ]
[                    |                 ]
```

### `minimal`

Compact hero with just headline and breadcrumb. No background gradient.
Best for: blog index, FAQ, legal pages, secondary pages.

```
[ Breadcrumb > Current Page            ]
[ Headline                             ]
[ Brief description                    ]
```

### `image-bg`

Full-width background image with overlaid text.
Best for: case studies, portfolio, high-impact landing pages.

```
[ ████████████████████████████████████ ]
[ ████  Headline (white text)  ████████ ]
[ ████  Subheadline            ████████ ]
[ ████  [Primary CTA]          ████████ ]
[ ████████████████████████████████████ ]
```

## Section Variants

### `default`

Standard section with headline and body content.

### `cards`

Grid of cards (2-4 columns). Each card has icon/image, title, description.
Best for: features, services overview, team members.

### `split`

Two-column layout alternating text and image sides.
Best for: "how it works" steps, feature details with visuals.

### `full-bleed`

Edge-to-edge background color with contained content.
Best for: CTA sections, testimonial highlights, stats.

### `stats`

Horizontal row of key metrics with large numbers.
Best for: social proof, results, impact numbers.

### `testimonials`

Quote cards or carousel with attribution.
Best for: customer testimonials, reviews.

## CTA Variants

### `banner`

Full-width colored band with headline, body, and button.
Best for: page-ending CTAs, between-section CTAs.

### `inline`

Compact CTA within content flow — just text and a button.
Best for: mid-page CTAs, sidebar CTAs.

### `card`

Boxed CTA with background, headline, body, and button.
Best for: floating CTAs, sidebar callouts.

## Page Type → Variant Mapping

| Page Type | Hero | Sections | CTA |
|-----------|------|----------|-----|
| Homepage | `centered` | `cards`, `stats`, `testimonials` | `banner` |
| Service page | `split` | `split`, `cards`, `testimonials` | `banner` |
| About page | `centered` | `split`, `stats` | `inline` |
| Contact page | `minimal` | `default` | `inline` |
| Blog index | `minimal` | `cards` | `card` |
| Blog post | `minimal` | `default` | `inline` |
| FAQ page | `minimal` | `default` | `banner` |
| Case study | `image-bg` | `split`, `stats` | `banner` |
| Industry page | `split` | `cards`, `testimonials` | `banner` |
| Pricing page | `centered` | `cards` | `banner` |
| Landing page | `centered` or `split` | `cards`, `stats`, `testimonials` | `banner` |

## Implementation notes

- Components accept a `variant` prop: `<Hero variant="split" ... />`
- Default variant is always the first listed for each component
- Variants affect layout and styling, not content structure
- All variants must be accessible and responsive
- Use Tailwind utility classes for variant styling — no custom CSS
