# JIBEP Paper Outline
## Sub-theme: FinTech and Digital Innovation in Islamic Finance
## Deadline: 15 May 2026

---

# Paper Title

**"Mizan: A Primary-Source Diagnostic Framework for Evaluating Financial Instruments Against Classical Ribawi Characteristics"**

---

# Structured Abstract (~250 words)

**Purpose:** This paper introduces Mizan, an open-access digital diagnostic tool that evaluates financial instruments against classical Islamic jurisprudential criteria derived exclusively from primary sources (Quran, Hadith, and classical scholarly texts). The tool addresses a critical gap in Islamic finance: the absence of a standardised, transparent, source-traceable methodology for assessing Shariah compliance at the structural level rather than the transactional level.

**Design/Methodology:** The diagnostic framework is constructed through a three-stage process: (1) linguistic and juridical analysis of the Arabic roots of Riba, Qard, Dayn, and Bay'; (2) derivation of seven measurable characteristics of ribawi commodities from the Hadith of Riba al-Fadl; (3) implementation as an interactive, rule-based diagnostic engine that routes users through structured questions and returns findings with primary-source citations. The tool introduces a dual-track analytical path that explicitly surfaces the unresolved scholarly question of whether fiat currency satisfies classical ribawi criteria.

**Findings:** Systematic application of the seven ribawi characteristics to modern financial mediums reveals that fiat currency fails all seven criteria, while commodity-based and certain digital mediums satisfy most. The diagnostic framework successfully evaluates common financial products (mortgages, Sukuk, profit-sharing arrangements, cryptocurrency instruments) and produces source-traceable assessments without institutional opinion.

**Originality:** Mizan is the first diagnostic tool to (a) derive evaluation criteria exclusively from primary sources, (b) implement a measurable ribawi characteristics grid across multiple mediums, (c) incorporate a form-versus-substance "strip test" based on Ibn Qayyim and Ibn Taymiyyah, and (d) present two analytical tracks that make the fiat currency question explicit rather than assumed.

**Practical Implications:** The framework offers regulators, practitioners, and researchers a transparent, reproducible methodology for Shariah compliance evaluation that does not depend on institutional consensus.

---

# Keywords (5-6)

Islamic FinTech, Shariah compliance, Riba, Ribawi characteristics, Digital diagnostics, Fiat currency

---

# Paper Structure (~7,000 words)

## 1. Introduction (~800 words)

### 1.1 The Problem
- Contemporary Shariah compliance evaluation relies heavily on institutional Shariah boards and scholar opinions, which vary across jurisdictions and institutions
- There is no standardised, transparent, source-traceable methodology that practitioners and researchers can independently verify
- The rise of FinTech in Islamic finance has focused on digitising existing products (Islamic robo-advisors, digital Sukuk platforms) rather than digitising the analytical framework itself

### 1.2 The Gap
- Existing digital tools for Islamic finance are product-focused (halal stock screeners, Zakat calculators), not methodology-focused
- No tool currently derives its evaluation criteria exclusively from primary sources and makes the derivation chain transparent to users
- The fundamental question of whether modern fiat currency satisfies classical ribawi criteria is rarely surfaced in compliance tools, despite being an open question in Islamic jurisprudence

### 1.3 Research Objective
- Present Mizan as a novel diagnostic framework that shifts Shariah compliance evaluation from opinion-based to evidence-based
- Demonstrate how primary-source derivation can be operationalised into a digital tool
- Evaluate the framework's diagnostic output against common financial instruments

### 1.4 Contribution
- First open-access diagnostic tool built on primary-source derivation
- Novel dual-track framework that explicitly addresses the fiat currency question
- Measurable ribawi characteristics grid applicable across financial mediums
- Reproducible methodology that reduces dependence on institutional opinion

---

## 2. Literature Review (~1,200 words)

### 2.1 Shariah Compliance Screening: Current Approaches
- Review of existing Shariah screening methodologies (AAOIFI, IFSB, S&P, DJIM, FTSE)
- Limitations: focus on financial ratios (debt-to-equity, interest income thresholds) rather than structural analysis
- Dependence on Shariah board opinions, which vary across jurisdictions

