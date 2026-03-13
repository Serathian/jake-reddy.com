# Phase 2: CI/CD Pipeline - Research

**Researched:** 2026-03-13
**Domain:** GitHub Actions CI/CD, Docker image publishing, automated releases
**Confidence:** HIGH

## Summary

Phase 2 automates the quality checks validated in Phase 1 (lint, format, typecheck, test, build) and adds Docker image publishing to GitHub Container Registry on tag creation, plus automated GitHub release creation. The research confirms GitHub Actions is the standard solution with excellent TypeScript/Node.js support, GHCR integration via `GITHUB_TOKEN`, and automated release workflows.

**Key findings:**
- GitHub Actions provides native integration with GHCR and GitHub Releases via `GITHUB_TOKEN`
- Standard approach: separate CI workflow (push/PR) and release workflow (tags)
- Docker metadata action generates tags following semver conventions automatically
- Node.js 22.12.0+ required (matches package.json engines field)
- Existing ci.yml needs expansion for full quality checks

**Primary recommendation:** Use two workflows - expand existing ci.yml for quality checks, add separate release.yml for Docker publishing and GitHub releases on tags.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CICD-01 | GitHub Actions workflow for linting | Official actions/checkout@v4 + actions/setup-node@v4, npm run lint |
| CICD-02 | GitHub Actions workflow for TypeScript type checking | npm run typecheck (astro check) in workflow |
| CICD-03 | GitHub Actions workflow for running tests | npm test (vitest) in workflow |
| CICD-04 | GitHub Actions builds Docker image on tag creation | docker/build-push-action@v6 triggered by push tags event |
| CICD-05 | GitHub Actions pushes Docker image to GitHub Container Registry | docker/login-action@v3 with ghcr.io + GITHUB_TOKEN |
| CICD-06 | GitHub Actions has correct permissions (packages: write) | permissions: contents: read, packages: write in workflow |
| CICD-07 | GitHub release created automatically from tags | softprops/action-gh-release@v2 with generate_release_notes: true |
| TEST-03 | Tests run in CI pipeline | vitest execution in quality checks workflow |
</phase_requirements>

## Standard Stack

### Core Actions
| Action | Version | Purpose | Why Standard |
|--------|---------|---------|--------------|
| actions/checkout | v4 | Check out repository code | Official GitHub action, universal adoption |
| actions/setup-node | v4 | Install Node.js environment | Official GitHub action, caching support |
| docker/login-action | v3 | Authenticate to container registries | Official Docker action, supports GHCR/Docker Hub |
| docker/metadata-action | v5 | Generate Docker tags and labels | Official Docker action, semver-aware tagging |
| docker/build-push-action | v6 | Build and push Docker images | Official Docker action, BuildKit support |
| softprops/action-gh-release | v2 | Create GitHub releases | Most popular release action (5.5k stars), tag-driven |

### Supporting Configuration
| File | Purpose | When to Use |
|------|---------|-------------|
| .github/workflows/ci.yml | Quality checks on every push/PR | Already exists, needs expansion |
| .github/workflows/release.yml | Docker publish + release on tags | Create new for tag-triggered events |

**Installation:** None required - GitHub Actions marketplace provides all actions. Update existing workflows.

**Node.js Version:** 22.12.0+ (specified in package.json engines field, use actions/setup-node@v4 with node-version: 22)

## Architecture Patterns

### Recommended Workflow Structure
```
.github/
├── workflows/
│   ├── ci.yml           # Quality checks (push, pull_request)
│   └── release.yml      # Docker + GitHub release (push tags)
```

### Pattern 1: Separate CI and Release Workflows
**What:** Quality checks run on every push/PR, Docker publishing only on tags
**When to use:** Standard pattern for production deployments
**Why:** Prevents unnecessary Docker builds on every commit, separates concerns

**CI Workflow (ci.yml):**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
      
      - name: Type check
        run: npm run typecheck
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
```

**Release Workflow (release.yml):**
```yaml
# Source: GitHub official docs
name: Release

on:
  push:
    tags:
      - 'v*.*.*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: write      # Create releases
      packages: write      # Push to GHCR
      attestations: write  # Generate attestations
      id-token: write      # OIDC token
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
      
      - name: Build and push Docker image
        id: push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
      
      - name: Generate artifact attestation
        uses: actions/attest-build-provenance@v3
        with:
          subject-name: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          subject-digest: ${{ steps.push.outputs.digest }}
          push-to-registry: true
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```

### Pattern 2: Tag-Based Triggering
**What:** Workflows triggered by semantic version tags (v1.2.3)
**When to use:** Production releases only (not feature branches)
**Example:**
```yaml
on:
  push:
    tags:
      - 'v*.*.*'  # Matches v1.2.3, v0.1.0, etc.
