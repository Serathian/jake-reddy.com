# AGENTS.md — jake-reddy.com

Operational guidelines and contracts for AI agents working in `jake-reddy.com`.

---

## Technical Stack & Constraints

| Item | Details |
| :--- | :--- |
| Framework | Astro 5 |
| Styling | Tailwind CSS |
| Local Port | `http://localhost:3002` |
| Production Container | `ghcr.io/Serathian/jake-reddy.com:latest` |
| Web Server | Nginx Alpine (non-root `nginx` user, port 80) |

---

## Agent Rules

1. **Static First**: Keep the site static and ultra-fast. Avoid adding unnecessary client-side framework components unless interactive capabilities genuinely require them.
2. **Accessible HTML**: Follow semantic HTML5 standards (`<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`, proper heading hierarchies).
3. **Type & Content Safety**: All content frontmatter is validated via Astro Content Collections schemas. Run `npm run typecheck` and `npm test` before committing.
4. **Release Tagging**: Releases triggered via `v*.*.*` git tags publish both the semantic version tag and `:latest` to GHCR, triggering the Watchtower webhook.
