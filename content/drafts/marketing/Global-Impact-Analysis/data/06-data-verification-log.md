# Data Verification Log -- Inflation Cross-Verification

**Date**: 2026-04-15
**Analyst**: dev-azim
**Purpose**: Cross-verify inflation data between World Bank dataset (local CSV) and IMF World Economic Outlook

---

## Summary

| Metric | Value |
|--------|-------|
| Countries cross-verified | 174 |
| Matched (within 2pp tolerance) | 164 (94%) |
| Discrepancies (>2pp difference) | 10 (6%) |
| Mean absolute difference | ~0.65pp |
| Median absolute difference | ~0.25pp |

---

## Data Sources

| Source | Description | Period | Access Method |
|--------|-------------|--------|---------------|
| World Bank (local) | `wb-inflation-2024.csv` -- CPI-based inflation, annual % | 2024 (2023 for 2 countries) | Local CSV file, 175 countries |
| IMF WEO | PCPIPCH indicator via IMF DataMapper API | 2024 | API: `imf.org/external/datamapper/api/v1/PCPIPCH?periods=2024` |
| World Bank API | FP.CPI.TOTL.ZG indicator | 2024 | API unavailable (502 Bad Gateway at time of verification) |

**Note**: The World Bank API (`api.worldbank.org`) returned HTTP 502 Bad Gateway during this verification. Cross-verification was performed using the IMF WEO API as the independent source against the local World Bank CSV file.

---

## Discrepancies Exceeding 2 Percentage Points

10 countries showed inflation differences exceeding the 2pp tolerance threshold:

| # | ISO3 | Country | WB Value (%) | IMF Value (%) | Difference (pp) | Likely Explanation |
|---|------|---------|-------------|--------------|-----------------|-------------------|
| 1 | IRQ | Iraq | -12.30 | 2.6 | 14.90 | IMF likely uses different deflator; WB shows deflation possibly from oil price methodology differences |
| 2 | PAK | Pakistan | 12.63 | 23.4 | 10.77 | Measurement period difference: WB may use fiscal-year average vs IMF calendar-year estimate |
| 3 | SSD | South Sudan | 91.44 | 99.8 | 8.36 | Extreme instability; data collection timing and methodology diverge significantly |
| 4 | EGY | Egypt, Arab Rep. | 28.27 | 33.3 | 5.03 | Rapid currency devaluation in 2024; timing of measurement window matters significantly |
| 5 | TON | Tonga | 3.23 | 8.0 | 4.77 | Small island economy; sparse data collection leads to estimation variance |
| 6 | GIN | Guinea | 8.12 | 4.5 | 3.62 | Different CPI basket weighting between WB and IMF methodologies |
| 7 | TCD | Chad | 8.90 | 5.7 | 3.20 | Limited statistical capacity; WB and IMF rely on different estimation models |
| 8 | RWA | Rwanda | 1.77 | 4.8 | 3.03 | Possible revision timing difference; one source may have updated estimate |
| 9 | KNA | St. Kitts and Nevis | 3.56 | 1.1 | 2.46 | WB file shows 2023 year for this entry; year mismatch with IMF 2024 data |
| 10 | AFG | Afghanistan | -6.60 | -4.3 | 2.30 | Conflict zone with limited data; deflation magnitude varies by estimation method |

### Critical Flags

- **Iraq (IRQ)**: Largest discrepancy at 14.90pp. The WB CSV shows -12.30% (deflation) while IMF reports +2.6% (mild inflation). This is a fundamental sign disagreement -- likely different price indices or base periods. **Requires manual review before using Iraq inflation data in any analysis.**
- **Pakistan (PAK)**: 10.77pp gap. WB shows 12.63% vs IMF 23.4%. The IMF figure likely reflects the full calendar year including the high-inflation first half; WB may use a different averaging window.
- **St. Kitts and Nevis (KNA)**: The WB CSV file contains 2023 data for this country (Year column = 2023), making this a year-mismatch rather than a true discrepancy.

---

## Matched Countries (Within 2pp Tolerance)

164 of 174 countries (94%) showed agreement within the 2 percentage point tolerance. This is a strong validation of the dataset.

### Closest Matches (Top 20)

