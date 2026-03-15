---
phase: 5
slug: core-content-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest |
| **Config file** | `vitest.config.ts` — `environment: 'node'`, `globals: true` |
| **Quick run command** | `npm test -- --run` |
| **Full suite command** | `npm test -- --run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --run`
- **After every plan wave:** Run `npm test -- --run`
- **Before `/gsd:verify-work`:** Full suite must be green + manual browser verification at 375px/768px/1024px

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 0 | TEST-02, CONT-05 | unit | `npm test -- --run` | ❌ Wave 0 | ⬜ pending |
| 5-01-02 | 01 | 1 | CONT-01 | manual | Visual check at localhost:4321 | N/A | ⬜ pending |
| 5-01-03 | 01 | 1 | CONT-02 | unit | `npm test -- --run` | ❌ Wave 0 | ⬜ pending |
| 5-01-04 | 01 | 1 | NAV-03, NAV-04, NAV-05 | manual | DevTools viewport resize | N/A | ⬜ pending |
| 5-02-01 | 02 | 2 | CONT-03, CONT-04 | manual | Visual check at localhost:4321/about | N/A | ⬜ pending |
| 5-02-02 | 02 | 2 | NAV-03, NAV-04, NAV-05 | manual | DevTools viewport resize | N/A | ⬜ pending |
| 5-02-03 | 02 | 2 | CONT-05 | unit | `npm test -- --run` | ❌ Wave 0 | ⬜ pending |
| 5-02-04 | 02 | 2 | NAV-03 | manual | DevTools 375px check | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/content/highlights.test.ts` — tests `formatHighlights()` pure function for TEST-02 / CONT-02
- [ ] `src/test/content/footer-links.test.ts` — tests `getContactLinks()` pure function for CONT-05

*These test files must be created in Wave 0 before any page content tasks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Home page renders name, role, tagline | CONT-01 | Astro files are not importable in Vitest (Node env) | `npm run dev`, visit localhost:4321, confirm name/role/tagline visible |
| About page renders background + philosophy | CONT-03 | Same as above | `npm run dev`, visit localhost:4321/about, confirm all 3 sections present |
| About page Nordic lifestyle context | CONT-04 | Content verification | Same as CONT-03 — confirm Nordic lifestyle section exists |
| Layout at 375px — no horizontal overflow | NAV-03 | Visual/responsive check | DevTools → responsive mode → 375px width; confirm no overflow |
| Layout at 768px | NAV-04 | Visual/responsive check | DevTools → 768px; confirm tablet layout applies |
| Layout at 1024px+ | NAV-05 | Visual/responsive check | DevTools → 1024px+; confirm desktop layout, max-width 1200px |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
