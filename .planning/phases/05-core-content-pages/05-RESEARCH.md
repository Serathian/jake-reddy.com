# Phase 5: Core Content Pages - Research

**Researched:** 2026-03-15
**Domain:** Astro page authoring, responsive layout, Tailwind CSS 4, Vitest unit testing
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Home page displays professional introduction (name, role, tagline) | Hero section pattern in MASTER.md; existing index.astro stub ready to replace |
| CONT-02 | Home page includes brief professional highlights | Highlights/feature list pattern; pure HTML + Tailwind grid in existing system |
| CONT-03 | About page displays background and professional philosophy | MASTER.md About/Philosophy section pattern; existing about.astro stub ready to replace |
| CONT-04 | About page includes Nordic lifestyle context | Content-only addition to CONT-03; no new tech needed |
| CONT-05 | Contact information visible (email, GitHub, LinkedIn links) | Already in Footer.astro with TODO placeholders for URL verification |
| NAV-03 | Responsive layout works on mobile (375px+) | Mobile-first Tailwind responsive pattern from MASTER.md; breakpoint strategy documented below |
| NAV-04 | Responsive layout works on tablet (768px+) | Tailwind `md:` prefix at 768px; design system breakpoint defined |
| NAV-05 | Responsive layout works on desktop (1024px+) | Tailwind `lg:` prefix at 1024px; max-width 1200px already on header/footer |
| TEST-02 | Test coverage for critical components | Vitest node environment already configured; mirror-logic pattern already established |
</phase_requirements>

---

## Summary

Phase 5 is a **pure content and layout authoring phase** within an already-complete technical stack. All infrastructure is in place: Astro 6 with static output, Tailwind CSS 4 with the full Nordic design token system, BaseLayout with Header and Footer, and Vitest for unit tests. The only work is replacing placeholder stubs with real content structured per the design system.

The design system (MASTER.md) specifies the exact visual hierarchy for both pages. The Home page follows a Hero → Highlights pattern. The About page follows a Background → Philosophy → Context structure. Both use BaseLayout, font-display/font-body Tailwind utilities, the 8px spacing grid, and the monochrome palette — all already operational.

Responsive design is Tailwind's mobile-first breakpoint system (`md:` at 768px, `lg:` at 1024px), matching the design system's documented breakpoints exactly. The existing Header and Footer already use `max-w-[1200px]` at desktop — content pages must match this constraint. TEST-02 requires critical component tests; the established pattern is to write pure functions that mirror component logic and test them with Vitest in the node environment.

**Primary recommendation:** Replace stubs, author content in Astro + Tailwind per design system, use `sm:` / `md:` / `lg:` responsive prefixes mobile-first, and write testable pure-function helpers (not Astro component imports) for any logic that needs coverage.

---

## Standard Stack

### Core (already installed — no new installation required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.x | Page authoring (`src/pages/*.astro`) | Project foundation, static output |
| Tailwind CSS | 4.2.1 | Utility-class styling with Nordic design tokens | Phase 3 installed, @theme configured |
| BaseLayout.astro | — | Wraps every page with Header + Footer | Phase 4 established contract |
| Vitest | latest | Unit tests for pure logic functions | Phase 1 configured, `npm test` works |

### No New Dependencies

Phase 5 requires **no new npm packages**. All libraries, fonts, and design tokens were installed in Phases 1-4. The work is authoring `.astro` files using existing utilities.

---

## Architecture Patterns

### Established Project Structure (already exists)

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro       # Fixed nav, active-link detection
│   │   └── Footer.astro       # Contact links (GitHub, LinkedIn, email)
│   └── ui/
│       └── Button.astro       # Primary/secondary button variants
├── layouts/
│   └── BaseLayout.astro       # title + description props; renders Header + Footer
├── pages/
│   ├── index.astro            # STUB — replace with real Home content
│   └── about.astro            # STUB — replace with real About content
├── styles/
│   ├── theme.css              # @theme with design tokens (spacing, color, radius)
│   └── global.css             # Tailwind import + body/heading font defaults
└── test/
    ├── example.test.ts
    └── navigation/
        └── active-link.test.ts
