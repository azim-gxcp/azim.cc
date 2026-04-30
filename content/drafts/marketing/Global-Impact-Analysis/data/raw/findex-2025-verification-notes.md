# Global Findex 2025 (2024 Data) -- Verification Notes

**Date**: 2026-04-15
**Source**: World Bank Global Findex Database 2025
**Report release**: 2025 (data collected throughout calendar year 2024)
**Survey scope**: ~145,000 adults across 141 economies

---

## 1. API Availability

**Country-level data IS available via the World Bank API.**

Endpoint:
```
https://api.worldbank.org/v2/country/all/indicator/FX.OWN.TOTL.ZS?date=2024&format=json&per_page=300
```

- Returns 266 records total (aggregates + countries)
- 151 non-null records (138 countries + 13 aggregates)
- Indicator: `FX.OWN.TOTL.ZS` (Account ownership at a financial institution or with a mobile-money-service provider, % of population ages 15+)
- Last updated: 2026-04-08

**Downloadable datasets** also available at:
https://www.worldbank.org/en/publication/globalfindex/download-data
- Excel: GlobalFindexDatabase2025.xlsx
- CSV: GlobalFindexDatabase2025.csv
- Stata: GlobalFindexDatabase2025.dta
- ~300 indicators across 5 survey rounds (2011, 2014, 2017, 2021, 2024)

---

## 2. Verification of Known Headline Numbers

| Claim | 2021 Value | 2024 Value (API) | Status |
|-------|-----------|-------------------|--------|
| Global average | 76% (our file had no global row) | 78.74% (API: WLD) | PARTIALLY CONFIRMED -- the 2025 report rounds to 79%; our 2021 baseline of "76%" was approximate; the 2021 API value was ~74% per the report |
| India | 77.53% (our CSV) | 89.02% (API) | CONFIRMED -- report states ~89%, API gives 89.02% |
| Sub-Saharan Africa | 49% (approximate) | 58.18% (API: SSA aggregate) | CONFIRMED -- report states 58% |
| 1.3 billion unbanked | N/A | 1.3 billion | CONFIRMED by multiple sources |

**Correction needed**: Our prior assumption of "Global 2021: 76% -> 2024: 79%" should be refined to "2021: ~74% -> 2024: ~79%" per the Findex report's own framing.

---

## 3. Major Country-Level Changes (2021 to 2024)

Comparing our existing `findex-account-ownership-2021.csv` against the World Bank API 2024 values:

### Largest Increases (>10 percentage points)

| ISO3 | Country | 2021 (%) | 2024 (%) | Change (pp) |
|------|---------|----------|----------|-------------|
| NGA | Nigeria | 45.32 | 63.26 | +17.94 |
| EGY | Egypt | 27.44 | 43.11 | +15.67 |
| KGZ | Kyrgyz Republic | 45.09 | 72.26 | +27.17 |
| ARM | Armenia | 55.35 | 71.37 | +16.02 |
| SEN | Senegal | 55.96 | 76.46 | +20.50 |
| IRQ | Iraq | 18.57 | 30.16 | +11.59 |
| IND | India | 77.53 | 89.02 | +11.49 |
| KEN | Kenya | 79.20 | 90.12 | +10.92 |
| GHA | Ghana | 68.23 | 81.24 | +13.01 |
| CMR | Cameroon | 51.65 | 60.87 | +9.22 |
| MLI | Mali | 43.50 | 54.75 | +11.25 |
| COL | Colombia | 59.72 | 57.06 | -2.66 |
| DOM | Dominican Republic | 51.30 | 64.78 | +13.48 |
| TUR | Turkiye | 74.09 | 81.55 | +7.46 |
| UGA | Uganda | 65.91 | 72.83 | +6.92 |

### Notable Declines

| ISO3 | Country | 2021 (%) | 2024 (%) | Change (pp) |
|------|---------|----------|----------|-------------|
| BGD | Bangladesh | 52.81 | 43.28 | -9.53 |
| ZWE | Zimbabwe | 59.75 | 49.52 | -10.23 |
| BOL | Bolivia | 68.89 | 56.85 | -12.04 |
| DZA | Algeria | 44.10 | 35.29 | -8.81 |
| GRC | Greece | 94.88 | 88.55 | -6.33 |
| PHL | Philippines | 51.37 | 50.18 | -1.19 |
| NIC | Nicaragua | 26.03 | 23.47 | -2.56 |
| CZE | Czechia | 94.94 | 92.28 | -2.66 |
| LBN | Lebanon | 20.70 | 23.04 | +2.34 |

### Key GX-Relevant Markets

