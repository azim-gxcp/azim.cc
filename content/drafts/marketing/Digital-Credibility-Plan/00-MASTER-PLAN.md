# GX Coin Protocol — Digital Credibility & AI Search Visibility Plan
## Priority-Sequenced Execution Plan | Start Date: April 14, 2026

---

## KEY FACTS (Confirmed)

| Detail | Value |
|--------|-------|
| **Lead Architect** | M Azim Abdul Majeed |
| **Lead Developer** | Manazir Ali |
| **Non-Profit Entity** | GXC Protocol Foundation, Zug, Switzerland |
| **Commercial Entity** | GXC Protocol PTE LTD, Singapore |
| **Project Start** | October 2023 (originally "Goodness Exchange") |
| **GitHub** | github.com/GX-Coin-Protocol (org exists, 0 public repos) |
| **Target Activation** | Q2/Q3 2026 |
| **Video/Camera** | Azim prefers low profile — no on-camera appearances |
| **Islamic Finance Position** | Islamic principles are natively embedded, NOT retrofitted. Do NOT use term "Sharia-compliant" — that term implies a conventional product modified to conform. GX Coin Protocol's economics come from first principles that align with Islamic values organically. |

---

## WHY AI SEARCH VISIBILITY IS NOW THE TOP PRIORITY

As of April 2026, the search landscape has fundamentally shifted:

- **ChatGPT** reaches 800+ million weekly active participants
- **50%+ of research** now starts with AI assistants, not Google
- **85% of brand mentions** in AI-generated answers come from **third-party sources** — not the brand's own website
- **AI citation half-life is 13 weeks** — content older than 3 months drops sharply from AI responses
- **Reddit accounts for 23%** of all AI-cited domains. YouTube accounts for 13%. LinkedIn accounts for 4%.
- **GX Coin Protocol currently has ZERO third-party content** — meaning AI has almost nothing to cite
- **Name confusion is severe** — AI conflates GX Coin Protocol with GXChain (GXC), Grindery X (GX), and GXCOIN Inc. because those projects have far more indexed content

Every action in this plan is sequenced to maximise both traditional credibility AND AI search visibility simultaneously. The credibility plan IS the AI search strategy.

---

## AUDIT RESULTS (Live Audit: April 15, 2026)

### What Exists (Strengths)

| Asset | Status | SEO/AI Impact |
|-------|--------|---------------|
| Website (gxcoin.money) | Live, 24+ pages, 68 URLs in sitemap | Good foundation |
| Protocol Specification (v8.0) | Written — **NOT deployed** (main branch serves v7.03) | Blocked |
| Green Paper (v3.0) | Published | Good |
| Economic Thesis (v2.0) | Written — **NOT deployed** (same branch issue) | Blocked |
| API Suite documentation (v2.0) | Published | Good |
| robots.txt | AI crawlers permitted (GPTBot, ClaudeBot, PerplexityBot, Anthropic-ai) | **STRONG** |
| llms.txt | Exists with disambiguation + key pages + keywords | **STRONG** |
| Schema markup | Organization + WebSite JSON-LD in layout.tsx | Foundation present |
| Blog | 13 articles (Aug-Sep 2025) — **dormant 7 months** | WEAK — stale content |
| FAQ | 11 questions, 2 cover disambiguation | Moderate |
| Scamadviser | Profile claimed April 14, 2026 — "Verified Business" | DONE |
| Social channels | 10 platforms listed on /social-platforms | Exist but mostly inactive |

### What's Missing (Gaps)

