# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v0.1 — Portfolio MVP

**Shipped:** 2026-03-15
**Phases:** 5 | **Plans:** 15 | **Sessions:** ~12

### What Was Built

- Astro 6.0.4 static site with TypeScript strict mode, Docker multi-stage build, and Nginx serving
- GitHub Actions CI/CD: linting + typecheck + tests on every push, Docker publish to GHCR + GitHub release on tags
- Nordic minimalist design system: Tailwind 4 tokens, JetBrains Mono + IBM Plex Sans, 8px grid, sharp corners, WCAG AAA
- Fixed navigation header with active-link detection, shared BaseLayout, and Footer with contact links
- Home page (Hero + Highlights) and About page (Background, Philosophy, Nordic Life) — responsive at 375px/768px/1024px+

### What Worked

- GSD workflow phases were well-sequenced: infrastructure → CI/CD → design system → layout → content. No rework from wrong ordering.
- Mirror-logic test pattern (inline functions in test files, no .astro imports) solved Astro component testing cleanly
- Human verification checkpoints caught visual issues before they compounded (nav system, responsive layout)
- Audit-before-complete workflow surfaced tech debt clearly without blocking shipping

### What Was Inefficient

- ROADMAP.md had inconsistent checkbox state throughout (some `[ ]` for complete phases) — documentation drift from execution
- DSGN-01–06 requirements went unchecked in REQUIREMENTS.md despite Phase 3 VERIFICATION confirming all passed — documentation gap required audit clarification
- Footer and Home page color deviations (`text-gray-600`, `text-gray-700`) slipped through despite design system review session — more thorough automated token checking would help
- Vitest config and test script tech debt identified late (audit stage) rather than during Phase 1

### Patterns Established

- **Mirror-logic tests**: Content data extracted as inline functions in test files — avoids .astro import complexity while ensuring content correctness
- **Phase verification + human checkpoint**: Automated verifier + human approval gate for visual/responsive work
- **Design system compliance session**: Dedicated review pass after Phase 4 to align components with MASTER.md — effective but could be baked into plans

### Key Lessons

1. Document completion state accurately as you go — retroactive ROADMAP checkbox fixes create confusion about what's actually done
2. Design token strictness requires enforcement at the task level, not just a design review pass — add explicit token checks to plan task definitions
3. Vitest/Astro config assumptions should be validated in Phase 1, not discovered at audit time — add an integration smoke test task

### Cost Observations

- Model: claude-sonnet-4-6 throughout (balanced profile)
- Sessions: ~12 across 13 days
- Notable: Context reuse via claude-mem reduced re-reading significantly; session context index saved estimated 87% token overhead on recall

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v0.1 | ~12 | 5 | Initial baseline — GSD workflow established for Astro portfolio |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v0.1 | ~8 unit tests | highlights, footer links, active-link | 0 (all justified deps) |

### Top Lessons (Verified Across Milestones)

1. Phase sequencing matters — infrastructure before design before content avoids rework
2. Visual/responsive validation requires human checkpoints; automated class checks are necessary but not sufficient
