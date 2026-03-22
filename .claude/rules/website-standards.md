# Website Standards

- Use semantic HTML: header, nav, main, section, article, footer — no div soup
- Proper heading hierarchy: one H1 per page, H2 for sections, H3 for subsections
- Accessible markup: ARIA labels where needed, skip-to-content link, visible
  focus indicators
- Mobile-first responsive design with touch targets at least 44x44px
- Performance-aware: server-side rendering (Fresh default), minimal client JS,
  lazy-loaded images
- Images: WebP/AVIF format, explicit width/height, descriptive alt text
- Forms: every input has a label, clear error messages, accessible required
  field indicators
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (WCAG 2.2
  AA)
- Keyboard navigable: Tab, Shift+Tab, Enter, Escape work on all interactive
  elements
- Use Tailwind CSS utility classes — no custom CSS unless strictly necessary
- Islands only for interactive elements (forms, mobile nav) — everything else
  server-rendered
- Record implementation decisions in `docs/decisions/`
