import { readYaml, getLocales, writeText } from "./files.ts";

// ── Types ────────────────────────────────────────────────

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface BrandIdentity {
  brand_philosophy?: string;
  colors: {
    primary: ColorScale;
    accent: ColorScale;
    neutral: ColorScale;
    semantic: { success: string; warning: string; error: string; info: string };
  };
  typography: {
    heading_font: string;
    body_font: string;
    mono_font: string;
    base_size: string;
    scale_ratio: number;
    heading_weight: number;
    body_weight: number;
  };
  radii: Record<string, string>;
  shadows: Record<string, string>;
  logo: Record<string, string>;
  rtl_fonts?: Record<string, string>;
}

interface Sitemap {
  primary_navigation: string[];
  service_pillar_pages: string[];
  secondary_pages: string[];
  page_goals?: Record<string, string>;
}

interface BusinessInput {
  business_name: string;
  default_locale: string;
  locales: string[];
  primary_cta: string;
  brand_color_hint?: string;
  brand_philosophy?: string;
  constraints?: string[];
}

// ── RTL detection ────────────────────────────────────────

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur", "ku", "ps", "sd", "ug", "yi"]);

// ── Slug helpers ─────────────────────────────────────────

const slugify = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const _routePath = (pillar: string): string => {
  const slug = slugify(pillar);
  if (["home"].includes(slug)) return "/";
  return `/${slug}`;
};

// ── Generators ───────────────────────────────────────────

const generateStylesCss = (brand: BrandIdentity): string => {
  const lines: string[] = ['@import "tailwindcss";', "", "@theme {"];

  const addScale = (prefix: string, scale: ColorScale) => {
    for (const [shade, hex] of Object.entries(scale)) {
      lines.push(`  --color-${prefix}-${shade}: ${hex};`);
    }
  };

  lines.push("  /* Primary — derived from 03-brand-identity.yaml */");
  addScale("brand", brand.colors.primary);
  lines.push("");
  lines.push("  /* Accent — from brand identity */");
  addScale("accent", brand.colors.accent);
  lines.push("");
  lines.push("  /* Neutral */");
  addScale("neutral", brand.colors.neutral);
  lines.push("");

  lines.push("  /* Semantic */");
  for (const [name, hex] of Object.entries(brand.colors.semantic)) {
    lines.push(`  --color-${name}: ${hex};`);
  }
  lines.push("");

  lines.push("  /* Typography */");
  lines.push(`  --font-heading: "${brand.typography.heading_font}", system-ui, sans-serif;`);
  lines.push(`  --font-body: "${brand.typography.body_font}", system-ui, sans-serif;`);
  lines.push(`  --font-mono: "${brand.typography.mono_font}", ui-monospace, monospace;`);
  lines.push("");

  lines.push("  /* Radii */");
  for (const [name, value] of Object.entries(brand.radii)) {
    lines.push(`  --radius-${name}: ${value};`);
  }
  lines.push("");

  lines.push("  /* Shadows */");
  for (const [name, value] of Object.entries(brand.shadows)) {
    lines.push(`  --shadow-${name}: ${value};`);
  }

  lines.push("}");
  lines.push("");
  return lines.join("\n");
};

const generateLocaleTs = (input: BusinessInput): string => {
  const localeList = input.locales.map((l) => `"${l}"`).join(", ");
  const rtlCheck = input.locales
    .filter((l) => RTL_LOCALES.has(l))
    .map((l) => `"${l}"`)
    .join(", ");

  return `const config = {
  defaultLocale: "${input.default_locale}" as const,
  locales: [${localeList}] as const,
  isRTL(locale: string): boolean {
    return [${rtlCheck}].includes(locale);
  },
};

export default config;
export type Locale = (typeof config.locales)[number];
`;
};

