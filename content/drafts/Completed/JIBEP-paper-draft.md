# Mizan: A Primary-Source Diagnostic Framework for Evaluating Islamic Financial Instruments Against Classical Ribawi Characteristics

**M. Azim Abdul Majeed**

Corresponding Author: admin@azim.cc

---

## Abstract

**Purpose:** This paper introduces Mizan, an open-access digital diagnostic tool that evaluates Islamic financial instruments against classical jurisprudential criteria derived exclusively from primary sources (Quran, Hadith, and classical scholarly texts). The tool addresses a critical gap in Islamic finance: the absence of a standardised, transparent, source-traceable methodology for assessing Shariah compliance at the structural level rather than the transactional level.

**Design/Methodology:** Adopting a Design Science Research (DSR) paradigm, the diagnostic framework is constructed through a three-stage process: (1) linguistic and juridical analysis of the Arabic roots of Riba, Qard, Dayn, and Bay'; (2) derivation of seven measurable characteristics of ribawi commodities from the Hadith of Riba al-Fadl; and (3) implementation as an interactive, rule-based diagnostic engine that routes users through structured questions and returns findings with primary-source citations. The tool introduces a dual-track analytical path that explicitly surfaces the unresolved scholarly question of whether fiat currency satisfies classical ribawi criteria.

**Findings:** Systematic application of the seven ribawi characteristics to modern financial mediums reveals that fiat currency fails all seven criteria, while commodity-based mediums satisfy most. The diagnostic framework successfully evaluates common financial products, including conventional mortgages, Islamic home financing structures, organised Tawarruq, and cryptocurrency instruments, producing source-traceable assessments without institutional opinion.

**Originality:** Mizan is the first diagnostic tool to (a) derive evaluation criteria exclusively from primary sources, (b) implement a measurable ribawi characteristics grid across multiple mediums, (c) incorporate a form-versus-substance "strip test" based on Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah, and (d) present two analytical tracks that make the fiat currency question explicit rather than assumed.

**Practical Implications:** The framework offers regulators, practitioners, and researchers a transparent, reproducible methodology for Shariah compliance evaluation that does not depend on institutional consensus, while preserving the primacy of qualified scholarly interpretation.

**Keywords:** Islamic FinTech, Shariah compliance, Riba, ribawi characteristics, digital diagnostics, fiat currency

---

## 1. Introduction

### 1.1 The Problem

The contemporary Islamic finance industry, valued at over USD 4 trillion in assets (Islamic Financial Services Board [IFSB], 2024), relies on Shariah compliance mechanisms that are fundamentally opinion-based. Individual Shariah boards, composed of qualified scholars, review financial products and issue rulings that vary across jurisdictions, institutions, and even time periods. The same product structure may receive approval from one board and rejection from another. The methodology underlying these rulings is rarely published in a form that external researchers or practitioners can independently verify.

This is not a criticism of the scholars involved. It is an observation about the structure of the compliance ecosystem itself. When the analytical methodology is opaque, the industry's credibility depends entirely on the authority of the individuals rather than the transparency of the process. This creates three problems. First, practitioners cannot independently verify whether a product satisfies the primary-source criteria for permissibility. Second, researchers cannot reproduce the analysis or test it against alternative products. Third, the open questions within Islamic jurisprudence, particularly regarding modern financial mediums, are rarely surfaced explicitly, and are instead resolved through institutional consensus without transparent engagement with the evidence.

### 1.2 The Gap in Islamic FinTech

The growth of Islamic FinTech has been substantial. Digital Islamic banking platforms, blockchain-based Sukuk issuance, Islamic robo-advisory services, and peer-to-peer lending platforms compliant with Shariah principles have emerged across multiple jurisdictions (Biancone et al., 2020). However, a review of the existing landscape reveals a consistent pattern: FinTech innovation in Islamic finance has focused on digitising financial products, not on digitising the analytical methodology that determines whether those products are permissible.

Existing digital tools for Islamic finance include halal stock screeners (which apply financial ratio thresholds such as debt-to-equity limits), Zakat calculators, and product comparison platforms. These tools address important needs, but they do not engage with the foundational jurisprudential question: does a given financial arrangement, stripped to its economic substance, contain Riba?

No existing tool derives its evaluation criteria exclusively from primary sources, makes the derivation chain visible to the user, or explicitly addresses the unresolved question of whether modern fiat currency satisfies the classical ribawi criteria that define which items are subject to the prohibition of Riba.

### 1.3 Research Objective

This paper presents Mizan, an open-access, browser-based diagnostic tool that shifts Shariah compliance evaluation from an opinion-dependent process to an evidence-traceable one. The specific objectives are threefold: to demonstrate how primary-source derivation of evaluation criteria can be operationalised into a digital diagnostic; to present the ribawi characteristics grid as a measurable, reproducible evaluation methodology applicable across financial mediums; and to evaluate the framework's diagnostic output against representative financial instruments.