| Gap | Priority | SEO Impact | AI Impact |
|-----|----------|-----------|-----------|
| Protocol Spec v8.0 not deployed to live site | CRITICAL | Inconsistent content | Blocks all downstream work |
| Zero third-party content (no Medium, Reddit, LinkedIn articles) | CRITICAL | Zero backlinks | AI has nothing to cite |
| Blog dormant 7 months | CRITICAL | Signals abandoned project | AI deprioritises stale sites |
| Disambiguation pages return 404 | CRITICAL | Missing entity pages | AI conflates with other projects |
| GitHub has 0 public repos | CRITICAL | Developer credibility gap | Missing authority signal |
| Newsletter link → example.com | HIGH | Broken link on live site | Signals amateurism |
| No physical address/phone on website | HIGH | — | Scamadviser flags this |
| No Crunchbase profile | HIGH | Missing company listing | AI checks Crunchbase for company queries |
| No FAQ schema markup | HIGH | Missed rich snippets | AI can't extract Q&A pairs |
| No Article schema on blog | HIGH | Lower search appearance | AI can't verify authorship/freshness |
| No author/team page | HIGH | Weak E-E-A-T | AI can't verify expertise |
| No Reddit presence | HIGH | Missing community signal | Reddit = 23% of AI citations |
| No Trustpilot page | MEDIUM | — | Scamadviser and AI check reviews |
| No SSRN/ResearchGate | MEDIUM | Missing academic authority | High trust weight for AI |
| No YouTube content | MEDIUM | Missing video signal | YouTube = 13% of AI citations |
| WHOIS data hidden | MEDIUM | — | Scamadviser flags this |
| No Wikipedia mention | MEDIUM | Missing authority signal | Wikipedia = 6.4% of AI citations |
| No press coverage | MEDIUM | No news backlinks | Blocks Wikipedia notability |
| Forum placeholder | LOW | Minor | Can wait for activation |
| llms.txt minor terminology update | LOW | N/A | Minor alignment |

---

## CRITICAL PRIORITY — Do Immediately (Days 1-3)

> These items have the highest impact-to-effort ratio. Most drafts are already written. Executing these 8 items transforms the project from invisible to findable in both Google and AI search.

### C-1. Deploy Website to Main Branch
**Owner:** Manazir Ali
**Effort:** 1 hour | **Blocks:** Everything downstream

The `eco-system` branch contains Protocol Specification v8.0, Economic Thesis v2.0, disambiguation pages, and API documentation updates. The live website on `main` still serves v7.03. All marketing materials reference v8.0.

- [ ] Merge `eco-system` → `main` in the-website repo
- [ ] Deploy to production
- [ ] Verify /docs/whitepaper shows v8.0
- [ ] Verify /about/not-affiliated returns 200 (not 404)
- [ ] Verify /about/why-different returns 200 (not 404)

### C-2. Fix Broken Newsletter Link
**Owner:** Manazir Ali
**Effort:** 5 minutes

- [ ] Replace `https://example.com/newsletter` on /social-platforms page with actual signup URL — or remove the link entirely until a real newsletter exists

### C-3. Add Physical Address & Phone to Website
**Owner:** Azim (provide details) + Manazir (implement)
**Effort:** 30 minutes | **Impact:** +3-5 Scamadviser points, AI trust signal

- [ ] Add to footer or Contact page:
  - **Registered address:** GXC Protocol Foundation, [street address], Zug, Switzerland
  - **Commercial office:** GXC Protocol PTE LTD, [address], Singapore
  - **Phone number** (can be a virtual/VoIP number)

### C-4. Post Reddit Welcome Thread
**Owner:** Azim
**Effort:** 15 minutes | **Impact:** Reddit = 23% of AI-cited domains
**Draft:** `06-reddit-welcome-post.md` (ready, polished, language-spec compliant)

- [ ] Post pinned welcome thread in r/GXCoinProtocol
- [ ] Pin the post (mod menu → "Make Announcement")

### C-5. Publish First Medium Article
**Owner:** Azim
**Effort:** 30 minutes | **Impact:** First third-party content — breaks the zero-backlink barrier
**Draft:** `02-medium-article-no-exchange.md` (ready)

- [ ] Create Medium publication: "GX Coin Protocol"
- [ ] Publish: "Why GX Coin Will Never List on an Exchange — By Design"
- [ ] Include link back to gxcoin.money

### C-6. Publish LinkedIn Article
**Owner:** Azim
**Effort:** 30 minutes | **Impact:** Professional authority + AI citation source
**Draft:** `05-linkedin-article-currency-not-token.md` (ready)

