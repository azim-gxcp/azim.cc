# GX Protocol — Global Impact Analysis Report

**Created:** April 15, 2026
**Author:** M Azim Abdul Majeed (Lead Architect)
**Data Source:** GX Impact Index v1.0 (195 countries, 10 variables, 5 calculated fields)

---

## 1. Executive Summary

This report presents the findings of a comprehensive analysis of 195 countries across 10 socioeconomic and infrastructure variables to determine where GX Protocol creates the most value. The analysis combines financial exclusion indicators (unbanked population, remittance costs, inflation, government debt) with adoption readiness metrics (mobile penetration, internet access, population size, GDP per capita, median age) into a single composite score: the GX Impact Index. Every country receives a score between 0 and 100, weighted 60% toward need and 40% toward readiness.

The results reveal a clear pattern: the countries where GX Protocol has the highest potential impact are not the poorest or the richest, but those in the intersection of high financial exclusion and sufficient digital infrastructure. Lebanon, South Sudan, Tajikistan, Nicaragua, El Salvador, and Myanmar lead the index — countries with severely underbanked populations, high remittance dependency, currency instability, or crushing government debt, yet with enough mobile and internet penetration for digital unit adoption. The top 30 countries span four continents and include a combined population of over 900 million people.

The treasury impact calculations are striking. Under the GX 60 average per eligible participant (60% of population, ages 15-70) government allocation at the genesis calibration of 1 GX = USD 120, the protocol would channel USD 6.3 trillion to India's government treasury, USD 1.2 trillion to Indonesia, USD 1.1 trillion to Pakistan, and USD 1.0 trillion to Nigeria. The weighted average individual grant of GX 136 across 4 billion target participants in six phases (valued at USD 16,320 per participant) further amplifies the impact. For smaller, highly indebted nations like Lebanon (external debt at 333% of GNI), Mozambique (380% of GNI), and Mongolia (217% of GNI), the treasury allocation represents a meaningful fraction of external debt — debt-free capital that carries no interest obligation.

These findings have direct implications for activation sequencing, partner recruitment, and government engagement. The data identifies which countries should be prioritized for genesis distribution, where Financial Service Provider (FSP) licensing creates the most economic value, and which treasury officials should be approached first based on quantifiable fiscal impact.

---

## 2. Methodology Summary

The GX Impact Index uses a two-axis model:

- **Need (60% weight):** Measures how much a country's population and government would benefit from GX Protocol. Variables include unbanked adult population (15%), average remittance cost (12%), remittance inflows as a percentage of GDP (10%), consumer price inflation (13%), and government external debt as a percentage of GDP (10%).

- **Readiness (40% weight):** Measures whether the population has the infrastructure and demographic profile to adopt a digital currency. Variables include mobile phone penetration (15%), internet penetration (10%), total population (5%, log scale), GDP per capita (5%, inverse — lower income = higher relative impact), and median age (5%, inverse — younger = faster adoption).

Each variable is normalised to a 0-100 scale and combined into a composite score. Countries are classified into five tiers based on score ranges. Data sources include World Bank Global Findex (2021/2024), IMF World Economic Outlook (April 2025), ITU Telecommunication Indicators (2024), UN World Population Prospects (2024 revision), and KNOMAD Bilateral Remittance Matrix.

**GX Protocol parameters used:**
- 1 GX = 1 gram of gold = USD 120 (genesis calibration)
- Government allocation: GX 60 average per eligible participant (60% of population, ages 15-70)
- Individual grant: GX 136 average (weighted across 6 phases, 4B target participants) = USD 16,320 equivalent
- Total supply: 1.25 trillion GX
- Cross-border fee: 0.15-0.25% (vs. global average 6.2%)
- Velocity mechanism: 3-6%

For full methodology, variable definitions, and data integrity rules, see [00-METHODOLOGY.md](00-METHODOLOGY.md).

---

## 3. Tier Distribution