```

### Pattern 1: BaseLayout Page Authoring

**What:** Every page wraps content in BaseLayout with `title` and `description` props. The layout provides `<html>`, `<head>`, fonts, Header, Footer, and a `<slot />`.

**When to use:** Every page — mandatory.

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Jake Reddy | Full-Stack Developer"
  description="Nordic minimalist portfolio — 5 years full-stack experience"
>
  <main class="flex-1 max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-12 lg:px-12 lg:py-16">
    <!-- page content -->
  </main>
</BaseLayout>
```

**Critical constraint:** The BaseLayout body has `pt-[72px]` (accounts for the 72px fixed header height). Pages must NOT add their own top padding to the body — the layout handles it.

### Pattern 2: Mobile-First Responsive Layout

**What:** Tailwind responsive prefixes are used mobile-first. Base styles target 375px+. `md:` overrides at 768px. `lg:` overrides at 1024px.

**When to use:** All layout rules (padding, grid columns, font sizes, flex direction).

```astro
<!-- Mobile: single column, tight padding -->
<!-- Tablet: wider padding -->
<!-- Desktop: full grid, generous padding -->
<section class="px-4 py-6 md:px-8 md:py-12 lg:px-12 lg:py-16">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <!-- content -->
  </div>
</section>
```

**Design system breakpoints (from MASTER.md):**
- Mobile: 375px–767px → 4 columns
- Tablet: 768px–1023px → 8 columns
- Desktop: 1024px+ → 12 columns, max-width 1200px

### Pattern 3: Design Token Typography

**What:** Use `font-display` (JetBrains Mono) for headings and `font-body` (IBM Plex Sans) for body. Use text size utilities that map to the 1.25 type scale. Both font utilities are already defined in theme.css via Astro Fonts API CSS variables.

**When to use:** All text elements.

```astro
<!-- Heading: JetBrains Mono, 3xl on mobile → 5xl on desktop -->
<h1 class="font-display text-4xl font-bold md:text-5xl lg:text-6xl">Jake Reddy</h1>

<!-- Body text: IBM Plex Sans, muted secondary color -->
<p class="font-body text-base text-gray-700 leading-relaxed">...</p>

<!-- Small label: uppercase + tracking -->
<span class="font-body text-sm text-gray-600 uppercase tracking-[1px]">Full-Stack Developer</span>
```

### Pattern 4: Vitest Unit Tests (mirror-logic pattern)

**What:** Since Vitest cannot import `.astro` component files (runs in Node environment), testable logic is written as a pure function inline in the component frontmatter AND mirrored verbatim in the test file as a standalone function.

**When to use:** Any component logic that has conditional behavior worth testing.

**Established precedent (from Phase 4):**
```typescript
// src/test/navigation/active-link.test.ts
// getNavState() is mirrored verbatim — NOT imported from Header.astro
function getNavState(pathname: string) {
  // mirrors Header.astro frontmatter logic
}
```

**For Phase 5:** If highlight items or content sections have any conditional rendering or data-transformation logic, extract to pure functions and test them this way. If content is purely static HTML, no tests are needed for the page itself — but TEST-02 requires *some* coverage for "critical components."

### Pattern 5: 8px Spacing Grid

**What:** The spacing scale in theme.css overrides Tailwind defaults. `spacing-1 = 8px`, `spacing-2 = 16px`, `spacing-4 = 32px`, `spacing-6 = 48px`. Use Tailwind spacing classes — they already output the correct values.

**Key token reference:**
| Tailwind Class | Actual Value | Use |
|---------------|-------------|-----|
| `p-3` / `gap-3` | 24px | Standard padding |
| `p-4` / `gap-4` | 32px | Medium gaps |
| `p-6` | 48px | Section spacing |
| `p-8` | 64px | Major sections |
| `p-10` | 80px | Hero spacing |

**Warning:** Do not use ad-hoc pixel values like `p-[20px]` — use grid-aligned classes only.

### Anti-Patterns to Avoid