### 1.4 Contribution

This paper contributes to the Islamic FinTech literature in four ways. First, it presents the first open-access diagnostic tool whose evaluation criteria are derived exclusively from primary sources (Quran, Hadith, and classical scholarly texts), with every finding linked to a specific citation. Second, it introduces a measurable ribawi characteristics grid that evaluates financial mediums against seven criteria derived from the Hadith of Riba al-Fadl. Third, it operationalises the form-versus-substance analysis of Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah as a structured diagnostic question (the "strip test"). Fourth, it introduces a dual-track analytical framework that makes the fiat currency question explicit, allowing users to evaluate financial instruments under both the mainstream scholarly position and the primary-source analytical framework without imposing either position.

---

## 2. Literature Review

### 2.1 Shariah Compliance Screening: Current Approaches

Contemporary Shariah screening operates primarily through two mechanisms: qualitative Shariah board review and quantitative financial ratio screening. The qualitative process involves scholars examining the structure of a financial product against established fiqhi principles and issuing a ruling. The Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI) has published Shariah standards covering over 60 product categories, providing a degree of standardisation (AAOIFI, 2023). The Islamic Financial Services Board (IFSB) has similarly issued guiding principles for Shariah governance systems.

Quantitative screening, used primarily for equity investments, applies financial ratio thresholds to determine permissibility. The Dow Jones Islamic Market Index, the S&P Shariah Index, and the MSCI Islamic Index each apply variations of debt-to-equity ratios, interest income thresholds, and sector exclusions (Derigs & Marzban, 2008). These thresholds vary across providers: the maximum permissible debt-to-equity ratio ranges from 30% to 33% depending on the screening methodology, and the maximum interest income threshold ranges from 5% to 10% (Hassan et al., 2019).

Both approaches share a common limitation: they address the transactional surface of financial arrangements without engaging with the structural question of whether the monetary medium itself satisfies the criteria that trigger ribawi rules. A conventional mortgage and a Murabahah home financing arrangement may receive different Shariah classifications, despite both being denominated in a currency that enters existence through interest-bearing debt. The screening methodology addresses the product; it does not address the system.

### 2.2 Islamic FinTech: State of the Field

The Islamic FinTech sector has grown rapidly. Biancone et al. (2020) documented the emergence of over 100 Islamic FinTech firms globally, concentrated in Malaysia, Indonesia, Bahrain, and the United Arab Emirates. Key innovation areas include digital banking (with fully Shariah-compliant neobanks), blockchain-based Sukuk (Noman, 2025), peer-to-peer crowdfunding platforms structured as Musharakah, and robo-advisory services that apply Shariah screens to portfolio construction.

Alam et al. (2022) noted that while these innovations expand access to Islamic financial services, they largely replicate conventional FinTech models with Shariah-compliant wrappers. The underlying analytical methodology remains unchanged: products are designed, then submitted for Shariah review. FinTech has accelerated the delivery of Islamic financial products but has not digitised the jurisprudential reasoning that determines their permissibility.

This paper argues that the next frontier for Islamic FinTech is not product innovation but methodology innovation: making the analytical framework itself transparent, reproducible, and digitally accessible.

### 2.3 The Ribawi Classification Question

The Hadith of Riba al-Fadl, narrated in Sahih Muslim (1587) and Sahih al-Bukhari (2070), identifies six items subject to ribawi rules: gold, silver, wheat, barley, dates, and salt. The Prophet (peace be upon him) instructed: "Gold for gold, silver for silver, wheat for wheat, barley for barley, dates for dates, salt for salt, like for like, equal for equal, hand to hand. If the types differ, then sell as you wish, provided it is hand to hand."

Classical scholars identified the 'illah (effective cause) that makes these six items subject to ribawi restrictions. The Hanafi school identified the 'illah as being items measured by weight or volume that share the same genus. The Shafi'i school identified it as being items that serve as food or currency. The Maliki and Hanbali schools offered related but distinct formulations (Al-Zuhayli, 2003).

The critical question for contemporary Islamic finance is whether fiat currency, which has replaced gold and silver as the dominant medium of exchange, satisfies these classical criteria. The majority scholarly position holds that fiat currency possesses thamaniyyah (monetary nature) and is therefore subject to ribawi rules (Usmani, 2002). A minority position, developed in the author's prior research (Abdul Majeed, 2026a), argues that fiat currency fails the seven shared characteristics of the six ribawi items when evaluated against the primary-source evidence. This paper does not argue for either position. It presents a diagnostic framework that makes both positions operational and allows users to evaluate financial instruments under either analytical track.

### 2.4 Form Versus Substance in Classical Jurisprudence

