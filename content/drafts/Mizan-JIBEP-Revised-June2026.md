# Mizan: A Primary-Source Diagnostic Framework for Evaluating Islamic Financial Instruments Against Classical Ribawi Characteristics

**M. Azim Abdul Majeed**

Corresponding Author: azim@gxcoin.money

---

## Abstract

**Purpose:** This paper introduces Mizan, an open-access digital diagnostic tool that evaluates Islamic financial instruments against classical jurisprudential criteria derived exclusively from primary sources (Quran, Hadith, and classical scholarly texts). The tool addresses a critical gap in Islamic finance: the absence of a standardised, transparent, source-traceable methodology for assessing Shariah compliance at the structural level rather than the transactional level.

**Design/Methodology:** Adopting a Design Science Research (DSR) paradigm, the diagnostic framework is constructed through a three-stage process: (1) linguistic and juridical analysis of the Arabic roots of Riba, Qard, Dayn, and Bay'; (2) derivation of seven measurable characteristics of ribawi commodities from the Hadith of Riba al-Fadl, grounded in classical scholarly evidence; and (3) implementation as an interactive, rule-based diagnostic engine that routes users through structured questions and returns findings with primary-source citations. The tool introduces a dual-track analytical path that explicitly surfaces the unresolved scholarly question of whether fiat currency satisfies classical ribawi criteria. The framework's diagnostic outputs are validated against established Shariah standards, including AAOIFI rulings and Islamic Fiqh Academy resolutions.

**Findings:** Systematic application of the seven ribawi characteristics to modern financial mediums reveals that fiat currency does not satisfy any of the seven criteria under this framework, while commodity-based mediums satisfy most. The diagnostic outputs demonstrate substantial concordance with established Shariah rulings on conventional lending, organised Tawarruq, and diminishing Musharakah, while surfacing areas of divergence that warrant further scholarly deliberation. The framework is diagnostic in nature, intended to surface evidence for scholarly engagement rather than to render adjudicative determinations.

**Originality:** Mizan is the first diagnostic tool to (a) derive evaluation criteria exclusively from primary sources, (b) implement a measurable ribawi characteristics grid across multiple mediums, (c) incorporate a form-versus-substance "strip test" based on Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah, and (d) present two analytical tracks that make the fiat currency question explicit rather than assumed.

**Practical Implications:** The framework offers regulators, practitioners, and researchers a transparent, reproducible diagnostic methodology for Shariah compliance evaluation that complements existing institutional mechanisms, while preserving the primacy of qualified scholarly interpretation.

**Keywords:** Islamic FinTech, Shariah compliance, Riba, ribawi characteristics, digital diagnostics, fiat currency

---

## 1. Introduction

### 1.1 The Problem

The contemporary Islamic finance industry, valued at over USD 4 trillion in assets (Islamic Financial Services Board [IFSB], 2024), relies on Shariah compliance mechanisms that operate primarily through institutional opinion. Individual Shariah boards, composed of qualified scholars, review financial products and issue rulings that may vary across jurisdictions, institutions, and time periods (Grais & Pellegrini, 2006). The same product structure may receive differing assessments from different boards. The methodology underlying these rulings is not always published in a form that external researchers or practitioners can independently verify (Garas & Pierce, 2010).

This observation concerns the structure of the compliance ecosystem rather than the competence of the scholars involved. When the analytical methodology is not transparent, the industry's credibility rests on the authority of individuals rather than the reproducibility of the process. This creates three challenges. First, practitioners cannot independently verify whether a product satisfies the primary-source criteria for permissibility (Kamali, 2000). Second, researchers cannot reproduce the analysis or test it against alternative products (Laldin & Furqani, 2013). Third, the open questions within Islamic jurisprudence, particularly regarding modern financial mediums, are not always surfaced explicitly, and may instead be resolved through institutional consensus without transparent engagement with the primary-source evidence (Chapra, 2006).

### 1.2 The Gap in Islamic FinTech

The growth of Islamic FinTech has been substantial. Digital Islamic banking platforms, blockchain-based Sukuk issuance, Islamic robo-advisory services, and peer-to-peer lending platforms compliant with Shariah principles have emerged across multiple jurisdictions (Biancone et al., 2020; Alam et al., 2022). However, a review of the existing landscape reveals a consistent pattern: FinTech innovation in Islamic finance has focused on digitising financial products rather than digitising the analytical methodology that determines whether those products are permissible (Todorof, 2018).

Existing digital tools for Islamic finance include halal stock screeners (which apply financial ratio thresholds such as debt-to-equity limits), Zakat calculators, and product comparison platforms (Obaidullah, 2005). These tools address important needs, but they do not engage with the foundational jurisprudential question: does a given financial arrangement, stripped to its economic substance, contain Riba?

No existing tool derives its evaluation criteria exclusively from primary sources, makes the derivation chain visible to the user, or explicitly addresses the unresolved question of whether modern fiat currency satisfies the classical ribawi criteria that define which items are subject to the prohibition of Riba (Siddiqi, 2004).

### 1.3 Research Objective

This paper presents Mizan, an open-access, browser-based diagnostic tool that shifts Shariah compliance evaluation from an opinion-dependent process to an evidence-traceable one. The specific objectives are threefold: to demonstrate how primary-source derivation of evaluation criteria can be operationalised into a digital diagnostic; to present the ribawi characteristics grid as a measurable, reproducible evaluation methodology applicable across financial mediums; and to evaluate the framework's diagnostic output against both representative financial instruments and established Shariah standards.

### 1.4 Contribution

This paper contributes to the Islamic FinTech literature in four ways. First, it presents the first open-access diagnostic tool whose evaluation criteria are derived exclusively from primary sources (Quran, Hadith, and classical scholarly texts), with every finding linked to a specific citation. Second, it introduces a measurable ribawi characteristics grid that evaluates financial mediums against seven criteria derived from the Hadith of Riba al-Fadl. Third, it operationalises the form-versus-substance analysis of Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah as a structured diagnostic question (the "strip test"). Fourth, it introduces a dual-track analytical framework that makes the fiat currency question explicit, allowing users to evaluate financial instruments under both the mainstream scholarly position and the primary-source analytical framework without imposing either position.

---

## 2. Literature Review

### 2.1 Shariah Compliance Screening: Current Approaches

Contemporary Shariah screening operates primarily through two mechanisms: qualitative Shariah board review and quantitative financial ratio screening. The qualitative process involves scholars examining the structure of a financial product against established fiqhi principles and issuing a ruling. The Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI) has published Shariah standards covering over 60 product categories, providing a significant degree of standardisation (AAOIFI, 2023). The Islamic Financial Services Board (IFSB) has similarly issued guiding principles for Shariah governance systems. These institutional frameworks represent the most comprehensive standardisation efforts in the field and serve as the primary reference for practitioners globally.

Quantitative screening, used primarily for equity investments, applies financial ratio thresholds to determine permissibility. The Dow Jones Islamic Market Index, the S&P Shariah Index, and the MSCI Islamic Index each apply variations of debt-to-equity ratios, interest income thresholds, and sector exclusions (Derigs & Marzban, 2008). These thresholds vary across providers: the maximum permissible debt-to-equity ratio ranges from 30% to 33% depending on the screening methodology, and the maximum interest income threshold ranges from 5% to 10% (Hassan et al., 2019). Khatkhatay and Nisar (2007) demonstrated that variations in screening criteria produce materially different compliance outcomes for the same equity universe, illustrating the challenge of achieving consistency without transparent criteria.

