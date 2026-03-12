# Requirements: jake-reddy.com

**Defined:** 2026-03-12
**Core Value:** Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Content

- [ ] **CONT-01**: Home page displays professional introduction (name, role, tagline)
- [ ] **CONT-02**: Home page includes brief professional highlights
- [ ] **CONT-03**: About page displays background and professional philosophy
- [ ] **CONT-04**: About page includes Nordic lifestyle context
- [ ] **CONT-05**: Contact information visible (email, GitHub, LinkedIn links)

### Design System

- [ ] **DSGN-01**: Nordic monochrome color palette implemented (black #000000, white #FFFFFF, grays)
- [ ] **DSGN-02**: Typography system implemented (JetBrains Mono headings, IBM Plex Sans body)
- [ ] **DSGN-03**: 8px base spacing grid applied consistently
- [ ] **DSGN-04**: Sharp corners (0px border-radius) used throughout
- [ ] **DSGN-05**: High contrast design (WCAG AAA compliance)
- [ ] **DSGN-06**: Minimal shadows with crisp borders

### Navigation & Layout

- [ ] **NAV-01**: Fixed navigation header on all pages
- [ ] **NAV-02**: Navigation includes Home and About links
- [ ] **NAV-03**: Responsive layout works on mobile (375px+)
- [ ] **NAV-04**: Responsive layout works on tablet (768px+)
- [ ] **NAV-05**: Responsive layout works on desktop (1024px+)

### Infrastructure

- [ ] **INFR-01**: Astro project configured with TypeScript
- [ ] **INFR-02**: Docker multi-stage build (Node.js build + Nginx runtime)
- [ ] **INFR-03**: Dockerfile includes proper .dockerignore configuration
- [ ] **INFR-04**: Docker image runs as non-root user
- [ ] **INFR-05**: Nginx configured with try_files for static routing
- [ ] **INFR-06**: Health check endpoint configured

### CI/CD

- [ ] **CICD-01**: GitHub Actions workflow for linting
- [ ] **CICD-02**: GitHub Actions workflow for TypeScript type checking
- [ ] **CICD-03**: GitHub Actions workflow for running tests
- [ ] **CICD-04**: GitHub Actions builds Docker image on tag creation
- [ ] **CICD-05**: GitHub Actions pushes Docker image to GitHub Container Registry
- [ ] **CICD-06**: GitHub Actions has correct permissions (packages: write)
- [ ] **CICD-07**: GitHub release created automatically from tags

### Testing

- [ ] **TEST-01**: Vitest configured for unit tests
- [ ] **TEST-02**: Test coverage for critical components
- [ ] **TEST-03**: Tests run in CI pipeline

### Quality

- [ ] **QUAL-01**: ESLint configured and passing
- [ ] **QUAL-02**: Prettier configured for code formatting
- [ ] **QUAL-03**: No TypeScript errors in build
- [ ] **QUAL-04**: Production build completes successfully
- [ ] **QUAL-05**: Docker image builds without errors

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **CONT-06**: CV page with detailed work experience
- **CONT-07**: CV page with education details
- **CONT-08**: CV page with technical skills organized by category
- **CONT-09**: Projects showcase section (3-5 featured projects)
- **CONT-10**: Project details include tech stacks used

### Design Enhancement

- **DSGN-07**: Subtle purposeful animations (respecting prefers-reduced-motion)
- **DSGN-08**: Image optimization for performance

### Infrastructure

- **INFR-07**: Performance optimization (Lighthouse score 90+)
- **INFR-08**: PDF resume download option

### Blog (v2+)

- **BLOG-01**: Blog page with post listing
- **BLOG-02**: Individual blog post pages
- **BLOG-03**: Markdown content support for posts
- **BLOG-04**: Blog post categories/tags

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CV page in v1 | Simplified scope - focus on Home and About first. CV is v2. |
| Blog functionality | Content not ready, will add in v2 when 5-10 posts available |
| Contact form with backend | Adds complexity, maintenance overhead, spam handling. Simple email/social links sufficient. |
| Docker compose configuration | Handled by separate infrastructure project outside this scope |
| DigitalOcean droplet setup | Handled by separate infrastructure project outside this scope |
| Domain DNS configuration | Already handled externally |
| Deployment automation (pulling image) | Handled by existing infrastructure, not this project's responsibility |
| Real-time chat widget | Unprofessional for portfolio, creates expectation of immediate response |
| Analytics/tracking | Privacy concerns, GDPR compliance overhead, not needed for v1 |
| Dark mode toggle | Nordic monochrome design may not require it, evaluate after launch |
| Every project ever built | Quality over quantity - will curate 3-5 best projects in v2 |
| Auto-playing media | Violates UX best practices, accessibility issues |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (To be populated by roadmapper) | | |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 0 (pending roadmap creation)
- Unmapped: 34 ⚠️

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after initial definition*
