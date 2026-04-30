# SEO & Generative Engine Optimisation (GEO) Strategy
## AI Search Visibility for GX Coin Protocol

---

## Why AI Search Visibility Matters More Than Traditional SEO

As of April 2026:
- **ChatGPT** reaches 800+ million weekly active participants
- **Google AI Overviews** appear in 16%+ of all searches
- **50%+ of buyers** initiate product research through AI assistants, not search engines
- **85% of brand mentions** in AI-generated answers come from **third-party sources** — not the brand's own website
- **Citation half-life is 13 weeks** — content older than 3 months drops sharply from AI responses
- **Overlap between top Google links and AI-cited sources has dropped below 20%** — ranking on Google does NOT mean AI will cite you

GX Coin Protocol currently has **zero third-party content** and a **7-month dormant blog**. This means AI assistants have almost nothing to reference when asked about GX Coin Protocol — and when they do, they conflate it with GXChain, Grindery X, or GXCOIN Inc.

---

## Current Technical Baseline (What's Already Done)

### Strengths
| Asset | Status | Notes |
|-------|--------|-------|
| robots.txt | AI crawlers permitted | GPTBot, ClaudeBot, PerplexityBot, Anthropic-ai, Google-Extended all allowed |
| llms.txt | Exists, well-structured | Disambiguation + key pages + keyword mapping |
| Sitemap | 68 URLs indexed | Correct priorities, daily/weekly update frequencies |
| Schema markup | Organization + WebSite JSON-LD in layout.tsx | Foundation is present |
| Meta descriptions | Comprehensive keywords in root layout | 50+ keywords covering brand, financial, crypto, and economic terms |
| CCBot blocked | Intentional | Prevents scraping while allowing legitimate AI |
| Learn hub | 5 educational articles | Topic cluster foundation exists |

### Gaps
| Gap | Impact | Fix |
|-----|--------|-----|
| No FAQ schema on /faq | AI can't extract Q&A pairs | Add `FAQPage` JSON-LD |
| No Article schema on blog | AI can't verify authorship/freshness | Add `Article` JSON-LD with `author`, `datePublished`, `dateModified` |
| No author pages | Zero E-E-A-T for AI trust | Create /about/team with bios |
| Blog dormant since Sep 2025 | AI deprioritises stale content | Resume immediately |
| Zero external content | 85% of AI citations from third-party | Publish on Medium, Reddit, LinkedIn, YouTube |
| llms.txt uses "GX Coin" | Minor language spec misalignment | Update to current terminology |

---

## Implementation Guide

### 1. Schema Markup (Technical — Manazir)

**FAQ Schema** — Add to `/faq/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes GX Coin different from other cryptocurrencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GX Coin Protocol is a non-profit, public-utility protocol..."
      }
    }
  ]
}
```

**Article Schema** — Add to `/blog/[slug]/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "M Azim Abdul Majeed", "url": "/about/team" },
  "datePublished": "...",
  "dateModified": "...",
  "publisher": { "@type": "Organization", "name": "GXC Protocol Foundation" }
}
```

**Organization Schema Enhancement** — Update existing in `layout.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GXC Protocol Foundation",
  "alternateName": ["GX Coin Protocol", "GX Coin", "GX Protocol"],
  "url": "https://gxcoin.money",
  "foundingDate": "2023-10",
  "founders": [
    { "@type": "Person", "name": "M Azim Abdul Majeed", "jobTitle": "Lead Architect" }
  ],
  "address": [
    { "@type": "PostalAddress", "addressLocality": "Zug", "addressCountry": "CH" },
    { "@type": "PostalAddress", "addressLocality": "Singapore", "addressCountry": "SG" }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/gx-coin-protocol/",
    "https://x.com/GXCoinProtocol",
    "https://github.com/GX-Coin-Protocol",
    "https://www.youtube.com/@gxcoinprotocol",
    "https://www.reddit.com/r/GXCoinProtocol",
    "https://discord.com/invite/gxcoin"
  ],
  "nonprofitStatus": "NonprofitABCDEFG"
}
```

---

### 2. Content Structure for AI Extraction

AI systems extract passages without surrounding context. Every paragraph must be **independently meaningful**.

**Rules for all new content:**

1. **First 50 words**: State the main answer directly. No preamble, no "In this article we will explore..."
2. **One idea per paragraph**: Each paragraph should make sense if read alone
3. **Include specific numbers**: "1.25 trillion GX units" not "a large fixed supply"
4. **Avoid backward references**: No "as mentioned above" or "the previously discussed"
5. **Use question-format headings**: "What is the velocity mechanism?" not "Section 2.5: Velocity"
6. **Include a self-contained TL;DR** at the top of every long page (protocol specification, economic thesis)

**Content types AI cites most frequently:**
- Comparison pages (27.7% of citations) — "GX vs Bitcoin vs Stablecoins"
- Informational pages (24.3%) — "What is demurrage?"
- Decision-support pages (21.3%) — "Is GX Coin Protocol legitimate?"

---

### 3. Third-Party Content Distribution Matrix

Each piece of content should be published on **3+ platforms** for maximum AI visibility:

