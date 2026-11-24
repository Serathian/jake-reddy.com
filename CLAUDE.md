# Project Instructions

## Design System

**Before building any UI component or page, read the design system:**

- `design-system/nordic-developer-portfolio/MASTER.md` — global rules (colors, typography, spacing, components, anti-patterns)
- `design-system/nordic-developer-portfolio/pages/[page-name].md` — page-specific overrides (if the file exists, it takes precedence over MASTER.md)

Follow the design system exactly. Do not invent spacing, colors, border widths, or component patterns — derive them from these files.

### Key rules (summary — read the full files for details)

- **Colors:** Nordic monochrome palette. Nav links use `--color-secondary` (`#595959`). Borders use `--color-border` (`#E5E5E5`). One accent color (`#0052CC`) used sparingly.
- **Typography:** JetBrains Mono for headings/display (`font-display`), IBM Plex Sans for body (`font-body`). Follow the 1.25 type scale.
- **Spacing:** 8px base unit. `--spacing-N = N × 8px`. Use consistently — no ad-hoc values.
- **Borders:** `1px` default (`--border-thin`), `2px` for emphasis (`--border-medium`). Color `#E5E5E5` for dividers, `#000000` for strong emphasis only. Sharp corners (`border-radius: 0`).
- **Nav header:** `border-bottom: 1px solid #E5E5E5`, `background: rgba(255,255,255,0.98)` + `backdrop-filter: blur(8px)`, `max-width: 1200px`, nav links uppercase + `letter-spacing: 1px`.
- **Shadows:** Prefer borders. Shadows only when elevation is critical.
- **Cursor:** Always `cursor-pointer` on interactive elements.
- **Motion:** Transitions 200–300ms. Always respect `prefers-reduced-motion`.
- **Anti-patterns:** No rounded corners, no gradients, no emojis as icons, no heavy shadows, no centered body text.

---

## Agent skills

### Issue tracker

Issues are tracked centrally in GitHub Issues (`Serathian/website-stack` via `gh --repo Serathian/website-stack`). See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the default five-role triage label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` + `docs/adr/` at the repo root). See `docs/agents/domain.md`.
