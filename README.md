# Shortpoet — Resume & Articles

Live: <https://shortpoet.com>

## Purpose & Context

**What**: Personal portfolio site showcasing Carlos Soriano's professional experience and technical expertise.

**Why**: Multilingual résumé platform with PDF export for professional networking, recruitment, and career opportunities.

**How**: Vue 3 SSG with article authoring, i18n support (18+ languages), and print-friendly views.

**For Whom**: Recruiters, potential employers, technical collaborators, and professional contacts.

Vue 3 + Vite SSG site for a multilingual résumé, PDF export, and a small articles section rendered from Markdown. Infra is managed separately via Terraform and deployed with GitHub Actions.

## Project Structure

- `app/`: Frontend app (Vue 3, Vite, vite-ssg).
  - `app/src/views/`: Main pages (`Landing`, `Start` at `/resume`, `PDF`, `About`, `Articles`).
  - `app/src/components/`: Feature components (Landing, Articles, PDF, etc.).
  - `app/locales/`: i18n resources (default `en`).
  - `app/public/`: Static assets. Build output: `app/build/`.
- `.iac/`: Infrastructure-as-code (Cloudflare/AWS). See “Infra”.
- `.github/workflows/`: Build/deploy pipelines for app and infra.

## Getting Started

Prereqs: Node 18+ and pnpm (CI uses pnpm 10; local 7+ works).

```bash
cd app
pnpm i           # install
pnpm dev         # start dev server on :8888
pnpm build       # SSG build to app/build
pnpm preview     # preview local build
pnpm test        # unit tests (Vitest)
pnpm lint        # ESLint + Prettier
pnpm type-check  # TS checks
```

## Notes on Testing & Linting

- Unit tests run with Vitest (jsdom). Default glob is `test/**/*.test.ts` (update if you prefer colocated `*.spec.ts`).
- Legacy Jest config exists, but `pnpm test` uses Vitest by default.
- ESLint config: `app/.eslintrc.esm`; Prettier: `app/.prettierrc.json`.

## Routing & Content

- Routes: `/` (Landing), `/resume` (interactive résumé), `/pdf` (print-friendly), `/about`, `/articles` (redirects to first post).
- Articles authored in Markdown with Shiki highlighting; see `app/src/components/Articles/Content`.
- NProgress and i18n registered via user modules in `app/src/modules/`.

## CI/CD & Infra

- App build/deploy: [`.github/workflows/infra-app.yml`](.github/workflows/infra-app.yml) (reusable workflow). Uses pnpm 10, Node latest, outputs zipped from `app/build`.
- Base infra: [`.github/workflows/infra-base.yml`](.github/workflows/infra-base.yml).
- Terraform & linting live under [`.iac/`](.iac/) with TFLint configured in [`.tflint.hcl`](.tflint.hcl).
- Deployment targets: Cloudflare (primary), AWS (secondary) via GitHub Actions.
- Optional: install pre-commit hooks to lint Terraform and inject docs blocks: `pre-commit install`.

## SEO tip

Sitemap currently emits `http://localhost` links. Set a hostname in `vite.config.ts` (vite-ssg-sitemap) for production, e.g. `generateSitemap({ hostname: 'https://shortpoet.com', outDir: 'build' })`.

## Troubleshooting

- **pnpm version**: Local development works with pnpm 7+ (tested with 7.27.1), but CI uses pnpm 10.
- **Test runner**: `pnpm test` uses Vitest by default; legacy Jest config exists but is not the primary runner.
- **Production site**: Requires JavaScript - site shows message if JS is disabled.
- **Sitemap URLs**: Production sitemap shows `localhost` URLs due to missing hostname config in `vite.config.ts`.

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

No providers.

## Modules

No modules.

## Resources

No resources.

## Inputs

No inputs.

## Outputs

No outputs.
<!-- END_TF_DOCS -->
