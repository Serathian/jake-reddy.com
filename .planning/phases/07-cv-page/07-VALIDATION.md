---
phase: 7
slug: cv-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.4 |
| **Config file** | vitest.config.ts (using Astro's getViteConfig) |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test && npm run build` |
| **Estimated runtime** | ~5 seconds (tests) + ~15 seconds (build) = ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test`
- **After every plan wave:** Run `npm test && npm run build`
- **Before `/gsd-verify-work`:** Full suite must be green + manual responsive check
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 0 | DEBT-01 | unit | `grep --color=never "color-secondary\\|color-border" src/styles/theme.css` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 0 | DEBT-02 | unit | `grep --color=never "bg-white/98 backdrop-blur" src/components/layout/Header.astro` | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 0 | DEBT-03 | unit | `! grep --color=never "text-gray-700" src/pages/index.astro` | ❌ W0 | ⬜ pending |
| 07-01-04 | 01 | 0 | DEBT-04 | unit | `! grep --color=never "text-gray-600" src/components/layout/Footer.astro` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 1 | CV-01 | integration | `npm run build` | ✅ existing | ⬜ pending |
| 07-02-02 | 02 | 1 | CV-02 | unit | `npm test -- --run src/test/content/cv-content.test.ts` | ❌ W0 | ⬜ pending |
| 07-02-03 | 02 | 1 | CV-03 | unit | `npm test -- --run src/test/content/cv-content.test.ts` | ❌ W0 | ⬜ pending |
| 07-02-04 | 02 | 1 | CV-04 | unit | `npm test -- --run src/test/content/cv-content.test.ts` | ❌ W0 | ⬜ pending |
| 07-02-05 | 02 | 1 | CV-05 | unit | `npm test -- --run src/test/content/cv-content.test.ts` | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 1 | CV-08 | unit | `npm test -- --run src/test/navigation/active-link.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/content/cv-content.test.ts` — stubs for CV-02, CV-03, CV-04, CV-05
- [ ] Update `src/test/navigation/active-link.test.ts` — add CV route tests for CV-08

*Existing infrastructure covers all phase requirements (Vitest configured in Phase 6).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Content accuracy | CV-06 | Requires Jake's validation of work experience details | Review work experience, achievements, education, and skills for factual accuracy |
| Responsive layout | CV-07 | Visual inspection needed for layout quality | Check at 375px (mobile), 768px (tablet), 1024px+ (desktop) — verify readable spacing, no overflow, proper line wrapping |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
