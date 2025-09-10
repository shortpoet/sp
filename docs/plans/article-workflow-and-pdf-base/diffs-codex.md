# PDF Phase 1 — Targeted Diffs and Impact Receipts

This file summarizes high‑impact, non‑technical‑friendly changes and includes the exact commands used to produce each excerpt. Use these receipts in posts and reviews.

## 1) PDF.vue — Enable multi‑page and fix env detection

- Impact: Long resumes no longer get cut off; build/runtime more reliable.
- Command:
  `git --no-pager show -U0 21e5a3c -- app/src/views/PDF.vue`
- Output (excerpt):
```
@@ -74 +74,2 @@ export default {
-          height: '297mm',
+          // setting height restricts it to one page
+          // height: '297mm',
@@ -100 +101 @@ export default {
-    const env = import.meta.envNODE_ENV
+    const env = import.meta.env.NODE_ENV
```

## 2) Print layout — tighter spacing for cleaner pages

- Impact: More content per page, less whitespace, improved readability.
- Command:
  `git --no-pager show -U0 1a584d7 -- app/src/assets/scss/pdf/_global-pdf.scss`
- Output (excerpt):
```
@@ -49 +49 @@ a {
-  // padding: 0rem !important;
+  padding: 0rem !important;
@@ -239,0 +240,5 @@ span.skill {
+.skill-grid-row-1 {
+  padding: -0.1rem !important;
+  margin: -0.1rem !important;
+}
```

## 3) Print layout — remove extra header padding

- Impact: Better visual balance and fewer accidental overflows.
- Command:
  `git --no-pager show -U0 ade9293 -- app/src/assets/scss/pdf/_global-pdf.scss`
- Output (excerpt):
```
@@ -9 +9 @@
-  padding: .25rem 1rem 0rem 1rem;
+  // padding: .25rem 1rem 0rem 1rem;
```

## 3) Start page FAB — motion and tooltip styles

- Impact: Improved discoverability with tasteful motion; tooltip clarity.
- Command:
  `git --no-pager diff -U0 main...HEAD -- app/src/assets/scss/start/_button-float.scss`
- Output (excerpt):
```
@@ -250,0 +251,101 @@
+// Enhanced animations for PDF button discoverability
+@keyframes bounce-in { /* ... */ }
+@keyframes breathing { /* ... */ }
+@keyframes scroll-wiggle { /* ... */ }
+@keyframes fadeIn { /* ... */ }
+.icon-circle { /* bounce + breathing + hover */ }
+.first-time-tooltip { /* positioning + arrow + fadeIn */ }
```

## 4) Print route + view — user‑friendly print page

- Impact: Dedicated print view enables accessible, selectable‑text PDFs.
- Primary command (run locally to capture diff against main):
  `git --no-pager diff --stat main...HEAD -- app/src/router/paths.js app/src/views/PDFPrint.vue`
- Supporting evidence — route present now:
  - Command:
    `sed -n '1,120p' app/src/router/paths.js`
  - Output (excerpt):
```
  {
    path: '/print',
    view: 'PDFPrint'
  },
```

## 5) PDFButtonFloat.vue — simplify to print route, add tooltip

- Impact: Replaced heavy canvas/jsPDF pipeline with clean print route; added first‑time tooltip and composables.
- Command:
  `git --no-pager diff -U0 main...HEAD -- app/src/components/Resume/PDF/PDFButtonFloat.vue`
- Output (excerpt):
```
@@ -3,11 +3,21 @@
-    <div type="input" :class="classObject" @click="showModal"> ...
+    <div class="button-float-container"> ... <div v-if="showFirstTimeTooltip" class="first-time-tooltip"> ...
@@ -16,11 +26,4 @@
-      <PDFModal v-show="isModalVisible" @to-pdf ...>
+      <PDFModal v-show="isModalVisible" @print-pdf="printPDF" />
@@ -32,15 +35,3 @@
-import jsPDF from 'jspdf';
-import html2canvas from '@trainiac/html2canvas';
-import FontFaceObserver from 'fontfaceobserver';
-import moment from 'moment';
+import { usePDFPageSaveButton } from '@/composables/usePDFButtonInteractions';
+import { usePDFGeneration } from '@/composables/usePDFGeneration';
@@ -106,49 +98,7 @@
-    toCanvas() { /* ... rasterization ... */ }
-    getCanvas() { /* ... */ }
-    toPDF() { /* ... jsPDF ... */ }
+    printPDF() { this.openPDFPrint(); this.closeModal(); }
```

## 6) Human‑readable receipts for articles

- Create compact stats and full patch for the artifact folder:
  - Command:
    `git --no-pager diff --stat main...HEAD -- app/src/views/PDF.vue app/src/views/PDFPrint.vue app/src/router/paths.js app/src/assets/scss/pdf/** app/src/components/Resume/PDF/PDFButtonFloat.vue app/src/assets/scss/start/_button-float.scss > docs/engagement/artifacts/<YYYY-MM-DD>-pdf-phase1/diff.stat.txt`
  - Command:
    `git --no-pager diff -U0 main...HEAD -- app/src/views/PDF.vue app/src/views/PDFPrint.vue app/src/router/paths.js app/src/assets/scss/pdf/** app/src/components/Resume/PDF/PDFButtonFloat.vue app/src/assets/scss/start/_button-float.scss > docs/engagement/artifacts/<YYYY-MM-DD>-pdf-phase1/diff.patch`

## 6) Non‑technical summary (ready for LinkedIn/article)

- Multi‑page support: Long resumes no longer cut off mid‑page.
- Cleaner print layout: More content per page; less whitespace.
- Reliable builds: Fixed environment detection to avoid glitches.
- Dedicated print view: Selectable‑text PDFs with better accessibility.
- Simpler export: Removed heavy rasterization pipeline in favor of native print.

Link the diff receipts (stat + patch) for engineers; keep the bullets and one before/after image for everyone else.