```

### Pattern 3: Docker Metadata Generation
**What:** docker/metadata-action generates semver-compliant tags automatically
**When to use:** All Docker image publishing workflows
**Tag output for v1.2.3:**
- `ghcr.io/user/repo:1.2.3` (full version)
- `ghcr.io/user/repo:1.2` (minor version)
- `ghcr.io/user/repo:1` (major version)
- `ghcr.io/user/repo:latest` (latest release)

### Anti-Patterns to Avoid
- **Running Docker builds on every commit:** Wastes CI minutes, slows PR feedback
- **Using personal access tokens unnecessarily:** `GITHUB_TOKEN` has required permissions
- **Manual release note writing:** Use `generate_release_notes: true` for automatic changelog
- **Missing workflow permissions:** Forgetting `packages: write` causes silent failures
- **Node version mismatch:** CI must match package.json engines field (22.12.0+)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Docker tag generation | Custom bash scripts parsing git tags | docker/metadata-action | Handles semver edge cases (prereleases, major version zero), generates OCI labels |
| GitHub release creation | Manual gh CLI commands | softprops/action-gh-release | Automatic release notes from commits, handles asset uploads, idempotent |
| Node.js caching | Manual npm cache paths | actions/setup-node with cache: 'npm' | Automatic cache key generation, cross-platform support |
| Container registry auth | Manual docker login commands | docker/login-action | Handles token expiration, multiple registries, secure credential storage |
| CI job matrix | Duplicate workflow files | GitHub Actions matrix strategy | Single source of truth, parallel execution, reduced maintenance |

**Key insight:** GitHub Actions marketplace provides battle-tested actions for common CI/CD patterns. Custom scripts introduce maintenance burden and miss edge cases handled by community actions.

## Common Pitfalls

### Pitfall 1: Missing Workflow Permissions
**What goes wrong:** Docker push fails with "Permission denied" or "403 Forbidden"
**Why it happens:** Default `GITHUB_TOKEN` has read-only access by default
**How to avoid:** Explicitly declare permissions at job level
**Warning signs:** Workflow succeeds until docker push step, cryptic authentication errors
**Solution:**
```yaml
jobs:
  docker:
    permissions:
      contents: write    # For releases
      packages: write    # For GHCR
```

### Pitfall 2: Node Version Drift
**What goes wrong:** CI passes but local development fails (or vice versa)
**Why it happens:** CI uses different Node.js version than local environment
**How to avoid:** Match actions/setup-node version to package.json engines field
**Warning signs:** "Unexpected token" errors in CI, dependency installation failures
**Solution:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22  # Match package.json engines.node
```

### Pitfall 3: Workflow Trigger Conflicts
**What goes wrong:** CI workflow runs twice (push + tag creation both trigger)
**Why it happens:** Push event includes tag pushes unless filtered
**How to avoid:** Use separate workflows for branches vs tags
**Warning signs:** Duplicate workflow runs for same commit, wasted CI minutes
**Solution:**
```yaml
# ci.yml - branches only
on:
  push:
    branches: [main]

# release.yml - tags only
on:
  push:
    tags: ['v*.*.*']
```

### Pitfall 4: Docker Build Context Issues
**What goes wrong:** Docker build can't find files, or includes .git directory
**Why it happens:** Default context is entire repository root
**How to avoid:** Ensure .dockerignore exists (Phase 1 verified this)
**Warning signs:** Slow Docker builds, large image sizes, missing dist/ files
**Solution:** Already handled in Phase 1 - .dockerignore prevents .git, node_modules inclusion

### Pitfall 5: Test Failures Not Blocking Deployment
**What goes wrong:** Broken code gets released because tests didn't gate deployment
**Why it happens:** Release workflow doesn't depend on CI workflow success
**How to avoid:** CI workflow must pass before Docker publishing
**Warning signs:** Flaky tests in production, bugs in tagged releases
**Solution:** GitHub automatically enforces this - release workflow requires passing checks on protected branches, but use branch protection rules for defense in depth

## Code Examples

### Complete CI Workflow (Expansion of Existing ci.yml)
```yaml
# Source: GitHub official docs + project Phase 1 verification
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
      
      - name: Type check
        run: npm run typecheck
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
```

### Complete Release Workflow (New File)
```yaml
# Source: GitHub official docs
name: Release

on:
  push:
    tags:
      - 'v*.*.*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  docker-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
      attestations: write
      id-token: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}},enable=${{ !startsWith(github.ref, 'refs/tags/v0.') }}
      
      - name: Build and push Docker image
        id: push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
      
      - name: Generate artifact attestation
        uses: actions/attest-build-provenance@v3
        with:
          subject-name: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          subject-digest: ${{ steps.push.outputs.digest }}
          push-to-registry: true
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```