The question of when a formally permissible structure conceals a prohibited economic substance has occupied Islamic jurists since the earliest centuries. Ibn Qayyim al-Jawziyyah devoted substantial portions of I'lam al-Muwaqqi'in to identifying and dismantling legal stratagems (Hiyal) that give ribawi transactions the appearance of legitimate trade. His teacher, Ibn Taymiyyah, stated in Majmu' al-Fatawa that one who uses a Hilah to consume Riba under the cover of a sale commits a greater sin than one who consumes it openly, because the stratagem adds mockery of the law to the original transgression.

This principle has direct relevance to contemporary Islamic finance. Organised Tawarruq, for instance, was declared impermissible by the Islamic Fiqh Academy (Resolution 179, 19th Session, 2009), precisely on the grounds that the commodity transaction serves no genuine commercial purpose and functions as a device for generating a cash loan with a fixed return.

Despite the classical foundation for form-versus-substance analysis, no existing digital tool operationalises this principle as a structured diagnostic question. Mizan's "strip test," described in Section 3.3.3, addresses this gap.

---

## 3. Methodology

### 3.0 Research Paradigm: Design Science Research

This study adopts the Design Science Research (DSR) paradigm (Hevner et al., 2004; Peffers et al., 2007). DSR is an established methodology in information systems and FinTech research that centres on the creation and evaluation of novel artefacts designed to address identified problems. Unlike empirical research, which observes and measures existing phenomena, DSR contributes knowledge through the act of building: the artefact itself, its design principles, and the evaluation of its utility constitute the research output.

The DSR framework is appropriate for this study for three reasons. First, the research objective is to produce a functional diagnostic tool (an artefact), not to test a hypothesis against observational data. Second, the evaluation of the artefact is demonstrated through application to representative cases, consistent with DSR evaluation methods. Third, the design knowledge produced, specifically the ribawi characteristics grid, the strip test, and the dual-track framework, is generalisable beyond the specific tool and can inform future diagnostic instruments in Islamic finance.

The three stages described below correspond to the DSR process model: problem identification (the absence of a transparent, source-traceable compliance methodology), artefact design (derivation of criteria and diagnostic architecture), and demonstration (application to representative financial products in Section 4).

The Mizan diagnostic framework is constructed through a three-stage process: primary-source derivation of evaluation criteria, extraction of measurable characteristics, and implementation as a rule-based diagnostic engine.

### 3.1 Stage 1: Linguistic and Juridical Derivation

The foundation of the framework is a 119-page linguistic and juridical investigation into the prohibition of Riba, the nature of Qard, Dayn, and Bay', and the characteristics that define ribawi commodities (Abdul Majeed, 2026a). The methodology of that investigation proceeds as follows.

**Root analysis.** The study begins from the three-letter Arabic roots of the four foundational terms. Riba derives from R-B-W / R-B-Y, meaning to grow, to increase, to rise above, to swell, to exceed the original level. Every Quranic occurrence of this root is catalogued and analysed in its linguistic context. Qard derives from Q-R-D, meaning to cut: a piece cut from one's wealth and given freely, with only the exact equivalent (mithl) returning. Dayn, sharing its root with Din (faith, accountability) and Dayyan (the Judge), refers to the outstanding obligation, fixed at the point it arises. Bay' refers to bilateral exchange, requiring genuine prior ownership, genuine risk, and genuine counter-value on both sides.

**Quranic progression.** The study traces four progressive stages of Quranic prohibition, from moral discouragement in the Meccan period (Surah Al-Rum 30:39) through conditional prohibition (Surah Al-Imran 3:130) to absolute prohibition with a declaration of war from Allah and His Messenger against those who persist (Surah Al-Baqarah 2:275-279).

**Hadith analysis.** Six key Hadith references are examined, centred on the Hadith of Riba al-Fadl (Sahih Muslim 1587), the Curse on All Parties to a Riba transaction (Sahih Muslim 1598), and the Farewell Sermon in which the Prophet (peace be upon him) abolished all pre-Islamic Riba, beginning with his own uncle's debts (Sahih Muslim 1218).

**Classical scholarly analysis.** The form-versus-substance framework draws on Ibn Qayyim al-Jawziyyah's I'lam al-Muwaqqi'in and Ibn Taymiyyah's Majmu' al-Fatawa. Al-Ghazali's analysis of the function of money (thaman) in Ihya' 'Ulum al-Din informs the distinction between currency-level and transaction-level analysis.

### 3.2 Stage 2: Derivation of Seven Ribawi Characteristics

From the primary-source analysis, seven shared characteristics of the six ribawi items (gold, silver, wheat, barley, dates, and salt) are identified. These characteristics represent what these items have in common that triggers the application of ribawi rules.

**Table 1**

*Seven Ribawi Characteristics Derived from the Hadith of Riba al-Fadl*