- [ ] Publish on Azim's personal LinkedIn profile: "I'm Building a Currency, Not a Token"
- [ ] Tag #MonetaryReform #DigitalCurrency #Fintech #Economics #Blockchain

### C-7. Resume Blog with First New Post
**Owner:** Azim
**Effort:** 1-2 hours | **Impact:** Breaks 7-month silence — critical freshness signal
**Draft:** `04-blog-project-update-q1-2026.md` (needs [NEED INPUT] sections filled)

- [ ] Fill in [NEED INPUT] sections in draft 04
- [ ] Publish on gxcoin.money/blog
- [ ] Share link on LinkedIn company page and X/Twitter

### C-8. Deploy Disambiguation Page
**Owner:** Manazir Ali (after C-1 deployment)
**Effort:** Already built — just needs deployment
**Draft:** `01-disambiguation-page.md`

- [ ] Verify /about/not-affiliated is live after C-1
- [ ] Submit URL to Google Search Console for indexing
- [ ] Share disambiguation page link on Reddit (separate post from welcome thread)

---

## HIGH PRIORITY — Do Within 2 Weeks (Days 4-14)

> These items build on the critical foundation. They establish institutional credibility, technical SEO infrastructure, and expand the third-party content footprint.

### H-1. GitHub: Publish Org README + Public Repos
**Owner:** Manazir Ali (technical) + Azim (content decisions)
**Effort:** 2-4 hours | **Impact:** Developer credibility + AI authority signal
**Draft:** `10-github-profile-readme.md` (ready)

- [ ] Add organization profile README.md
- [ ] Publish at minimum these public repos:
  - `docs` — protocol specification, economic model documentation
  - `api-examples` — SDK usage examples from the API Suite
  - `protocol-specification` — versioned protocol specification (shows revision history = credibility)
- [ ] Add CONTRIBUTING.md, CODE_OF_CONDUCT.md, LICENSE to each repo
- [ ] Ensure Manazir's GitHub profile shows GX-Coin-Protocol affiliation
- [ ] Establish regular commit activity (even documentation updates)

### H-2. Create Crunchbase Profile
**Owner:** Azim
**Effort:** 2 hours | **Impact:** AI checks Crunchbase for company queries + strong SEO backlink
**Draft:** `11-crunchbase-description.md` (ready)

- [ ] Create profile at crunchbase.com/register
- [ ] Organization name: **GXC Protocol Foundation**
- [ ] Also mention: GXC Protocol PTE LTD (Singapore) as commercial arm
- [ ] Founded: October 2023
- [ ] Headquarters: Zug, Switzerland
- [ ] Key people: M Azim Abdul Majeed (Lead Architect), Manazir Ali (Lead Developer)
- [ ] Link to: gxcoin.money, LinkedIn, Twitter, GitHub

### H-3. Publish Remaining 2 Medium Articles
**Owner:** Azim
**Effort:** 1 hour (drafts ready) | **Impact:** 3 total third-party articles — significant citation mass
**Drafts:** `03-medium-article-demurrage.md`, `12-medium-article-first-principles.md`

- [ ] Publish week 2: "The Case for Demurrage: Why Idle Money Should Cost"
- [ ] Publish week 3: "First Principles Economics: Why GX Coin Doesn't Need a Compliance Label"
- [ ] Cross-post both to Substack (wait 48 hours after Medium to avoid duplicate penalties)

### H-4. Add FAQ Schema Markup
**Owner:** Manazir Ali
**Effort:** 1-2 hours | **Impact:** Rich snippets in Google + AI extracts Q&A pairs directly

- [ ] Add `FAQPage` JSON-LD schema to `/faq/page.tsx`
- [ ] Each question-answer pair as separate `Question` + `acceptedAnswer` objects

### H-5. Add Article Schema to Blog Posts
**Owner:** Manazir Ali
**Effort:** 1-2 hours | **Impact:** AI attributes authorship and checks freshness

- [ ] Add `Article` JSON-LD with `author`, `datePublished`, `dateModified` to `/blog/[slug]/page.tsx`
- [ ] Ensure `dateModified` updates when posts are refreshed

