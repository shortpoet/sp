# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All frontend development happens in the `app/` directory using pnpm:

```bash
cd app
pnpm i           # Install dependencies
pnpm dev         # Start dev server on port 8888
pnpm build       # SSG build to app/build/
pnpm preview     # Preview local build
pnpm test        # Unit tests (Vitest)
pnpm lint        # ESLint + Prettier
pnpm type-check  # TypeScript checks
```

Infrastructure commands (run in appropriate `.iac/` subdirectories):
```bash
terraform init
terraform plan
terraform apply
tflint          # Linting for Terraform
```

## Architecture Overview

### Frontend (`app/`)
- **Framework**: Vue 3 + Vite with Static Site Generation (vite-ssg)
- **Key Features**: Multilingual resume/portfolio, PDF export, articles from Markdown
- **Build Output**: `app/build/` directory
- **Main Views**: Landing (`/`), Resume (`/resume`), PDF (`/pdf`), About (`/about`), Articles (`/articles`)

### Vue Application Structure
- `app/src/views/`: Main page components (Landing.vue, Start.vue for /resume, PDF.vue, About.vue, Articles.vue)
- `app/src/components/`: Feature-specific components organized by domain (Articles/, Landing/, Resume/)
- `app/src/router/`: Vue Router configuration with automatic route generation via vite-plugin-pages
- `app/locales/`: i18n YAML files for 18+ languages (default: en)
- `app/src/modules/`: User modules for NProgress, i18n registration
- `app/src/stores/`: Vuex store modules
- `app/src/composables/`: Vue composition utilities

### Key Technical Patterns
- **Auto-imports**: Vue, Vue Router, VueUse, and local composables/stores auto-imported
- **Component Registration**: Automatic component registration via unplugin-vue-components
- **Markdown**: Articles written in Markdown with Shiki syntax highlighting, processed by vite-plugin-md
- **Styling**: SCSS with Bootstrap 5, global variables in `@/assets/scss/_variables.scss`
- **Aliases**: `@/` resolves to `app/src/`

### Infrastructure (`.iac/`)
- **Providers**: Cloudflare (primary), AWS (secondary)
- **Structure**: 
  - `infra_base/`: Base infrastructure
  - `infra_app/`: Application-specific resources
  - `cloudflare/`, `aws/`: Provider-specific configurations
- **Deployment**: GitHub Actions workflows (`infra-app.yml`, `infra-base.yml`)

### Testing Strategy
- **Unit Tests**: Vitest with jsdom environment
- **Test Location**: Configured to look for `test/**/*.test.ts` files
- **E2E**: Cypress available via `pnpm test:e2e`
- **Coverage**: Test environment includes Vue Test Utils, jsdom mocking

### Development Patterns
- **Code Style**: ESLint + Prettier with Vue 3 recommended rules
- **TypeScript**: Strict configuration with Vue SFC TypeScript support
- **Build**: Static site generation with sitemap generation, minified output
- **Deployment**: CI/CD via GitHub Actions with Terraform for infrastructure

### Important Configuration Files
- `vite.config.ts`: Main build configuration with all plugins
- `.eslintrc.esm`: ESLint configuration for Vue 3 + TypeScript
- `package.json`: All development scripts and dependencies
- `.tflint.hcl`: Terraform linting rules and version constraints

### Multilingual Support
The application supports 18+ languages with YAML-based translations in `app/locales/`. The i18n setup uses Vue I18n v9 with composition API support. Language files follow ISO language codes (e.g., `en.yml`, `zh-CN.yml`, `pt-BR.yml`).