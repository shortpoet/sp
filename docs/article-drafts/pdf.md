# PDF Modernization

With updates resumes to submit, the first step was to enhance the PDF generation feature of my website. This site was first built right at the start of my coding journey -- back when vibe coding involved stack overflow, github sample repos, and the debugger. The PDF generation using the canvas API seemed like magic. It rasterizes the DOM and uses another library to convert to PDF. This worked great, but I often found myself having to resize the PDF or simply copy/paste the content to adhere to updload size and/or OCR (optical character recognition) requirements.

When speaking with site visitors, many didn't seem to make it to the PDF generation. Part of my desire is to streamline the resume requests, which require good discoverability. So as part of this feature, I added and additinal landing page button as well as slight animations on scroll and page load to draw the user's attention.

There was a choice between 2 approaches to the PDF feature:

- The browser print API
- Cloudflare Worker

The browser print option is the quick win that allows me to ship the solution. This unlocks many exciting avenues on this exciting journey. Looking forward to sharing the next steps.

The Cloudflare Worker option offers some distinct advantages that I am looking forward to exploring. Particularly, as it builds on some of my previous cloudflare edge working experimentation which can be found at [edge auth playground](https://ssr-dev.shortpoet.com/).


* **PDF modernization (Phase 1):** print-optimized route, selectable text, before/after (size, time-to-first-display).
  Post: *“Optimization as Product Decision: when 95% smaller isn’t the whole story.”*

1) Workflow per Delta (optimize for content + diffs)
   - Plan: define scope (≤2–3 days), success criteria (engineering + content), and slug.
   - Implement: small PR focused on one outcome; keep diffs readable.
   - Validate: `cd app && pnpm lint && pnpm test && pnpm build && pnpm preview` (local).
   - Capture: save `git diff -U0` as `diff.patch`; record metrics/screenshots.
   - Reflect: write the journal stub (≤200 words) referencing artifacts.
   - Publish: add/update row in content calendar; schedule LinkedIn/site post.
   - Retro: 3 bullets (worked/changed/next) appended to the journal entry.

2) Near‑Term Delta Queue (mapped to posts)
   - A) PDF Modernization — Phase 1 (print route + selectable text)
     - Engineering: ensure `/pdf` renders accessible, selectable text; size ↓ vs raster; document fallback.
     - Artifacts: before/after PDF size and TTFD; one screenshot; `diff.patch`.
     - Content: Draft “From 20MB → 200KB (engineering, not gimmicks)” (HM/PM primary).
     - Acceptance: build passes; measurable size reduction; journal stub completed; content calendar row status=Draft.

3. **Before Implementation**: Screenshot current PDF, document file size
4. **During Implementation**: Git commits with clear messages for diff capture
5. **After Implementation**: New metrics, visual comparison

**Reflection Checkpoint** (30 min after implementation):

```markdown
## Decision Log: PDF Modernization

### Why Browser Print Over Worker (Phase 1)?
- **Time to Market**: 1 day vs 1 week
- **Risk Mitigation**: No infrastructure changes
- **Fallback Strategy**: Legacy method still available
- **Cost**: $0 immediate investment

### Trade-offs Accepted:
- Browser dependency for initial solution
- Manual trigger vs automated generation
- Client-side processing limitations

### Metrics That Matter:
- Developer time saved: 2 hours/week on PDF issues
- Support tickets reduced: Expected 70% decrease
- User satisfaction: Measurable via feedback form

**Principle:** One delta → one measurable improvement → one short narrative → receipts.

| Delta (ship in 2–3 days)                      | Proof artifact                             | Business metric                          | Post angle (primary audience)                     |
| --------------------------------------------- | ------------------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| **PDF modernization** (print route + Worker)  | Before/after size, selectable text, timing | Size ↓95%+, DX ↑ (copyable text), TTFD ↓ | “Engineering solutions for real problems” (HM/PM) |

**6-Post starter queue (2–3 weeks):**

1. From 20MB to 200KB: engineering, not gimmicks (HM/PM).
2. When to build vs. buy PDF pipelines (framework + checklist) (HM/PM).

### Core Content Pillars

**1. Technical Judgment** (40% of content)

- PDF optimization story: "When 95% improvement isn't enough"

### A. PDF modernization

**Ship list**

* Phase 1 (today/tomorrow): Add print-optimized route/styles; replace rasterization; keep legacy behind a flag.
* Phase 2 (this week): Cloudflare Worker + Browser Rendering, R2 storage, download endpoint; basic analytics.
* Phase 3 (later): Summaries/translations/watermarks; perf metrics.

**Posts to publish**

1. “From 20MB to 200KB: The right way to export PDFs” → TL;DR for HMs/PMs (file size ↓95%, selectable text, accessibility), with a short “how” for devs.&#x20;
2. “Cost/quality tradeoffs of print vs worker vs jsPDF.html()” → a one-chart comparison + when to use which.&#x20;
3. “Resilience and rollback in client-to-edge migrations” → feature flags, fallbacks, and metrics you tracked.&#x20;
4. “Implementation diary: route, CSS, and worker endpoints” → brief code snippets & before/after.&#x20;

### Phase 1: PDF Modernization (High Impact Content)

**Technical Tasks:**

- Implement browser print method
- Create Cloudflare Worker solution
- Performance optimization

**Content Angles:**

1. **"From 20MB to 200KB: Engineering Solutions for Real Problems"** - Appeals to PMs/hiring managers who care about user experience
2. **"When to Build vs Buy: PDF Generation Decision Framework"** - Shows business thinking
3. **"Progressive Enhancement in Practice"** - Demonstrates architectural maturity
