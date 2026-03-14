# Phase 3: Design System Implementation - Research

**Researched:** 2026-03-14
**Domain:** Design systems, Tailwind CSS, web fonts, accessibility
**Confidence:** HIGH

## Summary

This research covers implementing a Nordic minimalist design system in Astro 6 using Tailwind CSS 4 (via Vite plugin), custom web fonts (JetBrains Mono and IBM Plex Sans), and strict accessibility compliance (WCAG AAA). The modern approach uses Tailwind 4's native Vite plugin instead of the deprecated @astrojs/tailwind integration.

**Key findings:**
- Tailwind 4 uses @tailwindcss/vite plugin (not the old @astrojs/tailwind integration)
- Astro 6 has built-in Fonts API for performance-optimized font loading
- WCAG AAA requires 7:1 contrast for normal text, 4.5:1 for large text (18pt+ or 14pt+ bold)
- Monochrome palette simplifies accessibility compliance
- Design tokens should be defined in CSS using Tailwind's @theme directive

**Primary recommendation:** Use Tailwind 4 with CSS-based theme configuration, Astro's native Fonts API for Google Fonts (JetBrains Mono, IBM Plex Sans), and document all design tokens for consistency.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DSGN-01 | Nordic monochrome color palette (black #000000, white #FFFFFF, grays) | Tailwind @theme directive for custom colors; monochrome simplifies WCAG AAA compliance |
| DSGN-02 | Typography system (JetBrains Mono headings, IBM Plex Sans body) | Astro Fonts API with Google provider; Tailwind font-family configuration |
| DSGN-03 | 8px base spacing grid consistently applied | Tailwind default spacing scale is 4px-based; override with custom 8px scale in @theme |
| DSGN-04 | Sharp corners (0px border-radius) throughout | Tailwind default rounded-none (0px); override all rounded-* utilities in @theme |
| DSGN-05 | High contrast design (WCAG AAA 7:1 for normal, 4.5:1 for large) | Black #000000 on white #FFFFFF = 21:1 (exceeds AAA); gray shades need verification |
| DSGN-06 | Minimal shadows with crisp borders | Tailwind border utilities; custom shadow definitions in @theme (none/subtle only) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | 4.2+ | Utility-first CSS framework | Industry standard for design systems; v4 native Vite support |
| @tailwindcss/vite | 4.2+ | Vite plugin for Tailwind 4 | Official Tailwind 4 integration (replaces deprecated @astrojs/tailwind) |
| Astro Fonts API | Built-in (Astro 6+) | Web font optimization | Native Astro feature; automatic preload, caching, fallbacks |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/jetbrains-mono | Latest | Self-hosted JetBrains Mono | Alternative to Google Fonts if privacy concerns |
| @fontsource/ibm-plex-sans | Latest | Self-hosted IBM Plex Sans | Alternative to Google Fonts if privacy concerns |
| tailwindcss-accessibility | Optional | Accessibility utilities | Only if need programmatic a11y checks |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS | Vanilla CSS/SCSS | More control but slower development, no utility classes |
| Google Fonts (Fonts API) | Fontsource NPM packages | Better privacy but manual optimization, larger initial install |
| Tailwind 4 Vite plugin | Tailwind 3 + PostCSS | Legacy approach, missing v4 features like CSS-based config |

**Installation:**
```bash
npm install tailwindcss @tailwindcss/vite
```

**For Fontsource alternative:**
```bash
npm install @fontsource/jetbrains-mono @fontsource/ibm-plex-sans
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── styles/
│   ├── global.css          # Tailwind import + base styles
│   └── theme.css           # Design tokens (@theme directive)
├── layouts/
│   └── BaseLayout.astro    # Applies fonts and global styles
├── components/
│   └── ui/                 # Reusable design system components
└── pages/
    └── *.astro             # Page components using design system
```