### H-6. Create Author/Team Page
**Owner:** Azim (content) + Manazir (implementation)
**Effort:** 2-3 hours | **Impact:** E-E-A-T signal for Google + AI verifies expertise

- [ ] Create `/about/team` page with at minimum:
  - M Azim Abdul Majeed — Lead Architect (bio, LinkedIn link, role description)
  - Manazir Ali — Lead Developer (bio, GitHub link, role description)
- [ ] Professional photo or avatar for each (photo preferred for credibility)
- [ ] Link from each blog post's author attribution to this page

### H-7. Update llms.txt
**Owner:** Manazir Ali
**Effort:** 30 minutes | **Impact:** Direct instruction to AI crawlers

- [ ] Update protocol specification version reference to v8.0
- [ ] Add new pages: /about/not-affiliated, /about/why-different, /about/team
- [ ] Minor terminology alignment with language specification
- [ ] Add link to Economic Thesis (v2.0)

### H-8. Google Search Console Setup
**Owner:** Manazir Ali
**Effort:** 1 hour

- [ ] Verify site ownership
- [ ] Submit sitemap
- [ ] Check for crawl errors
- [ ] Request indexing for new pages (disambiguation, why-different, team)

### H-9. Unhide Organisation Name in WHOIS
**Owner:** Azim
**Effort:** 30 minutes | **Impact:** +3-5 Scamadviser points

- [ ] Go to domain registrar settings for gxcoin.money
- [ ] Update WHOIS to show: **Registrant Organization:** GXC Protocol Foundation, **Country:** Switzerland
- [ ] Can keep personal name/email/phone private

### H-10. Reddit: Post 5 Substantive Threads
**Owner:** Azim
**Effort:** 2-3 hours total | **Impact:** Builds community signal for AI (23% citation share)

- [ ] Post protocol specification summary as discussion thread
- [ ] Post FAQ thread
- [ ] Post disambiguation thread: "GX Coin Protocol Is Not GXChain, Not Grindery X"
- [ ] Post economic thesis summary
- [ ] Engage in r/cryptocurrency, r/economics when relevant topics arise

---

## MEDIUM PRIORITY — Do Within 4 Weeks (Days 15-30)

> These items deepen the credibility profile and expand reach into additional AI-cited platforms.

### M-1. Upload Protocol Specification to SSRN/ResearchGate
**Owner:** Azim
**Effort:** 2 hours | **Impact:** Academic authority — high trust weight for AI

- [ ] Create SSRN author account for M Azim Abdul Majeed
- [ ] Upload protocol specification v8.0 as working paper under "Alternative Economics" or "Digital Currency"
- [ ] Cross-post to ResearchGate
- [ ] Link from gxcoin.money/docs/whitepaper

### M-2. Claim Trustpilot Business Page
**Owner:** Azim
**Effort:** 1 hour | **Impact:** Scamadviser pulls Trustpilot data + AI checks review platforms

- [ ] Register at business.trustpilot.com and claim gxcoin.money
- [ ] Ask 5-10 early community members to leave genuine reviews about: protocol specification quality, team responsiveness, website professionalism
- [ ] **DO NOT buy fake reviews** — Trustpilot detects these and it backfires

### M-3. Expand FAQ to 25+ Questions
**Owner:** Azim (content) + Manazir (implementation)
**Effort:** 3-4 hours | **Impact:** AI extracts individual Q&A pairs — more questions = more AI answers

- [ ] Add questions covering:
  - "Is GX Coin Protocol the same as GXCOIN Inc.?" (disambiguation)
  - "How does the velocity mechanism work?" (detailed)
  - "What is the Genesis Distribution?" (detailed)
  - "How does GX Coin Protocol compare to Bitcoin?"
  - "How does GX Coin Protocol compare to CBDCs?"
  - "Is GX Coin Protocol a scam?" (directly address)
  - "Who created GX Coin Protocol?" (founder credibility)
  - "Where is GX Coin Protocol based?" (entity credibility)
  - "How do I become a validator?"
  - "What happens to my GX if I lose my device?"
  - Plus 4-5 more from common community questions
