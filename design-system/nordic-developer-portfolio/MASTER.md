# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Nordic Developer Portfolio
**Generated:** 2026-03-12 16:58:22
**Category:** Full Stack Developer Portfolio
**Design Philosophy:** Nordic Minimalism, Swiss Modernism, Professional Excellence

---

## Design Principles

1. **Radical Simplicity** — Every element must justify its existence
2. **Mathematical Precision** — 8px base unit, strict grid system
3. **High Contrast** — Black on white, crisp boundaries
4. **Functional Beauty** — Form follows function
5. **Subtle Motion** — Animation only when it enhances understanding

---

## Global Rules

### Color Palette (Nordic Monochrome)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary (Black) | `#000000` | `--color-primary` | Headings, borders, icons |
| Text (Near Black) | `#0A0A0A` | `--color-text` | Body text, paragraphs |
| Secondary | `#595959` | `--color-secondary` | Muted text, captions |
| Background | `#FFFFFF` | `--color-background` | Main background |
| Surface | `#F5F5F5` | `--color-surface` | Cards, elevated surfaces |
| Border | `#E5E5E5` | `--color-border` | Dividers, card borders |
| Accent | `#0052CC` | `--color-accent` | Rare accent, CTA only |

**Color Philosophy:** 
- Monochromatic foundation (black/white/grays)
- Single accent color used sparingly (< 5% of UI)
- High contrast ensures WCAG AAA compliance
- Inspired by Finnish winter landscapes

### Typography (Technical Precision)

**Primary Choice:**
- **Heading Font:** JetBrains Mono (monospace for technical authenticity)
- **Body Font:** IBM Plex Sans (geometric, clean, professional)
- **Mood:** Technical, precise, functional, developer-focused, Nordic

**Google Fonts:** [JetBrains Mono + IBM Plex Sans](https://fonts.google.com/share?selection.family=IBM+Plex+Sans:wght@300;400;500;600;700|JetBrains+Mono:wght@400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

**Alternative (More Swiss):**
- **Heading Font:** Outfit (geometric, modern)
- **Body Font:** Work Sans (clean, readable)

**Typography Scale (1.25 ratio):**
- `--type-xs`: 12px / 0.75rem
- `--type-sm`: 14px / 0.875rem  
- `--type-base`: 16px / 1rem
- `--type-lg`: 20px / 1.25rem
- `--type-xl`: 25px / 1.5625rem
- `--type-2xl`: 31px / 1.9375rem
- `--type-3xl`: 39px / 2.4375rem
- `--type-4xl`: 49px / 3.0625rem
- `--type-5xl`: 61px / 3.8125rem

### Spacing System (8px Base Unit)

Mathematical spacing based on 8px grid for visual rhythm:

| Token | Value | Rem | Usage |
|-------|-------|-----|-------|
| `--space-1` | `8px` | `0.5rem` | Micro spacing, icon gaps |
| `--space-2` | `16px` | `1rem` | Tight padding, small gaps |
| `--space-3` | `24px` | `1.5rem` | Standard padding |
| `--space-4` | `32px` | `2rem` | Medium gaps |
| `--space-5` | `40px` | `2.5rem` | Large padding |
| `--space-6` | `48px` | `3rem` | Section spacing |
| `--space-8` | `64px` | `4rem` | Major sections |
| `--space-10` | `80px` | `5rem` | Hero spacing |
| `--space-12` | `96px` | `6rem` | Extreme breathing room |

### Layout Grid (Swiss Modernism)

- **Grid Columns:** 12 columns
- **Grid Gap:** 24px (--space-3)
- **Max Content Width:** 1200px
- **Breakpoints:**
  - Mobile: 375px - 767px (4 columns)
  - Tablet: 768px - 1023px (8 columns)
  - Desktop: 1024px+ (12 columns)

### Borders & Lines

| Token | Value | Usage |
|-------|-------|-------|
| `--border-thin` | `1px` | Default borders, dividers |
| `--border-medium` | `2px` | Emphasized borders, focus states |
| `--border-thick` | `4px` | Strong emphasis |
| `--border-radius` | `0px` | Sharp corners (Nordic aesthetic) |

### Shadows (Minimal)

Nordic minimalism uses shadows sparingly:

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | Default (prefer borders over shadows) |
| `--shadow-subtle` | `0 1px 3px rgba(0,0,0,0.08)` | Rare, for elevation only |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.06)` | Project cards on hover |

**Rule:** Prefer crisp borders over shadows. Shadows only when elevation is critical.

---

## Component Specifications

### Buttons (Functional, Not Decorative)

```css
/* Primary CTA - Use sparingly */
.btn-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 16px 32px;
  border: 2px solid #000000;
  border-radius: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #FFFFFF;
  color: #000000;
  border-color: #000000;
}