### 2.2 Islamic FinTech: State of the Field
- Overview of Islamic FinTech innovation (digital banking, blockchain Sukuk, P2P lending platforms, robo-advisory)
- Gap: FinTech has digitised Islamic financial products but not the underlying jurisprudential methodology
- Reference relevant papers from JIBEP Vol. 2 No. 1 (e.g., blockchain adoption, Islamic monetary policy proposals)

### 2.3 The Ribawi Classification Question
- Classical sources on ribawi commodities: the Hadith of the six items (gold, silver, wheat, barley, dates, salt)
- Scholarly positions on the 'illah (effective cause) that makes an item ribawi
- The unresolved question: does fiat currency satisfy classical ribawi criteria?
- Key scholars: Ibn Qayyim, Ibn Taymiyyah, al-Ghazali on form vs. substance in financial transactions
- Contemporary debate: majority position (fiat = thamaniyyah = ribawi) vs. minority position (fiat fails ribawi characteristics)

### 2.4 Primary-Source Methodology in Islamic Finance Research
- The linguistic-juridical approach: deriving criteria from Arabic morphology and Quranic usage
- Precedent for this methodology in classical usul al-fiqh
- Gap: no existing tool has operationalised this methodology digitally

---

## 3. Methodology (~1,500 words)

### 3.1 Stage 1: Linguistic and Juridical Derivation

#### 3.1.1 Root Analysis
- Analysis of the three-letter Arabic roots: R-B-W/R-B-Y (Riba), Q-R-D (Qard), D-Y-N (Dayn), B-Y-' (Bay')
- Every Quranic occurrence catalogued and contextualised
- Four progressive stages of Quranic prohibition traced (Meccan discouragement to Medinan absolute prohibition)

#### 3.1.2 Hadith Analysis
- Six key hadith references examined, centred on the Hadith of Riba al-Fadl
- The hadith of the six items as the foundation for identifying ribawi characteristics