| # | Characteristic | Arabic Term | Definition | Measurable Criterion |
|---|---------------|-------------|------------|---------------------|
| 1 | Fungibility | Mithiliyyah | Units are interchangeable without quality variation over time | Can one unit be exchanged for another of identical value at any future point? |
| 2 | Intrinsic Value | Qimah Dhatiyyah | Value exists independent of monetary designation | Does the item have utility or value if its monetary or legal status is removed? |
| 3 | Durability of Value | Baqa' | Value persists over time without systematic erosion | Does purchasing power remain stable over multi-year periods without policy intervention? |
| 4 | Universal Acceptance | Rawaj | Accepted broadly through demonstrated utility, not coercion | Is acceptance voluntary and based on perceived intrinsic value rather than legal mandate? |
| 5 | Knowable Quality | Sifah Ma'lumah | Quality and value can be assessed at time of transaction | Can both parties determine real (not merely nominal) value at the point of exchange? |
| 6 | Measurability | Kayl / Wazn | Precisely quantifiable in standardised units | Can the item be divided and measured with precision in units that retain stable meaning? |
| 7 | Essential Utility | Hajah 'Ammah | Serves a fundamental economic or human need | Does the item fulfil a need beyond the monetary system itself? |

The derivation rationale for each characteristic traces directly to the six items. Gold and silver are fungible: one dinar of a given weight and purity is identical to another. Wheat and barley have intrinsic value as sustenance. Dates and salt are durable over relevant time horizons. All six are universally accepted through demonstrated utility in the economies where they circulate. All six have knowable quality that can be assessed at the point of exchange. All six are measurable by weight or volume. All six serve essential human needs independent of any monetary designation.

### 3.3 Stage 3: Diagnostic Engine Architecture

The diagnostic engine translates the primary-source framework into a structured, interactive evaluation tool.

#### 3.3.1 Six Entry Categories

Financial arrangements are classified into six broad categories: (1) Finance and lending, covering mortgages, home finance, personal finance, business loans, and Islamic financial institution products; (2) Investment, covering stocks, Sukuk, funds, partnerships, cryptocurrency, and property; (3) Trade and exchange, covering goods trade, credit sales, Murabahah, Salam, and commodities; (4) Personal loans and gifts, covering Qard Hasan, joint ventures, and charitable giving; (5) Currency and money exchange, covering Forex, money changers, remittance, and stablecoins; and (6) Crypto and digital assets, covering Bitcoin, altcoins, DeFi protocols, NFTs, and tokenised real-world assets.

Each category contains sub-types with tailored question sets that address the specific structural risks of that arrangement type.

#### 3.3.2 The Dual-Track Framework

The tool introduces a critical methodological innovation: three entry points that make the analytical framework explicit.

The first entry point, "Classical monetary medium," applies the full ribawi conditions without qualification. This applies to gold, silver, and genuine ribawi commodities.

The second entry point, "Fiat, treated as classical money," represents the mainstream scholarly position. Under this framework, fiat currency carries thamaniyyah (monetary nature), and therefore the same ribawi rules apply. This routes to the classical analytical track.

The third entry point, "Fiat, research framework," applies the findings of the ribawi characteristics analysis. Under this framework, fiat currency fails all seven ribawi characteristics, and what is conventionally called "interest" on fiat transactions is analysed separately from Riba in the Quranic sense. Critically, personal loans between individuals are still held to the full classical Qard Hasan standard even on this track, because the Qard relationship is one of brotherhood and mutual support, not institutional capital deployment.

The user selects their analytical framework explicitly. The tool does not impose a position. Both tracks lead to the same structural analysis of the arrangement. Neither permits exploitation.

#### 3.3.3 The Strip Test

The most important diagnostic question in the framework is drawn directly from the form-versus-substance analysis of Ibn Qayyim and Ibn Taymiyyah: if you remove the asset, the commodity, or the trade steps from this arrangement, what remains?

If what remains is money in, more money out, by prior agreement, the arrangement contains Riba. The asset, commodity, or formal trade steps functioned as a Hilah (legal device). This single question, applied consistently, identifies the structural pattern that distinguishes genuine Bay' from disguised lending.

#### 3.3.4 Finding Categories

The diagnostic engine evaluates 15 specific patterns, each linked to primary-source citations:

