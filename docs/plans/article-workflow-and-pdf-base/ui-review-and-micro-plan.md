# UI Review — FAB (PDF Buttons) and Landing CTAs

This review focuses on low‑effort, high‑polish fixes that improve professionalism, accessibility, and discoverability without changing the overall layout.

Artifacts reviewed (before/after)
- attachments/shortpoet-before-home.png
- attachments/shortpoet-before-resume-pdf.png
- attachments/shortpoet-before-pdf-page-me.png
- attachments/shortpoet-before-pdf-downloaded.png
- attachments/shortpoet-after-home.png
- attachments/shortpoet-after-home-pdf.png
- attachments/shortpoet-after-resume-float.gif
- attachments/shortpoet-after-pdf-float.gif
- attachments/shortpoet-after-pdf-page-me.png
- attachments/shortpoet-after-pdf-downloaded.png
- attachments/shortpoet-after-resume-searchable.png

Relevant code
- `app/src/components/Resume/Start/StartButtonFloat.vue`
- `app/src/components/Resume/PDF/PDFButtonFloat.vue`
- `app/src/composables/usePDFButtonInteractions.js`
- `app/src/views/Landing.vue`
- `app/src/assets/scss/start/_button-float.scss`
- `app/src/assets/scss/pdf/_button-float.scss`

## Findings (concise)

- Visibility: The floating button (FAB) is discoverable, but the default opacity (≈0.25) on the start page feels faint against the dark background.
- Motion: Continuous breathing + wiggle can feel busy; good for attention, but should respect reduced‑motion and settle quickly after first exposure.
- Tooltip: First‑time tooltip appears, but lacks an explicit close affordance and keyboard/focus support.
- Accessibility: Clickable `div`s need `role="button"`, `tabindex`, key handlers, or use native `button` elements; add `aria-label` and `title` for quick wins.
- Focus: No visible focus state for keyboard users on the FAB. Buttons should show a clear focus ring.
- Landing CTAs: The new buttons are clear; a subtle inline “Download PDF” link near the resume header would help non‑icon discoverability without layout changes.
- Consistency: Font Awesome transforms differ slightly between icons (rocket/pdf); visually center them for a steadier feel.

## Micro‑Improvements (low risk, ≤ 20 lines each)

1) Accessibility + semantics (FABs)
- Replace or augment clickable wrappers with `button[type="button"]` and/or add `role="button"` + `tabindex="0"`.
- Add `aria-label="Download PDF"` (or "Open PDF options") and `title="Download PDF"`.
- Add `@keydown.enter` and `@keydown.space.prevent` to trigger the same action as click.

2) Reduced motion + animation restraint
- Add a `prefers-reduced-motion` guard to disable bounce/pulse/wiggle.
- Limit wiggle to one occurrence per session (you already gate by scroll; keep it one‑shot).

3) Tooltip polish
- Add a close “×” button with `aria-label="Dismiss tooltip"` and keep auto‑dismiss after 3–4s.
- Move tooltip slightly higher to avoid overlap with the FAB (e.g., `bottom: 140%`).
- Show tooltip on keyboard focus as well as on load.

4) Discoverability and micro‑copy
- Increase start FAB idle opacity from `0.25`→`0.6`; hover/focus `1.0` to improve contrast.
- Add a small inline link near the resume header: `Download PDF` (`/pdf`), class `link-secondary`, with `aria-label`.

5) Focus states
- Add `:focus-visible` styles to the FAB and inline link (e.g., outline/halo) to signal keyboard navigability.

## Suggested minimal diffs (implementation notes)

- `StartButtonFloat.vue` and `PDFButtonFloat.vue`
  - Wrap the clickable control in `<button type="button" class="..." aria-label="Download PDF" title="Download PDF" @keydown.enter="open/showModal" @keydown.space.prevent="open/showModal">`.
  - If keeping `div`, add `role="button"` and `tabindex="0"` plus the same key handlers.
  - Add a close button to the tooltip: `<button class="tooltip-close" aria-label="Dismiss" @click="dismissTooltip">×</button>`.

- `_button-float.scss` (start + pdf variants)
  - Idle opacity: `.icon-circle { opacity: .6; }` and `&:hover, &:focus-visible { opacity: 1; }`.
  - Reduced motion: `@media (prefers-reduced-motion: reduce) { .icon-circle, .button-float { animation: none !important; transition: none !important; } }`.
  - Tooltip position and close button styles: `.first-time-tooltip { bottom: 140%; } .tooltip-close { margin-left: 8px; background: transparent; border: 0; color: #fff; cursor: pointer; }`.

- `Landing.vue`
  - Add inline link near header (keeps layout intact): `<a href="/pdf" class="link-secondary ms-2" aria-label="Download resume as PDF" title="Download PDF">Download PDF</a>`.

## Rationale (non‑technical)

- Professional polish: Higher idle opacity and consistent focus states make controls feel intentional and trustworthy.
- Accessibility: Native semantics and keyboard handling improve inclusivity and reduce friction in reviews.
- Discoverability: A text link complements the FAB for users who ignore icons/animations.
- Calm motion: Respect user settings and reduce ongoing animation once attention is captured.

## Optional follow‑ups (future diffs)

- Standardize button shadows and border radii across FAB and green CTAs for visual harmony.
- Unify FA transforms for centered icon rendering in both states (rocket/pdf).
- Add analytics event on PDF clicks to measure engagement.

## Next actions

- Implement Micro‑Improvements 1–5 (single PR, ≤ 60 LOC overall).
- Capture new screenshots/gifs:
  - Focus state on FAB (keyboard tab)
  - Tooltip with close button
  - Inline “Download PDF” link near header
- Update artifacts and link in the draft article and diff receipts.

---

This plan intentionally avoids layout shifts and focuses on small, review‑friendly diffs that visibly improve quality.