- [ ] Each answer: 100-200 words, fact-dense, self-contained (no "see above" references)

### M-4. Create Comparison Pages on Website
**Owner:** Azim (content) + Manazir (implementation)
**Effort:** 4-6 hours | **Impact:** AI cites comparison pages 27.7% of the time

- [ ] "GX Coin Protocol vs Bitcoin vs Stablecoins vs CBDCs" — extract from protocol specification Section 8
- [ ] "GX Coin Protocol vs GXChain vs Grindery X" — standalone disambiguation comparison
- [ ] "Interest-Free Finance: GX Coin Protocol vs Traditional Banking vs DeFi"

### M-5. Submit to Safety Services
**Owner:** Azim
**Effort:** 1 hour

- [ ] Norton Safe Web (safeweb.norton.com)
- [ ] Get Web of Trust (WOT) rating — mywot.com/scorecard/gxcoin.money
- [ ] Ask 5-10 community members to install WOT and rate gxcoin.money

### M-7. Extend Domain Registration to 3-5 Years
**Owner:** Azim
**Effort:** 10 minutes | **Impact:** +2-3 Scamadviser points

- [ ] Check domain registrar — is gxcoin.money registered for 1 year or multiple years?
- [ ] If 1 year, renew for 3-5 years (~$30-50 total)

### M-8. Scamadviser Score Optimisation
**Owner:** Azim
**Effort:** Aggregate of other tasks | **Target:** 90%+ (currently ~76%)

This is the aggregate effect of C-3, H-9, M-2, M-5, M-7. After completing those tasks:
- [ ] Request re-scan at scamadviser.com (visit the check page or use claimed profile)
- [ ] Wait 1-2 weeks after changes before requesting re-scan

**DRAFT PROVIDED:** See file `15-scamadviser-score-improvement.md` for detailed point-by-point plan

---

## LOW PRIORITY — Do Within 8 Weeks (Days 30-60)

> These items require external dependencies (press coverage, production capability) or have lower immediate impact.

### L-1. YouTube: Produce 3 Animated Explainer Videos
**Owner:** Azim (decision on production approach) + vendor/team
**Effort:** HIGH — requires animation production
**Draft:** `14-youtube-video-scripts.md` (3 scripts ready)

Since Azim prefers not to appear on camera:
- [ ] **Motion graphics explainer videos** — animated with professional voiceover
- [ ] **Whiteboard-style videos** — screen recordings of visual explanations
- [ ] **Narrated slide presentations** — Azim or team narrates over slides

**Minimum 3 videos:**
1. "What is GX Coin Protocol?" (3-min animated explainer)
2. "Why no exchange listing?" (2-min animated)
3. "How Genesis Distribution works" (3-min walkthrough)

**AI Optimisation:** Include full transcript in YouTube description — AI indexes transcripts, not audio.

### L-2. Media Outreach & Press Release
**Owner:** Azim
**Effort:** HIGH — requires journalist relationships
**Draft:** `08-press-release.md` (ready with journalist pitch notes)

- [ ] Distribute press release to targeted journalists (not wire services — targeted pitch)
- [ ] Priority outlets: CoinDesk, Rest of World, TechCabal, Islamic Finance News, Positive Money
- [ ] Full outlet list and angles in draft 08

### L-3. Podcast Outreach
**Owner:** Azim
**Effort:** MEDIUM
**Draft:** `09-podcast-pitch.md` (ready, adaptable for any spokesperson)

Options since Azim prefers low profile:
- Option A: Azim does audio-only podcasts (no video, no photo required)
- Option B: Designate a spokesperson/community lead
- Option C: Defer until a willing team representative is available

### L-4. Request Corrections from Aggregator Sites
**Owner:** Azim
**Effort:** 2-3 hours of emails | **Impact:** Reduces AI name confusion

- [ ] Contact Blockspot.io — lists "Gx Coin (GXC)" which is GXChain, not GX Coin Protocol
- [ ] Contact ICOHolder — same conflation
- [ ] Contact CoinRanking, CoinCodex — same conflation
- [ ] Request correction or separate listing for each

