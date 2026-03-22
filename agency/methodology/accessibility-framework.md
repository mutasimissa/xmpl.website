# Accessibility Framework

## Goal
Ensure the website is usable by all visitors, including those using assistive technologies, and meets WCAG 2.2 AA standards.

## Core principles (POUR)

- **Perceivable** — information and UI must be presentable in ways users can perceive
- **Operable** — UI components and navigation must be operable by all input methods
- **Understandable** — information and UI operation must be understandable
- **Robust** — content must be robust enough to work with current and future assistive technologies

## Implementation checklist

### Structure
- [ ] Semantic HTML elements (header, nav, main, section, article, footer)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipped levels)
- [ ] Landmark regions for all major page areas
- [ ] Skip-to-content link as the first focusable element

### Images and media
- [ ] Descriptive alt text on all informational images
- [ ] Empty alt="" on decorative images
- [ ] Captions or transcripts for video/audio content
- [ ] No information conveyed by color alone

### Navigation
- [ ] Keyboard-navigable (Tab, Shift+Tab, Enter, Escape)
- [ ] Visible focus indicators on all interactive elements
- [ ] Consistent navigation across pages
- [ ] Mobile menu is keyboard-accessible

### Forms
- [ ] Every input has an associated label element
- [ ] Error messages are clear and associated with the field
- [ ] Required fields are indicated (not by color alone)
- [ ] Form submission feedback is announced to screen readers

### Typography and color
- [ ] Minimum contrast ratio of 4.5:1 for normal text
- [ ] Minimum contrast ratio of 3:1 for large text
- [ ] Text is resizable to 200% without loss of content
- [ ] No text embedded in images

### Interactive elements
- [ ] Buttons have descriptive text (not just "Click here")
- [ ] Links describe their destination
- [ ] Touch targets are at least 44x44px on mobile
- [ ] No keyboard traps

## Testing approach

1. Automated scan with axe or Lighthouse
2. Manual keyboard-only navigation test
3. Screen reader spot-check (VoiceOver, NVDA)
4. Color contrast verification
5. Mobile touch target verification