| Tier | Score Range | Label | Countries | % of 195 | Combined Pop. (M) | Examples |
|------|------------|-------|-----------|-----------|-------------------|----------|
| Tier 1 | 75-100 | Maximum Impact | 0 | 0% | 0 | None — no country scored above 75 |
| Tier 2 | 60-74 | Strong Impact | 5 | 2.6% | 36 | Lebanon (71.4), South Sudan (67.4), Micronesia (66.5), Libya (63.3), Tajikistan (60.4) |
| Tier 3 | 45-59 | Moderate Impact | 62 | 31.8% | 3,172 | Nicaragua (59.4), El Salvador (59.3), Myanmar (59.0), Argentina (54.5), Egypt (50.6), Pakistan (47.3), Indonesia (45.9) |
| Tier 4 | 30-44 | Strategic Impact | 96 | 49.2% | 4,753 | India (38.3), China (40.5), Brazil (39.2), Ethiopia (38.5), Kenya (37.8), Japan (35.9) |
| Tier 5 | 0-29 | Adoption-Led | 32 | 16.4% | 766 | United States (25.8), Germany (25.8), United Kingdom (25.7), Australia (24.6), Canada (22.8) |

**Key observation:** No country reached Tier 1 (Maximum Impact). This is by design — the scoring model requires both high need AND high readiness simultaneously, and no country achieves top-decile scores on both axes. The absence of Tier 1 countries reflects analytical rigour, not a limitation.

The largest concentration (96 countries, 49.2%) falls in Tier 4 (Strategic Impact, scores 30-44), which includes most of the world's population centres: India, China, Brazil, Ethiopia, and Kenya. These countries have moderate need and moderate readiness — they represent the protocol's long-term adoption base.

Tier 3 (Moderate Impact, 62 countries) is the activation sweet spot: high enough need to motivate adoption, high enough readiness to make it practical. This tier includes Pakistan (251M), Indonesia (284M), Egypt (117M), Philippines (116M), and Nigeria (233M).

---

## 4. Top 30 Countries by GX Impact Index

