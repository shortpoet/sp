# Engagement-Aligned Delivery Plan

## Executive Summary

Define a repeatable delivery loop that treats content creation as a first‑class outcome of engineering work. For every shippable delta (small PR), we capture clear diffs, before/after artifacts, and a short narrative stub that flows into posts and the job search OS. This keeps momentum on the website while feeding a sustainable cadence of publishable material and recruiting touchpoints.

## Scope

- In-scope: Planning and documentation for an engineering→content loop, per‑delta acceptance criteria, artifact conventions, and a near‑term queue of repo changes mapped to posts.
- Out-of-scope: New CI jobs, code refactors, or automation changes (can be follow‑ups). This document does not change app behavior by itself.

## Current State

- Repo docs are refreshed (README, AGENTS). Infra/workflows exist under `.github/workflows/` and `.iac/`.
- Engagement sources captured under `docs/engagement/` (chatgpt, claude) include: strategies, cadence, content calendar, post ideas, and a job application tracker.
- Content queues emphasize: PDF modernization, docs sweep (sitemap/README), test runner unification (Vitest), and optional UI snapshot capture.

## Risks

- Burnout from high volume; shallow posts that reduce credibility.
- Over‑scoped PRs make diffs noisy and hard to narrate.
- Missing artifacts (screenshots/metrics) stalls post production.
- Divergence between plan and repo reality (routes, commands, CI) if not validated per delta.

## Implementation Steps

1) Conventions (no code changes required)
   - Artifacts per delta (suggested; create on demand):
     - `docs/engagement/artifacts/<YYYY-MM-DD>-<slug>/diff.patch`
     - `.../before.png`, `.../after.png`, `.../metrics.json` (or `.md`)
     - `docs/engagement/journal/<YYYY-MM-DD>-<slug>.md` (story stub)
   - Story stub template (copy into each journal entry):
     - TL;DR (3 bullets) • Before/After metrics • Decision & rollback • Links (PR, files) • CTA.
   - Update trackers when applicable:
     - Content: `docs/engagement/chatgpt/content-calendar.csv`
     - Applications: `docs/engagement/chatgpt/job-application-tracker.csv`

2) Workflow per Delta (optimize for content + diffs)
   - Plan: define scope (≤2–3 days), success criteria (engineering + content), and slug.
   - Implement: small PR focused on one outcome; keep diffs readable.
   - Validate: `cd app && pnpm lint && pnpm test && pnpm build && pnpm preview` (local).
   - Capture: save `git diff -U0` as `diff.patch`; record metrics/screenshots.
   - Reflect: write the journal stub (≤200 words) referencing artifacts.
   - Publish: add/update row in content calendar; schedule LinkedIn/site post.
   - Retro: 3 bullets (worked/changed/next) appended to the journal entry.

3) Near‑Term Delta Queue (mapped to posts)
   - A) PDF Modernization — Phase 1 (print route + selectable text)
     - Engineering: ensure `/pdf` renders accessible, selectable text; size ↓ vs raster; document fallback.
     - Artifacts: before/after PDF size and TTFD; one screenshot; `diff.patch`.
     - Content: Draft “From 20MB → 200KB (engineering, not gimmicks)” (HM/PM primary).
     - Acceptance: build passes; measurable size reduction; journal stub completed; content calendar row status=Draft.
   - B) Docs Sweep — README/SEO/Links
     - Engineering: hostname in sitemap; confirm commands/routes accuracy; fix obvious link or env nits.
     - Artifacts: `diff.patch`; broken‑link scan notes if applicable.
     - Content: “Docs that hire: a 5‑minute repo audition” (Recruiter/HM).
     - Acceptance: no functional app changes; README accurate; stub + calendar updated.
   - C) Test Runner Sanity — Vitest Unification (small, visible)
     - Engineering: validate Vitest config/globs; ensure `pnpm test` runs green; trim stale Jest mentions where safe.
     - Artifacts: CI/local timings before/after (even coarse); `diff.patch`.
     - Content: “Fast tests, fewer flakes → faster teams” (Tech Lead).
     - Acceptance: tests green; journal + calendar updated.
   - D) UI Snapshot Capture (optional, manual first)
     - Engineering: use local preview and a simple headless capture (manual or script) for `/`, `/about`, `/articles`, `/resume`, `/pdf`.
     - Artifacts: route PNGs saved under `docs/ui-snapshot-capture/ui/` (existing plan), gallery link in journal.
     - Content: “Visual evidence that actually gets used” (PM/Dev).
     - Acceptance: snapshots exist; journal + calendar updated.

4) Checkpoints in Each Workflow (touchpoints to write)
   - Kickoff note: 3‑bullet intent + success criteria pasted into journal.
   - Merge‑ready note: paste key `git diff --stat` and metric table.
   - Post‑draft note: link calendar row and draft URL; ask for quick review.

## Testing

- Local: `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm preview` from `app/`.
- Visual (optional): capture one screenshot for changed routes.
- Links: validate internal links touched by docs sweep.

## Rollback

- Keep deltas small; revert PRs cleanly if acceptance fails.
- Preserve artifacts/journal even if reverted—use them as the learning log.

## Success Criteria

- Operational: one shippable delta per 7–10 days with artifacts and a journal stub; content calendar updated per delta.
- Content: one thoughtful post per milestone (≈10 days) cross‑posted (site + LinkedIn) with at least one artifact.
- Search: 3–5 quality applications/week and 2–3 substantive conversations, tracked in the CSV.

## Follow‑Ups (optional next steps)

- Add a lightweight PR checklist (“Artifacts attached? Journal stub? Calendar updated?”).
- Automate artifact capture (UI snapshots) and diff export in CI once manual loop proves valuable.
