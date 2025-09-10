# README Refresh Plan — Code Touches

## Executive Summary

Apply minimal code/config changes to align the site with documentation: correct sitemap hostname, fix ESLint env reference, update article links, and normalize test discovery. Keep scope small and reversible.

## Scope

- Vite/SSG: `app/vite.config.ts` (sitemap hostname; Vitest include).
- ESLint: `app/.eslintrc.esm` (env reference).
- UI: `app/src/components/Articles/ArticleList.vue` (link paths).
- CI/tooling (optional): pnpm version alignment via Corepack in workflows.

## Current State

- Sitemap outputs `http://localhost` in production.
- ESLint uses `import.meta.envNODE_ENV` (typo) instead of `import.meta.env.NODE_ENV`.
- Article list links to `/blog/*` while routes use `/articles/*`.
- Tests: scripts use Vitest; legacy Jest config files exist; Vitest include is narrow.

## Risks

- Test flakiness during migration if both Vitest and Jest run.
- CI inconsistency across pnpm versions.

## Implementation Steps

1) Sitemap: add `hostname: 'https://shortpoet.com'` to `generateSitemap({ hostname, outDir: 'build' })` in `app/vite.config.ts`.
2) ESLint: replace `import.meta.envNODE_ENV` with `import.meta.env.NODE_ENV` in `app/.eslintrc.esm`.
3) Articles: change links in `ArticleList.vue` to `/articles/*`.
4) Tests: in `vite.config.ts`, broaden `test.include` (e.g., `['test/**/*.test.ts', 'tests/**/*.spec.*']`) or move tests.
5) (Optional) CI: add Corepack step to pin pnpm (or set the same version used in `packageManager`).
6) Validate locally and via CI.

## Testing

- Local: `pnpm lint`, `pnpm test`, `pnpm build` (verify sitemap hostname in `app/build/sitemap.xml` and article navigation).
- CI: ensure build and deploy steps pass with pinned pnpm.

## Rollback

- Revert the three modified files and any CI workflow edits. No data/infra migration required.

## Success Criteria

- Production `sitemap.xml` contains `https://shortpoet.com` URLs.
- ESLint runs without env-reference errors.
- `/articles` list links navigate correctly.
- Tests and CI pass consistently.