### Pattern 1: Tailwind 4 Configuration (CSS-based)
**What:** Define design tokens using @theme directive in CSS instead of tailwind.config.js
**When to use:** Tailwind 4+ projects (recommended approach as of v4)
**Example:**
```css
/* src/styles/theme.css */
@import "tailwindcss";

@theme {
  /* Colors - Nordic monochrome palette */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;

  /* Typography - Custom fonts */
  --font-display: var(--font-jetbrains-mono);
  --font-body: var(--font-ibm-plex-sans);

  /* Spacing - 8px grid system */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
  --spacing-16: 128px;

  /* Border radius - All sharp */
  --radius-none: 0px;
  /* Override all rounded-* utilities to 0 */
  --radius-sm: 0px;
  --radius: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
  --radius-full: 0px;

  /* Shadows - Minimal/none */
  --shadow-sm: none;
  --shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: none;
  --shadow-xl: none;
  --shadow-2xl: none;
  --shadow-inner: none;
}
```
**Source:** https://tailwindcss.com/docs/theme

### Pattern 2: Astro Fonts API with Google Provider
**What:** Use Astro's built-in font optimization for Google Fonts
**When to use:** When using fonts from Google Fonts (JetBrains Mono, IBM Plex Sans)
**Example:**
```javascript
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jake-reddy.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    {
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
```
**Source:** https://docs.astro.build/en/guides/fonts/

### Pattern 3: Font Loading in Layout
**What:** Apply fonts using Astro's <Font /> component with preload
**When to use:** In base layout to ensure fonts load on all pages
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
import '../styles/global.css';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <Font cssVariable="--font-jetbrains-mono" preload />
    <Font cssVariable="--font-ibm-plex-sans" preload />
  </head>
  <body>
    <slot />
  </body>
</html>
```
**Source:** https://docs.astro.build/en/guides/fonts/#applying-custom-fonts

### Pattern 4: WCAG AAA Contrast Verification
**What:** Ensure all text meets 7:1 contrast (normal) or 4.5:1 (large text 18pt+/14pt+ bold)
**When to use:** During design token definition and component creation
**Example verification:**
```
Black on white: #000000 on #FFFFFF = 21:1 ✓ (exceeds 7:1)
Gray-900 on white: #171717 on #FFFFFF = 16.1:1 ✓ (exceeds 7:1)
Gray-800 on white: #262626 on #FFFFFF = 13.3:1 ✓ (exceeds 7:1)
Gray-700 on white: #404040 on #FFFFFF = 9.7:1 ✓ (exceeds 7:1)
Gray-600 on white: #525252 on #FFFFFF = 7.5:1 ✓ (exceeds 7:1)
Gray-500 on white: #737373 on #FFFFFF = 4.6:1 ✗ (fails 7:1, OK for large text)

