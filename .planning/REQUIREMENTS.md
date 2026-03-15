# Requirements: jake-reddy.com

**Defined:** 2026-03-12
**Core Value:** Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Content

- [x] **CONT-01**: Home page displays professional introduction (name, role, tagline)
- [x] **CONT-02**: Home page includes brief professional highlights
- [x] **CONT-03**: About page displays background and professional philosophy
- [x] **CONT-04**: About page includes Nordic lifestyle context
- [x] **CONT-05**: Contact information visible (email, GitHub, LinkedIn links)

### Design System

- [ ] **DSGN-01**: Nordic monochrome color palette implemented (black #000000, white #FFFFFF, grays)
- [ ] **DSGN-02**: Typography system implemented (JetBrains Mono headings, IBM Plex Sans body)
- [ ] **DSGN-03**: 8px base spacing grid applied consistently
- [ ] **DSGN-04**: Sharp corners (0px border-radius) used throughout
- [ ] **DSGN-05**: High contrast design (WCAG AAA compliance)
- [ ] **DSGN-06**: Minimal shadows with crisp borders

### Navigation & Layout

- [x] **NAV-01**: Fixed navigation header on all pages
- [x] **NAV-02**: Navigation includes Home and About links
- [x] **NAV-03**: Responsive layout works on mobile (375px+)
- [x] **NAV-04**: Responsive layout works on tablet (768px+)
- [x] **NAV-05**: Responsive layout works on desktop (1024px+)

### Infrastructure

- [x] **INFR-01**: Astro project configured with TypeScript
- [x] **INFR-02**: Docker multi-stage build (Node.js build + Nginx runtime)
- [x] **INFR-03**: Dockerfile includes proper .dockerignore configuration
- [x] **INFR-04**: Docker image runs as non-root user
- [x] **INFR-05**: Nginx configured with try_files for static routing
- [x] **INFR-06**: Health check endpoint configured

### CI/CD

- [x] **CICD-01**: GitHub Actions workflow for linting
- [x] **CICD-02**: GitHub Actions workflow for TypeScript type checking
- [x] **CICD-03**: GitHub Actions workflow for running tests
- [x] **CICD-04**: GitHub Actions builds Docker image on tag creation
- [x] **CICD-05**: GitHub Actions pushes Docker image to GitHub Container Registry
- [x] **CICD-06**: GitHub Actions has correct permissions (packages: write)
- [x] **CICD-07**: GitHub release created automatically from tags

### Testing

- [x] **TEST-01**: Vitest configured for unit tests
- [x] **TEST-02**: Test coverage for critical components
- [x] **TEST-03**: Tests run in CI pipeline

### Quality

- [x] **QUAL-01**: ESLint configured and passing
- [x] **QUAL-02**: Prettier configured for code formatting
- [x] **QUAL-03**: No TypeScript errors in build
- [x] **QUAL-04**: Production build completes successfully
- [x] **QUAL-05**: Docker image builds without errors

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
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| CONT-04 | Phase 5 | Complete |
| CONT-05 | Phase 5 | Complete |
| DSGN-01 | Phase 3 | Pending |
| DSGN-02 | Phase 3 | Pending |
| DSGN-03 | Phase 3 | Pending |
| DSGN-04 | Phase 3 | Pending |
| DSGN-05 | Phase 3 | Pending |
| DSGN-06 | Phase 3 | Pending |
| NAV-01 | Phase 4 | Complete |
| NAV-02 | Phase 4 | Complete |
| NAV-03 | Phase 5 | Complete |
| NAV-04 | Phase 5 | Complete |
| NAV-05 | Phase 5 | Complete |
| INFR-01 | Phase 1 | Complete (Plan 01-01) |
| INFR-02 | Phase 1 | Complete |
| INFR-03 | Phase 1 | Complete |
| INFR-04 | Phase 1 | Complete |
| INFR-05 | Phase 1 | Complete |
| INFR-06 | Phase 1 | Complete |
| CICD-01 | Phase 2 | Complete |
| CICD-02 | Phase 2 | Complete |
| CICD-03 | Phase 2 | Complete |
| CICD-04 | Phase 2 | Complete |
| CICD-05 | Phase 2 | Complete |
| CICD-06 | Phase 2 | Complete |
| CICD-07 | Phase 2 | Complete |
| TEST-01 | Phase 1 | Complete (Plan 01-02) |
| TEST-02 | Phase 5 | Complete |
| TEST-03 | Phase 2 | Complete |
| QUAL-01 | Phase 1 | Complete (Plan 01-02) |
| QUAL-02 | Phase 1 | Complete (Plan 01-02) |
| QUAL-03 | Phase 1 | Complete (Plan 01-01) |
| QUAL-04 | Phase 1 | Complete |
| QUAL-05 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37 ✓
- Unmapped: 0 ✓

**Phase Distribution:**
- Phase 1 (Foundation & Infrastructure): 12 requirements
- Phase 2 (CI/CD Pipeline): 8 requirements
- Phase 3 (Design System Implementation): 6 requirements
- Phase 4 (Layout & Navigation): 2 requirements
- Phase 5 (Core Content Pages): 9 requirements

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after Plan 01-02 completion*
