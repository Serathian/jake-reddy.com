---
phase: 1
slug: foundation-infrastructure
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 2.x |
| **Config file** | `vitest.config.ts` (Wave 0 creates) |
| **Quick run command** | `npm run lint && npm run typecheck` |
| **Full suite command** | `npm run build && docker build --no-cache -t test .` |
| **Estimated runtime** | ~10 seconds (quick), ~90 seconds (full) |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint && npm run typecheck`
- **After every plan wave:** Run `npm run build && docker build --no-cache -t test .`
- **Before `/gsd-verify-work`:** Full suite must be green + Docker image <100MB + health check passing
- **Max feedback latency:** 10 seconds (quick checks), 90 seconds (full build)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | 0 | TEST-01 | unit | `npm test -- example.test.ts` | ❌ W0 | ⬜ pending |
| TBD | TBD | 0 | QUAL-01 | unit | `npm run lint` | ❌ W0 | ⬜ pending |
| TBD | TBD | 0 | QUAL-02 | unit | `npm run format:check` | ❌ W0 | ⬜ pending |
| TBD | TBD | 0 | QUAL-03 | unit | `npm run typecheck` | ❌ W0 | ⬜ pending |
| TBD | TBD | 0 | QUAL-04 | unit | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest setup with `getViteConfig()` helper (TEST-01)
- [ ] `src/test/example.test.ts` — Example test to verify Vitest works (TEST-01)
- [ ] `.eslintrc.json` or `eslint.config.js` — ESLint configuration (QUAL-01)
- [ ] `.prettierrc` — Prettier configuration with Astro plugin (QUAL-02)
- [ ] `tsconfig.json` — TypeScript configuration extending astro/tsconfigs/base (QUAL-03)
- [ ] `Dockerfile` — Multi-stage build with health check (INFR-02, INFR-04, INFR-06)
- [ ] `nginx.conf` — Nginx configuration with try_files directive (INFR-05)
- [ ] `.dockerignore` — Docker build exclusions (INFR-03)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Astro project initializes with TypeScript | INFR-01 | Scaffolding verification | Verify `astro.config.mjs`, `tsconfig.json`, `src/` directory exist |
| Docker builds multi-stage image | INFR-02 | Build artifact inspection | Run `docker build -t test . && docker images test` → verify <100MB |
| .dockerignore excludes node_modules, includes src | INFR-03 | Build context inspection | Verify `.dockerignore` content + watch `docker build` transfer size |
| Container runs as non-root user | INFR-04 | Runtime security check | Run `docker run --rm test whoami` → should not show "root" |
| Nginx try_files prevents 404 on direct navigation | INFR-05 | Behavioral verification | Run container, access http://localhost/about directly → should not 404 |
| Health check endpoint returns 200 | INFR-06 | Container health inspection | Run `docker inspect --format='{{.State.Health.Status}}' <container>` → "healthy" |
| Docker image builds without errors | QUAL-05 | Build process verification | Run `docker build --no-cache -t test .` → exit code 0, no errors |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s (quick), < 90s (full)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending (will be approved after Wave 0 complete)
