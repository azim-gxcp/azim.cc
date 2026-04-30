# Mobile & Internet Data Verification Notes

**Date**: 2026-04-15
**Analyst**: dev-azim
**Source files verified**:
- `wb-mobile-subscriptions-2023.csv` (210 country entries)
- `wb-internet-users-2023.csv` (184 country entries)

**Primary source**: World Bank Development Indicators (sourced from ITU World Telecommunication/ICT Indicators Database)
**Verification sources**: ITU Facts & Figures 2024, Trading Economics (World Bank mirror), TheGlobalEconomy.com, DataReportal Digital 2023/2024, FRED (St. Louis Fed)

---

## 1. Mobile Cellular Subscriptions -- Anomaly Analysis

### CRITICAL ANOMALY: Fiji (FJI) -- 361.05 per 100

**Status**: LIKELY DATA ERROR -- requires correction or flagging

The dataset reports Fiji at 361.05 mobile subscriptions per 100 people for 2023. Independent verification shows:
- World Bank/Trading Economics report Fiji at **112 per 100 in 2022** (latest available on verification sources)
- A jump from 112 to 361 in one year is implausible for a Pacific island nation of ~930,000 people
- This would imply ~3.36 million active SIM cards for a population under 1 million -- extraordinary even by multi-SIM standards
- No other Pacific island nation shows comparable figures

**Recommendation**: Flag as suspect. Replace with 112 (2022 value) or mark as unverified. This value may reflect a data entry error (possibly 136.1 misread as 361.0, or a raw subscriber count divided by wrong population denominator).

### HIGH VALUES (>200 per 100) -- Verified as Plausible

| Country | Value | Year | Assessment |
|---------|-------|------|------------|
| Hong Kong (HKG) | 319.49 | 2023 | **CONFIRMED** -- World Bank, FRED, Statista all confirm. HK is a known multi-SIM market (business + personal + data-only SIMs). Jumped from 292.8 in 2022. |
| Montenegro (MNE) | 207.24 | 2023 | **CONFIRMED** -- World Bank confirms 207. Small population + tourism SIMs + multi-SIM usage. |
| Sint Maarten (SXM) | 205.37 | 2022 | **PLAUSIBLE** -- Very small population (~44,000) + heavy tourism. Small denominators amplify per-capita figures. |
| Antigua & Barbuda (ATG) | 200.54 | 2022 | **PLAUSIBLE** -- Small island economy with tourism. Consistent with Caribbean patterns. |

**Note**: Values >200 are unusual but not impossible. They occur in: (a) financial/business hubs (Hong Kong, Macao), (b) small tourism-dependent territories, (c) countries with high multi-SIM usage. Values >300 are extremely rare and warrant scrutiny (only Hong Kong and Macao typically exceed 300).

### ELEVATED VALUES (170-200 per 100) -- Spot-Checked

| Country | Value | Assessment |
|---------|-------|------------|
| UAE (ARE) | 199.42 | Plausible -- large expat workforce, business hub |
| Macao (MAC) | 192.48 | Plausible -- casino/tourism hub, similar to Hong Kong |
| Libya (LBY) | 192.97 | Plausible but uses 2022 data; Libya has had high SIM penetration historically |
| Russia (RUS) | 180.84 | Confirmed by World Bank -- Russians commonly hold multiple SIMs |
| El Salvador (SLV) | 179.71 | Plausible -- remittance-driven economy, multiple carriers |
| Botswana (BWA) | 179.03 | Plausible -- dual-SIM common in Southern Africa |
| Japan (JPN) | 178.43 | Plausible -- IoT/M2M SIMs counted, aging population with multiple devices |
| South Africa (ZAF) | 171.51 | Confirmed -- dual-SIM culture well documented |
| Cote d'Ivoire (CIV) | 171.99 | Plausible -- West African multi-SIM culture |
| Thailand (THA) | 168.64 | Plausible -- tourism + multi-SIM |
| Kuwait (KWT) | 167.68 | Plausible -- expat workforce |
| Colombia (COL) | 166.98 | Plausible -- competitive carrier market |
| Iran (IRN) | 166.28 | Plausible -- large young population |

### NOTABLY LOW VALUES -- Verification