| Content | Own Website | Medium | Reddit | LinkedIn | YouTube | Substack |
|---------|------------|--------|--------|----------|---------|----------|
| No Exchange article | blog post | **primary** | discussion thread | share | — | cross-post |
| Demurrage article | blog post | **primary** | discussion thread | share | — | cross-post |
| First Principles article | blog post | **primary** | discussion thread | share | — | cross-post |
| Currency Not Token (Azim) | — | — | — | **primary** (personal) | — | — |
| What is GX Coin Protocol? | existing | — | — | — | **primary** (video) | — |
| Disambiguation | /about/not-affiliated | article | pinned post | post | — | — |
| Q1 2026 Update | blog post | cross-post | discussion | company post | — | cross-post |

**Cross-posting rules:**
- Publish on the primary platform first
- Wait 48 hours before cross-posting (avoids duplicate content penalties)
- Each cross-post should have a unique introduction paragraph
- Always link back to gxcoin.money (backlink + AI source signal)

---

### 4. AI Disambiguation Strategy

The most urgent AI problem: **name confusion**. When users ask AI about "GX Coin," they get answers about GXChain, Grindery X, or GXCOIN Inc.

**Multi-platform disambiguation attack:**

| Platform | Action | Why It Works |
|----------|--------|-------------|
| llms.txt | Already includes disambiguation — update and maintain | Direct instruction to AI crawlers |
| Website /about/not-affiliated | Deploy dedicated page | Gives AI a canonical disambiguation source |
| Reddit post | "GX Coin Protocol Is Not GXChain, Not Grindery X" | Reddit = #1 AI-cited platform |
| Medium article | "No, We're Not GXChain — A Disambiguation Guide" | Third-party citation source |
| Learn hub article | /learn/gx-coin-vs-other-gx-tokens (may already exist) | On-site authority page |
| Crunchbase | Clear description stating "not affiliated with..." | AI checks Crunchbase for company info |
| FAQ expansion | Add "Is GX Coin the same as GXCOIN Inc.?" | AI extracts FAQ entries directly |

**External corrections to request:**
- Blockspot.io lists "Gx Coin (GXC)" — this is GXChain, not GX Coin Protocol
- ICOHolder lists "Gx Coin" with exchange data — GX Coin Protocol has no exchange listing
- CoinRanking, CoinCodex — same conflation
- Contact each platform to request correction or separate listing

---

### 5. Content Freshness Calendar

| Frequency | Content Type | Platform | AI Signal |
|-----------|-------------|----------|-----------|
| **Weekly** | Blog post | gxcoin.money/blog | Recency signal — keeps site "alive" for AI |
| **Weekly** | 2-3 short posts | LinkedIn company page | Professional authority signal |
| **Weekly** | 1-2 substantive posts | Reddit r/GXCoinProtocol | Community signal — #1 AI citation source |
| **Bi-weekly** | Long-form article | Medium / Substack | Third-party citation source |
| **Monthly** | Video with transcript | YouTube | #2 AI citation source |
| **Quarterly** | Update protocol specification metadata | Website | `dateModified` keeps AI citing the page |
| **Quarterly** | Refresh top 10 pages | Website | Prevents citation decay |

---

### 6. Measurement Framework

**Weekly Manual Test (10 minutes):**

Ask each AI assistant: "What is GX Coin Protocol?"

| AI Assistant | Score: Correct? | Score: Cites gxcoin.money? | Score: Disambiguates from GXChain? |
|-------------|----------------|---------------------------|-------------------------------------|
| ChatGPT | — | — | — |
| Perplexity | — | — | — |
| Claude | — | — | — |
| Gemini | — | — | — |

Track these scores weekly in a simple spreadsheet. Improvement should be visible within 4-6 weeks of executing the third-party content strategy.

**Monthly Branded Query Test (30 minutes):**

Test these 10 queries across all 4 AI platforms:

1. "What is GX Coin Protocol?"
2. "Is GX Coin a scam?"
3. "GX Coin vs Bitcoin"
4. "demurrage digital currency"
5. "interest-free cryptocurrency"
6. "gold-anchored digital currency"
7. "non-speculative cryptocurrency"
8. "GX Coin vs GXChain"
9. "Swiss non-profit cryptocurrency"
10. "free distribution cryptocurrency no ICO"

Record: mentioned (yes/no), correct (yes/no), source cited, sentiment (positive/neutral/negative).

---

## Key Insight: Every Action in the Credibility Plan Is Also a GEO Action

The Digital Credibility Plan and the AI Search strategy are not separate workstreams. Every credibility action directly improves AI visibility:

| Credibility Action | AI Impact |
|-------------------|-----------|
| Crunchbase profile | AI checks Crunchbase for company queries |
| Trustpilot reviews | AI cites review platforms for trust queries |
| Reddit community | Reddit = 23% of AI citations |
| YouTube videos | YouTube = 13% of AI citations |
| Medium articles | Third-party citation source |
| SSRN publication | Academic authority signal |
| Press coverage | AI cites news sources |
| Blog freshness | Recency is a critical AI ranking signal |
| Disambiguation page | Directly fixes AI name confusion |
| GitHub public repos | Developer authority signal |

**The credibility plan IS the AI search strategy.** Execute it and both problems are solved simultaneously.