.btn-primary:focus {
  outline: 2px solid #0052CC;
  outline-offset: 4px;
}

/* Secondary Button - Preferred default */
.btn-secondary {
  background: transparent;
  color: #000000;
  border: 2px solid #000000;
  padding: 16px 32px;
  border-radius: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #000000;
  color: #FFFFFF;
}

/* Text Link - Minimal interaction */
.btn-text {
  background: none;
  border: none;
  color: #000000;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  transition: opacity 200ms ease;
}

.btn-text:hover {
  opacity: 0.6;
}
```

### Cards (Project Showcase)

```css
.card-project {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 0;
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card-project:hover {
  border-color: #000000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}

.card-project-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 300ms ease;
}

.card-project:hover .card-project-image {
  filter: grayscale(0%);
}

.card-project-content {
  padding: 24px;
}

.card-project-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
}

.card-project-description {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  color: #595959;
  line-height: 1.6;
}
```

### Input Fields (Form Elements)

```css
.input {
  width: 100%;
  padding: 16px;
  border: 2px solid #E5E5E5;
  border-radius: 0;
  background: #FFFFFF;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  color: #000000;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #000000;
  outline: none;
}

.input::placeholder {
  color: #B3B3B3;
}

.input-label {
  display: block;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Navigation (Minimal, Fixed)

```css
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid #E5E5E5;
  backdrop-filter: blur(8px);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-link {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #595959;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 200ms ease;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
  color: #000000;
}
```

---

## Style & Animation Guidelines

**Design Style:** Nordic Minimalism + Swiss Modernism 2.0

**Core Principles:**
- **Radical simplicity** — Remove everything non-essential
- **Grid-based layouts** — 12-column system, mathematical spacing
- **High contrast** — Black/white primary, minimal grays
- **Crisp boundaries** — Borders over shadows
- **Functional animation** — Motion only when it serves purpose

**Key Visual Effects:**
- Generous white space (48px+ between sections)
- Grayscale images with color on hover
- Sharp, clean borders (no rounded corners)
- Minimal shadows (prefer borders)
- Typography as design element
- Grid-based asymmetric layouts

**Animation Principles:**
- Duration: 200-300ms (quick, not sluggish)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for smoothness
- Transform properties only (translateY, scale) for performance
- Respect `prefers-reduced-motion` media query
- No continuous/infinite animations (except loading states)
- Hover states should be instant feedback (not decorative)

**Responsive Behavior:**
```css
/* Mobile First Approach */
.container {
  padding: 24px 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 48px 32px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 80px 48px;
  }
}
```

### Page Structure (Portfolio Pattern)

**Section Order:**

1. **Hero Section** (Full viewport)
   - Name (large, JetBrains Mono)
   - Title/Role (IBM Plex Sans)
   - Brief value proposition (1 line)
   - Subtle scroll indicator

2. **Selected Work** (Project Grid)
   - Masonry/grid layout (2-3 columns desktop, 1 column mobile)
   - Hover reveals project details
   - Category filters (optional)
   - Fast image loading (lazy load below fold)

3. **About/Philosophy** (Text-focused section)
   - Professional background
   - Technical expertise
   - Personal values/approach
   - Finland/Nordic influence (if desired)

4. **Technical Stack** (Grid of technologies)
   - Clean icons (SVG, monochrome)
   - Simple, scannable layout
   - Organized by category (Frontend, Backend, Tools)

5. **Contact/Footer** (Minimal)
   - Email, GitHub, LinkedIn
   - Simple text links (no social media icons)
   - Optional: Simple contact form

**CTA Strategy:**
- Primary CTA: On project cards (hover state)
- Secondary CTA: Footer contact
- No floating/sticky CTAs (too aggressive for portfolio)

---

## Icon System

**Icon Library:** Lucide Icons (https://lucide.dev/)
- Clean, consistent, open-source
- Monochrome by default
- 24x24px viewBox standard

**Alternative:** Heroicons (https://heroicons.com/)

**Icon Usage Rules:**
- Size: 20px (small), 24px (default), 32px (large)
- Color: Inherit from parent text color
- Stroke width: 2px (default)
- Never use emojis as icons

**Code Example:**
```html
<!-- Lucide Icon -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" 
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="..."/>
</svg>
```

---

## Accessibility Standards

**Target:** WCAG AAA Compliance

**Key Requirements:**

1. **Color Contrast**
   - Body text on white: 7:1+ (AAA)
   - Small text minimum: 4.5:1 (AA)
   - Large text minimum: 3:1 (AA)

2. **Focus States**
   - Visible focus ring: 2px solid, 4px offset
   - Blue outline (#0052CC) for clear visibility
   - Never remove outline without alternative

3. **Keyboard Navigation**
   - All interactive elements focusable
   - Tab order logical (top to bottom, left to right)
   - Skip links for main content

4. **Motion Sensitivity**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

5. **Semantic HTML**
   - Use proper heading hierarchy (h1 → h2 → h3)
   - `<nav>`, `<main>`, `<section>`, `<article>` tags
   - `alt` text for all images
   - `aria-label` for icon-only buttons

6. **Form Accessibility**
   - Labels for all inputs
   - Error messages linked to fields
   - Clear focus states
   - Helpful placeholder text

---

## Performance Standards

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Page Weight: < 500KB (excluding images)
- Images: WebP format, lazy loading below fold

**Optimization Checklist:**
- [ ] Images optimized (WebP, next-gen formats)
- [ ] Lazy load images below fold (`loading="lazy"`)
- [ ] Minimal JavaScript (prefer CSS for interactions)
- [ ] Font loading optimized (`font-display: swap`)
- [ ] No layout shifts (specify image dimensions)
- [ ] Cache strategy implemented
---

## Anti-Patterns (Do NOT Use)

### Visual & Design Anti-Patterns
- ❌ **Rounded corners** — Use sharp 0px border-radius (Nordic aesthetic)
- ❌ **Heavy shadows** — Prefer borders over drop shadows
- ❌ **Gradients** — Solid colors only, no gradients
- ❌ **Multiple accent colors** — One accent color maximum
- ❌ **Decorative animations** — Animation must serve purpose
- ❌ **Centered text blocks** — Left-align body text for readability
- ❌ **Busy backgrounds** — Solid colors or subtle textures only

### Interaction Anti-Patterns
- ❌ **Emojis as icons** — Use SVG icons (Lucide, Heroicons)
- ❌ **Missing cursor:pointer** — All clickable elements need pointer cursor
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus must be visible for keyboard users
- ❌ **Too slow animations** — Keep under 300ms (200-250ms ideal)

### Typography Anti-Patterns
- ❌ **Low contrast text** — Maintain 4.5:1 minimum (7:1 for AAA)
- ❌ **Too many font weights** — Use 2-3 weights maximum
- ❌ **Mixing font styles** — Stick to 2 font families max
- ❌ **Tiny text** — Minimum 14px for body text
- ❌ **Line length too long** — Max 75 characters per line

### Layout Anti-Patterns
- ❌ **Fixed header without spacing** — Account for navbar height
- ❌ **Inconsistent spacing** — Use 8px base unit consistently
- ❌ **Breaking grid system** — Stick to 12-column grid
- ❌ **Horizontal scroll** — Ensure responsive at all breakpoints
- ❌ **Content touching edges** — Always have padding/margins

### Performance Anti-Patterns
- ❌ **Large uncompressed images** — Use WebP, optimize sizes
- ❌ **No lazy loading** — Lazy load below-fold images
- ❌ **Animating width/height** — Use transform/opacity only
- ❌ **Continuous animations** — Only for loading indicators

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Lucide/Heroicons)
- [ ] No rounded corners (border-radius: 0)
- [ ] Minimal shadows (prefer borders)
- [ ] Single accent color used sparingly
- [ ] Images grayscale by default, color on hover
- [ ] High contrast: black/white/grays only

### Interaction
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (200-250ms)
- [ ] No layout shifts on hover (avoid scale)
- [ ] Focus states visible with blue outline
- [ ] Keyboard navigation works properly

### Typography
- [ ] Text contrast 4.5:1 minimum (7:1 for AAA)
- [ ] Only 2 font families used (JetBrains Mono + IBM Plex Sans)
- [ ] Typography scale respected
- [ ] Line length < 75 characters
- [ ] Proper heading hierarchy (h1 → h2 → h3)

### Layout & Spacing
- [ ] 8px base unit used consistently
- [ ] 12-column grid system followed
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Generous white space (48px+ between sections)

### Accessibility
- [ ] `prefers-reduced-motion` respected
- [ ] Semantic HTML used (`nav`, `main`, `section`)
- [ ] All images have `alt` text
- [ ] Form inputs have labels
- [ ] Skip links present for main content

### Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] Font loading optimized (`font-display: swap`)
- [ ] No layout shifts (CLS)
- [ ] Page weight < 500KB (excluding images)
- [ ] FCP < 1.5s, LCP < 2.5s
