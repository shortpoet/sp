# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Vue 3 + Vite (SSG) frontend. Source in `app/src/`, static assets in `app/public/`, build output in `app/build/`.
- `.iac/`: Terraform for infrastructure (e.g., Cloudflare, base/app stacks). Linting and docs via pre-commit hooks.
- `.github/workflows/`: CI/CD pipelines for building and deploying app/infra.
- Tests live alongside code or under `app/tests/` (unit) and optional e2e via Cypress.

## Build, Test, and Development Commands
Run these in `app/` (uses pnpm):
```bash
pnpm i                # Install deps
pnpm dev              # Start Vite dev server (port 8888)
pnpm build            # Build (SSG) to app/build
pnpm preview          # Preview local build
pnpm test             # Run unit tests (Vitest)
pnpm test:e2e         # Open Cypress (if e2e tests present)
pnpm lint             # Lint
pnpm lint:ext --fix   # Lint (Vue/TS/JS) and fix
pnpm type-check       # TS type checking
```
Infra: use `tflint` and `terraform` inside relevant `.iac/` subdirs. CI handles deploys.

## Coding Style & Naming Conventions
- Linting/formatting: ESLint + Prettier (`app/.eslintrc.esm`, `app/.prettierrc.json`).
  - 2-space indent, single quotes, semicolons, width 80, no trailing commas, `bracketSameLine: true`.
- Vue SFC filenames in PascalCase (e.g., `Landing.vue`, `Start.vue`).
- JS/TS modules: prefer descriptive names; camelCase for identifiers.
- Terraform: snake_case for variables/locals; require provider/version constraints (see `.tflint.hcl`).

## Testing Guidelines
- Unit: Vitest. Name tests `*.spec.ts` or `*.test.ts`, colocated or under `app/tests/unit/`.
- DOM-heavy tests should use a DOM environment (Vitest config) and minimal mocking.
- E2E: Cypress via `pnpm test:e2e` (add tests under `app/cypress/`).

## Commit & Pull Request Guidelines
- Commits: imperative, concise; optional scope tags (`app:`, `iac:`, `ci:`). Link issues (e.g., `#123`) when relevant.
- PRs: clear description, screenshots for UI changes, linked issues, and notes for infra changes (include `terraform plan` summary when applicable).
- Before opening a PR: `pnpm lint`, `pnpm test`, and `pnpm build` should pass locally.

## Security & Configuration
- App env files: `app/.env`, `app/.env.uat`, `app/.env.prod`. Never commit secrets.
- Cloudflare/AWS credentials flow via GitHub Actions secrets; for local infra work, follow `README.md` (e.g., `aws_assume_role`).