Both approaches share a structural limitation: they address the transactional surface of financial arrangements without engaging with the question of whether the monetary medium itself satisfies the criteria that trigger ribawi rules. A conventional mortgage and a Murabahah home financing arrangement may receive different Shariah classifications, despite both being denominated in the same currency. The screening methodology evaluates the product structure; it does not evaluate the system in which the product operates.

### 2.2 Islamic FinTech: State of the Field

The Islamic FinTech sector has grown rapidly. Biancone et al. (2020) documented the emergence of over 100 Islamic FinTech firms globally, concentrated in Malaysia, Indonesia, Bahrain, and the United Arab Emirates. Key innovation areas include digital banking (with fully Shariah-compliant neobanks), blockchain-based Sukuk (Noman, 2025), peer-to-peer crowdfunding platforms structured as Musharakah, and robo-advisory services that apply Shariah screens to portfolio construction (Todorof, 2018).

Alam et al. (2022) noted that while these innovations expand access to Islamic financial services, they largely replicate conventional FinTech models with Shariah-compliant wrappers. The underlying analytical methodology remains unchanged: products are designed, then submitted for Shariah review. FinTech has accelerated the delivery of Islamic financial products but has not digitised the jurisprudential reasoning that determines their permissibility. Ayub (2007) similarly observed that the compliance process itself has not benefited from the technological advances that have transformed product delivery.

This paper proposes that the next frontier for Islamic FinTech lies in methodology innovation: making the analytical framework itself transparent, reproducible, and digitally accessible.

### 2.3 The Ribawi Classification Question

