# Phase 4: Layout & Navigation - Research

**Researched:** 2026-03-15
**Domain:** Astro layout components, CSS fixed positioning, navigation active states
**Confidence:** HIGH

## Summary

This research covers implementing a fixed navigation header, shared footer, and page layout structure in Astro 6. The work is primarily Astro component composition — no new npm packages are needed. The design system from Phase 3 (Tailwind 4, Nordic monochrome tokens, JetBrains Mono + IBM Plex Sans) is already in place and must be used faithfully.

Phase 3 produced `src/layouts/BaseLayout.astro` (html shell + font loading + global styles) and `src/pages/index.astro` (uses BaseLayout). Phase 4 extends BaseLayout to include a persistent `Header.astro` and `Footer.astro`, then updates all pages to use the enriched layout.

The two key technical decisions are (1) use `position: fixed` (not `sticky`) for the header per NAV-01, with `padding-top` on the body to prevent content overlap, and (2) use `Astro.url.pathname` to drive `aria-current="page"` active link state in the nav component.

**Primary recommendation:** Compose Header and Footer as separate components imported into BaseLayout. Use `position: fixed; top: 0; z-index: 50` on the header, offset page content with `padding-top` equal to header height. Use `Astro.url.pathname` for active link detection with `aria-current="page"` for accessibility.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Fixed navigation header on all pages | `position: fixed; top: 0` in CSS; header imported in BaseLayout so every page automatically gets it; body needs `padding-top` to prevent overlap |
| NAV-02 | Navigation includes Home and About links | Two `<a>` elements in Header.astro with `href="/"` and `href="/about"`; active state via `Astro.url.pathname`; `aria-current="page"` for a11y |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.0.4 (already installed) | Layout component system | Slots, props, `Astro.url` built in — no external library needed |
| Tailwind CSS | 4.2.1 (already installed) | Utility classes for layout and nav styling | Design system already wired; use existing tokens |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | - | - | Phase 4 requires no new npm dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `position: fixed` header | `position: sticky` header | Sticky is simpler (no body padding needed) but spec says "Fixed" (NAV-01) — use fixed |
| Inline active class | `aria-current="page"` attribute | aria-current satisfies both visual styling and screen reader semantics; prefer this |
| Separate HeaderLink component | Inline conditional classes | HeaderLink component is cleaner and reusable; worth creating for two links |

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── ui/
│   │   └── Button.astro        # Existing from Phase 3
│   └── layout/
│       ├── Header.astro        # NEW: fixed nav with Home + About links
│       └── Footer.astro        # NEW: footer with GitHub, LinkedIn, email
├── layouts/
│   └── BaseLayout.astro        # UPDATED: import + render Header and Footer
├── pages/
│   ├── index.astro             # UPDATED: content moves inside layout slot; no nav duplication
│   └── about.astro             # NEW: About page using BaseLayout (Phase 5 will fill content)
└── styles/
    ├── global.css              # Existing — add padding-top to body for fixed header
    └── theme.css               # Existing — no changes needed
```

### Pattern 1: Fixed Header in BaseLayout
**What:** Header component with `position: fixed; top: 0` lives in BaseLayout so it appears on every page automatically.
**When to use:** All pages — user never has to add the header themselves.
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    {description && <meta name="description" content={description} />}
    <title>{title}</title>
    <Font cssVariable="--font-jetbrains-mono" preload />
    <Font cssVariable="--font-ibm-plex-sans" preload />
  </head>
  <body class="min-h-screen bg-white text-black pt-16">
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```
**Source:** https://docs.astro.build/en/basics/layouts/

### Pattern 2: Active Navigation Link via Astro.url.pathname
**What:** Read `Astro.url.pathname` in the header component frontmatter; set `aria-current="page"` on matching link; style `[aria-current="page"]` in CSS.
**When to use:** Any navigation component that needs to visually highlight the current page.
**Example:**
```astro
---
// src/components/layout/Header.astro
const { pathname } = Astro.url;
---
<header class="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
  <nav class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="font-display font-bold text-lg text-black">Jake Reddy</a>
    <div class="flex gap-8">
      <a
        href="/"
        aria-current={pathname === '/' ? 'page' : undefined}
        class="font-body text-black hover:text-gray-600 transition-colors"
      >Home</a>
      <a
        href="/about"
        aria-current={pathname === '/about' || pathname === '/about/' ? 'page' : undefined}
        class="font-body text-black hover:text-gray-600 transition-colors"
      >About</a>
    </div>
  </nav>
</header>
```
**Source:** https://www.stph.io/posts/active-class-astro/ (verified against Astro.url documentation)

