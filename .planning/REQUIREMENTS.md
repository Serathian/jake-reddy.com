# Requirements: jake-reddy.com

**Defined:** 2026-03-15
**Core Value:** Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## v1.0 Requirements

Requirements for feature-complete portfolio launch. Each maps to roadmap phases.

### Content Collections

- [ ] **COLL-01**: Content collections configured with Zod schemas for CV and Projects
- [ ] **COLL-02**: CV data structure supports work experience, education, and skills
- [ ] **COLL-03**: Projects data structure supports markdown body content with frontmatter (title, tech stack, dates, links)
- [ ] **COLL-04**: Build-time validation configured (astro check in CI)
- [ ] **COLL-05**: Content collections integrated with existing mirror-logic test pattern

### CV / Resume

- [ ] **CV-01**: User can view CV page at /cv route
- [ ] **CV-02**: CV displays professional work experience (5 years) with company names, roles, dates, and achievements
- [ ] **CV-03**: CV includes metrics and impact statements (e.g., "Improved performance 40%")
- [ ] **CV-04**: CV displays education section
- [ ] **CV-05**: CV displays technical skills organized by category (Frontend, Backend, DevOps)
- [ ] **CV-06**: CV content matches Jake's real experience (from provided CV files)
- [ ] **CV-07**: CV page is responsive (375px mobile, 768px tablet, 1024px+ desktop)
- [ ] **CV-08**: CV link appears in navigation header

### Projects Showcase

- [ ] **PROJ-01**: User can view projects list at /projects route
- [ ] **PROJ-02**: Projects list displays 3-5 featured projects in grid layout
- [ ] **PROJ-03**: Each project card shows title, tech stack, and brief description
- [ ] **PROJ-04**: User can click project to view detailed case study
- [ ] **PROJ-05**: Project detail pages render markdown body content from CMS
- [ ] **PROJ-06**: Project detail pages display tech stack as structured data
- [ ] **PROJ-07**: Project detail pages include demo and GitHub links (when available)
- [ ] **PROJ-08**: Project content follows case study format (problem, solution, outcome)
- [ ] **PROJ-09**: Projects page is responsive (375px mobile, 768px tablet, 1024px+ desktop)
- [ ] **PROJ-10**: Projects link appears in navigation header
- [ ] **PROJ-11**: Project data uses mocked CMS structure (markdown body + frontmatter)

### Image Optimization

- [ ] **IMG-01**: CV page uses optimized headshot image (if applicable)
- [ ] **IMG-02**: Project detail pages display optimized screenshots
- [ ] **IMG-03**: Images automatically converted to WebP format
- [ ] **IMG-04**: Images use responsive srcset for different screen sizes
- [ ] **IMG-05**: Images implement lazy loading
- [ ] **IMG-06**: Images prevent Cumulative Layout Shift (CLS)
- [ ] **IMG-07**: Docker image size remains under 100MB after adding images
- [ ] **IMG-08**: Source images excluded from Docker final stage

### Performance Optimization

- [ ] **PERF-01**: Lighthouse CI integrated in GitHub Actions workflow
- [ ] **PERF-02**: All pages score 90+ on Performance category
- [ ] **PERF-03**: All pages score 90+ on Accessibility category
- [ ] **PERF-04**: All pages score 90+ on Best Practices category
- [ ] **PERF-05**: All pages score 90+ on SEO category
- [ ] **PERF-06**: Nginx compression (gzip) configured for text assets
- [ ] **PERF-07**: Nginx cache headers configured for static assets
- [ ] **PERF-08**: Performance validation runs against production build (not dev server)

### Animations

- [ ] **ANIM-01**: Subtle animations enhance user experience without distraction
- [ ] **ANIM-02**: All animations respect prefers-reduced-motion media query
- [ ] **ANIM-03**: Animations align with Nordic minimalist design philosophy
- [ ] **ANIM-04**: Animations achieve WCAG AAA compliance
- [ ] **ANIM-05**: Animation strategy uses CSS-only OR Astro view transitions
- [ ] **ANIM-06**: Animations tested with reduced-motion system setting enabled

### Technical Debt Cleanup