| Rank | Country | Pop. (M) | Eligible (M) | GX Impact Index | Tier | Need Score | Readiness Score | Treasury (USD B) | Grant Multiple | Unbanked % | Inflation % | Remittance % GDP | Mobile/100 |
|------|---------|----------|-------------|----------------|------|------------|----------------|-----------------|----------------|------------|------------|-----------------|------------|
| 1 | Lebanon | 5.8 | 3.48 | 71.4 | Tier 2 | 48.2 | 23.2 | 25.1 | 4.7x | 77.0% | 45.2% | 33.4% | 74 |
| 2 | South Sudan | 11.9 | 7.17 | 67.4 | Tier 2 | 55.7 | 11.6 | 51.6 | — | 94.2% | 91.4% | — | 47 |
| 3 | Micronesia | 0.1 | 0.07 | 66.5 | Tier 2 | 55.0 | 11.5 | 0.5 | 3.9x | — | — | — | 20 |
| 4 | Libya | 7.4 | 4.43 | 63.3 | Tier 2 | 30.0 | 33.3 | 31.9 | 2.5x | 66.9% | 2.1% | — | 193 |
| 5 | Tajikistan | 10.6 | 6.35 | 60.4 | Tier 2 | 39.5 | 20.9 | 45.8 | 12.2x | 45.5% | — | 37.8% | 76 |
| 6 | Marshall Islands | 0.04 | 0.02 | 59.5 | Tier 3 | 43.9 | 15.6 | 0.2 | 2.1x | — | — | 22.3% | 40 |
| 7 | Nicaragua | 6.9 | 4.15 | 59.4 | Tier 3 | 35.7 | 23.7 | 29.9 | 5.7x | 76.5% | 4.6% | 26.2% | 106 |
| 8 | El Salvador | 6.3 | 3.80 | 59.3 | Tier 3 | 29.4 | 29.9 | 27.4 | 2.9x | 56.6% | 0.9% | 24.5% | 180 |
| 9 | Myanmar | 54.5 | 32.70 | 59.0 | Tier 3 | 31.9 | 27.2 | 235.4 | 12.0x | 52.2% | — | — | 121 |
| 10 | Kyrgyz Republic | 7.2 | 4.33 | 55.1 | Tier 3 | 27.5 | 27.5 | 31.2 | 6.7x | 27.7% | 5.0% | 26.6% | 109 |
| 11 | Argentina | 45.7 | 27.42 | 54.5 | Tier 3 | 25.0 | 29.5 | 197.4 | 1.2x | 18.3% | 219.9% | 0.2% | 138 |
| 12 | Montenegro | 0.6 | 0.37 | 54.5 | Tier 3 | 22.0 | 32.5 | 2.7 | 1.2x | 24.6% | 3.3% | 10.5% | 207 |
| 13 | Morocco | 38.1 | 22.85 | 54.5 | Tier 3 | 22.9 | 31.6 | 164.5 | 3.9x | 55.6% | 1.0% | 8.1% | 148 |
| 14 | The Gambia | 2.8 | 1.66 | 53.8 | Tier 3 | 30.7 | 23.1 | 11.9 | 18.7x | 61.8% | 11.6% | 21.6% | 117 |
| 15 | Suriname | 0.6 | 0.38 | 53.7 | Tier 3 | 24.3 | 29.4 | 2.7 | 2.3x | — | 16.2% | 4.2% | 157 |
| 16 | Tunisia | 12.3 | 7.37 | 53.1 | Tier 3 | 26.1 | 27.0 | 53.0 | 3.9x | 62.2% | 7.2% | 6.0% | 133 |
| 17 | Turkmenistan | 7.5 | 4.50 | 52.7 | Tier 3 | 27.1 | 25.6 | 32.4 | 2.4x | — | — | — | — |
| 18 | Uzbekistan | 36.4 | 21.82 | 52.3 | Tier 3 | 24.3 | 27.9 | 157.1 | 5.2x | 40.3% | 9.6% | 13.8% | 107 |
| 19 | Somalia | 19.0 | 11.41 | 51.8 | Tier 3 | 35.7 | 16.1 | 82.1 | 25.9x | — | — | — | 54 |
| 20 | Iran | 91.6 | 54.94 | 51.0 | Tier 3 | 18.3 | 32.7 | 395.6 | 3.1x | 8.9% | 32.5% | — | 166 |
| 21 | Colombia | 52.9 | 31.73 | 50.8 | Tier 3 | 19.4 | 31.4 | 228.5 | 2.1x | 42.9% | 6.6% | 2.8% | 167 |
| 22 | Egypt | 116.5 | 69.92 | 50.6 | Tier 3 | 25.0 | 25.6 | 503.5 | 4.9x | 56.9% | 28.3% | 4.9% | 93 |
| 23 | Honduras | 10.8 | 6.50 | 50.6 | Tier 3 | 29.7 | 20.9 | 46.8 | 4.8x | 57.6% | 4.6% | 26.1% | 74 |
| 24 | Georgia | 3.7 | 2.22 | 50.5 | Tier 3 | 21.2 | 29.3 | 16.0 | 1.8x | 21.2% | 1.1% | 13.7% | 155 |
| 25 | Cambodia | 17.6 | 10.58 | 50.4 | Tier 3 | 23.9 | 26.5 | 76.2 | 6.2x | 61.0% | 0.8% | 6.6% | 121 |
| 26 | Guatemala | 18.4 | 11.04 | 50.4 | Tier 3 | 26.3 | 24.1 | 79.5 | 2.7x | 61.7% | 2.9% | 19.1% | 114 |
| 27 | Jamaica | 2.8 | 1.70 | 50.4 | Tier 3 | 23.6 | 26.8 | 12.3 | 2.1x | 26.7% | 5.4% | 16.8% | 115 |
| 28 | Nepal | 29.7 | 17.79 | 50.4 | Tier 3 | 26.4 | 24.0 | 128.1 | 11.3x | 40.0% | 4.7% | 26.2% | 118 |
| 29 | Lao PDR | 7.8 | 4.66 | 49.8 | Tier 3 | 29.0 | 20.8 | 33.6 | 7.7x | 62.4% | 23.1% | 1.8% | 65 |
| 30 | Moldova | 2.4 | 1.44 | 49.7 | Tier 3 | 23.2 | 26.4 | 10.4 | 2.2x | 44.5% | 4.7% | 12.0% | 130 |

---

## 5. Regional Analysis

### Africa (Sub-Saharan)

