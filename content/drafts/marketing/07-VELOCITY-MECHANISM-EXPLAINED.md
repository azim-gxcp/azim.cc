# The Velocity Mechanism — Explained

## Marketing Content Library — Table of Contents

| # | Document | Description |
|---|----------|-------------|
| **00** | [Content Guidelines](00-CONTENT-GUIDELINES.md) | Master reference — language spec, tone rules, platform guidelines, prohibited terms |
| **01** | [What is GX Protocol](01-WHAT-IS-GX-PROTOCOL.md) | Foundational explainer — key facts, how it works, what makes it different |
| **02** | [Myths and FAQ](02-MYTHS-AND-FAQ.md) | 11 myth-busting responses — "too good to be true" answers, each works standalone |
| **03** | [How GX Compares](03-HOW-GX-COMPARES.md) | Full comparison tables — GX vs Bitcoin, CBDCs, stablecoins, fiat, SDR |
| **04** | [The Numbers](04-THE-NUMBERS.md) | Quantified value propositions — remittance, inflation, lending, tax, exclusion |
| **05** | [For Participants](05-FOR-PARTICIPANTS.md) | Participant-facing messaging — what you get, stories, onboarding tone |
| **06** | [For Governments](06-FOR-GOVERNMENTS.md) | Government engagement — treasury value, CBDC comparison, sovereignty |
| **07** | [Velocity Mechanism Explained](07-VELOCITY-MECHANISM-EXPLAINED.md) | Pond-and-river parable, band schedule, income tax comparison, UBI floor |
| **08** | [Radical Transparency](08-RADICAL-TRANSPARENCY.md) | 88% score, invitation to scrutiny, six criteria for sound money |
| **09** | [Cross-Border Deep-Dive](09-CROSS-BORDER-DEEP-DIVE.md) | USD 48B problem, corridor data, fee chain breakdown, industry benchmarks |
| **10** | [Privacy and Identity](10-PRIVACY-AND-IDENTITY.md) | Court order flow, Bitcoin privacy illusion, no data monetisation |
| **11** | [Interest-Free Lending](11-INTEREST-FREE-LENDING.md) | Mathematical argument, savings tables, moral hazard answer, profit-sharing |
| **12** | [Social Media Content Calendar](12-SOCIAL-MEDIA-CONTENT-CALENDAR.md) | Ready-to-use posts — LinkedIn, Instagram, TikTok, X/Twitter |
| **13** | [Storytelling and Positioning](13-STORYTELLING-AND-POSITIONING.md) | Point of view, human stories, narrative frameworks, content that signals |
| **14** | [Story: The Validator Journey](14-STORY-THE-VALIDATOR-JOURNEY.md) | How the validator economics were discovered — from skepticism to astonishment |
| **15** | [Story: The Partner Journey](15-STORY-THE-PARTNER-JOURNEY.md) | How the partner revenue model evolved — from USD 558B license to sliding scale |
| **16** | [LinkedIn Campaign: Stories](16-LINKEDIN-CAMPAIGN-VALIDATOR-PARTNER-STORIES.md) | Campaign plan, post drafts, poll strategy, response tracking |

> **Content Type**: Educational deep-dive — use for articles, whiteboard videos, infographics, carousel posts
> **Audience**: All — from simple explainer to detailed mechanism
> **Tone**: Precise but accessible. Use the pond-and-river parable for general audiences, numbers for technical audiences.

---

## The Simple Version (Social Media / Short Video)

**The problem**: Fixed-supply money creates a hoarding incentive. If the supply can't grow and the economy does, each unit becomes more valuable over time — so people hold rather than spend. This is what killed Bitcoin as a medium of exchange.

**The solution**: GX is the first fixed-supply monetary system with a built-in anti-hoarding mechanism. It's called the velocity mechanism, and it works like this:

- If you **use** GX — buying, selling, sending, receiving — you pay **nothing** beyond the transaction fee
- If you **hold** GX above a threshold (GX 100, approximately USD 12,000) for more than 360 accumulated days without using it — a small annual rate (3-6%) applies to the idle balance

The mechanism does not touch your income. It does not apply during hardship. It applies only to **idle surplus after all expenses are met**.

---

## The Parable of the Pond and the River