- [ ] **DEBT-01**: CSS custom properties added for --color-secondary and --color-border
- [ ] **DEBT-02**: Header uses rgba(255,255,255,0.98) instead of bg-white
- [ ] **DEBT-03**: Home page uses text-[#595959] instead of text-gray-700
- [ ] **DEBT-04**: Footer uses text-[#595959] instead of text-gray-600
- [ ] **DEBT-05**: Vitest config migrated to astro/config (enables component testing)
- [ ] **DEBT-06**: package.json test script uses vitest --run flag

## v2+ Requirements

Deferred to future releases. Tracked but not in current roadmap.

### Blog

- **BLOG-01**: User can view blog posts list
- **BLOG-02**: User can read individual blog posts with markdown rendering
- **BLOG-03**: Blog posts support tags and categories
- **BLOG-04**: Blog posts display publish dates and reading time

### Downloadable CV

- **DL-01**: User can download CV as PDF file
- **DL-02**: PDF CV matches web CV content
- **DL-03**: PDF CV maintains Nordic design aesthetic

### Open Source

- **OSS-01**: User can view significant GitHub contributions
- **OSS-02**: Open source section links to repos with activity

### Testimonials

- **TEST-01**: User can view testimonials from colleagues or clients
- **TEST-02**: Testimonials include name, role, company, photo

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Contact form with backend | Adds complexity, maintenance overhead, spam handling; email links sufficient |
| Analytics or tracking | Privacy concerns, GDPR overhead; not needed for portfolio |
| Dark mode toggle | Nordic monochrome design may not need it; evaluate post-launch based on user feedback |
| Every project ever built | Dilutes quality; curated 3-5 projects shows best work |
| Skill percentage bars | Subjective, impossible to quantify accurately, looks junior |
| Flashy animations everywhere | Contradicts Nordic minimalist philosophy, hurts performance and accessibility |
| Real-time features | No chat, notifications, or dynamic updates needed for static portfolio |
| User accounts or authentication | Portfolio is public content, no user-specific features |
| Content management UI | Content authored in markdown/JSON files, no admin panel needed |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| COLL-01 | Phase 6 | Pending |
| COLL-02 | Phase 6 | Pending |
| COLL-03 | Phase 6 | Pending |
| COLL-04 | Phase 6 | Pending |
| COLL-05 | Phase 6 | Pending |
| CV-01 | Phase 7 | Pending |
| CV-02 | Phase 7 | Pending |
| CV-03 | Phase 7 | Pending |
| CV-04 | Phase 7 | Pending |
| CV-05 | Phase 7 | Pending |
| CV-06 | Phase 7 | Pending |
| CV-07 | Phase 7 | Pending |
| CV-08 | Phase 7 | Pending |
| PROJ-01 | Phase 8 | Pending |
| PROJ-02 | Phase 8 | Pending |
| PROJ-03 | Phase 8 | Pending |
| PROJ-04 | Phase 8 | Pending |
| PROJ-05 | Phase 8 | Pending |
| PROJ-06 | Phase 8 | Pending |
| PROJ-07 | Phase 8 | Pending |
| PROJ-08 | Phase 8 | Pending |
| PROJ-09 | Phase 8 | Pending |
| PROJ-10 | Phase 8 | Pending |
| PROJ-11 | Phase 8 | Pending |
| IMG-01 | Phase 9 | Pending |
| IMG-02 | Phase 9 | Pending |
| IMG-03 | Phase 9 | Pending |
| IMG-04 | Phase 9 | Pending |
| IMG-05 | Phase 9 | Pending |
| IMG-06 | Phase 9 | Pending |
| IMG-07 | Phase 9 | Pending |
| IMG-08 | Phase 9 | Pending |
| PERF-01 | Phase 10 | Pending |
| PERF-02 | Phase 10 | Pending |
| PERF-03 | Phase 10 | Pending |
| PERF-04 | Phase 10 | Pending |
| PERF-05 | Phase 10 | Pending |
| PERF-06 | Phase 10 | Pending |
| PERF-07 | Phase 10 | Pending |
| PERF-08 | Phase 10 | Pending |
| ANIM-01 | Phase 10 | Pending |
| ANIM-02 | Phase 10 | Pending |
| ANIM-03 | Phase 10 | Pending |
| ANIM-04 | Phase 10 | Pending |
| ANIM-05 | Phase 10 | Pending |
| ANIM-06 | Phase 10 | Pending |
| DEBT-01 | Phase 7 | Pending |
| DEBT-02 | Phase 7 | Pending |
| DEBT-03 | Phase 7 | Pending |
| DEBT-04 | Phase 7 | Pending |
| DEBT-05 | Phase 6 | Pending |
| DEBT-06 | Phase 6 | Pending |

**Coverage:**
- v1.0 requirements: 52 total
- Mapped to phases: 52/52 ✓
- Unmapped: 0

---
*Requirements defined: 2026-03-15*
*Last updated: 2026-03-15 after v1.0 roadmap creation (52 requirements mapped to phases 6-10)*
