---
description: Add a new language to the site end-to-end
---

Complete workflow for adding a new language/locale to the website.

1. Ask the user for the locale code (e.g., ar, es, fr). Add it to the `locales` array in `business/01-business-input.yaml`. Create `website/locales/<locale>.json` stub with empty nav/footer/meta/pages keys. Create locale route directory at `website/routes/<locale>/`.
2. For each page in the sitemap, create locale route stubs and translate content (or mark for human translation).
3. Translate UI strings in `website/locales/<locale>.json`.
4. Verify `LocaleSwitcher` lists the new locale in `Header.tsx`.
5. Add `hreflang` tags to all existing pages via the `HrefLang` component.
6. If RTL locale: verify RTL font in brand identity and `dir="rtl"` styling.
7. Verify all locale routes render correctly and the locale switcher includes the new locale.