| Country | Value | Year | Assessment |
|---------|-------|------|------------|
| North Korea (PRK) | 24.13 | 2022 | **QUESTIONABLE LOW** -- ITU reported 6.35M subscribers at end-2022 for ~26M population = ~24.4 per 100. Mathematically consistent, BUT 38 North estimates 50-80% household penetration. The ITU figure likely understates due to limited reporting from DPRK. Value is internally consistent with ITU source but may undercount. |
| Micronesia (FSM) | 19.99 | 2022 | Plausible -- remote Pacific islands, limited infrastructure |
| Liberia (LBR) | 32.06 | 2022 | Plausible -- post-conflict, limited infrastructure |
| Kosovo (XKX) | 34.54 | 2022 | **SUSPECT LOW** -- Kosovo has decent mobile infrastructure. This may reflect reporting gaps (Kosovo's ITU data is incomplete due to political status). Actual penetration likely 80-100+. |
| Papua New Guinea (PNG) | 34.06 | 2023 | Plausible -- mountainous terrain, rural population, limited coverage |
| Central African Republic (CAF) | 38.82 | 2022 | Plausible -- ongoing conflict, minimal infrastructure |
| Marshall Islands (MHL) | 39.71 | 2022 | Plausible -- tiny remote nation |

### INDIA-SPECIFIC NOTE

India at 80.56 per 100 (2023) is **confirmed** by World Bank/Trading Economics. This seems low given India's 1.1B+ mobile subscribers, but:
- India's population is 1.44 billion (2023)
- TRAI reports ~1.16B subscribers, but active unique users are lower
- The ITU methodology counts active SIMs, not total registrations
- Value is internally consistent with source methodology

### JORDAN-SPECIFIC NOTE

Jordan at 67.55 per 100 (2023) shows a dramatic decline from historical peaks of 196 per 100 (2016). This is **confirmed** by World Bank data. The decline reflects:
- Regulatory SIM registration crackdowns removing inactive prepaid SIMs
- Population growth (including large refugee population)
- Consolidation from multiple SIMs to single smartphones
- This is a real trend, not a data error

---

## 2. Internet Users Percentage -- Anomaly Analysis

### VALUES AT EXACTLY 100% -- Assessment

| Country | Value | Assessment |
|---------|-------|------------|
| Bahrain (BHR) | 100 | **CONFIRMED** -- Multiple sources confirm. Small wealthy nation, near-universal access. ITU methodology may cap at 100%. |
| Saudi Arabia (SAU) | 100 | **CONFIRMED** -- Massive digital transformation investment. Plausible for 2023. |
| UAE (ARE) | 100 | **CONFIRMED** -- High-income, tech-forward, large expat workforce all connected. |

**Note**: Values at exactly 100.00% likely reflect ITU capping the estimate. True penetration could theoretically exceed 100% if methodology counted some users multiple times, but ITU caps at 100%.

### NO VALUES EXCEED 100%

Confirmed: The internet users dataset contains no values above 100%. This is correct -- unlike mobile subscriptions (which count SIMs, not people), internet user percentage is capped at population.

### POTENTIALLY UNDERSTATED VALUES

| Country | Our Value | Independent Source | Gap | Assessment |
|---------|-----------|-------------------|-----|------------|
| Zambia (ZMB) | 16.45 | World Bank 2023: 33%; DataReportal: 21.2% | Large | **LIKELY ERROR** -- Our value of 16.45% is significantly below all independent sources. World Bank itself reports 33% for 2023. This may be an older data point or transcription error. |
| Uganda (UGA) | 9.29 | World Bank: 8.9-15.3% (varies by year) | Moderate | Plausible for ITU estimate, though other sources report higher. The low figure may reflect strict "regular user" definition. |
| Kenya (KEN) | 32.07 | DataReportal Jan 2023: 32.7% | Minimal | **CONFIRMED** -- matches independent sources well. |

### SPOT-CHECK OF MAJOR COUNTRIES

| Country | Our Value | Independent Cross-Check | Status |
|---------|-----------|------------------------|--------|
| China (CHN) | 90.6 | Consistent with ITU/WB reports | OK |
| India (IND) | 60.25 | Consistent with WB range (52-65% depending on methodology) | OK |
| USA | 93.53 | Consistent (Pew: 95%, WB: 93-95%) | OK |
| Indonesia (IDN) | 69.21 | Consistent with DataReportal (~77% by 2024) | OK |
| Brazil (BRA) | 84.15 | Consistent with WB/DataReportal | OK |
| Nigeria (NGA) | 40.06 | Plausible -- large rural population with limited access | OK |
| Bangladesh (BGD) | 44.5 | Consistent with WB reports | OK |
| Russia (RUS) | 92.24 | Consistent with ITU estimates | OK |
| Japan (JPN) | 85.01 | Slightly low vs some sources (90%+), but within range | OK |
| Ethiopia (ETH) | 20.34 | Consistent with WB/ITU | OK |
| DR Congo (COD) | 18.97 | Plausible for conflict-affected nation | OK |
| Pakistan (PAK) | Not in internet dataset | **MISSING** -- Pakistan should be included | GAP |

---

## 3. Data Quality Assessment

### Overall Quality: GOOD with minor issues

The datasets are sourced from World Bank/ITU -- the global standard for telecommunications statistics. The methodology is well-established and internationally comparable.

### Issues Found

| # | Severity | Issue | File | Recommendation |
|---|----------|-------|------|----------------|
| 1 | **HIGH** | Fiji mobile subscriptions at 361.05 -- likely data error | mobile-subscriptions | Replace with ~112 (2022 verified value) or flag with asterisk |
| 2 | **MEDIUM** | Zambia internet at 16.45% vs WB-reported 33% | internet-users | Verify against World Bank portal; likely needs correction to ~33% |
| 3 | **LOW** | Kosovo mobile at 34.54 -- likely incomplete reporting | mobile-subscriptions | Note as data gap due to political status, not true penetration |
| 4 | **LOW** | North Korea data may understate actual penetration | mobile-subscriptions | Acceptable -- ITU methodology is consistent; note limitation |
| 5 | **INFO** | Pakistan missing from internet users file | internet-users | Add Pakistan (~36.5% per WB 2023) |
| 6 | **INFO** | Several entries use 2022 data (noted in Year column) | both files | Acceptable -- some countries report with a lag |

### Countries Using 2022 Data (Not 2023)

Mobile subscriptions file has 23 entries with Year=2022 instead of 2023. These are mostly small island nations and territories where reporting lags are expected: Antigua and Barbuda, Aruba, Barbados, Belize, Bolivia, Bermuda, Cayman Islands, Central African Republic, Dominica, Equatorial Guinea, Eritrea, Faroe Islands, Gibraltar, Greenland, Grenada, Guyana, Haiti, Lebanon, Liberia, Libya, Mali, Marshall Islands, Micronesia, Nauru, New Caledonia, North Korea, St. Lucia, Samoa, San Marino, Sierra Leone, Sint Maarten, Solomon Islands, Sudan, Tonga, Tuvalu, US Virgin Islands.

### Structural Notes

- Mobile subscriptions: 210 entries (good global coverage)
- Internet users: 184 entries (26 fewer countries -- mostly small territories omitted)
- Both files use ISO3 codes consistently
- Year column properly flags non-2023 data points

---

## 4. Corrections Needed Before Use in Analysis

### Mandatory Corrections

1. **Fiji (FJI) mobile subscriptions**: Change 361.05 to 112.0 (or latest verified ITU value) and note as estimated
2. **Zambia (ZMB) internet users**: Verify and likely correct from 16.45 to ~33.0 per World Bank 2023 data

### Recommended Additions

3. **Pakistan (PAK)** internet users: Add row `PAK,Pakistan,36.5,2023` (approximate from WB data)

### Advisory Notes (No Correction Needed)

4. Kosovo mobile figure (34.54) should be treated as a data gap in any analysis, not as representative of actual connectivity
5. Hong Kong (319.49) and Fiji-corrected values should be noted in any per-capita analysis as outliers driven by multi-SIM or data quality, respectively

---

## 5. Verification Sources

- [World Bank -- Mobile cellular subscriptions (per 100 people)](https://data.worldbank.org/indicator/IT.CEL.SETS.P2)
- [World Bank -- Individuals using the Internet (% of population)](https://data.worldbank.org/indicator/IT.NET.USER.ZS)
- [ITU Facts and Figures 2024 -- Subscriptions](https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-subscriptions/)
- [ITU Facts and Figures 2024 -- Internet Use](https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-internet-use/)
- [ITU DataHub -- Mobile-cellular subscriptions](https://datahub.itu.int/data/?e=&c=&i=178)
- [Our World in Data -- Mobile phone subscriptions per 100 people](https://ourworldindata.org/grapher/mobile-cellular-subscriptions-per-100-people)
- [Trading Economics -- World Bank Data Mirrors](https://tradingeconomics.com/)
- [DataReportal -- Digital Reports by Country](https://datareportal.com/)
- [38 North -- North Korea Mobile Communications](https://www.38north.org/2022/11/twenty-years-of-mobile-communications-in-north-korea/)