The identification and classification of ribawi items is one of the foundational questions of Islamic commercial jurisprudence. The primary source for this classification is the Hadith of Riba al-Fadl, narrated through multiple chains of transmission. Table A presents the principal Hadith references that establish the ribawi framework, together with the classical scholarly positions on the effective cause ('illah) that makes these items subject to ribawi restrictions.

**Table A**

*Principal Hadith References on Ribawi Items and Classical Scholarly Positions on the Effective Cause ('Illah)*

| # | Hadith Reference | Source | Key Content | Relevance to Ribawi Framework |
|---|-----------------|--------|-------------|-------------------------------|
| 1 | Hadith of Riba al-Fadl | Sahih Muslim 1587; Sahih al-Bukhari 2070 | "Gold for gold, silver for silver, wheat for wheat, barley for barley, dates for dates, salt for salt, like for like, equal for equal, hand to hand. If the types differ, then sell as you wish, provided it is hand to hand." | Establishes the six ribawi items and the conditions for lawful exchange: equality in same-type and immediacy in cross-type transactions. |
| 2 | Curse on All Parties to Riba | Sahih Muslim 1598 | The Prophet (peace be upon him) cursed the one who consumes Riba, the one who pays it, the one who records it, and the two witnesses to the transaction. | Extends culpability to all participants, indicating Riba is a systemic concern, not limited to the lender alone. |
| 3 | Farewell Sermon on Riba | Sahih Muslim 1218 | The Prophet (peace be upon him) abolished all pre-Islamic Riba, beginning with his own uncle Abbas ibn Abd al-Muttalib's outstanding claims. | Demonstrates the finality and comprehensiveness of the prohibition, applied retroactively to outstanding obligations. |
| 4 | Hadith of Bilal (dates exchange) | Sahih al-Bukhari 2302; Sahih Muslim 1593 | Bilal brought high-quality dates; the Prophet asked where they came from. Bilal said he exchanged two measures of lower quality for one of higher quality. The Prophet said: "This is the very essence of Riba." | Clarifies that Riba al-Fadl applies to commodities, not only monetary exchange, and that unequal same-type exchange is prohibited regardless of quality difference. |
| 5 | Hadith on Riba al-Nasi'ah | Sahih Muslim 1596 | "There is no Riba except in Nasi'ah (deferment)." Interpreted by scholars as emphasising the severity of time-based Riba, not excluding Riba al-Fadl. | Establishes the temporal dimension of Riba: deferment in ribawi exchanges constitutes a distinct form of prohibition. |
| 6 | Gold and silver rings Hadith | Sahih Muslim 1591 | The Prophet (peace be upon him) instructed that gold should only be exchanged for gold in equal weight, hand to hand. | Reinforces the conditions of equality and immediacy for monetary metals specifically. |

**Table B**

*Classical Scholarly Positions on the Effective Cause ('Illah) of Ribawi Classification*

| School of Jurisprudence | 'Illah for Monetary Items (Gold/Silver) | 'Illah for Foodstuffs (Wheat, Barley, Dates, Salt) | Key Scholars | Implications for Modern Currency |
|------------------------|----------------------------------------|---------------------------------------------------|--------------|-------------------------------|
| Hanafi | Weight (wazn) combined with same genus (jins) | Volume (kayl) or weight (wazn) combined with same genus | Al-Sarakhsi (Al-Mabsut); Al-Kasani (Bada'i al-Sana'i) | Fiat currency, having no weight as a commodity, does not directly satisfy this criterion; treated as ribawi by analogy to thamaniyyah. |
| Shafi'i | Being a currency or medium of exchange (thamaniyyah) | Being a foodstuff (ta'am) | Al-Nawawi (Al-Majmu'); Al-Shirazi (Al-Muhadhdhab) | Fiat currency satisfies thamaniyyah by function; therefore subject to ribawi rules. |
| Maliki | Being a currency or medium of exchange (thamaniyyah) | Being a foodstuff that is storable (ta'am muddakhar) | Ibn Rushd (Bidayat al-Mujtahid); Al-Dardir (Al-Sharh al-Kabir) | Similar to Shafi'i position; fiat treated as ribawi through functional thamaniyyah. |
| Hanbali | Being a medium of exchange (thamaniyyah) or measured by weight | Being a foodstuff measured by volume or weight | Ibn Qudamah (Al-Mughni); Ibn Taymiyyah (Majmu' al-Fatawa) | Ibn Taymiyyah emphasised substance over form; his framework supports evaluating whether the medium genuinely possesses the characteristics of ribawi items. |

The critical question for contemporary Islamic finance is whether fiat currency, which has replaced gold and silver as the dominant medium of exchange, satisfies these classical criteria. The majority scholarly position, articulated by Justice Muhammad Taqi Usmani and endorsed by the Islamic Fiqh Academy, holds that fiat currency possesses thamaniyyah (monetary nature) and is therefore subject to ribawi rules (Usmani, 2002). This position rests on the principle that the 'illah of thamaniyyah is not restricted to gold and silver but extends to any medium that functions as currency in practice. This is the dominant view across all four schools of jurisprudence in contemporary application.

A minority position, developed in the author's prior research (Abdul Majeed, 2026a), observes that fiat currency does not satisfy the seven shared characteristics of the six ribawi items when evaluated against the primary-source evidence. This paper does not advocate for either position. It presents a diagnostic framework that makes both positions operational and allows users to evaluate financial instruments under either analytical track. The framework's outputs are intended as starting points for scholarly deliberation rather than determinative rulings.

### 2.4 Form Versus Substance in Classical Jurisprudence

The question of when a formally permissible structure conceals a prohibited economic substance has occupied Islamic jurists since the earliest centuries. Ibn Qayyim al-Jawziyyah devoted substantial portions of I'lam al-Muwaqqi'in to identifying and dismantling legal stratagems (Hiyal) that give ribawi transactions the appearance of legitimate trade. His teacher, Ibn Taymiyyah, stated in Majmu' al-Fatawa that one who uses a Hilah to consume Riba under the cover of a sale commits a greater sin than one who consumes it openly, because the stratagem adds mockery of the law to the original transgression.

Al-Shatibi's Al-Muwafaqat further developed the principle that legal rulings must be evaluated by their outcomes and purposes (Maqasid), not merely by their formal compliance with contractual prerequisites (Al-Shatibi, n.d.). This Maqasid-oriented approach provides additional support for substance-over-form analysis in evaluating financial instruments.

This principle has direct relevance to contemporary Islamic finance. Organised Tawarruq, for instance, was declared impermissible by the Islamic Fiqh Academy (Resolution 179, 19th Session, 2009), precisely on the grounds that the commodity transaction serves no genuine commercial purpose and functions as a device for generating a cash loan with a fixed return. AAOIFI Shariah Standard No. 30 on Monetisation (Tawarruq) similarly restricts the practice, requiring genuine ownership transfer and real commodity risk (AAOIFI, 2023).

Despite the classical foundation for form-versus-substance analysis, no existing digital tool operationalises this principle as a structured diagnostic question. Mizan's "strip test," described in Section 3.4.3, addresses this gap.

### 2.5 Primary-Source Methodology in Islamic Finance Research

The approach of deriving analytical criteria directly from primary sources has precedent in classical usul al-fiqh (principles of jurisprudence). Al-Shafi'i's Al-Risalah established the hierarchy of evidential sources: the Quran, the Sunnah, Ijma' (scholarly consensus), and Qiyas (analogical reasoning). Within this hierarchy, the Quran and Sunnah occupy the primary position, with later scholarly methods serving as tools for extending primary-source principles to new situations (Kamali, 2003).

Contemporary Islamic finance scholarship has increasingly called for returning to primary-source analysis as a corrective to what some researchers describe as an over-reliance on inherited institutional positions (Chapra, 2006; Siddiqi, 2004). Al-Suwailem (2006) argued that financial innovation in Islamic finance must be grounded in a thorough understanding of the primary-source prohibitions rather than in formal compliance with contractual structures. Ayub (2007) similarly emphasised that the sustainability of Islamic financial institutions depends on the authenticity of their jurisprudential foundations.

The linguistic-juridical methodology employed in this study, proceeding from Arabic root analysis through Quranic and Hadith examination to the derivation of measurable criteria, follows the classical pattern of istiqra' (comprehensive induction) described by Al-Shatibi in Al-Muwafaqat: examining all instances of a principle across the primary sources to derive general rules that can be applied to new cases.

No existing study has operationalised this methodology as a digital diagnostic tool. The Mizan framework represents an attempt to bridge the gap between classical primary-source methodology and contemporary technological capability.

---

## 3. Methodology

### 3.0 Research Paradigm: Design Science Research

This study adopts the Design Science Research (DSR) paradigm (Hevner et al., 2004; Peffers et al., 2007). DSR is an established methodology in information systems and FinTech research that centres on the creation and evaluation of novel artefacts designed to address identified problems. Unlike empirical research, which observes and measures existing phenomena, DSR contributes knowledge through the act of building: the artefact itself, its design principles, and the evaluation of its utility constitute the research output.

The DSR framework is appropriate for this study for three reasons. First, the research objective is to produce a functional diagnostic tool (an artefact), not to test a hypothesis against observational data. Second, the evaluation of the artefact is demonstrated through application to representative cases and through concordance analysis against established Shariah standards, consistent with DSR evaluation methods as described by Venable et al. (2016). Third, the design knowledge produced, specifically the ribawi characteristics grid, the strip test, and the dual-track framework, is generalisable beyond the specific tool and can inform future diagnostic instruments in Islamic finance.

The three stages described below correspond to the DSR process model: problem identification (the absence of a transparent, source-traceable compliance methodology), artefact design (derivation of criteria and diagnostic architecture), and demonstration (application to representative financial products and comparison with established standards in Section 4).

### 3.1 Analytical Framework Overview

The research process follows a structured three-stage derivation that moves from primary-source analysis to measurable criteria to digital implementation. The stages are as follows:

**Stage 1: Primary-Source Derivation.** Linguistic and juridical analysis of the Arabic roots of Riba, Qard, Dayn, and Bay', systematic examination of Quranic verses and Hadith references, and review of classical scholarly positions. This stage produces the evidential foundation from which evaluation criteria are drawn.

**Stage 2: Characteristic Extraction.** Identification of seven shared characteristics of the six ribawi items named in the Hadith of Riba al-Fadl, validated against classical scholarly discussions of the 'illah (effective cause) of ribawi classification. This stage produces the measurable evaluation grid.

**Stage 3: Diagnostic Implementation.** Translation of the derived criteria into a structured, rule-based diagnostic engine with six entry categories, a dual-track analytical framework, a form-versus-substance "strip test," and 15 finding categories, each linked to specific primary-source citations.

**Evaluation.** The diagnostic outputs are evaluated through two methods: (a) demonstration through application to five representative financial products, and (b) concordance analysis comparing the framework's findings against published AAOIFI Shariah Standards and Islamic Fiqh Academy resolutions.

This structured process ensures that every diagnostic output can be traced from the tool's finding, through the evaluation criterion, back to a specific primary-source reference. The analytical framework is represented schematically below:

```
Primary Sources (Quran, Hadith, Classical Texts)
        |
        v
Stage 1: Linguistic & Juridical Analysis
        |
        v
Stage 2: Seven Ribawi Characteristics (Table 1)
        |
        v
Stage 3: Diagnostic Engine
   |         |          |
   v         v          v
Dual-Track  Strip    15 Finding
Framework   Test     Categories
   |         |          |
   v         v          v
Diagnostic Output (with source citations)
        |
        v
Evaluation: Demonstration + Concordance Analysis
```

### 3.2 Stage 1: Linguistic and Juridical Derivation

The foundation of the framework is a 119-page linguistic and juridical investigation into the prohibition of Riba, the nature of Qard, Dayn, and Bay', and the characteristics that define ribawi commodities (Abdul Majeed, 2026a). The methodology of that investigation proceeds as follows.

**Root analysis.** The study begins from the three-letter Arabic roots of the four foundational terms. Riba derives from R-B-W / R-B-Y, meaning to grow, to increase, to rise above, to swell, to exceed the original level. Every Quranic occurrence of this root is catalogued and analysed in its linguistic context. Qard derives from Q-R-D, meaning to cut: a piece cut from one's wealth and given freely, with only the exact equivalent (mithl) returning. Dayn, sharing its root with Din (faith, accountability) and Dayyan (the Judge), refers to the outstanding obligation, fixed at the point it arises. Bay' refers to bilateral exchange, requiring genuine prior ownership, genuine risk, and genuine counter-value on both sides.

**Quranic progression.** The study traces four progressive stages of Quranic prohibition, from moral discouragement in the Meccan period (Surah Al-Rum 30:39) through conditional prohibition (Surah Al-Imran 3:130) to absolute prohibition with a declaration of war from Allah and His Messenger against those who persist (Surah Al-Baqarah 2:275-279). This progressive revelation is consistent with the Quranic methodology of gradual legislation (tadarruj) observed by Al-Qurtubi in Al-Jami' li-Ahkam al-Qur'an.

**Hadith analysis.** Six key Hadith references are examined, centred on the Hadith of Riba al-Fadl (Sahih Muslim 1587), the Curse on All Parties to a Riba transaction (Sahih Muslim 1598), and the Farewell Sermon in which the Prophet (peace be upon him) abolished all pre-Islamic Riba, beginning with his own uncle's debts (Sahih Muslim 1218). The full Hadith references and their relevance to the diagnostic framework are detailed in Table A (Section 2.3).

**Classical scholarly analysis.** The form-versus-substance framework draws on Ibn Qayyim al-Jawziyyah's I'lam al-Muwaqqi'in and Ibn Taymiyyah's Majmu' al-Fatawa. Al-Ghazali's analysis of the function of money (thaman) in Ihya' 'Ulum al-Din informs the distinction between currency-level and transaction-level analysis. The scholarly positions on the effective cause of ribawi classification (Table B, Section 2.3) inform the selection of characteristics in Stage 2.

### 3.3 Stage 2: Derivation of Seven Ribawi Characteristics

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

**Scholarly grounding for the selection of characteristics.** Each characteristic is grounded in classical scholarly discussions of the ribawi items and the conditions of valid exchange:

1. **Fungibility (Mithiliyyah).** Al-Sarakhsi in Al-Mabsut defines mithliyyat (fungible goods) as items where individual units are equivalent and interchangeable. Ibn Qudamah in Al-Mughni discusses the requirement of equality (tamathul) in same-type ribawi exchange, which presupposes that the items are genuinely fungible across time.

2. **Intrinsic Value (Qimah Dhatiyyah).** Al-Ghazali in Ihya' 'Ulum al-Din distinguished between items that are "desired for themselves" (maqsud li-dhatihi) and items that serve merely as a measure (mi'yar) for other things. The six ribawi items all possess value independent of any monetary designation: gold and silver have ornamental and industrial utility; wheat, barley, dates, and salt have nutritional and preservative value.

3. **Durability of Value (Baqa').** The classical jurists noted that the ribawi items are characterised by their ability to be stored without deterioration. Al-Kasani in Bada'i al-Sana'i discussed the storability of ribawi items as relevant to their function in deferred exchanges. The requirement that ribawi items retain their value over time is implicit in the conditions of same-type exchange.

4. **Universal Acceptance (Rawaj).** Al-Ghazali discussed rawaj as a quality of sound money: acceptance that arises from demonstrated utility rather than external compulsion. Ibn Khaldun in Al-Muqaddimah similarly identified voluntary acceptance as a characteristic of genuine monetary metals.

5. **Knowable Quality (Sifah Ma'lumah).** The prohibition of Gharar (excessive uncertainty) in Islamic commercial law requires that the subject matter of an exchange be known to both parties at the time of transaction (Kamali, 2000). All six ribawi items possess qualities that can be assessed through weight, volume, or sensory evaluation at the point of exchange.

6. **Measurability (Kayl / Wazn).** The Hanafi 'illah for ribawi classification centres on items being measurable by weight or volume. Al-Sarakhsi in Al-Mabsut and Al-Kasani in Bada'i al-Sana'i both identify measurability as a defining characteristic that distinguishes ribawi from non-ribawi items.

7. **Essential Utility (Hajah 'Ammah).** The concept of hajah (need) in Islamic jurisprudence relates to items that serve fundamental human requirements. Al-Shatibi in Al-Muwafaqat classified needs into necessities (daruriyyat), needs (hajiyyat), and enhancements (tahsiniyyat). The six ribawi items all serve needs at the first or second level: sustenance (wheat, barley, dates), preservation (salt), and medium of exchange and store of value (gold, silver).

The derivation rationale for each characteristic thus traces both to the six ribawi items themselves and to the classical scholarly literature on the conditions and causes of ribawi classification. The framework does not claim that these seven characteristics are the only possible derivation; it claims that they are traceable to primary sources and classical scholarly discussions, and that they provide a measurable, reproducible basis for evaluation.

### 3.4 Stage 3: Diagnostic Engine Architecture

The diagnostic engine translates the primary-source framework into a structured, interactive evaluation tool.

#### 3.4.1 Six Entry Categories

Financial arrangements are classified into six broad categories: (1) Finance and lending, covering mortgages, home finance, personal finance, business loans, and Islamic financial institution products; (2) Investment, covering stocks, Sukuk, funds, partnerships, cryptocurrency, and property; (3) Trade and exchange, covering goods trade, credit sales, Murabahah, Salam, and commodities; (4) Personal loans and gifts, covering Qard Hasan, joint ventures, and charitable giving; (5) Currency and money exchange, covering Forex, money changers, remittance, and stablecoins; and (6) Crypto and digital assets, covering Bitcoin, altcoins, DeFi protocols, NFTs, and tokenised real-world assets.

Each category contains sub-types with tailored question sets that address the specific structural risks of that arrangement type.

#### 3.4.2 The Dual-Track Framework

The tool introduces a methodological feature designed to make the user's analytical framework explicit: three entry points corresponding to different positions on the monetary medium.

The first entry point, "Classical monetary medium," applies the full ribawi conditions without qualification. This applies to gold, silver, and genuine ribawi commodities.

The second entry point, "Fiat, treated as classical money," represents the mainstream scholarly position. Under this framework, fiat currency carries thamaniyyah (monetary nature), and therefore the same ribawi rules apply. This routes to the classical analytical track.

The third entry point, "Fiat, research framework," applies the findings of the ribawi characteristics analysis. Under this framework, fiat currency does not satisfy the seven ribawi characteristics, and what is conventionally called "interest" on fiat transactions is analysed separately from Riba in the Quranic sense. Critically, personal loans between individuals are still held to the full classical Qard Hasan standard even on this track, because the Qard relationship is one of brotherhood and mutual support, not institutional capital deployment.

The user selects their analytical framework explicitly. The tool does not impose a position. Both tracks lead to the same structural analysis of the arrangement. Neither permits exploitation.

#### 3.4.3 The Strip Test

The central diagnostic question in the framework is drawn directly from the form-versus-substance analysis of Ibn Qayyim and Ibn Taymiyyah: if you remove the asset, the commodity, or the trade steps from this arrangement, what remains?

If what remains is money in, more money out, by prior agreement, the arrangement contains Riba. The asset, commodity, or formal trade steps functioned as a Hilah (legal device). This single question, applied consistently, identifies the structural pattern that distinguishes genuine Bay' from disguised lending.

#### 3.4.4 Finding Categories

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

#### 3.4.5 Diagnostic Logic Overview

The diagnostic engine operates through a structured decision process. Upon selecting a financial arrangement category and monetary framework, the user is guided through a series of questions that map to the 15 finding categories above. The decision logic follows a three-layer evaluation:

**Layer 1: Structural identification.** The engine identifies the structural type of the arrangement (lending, equity participation, trade, exchange, or hybrid) and determines which finding categories are applicable.

**Layer 2: Condition testing.** For each applicable finding category, the engine evaluates whether the arrangement satisfies or violates the relevant conditions. For example, a lending arrangement is tested for the presence of stipulated excess (Finding 1), growing debt (Finding 6), and the strip test (Finding 7). An investment arrangement is tested for genuine ownership (Finding 3), genuine risk (Finding 5), and guaranteed returns (Finding 13).

**Layer 3: Source-linked output.** Each finding that is triggered produces an output that includes the severity classification, a narrative explanation, and the specific primary-source citation chain. The output is deterministic: identical inputs always produce identical findings.

The complete decision rules and their source mappings are implemented in the diagnostic engine's codebase. The logic is rule-based rather than probabilistic, ensuring transparency and reproducibility. A full specification of the decision rules is beyond the scope of this paper, as it constitutes the technical implementation of the diagnostic tool rather than its scholarly methodology. However, the principles governing each finding category are fully described in Sections 3.4.3 and 3.4.4, and the primary-source citations are available through the tool itself.

#### 3.4.6 Source Tracing

Every diagnostic finding is linked to its evidential chain. A finding identifying core Riba, for instance, cites Surah Al-Baqarah 2:275-279, the root analysis of R-B-W, the commentary of Ibn Abbas, Al-Tabari's Jami' al-Bayan, and Al-Qurtubi's Al-Jami' li-Ahkam al-Qur'an. No finding is presented without primary-source grounding.

#### 3.4.7 Implementation

Mizan is implemented as a browser-based, open-access tool. It requires no registration, collects no user data, and operates entirely client-side. The diagnostic engine is rule-based (not machine learning), ensuring deterministic, reproducible outputs: the same inputs always produce the same findings. The tool is freely available at https://azim.cc/tools/mizan.

---

## 4. Findings

### 4.1 Ribawi Characteristics Grid: Cross-Medium Evaluation

The seven ribawi characteristics were applied systematically to five financial mediums: fiat currency, gold/silver, Bitcoin, physical commodities, and GX Coin Protocol (a fixed-supply, productivity-referenced digital currency protocol with no debt-based issuance, designed as a not-for-profit public utility). The results are summarised in Table 2.

**Table 2**

*Ribawi Characteristics Evaluation Across Financial Mediums*

| Characteristic | Fiat Currency | Gold/Silver | Bitcoin | Physical Commodity | GX Coin Protocol |
|---------------|--------------|-------------|---------|-------------------|-----------------|
| Mithiliyyah (Fungibility) | Does not satisfy: equivalence decays through inflation; 100 units today are not equal to 100 units in one year | Satisfies | Satisfies | Satisfies (standardised grades) | Satisfies: each unit is equivalent; fixed supply prevents debasement |
| Qimah Dhatiyyah (Intrinsic Value) | Does not satisfy: no utility outside the monetary system; value exists only by institutional declaration | Satisfies (ornamental, industrial) | Uncertain: no material utility independent of network | Satisfies | Satisfies: value derived from productive economic activity within the ecosystem |
| Baqa' (Durability of Value) | Does not satisfy: purchasing power erodes through inflation by design; the US dollar has lost approximately 96% of its purchasing power since 1913 | Satisfies | Satisfies (fixed supply) but volatile in fiat-denominated terms | Satisfies (durable commodities) | Satisfies: immutable supply cap prevents monetary debasement |
| Rawaj (Universal Acceptance) | Does not satisfy under this criterion: acceptance is mandated through legal tender laws rather than arising from demonstrated utility | Satisfies (historical) | Partial: growing but not universally used in daily commerce | Satisfies (global commodities) | Partial: currently limited to ecosystem participants; acceptance growing through demonstrated utility |
| Sifah Ma'lumah (Knowable Quality) | Does not satisfy: future purchasing power is unknowable and dependent on policy decisions | Satisfies | Satisfies (code is transparent and auditable) | Satisfies (standardised grades) | Satisfies: all protocol parameters are transparent and algorithmically defined |
| Kayl / Wazn (Measurability) | Partial: nominal denomination only; real value shifts continuously | Satisfies | Satisfies (divisible to 8 decimal places) | Satisfies | Satisfies: precisely divisible in digital units |
| Hajah 'Ammah (Essential Utility) | Does not satisfy: no utility outside the monetary system | Satisfies | Uncertain: debate ongoing regarding material utility | Satisfies (food, industrial use) | Satisfies: designed as a medium of exchange within a productive economy |
| **Score** | **0 satisfy, 1 partial, 6 do not satisfy** | **7 satisfy** | **2 satisfy, 2 partial, 3 uncertain/do not satisfy** | **7 satisfy** | **6 satisfy, 1 partial, 0 do not satisfy** |

The results reveal an asymmetry between the mediums. Gold, silver, and physical commodities, the items identified in the Hadith as ribawi, satisfy all seven characteristics. GX Coin Protocol satisfies six of seven, with universal acceptance as a temporal limitation rather than a structural deficiency. Fiat currency, which the majority scholarly position treats as equivalent to gold and silver for ribawi purposes, does not satisfy any of the seven characteristics under this framework. Bitcoin occupies an intermediate position, satisfying fungibility and measurability but remaining uncertain on intrinsic value and essential utility.

This asymmetry does not constitute a determination that fiat currency is not subject to ribawi rules. The majority scholarly position grounds fiat currency's ribawi status in thamaniyyah (functional monetary nature), a valid jurisprudential argument that operates at the level of functional analogy rather than characteristic matching. The observation that fiat currency does not share the measurable characteristics of the six named ribawi items is relevant to scholarly deliberation on the precise nature of the analogy, not to its validity or invalidity. The diagnostic framework surfaces this question for engagement rather than resolving it.

### 4.2 Diagnostic Output: Representative Financial Products

The diagnostic framework was applied to five representative financial products to demonstrate its analytical output.

**Product 1: Conventional fixed-rate mortgage.** The diagnostic identifies core Riba (stipulated excess above the principal), a growing Dayn (the outstanding obligation increases through compounding interest over the loan term), and a Maqasid concern regarding inescapable debt. The strip test is not required, as the ribawi structure is explicit.

**Product 2: Murabahah home financing (commodity-based, fiat-denominated).** The diagnostic identifies the product as formally structured as a sale (Bay') with a disclosed profit margin. However, the strip test raises a Hilah concern: when the commodity transfer is nominal (the financier never bears genuine commercial risk of ownership), removing the commodity layer reveals the same economic structure as a conventional loan with a fixed return. The diagnostic does not declare the product impermissible; it flags the structural concern and cites Ibn Qayyim's framework for the user's consideration.

**Product 3: Musharakah Mutanaqisah (diminishing partnership).** Under the classical track, the diagnostic identifies genuine shared ownership, genuine risk exposure (both parties bear potential loss), and a declining Dayn that does not grow through time. The arrangement passes the strip test: removing the property reveals a genuine partnership, not a disguised loan. On the fiat track, the arrangement also passes the structural tests, with an informational finding noting the open scholarly question regarding the fiat medium.

**Product 4: Bitcoin spot purchase.** No lending is involved; therefore, no Riba is identified. The diagnostic flags a Maysir (speculative gambling) concern if the purchase is for short-term price speculation rather than genuine utility or long-term holding. The ribawi characteristics grid is displayed, showing Bitcoin's mixed profile: it satisfies fungibility, durability, knowable quality, and measurability, but remains uncertain on intrinsic value and essential utility.

**Product 5: Organised Tawarruq (commodity Murabahah for cash).** The strip test identifies the arrangement as a Hilah: the commodity exists in form, but the substance is a cash loan with a fixed return. The diagnostic cites the Islamic Fiqh Academy Resolution 179 (2009) and Imam Ahmad ibn Hanbal's classification of Tawarruq as a stratagem. This finding is consistent across both analytical tracks.

### 4.3 Dual-Track Divergence

The dual-track framework produces identical results for three of the five products (conventional mortgage, Musharakah Mutanaqisah, and organised Tawarruq). These arrangements are either clearly ribawi (conventional mortgage), structurally sound (Musharakah), or structurally problematic (Tawarruq) regardless of the analytical track.

The divergence emerges in the Murabahah home financing product. On the classical track, where fiat is treated as a ribawi medium, the fixed return on a fiat-denominated transaction is analysed under the full ribawi framework. On the fiat research track, the question shifts: if fiat currency does not satisfy the ribawi characteristics, the fixed return may represent a compensation mechanism for the structural depreciation of the medium rather than Riba in the Quranic sense. The diagnostic does not resolve this question. It presents both analyses with their respective source citations, allowing the user to engage with the evidence directly.

This dual-track approach is the methodological contribution of the framework. It does not advocate for either position. It makes both positions operational and transparent, enabling informed engagement with a question that remains subject to scholarly deliberation.

### 4.4 Concordance with Established Shariah Standards

To assess the diagnostic framework's alignment with established institutional positions, the five representative products were evaluated against the relevant AAOIFI Shariah Standards and Islamic Fiqh Academy resolutions. Table 3 presents the concordance analysis.

**Table 3**

*Concordance Analysis: Mizan Diagnostic Output vs. Established Shariah Standards*

| Financial Product | Mizan Diagnostic Output | Relevant AAOIFI Standard / IFA Resolution | Established Position | Concordance |
|------------------|------------------------|-------------------------------------------|---------------------|-------------|
| Conventional mortgage | Core Riba identified; growing Dayn; Maqasid concern | AAOIFI SS No. 8 (Murabahah); general prohibition of Riba | Impermissible: stipulated interest constitutes Riba | **Full concordance.** Both the framework and established standards identify the product as containing Riba. |
| Murabahah home financing (nominal commodity transfer) | Hilah concern raised via strip test; structural similarity to conventional loan when ownership risk is absent | AAOIFI SS No. 8, Clause 3/1: "The institution must acquire the commodity before selling it... and must bear the risk of the commodity" | Permissible only when genuine ownership and risk are present; impermissible when ownership transfer is nominal | **Substantial concordance.** The strip test concern aligns with AAOIFI's requirement for genuine ownership and risk-bearing. The framework's finding is consistent with AAOIFI's conditions for valid Murabahah. |
| Musharakah Mutanaqisah | Passes structural tests; genuine ownership and risk identified | AAOIFI SS No. 12 (Musharakah), SS No. 13 (Diminishing Musharakah) | Permissible when structured with genuine partnership and risk-sharing | **Full concordance.** Both the framework and AAOIFI standards identify the product as structurally sound. |
| Bitcoin spot purchase | No Riba; Maysir concern if speculative | No specific AAOIFI standard; varying scholarly positions | No consensus; some scholars permit with conditions, others express concern regarding Gharar and speculation | **Partial concordance.** The framework's identification of Maysir concern is consistent with the cautionary scholarly positions, while its finding of no Riba is consistent with the absence of a lending structure. |
| Organised Tawarruq | Hilah identified; strip test failure | AAOIFI SS No. 30 (Monetisation/Tawarruq); IFA Resolution 179 (2009) | Organised Tawarruq declared impermissible by IFA; AAOIFI restricts to genuine commodity transactions | **Full concordance.** Both the framework and the IFA/AAOIFI identify organised Tawarruq as a legal device masking a prohibited structure. |

The concordance analysis demonstrates that the diagnostic framework's outputs align substantially with established Shariah standards across the evaluated products. Full concordance is observed in three of five cases (conventional mortgage, Musharakah Mutanaqisah, and organised Tawarruq). Substantial concordance is observed for Murabahah, where the framework's strip test concern mirrors AAOIFI's conditions for genuine ownership and risk. Partial concordance is observed for Bitcoin, where the absence of institutional consensus makes direct comparison less meaningful.

This analysis supports the framework's utility as a diagnostic tool that complements, rather than contradicts, established institutional positions. The areas of divergence, particularly the dual-track treatment of fiat-denominated products, represent the framework's contribution to surfacing questions that existing standards address through institutional consensus rather than through explicit engagement with primary-source criteria.

It should be noted that this concordance analysis compares diagnostic outputs against published standards and resolutions. A more rigorous evaluation would involve expert panel assessment comparing the framework's outputs against the reasoning of practising Shariah scholars across a broader range of financial products. Such a study is identified as a priority for future research (Section 5.5).

---

## 5. Discussion

### 5.1 Implications for Shariah Compliance Practice

The Mizan framework demonstrates that Shariah compliance evaluation can be made transparent, reproducible, and source-traceable while operating within, and complementary to, the existing institutional framework. The diagnostic does not issue Fatwas. It provides a structured diagnostic baseline that scholars, practitioners, and researchers can use as a starting point for further analysis.

The source-tracing requirement, where every finding is linked to a specific primary-source citation, addresses the transparency concern identified in Section 1.1. When a user receives a finding that an arrangement contains core Riba, the finding cites Surah Al-Baqarah 2:275-279, the root analysis of R-B-W, and specific classical commentaries. The user can verify the evidential chain independently. This represents a model distinct from the current prevailing practice, where compliance is often communicated as a binary ruling (permissible or impermissible) without transparent engagement with the underlying evidence.

The framework's diagnostic nature should be emphasised. Its outputs are intended as evidence-based starting points for scholarly deliberation, not as authoritative determinations. The tool provides analytical structure and source tracing; the interpretation of that evidence remains the domain of qualified scholars and informed individuals.

### 5.2 The Fiat Currency Question

The ribawi characteristics grid (Table 2) engages with a question that is typically addressed through institutional consensus in contemporary Islamic finance: whether fiat currency satisfies the classical criteria for ribawi classification. The majority scholarly position, articulated by Justice Muhammad Taqi Usmani and endorsed by major Shariah boards globally, treats fiat currency as subject to ribawi rules on the basis of thamaniyyah (Usmani, 2002). This position holds that the functional role of fiat currency as a medium of exchange is sufficient to trigger ribawi rules, regardless of whether fiat shares the material characteristics of gold and silver.

This position carries substantial weight. It is supported by the Shafi'i and Maliki schools' identification of thamaniyyah as the 'illah for monetary ribawi items, by the Islamic Fiqh Academy's resolutions on currency exchange, and by the practical reality that the global Islamic finance industry operates on this basis. AAOIFI's Shariah standards for currency exchange (Sarf) and related transactions are built upon this position.

The diagnostic framework's observation that fiat currency does not satisfy the seven measurable characteristics shared by the six named ribawi items operates at a different level of analysis. It does not challenge the thamaniyyah argument on its own terms; rather, it raises the question of whether functional analogy alone fully captures the relationship between modern fiat and classical ribawi items, or whether additional jurisprudential reasoning may be needed. The majority position addresses the question of function (does fiat serve as money?), while the ribawi characteristics analysis addresses the question of structural properties (does fiat share the material and economic properties of the six named items?).

This paper does not resolve this question, nor does it advocate for a particular resolution. The framework's contribution is to make the question visible and operational. The diagnostic finding that fiat currency does not share the measurable characteristics of the six ribawi items is offered as an observation warranting scholarly engagement, not as a conclusion displacing the majority position. The dual-track framework allows users to evaluate financial instruments under either analytical position, ensuring that neither the majority nor the minority view is assumed without the user's informed choice.

The implications of this observation, if taken to its logical conclusion, would be significant. If fiat currency does not satisfy the classical ribawi criteria, the analytical framework that contemporary Islamic finance applies to fiat-denominated transactions may require supplementary jurisprudential reasoning. This does not entail that interest on fiat is permissible; rather, it may mean that the prohibition could also be grounded in Maqasid al-Shariah (the fiat system's structural impact on Hifz al-Mal), the concept of Ghashsh (adulteration or deception in the medium of exchange), or other analytical foundations. These alternative grounds deserve exploration in future scholarly work.

### 5.3 FinTech as Methodology, Not Just Product

The current Islamic FinTech landscape is characterised by product-level innovation: digital banks, blockchain Sukuk, and robo-advisors that apply Shariah-compliant wrappers to conventional FinTech models (Alam et al., 2022). Mizan represents a different category of innovation: methodology-level FinTech. Rather than digitising a financial product, it digitises the analytical framework that informs whether products are permissible.

This distinction has practical significance. A digital Islamic bank still depends on its Shariah board for compliance determinations. Mizan does not replace that board, but it provides a transparent, reproducible baseline that the board, the bank's clients, and external researchers can all access. The diagnostic output can serve as a starting point for scholarly review, a training tool for Islamic finance students, or a due diligence mechanism for retail consumers evaluating financial products.

The rule-based architecture (as opposed to machine learning) is a deliberate design choice. Deterministic outputs, where the same inputs always produce the same findings, are essential for a diagnostic tool that claims transparency and reproducibility. Machine learning models, however powerful, introduce opacity that would undermine the framework's core value proposition.

### 5.4 Limitations

Several limitations must be acknowledged.

First, the seven ribawi characteristics are derived from one analytical framework. Other scholars may derive different characteristics or weight them differently. The framework does not claim to be the only valid derivation; it claims to be transparent, source-traceable, and reproducible.

Second, the diagnostic is rule-based and evaluates arrangements based on user-provided descriptions. Users may describe their arrangements inaccurately, whether through misunderstanding or deliberate misrepresentation. The diagnostic cannot verify the factual accuracy of user inputs.

Third, the fiat currency analysis represents an observation within a specific analytical framework that produces results differing from the majority scholarly position. The majority position, endorsed by AAOIFI, major Shariah boards, and leading scholars, treats fiat as subject to ribawi rules. The diagnostic's dual-track framework may be interpreted as giving undue prominence to the minority view. The framework's intent is to surface the question for scholarly deliberation, not to give either position precedence.

Fourth, the diagnostic does not constitute a Fatwa and is not intended to replace qualified scholarly opinion. It is a diagnostic tool that surfaces evidence and identifies structural patterns. The interpretation of that evidence remains the domain of qualified scholars and informed individuals.

Fifth, the current implementation covers six broad categories of financial activity but does not yet address all possible financial arrangements. Complex derivatives, structured products, and novel DeFi protocols may require additional question sets and finding categories.

Sixth, the concordance analysis in Section 4.4 compares diagnostic outputs against published standards rather than against the reasoning of an expert panel of Shariah scholars. While the results demonstrate substantial alignment with established positions, a more rigorous validation through expert panel evaluation would strengthen the framework's empirical foundation.

Seventh, GX Coin Protocol is included in the cross-medium evaluation (Table 2) as a representative example of a fixed-supply, non-debt-based digital currency architecture. The author is the founder of the GX Coin Protocol, which is a not-for-profit public utility protocol. While the protocol receives a favourable evaluation under the ribawi characteristics grid, this evaluation follows from the application of the same criteria applied to all mediums. The protocol's inclusion is intended to demonstrate the framework's applicability to digital currency architectures; however, readers should note the author's relationship to this protocol when evaluating these results. The analysis of the remaining four mediums (fiat currency, gold/silver, Bitcoin, and physical commodities) is unaffected by this relationship.

### 5.5 Future Research

Several directions for future research emerge from this work. The most immediate priority is expert panel validation: a structured study in which practising Shariah scholars independently evaluate the same financial products using their established methodologies, with results compared against the diagnostic framework's outputs to measure concordance, divergence, and the reasoning behind any differences. This would provide the empirical validation necessary to assess the framework's reliability beyond the demonstration and concordance analysis presented here.

Extension of the diagnostic to additional financial instruments, particularly complex derivatives and DeFi protocols, would expand the framework's coverage. Collaborative development with Shariah scholars to refine the ribawi characteristics derivation and the diagnostic question sets would strengthen the framework's scholarly foundation. Integration with regulatory frameworks such as AAOIFI standards and IFSB guiding principles could position the diagnostic as a complement to existing compliance infrastructure.

Further research into alternative jurisprudential grounds for evaluating fiat-denominated transactions, including Maqasid-based analysis and the concept of Ghashsh in the monetary medium, would advance the scholarly engagement that this paper seeks to facilitate.

---

## 6. Conclusion

This paper has presented Mizan, a primary-source diagnostic framework for evaluating Islamic financial instruments against classical ribawi characteristics. The framework addresses a gap in Islamic finance: the limited availability of standardised, transparent, source-traceable diagnostic methodologies for Shariah compliance evaluation that complement existing institutional mechanisms.

Three contributions emerge from this work. First, the ribawi characteristics grid provides a measurable, reproducible methodology for evaluating whether a financial medium satisfies the criteria that the six named ribawi items share. The systematic application of this grid produces the diagnostic observation that fiat currency does not satisfy these seven characteristics, an observation offered for scholarly deliberation rather than as a definitive classification. The majority scholarly position on fiat currency's ribawi status, grounded in thamaniyyah, remains the dominant and institutionally established view.

Second, the strip test operationalises the form-versus-substance analysis of Ibn Qayyim al-Jawziyyah and Ibn Taymiyyah as a structured diagnostic question applicable to any financial arrangement. This test identifies the structural pattern that distinguishes genuine trade from disguised lending, regardless of the labels applied to the arrangement. The concordance analysis demonstrates that this diagnostic question produces outputs substantially aligned with AAOIFI standards and Islamic Fiqh Academy resolutions.

Third, the dual-track analytical framework makes the fiat currency question explicit. Rather than silently assuming one scholarly position, the framework presents both the mainstream position and the primary-source analytical framework as operational tracks, allowing users to engage with the evidence directly. The framework is diagnostic, not adjudicative: its outputs are intended as starting points for qualified scholarly deliberation, not as determinative rulings.

The Islamic finance industry has reached a scale and complexity that benefits from analytical infrastructure that complements its existing scholarly foundations. FinTech innovation in this space can extend beyond product digitisation to methodology digitisation, making the jurisprudential foundations of Shariah compliance more transparent, reproducible, and accessible. Mizan is an initial contribution to this objective. Its limitations are acknowledged, and its findings are offered for scholarly scrutiny, refinement, and extension.

The tool is freely available at https://azim.cc/tools/mizan. The underlying research is published in full at https://azim.cc/blog/riba-research-paper. Any errors of interpretation are the author's own.

---

## Declarations

**Authorship Statement.** This paper is the sole work of the named author. There are no guest, gift, or ghost authors. The research, analysis, diagnostic framework design, and writing are entirely the author's own.

**AI Disclosure.** An AI language model (Claude, Anthropic) was used during the preparation of this manuscript for grammar checking, spelling correction, language flow, and formatting consistency. The full document was verified through this process to ensure clarity and readability. The author is fully responsible for all research, analysis, arguments, conclusions, and thesis content. The AI tool was not used to generate research findings, formulate arguments, or produce substantive analytical content.

**Conflict of Interest.** The Mizan diagnostic tool is an open-access, non-commercial project with no institutional funding or commercial backing. GX Coin Protocol, included in the cross-medium evaluation (Table 2), is a not-for-profit public utility protocol founded by the author. The protocol is designed for public distribution as a grant to participants, not as a commercial product. The author's relationship to this protocol is disclosed in Section 5.4 (Limitations), and readers should evaluate the protocol's inclusion in Table 2 with this relationship in mind. The analysis of the remaining four mediums and all five representative financial products is unaffected by this relationship.

**Prior Publication.** This submission has not been previously published, nor is it under consideration by any other journal.

**Ethics Statement.** This research complies with JIBEP's Research Ethics Guidelines and the COPE Code of Conduct. No human subjects, personal data, or confidential information were involved in this study.

---

## References

Abdul Majeed, M. A. (2026a). *From gold to paper: Riba, fiat currency, and the question nobody wants to ask*. https://azim.cc/blog/riba-research-paper

Abdul Majeed, M. A. (2026b). Introducing Mizan: An Islamic finance diagnostic built on first principles. *azim.cc*. https://azim.cc/blog/introducing-mizan

Accounting and Auditing Organization for Islamic Financial Institutions. (2023). *Shariah standards*. AAOIFI.

Alam, N., Gupta, L., & Zameni, A. (2022). *Fintech and Islamic finance: Digitalization, development and disruption*. Palgrave Macmillan.

Al-Ghazali, A. H. (n.d.). *Ihya' 'ulum al-din* [The revival of the religious sciences]. Dar al-Ma'rifah.

Al-Kasani, A. B. (n.d.). *Bada'i al-sana'i fi tartib al-shara'i* [Wonders of craftsmanship in the arrangement of laws]. Dar al-Kutub al-'Ilmiyyah.

Al-Qurtubi, M. A. (n.d.). *Al-Jami' li-ahkam al-Qur'an* [The comprehensive rulings of the Quran]. Dar al-Kutub al-Misriyyah.

Al-Sarakhsi, M. A. (n.d.). *Al-Mabsut*. Dar al-Ma'rifah.

Al-Shatibi, I. M. (n.d.). *Al-Muwafaqat fi usul al-Shariah* [The reconciliation of the fundamentals of Islamic law]. Dar Ibn 'Affan.

Al-Suwailem, S. (2006). *Hedging in Islamic finance*. Islamic Development Bank, Islamic Research and Training Institute.

Al-Tabari, M. J. (n.d.). *Jami' al-bayan 'an ta'wil ay al-Qur'an* [The comprehensive exposition of the interpretation of the verses of the Quran]. Dar Hajar.

Al-Zuhayli, W. (2003). *Al-Fiqh al-Islami wa adillatuhu* [Islamic jurisprudence and its evidences] (3rd ed.). Dar al-Fikr.

Ayub, M. (2007). *Understanding Islamic finance*. John Wiley & Sons.

Biancone, P. P., Saiti, B., & Petricean, D. (2020). The bibliometric analysis of Islamic banking and finance. *Journal of Islamic Accounting and Business Research*, *11*(9), 2069-2086. https://doi.org/10.1108/JIABR-08-2020-0235

Chapra, M. U. (2006). The nature of riba in Islam. *The Journal of Islamic Economics and Finance*, *2*(1), 7-25.

Derigs, U., & Marzban, S. (2008). Review and analysis of current Shariah-compliant equity screening practices. *International Journal of Islamic and Middle Eastern Finance and Management*, *1*(4), 285-303. https://doi.org/10.1108/17538390810919600

Garas, S., & Pierce, C. (2010). Shari'a supervision of Islamic financial institutions. *Journal of Financial Regulation and Compliance*, *18*(4), 386-407. https://doi.org/10.1108/13581981011093695

Grais, W., & Pellegrini, M. (2006). *Corporate governance and Shariah compliance in institutions offering Islamic financial services* (World Bank Policy Research Working Paper No. 4054). World Bank.

Hassan, M. K., Aliyu, S., Saiti, B., & Abdul Halim, Z. (2019). A review of Islamic stock market, growth and real-estate finance literature. *International Journal of Emerging Markets*, *15*(4), 643-668. https://doi.org/10.1108/IJOEM-11-2019-1001

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly*, *28*(1), 75-105. https://doi.org/10.2307/25148625

Ibn Qayyim al-Jawziyyah, M. A. (n.d.). *I'lam al-muwaqqi'in 'an rabb al-'alamin* [A notice to those who issue rulings on behalf of the Lord of the worlds]. Dar al-Kutub al-'Ilmiyyah.

Ibn Qudamah, M. A. (n.d.). *Al-Mughni*. Dar Ihya' al-Turath al-'Arabi.

Ibn Taymiyyah, A. A. (n.d.). *Majmu' al-fatawa* [Compilation of legal rulings]. Dar al-Wafa'.

Islamic Financial Services Board. (2024). *Islamic financial services industry stability report 2024*. IFSB.

Islamic Fiqh Academy. (2009). Resolution No. 179 (19/5) on organised Tawarruq. *Organisation of Islamic Cooperation*.

Kamali, M. H. (2000). *Islamic commercial law: An analysis of futures and options*. Islamic Texts Society.

Kamali, M. H. (2003). *Principles of Islamic jurisprudence* (3rd ed.). Islamic Texts Society.

Khatkhatay, M. H., & Nisar, S. (2007). Shariah compliant equity investments: An assessment of current screening norms. *Islamic Economic Studies*, *15*(1), 47-76.

Laldin, M. A., & Furqani, H. (2013). Developing Islamic finance in the framework of Maqasid al-Shari'ah. *International Journal of Islamic and Middle Eastern Finance and Management*, *6*(4), 278-289. https://doi.org/10.1108/IMEFM-05-2013-0057

Noman, M. (2025). Blockchain adoption challenges and solutions in Bangladesh. *Journal of Islamic Banking, Economics and Policy*, *1*(2), 2-19.

Obaidullah, M. (2005). *Islamic financial services*. Islamic Economics Research Centre, King Abdulaziz University.

Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). A design science research methodology for information systems research. *Journal of Management Information Systems*, *24*(3), 45-77. https://doi.org/10.2753/MIS0742-1222240302

Siddiqi, M. N. (2004). *Riba, bank interest and the rationale of its prohibition*. Islamic Development Bank, Islamic Research and Training Institute.

Todorof, M. (2018). Shariah-compliant FinTech in the banking industry. *ERA Forum*, *19*(1), 1-17. https://doi.org/10.1007/s12027-018-0505-8

Usmani, M. T. (2002). *An introduction to Islamic finance*. Kluwer Law International.

Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS: A framework for evaluation in design science research. *European Journal of Information Systems*, *25*(1), 77-89. https://doi.org/10.1057/ejis.2014.36

Yasmin, S., & Arshed, N. (2025). Can Islamic financing ease in monetary policy uncertainty: A proposal for Islamic monetary policy. *Journal of Islamic Banking, Economics and Policy*, *1*(2), 32-51.