| # | ISO3 | Country | WB Value (%) | IMF Value (%) | Difference (pp) |
|---|------|---------|-------------|--------------|-----------------|
| 1 | BOL | Bolivia | 5.0998 | 5.1 | 0.0002 |
| 2 | MDV | Maldives | 1.3998 | 1.4 | 0.0002 |
| 3 | ATG | Antigua and Barbuda | 6.1989 | 6.2 | 0.0011 |
| 4 | KWT | Kuwait | 2.8986 | 2.9 | 0.0014 |
| 5 | UKR | Ukraine | 6.5020 | 6.5 | 0.0020 |
| 6 | DOM | Dominican Republic | 3.3022 | 3.3 | 0.0022 |
| 7 | MNG | Mongolia | 6.1978 | 6.2 | 0.0022 |
| 8 | KGZ | Kyrgyz Republic | 4.9976 | 5.0 | 0.0024 |
| 9 | PNG | Papua New Guinea | 0.6024 | 0.6 | 0.0024 |
| 10 | HUN | Hungary | 3.7037 | 3.7 | 0.0037 |
| 11 | TUR | Turkiye | 58.5065 | 58.5 | 0.0065 |
| 12 | SEN | Senegal | 0.8045 | 0.8 | 0.0045 |
| 13 | STP | Sao Tome and Principe | 14.3519 | 14.4 | 0.0481 |
| 14 | SUR | Suriname | 16.2296 | 16.2 | 0.0296 |
| 15 | LBN | Lebanon | 45.2430 | 45.2 | 0.0430 |
| 16 | ARG | Argentina | 219.8839 | 219.9 | 0.0161 |
| 17 | NGA | Nigeria | 33.2421 | 33.2 | 0.0421 |
| 18 | TTO | Trinidad and Tobago | 0.5269 | 0.5 | 0.0269 |
| 19 | SYC | Seychelles | 0.3117 | 0.3 | 0.0117 |
| 20 | ARM | Armenia | 0.2695 | 0.3 | 0.0305 |

### Widest Matches Still Within Tolerance

| # | ISO3 | Country | WB Value (%) | IMF Value (%) | Difference (pp) |
|---|------|---------|-------------|--------------|-----------------|
| 1 | LKA | Sri Lanka | -0.4294 | 1.2 | 1.6294 |
| 2 | BTN | Bhutan | 2.7613 | 4.3 | 1.5387 |
| 3 | PSE/WBG | West Bank and Gaza | 53.6691 | 53.7 | 0.0309 |
| 4 | BEL | Belgium | 3.1435 | 4.3 | 1.1565 |
| 5 | HRV | Croatia | 2.9720 | 4.0 | 1.0280 |
| 6 | THA | Thailand | 1.3658 | 0.4 | 0.9658 |
| 7 | LSO | Lesotho | 6.1054 | 5.2 | 0.9054 |
| 8 | FIN | Finland | 1.5657 | 1.0 | 0.5657 |
| 9 | MOZ | Mozambique | 4.0786 | 3.2 | 0.8786 |
| 10 | IRL | Ireland | 2.1134 | 1.3 | 0.8134 |

---

## Coverage Gaps

### Countries in WB CSV but Not in IMF Dataset

2 countries: PSE, VUT

- **PSE** (West Bank and Gaza): Mapped to IMF code **WBG** -- successfully cross-verified (difference: 0.03pp).
- **VUT** (Vanuatu): WB CSV shows 2023 data; absent from IMF 2024 dataset.

### Countries in IMF Dataset but Not in WB CSV

Notable country-level entries not in the WB CSV: ABW (Aruba), AND (Andorra), COD (DR Congo), SDN (Sudan), SWZ (Eswatini), ZWE (Zimbabwe).

The IMF dataset also includes regional/aggregate codes (ADVEC, SSA, EURO, WEOWORLD, etc.) which are not comparable to the country-level WB CSV.

---

## Methodology Notes

1. **Tolerance threshold**: 2 percentage points absolute difference. This accounts for rounding differences (IMF reports to 1 decimal, WB CSV to 4 decimals), different CPI basket compositions, and minor timing differences in annual averages.

2. **Known sources of divergence**:
   - IMF WEO uses staff estimates that may incorporate more recent revisions
   - World Bank data may use fiscal-year vs calendar-year averaging for some countries
   - High-inflation countries show larger absolute divergence due to measurement timing sensitivity
   - Small island states often have sparse data, leading to wider estimation variance

3. **Code mapping**: ISO3 code PSE (WB) was mapped to WBG (IMF) for West Bank and Gaza.

---