### Pattern 3: Footer with Contact Links
**What:** A footer component with external links (GitHub, LinkedIn, email) using Nordic design tokens.
**When to use:** All pages via BaseLayout.
**Example:**
```astro
---
// src/components/layout/Footer.astro
---
<footer class="border-t-2 border-black mt-auto py-8 px-4">
  <div class="max-w-4xl mx-auto flex gap-8 font-body text-gray-700">
    <a href="https://github.com/jake-reddy" class="hover:text-black transition-colors">GitHub</a>
    <a href="https://linkedin.com/in/jake-reddy" class="hover:text-black transition-colors">LinkedIn</a>
    <a href="mailto:jake@jake-reddy.com" class="hover:text-black transition-colors">Email</a>
  </div>
</footer>
```

### Pattern 4: CSS Active State Styling for aria-current
**What:** Style active nav links using the `aria-current` attribute selector, not a `.active` class.
**When to use:** Always alongside Pattern 2; provides both visual and screen reader feedback.
**Example:**
```css
/* In global.css or scoped in Header.astro <style> block */
nav a[aria-current="page"] {
  font-weight: 700;
  border-bottom: 2px solid currentColor;
}
```

### Anti-Patterns to Avoid
- **Putting nav markup in each page:** Creates duplication; the header must live in BaseLayout only.
- **Using `window.location.pathname` for active state:** Only works client-side, breaks SSG. Use `Astro.url.pathname` in frontmatter.
- **Forgetting `padding-top` on body:** Fixed header sits on top of content, hiding the first ~64px. Add `pt-16` (128px with 8px grid) or equivalent to body.
- **Setting `position: sticky` instead of `position: fixed`:** Sticky moves with scroll when the parent container ends. Fixed stays at viewport top always. NAV-01 requires fixed.
- **Hardcoding contact link URLs in multiple files:** Put contact links in Footer.astro only; future updates touch one file.
- **Missing `z-index`:** Without z-index, page content with stacking context can render over the header.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Active link detection | JavaScript event listeners or localStorage tracking | `Astro.url.pathname` in frontmatter | Built-in Astro global, SSG-safe, zero runtime JS |
| Layout wrapping | Manual header/footer duplication in each page | Single BaseLayout with `<slot />` | Astro's core layout pattern — one update propagates everywhere |
| Font-family for nav text | Inline styles or local class | `font-display` / `font-body` Tailwind utilities | Phase 3 tokens already wired; use them |
| CSS z-index management | Separate z-index utility file | Tailwind `z-50` | Tailwind already provides z-index scale |

**Key insight:** Phase 4 is almost entirely component composition. The design system, fonts, Tailwind setup, and page shell already exist from Phase 3. The work is creating Header.astro, Footer.astro, updating BaseLayout.astro, and creating the stub About page.

## Common Pitfalls

### Pitfall 1: Fixed Header Overlaps Page Content
**What goes wrong:** The first ~64px of page content is hidden underneath the fixed header.
**Why it happens:** `position: fixed` removes the element from document flow; the body starts at y=0 behind the header.
**How to avoid:** Add `padding-top` to `<body>` equal to the header's height. With the 8px grid, a 64px header (8 spacing units) needs `pt-8` (64px) on body. Use a consistent header height and match the body offset exactly.
**Warning signs:** The page title or first content element is partially cut off at the top.

### Pitfall 2: Trailing Slash in Pathname Breaks Active State
**What goes wrong:** `/about/` never equals `/about`, so the About link never shows as active.
**Why it happens:** Astro's static output may append trailing slashes depending on `build.format` config; some servers also normalize URLs this way.
**How to avoid:** Compare `pathname === '/about' || pathname === '/about/'` or strip the trailing slash: `pathname.replace(/\/$/, '')`.
**Warning signs:** Active nav link styling works locally but breaks on deployed site, or vice versa.

### Pitfall 3: Home Page Active State Edge Case
**What goes wrong:** Both Home and About links show as active on the home page, or neither does.
**Why it happens:** `pathname.startsWith('/')` matches every path. Home must use exact match `pathname === '/'`.
**How to avoid:** Use exact equality for `/` (home), use startsWith or exact match for `/about`.
**Warning signs:** Both nav items are bold simultaneously.

### Pitfall 4: Missing z-index on Fixed Header
**What goes wrong:** Page content or images scroll over the header.
**Why it happens:** Content elements with `position: relative` and stacking contexts can render above a fixed header that lacks explicit z-index.
**How to avoid:** Always set `z-index: 50` (Tailwind `z-50`) or higher on the fixed header.
**Warning signs:** Scrolling content bleeds through the header background.

