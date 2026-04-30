# Raw Data Sources — Retrieval Log

**Date Retrieved:** April 15, 2026
**Retrieved By:** M Azim Abdul Majeed

---

## Sources Used

| # | Variable | Source | Dataset | Date Range | Access Method |
|---|----------|--------|---------|-----------|---------------|
| 1 | Account Ownership (% adults 15+) | World Bank Global Findex | FX.OWN.TOTL.ZS | 2021 | World Bank API |
| 2 | Mobile Cellular Subscriptions (per 100 people) | World Bank / ITU | IT.CEL.SETS.P2 | 2022-2023 | World Bank API |
| 3 | Personal Remittances Received (% of GDP) | World Bank / KNOMAD | BX.TRF.PWKR.DT.GD.ZS | 2023 | World Bank API |
| 4 | GDP Per Capita (current USD) | World Bank WDI | NY.GDP.PCAP.CD | 2024 | World Bank API |
| 5 | Total Population | World Bank / UN | SP.POP.TOTL | 2024 | World Bank API |
| 6 | External Debt Stocks (% of GNI) | World Bank IDS | DT.DOD.DECT.GN.ZS | 2022 | World Bank API |
| 7 | Inflation Rate (CPI, annual %) | IMF WEO via StatRanker | PCPIPCH | 2024 | StatRanker.org (IMF source) |

## Verification Sources

| Variable | Primary Source | Verification Source | Status |
|----------|---------------|---------------------|--------|
| Account Ownership | World Bank Global Findex API | Global Findex 2025 report (biia.com summary) | Cross-checked India (78% Findex 2021, 90% Findex 2025) — consistent trend |
| Mobile Subscriptions | World Bank API (ITU source) | ITU Facts & Figures 2024 (regional aggregates match) | Verified |
| Remittances | World Bank API | IMF Balance of Payments (not directly checked — same underlying data) | Primary source trusted |
| GDP Per Capita | World Bank API | IMF WEO (not directly compared — minor variations expected) | Primary source trusted |
| Population | World Bank API (UN source) | UN World Population Prospects 2024 (same underlying data) | Verified |
| External Debt | World Bank API | IMF Fiscal Monitor (not directly compared) | Primary source trusted |
| Inflation | IMF WEO via StatRanker | World Bank WDI FP.CPI.TOTL.ZG (not directly compared) | To be verified for full dataset |

## Missing Data Points

| Country | Variable | Status | Resolution |
|---------|----------|--------|------------|
| Ethiopia | Account Ownership | No Findex 2021 data | Excluded from account ownership scoring; use Findex 2025 when available |
| Mexico | Account Ownership | No Findex 2021 data | Excluded from account ownership scoring |
| Viet Nam | Account Ownership | No Findex 2021 data | Excluded from account ownership scoring |
| Viet Nam | Remittances % GDP | No 2023 data | Excluded from remittance scoring |
| Myanmar | Remittances % GDP | No 2023 data | Excluded from remittance scoring |
| Lebanon | GDP Per Capita | No 2024 data | Use 2023 or estimate |
| Malaysia | External Debt | No data | Excluded from debt scoring |
| Sri Lanka | Inflation | Not in top 100 list | To be sourced separately |
| Thailand | Inflation | Not in top 100 list | To be sourced separately |
| Several countries | Inflation | Not in top 100 list | Low inflation countries — estimate at <3% |

## API Endpoints Used

```
Base: https://api.worldbank.org/v2/country/{codes}/indicator/{indicator}?date={year}&format=json&per_page=50

Countries: NGA;KEN;BGD;PAK;PHL;EGY;IDN;VNM;GHA;SEN;MLI;ETH;IND;TZA;UGA;MMR;MAR;NPL;LKA;KHM;BOL;ARG;TUR;LBN;MEX;BRA;ZAF;THA;MYS;COL
```
