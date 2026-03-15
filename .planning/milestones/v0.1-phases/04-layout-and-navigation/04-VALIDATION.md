---
phase: 4
slug: layout-and-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 2.1.9 (already installed and configured) |
| **Config file** | vitest.config.ts (exists at project root) |
| **Quick run command** | `npm test -- --run` |
| **Full suite command** | `npm test -- --run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (verify no TypeScript or build errors)
- **After every plan wave:** Run `npm test -- --run` (full Vitest suite)
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual check of nav in browser
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 0 | NAV-02 | unit | `npm test -- src/test/navigation/ --run -x` | ❌ W0 | ⬜ pending |
| 4-01-02 | 01 | 1 | NAV-01 | manual | `npm run build && npm run preview` (visual verify) | ✅ manual | ⬜ pending |
| 4-01-03 | 01 | 1 | NAV-01 | build | `npm run build` | ✅ existing | ⬜ pending |
| 4-01-04 | 01 | 1 | NAV-02 | unit | `npm test -- src/test/navigation/ --run -x` | ❌ W0 | ⬜ pending |
| 4-02-01 | 02 | 2 | NAV-01 | manual | `npm run build && npm run preview` (visual verify) | ✅ manual | ⬜ pending |
| 4-02-02 | 02 | 2 | NAV-01 | build | `npm run build` | ✅ existing | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/navigation/active-link.test.ts` — unit test for pathname-to-active-state logic (NAV-02)

*NAV-01 fixed positioning is a visual CSS property — manual-only verification is appropriate for current Vitest (node env, no DOM). All other behaviors have automated verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Header is fixed on scroll | NAV-01 | CSS visual property; Vitest runs in Node, no DOM/browser | Load in dev server, scroll down, verify header stays at top |
| Active link highlighted correctly | NAV-02 | Visual rendering | Navigate to Home and About pages, verify correct link is highlighted |
| Footer links present | NAV-01 | HTML presence + visual | Inspect footer, verify GitHub, LinkedIn, email links render |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