- **No `pt-[72px]` on page-level main:** BaseLayout already handles header offset with `pt-[72px]` on `<body>`. Adding more top padding to `<main>` creates excess whitespace.
- **No centered body text:** Body text must be left-aligned. The only centered text allowed is hero headings on narrow viewports.
- **No rounded corners:** All `border-radius` in the theme is set to 0px — don't add `rounded-*` classes.
- **No gradients:** Solid colors only. Background must be white (`bg-white`) or surface (`bg-gray-100`).
- **No emojis as icons:** Use plain text markers or inline SVG if icons are needed.
- **No importing .astro files in Vitest:** Vitest runs in Node environment and cannot process Astro files. Use the mirror-logic pattern.
- **No `aria-current="false"`:** Use `undefined` for inactive links (Astro suppresses the attribute). This is already implemented in Header.astro.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Custom CSS @font-face declarations | `Font` component from `astro:assets` (already in BaseLayout) | Astro Fonts API handles preloading, font-display, subsetting |
| Header/Footer | New layout components | Import existing `Header.astro` + `Footer.astro` via `BaseLayout.astro` | Already complete; re-use prevents divergence |
| Responsive grid | Custom CSS media queries | Tailwind `sm:`, `md:`, `lg:` prefix utilities | Design tokens already correct; avoid specificity conflicts |
| Design tokens | Inline CSS variables | Tailwind utilities (`font-display`, `font-body`, `text-gray-700`, etc.) | theme.css maps all tokens to Tailwind utilities |
| Contact links | New footer component | The existing Footer.astro already has GitHub, LinkedIn, email links | Footer is complete (minus URL verification) |

---

## Common Pitfalls

### Pitfall 1: Spacing Values Don't Match Expectations

**What goes wrong:** Developers use `p-4` expecting 16px (default Tailwind) but get 32px (8px grid override).
**Why it happens:** theme.css overrides the entire Tailwind spacing scale to 8px × N.
**How to avoid:** Always think in 8px units. `p-2` = 16px, `p-3` = 24px, `p-4` = 32px. Use the table in Pattern 5 above.
**Warning signs:** Spacing looks disproportionately large; check theme.css for the override.

### Pitfall 2: Content Hidden Under Fixed Header

**What goes wrong:** Page content starts at the top of the viewport and is hidden behind the 72px fixed header.
**Why it happens:** Forgetting that BaseLayout already adds `pt-[72px]` to `<body>`. Adding it to `<main>` instead of trusting the layout.
**How to avoid:** Never add `pt-[72px]` or equivalent to `<main>`. Use BaseLayout — it handles the offset. If adding `<main>` padding, start from `py-6` for vertical content spacing.
**Warning signs:** First heading visually overlaps with the nav links.

### Pitfall 3: Breaking Max-Width Consistency

**What goes wrong:** Page content extends wider than the header/footer (`max-w-[1200px]`), creating misaligned edges at desktop.
**Why it happens:** Using `max-w-full` or no max-width on the page `<main>`.
**How to avoid:** Use `max-w-[1200px] mx-auto` on the `<main>` container to match Header and Footer width constraints.
**Warning signs:** Content bleeds to the browser edge while nav stops at 1200px.

### Pitfall 4: Testing Astro Components Directly in Vitest

**What goes wrong:** Tests fail with import errors or SSR initialization errors when trying to import `.astro` files.
**Why it happens:** Vitest uses Node environment; Astro components use a compile-time framework not available in raw Node.
**How to avoid:** Use the mirror-logic pattern — define the testable pure function in both the component frontmatter AND the test file as a standalone declaration. Do not import from `.astro` files.
**Warning signs:** `Error: Cannot find module` or `SSR initialization` errors in test output.

### Pitfall 5: Skipping Responsive Verification at 375px

**What goes wrong:** Layout looks fine on desktop but breaks on mobile — horizontal scroll appears, or text overflows containers.
**Why it happens:** Testing only at desktop width during development. Long words or wide containers cause overflow at 375px.
**How to avoid:** Build mobile-first. Start with base Tailwind classes for mobile. Add `md:` and `lg:` prefixes for wider screens. Test visually at 375px before any other width.
**Warning signs:** `overflow-x: auto` appears on body; content is cut off on mobile.

### Pitfall 6: Footer Contact Links Have TODO Placeholders