| ISO3 | Country | 2021 (%) | 2024 (%) | Change (pp) | Notes |
|------|---------|----------|----------|-------------|-------|
| IND | India | 77.53 | 89.02 | +11.49 | Largest population-weighted gain; report flags high inactivity |
| PAK | Pakistan | 20.98 | 27.30 | +6.32 | Still very low; among top 8 unbanked populations |
| NGA | Nigeria | 45.32 | 63.26 | +17.94 | Dramatic mobile money expansion |
| EGY | Egypt | 27.44 | 43.11 | +15.67 | Strong growth from low base |
| KEN | Kenya | 79.20 | 90.12 | +10.92 | M-Pesa effect continues; now 90%+ |
| IDN | Indonesia | 51.76 | 56.33 | +4.57 | Modest growth; still among top 8 unbanked |
| BGD | Bangladesh | 52.81 | 43.28 | -9.53 | Surprising decline -- possible methodology change or bKash reclassification |
| ZAF | South Africa | 85.38 | 81.13 | -4.25 | Slight decline |
| TZA | Tanzania | 52.43 | 59.83 | +7.40 | Steady mobile money growth |
| SAU | Saudi Arabia | 74.32 | 78.84 | +4.52 | Moderate growth |

---

## 4. New Countries in 2024 Not in Our 2021 File

The 2024 API returned 138 countries. Our 2021 CSV has 123 countries. Countries present in 2024 but not in our 2021 file include:

Azerbaijan, Bahrain, Belize, Botswana, Chad, Comoros, Congo Dem. Rep., Eswatini, Ethiopia, Gambia, Guatemala, Kuwait, Lesotho, Libya, Lithuania (was in 2021 file), Madagascar, Mauritania, Mexico, Montenegro, Niger, Oman, Trinidad and Tobago, Viet Nam, and others.

Notable additions with low inclusion rates (GX-relevant):
- Chad: 20.90%
- Niger: 14.83%
- Madagascar: 24.45%
- Mauritania: 27.31%

---

## 5. Regional Aggregates (2024, from API)

| Code | Region | Account Ownership (%) |
|------|--------|----------------------|
| WLD | World | 78.74 |
| EAP | East Asia & Pacific (excl. HI) | 83.34 |
| ECA | Europe & Central Asia (excl. HI) | 77.85 |
| LAC | Latin America & Caribbean (excl. HI) | 69.72 |
| MNA | MENA + Afghanistan + Pakistan (excl. HI) | 52.91 |
| SAS | South Asia | 77.57 |
| SSA | Sub-Saharan Africa (excl. HI) | 58.18 |
| -- | High income | 94.91 |
| LMY | Low & middle income | 75.45 |
| -- | Low income | 46.44 |
| -- | Lower middle income | 70.39 |
| -- | Upper middle income | 84.04 |

---

## 6. Recommendation

**YES -- update the dataset.** Rationale:

1. **Official 2024 data is now available** via the World Bank API (indicator FX.OWN.TOTL.ZS, date=2024), with 138 country-level values.

2. **Significant changes in key markets**: Nigeria (+18pp), Senegal (+20pp), Kyrgyz Republic (+27pp), Egypt (+16pp), India (+11pp), Kenya (+11pp). These are not marginal updates -- they represent structural shifts in financial inclusion.

3. **15+ new countries** not in our 2021 file, including several low-inclusion economies relevant to GX analysis (Chad, Niger, Madagascar).

4. **Some surprising declines** (Bangladesh -9.5pp, Zimbabwe -10pp, Bolivia -12pp) that affect financial inclusion narratives -- our analysis should reflect current reality.

5. **The downloadable CSV** (GlobalFindexDatabase2025.csv) from the World Bank includes ~300 indicators and all demographic breakdowns, allowing richer analysis beyond just the headline account ownership number.

### Recommended Action
- Download `GlobalFindexDatabase2025.csv` from https://www.worldbank.org/en/publication/globalfindex/download-data
- Create `findex-account-ownership-2024.csv` in the same format as our 2021 file (ISO3, Country, Account_Ownership_Pct, Year)
- Retain the 2021 file for time-series comparison
- Update any analysis documents that reference the 2021 figures

---

## Sources

- World Bank Global Findex Database 2025: https://www.worldbank.org/en/publication/globalfindex
- Data download: https://www.worldbank.org/en/publication/globalfindex/download-data
- API endpoint: https://api.worldbank.org/v2/country/all/indicator/FX.OWN.TOTL.ZS?date=2024&format=json&per_page=300
- BIIA coverage: https://www.biia.com/financial-inclusion-at-record-high-but-1-3-billion-still-unbanked-world-bank-global-findex-2025-report/
- India detail: https://affairscloud.com/wbs-global-findex-report-2025-india-maintains-89-financial-account-ownership-faces-high-inactivity-rates/