### Docker Metadata Tag Examples
```yaml
# For tag v1.2.3, generates:
# - ghcr.io/user/repo:1.2.3
# - ghcr.io/user/repo:1.2
# - ghcr.io/user/repo:1
# - ghcr.io/user/repo:latest

# For tag v0.1.2 (major version zero):
# - ghcr.io/user/repo:0.1.2
# - ghcr.io/user/repo:0.1
# - ghcr.io/user/repo:latest
# (No :0 tag because major version zero is unstable)

# For tag v2.0.0-beta.1 (prerelease):
# - ghcr.io/user/repo:2.0.0-beta.1
# (No :2.0, :2, or :latest because prereleases are not stable)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| docker/build-push-action@v2 | docker/build-push-action@v6 | 2024 | BuildKit 0.12+ support, attestations, annotations |
| Manual release note writing | generate_release_notes: true | 2022 | Automatic changelog from commits and PRs |
| Personal access tokens for GHCR | GITHUB_TOKEN with packages: write | 2021 | No secret management, automatic token rotation |
| docker/metadata-action@v3 | docker/metadata-action@v5 | 2024 | Better semver handling, OCI annotations |
| Node.js 16 | Node.js 22 LTS | 2024 | Active LTS, matches project requirement |

**Deprecated/outdated:**
- **actions/setup-node@v2:** Use v4 for better caching and Node.js 22 support
- **docker/login-action@v1:** Use v3 for improved security and OIDC support
- **Manual docker build commands:** Use build-push-action for BuildKit features
- **Manually constructed semver tags:** Use metadata-action for automatic tag generation

## Open Questions

None - all Phase 2 requirements have clear implementation paths with official documentation.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.1.9 |
| Config file | vitest.config.ts (exists) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CICD-01 | Lint workflow runs npm run lint | integration | Verify in workflow run logs | ✅ Workflow test |
| CICD-02 | Type check workflow runs npm run typecheck | integration | Verify in workflow run logs | ✅ Workflow test |
| CICD-03 | Test workflow runs npm test | integration | Verify in workflow run logs | ✅ Workflow test |
| CICD-04 | Docker image builds on tag | integration | Verify in workflow run logs | ✅ Workflow test |
| CICD-05 | Docker image pushes to GHCR | integration | Check GHCR package page | ✅ Manual check |
| CICD-06 | Workflow has packages: write permission | static | grep permissions release.yml | ✅ Static check |
| CICD-07 | GitHub release created from tag | integration | Check releases page | ✅ Manual check |
| TEST-03 | Tests run in CI pipeline | integration | Verify in workflow run logs | ✅ Workflow test |

### Sampling Rate
- **Per task commit:** Quick local check (lint + test)
- **Per wave merge:** Full CI workflow must pass on main branch
- **Phase gate:** Create test tag, verify Docker image published and release created

### Wave 0 Gaps
None - Phase 2 is infrastructure only. Validation happens through:
1. Workflow syntax validation (GitHub Actions automatically checks)
2. Test tag creation (e.g., v0.0.1-test) to verify end-to-end flow
3. Manual verification of GHCR package and GitHub release

## Sources

### Primary (HIGH confidence)
- GitHub Docs: Publishing Docker images - https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images
- GitHub Docs: Automatic token authentication - https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication
- GitHub Docs: Workflow events - https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows
- GitHub Docs: Automated release notes - https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
- Docker metadata-action README - https://github.com/docker/metadata-action (official Docker action)
- softprops/action-gh-release - https://github.com/marketplace/actions/gh-release (5.5k stars, most popular release action)

### Secondary (MEDIUM confidence)
- Project package.json (engines.node: ">=22.12.0") - verified Node.js version requirement
- Project vitest.config.ts - confirmed test framework configuration
- Project Dockerfile - confirmed multi-stage build (Phase 1 complete)

### Tertiary (LOW confidence)
None - all findings verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official GitHub and Docker actions with extensive documentation
- Architecture: HIGH - Official GitHub docs provide complete workflow examples
- Pitfalls: HIGH - Common issues documented in GitHub Actions troubleshooting guides

**Research date:** 2026-03-13
**Valid until:** 2026-06-13 (90 days - GitHub Actions is stable, infrequent breaking changes)

**Key validation sources:**
- All workflow examples from official GitHub documentation (published 2024-2026)
- Docker actions pinned to latest stable versions (v3-v6)
- Node.js 22 LTS (active maintenance until 2025-10-21, security until 2027-04-30)