**What goes wrong:** Footer renders with placeholder `github.com/jareddy` and `linkedin.com/in/jareddy` URLs that may be incorrect.
**Why it happens:** Phase 4 created the Footer with TODOs explicitly noting URL verification is needed.
**How to avoid:** Phase 5 must verify and update the GitHub handle, LinkedIn profile URL, and email address in `src/components/layout/Footer.astro` as part of CONT-05.
**Warning signs:** Look for `<!-- TODO: verify ... -->` comments in Footer.astro (lines 6, 10, 18).

---

## Code Examples

Verified patterns from existing codebase:

### Home Page Hero Structure

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Jake Reddy | Full-Stack Developer"
  description="5 years of full-stack experience. Nordic minimalist portfolio."
>
  <!-- Hero: full-width, centered on mobile, left-aligned on desktop -->
  <section class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-12 lg:px-12 lg:py-16">
    <p class="font-body text-sm text-gray-600 uppercase tracking-[1px] mb-2">Full-Stack Developer</p>
    <h1 class="font-display text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">Jake Reddy</h1>
    <p class="font-body text-lg text-gray-700 max-w-xl leading-relaxed">
      [Tagline — 1 sentence value proposition]
    </p>
  </section>

  <!-- Highlights: list of 3-5 brief professional highlights -->
  <section class="border-t border-gray-200 max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-10 lg:px-12">
    <h2 class="font-display text-2xl font-semibold mb-6">Highlights</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- highlight items -->
    </ul>
  </section>
</BaseLayout>
```

### About Page Structure

```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About | Jake Reddy" description="About Jake Reddy, full-stack developer">
  <main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-12 lg:px-12 lg:py-16">
    <h1 class="font-display text-4xl font-bold mb-6 md:text-5xl">About</h1>

    <section class="mb-8 md:mb-12">
      <h2 class="font-display text-2xl font-semibold mb-4">Background</h2>
      <p class="font-body text-base text-gray-700 leading-relaxed max-w-prose">...</p>
    </section>

    <section class="border-t border-gray-200 pt-8 mb-8 md:mb-12">
      <h2 class="font-display text-2xl font-semibold mb-4">Philosophy</h2>
      <p class="font-body text-base text-gray-700 leading-relaxed max-w-prose">...</p>
    </section>

    <section class="border-t border-gray-200 pt-8">
      <h2 class="font-display text-2xl font-semibold mb-4">Nordic Life</h2>
      <p class="font-body text-base text-gray-700 leading-relaxed max-w-prose">...</p>
    </section>
  </main>
</BaseLayout>
```

### TEST-02: Writing a Testable Pure Function for Content

```typescript
// src/test/content/highlights.test.ts
import { describe, it, expect } from 'vitest';

// Mirror the function from the component (do NOT import .astro files)
function formatHighlights(highlights: { title: string; description: string }[]) {
  return highlights.filter(h => h.title.trim().length > 0);
}

describe('formatHighlights', () => {
  it('filters out highlights with empty titles', () => {
    const input = [
      { title: 'Backend', description: 'Node.js' },
      { title: '', description: 'empty' },
    ];
    expect(formatHighlights(input)).toHaveLength(1);
  });
});
```

**Note:** If highlight data is purely static HTML (no filtering/transformation logic), a simpler test strategy is to test a helper that maps requirement data to display strings. The key constraint from Phase 4 is: **never import `.astro` files in Vitest**.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` directive in CSS | Tailwind 4 (2024) | No JS config file; tokens co-locate with styles |
| `@astrojs/tailwind` | `@tailwindcss/vite` | Tailwind 4 + Astro 6 | Official integration, faster builds |
| Google Fonts `<link>` | Astro `Font` component (`astro:assets`) | Astro 5+ | Built-in font preloading, `font-display`, subsetting |
| `getViteConfig` from Astro | Plain `defineConfig` from Vitest | Phase 1 decision | Avoids SSR initialization errors in unit tests |

---

## Open Questions

1. **Footer contact URL accuracy**
   - What we know: Footer.astro has `github.com/jareddy`, `linkedin.com/in/jareddy`, `jake@jake-reddy.com` with TODO comments
   - What's unclear: Whether these are Jake's actual handles/email (marked as TODO in Phase 4)
   - Recommendation: Planner should include a task that requires Jake to confirm/update these values before considering CONT-05 complete

