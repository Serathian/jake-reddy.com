---
phase: 03-design-system-implementation
plan: 03
subsystem: design-system
tags: [layout, components, ui, nordic, verification, fonts, tailwind]

# Dependency graph
requires:
  - phase: 03-01
    provides: "Tailwind 4 configuration with Nordic design tokens"
  - phase: 03-02
    provides: "Font system via Astro Fonts API"
provides:
  - "BaseLayout component with font preloading and global styles"
  - "Button component demonstrating design system usage"
  - "Updated homepage showcasing complete Nordic aesthetic"
  - "Human-verified design system implementation"
affects: [04-layout-navigation, 05-core-content-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Astro layout composition with Font component preloading"
    - "Design system demonstration via UI components"
    - "Tailwind utility classes for Nordic aesthetic enforcement"

key-files:
  created: [src/layouts/BaseLayout.astro, src/components/ui/Button.astro]
  modified: [src/pages/index.astro]

key-decisions:
  - "BaseLayout preloads fonts via <Font /> component in head (prevents FOUT)"
  - "Button component includes inline design system compliance documentation"
  - "Homepage serves as living design system reference with all 6 requirements demonstrated"
  - "Human verification checkpoint confirms visual Nordic aesthetic achievement"

patterns-established:
  - "Font preloading: <Font cssVariable='...' preload /> in layout head"
  - "Global styles import: import '../styles/global.css' in BaseLayout"
  - "Component design system compliance: inline comments mapping utilities to requirements"
  - "8px spacing grid usage: px-4 = 32px, py-2 = 16px, gap-8 = 64px, p-6 = 48px"

requirements-completed: [DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06]

# Metrics
duration: 5min
completed: 2026-03-15
---

# Phase 3 Plan 03: Wiring & Visual Verification Summary

**Design system operational and human-verified with BaseLayout, Button component, and homepage demonstrating complete Nordic minimalist aesthetic**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-15T03:20:00Z
- **Completed:** 2026-03-15T03:25:00Z
- **Tasks:** 4 (3 automated + 1 human verification checkpoint)
- **Commits:** 3 (one per automated task)

## What Was Built

### 1. BaseLayout Component
Created `src/layouts/BaseLayout.astro` as the foundation for all pages:
- Imports Font from 'astro:assets' for preloading
- Imports global.css to make design system available
- Preloads both JetBrains Mono and IBM Plex Sans fonts
- Provides Props interface (title, description)
- Applies design system classes to body (bg-white, text-black)

**Key pattern:** Font preload prevents FOUT (Flash of Unstyled Text)
```astro
<Font cssVariable="--font-jetbrains-mono" preload />
<Font cssVariable="--font-ibm-plex-sans" preload />
```

### 2. Button Component
Created `src/components/ui/Button.astro` demonstrating all 6 design requirements:
- **DSGN-01:** Monochrome colors (bg-black, text-white, border-black)
- **DSGN-02:** Typography (font-display = JetBrains Mono)
- **DSGN-03:** 8px spacing (px-4 = 32px, py-2 = 16px)
- **DSGN-04:** Sharp corners (border-2 has 0px radius automatically)
- **DSGN-05:** High contrast (black on white = 21:1)
- **DSGN-06:** Crisp borders (border-2 = 2px solid)

Includes inline compliance documentation mapping each utility to its requirement.

### 3. Homepage Update
Replaced `src/pages/index.astro` with design system demonstration:
- Uses BaseLayout with proper props
- Imports and uses Button component
- Demonstrates typography hierarchy (h1 with font-display, p with font-body)
- Shows spacing grid usage (gap-8, p-8, gap-4, p-6)
- Includes verification card listing all design system features

### 4. Human Verification Checkpoint
Visual verification confirmed:
- ✓ JetBrains Mono headings render correctly (monospace)
- ✓ IBM Plex Sans body text renders correctly (sans-serif)
- ✓ All text is crisp black on white background
- ✓ Buttons have sharp corners (no border-radius)
- ✓ Buttons have 2px solid black borders
- ✓ No rounded corners anywhere
- ✓ Minimal/no shadows visible
- ✓ Card borders are sharp and crisp
- ✓ Spacing follows 8px grid system
- ✓ No FOUT on page load
- ✓ High contrast throughout (WCAG AAA)
- ✓ No console errors

**Status:** APPROVED - Design system visually matches Nordic minimalist requirements

## Technical Implementation

### BaseLayout Pattern
```astro
---
import { Font } from 'astro:assets';
import '../styles/global.css';
---
<html lang="en">
  <head>
    <!-- Font preload critical for performance -->
    <Font cssVariable="--font-jetbrains-mono" preload />
    <Font cssVariable="--font-ibm-plex-sans" preload />
  </head>
  <body class="min-h-screen bg-white text-black">
    <slot />
  </body>
</html>
```

### Button Component Pattern
```astro
const baseClasses = 'px-4 py-2 border-2 font-display transition-colors';
const variantClasses = {
  primary: 'bg-black text-white border-black hover:bg-gray-900',
  secondary: 'bg-white text-black border-black hover:bg-gray-100',
};
```

**Key insight:** Tailwind utilities automatically enforce design tokens:
- `border-2` gets 0px radius (from theme.css --radius-* overrides)
- `px-4` = 32px (from theme.css --spacing-4 override)
- `py-2` = 16px (from theme.css --spacing-2 override)
- `bg-black` = #000000 (from theme.css --color-black)

## Design System Compliance

All 6 design requirements verified in browser:

| Requirement | Implementation | Verified |
|-------------|----------------|----------|
| DSGN-01 | Monochrome palette (black/white/grays) | ✓ |
| DSGN-02 | JetBrains Mono + IBM Plex Sans | ✓ |
| DSGN-03 | 8px spacing grid | ✓ |
| DSGN-04 | Sharp corners (0px radius) | ✓ |
| DSGN-05 | High contrast (WCAG AAA) | ✓ |
| DSGN-06 | Crisp 2px borders, minimal shadows | ✓ |

## Files Modified

**Created:**
- `src/layouts/BaseLayout.astro` (28 lines)
- `src/components/ui/Button.astro` (27 lines)

**Modified:**
- `src/pages/index.astro` (replaced with design system demo)

## Quality Checks

- [x] All tasks completed successfully
- [x] All files committed atomically
- [x] Human verification checkpoint approved
- [x] No console errors in dev server
- [x] Design system visually matches requirements
- [x] All 6 DSGN requirements satisfied

## Self-Check: PASSED

- [x] BaseLayout functional with font preloading
- [x] Button component demonstrates design system
- [x] Homepage showcases all design features
- [x] Human verification approved
- [x] No FOUT, font errors, or CSS errors
- [x] Dev server runs without issues

## Next Steps

Design system foundation complete. Phase 4 (Layout & Navigation) can now build on:
- BaseLayout component (reusable for all pages)
- Established design tokens (colors, spacing, typography)
- Component patterns (Button as reference)
- Verified Nordic aesthetic (sharp corners, high contrast, monochrome)

---
*Plan 03-03 complete - Design system operational and verified*