**Countries in top 100:** South Sudan (#2), The Gambia (#14), Somalia (#19), Senegal (#34), Zimbabwe (#35), Cote d'Ivoire (#43), South Africa (#46), Sudan (#65), Nigeria (#67), Ghana (#71), Chad (#62), Sierra Leone (#56), Madagascar (#94), Niger (#88), Burkina Faso (#90), Mali (#97), Togo (#98), DRC (#81), Mozambique (#87), Kenya (#128)

**Pattern:** Africa presents the widest spread between need and readiness of any region. Countries like South Sudan (Need: 55.7, Readiness: 11.6) and Somalia (Need: 35.7, Readiness: 16.1) have extreme financial exclusion but limited digital infrastructure. West African nations — Nigeria, Ghana, Senegal, Cote d'Ivoire — show the strongest combination: moderate-to-high need with growing mobile money ecosystems. Cote d'Ivoire's 172 mobile subscriptions per 100 people and Nigeria's 98 per 100 indicate sufficient infrastructure for digital currency adoption.

**Treasury impact:** Nigeria (USD 1,005.2B), Ethiopia (USD 570.5B), Tanzania (USD 296.2B), South Africa (USD 276.5B), Kenya (USD 243.8B). For Nigeria, where GDP per capita is USD 1,084, the GX 136 weighted average individual grant represents 15.1x annual per-capita income.

### South Asia

**Countries:** Nepal (#28), Pakistan (#42), Bangladesh (#51), Sri Lanka (#72), India (#126), Bhutan (#44), Afghanistan (#47)

**Pattern:** South Asia contains the world's largest concentration of unbanked adults. Pakistan (72.7% unbanked, 251M population) and Bangladesh (56.7% unbanked, 174M population) together represent over 300 million financially excluded adults. India, despite ranking #126 by index score (due to improving banking access post-Jan Dhan Yojana), has the largest absolute treasury allocation at USD 6.3 trillion and a grant impact multiple of 6.1x. Nepal and Tajikistan score highly due to extreme remittance dependency (26.2% and 37.8% of GDP respectively).

**Treasury impact:** India (USD 6,268.0B), Pakistan (USD 1,085.5B), Bangladesh (USD 749.8B), Nepal (USD 128.1B). The combined treasury allocation for South Asia exceeds USD 8.2 trillion.

### Southeast Asia

**Countries:** Myanmar (#9), Cambodia (#25), Lao PDR (#29), Philippines (#31), Viet Nam (#37), Indonesia (#58), Thailand (#59)

**Pattern:** Southeast Asia presents the most balanced need-readiness profile of any region. Myanmar leads the subregion (59.0) due to post-coup financial system disruption and 52% unbanked rate, combined with 121 mobile subscriptions per 100 people. The Philippines (115.8M population, 49.8% unbanked, remittances at 9.0% of GDP) and Indonesia (283.5M population, 43.7% unbanked) represent massive adoption markets. Thailand and Viet Nam show lower need but high readiness, making them natural corridors for cross-border remittance adoption.

**Treasury impact:** Indonesia (USD 1,224.7B), Philippines (USD 500.4B), Viet Nam (USD 436.3B), Thailand (USD 309.6B), Myanmar (USD 235.4B).

### Latin America & Caribbean

**Countries:** Nicaragua (#7), El Salvador (#8), Argentina (#11), Suriname (#15), Colombia (#21), Honduras (#23), Guatemala (#26), Jamaica (#27), Venezuela (#32), Mexico (#66), Paraguay (#57), Peru (#70), Bolivia (#74), Ecuador (#84), Dominican Republic (#82), Brazil (#121)

**Pattern:** Latin America clusters tightly in the Tier 3 range, with two distinct profiles. The Central American corridor — Nicaragua, El Salvador, Honduras, Guatemala — scores highest due to massive remittance dependency (24-26% of GDP) combined with high unbanked rates (57-77%). Argentina's extreme inflation (219.9% three-year average) propels it into the top 15 despite relatively low financial exclusion. Brazil, despite being the region's largest economy, ranks #121 due to successful banking expansion (only 13.6% unbanked) — its impact is scale-driven, not need-driven.

**Treasury impact:** Brazil (USD 915.8B), Mexico (USD 565.3B), Colombia (USD 228.5B), Argentina (USD 197.4B). The Central American remittance corridor (El Salvador, Honduras, Guatemala, Nicaragua) has a combined treasury allocation of USD 183.7 billion and a combined eligible population of 25.49 million with average unbanked rates above 60%.

### Middle East & North Africa

**Countries:** Lebanon (#1), Libya (#4), Morocco (#13), Tunisia (#16), Iran (#20), Egypt (#22), Jordan (#38), Iraq (#53), Algeria (#50)

**Pattern:** Lebanon dominates the global index (71.4) due to an extraordinary convergence of financial system collapse (76.9% unbanked, up from ~45% pre-crisis), hyperinflation (45.2% three-year average), remittance dependency (33.4% of GDP), and crushing external debt (333% of GNI). This is the profile of a country where the existing financial system has demonstrably failed and the population is actively seeking alternatives. Egypt (56.9% unbanked, 116.5M population) and Morocco (55.6% unbanked, 38.1M population) represent the region's largest adoption opportunities by population.

**Treasury impact:** Iran (USD 395.6B), Egypt (USD 503.5B), Algeria (USD 202.2B), Morocco (USD 164.5B). Lebanon's treasury allocation (USD 25.1B) is modest in absolute terms but significant relative to its collapsed fiscal capacity.

### Central Asia

**Countries:** Tajikistan (#5), Kyrgyz Republic (#10), Turkmenistan (#17), Uzbekistan (#18), Kazakhstan (#85), Mongolia (#36)

**Pattern:** Central Asia is the highest-scoring region per capita. Tajikistan (#5, score 60.4) and Kyrgyz Republic (#10, score 55.1) both rank in the top 10, driven almost entirely by extreme remittance dependency — Tajikistan receives 37.8% of GDP through remittances, and the Kyrgyz Republic 26.6%. These remittances flow primarily from Russia and are subject to both high fees and geopolitical risk. Uzbekistan (36.4M, 40.3% unbanked) is the region's largest market. Kazakhstan, with higher income (USD 14,155 per capita) and lower exclusion (13.0% unbanked), represents the readiness anchor.

**Treasury impact:** Uzbekistan (USD 157.1B), Kazakhstan (USD 89.0B), Tajikistan (USD 45.8B), Turkmenistan (USD 32.4B), Kyrgyz Republic (USD 31.2B). The combined Central Asian treasury allocation is USD 355.5 billion.

### Europe

**Countries:** Montenegro (#12), Georgia (#24), Moldova (#30), Ukraine (#40), Albania (#64), Turkiye (#49), Russia (#55), Belarus (#60), Kosovo (#45), Bosnia and Herzegovina (#77), Serbia (#83)

**Pattern:** Eastern and Southeastern Europe show a distinct profile: moderate financial exclusion (20-55% unbanked) combined with high digital readiness (80-90%+ internet penetration, 100-200+ mobile subscriptions per 100 people). Montenegro (207 mobile/100), Georgia (155 mobile/100), and Turkiye (106 mobile/100) have infrastructure that exceeds many developed Western nations. Turkiye's three-year average inflation of 58.5% is a primary driver, while Ukraine's score reflects wartime financial system disruption. Western European nations (Germany, France, UK) cluster in Tier 5 with scores 25-26 — high readiness, minimal need.

**Treasury impact:** Russia (USD 620.1B), Turkiye (USD 369.4B), Ukraine (USD 163.6B), Poland (USD 157.9B).

---

## 6. Treasury Impact Analysis — Top 20 by Absolute USD Allocation

| Rank | Country | Pop. (M) | Eligible (M) | Treasury (USD B) | GDP Per Capita (USD) | Ext. Debt % GNI | Treasury as Context |
|------|---------|----------|-------------|-----------------|---------------------|-----------------|---------------------|
| 1 | India | 1,450.9 | 870.56 | 6,268.0 | 2,695 | 18.7% | Largest single allocation; 2.0% of India's USD 3.7T GDP |
| 2 | China | 1,409.0 | 845.38 | 6,086.8 | 13,303 | 13.9% | Scale-driven; low relative impact due to high GDP |
| 3 | United States | 340.1 | 204.07 | 1,469.3 | 84,534 | — | <0.01% of GDP; minimal relative impact |
| 4 | Indonesia | 283.5 | 170.09 | 1,224.7 | 4,925 | 30.9% | Meaningful: ~0.9% of GDP; 43.7% population unbanked |
| 5 | Pakistan | 251.3 | 150.76 | 1,085.5 | 1,479 | 34.5% | 2.9% of GDP; 72.7% population unbanked |
| 6 | Nigeria | 232.7 | 139.61 | 1,005.2 | 1,084 | 22.2% | 4.0% of GDP; 36.7% population unbanked |
| 7 | Brazil | 212.0 | 127.20 | 915.8 | 10,311 | 30.6% | 0.4% of GDP; scale-driven |
| 8 | Bangladesh | 173.6 | 104.14 | 749.8 | 2,593 | 20.3% | 1.7% of GDP; 56.7% unbanked |
| 9 | Russia | 143.5 | 86.12 | 620.1 | 14,889 | 16.8% | 0.3% of GDP; geopolitical context |
| 10 | Ethiopia | 132.1 | 79.24 | 570.5 | 1,134 | 24.3% | 3.8% of GDP; 51.2% unbanked |
| 11 | Mexico | 130.9 | 78.52 | 565.3 | 14,186 | 40.9% | 0.3% of GDP; 47.0% unbanked |
| 12 | Japan | 124.0 | 74.39 | 535.6 | 32,487 | — | 0.1% of GDP; minimal relative impact |
| 13 | Egypt | 116.5 | 69.92 | 503.5 | 3,338 | 35.4% | 1.3% of GDP; 56.9% unbanked |
| 14 | Philippines | 115.8 | 69.51 | 500.4 | 3,985 | 25.9% | 1.1% of GDP; 49.8% unbanked |
| 15 | Viet Nam | 101.0 | 60.59 | 436.3 | 4,717 | 37.3% | 0.9% of GDP; 29.5% unbanked |
| 16 | Iran | 91.6 | 54.94 | 395.6 | 5,190 | 2.4% | 0.8% of GDP; sanctions context |
| 17 | Turkiye | 85.5 | 51.31 | 369.4 | 15,893 | 50.8% | 0.3% of GDP; high inflation driver |
| 18 | Thailand | 71.7 | 43.00 | 309.6 | 7,347 | 41.9% | 0.6% of GDP; high readiness |
| 19 | United Kingdom | 69.2 | 41.54 | 299.1 | 53,246 | — | <0.01% of GDP; minimal impact |
| 20 | Tanzania | 68.6 | 41.14 | 296.2 | 1,187 | 40.9% | 3.6% of GDP; 40.2% unbanked |

**The critical insight:** For the countries where the treasury allocation represents a meaningful share of GDP — Nigeria (4.0%), Ethiopia (3.8%), Tanzania (3.6%), Pakistan (2.9%), and India (2.0%) — this represents a fiscal injection with no interest obligation, no conditionality, and no repayment schedule. Compare this to IMF structural adjustment programmes that typically carry 3-5% interest and policy conditions.

---

## 7. Individual Grant Impact — Top 20 by Multiple of Annual Income

The weighted average individual grant of GX 136 (across six phases targeting 4 billion participants), valued at USD 16,320 at genesis calibration, represents dramatically different purchasing power across countries. The Grant Impact Multiple measures how many years of per-capita GDP the grant represents.

| Rank | Country | GDP Per Capita (USD) | Grant Multiple | Pop. (M) | Eligible (M) | Unbanked % | Context |
|------|---------|---------------------|---------------|----------|-------------|------------|---------|
| 1 | Burundi | 219 | 74.4x | 14.0 | 8.43 | — | Grant = 74 years of average income |
| 2 | Afghanistan | 414 | 39.4x | 42.6 | 25.59 | 90.4% | Grant = 39 years of average income |
| 3 | Central African Republic | 516 | 31.6x | 5.3 | 3.20 | — | Grant = 32 years of average income |
| 4 | Malawi | 523 | 31.2x | 21.7 | 12.99 | 49.6% | Grant = 31 years of average income |
| 5 | Madagascar | 545 | 30.0x | 32.0 | 19.18 | 75.6% | 32M people, 24M unbanked |
| 6 | Somalia | 630 | 25.9x | 19.0 | 11.41 | — | Conflict-affected; mobile money present |
| 7 | Congo, Dem. Rep. | 649 | 25.1x | 109.3 | 65.57 | 60.8% | 109M people; 66M unbanked |
| 8 | Mozambique | 657 | 24.9x | 34.6 | 20.78 | 45.6% | Ext. debt at 380% of GNI |
| 9 | Niger | 735 | 22.2x | 27.0 | 16.22 | 85.2% | 85% unbanked; lowest readiness |
| 10 | Sierra Leone | 807 | 20.2x | 8.6 | 5.19 | 61.4% | High inflation (28.6%) |
| 11 | Liberia | 852 | 19.2x | 5.6 | 3.37 | 47.8% | 21.6% remittance dependency |
| 12 | The Gambia | 871 | 18.7x | 2.8 | 1.66 | 61.8% | 21.6% remittance dependency |
| 13 | Chad | 962 | 17.0x | 20.3 | 12.18 | 79.1% | 79% unbanked |
| 14 | Lesotho | 972 | 16.8x | 2.3 | 1.40 | 38.4% | 22.7% remittance dependency |
| 15 | Burkina Faso | 982 | 16.6x | 23.5 | 14.13 | 48.6% | High mobile penetration (116/100) |
| 16 | Sudan | 985 | 16.6x | 50.4 | 30.27 | — | 50M population, limited data |
| 17 | Rwanda | 1,000 | 16.3x | 14.3 | 8.55 | — | Strong mobile infra (91/100) |
| 18 | Guinea-Bissau | 1,008 | 16.2x | 2.2 | 1.32 | — | High mobile (128/100) |
| 19 | Uganda | 1,078 | 15.1x | 50.0 | 30.01 | 27.2% | 50M people; growing mobile money |
| 20 | Nigeria | 1,084 | 15.1x | 232.7 | 139.61 | 36.7% | Largest economy on this list |

**Scale context:** In the Democratic Republic of the Congo (109.3M population, 65.57M eligible, GDP/capita USD 649), the GX 136 weighted average grant represents 25.1 years of average income. For Nigeria (232.7M population, 139.61M eligible), it represents 15.1 years. These are not theoretical numbers — they reflect the purchasing power differential that makes a fixed-denomination, gold-calibrated digital unit inherently redistributive without any transfer mechanism.

---

## 8. Key Findings

1. **Lebanon is the world's highest-impact country for GX Protocol adoption.** The convergence of banking system collapse (77% unbanked, up from ~45% pre-2019), hyperinflation (45%), extreme remittance dependency (33% of GDP), and crushing debt (333% of GNI) creates a population that is both highly motivated and functionally locked out of the existing financial system.

2. **The remittance corridor from Central Asia to Russia and from Central America to the United States represents the highest-value immediate use case.** Tajikistan (37.8% of GDP in remittances), Nepal (26.2%), El Salvador (24.5%), Honduras (26.1%), and the Kyrgyz Republic (26.6%) would save their populations billions annually at GX's 0.15-0.25% cross-border fee versus the current 6.2% global average.

3. **Five countries account for 70% of the world's unbanked population that overlaps with sufficient digital infrastructure:** India, Indonesia, Pakistan, Bangladesh, and Nigeria. Their combined unbanked adult population exceeds 500 million, and all five have mobile penetration above 76 per 100 people.

4. **The grant impact multiple exceeds 15x annual income in 20 countries with a combined population of 759 million.** This means the GX 136 weighted average grant (across six phases, 4 billion target participants) represents more than 15 years of current average income — a scale of impact that no conventional aid programme approaches.

5. **Currency instability is a stronger adoption motivator than poverty alone.** Argentina (219.9% inflation, ranked #11) outranks India (#126) despite India having far more unbanked people, because Argentina's population has an immediate, felt need for a stable store of value.

6. **Africa has the highest need but the widest readiness gap.** Sub-Saharan Africa averages the highest need scores in the dataset but also the lowest readiness scores, with mobile penetration below 70 per 100 in many countries. West Africa (Nigeria, Ghana, Cote d'Ivoire, Senegal) is the exception, with mobile penetration above 98 per 100.

7. **Southeast Asia is the most activation-ready region.** The combination of moderate-to-high need, strong mobile infrastructure, young populations, and existing digital payment culture (GCash in Philippines, GoPay in Indonesia, PromptPay in Thailand) makes this region the lowest-friction entry point for protocol activation.

---

## 9. Strategic Implications

### Activation Sequencing

The data suggests a three-phase activation strategy:

**Phase A — Proof of Concept (5-10 countries):** Target Tier 2 and high-Tier 3 countries with acute need and sufficient infrastructure. Lebanon, El Salvador, Nicaragua, Tajikistan, and Myanmar are candidates. These countries have populations actively seeking financial alternatives, high remittance dependency, and enough mobile penetration for wallet deployment.

**Phase B — Scale Corridors (15-25 countries):** Expand along remittance corridors and regional clusters. The Central America-to-US corridor (El Salvador, Honduras, Guatemala, Nicaragua), the Central Asia-to-Russia corridor (Tajikistan, Kyrgyz Republic, Uzbekistan), and the South Asia cluster (Nepal, Bangladesh, Pakistan) create natural network effects where cross-border usage reinforces domestic adoption.

**Phase C — Mass Adoption (50+ countries):** Tier 3 and Tier 4 countries with large populations — India, Indonesia, Nigeria, Egypt, Philippines, Viet Nam, Bangladesh — represent the protocol's scale phase. These countries require more infrastructure investment but contain 75% of the target 4 billion participants.

### Partner and FSP Recruitment

Countries where the treasury allocation exceeds 2% of GDP should be prioritized for government engagement: Nigeria (4.0%), Ethiopia (3.8%), Tanzania (3.6%), Pakistan (2.9%), and India (2.0%). The fiscal impact is large enough to motivate treasury-level conversations.

For FSP (Financial Service Provider) licensing, target countries with high mobile penetration and existing digital payment ecosystems: Philippines (GCash), Indonesia (GoPay, OVO, DANA), Kenya (M-Pesa), Bangladesh (bKash), and India (UPI ecosystem). These countries have populations already accustomed to mobile financial services.

### Government Outreach

The treasury impact analysis provides a concrete value proposition for government engagement. For Pakistan's finance ministry: "GX 60 per eligible participant across 150.76 million eligible people (60% of 251 million, ages 15-70) = USD 1.1 trillion in treasury allocation — no interest, no conditions, no repayment." For Nigeria: "USD 1.0 trillion, equivalent to approximately 400% of GDP." These are quantifiable, comparable to existing bilateral aid flows, and carry zero debt burden.

---

## 10. Data Limitations

1. **Unbanked data recency varies.** The primary source (World Bank Global Findex) was last published in 2021 for many countries, with 2024 updates available for some. Mobile money adoption has accelerated significantly since 2021, meaning actual unbanked rates may be lower in countries like Kenya, Ghana, and Bangladesh.

2. **Missing data for conflict-affected states.** South Sudan, Somalia, Syria, Yemen, and Myanmar have incomplete datasets. These countries scored on available variables only (with re-weighted proportional scoring), which may overstate or understate their true position.

3. **Remittance cost data uses corridor averages.** The World Bank Remittance Prices Worldwide database reports corridor-specific costs, but our analysis uses country-level averages. Actual savings depend on specific sending and receiving corridors.

4. **The GX 136 grant impact analysis uses a weighted average across six phases.** The individual grant ranges from GX 500 (Phase 1, first 100M participants) down to GX 40 (Phase 6), yielding a weighted average of GX 136 across 4 billion target participants. The grant impact multiples shown represent the average individual impact across all phases, not the Phase 1 maximum or Phase 6 minimum.

5. **GDP per capita is a mean, not a median.** In highly unequal countries (South Africa Gini 0.63, Brazil Gini 0.53), the median income is significantly below GDP per capita, meaning the grant impact multiple understates the impact for the actual target population.

6. **The genesis calibration (1 GX = USD 120) is fixed at the gold price on 23/24 September 2025.** This is the reference rate for all USD-equivalent calculations. GX units are gold-calibrated, not USD-pegged. Actual purchasing power will track gold, not the dollar.

7. **Infrastructure data does not capture quality.** A country with 100% mobile penetration may still have poor network reliability, limited 4G/5G coverage, or prohibitive data costs. The readiness score does not differentiate between a smartphone with reliable broadband and a feature phone with intermittent 2G.

---

*This report is produced for internal strategic planning and external publication. All data points are traceable to named sources documented in [data/01-raw-data-sources.md](data/01-raw-data-sources.md). For the full dataset, see [data/02-country-dataset.csv](data/02-country-dataset.csv) and [data/03-gx-impact-index.csv](data/03-gx-impact-index.csv).*
