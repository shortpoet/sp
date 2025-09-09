# README Refresh Plan — Review

## Executive Summary

The plan is well scoped and aligned with the repo’s current Vue 3 + Vite SSG architecture. It targets high‑leverage fixes (docs accuracy, sitemap hostname, ESLint typo, article links, test framework alignment). Recommendation: Continue with minor modifications to consolidate testing on Vitest, align pnpm usage, and ensure sitemap hostname is set in build pipelines.

## Current State

- README updated with structure, commands, routing, testing, CI/infra, and SEO note.
- App: `app/` with vite-ssg, routes for `/`, `/resume`, `/pdf`, `/about`, `/articles/*` and Markdown articles.
- CI: builds `app/build` and deploys via reusable workflows; infra in `.iac/` with TFLint.
- Gaps: sitemap emits `http://localhost`; ESLint references `import.meta.envNODE_ENV`; `ArticleList` links to `/blog/*`; mixed Jest artifacts vs Vitest scripts; pnpm version skew (pkg: 7.x; CI: 10).
- No local “lessons” docs found; using reduction guidance: simplify, consolidate, avoid new abstractions.

## Lessons Integration

- Reduce surface area: pick a single unit test runner (Vitest) and phase out Jest.
- Prefer config tweaks to refactors: sitemap hostname and ESLint env fixes are minimal, high impact.
- Align tooling versions to cut CI drift (pnpm via corepack or explicit version).
- Keep docs close to code and current routing/content.

## Recommendations

- Testing: standardize on Vitest. Adjust `vite.config.ts` test include to cover `app/tests/**/*.spec.*` OR relocate tests. Remove legacy Jest config in a separate cleanup PR.
- SEO: set `hostname: 'https://shortpoet.com'` in `generateSitemap(...)` within `vite.config.ts`. Verify sitemap in CI artifact.
- Lint: fix env reference to `import.meta.env.NODE_ENV` in `app/.eslintrc.esm`.
- UI: change `ArticleList.vue` links from `/blog/*` to `/articles/*`.
- CI/Tooling: align pnpm version (e.g., `corepack enable && corepack prepare pnpm@10 --activate`), or pin to repo’s version across CI.

## Action Items

- `app/vite.config.ts`: add `hostname` to `generateSitemap` call.
- `app/.eslintrc.esm`: replace `import.meta.envNODE_ENV` with `import.meta.env.NODE_ENV`.
- `app/src/components/Articles/ArticleList.vue`: update links to `/articles/learning-to-unit-test-en`.
- `app/vite.config.ts`: update `test.include` to include legacy paths or move tests; note Jest deprecation in AGENTS.md/README.
- `.github/workflows/*`: ensure pnpm version consistency (corepack or action setup).

## Impact

- Improved SEO and correctness in production sitemap.
- Reduced contributor friction (single test runner, clear commands).
- Fewer lint surprises and route/link mismatches.
- More reproducible CI builds.

## Future Considerations

- Add a short `docs/index.md` to link README refresh plan/review and future docs.
- Remove unused dependencies/configs after test consolidation.
- Optional: adopt Conventional Commits and add brief guidance to README/AGENTS.md.
