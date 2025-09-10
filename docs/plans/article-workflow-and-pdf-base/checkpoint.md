# Checkpoint Codex

## What’s Missing

- Artifacts in-repo: before/after images, baseline/after metrics, and a short journal stub.
- Simple templates: markdown starters for article, LinkedIn, journal, and commit messages.
- Tiny helpers: one-liners to create folders, copy images, and export diffs.

## Artifact Staging (do this now)

- Copy your Obsidian images into this structure (rename for clarity):
  - shortpoet-before-home.png → before/home.png
  - shortpoet-before-resume-pdf.png → before/resume-pdf.png
  - shortpoet-before-pdf-page-me.png → before/pdf-page.png
  - shortpoet-before-pdf-downloaded.png → before/pdf-downloaded.png
  - shortpoet-after-pkg.png → after/pkg.png (keep, and add any “after” PDF screenshots you take next)

  Example macOS snippet to stage:

- mkdir -p docs/engagement/artifacts/2025-09-09-pdf-phase1/{before,after}
- cp "/Users/carlos/.../shortpoet-before-*.png" docs/engagement/artifacts/2025-09-09-pdf-phase1/before/
- cp "/Users/carlos/.../shortpoet-after-*.png" docs/engagement/artifacts/2025-09-09-pdf-phase1/after/

### Artifact Automation

- obsidian
  - <article-name>-before-<filename>.png -> articles/<article-name>/before/<filename>.png
  - <article-name>-after-<filename>.png -> articles/<article-name>/after/<filename>.png
- git
  
  ```bash
  echo "### Commit Ref"
  git show --oneline -s
  echo "### File Names & Line Nums"
  git diff --name-only HEAD~1
  ```

### Todoist Integration

- Your todoist-query-template.md shows good structure for project filtering
- Can automate project creation based on article title

### Minimal Templates (paste-as-new files)

- docs/engagement/templates/article-technical-decision.md
  - Title: Problem → Solution → Impact
  - TL;DR: 3 bullets
  - Decision: why this path, trade-offs, rollback
  - Results: before/after table (size, time, accessibility)
  - Nerd corner: 1–2 annotated code diffs or links to diff.patch
- docs/engagement/templates/linkedin-post-achievement.md
  - Hook: shipped X → Y (95% smaller, selectable text)
  - 3 bullets: impact, decision, time-to-ship
  - 1 image, CTA to full article

### Diff Presentation (non‑technical)

- For LinkedIn/article readers, avoid raw code diffs. Use:
  - Before/After numbers: “15MB → 200KB; text: no → yes; gen time: 5s → <1s”
  - 1–2 screenshots max
  - “What changed” bullets per file:
  - PDF.vue: “Replaced rasterization with a print route trigger”
  - Router: “Added `/pdf` print route”
  - CSS: “Added print CSS (margins, fonts)”
- Link to full diff.patch for engineers
- Include git diff --stat snippet as a compact “receipt”:
  - Save git diff --stat > docs/engagement/artifacts/<date>-pdf-phase1/diff.stat.txt
  - Save full patch: git diff -U0 > .../diff.patch

- Use your docs/article-drafts/pdf.md as the long-form base; add:
  - TL;DR (3 bullets)
  - Results table (size/time/selectable)
  - “Why Browser Print first” (speed, cost, rollback)
  - “What changed” bullets (human-readable)
  - 1 image, link to artifacts folder
- LinkedIn micro-post (paste and adjust):
  - Shipped: 15MB → 200KB resume PDFs in one day
  - Results: selectable text, faster load, zero infra changes
  - Why: shipped “good enough” today, worker later if needed
  - CTA: Full write-up + demo link
  
### Non-Technical Presentation Strategy

Based on your screenshots and content goals, here's how to present the PDF optimization story:

Target Audience: Non-Technical (HM/PM/LinkedIn)

Hook: The Problem

- "My resume PDF was 8.4MB - larger than most people's photo albums"
- Visual: Show the file size in downloads folder

Story: The Decision

- "Instead of complex solutions, I chose the simplest one that worked"
- Focus on business impact not technical implementation

Results: The Transformation

- Before/after package.json diff shows dependency reduction visually
- File size reduction (8.4MB → ~200KB)
- Key insight: "Sometimes the best solution is removing code, not adding it"

Content Structure for LinkedIn:

From 8MB to 200KB: When Less Code = Better Product

🔍 The Problem: My resume PDF was bloated and impossible to select text from

🤔 The Approach: Instead of adding libraries, I removed them
    - Deleted html2canvas dependency
    - Removed jsPDF processing
    - Used browser's native print capability

📊 The Results:
    ✅ 95% file size reduction
    ✅ Text became selectable/searchable
    ✅ Faster loading for recruiters
    ✅ Better accessibility

💡 The Lesson: Engineering isn't always about building more—sometimes it's about building smarter.

[Link to detailed article]

Article Deep-Dive Sections:

1. Context: Why PDF generation matters for job applications
2. Technical Decision: Browser print vs Worker vs Client processing
3. Implementation: Code reduction rather than addition
4. Metrics: File size, load time, accessibility improvements
5. Lessons: When to choose simple over sophisticated

The visual diff of package.json dependencies being removed is perfect for showing "progress through subtraction" - a compelling narrative for non-technical audiences.