2. **Home page highlights content**
   - What we know: CONT-02 requires 3-5 professional highlights; no content has been defined
   - What's unclear: The actual highlight topics (e.g., "Backend expertise", "5 years experience", "Oslo-based")
   - Recommendation: Planner should treat content creation as a task; suggest placeholder content in code that Jake reviews

3. **TEST-02 scope definition**
   - What we know: "Critical components have test coverage" — the established pattern is pure-function mirror tests
   - What's unclear: Which components count as "critical" — the planner needs to decide (Header already has 6 tests; new page logic may be minimal)
   - Recommendation: Write at least one test for any conditional rendering logic added in Phase 5; if content is purely static, document that explicitly as the rationale for minimal new tests

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest (configured via `vitest.config.ts`) |
| Config file | `vitest.config.ts` — `environment: 'node'`, `globals: true` |
| Quick run command | `npm test -- --run` |
| Full suite command | `npm test -- --run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Home page renders name, role, tagline | manual-only | Visual check in browser at localhost:4321 | N/A |
| CONT-02 | Highlights list renders 3-5 items | unit (if data function) | `npm test -- --run` | ❌ Wave 0 (if logic exists) |
| CONT-03 | About page renders background + philosophy | manual-only | Visual check in browser at localhost:4321/about | N/A |
| CONT-04 | Nordic lifestyle context appears on About | manual-only | Visual check in browser | N/A |
| CONT-05 | Footer contact links are clickable with correct hrefs | unit | `npm test -- --run` | ❌ Wave 0 |
| NAV-03 | Layout renders without horizontal overflow at 375px | manual-only | DevTools viewport resize | N/A |
| NAV-04 | Layout renders correctly at 768px | manual-only | DevTools viewport resize | N/A |
| NAV-05 | Layout renders correctly at 1024px+ | manual-only | DevTools viewport resize | N/A |
| TEST-02 | Critical components have test coverage | unit | `npm test -- --run` | ❌ Wave 0 |

**Note on manual-only tests:** Astro static pages cannot be unit-tested via Vitest (Astro files are not importable in Node). Browser-based visual verification is the established pattern for page-level requirements (see Phase 4 Plan 02 which used a human checkpoint for fixed-position CSS verification).

### Sampling Rate

- **Per task commit:** `npm test -- --run`
- **Per wave merge:** `npm test -- --run`
- **Phase gate:** Full suite green + manual browser verification at 375px/768px/1024px before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/test/content/highlights.test.ts` — covers TEST-02 (highlights logic, if any conditional rendering)
- [ ] `src/test/content/footer-links.test.ts` — covers CONT-05 (footer href format validation, pure function)

*(If highlight and footer content is purely static with no logic, create a single smoke test that validates the data structures used — e.g., a `getContactLinks()` pure function that returns the link objects, tested for shape and non-empty values.)*

---

## Sources

### Primary (HIGH confidence)

- Existing codebase inspection — `src/styles/theme.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, `src/components/ui/Button.astro`
- Design system: `design-system/nordic-developer-portfolio/MASTER.md` — complete visual specification
- Phase summaries: `.planning/phases/03-design-system-implementation/03-01-SUMMARY.md`, `.planning/phases/04-layout-and-navigation/*.md` — established patterns and decisions
- Project state: `.planning/STATE.md` — key decisions 1-24, critical constraints, session continuity
- Requirements: `.planning/REQUIREMENTS.md` — v1 requirement definitions and phase traceability
- Vitest config: `vitest.config.ts` — `environment: 'node'`, `globals: true`
- Astro config: `astro.config.mjs` — static output, Google Fonts integration, Tailwind Vite plugin

### Secondary (MEDIUM confidence)

- Design system pages directory listing — confirmed no `index.md` or `about.md` page-specific overrides exist; MASTER.md governs all pages

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — fully inspected existing codebase; all dependencies identified
- Architecture: HIGH — established patterns from Phases 3 and 4 are directly applicable; no new patterns needed
- Pitfalls: HIGH — derived from existing code (Footer TODOs, spacing override, header offset, Vitest constraint)
- Content decisions: MEDIUM — content copy (tagline, highlights text, Nordic context) is user-owned and not yet defined

**Research date:** 2026-03-15
**Valid until:** 2026-04-15 (stable stack — Astro 6, Tailwind 4, no fast-moving dependencies in scope)