### L-5. Wikipedia Stub Article
**Owner:** Azim
**Effort:** 2-3 hours | **Impact:** Wikipedia = 6.4% of AI citations
**Dependency:** Requires press coverage (L-2) for Wikipedia notability criteria

- [ ] Create stub article for "GX Coin Protocol" under digital currency category
- [ ] Requires at least 2-3 independent press sources for notability
- [ ] **Cannot proceed until L-2 generates press coverage**

### L-6. Publish Technical Articles (dev.to, Hashnode)
**Owner:** Manazir Ali
**Effort:** 2-3 hours

- [ ] Publish on dev.to: "Building on GX Coin Protocol — API Architecture Overview"
- [ ] Cross-post to Hashnode for additional backlink
- [ ] Targets developer AI queries ("GX Coin API", "GX Coin developer docs")

### L-7. Audit All Social Channels
**Owner:** Azim
**Effort:** 2 hours

- [ ] Check each platform's follower count, last activity, content quality
- [ ] Prioritize: LinkedIn > X/Twitter > YouTube > Discord > Reddit
- [ ] Dead channels: activate or temporarily remove from /social-platforms page

### L-8. "Why We're Different" Website Page
**Owner:** Manazir Ali (after C-1 deployment)
**Draft:** `07-why-were-different-page.md` (ready)

- [ ] Verify /about/why-different is live after C-1
- [ ] Submit URL to Google Search Console for indexing

---

## REGULAR MAINTENANCE & UPKEEP PLAN

> Execute continuously from Week 1 onwards. These cadences keep the credibility and AI visibility infrastructure alive. AI citation rates drop 3x faster for content not updated quarterly. 50% of AI-cited content is less than 13 weeks old. Freshness is not optional — it is a ranking signal.

### Weekly Cadence

| Day | Action | Platform | Owner | Time |
|-----|--------|----------|-------|------|
| **Monday** | Publish 1 blog post | gxcoin.money/blog | Azim | 1-2 hrs |
| **Monday** | Share blog link with commentary | LinkedIn company page | Azim | 10 min |
| **Tuesday** | Post 1 substantive thread | Reddit r/GXCoinProtocol | Azim | 30 min |
| **Wednesday** | LinkedIn company post (insight, stat, or question) | LinkedIn | Azim | 15 min |
| **Thursday** | X/Twitter post (share content, engage with mentions) | X/Twitter | Azim | 15 min |
| **Friday** | AI visibility test — ask all 4 AI assistants "What is GX Coin Protocol?" and record results | ChatGPT, Perplexity, Claude, Gemini | Azim | 10 min |

**Total weekly commitment: ~4-5 hours**

**Blog topic calendar:** See `13-blog-topic-calendar.md` for 8-week schedule.

### Bi-Weekly Cadence

| Frequency | Action | Platform | Owner |
|-----------|--------|----------|-------|
| Every 2 weeks | Publish 1 long-form article | Medium + Substack (cross-post after 48hrs) | Azim |
| Every 2 weeks | LinkedIn article or thought piece | Azim's personal profile | Azim |

### Monthly Cadence

| Action | Owner | Time |
|--------|-------|------|
| Publish 1 YouTube video with full transcript | Azim + production | Varies |
| Monthly AI visibility audit — test 10 branded and non-branded queries across all 4 AI platforms | Azim | 30 min |
| Review and respond to any Trustpilot/Scamadviser reviews | Azim | 15 min |
| Update LinkedIn company page "About" section if needed | Azim | 15 min |

### Quarterly Cadence

| Action | Owner | Time |
|--------|-------|------|
| Refresh top 20 website pages — update `dateModified`, refresh statistics and dates | Manazir | 2-3 hrs |
| Update protocol specification metadata (even if content unchanged) | Manazir | 30 min |
| Re-audit Scamadviser score — request re-scan if improvements made | Azim | 15 min |
| Review and update llms.txt with any new pages | Manazir | 30 min |
| Full AI visibility benchmark — 10 queries x 4 platforms, compare to previous quarter | Azim | 1 hr |
| Review blog topic calendar — plan next quarter's topics | Azim | 1 hr |

