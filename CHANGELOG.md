# Changelog

All notable changes to this project will be documented in this file.

## v0.7.0 — 2025-09-10

First tracked release of the recent work. Focused on the PDF print flow, small UI polish for skills, and authoring artifacts to support content posts.

### Added

- Safari‑safe print page title via route‑managed head
  - `app/src/views/PDFPrint.vue` now sets the page title with `@vueuse/head` using a `title` query param. Ensures timestamped filenames appear in the tab/print dialog across browsers.
- Authoring artifacts for posts
  - `docs/plans/article-workflow-and-pdf-base/diffs-codex.md` with targeted diffs + commands.
  - Patch bundles under `docs/plans/article-workflow-and-pdf-base/` (`pdf-phase1_*.patch`).
  - UI review plan `ui-review-and-micro-plan.md` and attachments directory for before/after captures.

### Changed

- Skills typography balance (print view)
  - Reduced category label size: `.skill-type` from `0.80rem` → `0.70rem`.
  - Reduced pill text size: `.skill-render` from `80%` → `70%` for lighter visual weight.
- Skills row spacing (print view)
  - Narrowed vertical rhythm only between stacked rows in `.skill-list-container .skill-list.mb-2` (no change to column gutters).

### Fixed

- Chrome print gap between job title and company
  - Print‑only CSS normalizes heading margins/line‑height, avoids intra‑block breaks, and baseline‑aligns the title/date row.
  - Affects Experience headers only; screen layout unchanged.

### Documentation

- Engagement review updated to favor manual‑first capture, small diffs, and route‑managed artifacts.
- Plans and diff receipts added to support article writing and review workflows.

### Notes / Known limitations

- Browser headers/footers (URL/date/page) are user‑controlled in print dialogs. We keep margins at `@page { margin: 0 }` and pad the content; for a fully watermark‑free export we will consider a separate “Clean PDF” path in a future release.