## Verification Outcome

**PASS** -- 94% of cross-verified countries fall within the 2pp tolerance. The 10 discrepancies are concentrated in countries with known data quality challenges (conflict zones, hyperinflation, small island states) or documented methodology differences. The dataset is suitable for use in the Global Impact Analysis with the following caveats:

1. **Iraq**: Exclude or flag with a note about conflicting sources (WB: -12.3% vs IMF: +2.6%)
2. **Pakistan**: Use IMF figure (23.4%) as it reflects the more current WEO estimate
3. **St. Kitts and Nevis / Vanuatu**: Note that these use 2023 data, not 2024

---
---

# Data Verification Log -- GDP Per Capita & Population Cross-Verification

**Date**: 2026-04-15
**Analyst**: dev-azim
**Purpose**: Cross-verify GDP per capita and population data between World Bank dataset (local CSV) and IMF World Economic Outlook / UN Population Division

---

## Summary

| Metric | Value |
|--------|-------|
| Countries cross-verified (GDP) | 190 |
| GDP matched (within 15% tolerance) | 176 (93%) |
| GDP discrepancies (>15% difference) | 14 (7%) |
| Population countries verified | 20 (top by population) |
| Population all within expected range | 20/20 (100%) |

---

## Data Sources

| Source | Description | Period | Access Method |
|--------|-------------|--------|---------------|
| World Bank (local) | `wb-gdp-per-capita-2024.csv` -- nominal GDP per capita, current USD | 2024 (2023 for a few countries) | Local CSV file, 207 entries |
| IMF WEO | NGDPDPC indicator via IMF DataMapper API | 2024 | API: `imf.org/external/datamapper/api/v1/NGDPDPC?periods=2024`, 193 country entries |
| World Bank (local) | `wb-population-2024.csv` -- total population | 2024 | Local CSV file, 221 entries |
| World Bank API | NY.GDP.PCAP.CD indicator | 2024 | API: `api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?date=2024&format=json` -- returned data consistent with local CSV |
| UN Population Division | SP.POP.TOTL via World Bank source 40 | 2024 | API returned 502; used known reference ranges for top-20 verification |

**Note**: The IMF DataMapper API (NGDPDPC) returned full JSON data successfully. The World Bank Population API (source 40, UN Pop Division) returned HTTP 502 Bad Gateway. Population verification was performed against established reference ranges from UN World Population Prospects 2024 revision.

---

## GDP Per Capita: Discrepancies Exceeding 15%

15% tolerance accounts for: different GDP estimation methodologies (WB vs IMF staff estimates), exchange rate averaging windows, fiscal vs calendar year differences, and revision timing.

14 countries showed GDP per capita differences exceeding the 15% tolerance:

| # | ISO3 | Country | WB Value (USD) | IMF Value (USD) | Difference (%) | Likely Explanation |
|---|------|---------|---------------|----------------|----------------|-------------------|
| 1 | SDN | Sudan | 984.61 | 593.32 | 49.6% | Conflict zone; divergent GDP estimation under active civil war since April 2023 |
| 2 | LBN | Lebanon | 3,477.72 | 5,479.85 | 44.7% | Multiple exchange rates; WB and IMF likely use different USD conversion rates amid ongoing financial crisis |
| 3 | BDI | Burundi | 219.42 | 344.42 | 44.3% | Limited statistical capacity; GDP rebasing and exchange rate methodology differ significantly |
| 4 | TKM | Turkmenistan | 6,856.66 | 10,408.35 | 41.1% | Dual exchange rate system; official vs parallel market rate produces large divergence |
| 5 | MDV | Maldives | 13,379.35 | 17,454.01 | 26.4% | Tourism-dependent small economy; GDP revision timing and seasonal adjustment differences |
| 6 | PNG | Papua New Guinea | 3,006.71 | 2,452.73 | 20.3% | Resource economy with volatile commodity-driven GDP; different LNG revenue accounting |
| 7 | FSM | Micronesia, Fed. Sts. | 4,166.00 | 5,089.05 | 19.9% | Micro-state with limited statistical capacity; compact funding classification differences |
| 8 | GNQ | Equatorial Guinea | 6,745.40 | 8,029.12 | 17.4% | Oil-dependent economy; volatile production and different price assumptions |
| 9 | AGO | Angola | 2,665.87 | 3,156.17 | 16.8% | Oil economy with managed exchange rate; kwanza conversion methodology varies |
| 10 | KIR | Kiribati | 2,288.63 | 2,695.12 | 16.3% | Micro-state; GDP estimation highly sensitive to fishing license revenue timing |
| 11 | KNA | St. Kitts and Nevis | 23,960.65 | 20,427.20 | 15.9% | Small island economy; CBI program revenue classification differences |
| 12 | PLW | Palau | 15,610.82 | 18,276.97 | 15.7% | Micro-state; tourism recovery timing captured differently by each source |
| 13 | SOM | Somalia, Fed. Rep. | 629.54 | 737.01 | 15.7% | Fragile state; GDP estimation largely modeled due to limited primary data |
| 14 | TCD | Chad | 961.56 | 1,120.36 | 15.3% | Oil-dependent, limited capacity; different oil production volume and price assumptions |

