---
phase: 2
slug: cicd-pipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 2.1.9 |
| **Config file** | vitest.config.ts (exists from Phase 1) |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint && npm test`
- **After every plan wave:** Full CI workflow must pass on main branch
- **Before `/gsd-verify-work`:** Full suite must be green + workflow test tag verified
- **Max feedback latency:** 5 seconds (local checks)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD-01 | 01 | 1 | CICD-01 | integration | Verify in workflow run logs | ✅ Workflow test | ⬜ pending |
| TBD-02 | 01 | 1 | CICD-02 | integration | Verify in workflow run logs | ✅ Workflow test | ⬜ pending |
| TBD-03 | 01 | 1 | CICD-03 | integration | Verify in workflow run logs | ✅ Workflow test | ⬜ pending |
| TBD-04 | 02 | 2 | CICD-04 | integration | Verify in workflow run logs | ✅ Workflow test | ⬜ pending |
| TBD-05 | 02 | 2 | CICD-05 | integration | Check GHCR package page | ✅ Manual check | ⬜ pending |
| TBD-06 | 02 | 2 | CICD-06 | static | grep permissions release.yml | ✅ Static check | ⬜ pending |
| TBD-07 | 02 | 2 | CICD-07 | integration | Check releases page | ✅ Manual check | ⬜ pending |
| TBD-08 | 01 | 1 | TEST-03 | integration | Verify in workflow run logs | ✅ Workflow test | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

Phase 2 is infrastructure-only work (GitHub Actions workflows). Validation happens through:
1. Workflow syntax validation (GitHub Actions automatically checks YAML on push)
2. Test tag creation (e.g., v0.0.1-test) to verify end-to-end release flow
3. Manual verification of GHCR package and GitHub release pages

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Docker image published to GHCR | CICD-05 | External registry UI | Visit https://github.com/{user}/{repo}/pkgs/container/{name} after tag push |
| GitHub release created | CICD-07 | External GitHub UI | Visit https://github.com/{user}/{repo}/releases after tag push |

Automated verification possible via GitHub API but adds complexity. Manual checks during phase verification are sufficient for two-item list.

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