const generateI18nTs = (): string => `import config from "./locale.ts";

type TranslationData = Record<string, unknown>;

const cache = new Map<string, TranslationData>();

const loadTranslations = (locale: string): TranslationData => {
  if (cache.has(locale)) return cache.get(locale)!;
  try {
    const raw = Deno.readTextFileSync(
      new URL(\`../locales/\${locale}.json\`, import.meta.url),
    );
    const data = JSON.parse(raw) as TranslationData;
    cache.set(locale, data);
    return data;
  } catch {
    return {};
  }
};

const getNestedValue = (obj: TranslationData, path: string): string => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
};

export const createTranslator = (locale: string) => {
  const data = loadTranslations(locale);
  return (key: string): string => getNestedValue(data, key);
};

export const localePath = (path: string, locale: string): string => {
  if (locale === config.defaultLocale) return path;
  return \`/\${locale}\${path === "/" ? "" : path}\`;
};
`;

const generateAppTsx = (brand: BrandIdentity, input: BusinessInput): string => {
  const fonts: string[] = [brand.typography.heading_font];
  if (brand.typography.body_font !== brand.typography.heading_font) {
    fonts.push(brand.typography.body_font);
  }
  const rtlFonts = brand.rtl_fonts ?? {};
  for (const font of Object.values(rtlFonts)) {
    if (!fonts.includes(font)) fonts.push(font);
  }

  const googleFontsQuery = fonts
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700`)
    .join("&");

  const rtlFontName = Object.values(rtlFonts)[0] ?? "";
  const hasRtl = input.locales.some((l) => RTL_LOCALES.has(l));

  return `import { define } from "../utils.ts";

export default define.page(function App({ Component, state }) {
  const locale = state.locale ?? "${input.default_locale}";
  const dir = state.dir ?? "ltr";
${hasRtl ? `  const fontClass = dir === "rtl"
    ? "font-[${rtlFontName.replace(/ /g, "_")}]"
    : "font-[${brand.typography.body_font.replace(/ /g, "_")}]";` : `  const fontClass = "font-[${brand.typography.body_font.replace(/ /g, "_")}]";`}

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?${googleFontsQuery}&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class={\`bg-white text-neutral-800 antialiased \${fontClass}\`}>
        <a
          href="#main-content"
          class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Component />
      </body>
    </html>
  );
});
`;
};

const generateRootMiddleware = (_input: BusinessInput): string => {
  return `import { define } from "../utils.ts";
import config from "../utils/locale.ts";

export const handler = define.middleware(async (ctx) => {
  const segments = new URL(ctx.req.url).pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (
    config.locales.includes(maybeLocale) && maybeLocale !== config.defaultLocale
  ) {
    ctx.state.locale = maybeLocale;
  } else {
    ctx.state.locale = config.defaultLocale;
  }
  ctx.state.dir = config.isRTL(ctx.state.locale) ? "rtl" : "ltr";
  return ctx.next();
});
`;
};

const generateLocaleMiddleware = (): string => {
  return `import { define } from "../../utils.ts";
import { HttpError } from "fresh";
import config from "../../utils/locale.ts";

export const handler = define.middleware(async (ctx) => {
  const locale = ctx.params.locale;
  if (
    !config.locales.includes(locale) ||
    locale === config.defaultLocale
  ) {
    throw new HttpError(404);
  }
  ctx.state.locale = locale;
  ctx.state.dir = config.isRTL(locale) ? "rtl" : "ltr";
  return ctx.next();
});
`;
};

const generateHeaderTsx = (sitemap: Sitemap, input: BusinessInput): string => {
  const navItems = sitemap.primary_navigation.map((name) => {
    const href = name.toLowerCase() === "home" ? "/" : `/${slugify(name)}`;
    return `  { label: "${name}", href: "${href}" },`;
  });

  return `import MobileNav from "../islands/MobileNav.tsx";
import LocaleSwitcher from "../islands/LocaleSwitcher.tsx";

const NAV_ITEMS = [
${navItems.join("\n")}
];

interface HeaderProps {
  locale?: string;
  currentPath?: string;
}

export default function Header(
  { locale = "${input.default_locale}", currentPath = "/" }: HeaderProps,
) {
  return (
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="/" class="flex items-center gap-2" aria-label="${input.business_name} home">
            <span class="text-xl font-bold text-brand-800">${input.business_name}</span>
          </a>

          <nav
            class="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                class="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-brand-600 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              class="ms-3 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
            >
              ${input.primary_cta}
            </a>
            <LocaleSwitcher currentLocale={locale} currentPath={currentPath} />
          </nav>

          <div class="flex items-center gap-2 md:hidden">
            <LocaleSwitcher currentLocale={locale} currentPath={currentPath} />
            <MobileNav items={NAV_ITEMS} />
          </div>
        </div>
      </div>
    </header>
  );
}
`;
};

const generateFooterTsx = (sitemap: Sitemap, input: BusinessInput): string => {
  const pillarLinks = sitemap.service_pillar_pages.map((name) => {
    return `  { label: "${name}", href: "/services/${slugify(name)}" },`;
  });

  const companyLinks = sitemap.primary_navigation
    .filter((n) => n.toLowerCase() !== "home" && n.toLowerCase() !== "services")
    .map((name) => `  { label: "${name}", href: "/${slugify(name)}" },`);

  const legalLinks = sitemap.secondary_pages
    .filter((n) => n.toLowerCase() !== "faq")
    .map((name) => `  { label: "${name}", href: "/${slugify(name)}" },`);

  return `const PILLAR_LINKS = [
${pillarLinks.join("\n")}
];

const COMPANY_LINKS = [
${companyLinks.join("\n")}
];

const LEGAL_LINKS = [
${legalLinks.join("\n")}
];

export default function Footer() {
  return (
    <footer class="bg-brand-900 text-neutral-300" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span class="text-xl font-bold text-white">${input.business_name}</span>
            <p class="mt-3 text-sm leading-relaxed text-neutral-400">
              {/* Copy from content deck */}
            </p>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul class="space-y-2">
              {PILLAR_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    class="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul class="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    class="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get started
            </h3>
            <p class="text-sm text-neutral-400 mb-4">
              {/* CTA copy from content deck */}
            </p>
            <a
              href="/contact"
              class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-accent-500 hover:bg-accent-600 rounded-lg transition-colors"
            >
              ${input.primary_cta}
            </a>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} ${input.business_name}. All rights reserved.
          </p>
          <div class="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                class="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
`;
};

const generateHeroTsx = (input: BusinessInput): string => `interface HeroProps {
  headline: string;
  subheadline: string;
  variant?: "centered" | "split" | "minimal" | "image-bg";
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function Hero({
  headline,
  subheadline,
  variant = "centered",
  ctaText = "${input.primary_cta}",
  ctaHref = "/contact",
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt = "",
  breadcrumb,
}: HeroProps) {
  const ctaButtons = (
    <div class="mt-10 flex flex-col sm:flex-row items-center gap-4">
      <a
        href={ctaHref}
        class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-md transition-colors"
      >
        {ctaText}
      </a>
      {secondaryCtaText && secondaryCtaHref && (
        <a
          href={secondaryCtaHref}
          class="inline-flex items-center px-6 py-3 text-base font-semibold text-brand-700 bg-white border border-brand-200 hover:border-brand-300 rounded-lg transition-colors"
        >
          {secondaryCtaText}
        </a>
      )}
    </div>
  );

  if (variant === "minimal") {
    return (
      <section class="bg-white pt-8 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav class="mb-4 text-sm text-neutral-500" aria-label="Breadcrumb">
              {breadcrumb.map((item, i) => (
                <span key={item.href}>
                  {i > 0 && <span class="mx-2">/</span>}
                  <a href={item.href} class="hover:text-brand-600 transition-colors">{item.label}</a>
                </span>
              ))}
            </nav>
          )}
          <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            {headline}
          </h1>
          <p class="mt-3 text-lg text-neutral-600 max-w-2xl">{subheadline}</p>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section class="bg-gradient-to-br from-brand-50 to-white py-16 sm:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
              {headline}
            </h1>
            <p class="mt-6 text-lg text-neutral-600 leading-relaxed">{subheadline}</p>
            {ctaButtons}
          </div>
          {imageSrc && (
            <div class="relative">
              <img
                src={imageSrc}
                alt={imageAlt}
                class="rounded-xl shadow-lg w-full"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "image-bg") {
    return (
      <section
        class="relative bg-neutral-900 py-24 sm:py-32 bg-cover bg-center"
        style={imageSrc ? \`background-image: url('\${imageSrc}')\` : undefined}
      >
        <div class="absolute inset-0 bg-neutral-900/70" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {headline}
          </h1>
          <p class="mt-6 text-lg sm:text-xl text-neutral-200 leading-relaxed max-w-3xl mx-auto">
            {subheadline}
          </p>
          {ctaButtons}
        </div>
      </section>
    );
  }

  // Default: centered
  return (
    <section class="relative bg-gradient-to-b from-brand-50 to-white py-20 sm:py-28 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight">
          {headline}
        </h1>
        <p class="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
          {subheadline}
        </p>
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {ctaButtons}
        </div>
      </div>
    </section>
  );
}
`;

const generateCtaTsx = (input: BusinessInput): string => `interface CTAProps {
  headline: string;
  body: string;
  variant?: "banner" | "inline" | "card";
  ctaText?: string;
  ctaHref?: string;
}

export default function CTA({
  headline,
  body,
  variant = "banner",
  ctaText = "${input.primary_cta}",
  ctaHref = "/contact",
}: CTAProps) {
  const button = (
    <a
      href={ctaHref}
      class={\`inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg shadow-md transition-colors \${
        variant === "banner"
          ? "text-brand-900 bg-white hover:bg-brand-50"
          : "text-white bg-brand-600 hover:bg-brand-700"
      }\`}
    >
      {ctaText}
    </a>
  );

  if (variant === "inline") {
    return (
      <div class="flex flex-col sm:flex-row items-center gap-4 py-6">
        <div>
          <p class="text-lg font-semibold text-neutral-900">{headline}</p>
          <p class="text-sm text-neutral-600">{body}</p>
        </div>
        {button}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div class="bg-brand-50 rounded-xl p-8 shadow-sm border border-brand-100">
        <h3 class="text-xl font-bold text-neutral-900">{headline}</h3>
        <p class="mt-2 text-neutral-600 leading-relaxed">{body}</p>
        <div class="mt-6">{button}</div>
      </div>
    );
  }

  // Default: banner
  return (
    <section class="bg-brand-800 py-16 sm:py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white">{headline}</h2>
        <p class="mt-4 text-lg text-brand-200 leading-relaxed">{body}</p>
        <div class="mt-8">{button}</div>
      </div>
    </section>
  );
}
`;

const generateSectionTsx = (): string => `interface SectionProps {
  headline: string;
  variant?: "default" | "cards" | "split" | "full-bleed" | "stats" | "testimonials";
  bg?: "white" | "light";
  children: preact.ComponentChildren;
}

export default function Section({
  headline,
  variant = "default",
  bg = "white",
  children,
}: SectionProps) {
  const bgClass = bg === "light" ? "bg-neutral-50" : "bg-white";

  const variantClasses: Record<string, string> = {
    default: "mt-8",
    cards: "mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    split: "mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
    "full-bleed": "mt-8",
    stats: "mt-10 flex flex-wrap justify-center gap-8 sm:gap-16",
    testimonials: "mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  };

  if (variant === "full-bleed") {
    return (
      <section class={\`py-16 sm:py-20 \${bg === "light" ? "bg-neutral-50" : "bg-brand-800 text-white"}\`}>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class={\`text-3xl font-bold tracking-tight \${bg === "light" ? "text-neutral-900" : "text-white"}\`}>
            {headline}
          </h2>
          <div class={variantClasses["full-bleed"]}>{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section class={\`py-16 sm:py-20 \${bgClass}\`}>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-neutral-900 tracking-tight">
          {headline}
        </h2>
        <div class={variantClasses[variant] || variantClasses.default}>{children}</div>
      </div>
    </section>
  );
}
`;

// ── Trust signal components (conditional rendering) ───────

const generateSocialProofTsx = (): string => `interface SocialProofProps {
  clients: { name: string; logo?: string }[];
  heading?: string;
}

export default function SocialProof({ clients, heading = "Trusted by" }: SocialProofProps) {
  if (!clients || clients.length === 0) return null;

  return (
    <section class="py-12 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm font-medium text-neutral-500 uppercase tracking-wider mb-8">
          {heading}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {clients.map((client) => (
            <div key={client.name} class="flex items-center">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  class="h-8 sm:h-10 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                  loading="lazy"
                />
              ) : (
                <span class="text-sm font-medium text-neutral-400">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const generateStatsBarTsx = (): string => `interface StatsBarProps {
  stats: { value: string; label: string }[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section class="py-12 bg-brand-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-8 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} class="text-center">
              <p class="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
              <p class="mt-1 text-sm text-brand-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const generateTestimonialCardTsx = (): string => `interface TestimonialCardProps {
  testimonials: { quote: string; name: string; role: string; company?: string }[];
}

export default function TestimonialCard({ testimonials }: TestimonialCardProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <blockquote
          key={t.name}
          class="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
        >
          <p class="text-neutral-700 leading-relaxed italic">"{t.quote}"</p>
          <footer class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">
              {t.name.charAt(0)}
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-900">{t.name}</p>
              <p class="text-xs text-neutral-500">
                {t.role}{t.company ? \`, \${t.company}\` : ""}
              </p>
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
`;

const generateCaseStudyCardTsx = (): string => `interface CaseStudyCardProps {
  studies: { client: string; challenge: string; result: string; href?: string }[];
}

export default function CaseStudyCard({ studies }: CaseStudyCardProps) {
  if (!studies || studies.length === 0) return null;

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {studies.map((study) => {
        const content = (
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <p class="text-xs font-medium text-brand-600 uppercase tracking-wider">
              {study.client}
            </p>
            <p class="mt-2 text-sm text-neutral-600">
              <span class="font-semibold text-neutral-900">Challenge:</span> {study.challenge}
            </p>
            <p class="mt-2 text-sm text-neutral-600">
              <span class="font-semibold text-neutral-900">Result:</span> {study.result}
            </p>
          </div>
        );
        return study.href ? (
          <a key={study.client} href={study.href} class="block">
            {content}
          </a>
        ) : (
          <div key={study.client}>{content}</div>
        );
      })}
    </div>
  );
}
`;

const generateHrefLangTsx = (_input: BusinessInput): string => {
  return `import config from "../utils/locale.ts";

interface HrefLangProps {
  path: string;
  baseUrl?: string;
}

export default function HrefLang({ path, baseUrl = "" }: HrefLangProps) {
  return (
    <>
      {config.locales.map((locale) => {
        const href = locale === config.defaultLocale
          ? \`\${baseUrl}\${path}\`
          : \`\${baseUrl}/\${locale}\${path === "/" ? "" : path}\`;
        return (
          <link key={locale} rel="alternate" hreflang={locale} href={href} />
        );
      })}
      <link rel="alternate" hreflang="x-default" href={\`\${baseUrl}\${path}\`} />
    </>
  );
}
`;
};

const generateLocaleJson = (_locale: string, input: BusinessInput): string => {
  return JSON.stringify(
    {
      nav: {
        home: "Home",
        services: "Services",
        about: "About",
        contact: "Contact",
        book_cta: input.primary_cta,
      },
      footer: {
        copyright: "\u00a9 {year} {business}. All rights reserved.",
        services: "Services",
        company: "Company",
        get_started: "Get started",
      },
      meta: {},
      pages: {},
    },
    null,
    2,
  ) + "\n";
};

const generateRouteStub = (pageName: string, input: BusinessInput): string => {
  const slug = slugify(pageName);
  const titleCase = pageName;

  return `import { Head } from "fresh/runtime";
import { define } from "${slug.includes("/") ? "../../" : "../"}utils.ts";
import Header from "${slug.includes("/") ? "../../" : "../"}components/Header.tsx";
import Footer from "${slug.includes("/") ? "../../" : "../"}components/Footer.tsx";
import HrefLang from "${slug.includes("/") ? "../../" : "../"}components/HrefLang.tsx";

export default define.page(function ${titleCase.replace(/[^a-zA-Z]/g, "")}Page() {
  return (
    <>
      <Head>
        <title>${titleCase} | ${input.business_name}</title>
        <meta name="description" content="" />
        <HrefLang path="/${slug}" />
      </Head>
      <Header />
      <main id="main-content">
        {/* Populate from content/04-content-deck.md */}
      </main>
      <Footer />
    </>
  );
});
`;
};

const generateLocaleIndex = (): string => `import { define } from "../../utils.ts";

export default define.page(function LocaleHome() {
  return (
    <>
      {/* Re-export or mirror the default locale home page */}
      <p>Translation in progress</p>
    </>
  );
});
`;

const generateLocaleCatchAll = (): string => `import { define } from "../../utils.ts";

export default define.page(function LocaleCatchAll() {
  return (
    <>
      {/* Translation placeholder for non-default locale pages */}
      <p>Translation in progress</p>
    </>
  );
});
`;

// ── SEO generators ───────────────────────────────────────

const generateRobotsTxt = (input: BusinessInput): string => `# Robots.txt for ${input.business_name}
User-agent: *
Allow: /

# Update the domain below before launch (or set SITE_DOMAIN env var)
Sitemap: https://example.com/sitemap.xml
`;

const generateSitemapRoute = (_input: BusinessInput): string => {
  return `import config from "../utils/locale.ts";
import siteConfig from "../utils/site-config.ts";

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
}

const STATIC_PAGES: SitemapEntry[] = [];

// Build sitemap entries from the sitemap YAML at build time
// This route reads content/01-sitemap.yaml and generates XML
const buildEntries = (): SitemapEntry[] => {
  const entries: SitemapEntry[] = [...STATIC_PAGES];

  // Add entries for each locale
  for (const locale of config.locales) {
    const prefix = locale === config.defaultLocale ? "" : \`/\${locale}\`;
    entries.push({ loc: \`\${prefix}/\`, changefreq: "weekly", priority: "1.0" });
  }

  return entries;
};

export const handler = {
  GET(_req: Request): Response {
    const baseUrl = siteConfig.baseUrl;
    const entries = buildEntries();

    const urls = entries
      .map(
        (e) => \`  <url>
    <loc>\${baseUrl}\${e.loc}</loc>
    <changefreq>\${e.changefreq}</changefreq>
    <priority>\${e.priority}</priority>
  </url>\`,
      )
      .join("\\n");

    const xml = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${urls}
</urlset>\`;

    return new Response(xml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  },
};
`;
};

const generateOGMetaTsx = (input: BusinessInput): string => `import siteConfig from "../utils/site-config.ts";

interface OGMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  siteName?: string;
  locale?: string;
  publishedTime?: string;
  author?: string;
}

export default function OGMeta({
  title,
  description,
  path,
  image = "/og-image.png",
  type = "website",
  siteName = "${input.business_name}",
  locale = "${input.default_locale}",
  publishedTime,
  author,
}: OGMetaProps) {
  const baseUrl = siteConfig.baseUrl;
  const url = \`\${baseUrl}\${path}\`;
  const imageUrl = image.startsWith("http") ? image : \`\${baseUrl}\${image}\`;

  return (
    <>
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Article-specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}
    </>
  );
}
`;

const generateJsonLdTsx = (input: BusinessInput): string => `import siteConfig from "../utils/site-config.ts";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export const OrganizationJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.baseUrl,
      logo: \`\${siteConfig.baseUrl}/logo.svg\`,
    }}
  />
);

export const WebSiteJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.baseUrl,
    }}
  />
);

export const BreadcrumbJsonLd = ({ items }: { items: { name: string; href: string }[] }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: \`\${siteConfig.baseUrl}\${item.href}\`,
      })),
    }}
  />
);

export const FAQJsonLd = ({ questions }: { questions: { q: string; a: string }[] }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    }}
  />
);

export const ServiceJsonLd = ({ name, description }: { name: string; description: string }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      provider: {
        "@type": "Organization",
        name: "${input.business_name}",
      },
    }}
  />
);
`;

const generateManifestJson = (brand: BrandIdentity, input: BusinessInput): string =>
  JSON.stringify(
    {
      name: input.business_name,
      short_name: input.business_name,
      start_url: "/",
      display: "standalone",
      background_color: brand.colors.neutral["50"] || "#ffffff",
      theme_color: brand.colors.primary["600"] || "#2563eb",
      icons: [
        { src: "/logo-icon.png", sizes: "192x192", type: "image/png" },
        { src: "/logo-icon.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n";

const generate404Page = (input: BusinessInput): string => `import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default define.page(function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found | ${input.business_name}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
      <main id="main-content" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center px-4">
          <h1 class="text-6xl font-bold text-brand-600">404</h1>
          <p class="mt-4 text-xl text-neutral-600">
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            class="mt-8 inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
          >
            Go to homepage
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
});
`;

const generateBlogSlugRoute = (): string => `import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import OGMeta from "../../components/OGMeta.tsx";

export default define.page(function BlogPost({ params }) {
  const _slug = params.slug;
  return (
    <>
      <Head>
        <title>Blog Post</title>
        <OGMeta title="Blog Post" description="" path={\`/blog/\${_slug}\`} />
      </Head>
      <Header />
      <main id="main-content">
        <article class="max-w-3xl mx-auto px-4 py-16">
          {/* Populate from website/content/blog/ markdown files */}
        </article>
      </main>
      <Footer />
    </>
  );
});
`;

const generateBlogIndexRoute = (input: BusinessInput): string => `import { define } from "../../utils.ts";
import { Head } from "fresh/runtime";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import OGMeta from "../../components/OGMeta.tsx";

export default define.page(function BlogIndex() {
  return (
    <>
      <Head>
        <title>Blog | ${input.business_name}</title>
        <OGMeta title="Blog" description="Latest articles and insights from ${input.business_name}" path="/blog" />
      </Head>
      <Header />
      <main id="main-content">
        <section class="max-w-7xl mx-auto px-4 py-16">
          <h1 class="text-4xl font-bold text-neutral-900">Blog</h1>
          {/* Populate blog listing from website/content/blog/ */}
        </section>
      </main>
      <Footer />
    </>
  );
});
`;

// ── Generator fixes (Part J) ──────────────────────────────

const generateViteConfig = (): string => `import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
`;

const generateSiteConfig = (input: BusinessInput): string => `/**
 * Centralized site configuration — single source for domain, business name,
 * and other site-wide constants. Import this instead of hardcoding values.
 */
const siteConfig = {
  /** Business name from business/01-business-input.yaml */
  name: "${input.business_name}",
  /** Production domain — update this before launch */
  domain: Deno.env.get("SITE_DOMAIN") || "localhost:8000",
  /** Full base URL including protocol */
  get baseUrl(): string {
    const d = this.domain;
    return d.startsWith("localhost") ? \`http://\${d}\` : \`https://\${d}\`;
  },
  /** Default locale */
  defaultLocale: "${input.default_locale}",
  /** Primary CTA text */
  primaryCta: "${input.primary_cta}",
} as const;

export default siteConfig;
`;

const generateDenoJson = (input: BusinessInput): string =>
  JSON.stringify(
    {
      lock: false,
      tasks: {
        start: "deno run -A main.ts",
        build: "deno run -A main.ts build",
        preview: "deno run -A main.ts preview",
      },
      imports: {
        "fresh": "jsr:@fresh/core@^2",
        "fresh/": "jsr:@fresh/core@^2/",
        "preact": "npm:preact@^10",
        "preact/": "npm:preact@^10/",
        "@preact/signals": "npm:@preact/signals@^2",
        "@tailwindcss/vite": "npm:@tailwindcss/vite@^4",
        "tailwindcss": "npm:tailwindcss@^4",
      },
      compilerOptions: {
        jsx: "react-jsx",
        jsxImportSource: "preact",
      },
      nodeModulesDir: "auto",
      name: input.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    },
    null,
    2,
  ) + "\n";

// ── Public API ────────────────────────────────────────────

export const readBrandIdentity = (): BrandIdentity =>
  readYaml<BrandIdentity>("business/03-brand-identity.yaml");

export const readSitemap = (): Sitemap =>
  readYaml<Sitemap>("content/01-sitemap.yaml");

export const readBusinessInput = (): BusinessInput =>
  readYaml<BusinessInput>("business/01-business-input.yaml");

export const generateAllBrandedFiles = async (): Promise<string[]> => {
  const brand = readBrandIdentity();
  const sitemap = readSitemap();
  const input = readBusinessInput();
  const { locales } = getLocales();

  const written: string[] = [];

  const write = async (path: string, content: string) => {
    await writeText(path, content);
    written.push(path);
  };

  // Core config files
  await write("website/vite.config.ts", generateViteConfig());
  await write("website/utils/site-config.ts", generateSiteConfig(input));
  await write("website/deno.json", generateDenoJson(input));
  await write("website/assets/styles.css", generateStylesCss(brand));
  await write("website/utils/locale.ts", generateLocaleTs(input));
  await write("website/utils/i18n.ts", generateI18nTs());

  // App shell
  await write("website/routes/_app.tsx", generateAppTsx(brand, input));
  await write("website/routes/_middleware.ts", generateRootMiddleware(input));
  await write("website/routes/[locale]/_middleware.ts", generateLocaleMiddleware());

  // Shared components
  await write("website/components/Header.tsx", generateHeaderTsx(sitemap, input));
  await write("website/components/Footer.tsx", generateFooterTsx(sitemap, input));
  await write("website/components/Hero.tsx", generateHeroTsx(input));
  await write("website/components/CTA.tsx", generateCtaTsx(input));
  await write("website/components/Section.tsx", generateSectionTsx());

  // Trust signal components (conditional rendering)
  await write("website/components/SocialProof.tsx", generateSocialProofTsx());
  await write("website/components/StatsBar.tsx", generateStatsBarTsx());
  await write("website/components/TestimonialCard.tsx", generateTestimonialCardTsx());
  await write("website/components/CaseStudyCard.tsx", generateCaseStudyCardTsx());
  await write("website/components/HrefLang.tsx", generateHrefLangTsx(input));

  // Locale JSON stubs
  for (const locale of locales) {
    await write(`website/locales/${locale}.json`, generateLocaleJson(locale, input));
  }

  // Route stubs — home
  await write(
    "website/routes/index.tsx",
    generateRouteStub("Home", input).replace(
      `<HrefLang path="/home" />`,
      `<HrefLang path="/" />`,
    ).replace(
      `<title>Home | ${input.business_name}</title>`,
      `<title>${input.business_name}</title>`,
    ),
  );

  // Route stubs — primary nav (except Home)
  for (const page of sitemap.primary_navigation) {
    if (page.toLowerCase() === "home") continue;
    const slug = slugify(page);
    await write(`website/routes/${slug}.tsx`, generateRouteStub(page, input));
  }

  // Route stubs — service pillar pages
  for (const pillar of sitemap.service_pillar_pages) {
    const slug = slugify(pillar);
    await write(
      `website/routes/services/${slug}.tsx`,
      generateRouteStub(pillar, input)
        .replace(/from "\.\.\/utils\.ts"/g, 'from "../../utils.ts"')
        .replace(/from "\.\.\/components\//g, 'from "../../components/')
        .replace(/from "\.\.\/islands\//g, 'from "../../islands/'),
    );
  }

  // Route stubs — services index
  await write(
    "website/routes/services/index.tsx",
    generateRouteStub("Services", input)
      .replace(/from "\.\.\/utils\.ts"/g, 'from "../../utils.ts"')
      .replace(/from "\.\.\/components\//g, 'from "../../components/')
      .replace(/from "\.\.\/islands\//g, 'from "../../islands/'),
  );

  // Route stubs — secondary pages
  for (const page of sitemap.secondary_pages) {
    const slug = slugify(page);
    await write(`website/routes/${slug}.tsx`, generateRouteStub(page, input));
  }

  // Locale routes
  await write("website/routes/[locale]/index.tsx", generateLocaleIndex());
  await write("website/routes/[locale]/[...slug].tsx", generateLocaleCatchAll());

  // SEO files
  await write("website/static/robots.txt", generateRobotsTxt(input));
  await write("website/routes/sitemap.xml.ts", generateSitemapRoute(input));
  await write("website/components/OGMeta.tsx", generateOGMetaTsx(input));
  await write("website/components/JsonLd.tsx", generateJsonLdTsx(input));
  await write("website/static/manifest.json", generateManifestJson(brand, input));
  await write("website/routes/_404.tsx", generate404Page(input));

  // Blog routes
  await write("website/routes/blog/index.tsx", generateBlogIndexRoute(input));
  await write("website/routes/blog/[slug].tsx", generateBlogSlugRoute());

  return written;
};