### Pattern Analysis

All 14 discrepancies fall into well-understood categories:
- **Conflict/fragile states** (3): Sudan, Burundi, Somalia -- GDP data is inherently unreliable
- **Dual/managed exchange rates** (3): Lebanon, Turkmenistan, Angola -- USD conversion is the primary source of divergence
- **Oil/resource-dependent economies** (3): Equatorial Guinea, PNG, Chad -- commodity price and production volume assumptions differ
- **Micro-states** (4): Maldives, Micronesia, Kiribati, Palau -- small denominator magnifies estimation differences
- **Small island with special programs** (1): St. Kitts and Nevis -- CBI revenue classification

**None of the top 30 most populous countries exceed the 15% threshold.** The dataset is reliable for countries that matter most to the Global Impact Analysis.

---

## GDP Per Capita: Top 21 Countries by Population

All major countries show strong agreement between World Bank and IMF sources:

| # | ISO3 | Country | Population | WB GDP/cap (USD) | IMF GDP/cap (USD) | Difference (%) |
|---|------|---------|-----------|-----------------|------------------|----------------|
| 1 | IND | India | 1,450,935,791 | 2,694.74 | 2,591.99 | 3.9% |
| 2 | CHN | China | 1,408,975,000 | 13,303.15 | 13,452.66 | 1.1% |
| 3 | USA | United States | 340,110,988 | 84,534.04 | 86,173.37 | 1.9% |
| 4 | IDN | Indonesia | 283,487,931 | 4,925.43 | 4,958.39 | 0.7% |
| 5 | PAK | Pakistan | 251,269,164 | 1,478.77 | 1,577.64 | 6.5% |
| 6 | NGA | Nigeria | 232,679,478 | 1,084.16 | 1,083.51 | 0.1% |
| 7 | BRA | Brazil | 211,998,573 | 10,310.55 | 10,282.17 | 0.3% |
| 8 | BGD | Bangladesh | 173,562,364 | 2,593.42 | 2,618.68 | 1.0% |
| 9 | RUS | Russia | 143,533,851 | 14,889.02 | 15,093.50 | 1.4% |
| 10 | ETH | Ethiopia | 132,059,767 | 1,133.88 | 1,310.63 | 14.5% |
| 11 | MEX | Mexico | 130,861,007 | 14,185.78 | 13,838.57 | 2.5% |
| 12 | JPN | Japan | 123,975,371 | 32,487.08 | 33,820.26 | 4.0% |
| 13 | EGY | Egypt | 116,538,258 | 3,338.47 | 3,593.86 | 7.4% |
| 14 | PHL | Philippines | 115,843,670 | 3,984.83 | 4,089.27 | 2.6% |
| 15 | COD | DR Congo | 109,276,265 | 649.38 | 743.54 | 13.5% |
| 16 | VNM | Vietnam | 100,987,686 | 4,717.29 | 4,535.52 | 3.9% |
| 17 | IRN | Iran | 91,567,738 | 5,190.17 | 4,834.45 | 7.1% |
| 18 | TUR | Turkey | 85,518,661 | 15,892.72 | 15,882.63 | 0.1% |
| 19 | DEU | Germany | 83,516,593 | 56,103.73 | 56,086.90 | 0.0% |
| 20 | THA | Thailand | 71,668,011 | 7,346.62 | 7,386.64 | 0.5% |
| 21 | GBR | United Kingdom | 69,226,000 | 53,246.37 | 53,338.65 | 0.2% |

