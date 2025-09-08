Totally fair. Let’s balance speed (your superpower) with sustainability and near-term cash.

# Two-Speed Plan (quality first, burst when needed)

## 0) Choose your lane (freeze for 4 weeks)

Primary track: **Platform Engineering (DevEx-leaning IC)**.
Secondary (only if job req is a bullseye): Staff IC.
Avoid “DevOps/SRE” unless it explicitly overlaps platform/DX.
(Reason: cleaner story → cleaner interviews → higher close rate.)

## 1) Weekly rhythm (sustainable baseline)

* **Applications:** 3–5 deeply researched.
* **Outreach:** 2–3 *meaningful* conversations (warm intros, ALUM, ex-coworkers, maintainers).
* **Portfolio delta:** 1 substantial ship with receipts (2–3 days timebox).
* **Content:** 1 thoughtful post **every 10 days** tied to the shipped delta.
* **Interview prep:** 60 min/wk (1 system design + 1 behavioral STAR).

### Burst weeks (use sparingly: 1 in 3)

* **Applications:** up to 10 (all targeted; one-page tailoring).
* **Outreach:** 6–8 quality touchpoints (laddered: IC → HM → Recruiter).
* **Content:** add 1 micro-post (artifact screenshot + 3 bullets), not a full article.

> Guardrail: if quality slips (no screens for 2 weeks), throttle volume back.

## 2) Income bridge (parallel track, optional)

Until full-time lands, spin up **productized micro-engagements** you can deliver fast:

* **PDF Export Modernization Sprint (3–5 days):** selectable text, 90%+ size ↓, print CSS, worker endpoint, demo PDF.
* **CI Speed/Flake Audit (3 days):** unify runner, caching, flaky tests triage, p95 CI time ↓.
* **“Docs That Hire” pass (2 days):** README, quickstart, broken-link scan, sitemap fix.

**Scope:** 1-page proposal, fixed price, fixed outputs, tiny contract.
**Rate heuristic:** floor = (Target base / 2000) × 1.7 to 2.2 (to cover self-employment + risk).
**Lead gen:** post a before/after on LinkedIn; DM 5 eng leaders you respect; ask 2 ex-colleagues for intros.

## 3) Evidence-of-Impact backlog (timeboxed)

Keep these small; ship, don’t polish forever.

* **PDF modernization (Phase 1):** print-optimized route, selectable text, before/after (size, time-to-first-display).
  Post: *“Optimization as Product Decision: when 95% smaller isn’t the whole story.”*
* **Vuex→Pinia + TS (one core slice):** types caught, defect class eliminated, diff link.
  Post: *“Modernization as risk-reduction, not fashion.”*
* **Vitest unification:** CI time chart; flake reduction.
  Post: *“Fast tests, fewer flakes → faster teams.”*
* **UI snapshot capture in CI:** gallery + PR check.
  Post: *“Visual evidence that scales beyond humans.”*
* **Docs sweep:** README/sitemap/lint/env fixes; cold-start setup time.
  Post: *“Docs that hire: 5-minute audition for your repo.”*

## 4) Content format (judgment > hype)

Every post: **TL;DR (3 bullets)** → **Before/After** → **Trade-offs & rollback** → **Nerd corner link** → **CTA**.
Keep micro-posts for presence: artifact screenshot + 3 bullets + 1 link.

## 5) Outreach that isn’t spam

* **Laddered outreach (per target):**

  1. Senior IC (ask about pain) → 2) HM (map a shipped result to their pain) → 3) Recruiter (process).
* **Message skeleton (5–7 lines):** Their pain → your comparable win (metric) → 1 idea you’d try → soft CTA (15-min).
* **Relationship > quota:** 2–3 real convos/week > 20 cold DMs.

## 6) Interview prep (lean, high-yield)

* **System design drill:** “Edge PDF pipeline” and “Safe store migration” logic trees (risks, mitigations, metrics, rollout).
* **Behavioral bank (STAR):** influence w/o authority, ambiguous ask, incident → prevention, conflict → resolution, miss → lesson.
* **Rehearsal rule:** 30 min whiteboard + 15 min critique + 15 min redo.

## 7) Decision scorecard (kill the vibes)

Weight (to 100): Team quality/mentorship (25), Decision hygiene (15), Remote maturity (15), DX leverage (15), Growth path for ICs (10), Domain fit (10), Comp/benefits (10).
Score every target 1–5; invest only in top quartile.

---

# 10-Day plan (balanced, income-aware)

**Day 1–2**

* Ship **PDF Phase 1** (route + selectable text). Save before/after artifacts.
* Draft **Post #1** (≤600 words) using the format above.
* Identify **5 target companies**; score with the decision scorecard.

**Day 3–4**

* Send **3 tailored applications** (deep research, one-page tailoring).
* **Outreach:** 3 laddered sequences to those targets.
* Prep micro-engagement **PDF Sprint** one-pager (scope, outputs, price band).

**Day 5**

* Publish **Post #1** (site + LinkedIn).
* DM **5 prospects** for the PDF Sprint (ex-colleagues / warm ICs).

**Day 6–7**

* Ship **Docs sweep** delta; capture artifacts.
* Mock: **Edge PDF** + 2 behavioral stories (45–60 min).

**Day 8–10**

* Apply to **2 more** roles (only high-score).
* Publish **micro-post** with Docs artifacts.
* Conduct **2 discovery calls** for the PDF Sprint; try to close **1** paid micro-engagement.

---

# Templates (plug & play)

**LinkedIn “About” (Platform IC, remote-first)**

> I build developer platforms that turn good teams into great ones. In the last 5 years I’ve shipped leverage: faster CI, safer releases, clearer docs, and tools devs actually use. I like small, measurable deltas that compound—PDF pipelines that go from 20MB images to selectable text, test suites that run in minutes not hours, and migrations planned with rollback and receipts. Remote-first, Platform/DevEx-leaning IC. If your team cares about engineering judgment and boringly reliable delivery, let’s talk.

**Outbound message (laddered)**

> Hi {Name} — I loved your post about {their pain/initiative}. At Lazlo I cut document payloads by 95% while keeping text selectable and adding an edge fallback, which reduced support tickets and sped up reads. If I were here I’d start with a print-CSS route + worker render behind a flag, measure p95, then expand. Happy to share the checklist and metrics we tracked — open to a 15-min swap?

**PDF Sprint one-pager (scope bullets)**

* Selectable-text PDFs (no raster)
* Print CSS + accessibility pass
* Edge render endpoint + fallback
* Before/after metrics & mini-runbook
* Fixed price; 3–5 day delivery

---

### Why this fits you

* **You ship fast** → timeboxed deltas, micro-engagements, micro-posts.
* **You value judgment** → decision scorecard + post format that foregrounds trade-offs.
* **You need income** → productized sprints you can close quickly without derailing the full-time search.

If you want, I can draft your **Post #1** from your PDF delta artifacts next, and a 1-page **PDF Sprint** proposal you can paste into emails.
