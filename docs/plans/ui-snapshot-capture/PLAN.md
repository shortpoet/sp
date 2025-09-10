# UI Snapshot Capture Plan

## Executive Summary

Establish a repeatable, headless process to capture UI screenshots (PNGs) for key routes of shortpoet.com and the local build. Store outputs under `docs/ui-snapshot-capture/ui/` and optionally publish them as CI artifacts. This supports documentation, reviews, and shared context without changing application behavior.

## Scope

- Headless capture script (Playwright or Chromium) runnable locally and in CI.
- Target routes: `/`, `/about`, `/articles`, `/articles/learning-to-unit-test-en`, `/resume`, `/pdf`.
- Output management and docs references.
- Optional CI job to generate and upload snapshots.
- Out of scope: visual regression testing, app refactors, styling changes.

## Current State

- App: Vue 3 + Vite SSG under `app/`; routes listed above; Markdown articles and i18n configured.
- No existing snapshot tooling in repo. CI builds `app/build` and deploys.
- Sitemap currently lists known routes; production base is `https://shortpoet.com`.

## Risks

- Rendering differences across environments (fonts, GPU, timing).
- Network flakiness for production captures.
- Animations/progress bars causing inconsistent screenshots.
- Playwright install size/time in CI (can be on-demand via `pnpm dlx`).

## Implementation Steps

1) Define Routes

   - Create a small route list (inline in script or `docs/ui-snapshot-capture/routes.json`) containing: `/`, `/about`, `/articles`, `/articles/learning-to-unit-test-en`, `/resume`, `/pdf`.

2) Capture Script (recommended: Playwright)

   - Add `scripts/capture.mjs`:
     - Inputs: `baseUrl`, `outDir`, optional `--fullPage` and viewport.
     - For each route: navigate with `waitUntil: 'networkidle'`, pause briefly (e.g., 250–500ms), take PNG screenshot to `outDir/<slug>.png`.
     - Disable animations if needed via injected CSS to reduce variance.
   - Alternative (no dependencies): use system Chrome/Chromium headless with `--screenshot` per route.

3) Local Capture

   - Build/preview:
     - `cd app && pnpm build && pnpm preview --host --port 4173`
   - Capture:
     - `node scripts/capture.mjs http://localhost:4173 docs/ui-snapshot-capture/ui`

4) Production Capture

   - `node scripts/capture.mjs https://shortpoet.com docs/ui-snapshot-capture/ui`

5) CI (Optional)

   - Add a job to build the app, serve `app/build` (e.g., `npx http-server app/build -p 4173 -s &`), run capture script, and upload `docs/ui-snapshot-capture/ui/*` as an artifact. Keep it manual/dispatch to control cost.

## Testing

- Verify PNGs exist for each route and are visually plausible (open locally).
- Confirm filenames match routes and are stable across runs.
- Validate both local and production captures work; document any differences.

## Rollback

- Remove `scripts/capture.mjs`, route list, and any CI job. No data or infra impact. Documentation can continue referencing last known snapshots.

## Success Criteria

- One command generates snapshots for all target routes, locally and against production.
- Images are stored under `docs/ui-snapshot-capture/ui/` and can be reviewed in PRs (via artifact or repo images).
- Plan is documented in README/PLAN so contributors can reproduce captures.