### Content Freshness Triggers (As-Needed)

| Trigger | Action | Timeline |
|---------|--------|----------|
| Any parameter change | Update ALL pages referencing that parameter | Within 48 hours |
| Any new module or feature | Publish blog post + update protocol specification | Within 1 week |
| Any press mention | Share across ALL channels (LinkedIn, X, Reddit, blog) | Within 24 hours |
| New partnership or MOU | Blog post + LinkedIn post + Reddit thread | Within 48 hours |
| Protocol specification version bump | Update llms.txt, all marketing materials, all external profiles | Within 48 hours |

### AI Visibility Tracking Queries

Test these 10 queries weekly (Friday) across ChatGPT, Perplexity, Claude, and Gemini:

| # | Query | Type |
|---|-------|------|
| 1 | "What is GX Coin Protocol?" | Branded |
| 2 | "Is GX Coin a scam?" | Reputation |
| 3 | "GX Coin vs GXChain" | Disambiguation |
| 4 | "demurrage digital currency" | Non-branded, topic authority |
| 5 | "interest-free cryptocurrency" | Non-branded |
| 6 | "gold-anchored digital currency" | Non-branded |
| 7 | "non-speculative cryptocurrency" | Non-branded |
| 8 | "alternative to Bitcoin for productive economy" | Comparison |
| 9 | "Swiss non-profit cryptocurrency" | Entity-specific |
| 10 | "free distribution cryptocurrency no ICO" | Feature-specific |

Record for each: mentioned (yes/no), correct (yes/no), source cited, conflated with other project (yes/no).

---

## REMAINING QUESTIONS

1. How many people are on the team (even a range)?
2. Any advisors willing to be named publicly?
3. What repos from github.com/GX-Coin-Protocol can be made public?
4. Is the wallet (gxcoin.money/wallet) functional or in development?
5. Any partnerships or MOUs that can be announced?
6. Video production capability? (for animated explainers)

---

## EXECUTION TRACKER

### Critical Priority (Days 1-3)

