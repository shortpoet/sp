# README Refresh Plan — Documentation

## Executive Summary

Clarify and streamline repository docs without changing code. Make the root README the single source for project overview, structure, commands, routing, testing, CI/infra, and SEO notes. Cross‑reference AGENTS.md and keep Terraform docs markers.

## Scope

- Update/maintain: `README.md`, `AGENTS.md`.
- Add optional `docs/index.md` linking plan/review.
- Do not modify code or CI; documentation-only changes.

## Current State

- `README.md` already refreshed with structure, commands, routing, testing, CI/infra, and an SEO tip.
- `AGENTS.md` present with contributor guidelines.

## Implementation Steps

0) Discovery & Context
   - Web scan: review production at `https://shortpoet.com` (headers, sitemap, robots, key routes), and perform a quick search for public references (e.g., site:shortpoet.com).
   - Codebase scan: inventory routes, commands, and tests using fast search (prefer `rg`), confirm content sources (Markdown, locales), and CI workflows.
   - UI snapshot (optional): capture a landing + articles screenshot to anchor shared context. If automation is unavailable, include a manual screenshot or attach a build-time render.
1) Review `README.md` for accuracy after code-side fixes are merged.
2) Add concise “Troubleshooting” (pnpm version, Vitest vs Jest note).
3) Link to infra workflows and `.iac/` usage at a high level.
4) Ensure Terraform docs block remains intact.
5) (Optional) Create `docs/index.md` linking PLAN/REVIEW for future iterations.

## Testing

- Spell/format check; validate links and commands by running `pnpm -v`, `pnpm dev`, `pnpm build`, `pnpm test` locally.
- Verify discovery artifacts are included: brief web scan notes, code scan summary (routes/commands/tests), and a UI snapshot image if available.

## Success Criteria

- README is accurate, concise (200–400 words), and task-focused.
- Contributors can set up, run, test, and understand CI at a glance.
- Docs match the actual routes and tooling.
- Discovery section present (web + codebase scan), with an attached or referenced UI snapshot.