1. Core Riba (stipulated excess above the principal)
2. Fixed and predetermined returns (not from genuine trade)
3. Absent genuine ownership (violation of Bay' conditions)
4. Nominal ownership (title without risk exposure)
5. Absent genuine risk (violation of al-kharaj bil-daman)
6. Growing Dayn (Riba al-Nasi'ah)
7. Hilah/subterfuge (strip test failure)
8. Organised Tawarruq (Islamic Fiqh Academy Resolution 179)
9. Prohibited underlying activity
10. Leverage (combined Riba, Gharar, and Maysir)
11. Speculative activity (Maysir concern)
12. Excessive uncertainty (Gharar)
13. Guaranteed returns (confirming loan, not investment)
14. Inescapable Dayn (Maqasid concern, Hifz al-Mal)
15. Riba al-Fadl (unequal same-type exchange)

Each finding includes a severity classification (fatal, warning, pass, or informational), a detailed explanation of the principle violated, and specific source citations.

#### 3.3.5 Source Tracing

Every diagnostic finding is linked to its evidential chain. A finding identifying core Riba, for instance, cites Surah Al-Baqarah 2:275-279, the root analysis of R-B-W, the commentary of Ibn Abbas, Al-Tabari's Jami' al-Bayan, and Al-Qurtubi's Al-Jami' li-Ahkam al-Qur'an. No finding is presented without primary-source grounding.

#### 3.3.6 Implementation

Mizan is implemented as a browser-based, open-access tool. It requires no registration, collects no user data, and operates entirely client-side. The diagnostic engine is rule-based (not machine learning), ensuring deterministic, reproducible outputs: the same inputs always produce the same findings. The tool is freely available at https://azim.cc/tools/mizan.

---

## 4. Findings

### 4.1 Ribawi Characteristics Grid: Cross-Medium Evaluation

The seven ribawi characteristics were applied systematically to five financial mediums: fiat currency, gold/silver, Bitcoin, physical commodities, and GX Coin Protocol (a fixed-supply, productivity-referenced digital currency with no debt-based issuance). The results are summarised in Table 2.

**Table 2**

*Ribawi Characteristics Evaluation Across Financial Mediums*

| Characteristic | Fiat Currency | Gold/Silver | Bitcoin | Physical Commodity | GX Coin Protocol |
|---------------|--------------|-------------|---------|-------------------|-----------------|
| Mithiliyyah (Fungibility) | Fails: equivalence decays through inflation; 100 units today are not equal to 100 units in one year | Passes | Passes | Passes (standardised grades) | Passes: each unit is equivalent; fixed supply of 1.25 trillion coins prevents debasement |
| Qimah Dhatiyyah (Intrinsic Value) | Fails: zero utility outside the monetary system; value exists only by institutional declaration | Passes (ornamental, industrial) | Uncertain: no material utility independent of network | Passes | Passes: value derived from productive economic activity within the ecosystem, not from institutional declaration |
| Baqa' (Durability of Value) | Fails: purchasing power erodes by design through inflation; the dollar has lost 96% since 1913 | Passes | Passes (fixed supply) but volatile in fiat-denominated terms | Passes (durable commodities) | Passes: immutable supply cap prevents monetary debasement; gold-referenced pricing provides stable value anchor |
| Rawaj (Universal Acceptance) | Fails: acceptance is coerced through legal tender laws, not earned through demonstrated utility | Passes (historical) | Partial: growing but not universally used in daily commerce | Passes (global commodities) | Partial: currently limited to ecosystem participants; acceptance growing through demonstrated utility, not coercion |
| Sifah Ma'lumah (Knowable Quality) | Fails: future purchasing power is unknowable and dependent on policy decisions | Passes | Passes (code is transparent and auditable) | Passes (standardised grades) | Passes: all protocol parameters are transparent and algorithmically defined; purchasing power referenced to gold |
| Kayl / Wazn (Measurability) | Partial: nominal denomination only; real value shifts continuously | Passes | Passes (divisible to 8 decimal places) | Passes | Passes: precisely divisible in digital units; denominated against a universal measure (gold grams) |
| Hajah 'Ammah (Essential Utility) | Fails: no utility outside the monetary system | Passes | Uncertain: debate ongoing regarding material utility | Passes (food, industrial use) | Passes: designed as a medium of exchange within a productive economy; not a speculative asset |
| **Score** | **0 pass, 1 partial, 6 fail** | **7 pass** | **2 pass, 2 partial, 3 fail** | **7 pass** | **6 pass, 1 partial, 0 fail** |

The results reveal a significant asymmetry. Gold, silver, and physical commodities, the items identified in the Hadith as ribawi, satisfy all seven characteristics. GX Coin Protocol satisfies six of seven, with universal acceptance as a temporal limitation rather than a structural failure. Fiat currency, which the majority scholarly position treats as equivalent to gold and silver for ribawi purposes, fails all seven. Bitcoin occupies an intermediate position, passing on fungibility and measurability but failing or remaining uncertain on intrinsic value and essential utility.

This asymmetry does not prove that fiat currency is not subject to ribawi rules. It demonstrates that the question deserves explicit engagement rather than assumption. It also suggests that digital currency architectures designed around fixed supply, non-debt issuance, and productivity linkage can satisfy the ribawi characteristics that fiat currency structurally cannot.

### 4.2 Diagnostic Output: Representative Financial Products

The diagnostic framework was applied to five representative financial products to demonstrate its analytical output.

**Product 1: Conventional fixed-rate mortgage.** The diagnostic identifies core Riba (stipulated excess above the principal), a growing Dayn (the outstanding obligation increases through compounding interest over the loan term), and a Maqasid concern regarding inescapable debt. The strip test is not required, as the ribawi structure is explicit.

**Product 2: Murabahah home financing (commodity-based, fiat-denominated).** The diagnostic identifies the product as formally structured as a sale (Bay') with a disclosed profit margin. However, the strip test raises a Hilah concern: when the commodity transfer is nominal (the financier never bears genuine commercial risk of ownership), removing the commodity layer reveals the same economic structure as a conventional loan with a fixed return. The diagnostic does not declare the product impermissible; it flags the structural concern and cites Ibn Qayyim's framework for the user's consideration.

**Product 3: Musharakah Mutanaqisah (diminishing partnership).** Under the classical track, the diagnostic identifies genuine shared ownership, genuine risk exposure (both parties bear potential loss), and a declining Dayn that does not grow through time. The arrangement passes the strip test: removing the property reveals a genuine partnership, not a disguised loan. On the fiat track, the arrangement also passes the structural tests, with an informational finding noting the open scholarly question regarding the fiat medium.

**Product 4: Bitcoin spot purchase.** No lending is involved; therefore, no Riba is identified. The diagnostic flags a Maysir (speculative gambling) concern if the purchase is for short-term price speculation rather than genuine utility or long-term holding. The ribawi characteristics grid is displayed, showing Bitcoin's mixed profile: it passes on fungibility, durability, knowable quality, and measurability, but remains uncertain on intrinsic value and essential utility.

**Product 5: Organised Tawarruq (commodity Murabahah for cash).** The strip test identifies the arrangement as a Hilah: the commodity exists in form, but the substance is a cash loan with a fixed return. The diagnostic cites the Islamic Fiqh Academy Resolution 179 (2009) and Imam Ahmad ibn Hanbal's classification of Tawarruq as a stratagem. This finding is consistent across both analytical tracks.

### 4.3 Dual-Track Divergence

The dual-track framework produces identical results for three of the five products (conventional mortgage, Musharakah Mutanaqisah, and organised Tawarruq). These arrangements are either clearly ribawi (conventional mortgage), clearly sound (Musharakah), or clearly problematic (Tawarruq) regardless of the analytical track.

The divergence emerges in the Murabahah home financing product. On the classical track, where fiat is treated as a ribawi medium, the fixed return on a fiat-denominated transaction is analysed under the full ribawi framework. On the fiat research track, the question shifts: if fiat currency does not satisfy the ribawi characteristics, the fixed return may represent a compensation mechanism for the structural depreciation of the medium rather than Riba in the Quranic sense. The diagnostic does not resolve this question. It presents both analyses with their respective source citations, allowing the user to engage with the evidence directly.

This dual-track approach is the methodological contribution of the framework. It does not advocate for either position. It makes both positions operational and transparent, enabling informed engagement with an unresolved scholarly question.

---

## 5. Discussion

### 5.1 Implications for Shariah Compliance Practice

The Mizan framework demonstrates that Shariah compliance evaluation can be made transparent, reproducible, and source-traceable without replacing the role of qualified scholars. The framework does not issue Fatwas. It provides a structured diagnostic baseline that scholars, practitioners, and researchers can use as a starting point for further analysis.

The source-tracing requirement, where every finding must be linked to a specific primary-source citation, addresses the transparency concern identified in Section 1.1. When a user receives a finding that an arrangement contains core Riba, the finding cites Surah Al-Baqarah 2:275-279, the root analysis of R-B-W, and specific classical commentaries. The user can verify the evidential chain independently. This is a fundamentally different model from the current practice, where compliance is often communicated as a binary ruling (permissible or impermissible) without transparent engagement with the underlying evidence.

### 5.2 The Fiat Currency Question

The ribawi characteristics grid (Table 2) makes explicit what is typically assumed in contemporary Islamic finance. The majority scholarly position treats fiat currency as subject to ribawi rules on the basis of thamaniyyah (monetary nature). This position has been articulated by Justice Muhammad Taqi Usmani and endorsed by major Shariah boards globally (Usmani, 2002).

This paper does not challenge that position. It observes that the position resolves a genuinely open question through institutional consensus rather than through transparent application of the primary-source criteria that define ribawi commodities. The seven characteristics derived from the Hadith of Riba al-Fadl provide a measurable framework for evaluating whether any given medium satisfies the conditions that trigger ribawi rules. When fiat currency is evaluated against these characteristics, it fails all seven.

The implications of this observation extend beyond academic curiosity. If fiat currency does not satisfy the classical ribawi criteria, the entire analytical framework that contemporary Islamic finance applies to fiat-denominated transactions requires re-examination. This does not mean that interest on fiat is permissible; it means that the prohibition may need to be grounded in different jurisprudential reasoning, whether through the Maqasid al-Shariah (the fiat system's structural violation of Hifz al-Mal), the concept of Ghashsh (adulteration or deception in the medium), or other analytical foundations.

Mizan contributes to this discourse not by resolving the question but by making it visible. When a user evaluates a fiat-denominated product, the tool does not silently assume one position. It presents both tracks, with their respective evidential foundations, and allows the user to engage with the evidence.

### 5.3 FinTech as Methodology, Not Just Product

The current Islamic FinTech landscape is characterised by product-level innovation: digital banks, blockchain Sukuk, and robo-advisors that apply Shariah-compliant wrappers to conventional FinTech models. Mizan represents a different category of innovation: methodology-level FinTech. Rather than digitising a financial product, it digitises the analytical framework that determines whether products are permissible.

This distinction has practical significance. A digital Islamic bank still depends on its Shariah board for compliance determinations. Mizan does not replace that board, but it provides a transparent, reproducible baseline that the board, the bank's clients, and external researchers can all access. The diagnostic output can serve as a starting point for scholarly review, a training tool for Islamic finance students, or a due diligence mechanism for retail consumers evaluating financial products.

The rule-based architecture (as opposed to machine learning) is a deliberate design choice. Deterministic outputs, where the same inputs always produce the same findings, are essential for a diagnostic tool that claims transparency and reproducibility. Machine learning models, however powerful, introduce opacity that would undermine the framework's core value proposition.

### 5.4 Limitations

Several limitations must be acknowledged. First, the seven ribawi characteristics are derived from one analytical framework. Other scholars may derive different characteristics or weight them differently. The framework does not claim to be the only valid derivation; it claims to be transparent and source-traceable.

Second, the diagnostic is rule-based and evaluates arrangements based on user-provided descriptions. Users may describe their arrangements inaccurately, whether through misunderstanding or deliberate misrepresentation. The diagnostic cannot verify the factual accuracy of user inputs.

Third, the fiat currency analysis represents a minority scholarly position. The majority position, endorsed by AAOIFI, major Shariah boards, and leading scholars, treats fiat as subject to ribawi rules. While this paper does not argue against that position, the diagnostic's dual-track framework may be interpreted as giving undue prominence to the minority view.

Fourth, the diagnostic does not constitute a Fatwa and is not intended to replace qualified scholarly opinion. It is a diagnostic tool that surfaces evidence and identifies structural patterns. The interpretation of that evidence remains the domain of qualified scholars and informed individuals.

Fifth, the current implementation covers six broad categories of financial activity but does not yet address all possible financial arrangements. Complex derivatives, structured products, and novel DeFi protocols may require additional question sets and finding categories.

### 5.5 Future Research

Several directions for future research emerge from this work. Empirical validation of the diagnostic framework against published Shariah board rulings would measure concordance and divergence, identifying areas where the primary-source framework aligns with or departs from institutional consensus. Extension of the diagnostic to additional financial instruments, particularly complex derivatives and DeFi protocols, would expand the framework's coverage. Collaborative development with Shariah scholars to refine the ribawi characteristics derivation and the diagnostic question sets would strengthen the framework's scholarly foundation. Finally, integration with regulatory frameworks such as AAOIFI standards and IFSB guiding principles could position the diagnostic as a complement to existing compliance infrastructure.

---

## 6. Conclusion

This paper has presented Mizan, a primary-source diagnostic framework for evaluating Islamic financial instruments against classical ribawi characteristics. The framework addresses a critical gap in Islamic finance: the absence of a standardised, transparent, source-traceable methodology for Shariah compliance evaluation.

Three contributions emerge from this work. First, the ribawi characteristics grid provides a measurable, reproducible methodology for evaluating whether a financial medium satisfies the criteria that trigger ribawi rules. The systematic application of this grid reveals that fiat currency fails all seven characteristics derived from the Hadith of Riba al-Fadl, an observation that warrants transparent scholarly engagement rather than institutional assumption.

Second, the strip test operationalises the form-versus-substance analysis of Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah as a structured diagnostic question applicable to any financial arrangement. This test identifies the structural pattern that distinguishes genuine trade from disguised lending, regardless of the labels applied to the arrangement.

Third, the dual-track analytical framework makes the fiat currency question explicit. Rather than silently assuming one scholarly position, the framework presents both the mainstream position and the primary-source analytical framework as operational tracks, allowing users to engage with the evidence directly.

The Islamic finance industry has reached a scale and complexity that demands analytical infrastructure commensurate with its ambitions. FinTech innovation in this space should extend beyond product digitisation to methodology digitisation, making the jurisprudential foundations of Shariah compliance transparent, reproducible, and accessible. Mizan is an initial contribution to this objective. Its limitations are acknowledged, and its findings are offered for scholarly scrutiny, refinement, and extension.

The tool is freely available at https://azim.cc/tools/mizan. The underlying research is published in full at https://azim.cc/blog/riba-research-paper. Any errors of interpretation are the author's own.

---

## Declarations

**Authorship Statement.** This paper is the sole work of the named author. There are no guest, gift, or ghost authors. The research, analysis, diagnostic framework design, and writing are entirely the author's own.

**AI Disclosure.** An AI language model (Claude, Anthropic) was used in a limited capacity for language support during the preparation of this manuscript, specifically for grammar checking, sentence clarity, and formatting consistency. All research, analysis, arguments, conclusions, and intellectual content are entirely the author's own. The AI tool was not used to generate research findings, formulate arguments, or produce substantive content.

**Conflict of Interest.** The author declares no conflict of interest. The Mizan diagnostic tool is an open-access, non-commercial project with no institutional funding or commercial backing.

**Prior Publication.** This submission has not been previously published, nor is it under consideration by any other journal.

**Ethics Statement.** This research complies with JIBEP's Research Ethics Guidelines and the COPE Code of Conduct. No human subjects, personal data, or confidential information were involved in this study.

---

## References

Abdul Majeed, M. A. (2026a). *From gold to paper: Riba, fiat currency, and the question nobody wants to ask*. https://azim.cc/blog/riba-research-paper

Abdul Majeed, M. A. (2026b). Introducing Mizan: An Islamic finance diagnostic built on first principles. *azim.cc*. https://azim.cc/blog/introducing-mizan

Accounting and Auditing Organization for Islamic Financial Institutions. (2023). *Shariah standards*. AAOIFI.

Alam, N., Gupta, L., & Zameni, A. (2022). *Fintech and Islamic finance: Digitalization, development and disruption*. Palgrave Macmillan.

Al-Ghazali, A. H. (n.d.). *Ihya' 'ulum al-din* [The revival of the religious sciences]. Dar al-Ma'rifah.

Al-Qurtubi, M. A. (n.d.). *Al-Jami' li-ahkam al-Qur'an* [The comprehensive rulings of the Quran]. Dar al-Kutub al-Misriyyah.

Al-Sarakhsi, M. A. (n.d.). *Al-Mabsut*. Dar al-Ma'rifah.

Al-Tabari, M. J. (n.d.). *Jami' al-bayan 'an ta'wil ay al-Qur'an* [The comprehensive exposition of the interpretation of the verses of the Quran]. Dar Hajar.

Al-Zuhayli, W. (2003). *Al-Fiqh al-Islami wa adillatuhu* [Islamic jurisprudence and its evidences] (3rd ed.). Dar al-Fikr.

Biancone, P. P., Saiti, B., & Petricean, D. (2020). The bibliometric analysis of Islamic banking and finance. *Journal of Islamic Accounting and Business Research*, *11*(9), 2069-2086. https://doi.org/10.1108/JIABR-08-2020-0235

Derigs, U., & Marzban, S. (2008). Review and analysis of current Shariah-compliant equity screening practices. *International Journal of Islamic and Middle Eastern Finance and Management*, *1*(4), 285-303. https://doi.org/10.1108/17538390810919600

Hassan, M. K., Aliyu, S., Saiti, B., & Abdul Halim, Z. (2019). A review of Islamic stock market, growth and real-estate finance literature. *International Journal of Emerging Markets*, *15*(4), 643-668. https://doi.org/10.1108/IJOEM-11-2019-1001

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly*, *28*(1), 75-105. https://doi.org/10.2307/25148625

Ibn Qayyim al-Jawziyyah, M. A. (n.d.). *I'lam al-muwaqqi'in 'an rabb al-'alamin* [A notice to those who issue rulings on behalf of the Lord of the worlds]. Dar al-Kutub al-'Ilmiyyah.

Ibn Qudamah, M. A. (n.d.). *Al-Mughni*. Dar Ihya' al-Turath al-'Arabi.

Ibn Taymiyyah, A. A. (n.d.). *Majmu' al-fatawa* [Compilation of legal rulings]. Dar al-Wafa'.

Islamic Financial Services Board. (2024). *Islamic financial services industry stability report 2024*. IFSB.

Islamic Fiqh Academy. (2009). Resolution No. 179 (19/5) on organised Tawarruq. *Organisation of Islamic Cooperation*.

Noman, M. (2025). Blockchain adoption challenges and solutions in Bangladesh. *Journal of Islamic Banking, Economics and Policy*, *1*(2), 2-19.

Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). A design science research methodology for information systems research. *Journal of Management Information Systems*, *24*(3), 45-77. https://doi.org/10.2753/MIS0742-1222240302

Usmani, M. T. (2002). *An introduction to Islamic finance*. Kluwer Law International.

Yasmin, S., & Arshed, N. (2025). Can Islamic financing ease in monetary policy uncertainty: A proposal for Islamic monetary policy. *Journal of Islamic Banking, Economics and Policy*, *1*(2), 32-51.