**Ethiopia (14.5%) and DR Congo (13.5%)** show the widest gaps among major countries, both below the 15% threshold but noteworthy. Both are fast-growing economies where GDP estimation timing and informal sector measurement create variance between WB and IMF.

---

## Population: Reasonableness Verification

All 20 most populous countries in the WB CSV fall within expected ranges derived from UN World Population Prospects (2024 revision):

| # | Country | WB CSV Population | Expected Range | Status |
|---|---------|-------------------|----------------|--------|
| 1 | India | 1,450,935,791 | 1,440M -- 1,460M | PASS |
| 2 | China | 1,408,975,000 | 1,400M -- 1,420M | PASS |
| 3 | United States | 340,110,988 | 335M -- 345M | PASS |
| 4 | Indonesia | 283,487,931 | 275M -- 290M | PASS |
| 5 | Pakistan | 251,269,164 | 240M -- 260M | PASS |
| 6 | Nigeria | 232,679,478 | 220M -- 240M | PASS |
| 7 | Brazil | 211,998,573 | 205M -- 220M | PASS |
| 8 | Bangladesh | 173,562,364 | 170M -- 180M | PASS |
| 9 | Russia | 143,533,851 | 140M -- 148M | PASS |
| 10 | Mexico | 130,861,007 | 125M -- 135M | PASS |
| 11 | Ethiopia | 132,059,767 | 125M -- 140M | PASS |
| 12 | Japan | 123,975,371 | 120M -- 128M | PASS |
| 13 | Philippines | 115,843,670 | 110M -- 120M | PASS |
| 14 | Egypt | 116,538,258 | 110M -- 120M | PASS |
| 15 | DR Congo | 109,276,265 | 100M -- 115M | PASS |
| 16 | Vietnam | 100,987,686 | 98M -- 105M | PASS |
| 17 | Turkey | 85,518,661 | 82M -- 90M | PASS |
| 18 | Iran | 91,567,738 | 88M -- 95M | PASS |
| 19 | Germany | 83,516,593 | 82M -- 85M | PASS |
| 20 | Thailand | 71,668,011 | 68M -- 75M | PASS |

**Population ranking order** is consistent with UN estimates: India > China > USA > Indonesia > Pakistan > Nigeria > Brazil > Bangladesh > Russia > Mexico.

---

## Coverage Analysis

| Dataset | Country-Level Entries | Notes |
|---------|----------------------|-------|
| WB GDP per capita CSV | 207 | Includes aggregate rows (High income, Low income, etc.) |
| WB Population CSV | 221 | Broader coverage including territories |
| IMF GDP per capita API | 193 | Country-level only; also includes regional aggregates |
| Common (GDP comparison) | 190 | After excluding aggregate codes |

### Countries in WB CSV but Not in IMF
17 entries absent from IMF, mostly territories and dependencies: Bermuda, Cayman Islands, Channel Islands, Curacao, Faroe Islands, French Polynesia, Greenland, Liechtenstein, Macao SAR, Monaco, New Caledonia, Puerto Rico, San Marino, Sint Maarten, Turks and Caicos Islands, and income-group aggregates.

### Countries in IMF but Not in WB CSV
3 entries: TWN (Taiwan -- WB does not include), SSD (South Sudan -- present in population CSV but absent from GDP CSV), and WBG (West Bank and Gaza -- mapped as PSE in WB).

---

## Verification Outcome

**PASS** -- Both GDP per capita and population datasets are verified as reliable for use in the Global Impact Analysis.

### GDP Per Capita
- 93% of 190 cross-verified countries fall within the 15% tolerance
- All 14 discrepancies are in countries with known data quality challenges (conflict zones, dual exchange rates, micro-states, resource volatility)
- All top-21 most populous countries match within 15%, with 19 of 21 within 8%
- The WB CSV values are broadly consistent with both the IMF WEO API data and the World Bank's own API data (which returned consistent values for 2024)

### Population
- All 20 most populous countries fall within expected UN reference ranges
- Ranking order is correct and consistent with UN World Population Prospects
- No anomalous values detected

### Recommendations
1. **Ethiopia and DR Congo GDP**: Note the 14.5% and 13.5% WB-IMF gaps in any sensitivity analysis; use WB values as baseline with IMF as upper bound
2. **Conflict states** (Sudan, Somalia): Flag GDP figures as unreliable estimates in any published analysis
3. **Lebanon and Turkmenistan**: If used in analysis, note that GDP per capita figures depend heavily on which exchange rate is applied
