# GX Coin Protocol — Global Impact Analysis
## Methodology, Data Sources & Analytical Framework

**Created:** April 15, 2026
**Author:** M Azim Abdul Majeed (Lead Architect)
**Purpose:** Data-driven analysis of where GX Coin Protocol creates the most value across 195 countries. Produces a GX Impact Index, Treasury Impact calculations, and activation sequencing model.

---

## 1. The Core Question

Traditional financial analysis asks: **"Where is financial risk coming from?"**

For GX Coin Protocol, the question is fundamentally different:

> **"Where will GX create the most value — and where is adoption most viable?"**

GX does not carry default risk in the traditional sense. There is no interest, capital is provided through profit-sharing, and the loan pool is pre-funded from fixed supply. The "risk" for GX is a two-axis problem:

- **Axis 1: Need** — How badly does this country need what GX offers?
- **Axis 2: Readiness** — Can this country's population actually adopt and use a digital currency?

Countries with high need but low readiness (no mobile infrastructure) cannot adopt. Countries with high readiness but low need (already well-banked, stable currency) lack motivation. The sweet spot is **high need + high readiness**.

---

## 2. Variable Selection

### Need Variables (Why GX Matters Here)

| # | Variable | Unit | What It Measures for GX | Primary Source | Verification Source |
|---|----------|------|------------------------|----------------|---------------------|
| N1 | Unbanked adult population | % of adults 15+ without an account | Financial exclusion — GX's core target population. GX requires no bank account. | World Bank Global Findex 2021 | IMF Financial Access Survey |
| N2 | Average remittance cost | % of transfer amount | Extraction cost GX eliminates. GX cross-border fees: 0.15-0.25% vs global average 6.2%. | World Bank Remittance Prices Worldwide (Q4 2024) | KNOMAD Bilateral Remittance Matrix |
| N3 | Remittance inflows as % of GDP | % | Economic dependency on remittances. Higher = more economic impact from fee elimination. | World Bank Migration & Remittances Data | IMF Balance of Payments |
| N4 | Consumer price inflation | % annual (3-year average 2022-2024) | Currency debasement. GX's fixed supply of 1.25 trillion units eliminates monetary inflation. | IMF World Economic Outlook (April 2025) | World Bank World Development Indicators |
| N5 | Government external debt as % of GDP | % | Fiscal stress. GX treasury allocation provides debt-free fiscal capacity. | IMF World Economic Outlook | World Bank International Debt Statistics |

### Readiness Variables (Can They Use It)

| # | Variable | Unit | What It Measures for GX | Primary Source | Verification Source |
|---|----------|------|------------------------|----------------|---------------------|
| R1 | Mobile phone penetration | % of population with mobile subscriptions | Minimum infrastructure for digital currency usage. | ITU World Telecommunication Indicators (2024) | GSMA Mobile Connectivity Index |
| R2 | Internet penetration | % of population using internet | Connectivity for transactions, wallet access, identity verification. | ITU World Telecommunication Indicators (2024) | World Bank WDI |
| R3 | Population (total) | Millions | Determines GX allocation size. More population = larger government treasury allocation. | UN World Population Prospects (2024 revision) | World Bank WDI |
| R4 | GDP per capita | USD (current) | Contextualizes GX allocation impact. A GX 80 per-participant allocation means more in a country with GDP/capita of USD 1,000 than USD 50,000. | World Bank WDI (2024) | IMF WEO |
| R5 | Median age | Years | Younger populations adopt digital technologies faster. Proxy for digital adoption potential. | UN World Population Prospects (2024 revision) | CIA World Factbook |

---

## 3. Calculated Fields

### GX Treasury Impact

For each country, calculate the government treasury allocation and its significance:

```
Treasury Allocation (GX) = Population × GX 80 (Phase 1: first 2B participants)
Treasury Allocation (USD equiv.) = Treasury Allocation (GX) × USD 120 (genesis rate)
Impact Ratio = Treasury Allocation (USD) / External Debt (USD)
Fiscal Multiplier = Treasury Allocation (USD) / Annual Government Revenue (USD)
```

**Parameters used (from as-built source of truth):**
- 1 GX = 1 gram of gold = USD 120 (genesis calibration, 23/24 September 2025)
- Government allocation: GX 80 per participant (Phase 1, first 2B globally)
- Government allocation: GX 40 per participant (Phase 2, next 2B globally)
- Total supply: 1,250,000,000,000 GX (1.25 trillion)
- Government treasury pool: 240,000,000,000 GX (240 billion, 19.2%)

### Individual Grant Impact

```
Per-Participant Grant (Phase 1C, 100M participants) = GX 500 = USD 60,000 equivalent
Per-Participant Grant (Phase 2, 300M participants) = GX 400 = USD 48,000 equivalent
Per-Participant Grant (Phase 5, 2.55B participants) = GX 100 = USD 12,000 equivalent
Per-Participant Grant (Phase 6, 4B participants) = GX 80 = USD 9,600 equivalent
Grant as Multiple of Annual Income = Grant (USD) / GDP per capita
```

### Remittance Savings

```
Annual Remittance Inflow (USD) = GDP × Remittance % of GDP
Current Fee Cost (USD) = Remittance Inflow × Average Remittance Cost %
GX Fee Cost (USD) = Remittance Inflow × 0.25% (GX cross-border maximum)
Annual Savings (USD) = Current Fee Cost - GX Fee Cost
```

