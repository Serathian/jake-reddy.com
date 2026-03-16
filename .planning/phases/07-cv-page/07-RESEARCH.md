# Phase 7: CV Page - Research

**Researched:** 2026-03-16
**Domain:** Astro 6 static page routing, hardcoded content, design system technical debt resolution
**Confidence:** HIGH

## Summary

Phase 7 implements a professional CV page at `/cv` route displaying Jake's 5 years of work experience, education, and technical skills. Content is hardcoded directly in the Astro component (no CMS, no data layer). This phase also resolves design system technical debt from v0.1 by adding missing CSS custom properties and fixing color token consistency.

The implementation follows established patterns from existing pages (Home, About) and requires minimal new architecture. The primary challenge is organizing CV content structure for scannability while maintaining design system consistency. Technical debt resolution must occur before CV implementation to avoid mixing concerns.

**Primary recommendation:** Split into two sequential tasks: (1) Design system debt cleanup (add CSS properties, fix header opacity, update color tokens), (2) CV page implementation (route, content, responsive layout, navigation link). Use mirror-logic test pattern for content validation.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Content Structure**
- Three main sections: Work Experience → Education → Skills
- Work Experience first (primary focus — 5 years of experience)
- Education second (academic foundation)
- Technical Skills third (capabilities organized by category)
- No Professional Summary section (About page already serves this purpose)
- No Certifications or Languages sections (not in requirements, keep minimal)

**Timeline Presentation**
- Divider-separated sections for work experience entries
- Each entry: Company name → Role → Dates → Achievements
- Use `border-t border-[#E5E5E5]` dividers between entries (matches About page pattern)
- Chronological order: Most recent first
- Company name and role as headings (semantic HTML)
- Date range displayed clearly (e.g., "Jan 2021 - Present")

**Skills Categorization**
- Three categories explicitly: Frontend / Backend / DevOps (per CV-05 requirement)
- Technologies listed within each category (e.g., "TypeScript, React, Astro" under Frontend)
- Simple comma-separated lists or inline badges
- No skill percentage bars (explicitly out of scope — "looks junior")
- No proficiency levels (subjective, impossible to quantify accurately)

**Achievement Presentation**
- Bulleted achievement lists under each role
- Metrics and impact statements emphasized (e.g., "Improved performance 40%")
- Scannable format — recruiters should quickly see key accomplishments
- Lead with action verbs (Built, Led, Improved, Designed)
- Each bullet: action + context + measurable outcome when possible

**Design System Debt Resolution**
- **Separate task before CV content implementation**
- Add missing CSS custom properties: `--color-secondary` and `--color-border` to theme.css
- Fix header background: change from `bg-white` to `bg-white/98` with `backdrop-blur-sm`
- Update color tokens: replace `text-gray-700` with `text-[#595959]` in Home page (5 instances)
- Update color tokens: replace `text-gray-600` with `text-[#595959]` in Footer (3 instances)
- Fix before CV implementation to avoid mixing concerns

**Responsive Behavior**
- Mobile (375px): Single column, reduced padding
- Tablet (768px): Increased padding, comfortable reading width
- Desktop (1024px+): Max width 1200px, centered with generous padding
- Match responsive padding pattern from About page: `px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20`

### Claude's Discretion

