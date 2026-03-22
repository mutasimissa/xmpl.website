# Brand Assets Guide

## Required source files (user-provided)

The user must place these two SVG files before starting the intake process.
The build will fail if either is missing.

| File                         | Purpose                                   |
| ---------------------------- | ----------------------------------------- |
| `assets/brand/logo.svg`      | Primary full-color logo                   |
| `assets/brand/logo-icon.svg` | Square icon variant (favicons, app icons) |

Both must be **SVG** — the brand-identity skill generates all needed variations
and raster exports from these source files.

## Generated variants (produced by skills/brand-identity/)

The brand-identity skill reads the two source SVGs and produces:

| File                                | Derived from              | Method                         |
| ----------------------------------- | ------------------------- | ------------------------------ |
| `assets/brand/logo-white.svg`       | `logo.svg`                | Strip fills → set to `#ffffff` |
| `assets/brand/logo-black.svg`       | `logo.svg`                | Strip fills → set to `#000000` |
| `assets/brand/logo-icon.png`        | `logo-icon.svg`           | Raster export, min 512×512     |
| `assets/brand/favicon.ico`          | `logo-icon.svg`           | Multi-size ICO (16, 32, 48)    |
| `assets/brand/og-image.png`         | `logo.svg` + brand colors | Composite, 1200×630            |
| `assets/brand/apple-touch-icon.png` | `logo-icon.svg`           | Raster export, 180×180         |

## OG image guidelines

- **Dimensions:** 1200×630px (2:1 ratio)
- **Content:** Business name + tagline or value proposition
- **Style:** Brand colors, clean layout, readable at small sizes
- **Format:** PNG (for text clarity) or JPG (for photos)
- **File size:** Under 300KB for fast loading

## Logo usage rules

- Minimum clear space: 1× logo height on all sides
- Never stretch, rotate, or recolor the logo
- Use the white variant on dark backgrounds
- Use the black variant on light backgrounds when color is not available
- Square icon variant is used for favicons, app icons, and small contexts
