# Phase 7: CV Page - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Professional CV page at /cv route displaying Jake's 5 years of work experience, education, and technical skills. Content is hardcoded directly in the Astro component (no CMS, no data layer). Also resolves design system technical debt from v0.1 (CSS custom properties and color token consistency).

</domain>

<decisions>
## Implementation Decisions

### Content Structure
- Three main sections: Work Experience → Education → Skills
- Work Experience first (primary focus — 5 years of experience)
- Education second (academic foundation)
- Technical Skills third (capabilities organized by category)
- No Professional Summary section (About page already serves this purpose)
- No Certifications or Languages sections (not in requirements, keep minimal)

### Timeline Presentation
- Divider-separated sections for work experience entries
- Each entry: Company name → Role → Dates → Achievements
- Use `border-t border-[#E5E5E5]` dividers between entries (matches About page pattern)
- Chronological order: Most recent first
- Company name and role as headings (semantic HTML)
- Date range displayed clearly (e.g., "Jan 2021 - Present")

### Skills Categorization
- Three categories explicitly: Frontend / Backend / DevOps (per CV-05 requirement)
- Technologies listed within each category (e.g., "TypeScript, React, Astro" under Frontend)
- Simple comma-separated lists or inline badges
- No skill percentage bars (explicitly out of scope — "looks junior")
- No proficiency levels (subjective, impossible to quantify accurately)

### Achievement Presentation
- Bulleted achievement lists under each role
- Metrics and impact statements emphasized (e.g., "Improved performance 40%")
- Scannable format — recruiters should quickly see key accomplishments
- Lead with action verbs (Built, Led, Improved, Designed)
- Each bullet: action + context + measurable outcome when possible

### Design System Debt Resolution
- **Separate task before CV content implementation**
- Add missing CSS custom properties: `--color-secondary` and `--color-border` to theme.css
- Fix header background: change from `bg-white` to `bg-white/98` with `backdrop-blur-sm`
- Update color tokens: replace `text-gray-700` with `text-[#595959]` in Home page (5 instances)
- Update color tokens: replace `text-gray-600` with `text-[#595959]` in Footer (3 instances)
- Fix before CV implementation to avoid mixing concerns

### Responsive Behavior
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **BaseLayout component**: Wraps all pages with header, footer, meta tags (src/layouts/BaseLayout.astro)
- **Border divider pattern**: `border-t border-[#E5E5E5] pt-8` used in About page for section separation
- **Typography classes**: `font-display` for headings (JetBrains Mono), `font-body` for paragraphs (IBM Plex Sans)
- **Prose width pattern**: `max-w-prose` on paragraph text for comfortable reading (used in About page)

### Established Patterns
- **Page structure**: `<main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20">`
- **Section headings**: `<h2 class="font-display text-2xl font-semibold mb-4">`
- **Body text**: `<p class="font-body text-base text-[#595959] leading-relaxed max-w-prose">`
- **Responsive breakpoints**: Mobile-first with md: (768px) and lg: (1024px) modifiers
- **8px spacing grid**: All spacing values should be multiples of 8px (mb-4, mb-10, py-8, etc.)

### Integration Points
- Header component needs CV link added to navigation (alongside Home and About)
- Header navigation currently has: `<a href="/">Home</a>` and `<a href="/about">About</a>`
- CV link should be: `<a href="/cv">CV</a>` with active state logic matching existing pattern

### Design System Gaps (Technical Debt)
- **Missing CSS custom properties**: `--color-secondary` (#595959) and `--color-border` (#E5E5E5) not declared in theme.css
- **Header opacity issue**: Uses `bg-white` (fully opaque) instead of `rgba(255,255,255,0.98)` per design spec
- **Hardcoded gray utilities**: Home page (5× `text-gray-700`) and Footer (3× `text-gray-600`) instead of `text-[#595959]`
- **Impact on CV page**: CV should use `text-[#595959]` consistently from the start

</code_context>

<specifics>
## Specific Ideas

- **CV content source**: Jake will provide real CV content (work history, achievements, education, skills)
- **No skill bars**: Explicitly out of scope — "Skill percentage bars look junior"
- **Metrics emphasis**: Requirements explicitly call for "metrics and impact statements (e.g., 'Improved performance 40%')"
- **Content is hardcoded**: No data layer, no content collections, content lives directly in component markup (per Phase 6 decisions)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-cv-page*
*Context gathered: 2026-03-16*