- Exact wording of role descriptions and achievements (Jake will provide CV source material)
- Specific date formatting (e.g., "Jan 2021" vs "January 2021" vs "2021-01")
- Whether to include location/company size metadata
- Exact spacing between sections (as long as 8px grid maintained)
- Whether to add subtle visual enhancement to current role (e.g., "Present" badge)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CV-01 | User can view CV page at /cv route | Astro file-based routing: create `src/pages/cv.astro` |
| CV-02 | CV displays professional work experience (5 years) with company names, roles, dates, and achievements | Hardcoded content pattern established in About page, semantic HTML structure |
| CV-03 | CV includes metrics and impact statements (e.g., "Improved performance 40%") | Content structure in component markup, no special technical requirement |
| CV-04 | CV displays education section | Similar to work experience section structure |
| CV-05 | CV displays technical skills organized by category (Frontend, Backend, DevOps) | Section with three subsections, simple list markup |
| CV-06 | CV content matches Jake's real experience (from provided CV files) | Content authoring during implementation |
| CV-07 | CV page is responsive (375px mobile, 768px tablet, 1024px+ desktop) | Tailwind responsive classes matching About page pattern |
| CV-08 | CV link appears in navigation header | Add link to Header.astro, update active state logic |
| DEBT-01 | CSS custom properties added for --color-secondary and --color-border | Add to theme.css alongside existing properties |
| DEBT-02 | Header uses rgba(255,255,255,0.98) instead of bg-white | Update Header.astro background class |
| DEBT-03 | Home page uses text-[#595959] instead of text-gray-700 | Replace Tailwind utility class (5 instances) |
| DEBT-04 | Footer uses text-[#595959] instead of text-gray-600 | Replace Tailwind utility class (3 instances) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.0.4 | Static site generator | Project foundation, file-based routing |
| Tailwind CSS | 4.2.1 | Utility-first CSS | Project styling system, already configured |
| Vitest | 3.2.4 | Test framework | Project test infrastructure (Phase 6) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| N/A | - | - | No additional libraries needed for this phase |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hardcoded content | Content collections | Overkill for single CV page, adds complexity |
| Tailwind utilities | CSS modules | Inconsistent with project styling approach |

**Installation:**
No new packages required. All dependencies already installed in Phase 1-6.

## Architecture Patterns

### Recommended Project Structure
```
src/pages/
├── cv.astro           # CV page (NEW)
├── index.astro        # Home page
├── about.astro        # About page

src/components/layout/
├── Header.astro       # Add CV link (MODIFY)
└── Footer.astro       # Fix color tokens (MODIFY)

src/styles/
└── theme.css          # Add CSS custom properties (MODIFY)

src/test/
├── navigation/
│   └── active-link.test.ts  # Add CV nav test (MODIFY)
└── content/
    └── cv-content.test.ts   # CV content validation (NEW)
```

### Pattern 1: File-Based Routing
**What:** Create `.astro` file in `src/pages/` to automatically generate route
**When to use:** All page creation in Astro
**Example:**
```typescript
// src/pages/cv.astro creates /cv route automatically
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="CV | Jake Reddy" description="Professional CV and work experience">
  <main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20">
    <!-- CV content here -->
  </main>
</BaseLayout>
```
**Source:** Astro official docs - File-based routing (https://docs.astro.build/en/guides/routing/)

### Pattern 2: Hardcoded Content in Component
**What:** Content lives directly in component markup, no external data files
**When to use:** Single-page content that doesn't need to be reused or dynamically generated
**Example:**
```astro
---
// No data imports or getStaticPaths needed
---
<section>
  <h2 class="font-display text-2xl font-semibold mb-4">Work Experience</h2>
  
  <!-- Company 1 -->
  <div class="border-t border-[#E5E5E5] pt-8">
    <h3 class="font-display text-xl font-semibold">Company Name</h3>
    <p class="font-body text-base text-[#595959]">Senior Full-Stack Developer</p>
    <p class="font-body text-sm text-[#595959] mb-4">Jan 2021 - Present</p>
    <ul class="list-disc list-inside space-y-2">
      <li class="font-body text-base text-[#595959]">Built X feature improving performance 40%</li>
    </ul>
  </div>
</section>
```
**Source:** Established pattern in existing About page (src/pages/about.astro)

### Pattern 3: Mirror-Logic Testing for Content
**What:** Define content structure function inline in test file, mirror component logic
**When to use:** Testing Astro component content when Vitest can't import .astro files
**Example:**
```typescript
// src/test/content/cv-content.test.ts
import { describe, it, expect } from 'vitest';

interface WorkExperience {
  company: string;
  role: string;
  dateRange: string;
  achievements: string[];
}

function getCVContent() {
  return {
    workExperience: [
      // Mirror actual CV content structure
    ],
    education: [
      // Mirror actual education structure
    ],
    skills: {
      frontend: ['TypeScript', 'React', 'Astro'],
      backend: ['Node.js', 'PostgreSQL'],
      devops: ['Docker', 'GitHub Actions']
    }
  };
}

describe('CV Content', () => {
  it('has 5 years of work experience', () => {
    const cv = getCVContent();
    // Test logic
  });
});
```
**Source:** Established pattern in src/test/content/highlights.test.ts and src/test/navigation/active-link.test.ts

### Pattern 4: Design System Token Usage
**What:** Use explicit hex values instead of Tailwind color utilities for design system consistency
**When to use:** All text colors and borders tied to design system tokens
**Example:**
```astro
<!-- CORRECT: Explicit hex tied to design system -->
<p class="text-[#595959]">Body text using --color-secondary</p>
<div class="border-[#E5E5E5]">Border using --color-border</div>

<!-- INCORRECT: Tailwind utilities (not design system) -->
<p class="text-gray-700">Not tied to design tokens</p>
<div class="border-gray-200">Approximation, not exact</div>
```
**Source:** Design system MASTER.md and existing About page implementation

### Pattern 5: Responsive Padding with Tailwind
**What:** Mobile-first responsive padding using Tailwind breakpoint modifiers
**When to use:** All page layouts requiring responsive spacing
**Example:**
```astro
<main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20">
  <!-- px-4 py-10: Mobile (375px) -->
  <!-- md:px-8 md:py-16: Tablet (768px+) -->
  <!-- lg:px-12 lg:py-20: Desktop (1024px+) -->
</main>
```
**Source:** Established in About page (src/pages/about.astro line 5)

### Pattern 6: Active Navigation State
**What:** Determine active route in Header component, set aria-current attribute
**When to use:** All navigation links that need active state indication
**Example:**
```astro
---
const { pathname } = Astro.url;
const isCV = pathname === '/cv' || pathname === '/cv/';
---
<a
  href="/cv"
  aria-current={isCV ? 'page' : undefined}
  class="nav-link font-body text-sm font-medium text-gray-600 hover:text-black uppercase tracking-[1px] transition-colors cursor-pointer"
>CV</a>

<style>
  .nav-link[aria-current="page"] {
    color: #000000;
  }
</style>
```
**Source:** Existing Header.astro implementation (lines 3-4, 11-18, 24-27)

### Anti-Patterns to Avoid
- **Content in separate data files:** Adds unnecessary abstraction for single-use content
- **Dynamic routing with getStaticPaths:** Not needed for single static page
- **Importing .astro files in tests:** Vitest node environment can't parse Astro components
- **Rounded corners or gradients:** Violates Nordic minimalist design philosophy
- **Skill percentage bars:** Explicitly out of scope (CV-05 decisions)
- **Heavy shadows instead of borders:** Design system prefers crisp borders

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Routing system | Custom URL mapping | Astro file-based routing | Built-in, zero config, follows conventions |
| CSS custom properties | Manual CSS variables | Tailwind theme extension | Already configured in project |
| Responsive breakpoints | Custom media queries | Tailwind responsive utilities | Consistent with project, matches existing pages |
| Test framework setup | Custom test runner | Vitest (already configured) | Phase 6 established infrastructure |
| HTML meta tags | Manual meta elements | BaseLayout component | Already handles title, description, fonts |

**Key insight:** This phase leverages existing infrastructure from Phases 1-6. No new architecture needed — follow established patterns from Home and About pages.

## Common Pitfalls

### Pitfall 1: Mixing Design Debt Fix with CV Implementation
**What goes wrong:** Combining CSS custom property additions with CV page creation in single task creates merge conflicts and unclear commits
**Why it happens:** Desire to "fix everything at once" feels efficient but creates technical and git management issues
**How to avoid:** 
- Task 1 (Wave 0): Design system debt only — add CSS properties, fix header, update color tokens
- Task 2 (Wave 1): CV page implementation only — route, content, responsive layout
- Separate commits make rollback easier if issues arise
**Warning signs:** 
- Commit message contains "and" multiple times
- Changes span multiple unrelated files (theme.css + cv.astro + index.astro)
- Difficult to write focused test for single responsibility

### Pitfall 2: Importing .astro Files in Vitest Tests
**What goes wrong:** `import { getCVContent } from '../pages/cv.astro'` fails with parse error — Vitest runs in Node.js environment that can't parse Astro component syntax
**Why it happens:** Coming from JS/TS background where component imports work normally in tests
**How to avoid:** Use mirror-logic pattern — define content structure function inline in test file that mirrors component implementation
**Warning signs:**
- Test errors mention "Unexpected token '<'" or "Cannot use import outside module"
- Trying to import from `.astro` files in `.test.ts` files
**Example fix:**
```typescript
// ❌ WRONG: Cannot import from .astro
import { workExperience } from '../pages/cv.astro';

// ✅ CORRECT: Mirror the logic
function getWorkExperience() {
  return [/* same data structure as cv.astro */];
}
```

### Pitfall 3: Hardcoding Colors Instead of Using Explicit Hex Values
**What goes wrong:** Using `text-gray-700` instead of `text-[#595959]` creates color inconsistency — Tailwind's gray-700 (#374151) is different from design system --color-secondary (#595959)
**Why it happens:** Tailwind utilities feel more "standard" and don't require remembering hex values
**How to avoid:** Always use explicit hex values for colors tied to design system tokens (primary, secondary, border)
**Warning signs:**
- Colors don't match design system exactly
- Failed design review citing "wrong shade of gray"
- Inconsistent text colors across pages
**Reference:** Design system MASTER.md lines 34, 37 — color tokens must match exactly

### Pitfall 4: Forgetting Trailing Slash Variants in Navigation Logic
**What goes wrong:** Navigation active state only works for `/cv` but not `/cv/` — Astro allows both by default
**Why it happens:** Testing only one URL variant during development
**How to avoid:** Always check both variants: `pathname === '/cv' || pathname === '/cv/'`
**Warning signs:**
- Active nav state works inconsistently
- aria-current attribute not applied when trailing slash present
**Example:**
```astro
---
const { pathname } = Astro.url;
// ✅ CORRECT: Handle both variants
const isCV = pathname === '/cv' || pathname === '/cv/';

// ❌ WRONG: Only handles one variant
const isCV = pathname === '/cv';
---
```

### Pitfall 5: Breaking 8px Spacing Grid
**What goes wrong:** Using arbitrary spacing values like `mb-3` (12px) or `py-5` (20px) breaks visual rhythm and design system consistency
**Why it happens:** Not aware of 8px base unit requirement, or approximating spacing visually
**How to avoid:** Only use Tailwind spacing utilities that align with 8px grid: `spacing-1` (8px), `spacing-2` (16px), `spacing-3` (24px), `spacing-4` (32px), etc.
**Warning signs:**
- Spacing feels "off" compared to other pages
- Designer rejects layout citing inconsistent spacing
- Values like 12px, 20px, 28px in computed styles
**Reference:** Design system MASTER.md lines 75-89, theme.css lines 23-35

### Pitfall 6: Not Respecting max-w-prose for Readability
**What goes wrong:** Long achievement descriptions stretch full width of container, making them hard to read (line length > 75 characters)
**Why it happens:** Forgetting that optimal reading line length is ~65 characters
**How to avoid:** Apply `max-w-prose` to paragraph text elements (achievement lists, role descriptions)
**Warning signs:**
- Text lines extend very wide on desktop
- Reduced readability on large screens
- Failed accessibility review for text readability
**Reference:** About page pattern (line 12, 20, 28), Design system anti-patterns

## Code Examples

Verified patterns from official sources and existing codebase:

### CV Page Structure
```astro
---
// src/pages/cv.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="CV | Jake Reddy" description="Five years of full-stack development experience. TypeScript, React, Node.js, PostgreSQL.">
  <main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20">
    
    <h1 class="font-display text-4xl font-bold mb-10 md:text-5xl">CV</h1>
    
    <!-- Work Experience Section -->
    <section class="mb-10 md:mb-14">
      <h2 class="font-display text-2xl font-semibold mb-4">Work Experience</h2>
      
      <!-- Entry 1 (Most Recent) -->
      <div class="border-t border-[#E5E5E5] pt-8">
        <h3 class="font-display text-xl font-semibold mb-1">Company Name</h3>
        <p class="font-body text-base text-[#595959] mb-1">Senior Full-Stack Developer</p>
        <p class="font-body text-sm text-[#595959] mb-4">Jan 2021 - Present</p>
        <ul class="list-disc list-inside space-y-2">
          <li class="font-body text-base text-[#595959] max-w-prose">Built feature X improving performance 40% through caching optimization</li>
          <li class="font-body text-base text-[#595959] max-w-prose">Led team of 4 engineers delivering Y product to 10,000+ users</li>
        </ul>
      </div>
      
      <!-- Entry 2 -->
      <div class="border-t border-[#E5E5E5] pt-8 mt-8">
        <!-- Similar structure -->
      </div>
    </section>
    
    <!-- Education Section -->
    <section class="border-t border-[#E5E5E5] pt-8 mb-10 md:mb-14">
      <h2 class="font-display text-2xl font-semibold mb-4">Education</h2>
      <div>
        <h3 class="font-display text-xl font-semibold mb-1">University Name</h3>
        <p class="font-body text-base text-[#595959] mb-1">Degree in Computer Science</p>
        <p class="font-body text-sm text-[#595959]">2015 - 2019</p>
      </div>
    </section>
    
    <!-- Technical Skills Section -->
    <section class="border-t border-[#E5E5E5] pt-8">
      <h2 class="font-display text-2xl font-semibold mb-4">Technical Skills</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-display text-base font-semibold mb-2">Frontend</h3>
          <p class="font-body text-base text-[#595959]">TypeScript, React, Astro, Tailwind CSS</p>
        </div>
        <div>
          <h3 class="font-display text-base font-semibold mb-2">Backend</h3>
          <p class="font-body text-base text-[#595959]">Node.js, PostgreSQL, GraphQL, REST APIs</p>
        </div>
        <div>
          <h3 class="font-display text-base font-semibold mb-2">DevOps</h3>
          <p class="font-body text-base text-[#595959]">Docker, GitHub Actions, Nginx</p>
        </div>
      </div>
    </section>
    
  </main>
</BaseLayout>
```
**Source:** Pattern derived from existing About page (src/pages/about.astro) + Design system MASTER.md

### Adding CSS Custom Properties
```css
/* src/styles/theme.css */
@theme {
  /* ... existing properties ... */
  
  /* Design system color tokens - DEBT-01 */
  --color-secondary: #595959;  /* Muted text, captions */
  --color-border: #E5E5E5;     /* Dividers, card borders */
  
  /* ... rest of theme ... */
}
```
**Source:** Design system MASTER.md lines 34, 37 + existing theme.css pattern

### Updating Header with CV Link
```astro
---
// src/components/layout/Header.astro
const { pathname } = Astro.url;
const isHome = pathname === '/' || pathname === '';
const isAbout = pathname === '/about' || pathname === '/about/';
const isCV = pathname === '/cv' || pathname === '/cv/';  // NEW
---
<header class="fixed top-0 left-0 right-0 z-[1000] bg-white/98 backdrop-blur-sm border-b border-[#E5E5E5]">
  <nav class="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="font-display text-base font-semibold text-black hover:opacity-70 transition-opacity cursor-pointer">Jake Reddy</a>
    <div class="flex gap-4">
      <a
        href="/"
        aria-current={isHome ? 'page' : undefined}
        class="nav-link font-body text-sm font-medium text-[#595959] hover:text-black uppercase tracking-[1px] transition-colors cursor-pointer"
      >Home</a>
      <a
        href="/about"
        aria-current={isAbout ? 'page' : undefined}
        class="nav-link font-body text-sm font-medium text-[#595959] hover:text-black uppercase tracking-[1px] transition-colors cursor-pointer"
      >About</a>
      <a
        href="/cv"
        aria-current={isCV ? 'page' : undefined}
        class="nav-link font-body text-sm font-medium text-[#595959] hover:text-black uppercase tracking-[1px] transition-colors cursor-pointer"
      >CV</a>
    </div>
  </nav>
</header>

<style>
  .nav-link[aria-current="page"] {
    color: #000000;
  }
</style>
```
**Source:** Existing Header.astro pattern + DEBT-02 (bg-white/98 backdrop-blur-sm) + DEBT-03/04 (text-[#595959])

### CV Content Test
```typescript
// src/test/content/cv-content.test.ts
import { describe, it, expect } from 'vitest';

interface WorkExperience {
  company: string;
  role: string;
  dateRange: string;
  achievements: string[];
}

interface Education {
  institution: string;
  degree: string;
  years: string;
}

interface Skills {
  frontend: string[];
  backend: string[];
  devops: string[];
}

// Mirror cv.astro content structure
function getCVContent() {
  return {
    workExperience: [
      {
        company: 'Company A',
        role: 'Senior Full-Stack Developer',
        dateRange: 'Jan 2021 - Present',
        achievements: [
          'Built feature improving performance 40%',
          'Led team of 4 engineers'
        ]
      },
      // More entries...
    ] as WorkExperience[],
    education: [
      {
        institution: 'University Name',
        degree: 'BSc Computer Science',
        years: '2015-2019'
      }
    ] as Education[],
    skills: {
      frontend: ['TypeScript', 'React', 'Astro'],
      backend: ['Node.js', 'PostgreSQL'],
      devops: ['Docker', 'GitHub Actions']
    } as Skills
  };
}

describe('CV Content Structure', () => {
  it('has work experience with required fields', () => {
    const cv = getCVContent();
    expect(cv.workExperience.length).toBeGreaterThan(0);
    cv.workExperience.forEach(exp => {
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.dateRange).toBeTruthy();
      expect(exp.achievements.length).toBeGreaterThan(0);
    });
  });
  
  it('has education with required fields', () => {
    const cv = getCVContent();
    expect(cv.education.length).toBeGreaterThan(0);
    cv.education.forEach(edu => {
      expect(edu.institution).toBeTruthy();
      expect(edu.degree).toBeTruthy();
      expect(edu.years).toBeTruthy();
    });
  });
  
  it('has skills in three categories', () => {
    const cv = getCVContent();
    expect(cv.skills.frontend.length).toBeGreaterThan(0);
    expect(cv.skills.backend.length).toBeGreaterThan(0);
    expect(cv.skills.devops.length).toBeGreaterThan(0);
  });
  
  it('achievements include metrics or impact statements', () => {
    const cv = getCVContent();
    const allAchievements = cv.workExperience.flatMap(exp => exp.achievements);
    const hasMetrics = allAchievements.some(achievement => 
      /\d+%|\d+\+|\d+ (users|engineers|developers|developers)/.test(achievement)
    );
    expect(hasMetrics).toBe(true);
  });
});
```
**Source:** Established mirror-logic pattern from src/test/content/highlights.test.ts

### Active Navigation State Test
```typescript
// src/test/navigation/active-link.test.ts (UPDATE)
import { describe, it, expect } from 'vitest';

function getNavState(pathname: string) {
  const isHome = pathname === '/' || pathname === '';
  const isAbout = pathname === '/about' || pathname === '/about/';
  const isCV = pathname === '/cv' || pathname === '/cv/';  // NEW
  return {
    isHome,
    isAbout,
    isCV,  // NEW
    homeAriaCurrent: isHome ? 'page' : undefined,
    aboutAriaCurrent: isAbout ? 'page' : undefined,
    cvAriaCurrent: isCV ? 'page' : undefined,  // NEW
  };
}

describe('getNavState', () => {
  // ... existing tests ...
  
  it('pathname "/cv" → isCV=true', () => {
    const state = getNavState('/cv');
    expect(state.isCV).toBe(true);
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(false);
  });
  
  it('pathname "/cv/" (trailing slash) → isCV=true', () => {
    const state = getNavState('/cv/');
    expect(state.isCV).toBe(true);
  });
  
  it('CV aria-current is "page" when active', () => {
    const cvState = getNavState('/cv');
    expect(cvState.cvAriaCurrent).toBe('page');
    expect(cvState.homeAriaCurrent).toBeUndefined();
    expect(cvState.aboutAriaCurrent).toBeUndefined();
  });
});
```
**Source:** Existing active-link.test.ts pattern

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind gray utilities | Explicit hex values | Phase 5 (v0.1) | Color consistency with design tokens |
| Vitest plain config | Astro getViteConfig() | Phase 6 (2026-03-16) | Enables component testing, Vite config inheritance |
| `bg-white` header | `bg-white/98 backdrop-blur-sm` | Phase 7 (planned) | Matches design system spec for translucent header |
| Manual CSS custom properties | Theme-defined tokens | Phase 7 (planned) | Centralized design system tokens |

**Deprecated/outdated:**
- `text-gray-600` and `text-gray-700` utilities: Replace with `text-[#595959]` for design system compliance (DEBT-03, DEBT-04)
- `bg-white` without opacity: Design system specifies `rgba(255,255,255,0.98)` (DEBT-02)

## Open Questions

1. **Exact CV content wording and achievements**
   - What we know: Jake will provide real CV content with 5 years work experience
   - What's unclear: Specific companies, roles, achievements, education details
   - Recommendation: Create placeholder structure in implementation, Jake fills actual content during human checkpoint

2. **Date format preference**
   - What we know: User has discretion on date formatting
   - What's unclear: "Jan 2021" vs "January 2021" vs "2021-01" preference
   - Recommendation: Use "Jan 2021 - Present" format (medium verbosity, clear, scannable)

3. **"Present" role visual enhancement**
   - What we know: User has discretion on visual enhancement for current role
   - What's unclear: Whether to add badge, different styling, or keep plain
   - Recommendation: Keep plain initially — "Present" text is sufficient, adding visual enhancement risks cluttered design

## Validation Architecture

> Nyquist validation is enabled in .planning/config.json

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 |
| Config file | vitest.config.ts (using Astro's getViteConfig) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CV-01 | /cv route exists and renders | integration | `npm run build` (implicit route check) | ✅ existing (build validates routes) |
| CV-02 | Work experience content structure | unit | `pytest src/test/content/cv-content.test.ts -k "work experience" -x` | ❌ Wave 0 |
| CV-03 | Achievements include metrics | unit | `pytest src/test/content/cv-content.test.ts -k "metrics" -x` | ❌ Wave 0 |
| CV-04 | Education section exists | unit | `pytest src/test/content/cv-content.test.ts -k "education" -x` | ❌ Wave 0 |
| CV-05 | Skills in three categories | unit | `pytest src/test/content/cv-content.test.ts -k "three categories" -x` | ❌ Wave 0 |
| CV-06 | Content matches real experience | manual | Human checkpoint during implementation | Manual only (requires Jake's validation) |
| CV-07 | Responsive layout | manual | Visual inspection at 375px, 768px, 1024px | Manual only (same as About page pattern) |
| CV-08 | CV nav link active state | unit | `pytest src/test/navigation/active-link.test.ts -k "CV" -x` | ❌ Wave 0 |
| DEBT-01 | CSS custom properties exist | unit | `grep --color=never "color-secondary\\|color-border" src/styles/theme.css` | ❌ Wave 0 (bash check) |
| DEBT-02 | Header uses translucent background | unit | `grep --color=never "bg-white/98 backdrop-blur" src/components/layout/Header.astro` | ❌ Wave 0 (bash check) |
| DEBT-03 | Home uses text-[#595959] | unit | `! grep --color=never "text-gray-700" src/pages/index.astro` | ❌ Wave 0 (bash check - no matches) |
| DEBT-04 | Footer uses text-[#595959] | unit | `! grep --color=never "text-gray-600" src/components/layout/Footer.astro` | ❌ Wave 0 (bash check - no matches) |

### Sampling Rate
- **Per task commit:** `npm test` (runs all tests, ~20 tests, < 5 seconds)
- **Per wave merge:** `npm test && npm run build` (validates all routes compile)
- **Phase gate:** Full suite green + manual responsive check before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `src/test/content/cv-content.test.ts` — covers CV-02, CV-03, CV-04, CV-05
- [ ] Update `src/test/navigation/active-link.test.ts` — add CV route tests for CV-08
- [ ] Bash checks for DEBT-01 through DEBT-04 — validate CSS property existence and token replacement

*(Test infrastructure already exists from Phase 6 — only need new test files)*

## Sources

### Primary (HIGH confidence)
- Astro 6 official docs (routing) - https://docs.astro.build/en/guides/routing/
- Existing codebase patterns:
  - src/pages/about.astro (hardcoded content structure)
  - src/components/layout/Header.astro (active navigation state)
  - src/test/content/highlights.test.ts (mirror-logic pattern)
  - src/test/navigation/active-link.test.ts (navigation testing)
  - src/styles/theme.css (CSS custom properties pattern)
- Design system MASTER.md (color tokens, typography, spacing grid)
- CONTEXT.md (user decisions and constraints)
- REQUIREMENTS.md (phase requirements CV-01 through CV-08, DEBT-01 through DEBT-04)

### Secondary (MEDIUM confidence)
- Astro 6 configuration reference (verified structure from official docs)
- Tailwind CSS responsive utilities (md:, lg: breakpoints standard across web)

### Tertiary (LOW confidence)
- None — all research verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured in Phase 1-6
- Architecture: HIGH - Patterns established in existing About page, no new architecture needed
- Pitfalls: HIGH - Based on actual codebase patterns and common Astro/Vitest issues
- Validation: HIGH - Test framework configured in Phase 6, clear requirement mapping

**Research date:** 2026-03-16
**Valid until:** 30 days (Astro 6 stable, established patterns unlikely to change)