### Pitfall 5: About Page Not Created
**What goes wrong:** The `/about` link in the nav leads to a 404.
**Why it happens:** Phase 4 must create `src/pages/about.astro` even if content is a placeholder — Phase 5 will fill it.
**How to avoid:** Create `src/pages/about.astro` using BaseLayout with minimal placeholder content in this phase.
**Warning signs:** Clicking the About nav link returns a 404 in dev or build.

### Pitfall 6: aria-current value must be a string or undefined (not false)
**What goes wrong:** Astro/browser may render `aria-current="false"` as an attribute, which is technically invalid (undefined should suppress the attribute entirely).
**Why it happens:** Setting `aria-current={false}` or `aria-current={condition ? 'page' : false}` may write the attribute to the DOM.
**How to avoid:** Use `aria-current={condition ? 'page' : undefined}` — `undefined` causes Astro to omit the attribute entirely.
**Warning signs:** HTML output contains `aria-current="false"` on non-active links.

## Code Examples

Verified patterns from official sources and confirmed against Astro 6 behavior:

### Header with Fixed Positioning and Active Links
```astro
---
// src/components/layout/Header.astro
const { pathname } = Astro.url;
const isHome = pathname === '/' || pathname === '';
const isAbout = pathname === '/about' || pathname === '/about/';
---
<header class="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b-2 border-black">
  <nav class="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
    <!-- Site identity -->
    <a href="/" class="font-display font-bold text-xl text-black hover:text-gray-700 transition-colors">
      Jake Reddy
    </a>

    <!-- Navigation links -->
    <div class="flex gap-8">
      <a
        href="/"
        aria-current={isHome ? 'page' : undefined}
        class="font-body text-sm font-medium text-black hover:text-gray-600 transition-colors nav-link"
      >Home</a>
      <a
        href="/about"
        aria-current={isAbout ? 'page' : undefined}
        class="font-body text-sm font-medium text-black hover:text-gray-600 transition-colors nav-link"
      >About</a>
    </div>
  </nav>
</header>

<style>
  .nav-link[aria-current="page"] {
    font-weight: 700;
    border-bottom: 2px solid currentColor;
  }
</style>
```

### Footer with External Contact Links
```astro
---
// src/components/layout/Footer.astro
---
<footer class="border-t-2 border-black py-8 px-4">
  <div class="max-w-4xl mx-auto flex items-center gap-8">
    <a
      href="https://github.com/jareddy"
      target="_blank"
      rel="noopener noreferrer"
      class="font-body text-sm text-gray-700 hover:text-black transition-colors"
    >GitHub</a>
    <a
      href="https://linkedin.com/in/jareddy"
      target="_blank"
      rel="noopener noreferrer"
      class="font-body text-sm text-gray-700 hover:text-black transition-colors"
    >LinkedIn</a>
    <a
      href="mailto:jake@jake-reddy.com"
      class="font-body text-sm text-gray-700 hover:text-black transition-colors"
    >Email</a>
  </div>
</footer>
```

