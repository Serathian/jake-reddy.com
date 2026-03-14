---
phase: 3
slug: design-system-implementation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 2.1.9 (already installed) |
| **Config file** | vitest.config.ts (exists from Phase 1) |
| **Quick run command** | `npm test -- src/test/design-system/ -x` |
| **Full suite command** | `npm test -- --run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- src/test/design-system/ -x`
- **After every plan wave:** Run `npm test -- --run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | DSGN-01 | unit | `npm test -- src/test/design-system/colors.test.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | DSGN-02 | unit | `npm test -- src/test/design-system/typography.test.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | DSGN-03 | unit | `npm test -- src/test/design-system/spacing.test.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-04 | 01 | 1 | DSGN-04 | unit | `npm test -- src/test/design-system/borders.test.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-05 | 01 | 1 | DSGN-05 | unit | `npm test -- src/test/design-system/contrast.test.ts -x` | ❌ W0 | ⬜ pending |
| 03-01-06 | 01 | 1 | DSGN-06 | unit | `npm test -- src/test/design-system/effects.test.ts -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/design-system/colors.test.ts` — validates monochrome palette (DSGN-01)
- [ ] `src/test/design-system/typography.test.ts` — validates font families (DSGN-02)
- [ ] `src/test/design-system/spacing.test.ts` — validates 8px grid (DSGN-03)
- [ ] `src/test/design-system/borders.test.ts` — validates sharp corners (DSGN-04)
- [ ] `src/test/design-system/contrast.test.ts` — validates WCAG AAA contrast (DSGN-05)
- [ ] `src/test/design-system/effects.test.ts` — validates borders/shadows (DSGN-06)
- [ ] `src/test/design-system/test-utils.ts` — shared contrast calculation utilities

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual verification of font rendering | DSGN-02 | Font rendering quality requires human visual inspection | 1. Run `npm run dev` 2. Open localhost:4321 3. Verify JetBrains Mono renders crisp on headings 4. Verify IBM Plex Sans renders clean on body text |
| Overall design aesthetic check | All DSGN-* | Nordic minimalist aesthetic is subjective | 1. View compiled site 2. Confirm overall appearance is clean, minimal, and striking 3. Check spacing feels consistent and intentional |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