| # | Task | Owner | Status | Done? |
|---|------|-------|--------|-------|
| C-1 | Deploy website to main (v8.0 + pages) | Manazir | NOT STARTED | [ ] |
| C-2 | Fix newsletter link (example.com) | Manazir | NOT STARTED | [ ] |
| C-3 | Add physical address + phone to website | Azim + Manazir | NOT STARTED | [ ] |
| C-4 | Post Reddit welcome thread | Azim | NOT STARTED | [ ] |
| C-5 | Publish first Medium article | Azim | NOT STARTED | [ ] |
| C-6 | Publish LinkedIn article (Azim's profile) | Azim | NOT STARTED | [ ] |
| C-7 | Resume blog with first new post | Azim | IN PROGRESS | [ ] |
| C-8 | Deploy + index disambiguation page | Manazir | BLOCKED by C-1 | [ ] |

### High Priority (Days 4-14)

| # | Task | Owner | Status | Done? |
|---|------|-------|--------|-------|
| H-1 | GitHub: org README + public repos | Manazir + Azim | NOT STARTED | [ ] |
| H-2 | Create Crunchbase profile | Azim | NOT STARTED | [ ] |
| H-3 | Publish remaining 2 Medium articles | Azim | NOT STARTED | [ ] |
| H-4 | Add FAQ schema markup | Manazir | NOT STARTED | [ ] |
| H-5 | Add Article schema to blog | Manazir | NOT STARTED | [ ] |
| H-6 | Create author/team page | Azim + Manazir | NOT STARTED | [ ] |
| H-7 | Update llms.txt | Manazir | NOT STARTED | [ ] |
| H-8 | Google Search Console setup | Manazir | NOT STARTED | [ ] |
| H-9 | Unhide org name in WHOIS | Azim | NOT STARTED | [ ] |
| H-10 | Reddit: 5 substantive threads | Azim | NOT STARTED | [ ] |

### Medium Priority (Days 15-30)

| # | Task | Owner | Status | Done? |
|---|------|-------|--------|-------|
| M-1 | Upload to SSRN/ResearchGate | Azim | NOT STARTED | [ ] |
| M-2 | Claim Trustpilot | Azim | NOT STARTED | [ ] |
| M-3 | Expand FAQ to 25+ questions | Azim + Manazir | NOT STARTED | [ ] |
| M-4 | Create comparison pages | Azim + Manazir | NOT STARTED | [ ] |
| M-5 | Submit to safety services (Norton, WOT) | Azim | NOT STARTED | [ ] |
| M-7 | Extend domain registration | Azim | NOT STARTED | [ ] |
| M-8 | Scamadviser re-scan | Azim | PARTIALLY DONE (claimed) | [ ] |

### Low Priority (Days 30-60)

| # | Task | Owner | Status | Done? |
|---|------|-------|--------|-------|
| L-1 | YouTube: 3 animated videos | Azim + vendor | NOT STARTED | [ ] |
| L-2 | Press release distribution | Azim | NOT STARTED | [ ] |
| L-3 | Podcast outreach | Azim | NOT STARTED | [ ] |
| L-4 | Aggregator site corrections | Azim | NOT STARTED | [ ] |
| L-5 | Wikipedia stub article | Azim | BLOCKED by L-2 | [ ] |
| L-6 | dev.to/Hashnode technical articles | Manazir | NOT STARTED | [ ] |
| L-7 | Audit all social channels | Azim | NOT STARTED | [ ] |
| L-8 | Deploy "Why We're Different" page | Manazir | BLOCKED by C-1 | [ ] |

### Summary

| Priority | Tasks | Done | In Progress | Blocked | Not Started |
|----------|-------|------|-------------|---------|-------------|
| Critical (Days 1-3) | 8 | 0 | 1 | 1 | 6 |
| High (Days 4-14) | 10 | 0 | 0 | 0 | 10 |
| Medium (Days 15-30) | 8 | 0 | 0 | 0 | 7 (+1 partial) |
| Low (Days 30-60) | 8 | 0 | 0 | 2 | 6 |
| **TOTAL** | **34** | **0** | **1** | **3** | **29** (+1 partial) |

---

## FILES IN THIS FOLDER

| # | File | Description | Status |
|---|------|-------------|--------|
| 00 | `00-MASTER-PLAN.md` | This file — master plan and tracker | Complete |
| 01 | `01-disambiguation-page.md` | Website: "Not Affiliated" page | Ready |
| 02 | `02-medium-article-no-exchange.md` | Medium: "Never List on an Exchange" | Ready |
| 03 | `03-medium-article-demurrage.md` | Medium: "The Case for Demurrage" | Ready |
| 04 | `04-blog-project-update-q1-2026.md` | Blog: Q1 2026 update | Needs [NEED INPUT] from Azim |
| 05 | `05-linkedin-article-currency-not-token.md` | LinkedIn: "Currency, not a token" | Ready |
| 06 | `06-reddit-welcome-post.md` | Reddit: pinned welcome post | Ready |
| 07 | `07-why-were-different-page.md` | Website: comparison page | Ready |
| 08 | `08-press-release.md` | Press release + pitch notes | Ready |
| 09 | `09-podcast-pitch.md` | Podcast pitch template | Ready (adaptable) |
| 10 | `10-github-profile-readme.md` | GitHub org README | Ready |
| 11 | `11-crunchbase-description.md` | Crunchbase profile text | Ready |
| 12 | `12-medium-article-first-principles.md` | Medium: "First Principles Economics" | Ready |
| 13 | `13-blog-topic-calendar.md` | 8-week blog topic schedule | Ready |
| 14 | `14-youtube-video-scripts.md` | 3 video scripts (animated/narrated) | Ready |
| 15 | `15-scamadviser-score-improvement.md` | Scamadviser score improvement plan | Ready |
| 16 | `16-seo-geo-ai-search-strategy.md` | SEO & AI Search (GEO) technical guide | Ready |
