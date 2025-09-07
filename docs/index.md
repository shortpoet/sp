# Documentation Index

## Project Context

- [README.md](../README.md) - Project overview, purpose, and raison d'être
- [AGENTS.md](../AGENTS.md) - Development guidelines and contributor rules
- [CLAUDE.md](../CLAUDE.md) - Claude Code specific guidance and architecture

## Implementation Plans & Reviews

- [readme-refresh/](./readme-refresh/) - Documentation refresh planning and execution
- [ui-snapshot-capture/](./ui-snapshot-capture/) - UI capture tooling plan and review

## Discovery Artifacts

### Production Analysis
- Live site: https://shortpoet.com (JavaScript SPA, requires client-side rendering)
- Routes confirmed: `/`, `/resume`, `/pdf`, `/about`, `/articles`
- Articles available: `learning-to-unit-test-en`, `learning-to-unit-test-es`
- Sitemap shows localhost URLs (known issue, requires vite.config.ts fix)

### Technical Stack Summary
- **Frontend**: Vue 3 + Vite SSG with i18n support (18+ languages)
- **Infrastructure**: Terraform (Cloudflare/AWS), GitHub Actions CI/CD
- **Development**: pnpm (7+ local, 10 CI), Vitest testing, ESLint/Prettier
- **Content**: Markdown articles with Shiki syntax highlighting

### Build & Deployment
- Build output: `app/build/`
- CI workflows: `infra-app.yml`, `infra-base.yml`
- Artifact pattern: zipped builds uploaded to GitHub Actions
- Deployment targets: Cloudflare (primary), AWS (secondary)