### Updated BaseLayout with Header and Footer
```astro
---
// src/layouts/BaseLayout.astro (updated)
import { Font } from 'astro:assets';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    {description && <meta name="description" content={description} />}
    <title>{title}</title>
    <Font cssVariable="--font-jetbrains-mono" preload />
    <Font cssVariable="--font-ibm-plex-sans" preload />
  </head>
  <body class="min-h-screen bg-white text-black flex flex-col pt-16">
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```
**Note on `pt-16`:** With the custom 8px spacing grid, `pt-16` = 128px. If the header is 64px tall (`h-16` = 64px with default Tailwind — but recall this project's `--spacing-*` overrides apply to spacing utilities), check the actual rendered height and match `pt-` accordingly. Header height of 64px with override-aware `h-8` (64px = 8 × 8px) means body needs `pt-8`.

**Source:** https://docs.astro.build/en/basics/layouts/

### Stub About Page
```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About | Jake Reddy" description="About Jake Reddy, full-stack developer">
  <main class="flex-1 max-w-4xl mx-auto px-4 py-8">
    <h1 class="font-display text-4xl font-bold mb-4">About</h1>
    <p class="font-body text-gray-700">Content coming in Phase 5.</p>
  </main>
</BaseLayout>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `new URL(Astro.request.url).pathname` | `Astro.url.pathname` | Astro 3.0 (2023) | Shorter syntax, same behavior |
| `.active` CSS class on nav link | `aria-current="page"` attribute | Best practice shift ~2022 | Accessibility + styling in one attribute |
| Separate header/footer in every page | Layout component with `<slot />` | Astro 1.0 (2022) | Central source of truth for layout |
| `position: sticky` hacks | `position: fixed` + `padding-top` body | CSS baseline | Sticky unreliable in nested containers; fixed is explicit |

**Deprecated/outdated:**
- **`new URL(Astro.request.url).pathname`:** Still works but verbose; `Astro.url.pathname` preferred.
- **`.active` CSS class without aria:** Works visually but misses screen reader semantics; use `aria-current`.

## Open Questions

1. **Header height in px (8px grid)**
   - What we know: The 8px spacing override in `theme.css` redefines Tailwind spacing-N as N×8px. So `h-8` = 64px (not the default 32px). But Tailwind's `h-*` uses the same `--spacing-*` variables.
   - What's unclear: Whether `h-16` = 128px or 64px in this project's custom scale — verify by checking what spacing tokens are defined (spacing-16 = 128px is defined; h-16 would be 128px).
   - Recommendation: Use `h-16` (128px) for the header height if generous, or `h-8` (64px) for compact. Then set `pt-16` or `pt-8` on the body to match. Verify visually in dev server before finalizing.

2. **Exact contact link URLs**
   - What we know: Footer needs GitHub, LinkedIn, and email links (from success criteria and CONT-05).
   - What's unclear: The actual URLs (GitHub handle, LinkedIn profile, email address).
   - Recommendation: Use placeholder strings in Footer.astro with `TODO:` comments. Phase 5 content pass will supply real URLs.

3. **Body flex layout for sticky footer**
   - What we know: Footer should appear at bottom of page even on short pages.
   - What's unclear: Whether content pages will be tall enough to avoid this issue in v1.
   - Recommendation: Set `body` to `flex flex-col min-h-screen` and `<main>` to `flex-1`. This ensures footer sticks to bottom without JS.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.1.9 (already installed and configured) |
| Config file | vitest.config.ts (exists at project root) |
| Quick run command | `npm test -- --run` |
| Full suite command | `npm test -- --run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Header appears on all pages with fixed positioning | smoke/manual | `npm run build && npm run preview` (visual verify) | ❌ manual-only |
| NAV-02 | Home and About links render in nav, active state correct | unit | `npm test -- src/test/navigation/ --run -x` | ❌ Wave 0 |

**Note on NAV-01:** Fixed positioning (`position: fixed`) is a CSS visual property that Vitest (node environment, no DOM) cannot verify. A build + visual check is the appropriate gate. NAV-02's active state logic (pathname comparison) can be unit-tested by asserting the conditional expression outputs.

### Sampling Rate
- **Per task commit:** `npm run build` (verify no TypeScript or build errors)
- **Per wave merge:** `npm test -- --run` (full Vitest suite)
- **Phase gate:** Full suite green + manual visual check of nav in browser before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/test/navigation/active-link.test.ts` — unit test for pathname-to-active-state logic (NAV-02)

*(NAV-01 fixed positioning: manual-only — no DOM/browser environment in current Vitest config. Could add with `@astrojs/test-utils` and a browser environment, but overkill for this phase.)*

## Sources

### Primary (HIGH confidence)
- Astro Layouts official docs — https://docs.astro.build/en/basics/layouts/
- Astro Fonts API (Pattern 3 from Phase 3 research, verified) — https://docs.astro.build/en/guides/fonts/

### Secondary (MEDIUM confidence)
- Active nav link pattern with `Astro.url.pathname` — https://www.stph.io/posts/active-class-astro/ (verified against Astro.url docs)
- aria-current="page" pattern — https://docs.astro.build/en/tutorial/3-components/3/ (Astro tutorial, official)
- CSS fixed header + body padding pattern — https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/ (widely cited, verified)

### Tertiary (LOW confidence)
- None — all findings backed by official docs or official Astro tutorial

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; existing Astro 6 + Tailwind 4 from Phase 3
- Architecture: HIGH — Official Astro layout pattern; component composition is core Astro feature
- Active link pattern: HIGH — `Astro.url.pathname` is official Astro API, documented in official tutorial
- Fixed header CSS: HIGH — `position: fixed` + body `padding-top` is CSS baseline, not framework-specific
- Pitfalls: HIGH — Trailing slash and aria-current pitfalls documented in Astro GitHub issues

**Research date:** 2026-03-15
**Valid until:** 2026-06-15 (90 days — stable Astro 6 API, no fast-moving changes expected)