#### 3.1.3 Classical Scholarly Sources
- Ibn Qayyim's and Ibn Taymiyyah's framework for identifying Hilah (legal subterfuge)
- Al-Ghazali on the function of money (thaman) vs. commodity (sil'ah)

### 3.2 Stage 2: Derivation of Seven Ribawi Characteristics

From the primary-source analysis, seven measurable characteristics are derived that explain why gold, silver, wheat, barley, dates, and salt carry ribawi restrictions:

| # | Characteristic | Arabic | Definition | Measurable Criterion |
|---|---------------|--------|------------|---------------------|
| 1 | Fungibility | Mithiliyyah | Units are interchangeable without quality variation | Can one unit be exchanged for another of identical value at any time? |
| 2 | Intrinsic Value | Qimah Dhatiyyah | Value exists independent of monetary designation | Does the item have utility or value if its monetary status is removed? |
| 3 | Durability of Value | Baqa' | Value persists over time without systematic erosion | Does purchasing power remain stable over multi-year periods? |
| 4 | Universal Acceptance | Rawaj | Accepted broadly through demonstrated utility, not coercion | Is acceptance voluntary and based on perceived value? |
| 5 | Knowable Quality | Sifah Ma'lumah | Quality and value can be assessed at time of transaction | Can both parties determine real value at the point of exchange? |
| 6 | Measurability | Kayl/Wazn | Precisely quantifiable in standardised units | Can the item be divided and measured with precision? |
| 7 | Essential Utility | Hajah 'Ammah | Serves a fundamental economic or human need | Does the item fulfil a need beyond the monetary system? |

### 3.3 Stage 3: Diagnostic Engine Architecture

#### 3.3.1 Six Entry Categories
The tool classifies financial arrangements into six categories: (1) Finance and lending, (2) Investment, (3) Trade and exchange, (4) Personal loans and gifts, (5) Currency and money exchange, (6) Crypto and digital assets

#### 3.3.2 The Dual-Track Framework
- **Track A (Classical):** Full ribawi conditions applied (gold, silver, genuine commodities)
- **Track B (Fiat as classical money):** Mainstream scholarly position applied
- **Track C (Fiat research framework):** Applies findings from the ribawi characteristics analysis

User selects their analytical framework explicitly. The tool does not impose a position.

#### 3.3.3 The Strip Test
Based on Ibn Qayyim and Ibn Taymiyyah: if you remove the asset, commodity, or trade steps from the arrangement, what remains? If the answer is "money in, more money out," the asset layer was likely a Hilah.

#### 3.3.4 Finding Categories
20+ specific violation patterns evaluated, including: core Riba (stipulated excess), fixed returns, absent ownership, absent risk, growing Dayn, Hilah/subterfuge, Tawarruq, leveraged positions, speculative activity (Maysir), excessive uncertainty (Gharar), guaranteed returns, and Riba al-Fadl.

#### 3.3.5 Source Tracing
Every finding is linked to specific primary-source citations (Quran ayah, Hadith reference, classical text passage). No finding is presented without evidential chain.

### 3.4 Implementation
- Built as a browser-based, open-access tool (no registration, no data collection)
- Rule-based engine (not machine learning), ensuring deterministic, reproducible outputs
- Available at [azim.cc/tools/mizan]

---

## 4. Findings (~1,500 words)

### 4.1 Ribawi Characteristics Grid: Cross-Medium Evaluation

Application of the seven characteristics to four mediums:

| Characteristic | Fiat Currency | Gold/Silver | Bitcoin | Commodity-Backed Token |
|---------------|--------------|-------------|---------|----------------------|
| Mithiliyyah (Fungibility) | Fails (inflation erodes equivalence) | Passes | Passes | Passes |
| Qimah Dhatiyyah (Intrinsic Value) | Fails (no utility outside monetary system) | Passes | Fails (speculative) | Passes |
| Baqa' (Durability of Value) | Fails (designed erosion via inflation) | Passes | Partial (fixed supply, but volatile) | Passes |
| Rawaj (Universal Acceptance) | Fails (coerced via legal tender) | Passes | Fails (limited commerce use) | Partial |
| Sifah Ma'lumah (Knowable Quality) | Fails (future purchasing power unknown) | Passes | Partial (transparent but volatile) | Passes |
| Kayl/Wazn (Measurability) | Partial (nominal only) | Passes | Passes | Passes |
| Hajah 'Ammah (Essential Utility) | Fails (no utility outside money) | Passes (ornamental, industrial) | Fails (no material utility) | Passes |
| **Score** | **0/7 (1 partial)** | **7/7** | **2/7 (2 partial)** | **6/7 (1 partial)** |

### 4.2 Diagnostic Output: Common Financial Products

Present diagnostic results for 4-5 representative products:

1. **Conventional mortgage:** Core Riba identified (stipulated excess above principal)
2. **Murabahah home financing (fiat-denominated):** Strip test reveals structural similarity to conventional loan when asset transfer is nominal
3. **Musharakah Mutanaqisah (diminishing partnership):** Passes structural tests on Track A/B; open question on Track C regarding the currency medium
4. **Bitcoin spot trading:** No Riba (no lending); Gharar concern (price volatility); Maysir concern if speculative intent
5. **Organised Tawarruq:** Strip test identifies Hilah; money in, more money out after removing commodity layer

### 4.3 Dual-Track Divergence
- Demonstrate where Tracks A/B and Track C produce different assessments
- The divergence centres on whether interest charges on fiat loans constitute Riba in the classical sense, or whether fiat itself (as a structurally depreciating medium) is the primary concern
- The tool presents both positions with source citations, without imposing a verdict

---

## 5. Discussion (~1,200 words)

### 5.1 Implications for Shariah Compliance Practice
- The framework demonstrates that compliance evaluation can be made transparent, reproducible, and source-traceable
- Reduces dependence on opaque institutional opinions
- Does not replace Shariah scholars but provides them and practitioners with a structured diagnostic baseline

### 5.2 The Fiat Currency Question
- The ribawi characteristics grid makes explicit what is usually assumed: the majority position treats fiat as ribawi without testing it against the classical criteria that defined ribawi commodities
- This paper does not argue for or against either position; it argues that the question should be explicit, not assumed
- Implications for Islamic banking products denominated in fiat currencies

### 5.3 FinTech as Methodology, Not Just Product
- Current Islamic FinTech innovation focuses on digitising products (digital Sukuk, Islamic neobanks)
- This paper argues for digitising the underlying jurisprudential methodology
- A transparent, rule-based diagnostic engine is a different category of FinTech innovation: infrastructure for analysis, not a financial product

### 5.4 Limitations
- The diagnostic is rule-based, not comprehensive of all scholarly positions
- The seven ribawi characteristics are derived from one analytical framework; other derivations exist
- The tool does not constitute a Fatwa and is not intended to replace qualified scholarly opinion
- The fiat currency analysis represents a minority scholarly position; the majority position is acknowledged
- User self-reporting of arrangement details introduces subjectivity

### 5.5 Future Research
- Empirical validation: testing the diagnostic against Shariah board rulings to measure concordance/divergence
- Extension to additional financial instruments (derivatives, structured products, DeFi protocols)
- Collaborative development with Shariah scholars to refine the diagnostic criteria
- Integration with regulatory frameworks (AAOIFI, IFSB standards)

---

## 6. Conclusion (~500 words)

- Restate the problem: Shariah compliance evaluation lacks standardised, transparent, source-traceable methodology
- Summarise the contribution: Mizan provides a primary-source-derived diagnostic framework operationalised as a digital tool
- The ribawi characteristics grid offers a measurable, reproducible evaluation methodology
- The dual-track framework makes the fiat currency question explicit rather than assumed
- The strip test operationalises classical jurisprudential concepts (Ibn Qayyim, Ibn Taymiyyah) for modern financial products
- Call to action: the Islamic finance industry should invest in digitising its analytical methodology, not just its products

---

## References (~30-40 entries, APA 7th Edition)

### Primary Sources
- Quran: relevant ayat on Riba (Al-Baqarah 275-280, Al-Imran 130, Al-Rum 39, Al-Nisa 161)
- Hadith collections: Sahih Muslim (Hadith of the six items), Sahih al-Bukhari
- Classical texts: Ibn Qayyim al-Jawziyyah, Ibn Taymiyyah, al-Ghazali

### Contemporary Islamic Finance
- AAOIFI Shariah Standards
- IFSB guidelines
- Key papers on Islamic FinTech, Shariah screening methodologies
- Papers from JIBEP and comparable journals

### Monetary and Economic Theory
- Federal Reserve M2 data
- World Bank financial inclusion data
- IMF working papers on fiat currency and inflation

---

# Submission Checklist

| Requirement | Specification |
|---|---|
| Word count | Max 7,000 words (excl. references, tables, figures) |
| Font | 11pt Times New Roman |
| Spacing | 1.5 |
| File format | .doc or .docx |
| Language | English (UK spelling) |
| Citation style | APA 7th Edition |
| Plagiarism | Below 19% (target under 15%) |
| Abstract | ~250 words, structured (Purpose/Methodology/Findings/Originality/Implications) |
| Keywords | 5-6 |
| AI disclosure | Must declare any AI assistance (limited to language support) |
| Platform | journal.jibep.org (OJS) |
| Deadline | 15 May 2026 |

---

# Writing Timeline (3 weeks)

| Week | Task |
|------|------|
| Week 1 (Apr 24-30) | Write Sections 1-3 (Introduction, Literature Review, Methodology) |
| Week 2 (May 1-7) | Write Sections 4-5 (Findings, Discussion) |
| Week 3 (May 8-14) | Write Section 6 (Conclusion), Abstract, References, formatting, plagiarism check |
| May 15 | Submit |