---

## 4. Scoring Logic — GX Impact Index

Each variable is normalised to a 0-100 scale, then weighted:

### Need Score (60% of total)

| Variable | Weight | Logic |
|----------|--------|-------|
| N1: Unbanked % | 15% | Higher unbanked = higher score (linear) |
| N2: Remittance cost % | 12% | Higher cost = higher score (GX saves more) |
| N3: Remittance inflows % GDP | 10% | Higher dependency = higher impact |
| N4: Inflation rate | 13% | Higher inflation = higher score (GX fixed supply) |
| N5: Govt debt-to-GDP | 10% | Higher debt = higher score (GX treasury frees fiscal capacity) |

### Readiness Score (40% of total)

| Variable | Weight | Logic |
|----------|--------|-------|
| R1: Mobile penetration | 15% | Higher mobile = higher score (can use GX) |
| R2: Internet penetration | 10% | Higher internet = higher score |
| R3: Population | 5% | Larger population = larger ecosystem (log scale) |
| R4: GDP per capita | 5% | INVERSE — lower GDP/capita = higher relative grant impact |
| R5: Median age | 5% | INVERSE — younger = higher digital adoption potential |

### GX Impact Index

```
GX Impact Index = (Need Score × 0.60) + (Readiness Score × 0.40)
```

### Tier Classification

| Tier | Score Range | Label |
|------|-----------|-------|
| Tier 1 | 75-100 | Maximum Impact |
| Tier 2 | 60-74 | Strong Impact |
| Tier 3 | 45-59 | Moderate Impact |
| Tier 4 | 30-44 | Strategic Impact |
| Tier 5 | 0-29 | Adoption-Led |

---

## 5. Data Integrity Rules

1. **Every data point must be traceable to a named source with a publication date.** No estimated or interpolated values without explicit flagging.
2. **Cross-verification required.** Each variable must have a primary source AND a verification source. Where the two sources disagree by more than 10%, flag the discrepancy and use the more conservative value.
3. **Missing data must be flagged, not filled.** If a country has no data for a variable, mark it "N/A" and exclude that variable from that country's score calculation (re-weight remaining variables proportionally).
4. **Recency matters.** Data must be from 2021 or later. If only older data exists, flag the year and note the limitation.
5. **No rounding before final output.** Intermediate calculations use full precision. Final display rounds to 1 decimal place.
6. **Document every assumption.** If a variable requires interpretation (e.g., "3-year average inflation" uses 2022-2024), state the exact years and calculation method.

---

## 6. Output Files

| File | Location | Description |
|------|----------|-------------|
| `data/01-raw-data-sources.md` | data/ | Links to exact data files, download dates, version numbers |
| `data/02-country-dataset.csv` | data/ | Master dataset: 195 countries × 10 variables + calculated fields |
| `data/03-gx-impact-index.csv` | data/ | Scored and ranked countries with tier classifications |
| `data/04-treasury-impact.csv` | data/ | Government treasury calculations for all countries |
| `data/05-remittance-savings.csv` | data/ | Remittance fee savings calculations for remittance-dependent countries |
| `data/06-data-verification-log.md` | data/ | Log of cross-verification results, discrepancies, and resolutions |
| `dashboards/` | dashboards/ | Power BI or equivalent dashboard files |
| `articles/01-where-gx-matters-most.md` | articles/ | Blog/Medium article: "Where a Non-Speculative Digital Currency Has the Most Impact" |
| `articles/02-treasury-impact-by-country.md` | articles/ | Blog/Medium article: "What GX 80 Per Participant Means for 195 Government Treasuries" |
| `articles/03-remittance-revolution.md` | articles/ | Blog/Medium article: "The USD 48 Billion Remittance Fee Problem — and How GX Solves It" |

---

## 7. Intended Uses

### External (Credibility & AI Visibility)
- Published as blog series on gxcoin.money/blog
- Cross-posted to Medium and LinkedIn (feeds AI citation sources)
- Data-driven content that AI assistants can cite when asked about GX Coin Protocol
- Government outreach materials (country-specific treasury impact sheets)
- Partner/FSP recruitment (country-specific market opportunity data)

### Internal (Strategic)
- Activation sequencing: which countries to prioritise for Genesis Distribution
- Partner recruitment: which countries to target for FSP licensing
- Government engagement: which treasury officials to approach first
- Resource allocation: where to focus localisation, translation, and community building

---

## 8. Relationship to Protocol Parameters

All calculations in this analysis use parameters from the **as-built source of truth** (`infra-topol/as-built/09-TOKENOMICS-PARAMETERS.md`):

| Parameter | Value | Source |
|-----------|-------|--------|
| Total Supply | 1,250,000,000,000 GX | Immutable |
| Gold Peg | 1 GX = 1 gram of gold | Immutable |
| Genesis Calibration | USD 120 per gram | Immutable (23/24 Sep 2025) |
| Govt Allocation Phase 1 | GX 80 per participant (first 2B) | As-built |
| Govt Allocation Phase 2 | GX 40 per participant (next 2B) | As-built |
| Target Population | 4 billion participants | As-built |
| Govt Treasury Pool | 240B GX (19.2%) | As-built |
| Cross-border Fee | 0.15-0.25% | As-built |
| UBI Threshold | GX 24 (USD 2,880 equiv.) | As-built |

If any parameter changes, all calculations in this analysis must be regenerated.