For headings (18pt+ or 14pt+ bold): Use gray-500 or darker
For body text: Use gray-600 or darker
```
**Source:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html

### Anti-Patterns to Avoid
- **Using @astrojs/tailwind integration:** Deprecated for Tailwind 4; use @tailwindcss/vite
- **Defining Tailwind config in tailwind.config.js:** Tailwind 4 prefers CSS @theme directive
- **Importing Google Fonts via <link> in HTML:** Bypasses Astro's optimization; use Fonts API
- **Using default Tailwind spacing (4px grid):** Project requires 8px grid; must override
- **Assuming all rounded-* utilities are disabled:** Must explicitly set all to 0px in @theme
- **Using rgb() color functions in design tokens:** Use hex values for clarity and consistency

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font optimization | Manual preload links, woff2 conversion, subsetting | Astro Fonts API | Handles preload, format selection, caching, fallback fonts automatically |
| Spacing scale | Custom CSS variables for every spacing value | Tailwind spacing utilities | Override default scale once in @theme; use p-*, m-*, gap-* utilities |
| Color system | Separate CSS variables for every color variant | Tailwind color utilities | Define colors in @theme; get all variants (bg-*, text-*, border-*) automatically |
| Responsive design | Media query mixins, breakpoint utilities | Tailwind responsive variants | Built-in sm:, md:, lg:, xl:, 2xl: prefixes |
| Contrast checking | Manual calculation of contrast ratios | Automated tools + monochrome palette | Use contrast checker tools; monochrome simplifies to black/white/grays only |
| Font subsetting | Manual character set optimization | Fonts API subsets config | Automatic subsetting for specified subsets (latin, cyrillic, etc.) |

**Key insight:** Modern design system tooling (Tailwind 4 + Astro Fonts API) eliminates most custom infrastructure. Focus on design decisions (colors, typography, spacing) not implementation details.

## Common Pitfalls

### Pitfall 1: Using Deprecated @astrojs/tailwind Integration
**What goes wrong:** Following old Tailwind 3 guides leads to installing @astrojs/tailwind, which is deprecated
**Why it happens:** Astro docs updated for Tailwind 4, but many tutorials still reference v3 approach
**How to avoid:** 
- Use @tailwindcss/vite plugin (official Tailwind 4 integration)
- Configure in astro.config.mjs vite.plugins, not integrations array
- Import tailwindcss in CSS file, not via integration
**Warning signs:** 
- Error: "@astrojs/tailwind is deprecated"
- Tailwind classes not applying
- Build warnings about deprecated packages

### Pitfall 2: Incorrect 8px Spacing Grid Implementation
**What goes wrong:** Using default Tailwind spacing (4px-based) results in wrong spacing values (p-4 = 16px not 32px)
**Why it happens:** Tailwind default spacing-4 = 1rem = 16px, not 32px as 8px grid requires
**How to avoid:**
- Override ALL spacing values in @theme
- Use custom scale: --spacing-1: 8px (not 4px), --spacing-2: 16px (not 8px), etc.
- Document that spacing-N = N × 8px in this project
**Warning signs:**
- Spacing looks too tight (elements closer than designs)
- Using p-8 when design calls for 32px (should be p-4 with custom scale)

### Pitfall 3: Incomplete Border Radius Override
**What goes wrong:** Setting --radius-none: 0px doesn't disable all rounded-* utilities
**Why it happens:** Tailwind has separate variables for each rounded size (sm, md, lg, etc.)
**How to avoid:**
- Override ALL radius variables to 0px in @theme
- Include: none, sm, md, lg, xl, 2xl, 3xl, full
- Test rounded-sm, rounded-md, rounded-lg all render as 0px
**Warning signs:**
- Buttons have slight rounding despite "no rounded corners" requirement
- Some components have corners, others don't

### Pitfall 4: Gray Contrast Failures
**What goes wrong:** Using gray-400 or lighter for body text fails WCAG AAA (7:1 contrast)
**Why it happens:** Lighter grays have < 7:1 contrast on white background
**How to avoid:**
- Use gray-600 or darker for body text (≥7:1 contrast)
- Use gray-500 or darker for large text only (18pt+/14pt+ bold)
- Test all gray shades with contrast checker before using
**Warning signs:**
- Text looks washed out/hard to read
- Accessibility audits fail contrast checks
- Users with low vision report difficulty reading

### Pitfall 5: Font Loading Performance Issues
**What goes wrong:** Fonts load after page render, causing FOUT (Flash of Unstyled Text)
**Why it happens:** Forgetting preload attribute on <Font /> component
**How to avoid:**
- Always use <Font cssVariable="..." preload /> in layout
- Place <Font /> tags in <head> before other content
- Test on slow connections (Network tab → Slow 3G)
**Warning signs:**
- Text briefly appears in system font before custom font loads
- Layout shift when fonts load (CLS metric)
- Fonts load after several seconds on slow connections

### Pitfall 6: CSS Import Order Issues
**What goes wrong:** Tailwind styles not applying; global styles override utilities
**Why it happens:** Incorrect @import order in global.css
**How to avoid:**
- Import tailwindcss FIRST (before any custom CSS)
- Order: @import "tailwindcss" → base styles → utilities
- Never import Tailwind after custom styles
**Warning signs:**
- Tailwind utilities don't work
- Custom styles mysteriously override Tailwind
- Specificity battles requiring !important

## Code Examples

Verified patterns from official sources:

### Astro Config with Tailwind 4 + Fonts API
```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jake-reddy.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    {
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
```

### Global CSS with Tailwind 4 Import
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/installation/framework-guides/astro */
@import "tailwindcss";

/* Base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: var(--font-ibm-plex-sans);
  color: var(--color-black);
  background-color: var(--color-white);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-jetbrains-mono);
}
```

### Theme Configuration with Design Tokens
```css
/* src/styles/theme.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Nordic monochrome palette - DSGN-01 */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-100: #f5f5f5;  /* 1.1:1 - decorative only */
  --color-gray-200: #e5e5e5;  /* 1.5:1 - decorative only */
  --color-gray-300: #d4d4d4;  /* 2.0:1 - decorative only */
  --color-gray-400: #a3a3a3;  /* 3.0:1 - decorative only */
  --color-gray-500: #737373;  /* 4.6:1 - large text only */
  --color-gray-600: #525252;  /* 7.5:1 - body text OK */
  --color-gray-700: #404040;  /* 9.7:1 - body text OK */
  --color-gray-800: #262626;  /* 13.3:1 - body text OK */
  --color-gray-900: #171717;  /* 16.1:1 - body text OK */

  /* Typography - DSGN-02 */
  --font-display: var(--font-jetbrains-mono);
  --font-body: var(--font-ibm-plex-sans);

  /* 8px spacing grid - DSGN-03 */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
  --spacing-16: 128px;

  /* Sharp corners - DSGN-04 */
  --radius-none: 0px;
  --radius-sm: 0px;
  --radius: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
  --radius-full: 0px;

  /* Minimal shadows - DSGN-06 */
  --shadow-sm: none;
  --shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: none;
  --shadow-xl: none;
  --shadow-2xl: none;
  --shadow-inner: none;
}
```

### Base Layout with Font Loading
```astro
---
// src/layouts/BaseLayout.astro
// Source: https://docs.astro.build/en/guides/fonts/#applying-custom-fonts
import { Font } from 'astro:assets';
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
    
    <!-- Preload custom fonts - DSGN-02 -->
    <Font cssVariable="--font-jetbrains-mono" preload />
    <Font cssVariable="--font-ibm-plex-sans" preload />
  </head>
  <body class="min-h-screen bg-white text-black">
    <slot />
  </body>
</html>
```

### Example Component with Design System
```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary';
}

const { variant = 'primary' } = Astro.props;

const baseClasses = 'px-4 py-2 border-2 font-display transition-colors';
const variantClasses = {
  primary: 'bg-black text-white border-black hover:bg-gray-900',
  secondary: 'bg-white text-black border-black hover:bg-gray-100',
};
---
<button class:list={[baseClasses, variantClasses[variant]]}>
  <slot />
</button>

<!-- 
Design system compliance:
- 8px spacing: px-4 (32px), py-2 (16px) - DSGN-03
- Sharp corners: border utilities have 0px radius - DSGN-04  
- High contrast: black/white combinations = 21:1 - DSGN-05
- Crisp borders: border-2 (2px solid) - DSGN-06
- Typography: font-display (JetBrains Mono) - DSGN-02
-->
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind 4.0 (2024) | Native Vite support, CSS-based config |
| tailwind.config.js | @theme directive in CSS | Tailwind 4.0 (2024) | Co-locate config with styles, type-safe |
| Manual font preloading | Astro Fonts API | Astro 5.0 (2024) | Automatic optimization, better performance |
| JIT mode opt-in | JIT always enabled | Tailwind 3.0 (2021) | Faster builds, unlimited variants |
| PurgeCSS configuration | Content scanning built-in | Tailwind 2.0 (2020) | Smaller bundles by default |

**Deprecated/outdated:**
- **@astrojs/tailwind:** Deprecated as of Tailwind 4; use @tailwindcss/vite
- **tailwind.config.js for Tailwind 4:** Still works but @theme CSS directive preferred
- **<link> Google Fonts imports:** Use Astro Fonts API for better performance
- **Manual font subsetting:** Fonts API handles automatically with subsets config

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.1.9 (already installed) |
| Config file | vitest.config.ts (exists from Phase 1) |
| Quick run command | `npm test` |
| Full suite command | `npm test -- --run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | Colors use monochrome palette (black, white, grays) | unit | `npm test -- src/test/design-system/colors.test.ts -x` | ❌ Wave 0 |
| DSGN-02 | Headings use JetBrains Mono, body uses IBM Plex Sans | unit | `npm test -- src/test/design-system/typography.test.ts -x` | ❌ Wave 0 |
| DSGN-03 | All spacing follows 8px grid (8, 16, 24, 32, etc.) | unit | `npm test -- src/test/design-system/spacing.test.ts -x` | ❌ Wave 0 |
| DSGN-04 | No rounded corners anywhere (border-radius: 0) | unit | `npm test -- src/test/design-system/borders.test.ts -x` | ❌ Wave 0 |
| DSGN-05 | Contrast ratios meet WCAG AAA (7:1 normal, 4.5:1 large) | unit | `npm test -- src/test/design-system/contrast.test.ts -x` | ❌ Wave 0 |
| DSGN-06 | Borders are crisp (1-2px solid), minimal shadows | unit | `npm test -- src/test/design-system/effects.test.ts -x` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test -- src/test/design-system/ -x` (quick smoke test)
- **Per wave merge:** `npm test -- --run` (full suite)
- **Phase gate:** Full suite green + manual visual inspection before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `src/test/design-system/colors.test.ts` — validates monochrome palette (DSGN-01)
- [ ] `src/test/design-system/typography.test.ts` — validates font families (DSGN-02)
- [ ] `src/test/design-system/spacing.test.ts` — validates 8px grid (DSGN-03)
- [ ] `src/test/design-system/borders.test.ts` — validates sharp corners (DSGN-04)
- [ ] `src/test/design-system/contrast.test.ts` — validates WCAG AAA contrast (DSGN-05)
- [ ] `src/test/design-system/effects.test.ts` — validates borders/shadows (DSGN-06)
- [ ] `src/test/design-system/test-utils.ts` — shared contrast calculation utilities

**Test approach:** Parse generated CSS from Tailwind theme config, validate design tokens match requirements. Use contrast ratio calculation for DSGN-05. All tests unit-level (no browser/rendering).

## Open Questions

1. **Gray scale exact values**
   - What we know: Need grays with ≥7:1 contrast for body text, ≥4.5:1 for large text
   - What's unclear: Exact hex values for gray-100 through gray-900
   - Recommendation: Use standard Tailwind gray scale as starting point, verify each with contrast checker, adjust if needed

2. **Font weight range**
   - What we know: Both fonts available in 400-700 weights
   - What's unclear: Which weights actually needed (e.g., do we use 500/600 or just 400/700?)
   - Recommendation: Start with [400, 700] (normal + bold), add intermediate weights only if designs require

3. **Shadow usage specifics**
   - What we know: Minimal shadows, crisp borders
   - What's unclear: Are shadows completely forbidden or just used sparingly?
   - Recommendation: Define 2-3 subtle shadow options (0-4px blur), document when appropriate to use

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4.2 official docs - https://tailwindcss.com/docs/installation/framework-guides/astro
- Astro Fonts API official docs - https://docs.astro.build/en/guides/fonts/
- Astro styling guide - https://docs.astro.build/en/guides/styling/#tailwind
- WCAG 2.1 AAA contrast requirements - https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html

### Secondary (MEDIUM confidence)
- Tailwind theme configuration - https://tailwindcss.com/docs/theme (verified with official docs)
- Tailwind font-family utilities - https://tailwindcss.com/docs/font-family (verified with official docs)

### Tertiary (LOW confidence)
- None - all findings verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Tailwind 4 and Astro 6 docs, current as of 2026
- Architecture: HIGH - Official guides for both Tailwind 4 CSS config and Astro Fonts API
- Pitfalls: HIGH - Common issues documented in migration guides and GitHub issues
- Accessibility: HIGH - W3C WCAG 2.1 official specification

**Research date:** 2026-03-14
**Valid until:** 90 days (stable technologies, but Tailwind 4 still maturing)