Hoarded wealth is a stagnant pond — water that sits without flow deteriorates, becomes polluted, loses its purity. A flowing river is rich, oxygenated, mineral-laden, and sustains life along its entire course.

The velocity mechanism exists to transform stagnant wealth into flowing wealth — to make idle capital productive and contributory to the broader economy. Today, large concentrations of Bitcoin are hoarded by a small number of individuals and corporations, producing nothing, circulating nowhere, benefiting no one beyond the holder.

The velocity mechanism is GX Protocol's structural answer to this: wealth that moves is wealth that works.

---

## How It Works — Detailed

### The Band Schedule

The rate depends on the total balance. The applicable rate is applied to the **entire balance** (not incrementally):

| Balance Range | Annual Rate |
|-------------|------------|
| Below GX 100 | 0% — exempt |
| GX 100 — GX 2,500 | 3.0% |
| GX 2,501 — GX 5,000 | 3.5% |
| GX 5,001 — GX 10,000 | 4.0% |
| GX 10,001 — GX 25,000 | 4.5% |
| GX 25,001 — GX 50,000 | 5.0% |
| GX 50,001 — GX 100,000 | 5.5% |
| Above GX 100,000 | 6.0% |

### Key Rules

1. **360-day individual cycle**: Each participant's velocity date is personal — based on accumulated days above GX 100, not a fixed calendar year
2. **Accelerating cycle**: After the first year, if the balance stays above GX 100 continuously, the cycle shortens by 5 days each year (360, 355, 350...)
3. **Only applies after expenses**: The mechanism does not burden anyone during loss or difficult times — only when surplus is maintained above the threshold with no pressing liabilities
4. **Calculation on total balance**: GX 32,478 falls in Band 6 → tax = 32,478 × 5.0% = GX 1,623.90

### Where the Collections Go

| Recipient | Share | Purpose |
|-----------|-------|---------|
| Government treasury (participant's jurisdiction) | 40% | Automatic fiscal revenue — no collection infrastructure |
| Charitable pool | 30% | Funds non-profit organisations within the ecosystem |
| UBI pool | 30% | Tops up accounts below GX 24 every 360 days |

### The UBI Floor

Accounts with a balance below GX 24 at the end of a 360-day cycle are automatically topped up to GX 24 from the UBI pool. This guarantees that no participant within the GX economy falls below a subsistence floor.

---

## Why This Is Different From Income Tax

| Dimension | Income Tax | GX Velocity Mechanism |
|-----------|-----------|----------------------|
| When it applies | Before you receive your money | Only on idle surplus after all expenses |
| What it taxes | Income as it's earned | Accumulated surplus not being used |
| Rate | 30-50% in most jurisdictions | 3-6% maximum |
| Collection | Requires massive bureaucracy | Automatic, protocol-level, zero evasion |
| Evasion | USD 427 billion lost annually | Impossible — enforced by code |
| During hardship | Still applies (in most systems) | Does not apply below threshold |

**The comparison**: A participant earning in GX retains 100% of every payment. A participant earning in a typical fiat jurisdiction loses 30-50% to income and payroll tax before the money enters their account, then pays consumption tax on spending.

---

## Dynamic Adjustment (Counter-Cyclical)

The velocity mechanism can be adjusted based on observed economic conditions:

| Circulation Level | Action |
|-------------------|--------|
| Above 80% circulating (healthy) | Rates may decrease by up to 1% across all bands |
| 60-80% circulating (normal) | Baseline rates apply |
| Below 60% circulating (hoarding detected) | Rates may increase by up to 1% across all bands |

**Absolute boundaries**: No band rate may exceed 7% or fall below 2%, regardless of economic conditions.

This is counter-cyclical monetary policy without a central bank — automatic, transparent, and governed by participant-validator consensus.

---

## Social Media Content Ideas

**Instagram Carousel**: "Income Tax vs GX Velocity Mechanism — 5 Key Differences" (one slide per row in the comparison table)

**TikTok**: "What if you kept 100% of your paycheck? In GX, you do. The only cost: 3-6% on money you're not using. Here's how..." (30-second explainer)

**LinkedIn**: "The velocity mechanism is GX Protocol's answer to Bitcoin's deflation problem — and it's the first of its kind in monetary history. Here's why it matters for the 1.4 billion unbanked adults worldwide..."

---

*See also: 04-THE-NUMBERS.md for tax burden comparison tables*
