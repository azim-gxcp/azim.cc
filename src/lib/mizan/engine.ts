import type {
  Question,
  WeightMap,
  Finding,
  Verdict,
  VerdictResult,
  RibawiGrid,
  RibawiItem,
  SummaryItem,
} from "./types";

/**
 * Personal sub-types: on the fiat track these always use classical rules.
 * Reason: the Qard/personal relationship is one of brotherhood and mutual support,
 * not institutional capital deployment. The inflation/Hifz al-Mal argument for
 * interest-on-fiat does not apply between individuals. The Prophet's (SAW)
 * Dayn/Kufr warning (Sunan al-Nasa'i 5473) applies most acutely to
 * person-over-person debt.
 */
const PERSONAL_SUBS = ["qard", "receiving", "joint_venture", "gift"];

/** Sub-types that display the Ribawi characteristics comparison grid. */
const RIBAWI_SUBS = [
  "forex",
  "money_changer",
  "bitcoin",
  "altcoin",
  "crypto_exchange",
  "stablecoin",
  "commodity",
  "crypto_invest",
  "rwa_token",
];

/**
 * The seven characteristics of the six Ribawi items, compared across
 * fiat currency, Bitcoin, altcoins, and physical commodities.
 */
const RIBAWI_ITEMS: RibawiItem[] = [
  {
    name: "Fungibility (Mithiliyyah)",
    ar: "\u0645\u0650\u062B\u0652\u0644\u0650\u064A\u0651\u064E\u0629",
    fiat: "Fails - decays through inflation",
    crypto_b: "Passes - each BTC is equivalent",
    crypto_a: "Varies by coin",
    commodity: "Passes for standardised grades",
  },
  {
    name: "Intrinsic value (Qimah Dhatiyyah)",
    ar: "\u0642\u0650\u064A\u0645\u064E\u0629 \u0630\u064E\u0627\u062A\u0650\u064A\u0651\u064E\u0629",
    fiat: "Fails - zero intrinsic value",
    crypto_b: "Uncertain - no material utility",
    crypto_a: "Varies - most fail",
    commodity: "Passes for physical commodities",
  },
  {
    name: "Durability (Baqa')",
    ar: "\u0628\u064E\u0642\u064E\u0627\u0621",
    fiat: "Fails - value erodes by policy",
    crypto_b: "Passes - supply is fixed",
    crypto_a: "Varies - most are speculative",
    commodity: "Passes for durable commodities",
  },
  {
    name: "Universal acceptance (Rawaj)",
    ar: "\u0631\u064E\u0648\u064E\u0627\u062C",
    fiat: "Fails - coerced by law",
    crypto_b: "Partial - growing but not universal",
    crypto_a: "Fails for most altcoins",
    commodity: "Passes for global commodities",
  },
  {
    name: "Knowable quality (Sifah Ma'lumah)",
    ar: "\u0635\u0650\u0641\u064E\u0629 \u0645\u064E\u0639\u0652\u0644\u064F\u0648\u0645\u064E\u0629",
    fiat: "Fails - future value unknowable",
    crypto_b: "Passes - code is transparent",
    crypto_a: "Varies - most are opaque",
    commodity: "Passes for standardised grades",
  },
  {
    name: "Measurability (Kayl/Wazn)",
    ar: "\u0643\u064E\u064A\u0652\u0644 / \u0648\u064E\u0632\u0652\u0646",
    fiat: "Partial - denomination only",
    crypto_b: "Passes - to 8 decimal places",
    crypto_a: "Passes technically",
    commodity: "Passes",
  },
  {
    name: "Essential utility (Hajah 'Ammah)",
    ar: "\u062D\u064E\u0627\u062C\u064E\u0629 \u0639\u064E\u0627\u0645\u0651\u064E\u0629",
    fiat: "Fails - no utility outside monetary system",
    crypto_b: "Uncertain - debate ongoing",
    crypto_a: "Fails for meme coins",
    commodity: "Passes for food/industrial use",
  },
];

export function computeVerdict(
  subtype: string,
  qList: Question[],
  ansArr: (number | undefined)[],
  medium: string,
  entryPath: string
): VerdictResult {
  const W: WeightMap = {};
  const findings: Finding[] = [];
  const summary: SummaryItem[] = [];

  qList.forEach((q, i) => {
    const a = ansArr[i];
    if (a === undefined) return;
    const opt = q.opts[a];
    if (!opt) return;
    summary.push({ q: q.text, a: opt.label, val: opt.val });
    Object.entries(opt.w || {}).forEach(([k, v]) => {
      W[k] = (W[k] || 0) + v;
    });
  });

  const score = Object.values(W).reduce((s, v) => s + v, 0);

  // ── CORE RIBA ──
  if ((W.riba_core || 0) >= 3) {
    findings.push({
      t: "f",
      label: "Core Riba structure identified",
      text: "The most fundamental test has been failed. There is a stipulated excess above the principal - money goes in, more money comes back by prior agreement. This is Riba by the primary-source definition. The Arabic root R-B-W (to grow, to exceed the original level) applied to finance is this: any excess (Ziyadah) above the original principal (Ra's al-Mal), pre-stipulated as a condition, arising without genuine counter-value and without real risk. The name given to this excess - profit, fee, mark-up, return - does not change what it is. \"Allah has permitted Bay' and forbidden Riba\" (Surah Al-Baqarah 2:275). For Riba to be forbidden and Bay' to be permitted, each must have a distinct meaning. This arrangement falls on the Riba side of that line.",
      src: "Surah Al-Baqarah 2:275-279; Root analysis of R-B-W; Ibn Abbas; Al-Tabari, Jami' al-Bayan; Al-Qurtubi, Al-Jami' li-Ahkam al-Qur'an",
    });
  }

  if ((W.fixed_return || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Return is fixed and predetermined - not from genuine trade or partnership",
      text: "A return that is calculated and agreed before any trade, investment, or partnership activity has occurred is not profit from Bay' or Musharakah - it is the return from a loan. Genuine trade profit is uncertain until the trade is completed. Genuine partnership profit depends on actual performance. A predetermined, fixed return - regardless of what happens - is the economic fingerprint of Riba al-Nasi'ah: the return from lending money for a period.",
      src: "Sahih Muslim 1587 (Riba al-Fadl Hadith); Definition of Bay' from Al-Mabsut, Al-Mudawwanah; Al-kharaj bil-daman principle (Sunan Abi Dawud 3508)",
    });
  }

  if ((W.no_own || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Genuine prior ownership was absent",
      text: "Bay' (trade) requires that the seller own the Mabi' (object of sale) before selling it. The Prophet \uFDFA: \"Do not sell what you do not have\" (Sunan al-Tirmidhi 1232; Sunan Abi Dawud 3503). This is not a technicality - it is the condition that distinguishes genuine trade (where the seller bears real commercial risk) from a dressed-up loan (where the seller arranges goods to pass through without bearing any risk). Without genuine prior ownership, Allah's permission for Bay' cannot be applied to this transaction.",
      src: "Sunan al-Tirmidhi 1232; Sunan Abi Dawud 3503; Al-Sarakhsi, Al-Mabsut Vol. 13; Ibn Qudamah, Al-Mughni Vol. 4",
    });
  } else if ((W.nominal_own || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Ownership appears nominal rather than genuine",
      text: "There is a difference between a legal title held for seconds with zero commercial exposure and genuine ownership that carries real financial risk. The classical scholars required Daman (liability of ownership) as the justification for Kharaj (right to profit). An asset that passes through the financier's books without any genuine risk exposure has not generated the Daman - and therefore the Kharaj derived from it is questionable.",
      src: "Al-kharaj bil-daman principle; Sunan Abi Dawud 3508; Al-Hidayah of al-Marghinani; Ibn Qudamah, Al-Mughni",
    });
  }

  if ((W.no_risk || 0) >= 2) {
    findings.push({
      t: "f",
      label: "No genuine risk - no right to profit",
      text: "Al-kharaj bil-daman: the right to the yield (Kharaj) comes with the liability of loss (Daman). This principle is narrated and applied by all four madhabs. A financier, investor, or seller who is fully protected against any loss of principal - through collateral, guarantees, insurance, or the structure of the arrangement - does not bear Daman and therefore does not hold the right to Kharaj. A guaranteed return with no genuine risk of principal loss is the economic signature of Riba, not Bay' or Musharakah.",
      src: "Sunan Abi Dawud 3508 (authenticated by al-Albani); Al-Hidayah; Al-Mughni; Imam al-Shafi'i, Al-Umm",
    });
  } else if ((W.nominal_risk || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Risk appears nominal - practically eliminated",
      text: "Collateral, personal guarantees, and indemnities that cover all practical risk of loss convert a trade or partnership into a secured loan in economic substance. If the only scenario in which the financier loses is one that is practically impossible (total collapse with zero recovery), the risk is theoretical, not real.",
      src: "Al-kharaj bil-daman principle; Imam Ahmad ibn Hanbal's Fatawa on constructed transactions",
    });
  }

  if ((W.dayn_grows || 0) >= 2) {
    findings.push({
      t: "f",
      label: "The Dayn (outstanding obligation) grows - this is Riba al-Nasi'ah",
      text: "Riba lives in the Dayn. Once any Dayn is established - whether from a loan (Qard), a credit sale (Bay' Mu'ajjal), or any other source - the amount of that Dayn is fixed. Any increase in the outstanding Dayn arising from the passage of time, from delay, or from extension is Riba al-Nasi'ah: the Riba of delay. The Prophet \uFDFA abolished all Jahiliyyah Riba at the Farewell Sermon, beginning with his own uncle's debts. The pre-Islamic Arabs practised exactly this: when the debtor could not pay, the creditor said \"double or pay.\" Allah commands in Quran 2:280: grant time freely. Charging for time is precisely what was abolished.",
      src: "Surah Al-Baqarah 2:280; Sahih Muslim 1218 (Farewell Sermon); Definition of Riba al-Nasi'ah from all four madhabs; Al-Tabari, Jami' al-Bayan on 2:275",
    });
  } else if ((W.dayn_grows || 0) === 1) {
    findings.push({
      t: "w",
      label: "Fixed penalty fee on delay - a caution",
      text: "While a one-time, non-compounding fixed late fee does not compound in the way that interest does, the majority of classical scholars - particularly Maliki and Hanbali - held that any increase arising from delay touches the Riba al-Nasi'ah concern. The safest position is that the Dayn remains completely fixed: time is given freely, and no additional amount is owed regardless of timing.",
      src: "Surah Al-Baqarah 2:280; Al-Muwatta' of Imam Malik; Ibn Qudamah, Al-Mughni Vol. 4; Contemporary Fiqh Academy rulings",
    });
  }

  if ((W.hila || 0) >= 2) {
    findings.push({
      t: "w",
      label: "Hila (legal subterfuge) - the strip test reveals a loan",
      text: "Remove the asset, the commodity, or the formal trade steps from this arrangement. What remains is money in, more money out - a loan with a fixed return. The goods, assets, or structured steps are a Hilah: a legal stratagem designed to give a loan the appearance of a trade. Ibn Qayyim al-Jawziyyah dedicated I'lam al-Muwaqqi'in (A Notice to Those Who Issue Rulings) to dismantling exactly these stratagems. His teacher Ibn Taymiyyah stated: \"Whoever uses a Hilah to consume Riba under the cover of a sale has committed a greater sin than one who consumes Riba openly - because he has added to the transgression the sin of mocking the Law that forbids it.\"",
      src: "Ibn Qayyim al-Jawziyyah, I'lam al-Muwaqqi'in Vol. 3; Ibn Taymiyyah, Majmu' al-Fatawa; Imam Ahmad ibn Hanbal, Masa'il; Islamic Fiqh Academy Resolution 179 (Tawarruq)",
    });
  }

  if ((W.tawarruq || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Organised Tawarruq structure identified",
      text: "Tawarruq: the purchase of a commodity on credit, then the immediate sale of that commodity for cash. In organised Tawarruq - where the bank arranges the commodity transaction on your behalf to generate cash - the Islamic Fiqh Academy (Resolution 179, 19th Session, 2009) declared: \"The Fiqh Academy declares that organised Tawarruq, as currently practised by financial institutions, is not permissible.\" Imam Ahmad ibn Hanbal classified it as Hilah. The commodity exists in form; the substance is a cash loan with a fixed return.",
      src: "Islamic Fiqh Academy Resolution 179 (2009); Imam Ahmad ibn Hanbal, Masa'il; Al-Mughni of Ibn Qudamah on Bay' al-'Inah",
    });
  }

  if ((W.haram || 0) >= 2) {
    findings.push({
      t: "f",
      label: "The underlying activity is prohibited",
      text: "A structurally correct Bay', Musharakah, or Ijarah cannot validate a prohibited underlying activity. Participating in the ownership, financing, or leasing of businesses involved in alcohol, gambling, conventional interest-based banking, adult content, or weapons production is prohibited. \"O you who believe, do not consume each other's wealth unjustly, except through trade by mutual consent\" (Surah An-Nisa 4:29). Consent does not validate prohibited activity.",
      src: "Surah An-Nisa 4:29; Surah Al-Ma'idah 5:2 (cooperate in righteousness, not sin); Classical Fiqh on permissible trades",
    });
  }

  if ((W.leverage || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Leverage - borrowing to invest combines multiple violations",
      text: "Leveraged investment combines: (1) Riba from the borrowing that funds the leverage; (2) Gharar (excessive uncertainty) from positions magnified beyond what the investor owns; (3) Maysir (gambling) from the speculative amplification of gains and losses. The Prophet \uFDFA sought refuge from crushing debt every morning and evening (Sahih al-Bukhari 6369). Leveraged positions can generate inescapable Dayn in moments - the very harm the Prophet \uFDFA equated with Kufr (Sunan al-Nasa'i 5473).",
      src: "Sahih al-Bukhari 6369; Sunan al-Nasa'i 5473; Sahih Muslim 1513 (prohibition of Gharar sales); Classical position on Maysir",
    });
  }

  if ((W.speculative || 0) >= 2) {
    findings.push({
      t: "w",
      label: "Speculative in nature - Maysir concern",
      text: "Maysir (gambling) involves committing wealth to an uncertain outcome for pure gain, without genuine economic contribution. The Prophet \uFDFA prohibited Gharar (excessive uncertainty) in sales (Sahih Muslim 1513). Pure price speculation - buying an asset with no genuine analysis or productive intention, purely to sell at a higher price - approaches Maysir. This does not mean all investment is Maysir. A genuine investor who holds an ownership stake in a productive enterprise and benefits from its genuine earnings is engaging in Bay' and Musharakah. A speculator who rides price waves with no ownership intention is closer to a gambler.",
      src: "Sahih Muslim 1513 (prohibition of Gharar sales); Classical definition of Maysir; Contemporary Fiqh on securities trading",
    });
  }

  if ((W.gharar || 0) >= 2) {
    findings.push({
      t: "w",
      label: "Excessive uncertainty (Gharar) - the contract conditions are unclear",
      text: "The Prophet \uFDFA prohibited the sale of Gharar (Sahih Muslim 1513). Gharar means excessive, avoidable uncertainty in a contract - uncertainty about what is being sold, at what price, in what quantity, of what quality, or at what delivery time. Bay' requires that the Mabi' (object of sale) and the Thaman (price) be known (Ma'lum) and agreed at the time of contract. Contracts with vague or undefined terms may not constitute valid Bay'.",
      src: "Sahih Muslim 1513; Al-Nawawi, Sharh Sahih Muslim; Al-Mabsut of al-Sarakhsi; Definition of Gharar in classical Fiqh",
    });
  }

  // ── GHARAR DIAGNOSTIC (from root Gh-R-R) ──

  if ((W.gharar_subject || 0) >= 3) {
    findings.push({
      t: "f",
      label: "Gharar Fahish in the subject matter - you do not know what you are acquiring",
      text: "The root Gh-R-R means to deceive, to expose to danger through ignorance. Gharar Fahish (excessive Gharar) in the subject matter means the buyer or investor does not know the essential nature of what they are paying for. The Prophet (peace be upon him) prohibited Mulamasah and Munabadha (Sahih al-Bukhari 2146). He prohibited bay' al-gharar as a great principle (asl kabir) of commercial law (Imam al-Nawawi). Al-Azhari: 'Gharar is that whose outward appearance pleases the observer, but whose inner reality is unknown or detested.' This arrangement fails the Jahalah (ignorance) test.",
      src: "Sahih Muslim 1513; Sahih al-Bukhari 2146; Al-Nawawi, Sharh Sahih Muslim; Al-Azhari, Tahdhib al-Lughah",
    });
  } else if ((W.gharar_subject || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Partial uncertainty in the subject matter - Gharar caution",
      text: "Some uncertainty exists about what you are acquiring or investing in. Minor Gharar (Gharar Yasir) is tolerated because complete elimination of uncertainty would make commerce impossible. However, if the uncertainty relates to a material element, it may cross into prohibited Gharar. Ensure you understand the essential elements before committing.",
      src: "Classical distinction: Gharar Fahish vs Gharar Yasir; Al-Kasani, Bada'i al-Sana'i",
    });
  }

  if ((W.gharar_price || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Gharar in the price - the total cost is unknown or unpredictable",
      text: "Gharar in the price (al-Thaman) occurs when the total cost cannot be determined at the time of contract. Ibn Rushd al-Jadd identified uncertainty in the price as one of the three domains where Gharar invalidates a sale. Al-Sarakhsi: 'Gharar is that whose outcome is concealed.' Hidden fees or mechanisms that change the total cost without the buyer's awareness constitute Gharar in the price. The Quran: 'Give full measure and weight with justice' (6:152).",
      src: "Ibn Rushd al-Jadd, Al-Muqaddimat; Al-Sarakhsi, Al-Mabsut; Surah Al-An'am 6:152",
    });
  }

  if ((W.gharar_delivery || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Gharar in delivery - the seller may not be able to deliver",
      text: "The Prophet (peace be upon him) said: 'Do not sell what is not with you' (Sunan al-Tirmidhi 1232). When the seller's ability to deliver is genuinely doubtful, the transaction contains Gharar Fahish in delivery. The buyer is paying for something that may never arrive.",
      src: "Sunan al-Tirmidhi 1232; Al-Kasani, Bada'i al-Sana'i; Sahih al-Bukhari 2143",
    });
  }

  if ((W.gharar_existence || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Gharar in existence - the subject matter may not exist",
      text: "The Prophet (peace be upon him) prohibited the sale of habal al-habalah, the offspring of an unborn animal (Sahih al-Bukhari 2143). Selling what does not exist is Gharar Fahish. A transaction whose subject matter has not yet come into existence commits real wealth today for something that may never materialise.",
      src: "Sahih al-Bukhari 2143; Sahih Muslim 1514; All four madhabs on the sale of ma'dum",
    });
  }

  // ── MAYSIR DIAGNOSTIC (from root Y-S-R) ──

  if ((W.maysir_zerosum || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Maysir structure - zero-sum: one party's gain is another's loss",
      text: "The root Y-S-R means ease. Maysir is the acquisition of wealth without productive effort. The first element: zero-sum outcome. One party gains exactly what another loses. No new wealth is created. The Quran declares Maysir to be rijs (abomination) from the work of Shaytan (5:90): 'Shaytan only wants to cause between you enmity and hatred through khamr and Maysir' (5:91).",
      src: "Surah Al-Ma'idah 5:90-91; Al-Tabari; Al-Qurtubi; Ibn Taymiyyah, Majmu' al-Fatawa",
    });
  }

  if ((W.maysir_chance || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Maysir - outcome determined by chance, not productive effort",
      text: "The second element of Maysir: determination by chance. The Prophet (peace be upon him) prohibited bay' al-hasah where the outcome depended on a random event (Sahih Muslim 1513). Imam al-Qurtubi: 'Maysir is derived from Yusr (ease), because it involves the acquisition of wealth with ease and without effort.' When a financial outcome depends entirely on uncontrollable fluctuations or random events, it approaches Maysir.",
      src: "Sahih Muslim 1513; Surah Al-Ma'idah 5:90-91; Al-Qurtubi; Surah Al-Baqarah 2:219",
    });
  }

  if ((W.maysir_no_value || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Maysir - no productive contribution, wealth consumed by falsehood",
      text: "The third element: absence of productive contribution. Ibn Taymiyyah: 'Maysir involves the consumption of wealth by falsehood (akl al-mal bi al-batil), because the gain is not from any productive activity.' The Quran: 'Do not consume each other's wealth unjustly, except through trade by mutual consent' (4:29). A transaction that creates no goods, provides no services, and merely redistributes wealth through chance is Maysir.",
      src: "Surah Al-Nisa 4:29; Ibn Taymiyyah, Majmu' al-Fatawa; Surah Al-Ma'idah 5:90-91",
    });
  }

  const ghararScore = (W.gharar_subject || 0) + (W.gharar_price || 0) + (W.gharar_delivery || 0) + (W.gharar_existence || 0) + (W.gharar || 0);
  const maysirScore = (W.maysir_zerosum || 0) + (W.maysir_chance || 0) + (W.maysir_no_value || 0) + (W.speculative || 0);

  if (ghararScore === 0 && summary.length > 3) {
    findings.push({
      t: "p",
      label: "No excessive Gharar (uncertainty) detected",
      text: "The subject matter, price, delivery, and existence of what is being transacted appear to be known and specified. The arrangement meets the standard of Ma'lum (known) required for valid Bay'.",
      src: "Sahih Muslim 1513; Al-Nawawi on the Gharar principle; Classical Gharar Fahish vs Yasir distinction",
    });
  }

  if (maysirScore === 0 && summary.length > 3) {
    findings.push({
      t: "p",
      label: "No Maysir (gambling) structure detected",
      text: "The transaction is not zero-sum, the outcome is not determined by pure chance, and productive contribution is present. Consistent with genuine Bay' or Musharakah rather than the chance-based wealth transfer the Quran prohibits (5:90-91).",
      src: "Surah Al-Ma'idah 5:90-91; Classical definitions of Maysir; Distinction from genuine Bay'",
    });
  }


  if ((W.guaranteed_return || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Guaranteed return with no genuine risk - this is Qard with interest",
      text: "A return that is guaranteed regardless of outcomes is not the return from Bay', Musharakah, or Mudarabah - it is the return from a loan. Al-kharaj bil-daman: the right to profit comes with the liability of loss. Removing the loss eliminates the legitimacy of the profit. An investor guaranteed their capital and a minimum return is not an investor - they are a lender. And a lender with a fixed return on money provided is engaged in Riba.",
      src: "Al-kharaj bil-daman (Sunan Abi Dawud 3508); All four madhabs on the definition of Musharakah; AAOIFI Shariah Standard No. 12 on Musharakah",
    });
  }

  if ((W.dayn_trap || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Risk of inescapable Dayn - Maqasid concern",
      text: "The Prophet \uFDFA sought refuge from debt in his Salah (Sahih al-Bukhari 832; Sahih Muslim 589). He said: \"The soul of the believer is suspended because of his debt until it is paid off\" (Sunan al-Tirmidhi 1078). He equated overwhelming debt with Kufr (Sunan al-Nasa'i 5473). He included debt in the three things that bar a person from Paradise (Sunan al-Tirmidhi 1572). A financial arrangement that generates Dayn from which exit is structurally unlikely violates Hifz al-Mal (preservation of wealth) - the fifth of the five Maqasid al-Sharia necessities - and threatens Hifz al-Din (preservation of faith) as its precondition.",
      src: "Sahih al-Bukhari 832; Sahih Muslim 589; Sunan al-Tirmidhi 1078 and 1572; Sunan al-Nasa'i 5473; Al-Shatibi, Al-Muwafaqat on Maqasid",
    });
  }

  if ((W.riba_fadl || 0) >= 2) {
    findings.push({
      t: "f",
      label: "Riba al-Fadl - unequal same-type exchange",
      text: "The Prophet \uFDFA: \"Gold for gold, like for like, equal for equal, hand to hand. Whoever gives more or takes more has engaged in Riba - the giver and taker being equal\" (Sahih Muslim 1587; Sahih al-Bukhari 2070). Riba al-Fadl: any excess in a same-type exchange of Ribawi items. If you exchange gold for gold of different quantities - even with no time difference - the difference is Riba al-Fadl. The same applies to other Ribawi items exchanged for the same type.",
      src: "Sahih Muslim 1587; Sahih al-Bukhari 2070; All four madhabs on Riba al-Fadl; Root analysis of R-B-W",
    });
  }

  if ((W.fiat_question || 0) >= 1) {
    findings.push({
      t: "i",
      label: "Open scholarly question - fiat currency and the Ribawi characteristics",
      text: "This research raises an unresolved question: does fiat currency qualify as a legitimate monetary medium under Islamic first principles? The seven characteristics of the six Ribawi items - Mithiliyyah (genuine fungibility), Qimah Dhatiyyah (intrinsic value), Baqa' (durable value), Rawaj (natural universal acceptance), Sifah Ma'lumah (knowable quality), Kayl/Wazn (measurability), and Hajah 'Ammah (essential utility) - fiat currency fails comprehensively. If it fails the characteristics, two questions arise: (1) Do Ribawi rules even apply to it, or does it require different analysis? (2) Is the entire fiat system itself a form of Ghashsh (adulteration/deception), with interest being a secondary symptom? This question is left open for scholarly contribution.",
      src: "Research paper: Part VII (Fiat Currency Against the Seven Characteristics); Part IX (Maqasid al-Sharia and the Fiat Medium); Part X (Open Questions); Surah Al-Baqarah 2:275",
    });
  }

  if ((W.sarf || 0) >= 1) {
    findings.push({
      t: "i",
      label: "Sarf rules apply - currency exchange requirements",
      text: "Sarf (currency exchange) has specific requirements agreed by all four classical madhabs: (1) Yadan bi-yad - both sides must settle immediately; (2) no deferred element in either currency; (3) the exchange rate must be agreed before the exchange. Imam Malik was the strictest: even T+2 settlement raised concerns for him. The modern Forex market - with leverage, CFDs, and forward contracts - does not meet Sarf conditions. Only true spot exchange (immediate bilateral settlement) satisfies the requirements.",
      src: "Sahih Muslim 1587; Sahih al-Bukhari 2070; Al-Muwatta' of Imam Malik; Al-Mudawwanah; Al-Sarakhsi, Al-Mabsut on Sarf; Islamic Fiqh Academy on currency exchange",
    });
  }

  if ((W.mixed || 0) >= 1) {
    findings.push({
      t: "w",
      label: "Mixed permissible and impermissible elements",
      text: "Where a fund, company, or investment has both permissible and impermissible components, the classical position (followed by contemporary screening methodologies) is: (1) the primary activity must be permissible; (2) income from impermissible sources must be given away in charity (Tasarruf) - not consumed; (3) if the impermissible income exceeds certain thresholds (scholars differ: some say 5%, others 25%, others 33%), the investment should be avoided. The principle: what is predominantly Halal, with Haram as a minor component that is purified through charity, is more permissible than what is predominantly Haram.",
      src: "Classical Fiqh on mixed transactions; Contemporary screening standards (AAOIFI, MSCI, Dow Jones Islamic Index); Tasarruf principle",
    });
  }

  if ((W.check_mortgage || 0) >= 1) {
    findings.push({
      t: "i",
      label: "Islamic mortgage financing - apply the mortgage diagnostic",
      text: "You indicated the property is financed through an Islamic mortgage product. To evaluate that financing specifically, run a separate assessment under Finance & Lending \u2192 Home/Property Finance. The Halal status of the property investment itself does not determine the Halal status of the financing used to acquire it. Both must be independently sound.",
      src: "Principle of independent contract evaluation; Classical Fiqh on Ijarah, Bay', and Musharakah Mutanaqisah",
    });
  }

  // ── POSITIVE FINDINGS ──
  if (!W.riba_core && !W.fixed_return && !W.no_own && !W.no_risk && summary.length > 2) {
    findings.push({
      t: "p",
      label: "No core Riba signature detected",
      text: "The most fundamental test has been passed: no stipulated excess above the principal has been identified in this arrangement. A genuine Qard Hasan (goodly loan) returns only the Mithl. A genuine Bay' earns profit from real ownership, real risk, and real Iwad. A genuine Musharakah shares profit and loss proportionally. Where none of these are violated, the arrangement is consistent with what the primary sources permit.",
      src: "Definition of Qard Hasan from Quran 2:245; Definition of Bay' from Surah Al-Baqarah 2:275; Al-kharaj bil-daman (Sunan Abi Dawud 3508)",
    });
  }

  if (!W.no_risk && !W.guaranteed_return && summary.length > 3) {
    findings.push({
      t: "p",
      label: "Genuine risk appears present",
      text: "Al-kharaj bil-daman: the right to profit comes with the liability of loss. Where genuine, unhedged risk of principal loss exists - where the party providing capital or goods can actually lose - the classical condition for earning a return from Bay' or Musharakah is satisfied. This is the most economically important distinction between genuine trade/partnership and disguised lending.",
      src: "Sunan Abi Dawud 3508; Imam al-Shafi'i, Al-Umm; Al-Hidayah of al-Marghinani",
    });
  }

  if (!W.dayn_grows && summary.length > 2) {
    findings.push({
      t: "p",
      label: "The Dayn (outstanding obligation) appears fixed",
      text: "The most common pathway through which Riba enters transactions - the growth of the outstanding obligation through time - does not appear to be present here. A Dayn that is fixed at the point of contract and does not increase regardless of timing removes Riba al-Nasi'ah from the picture.",
      src: "Surah Al-Baqarah 2:280; Imam Malik, Al-Muwatta'; Definition of Riba al-Nasi'ah from all four madhabs",
    });
  }

  // ── VERDICT CLASSIFICATION - DUAL TRACK ──
  const failN = findings.filter((f) => f.t === "f").length;
  const warnN = findings.filter((f) => f.t === "w").length;

  const isPersonalFiat = medium === "fiat" && PERSONAL_SUBS.includes(subtype);

  // Effective track: personal fiat -> classical rules
  const effectiveTrack = medium === "classical" || isPersonalFiat ? "classical" : "fiat";

  let verdict: Verdict;

  if (effectiveTrack === "classical") {
    // == CLASSICAL TRACK - Full Ribawi rules apply ==
    if (failN >= 2 || score >= 8) {
      verdict = {
        cls: "fail",
        stamp: "Riba identified - classical medium",
        title: "This arrangement contains Riba",
        body: "The medium involved is a classical Ribawi medium - one that meets the seven characteristics established by the Hadith of Riba al-Fadl (Sahih Muslim 1587). On a classical Ribawi medium, the full Ribawi conditions apply without qualification: Mithlan bi-mithl (like for like), Sawa'an bi-sawa' (equal for equal), Yadan bi-yad (hand to hand). Any stipulated excess above the principal, any growth in the outstanding Dayn, any exchange of the same type without exact equality - is Riba. \"Allah has permitted Bay' and forbidden Riba\" (Surah Al-Baqarah 2:275). The Quran is absolute. The specific failures in this arrangement are detailed below.",
        track: "classical",
      };
    } else if (failN === 1 || warnN >= 3 || score >= 5) {
      verdict = {
        cls: "warn",
        stamp: "Significant concerns - classical medium",
        title: "Serious concerns on a Ribawi medium",
        body: "The medium is a classical Ribawi medium. The Ribawi conditions apply in full. The concerns identified below relate directly to whether this arrangement satisfies the requirements of genuine Bay', Qard Hasan, or Musharakah as the primary sources define them. On gold, silver, or any genuine Ribawi item, there is no alternative analytical framework. The Quranic prohibition is absolute. The concerns must be resolved, not reinterpreted.",
        track: "classical",
      };
    } else if (warnN >= 1 || score >= 2) {
      verdict = {
        cls: "rev",
        stamp: "Review recommended - classical medium",
        title: "Some cautions on a Ribawi medium",
        body: "The medium is a classical Ribawi medium, so any residual concern carries full weight. The primary-source rules admit no relaxation for classical monetary media. The cautions below should be examined carefully.",
        track: "classical",
      };
    } else {
      verdict = {
        cls: "pass",
        stamp: "Consistent with first principles - classical medium",
        title: "This arrangement appears sound on a Ribawi medium",
        body: "The arrangement passes the primary-source tests as applied to a classical Ribawi medium. Genuine ownership, genuine risk, genuine Iwad, fixed Dayn, no stipulated excess - the conditions identified by all four madhabs are satisfied. This is a diagnostic result, not a Fatwa.",
        track: "classical",
      };
    }
  } else {
    // == FIAT TRACK - Institutional fiat: research framework distinction applies ==
    // (Personal sub-types have already been routed to classical above)

    if (failN >= 2 || score >= 8) {
      verdict = {
        cls: "fail",
        stamp: "Riba or structural exploitation - fiat medium",
        title: "This arrangement contains Riba or operates on the fiat exploitation framework",
        body: "Even on the fiat track - even accepting that fiat currency may not qualify as a Ribawi medium and that what is called \"interest\" on fiat may not be Riba in the classical sense - this arrangement fails the structural tests. The excess above the principal is stipulated. The Dayn grows. Genuine risk is absent. These structural features identify exploitation, regardless of the medium. The research framework distinguishes Riba (the Quranic prohibition on genuine Ribawi media) from interest-on-fiat (a structural compensation argument for wealth preservation). But neither framework permits the patterns identified here. The two-path analysis is explained in the panel below.",
        track: "fiat",
      };
    } else if (failN === 1 || warnN >= 3 || score >= 5) {
      verdict = {
        cls: "warn",
        stamp: "Concerns - fiat medium analysis",
        title: "Significant concerns - fiat path analytical framework",
        body: "On the fiat track, the tool applies the research framework that distinguishes Riba from interest-on-fiat. The concerns identified are not automatically Riba in the classical sense - because fiat may not be a genuine Ribawi medium. However, the structural concerns remain: absent genuine ownership, absent genuine risk, a growing Dayn, and a predetermined return all point toward an arrangement that exploits rather than serves the party who needs the finance. The two-path analysis panel below explains the distinction in full.",
        track: "fiat",
      };
    } else if (warnN >= 1 || score >= 2) {
      verdict = {
        cls: "rev",
        stamp: "Cautions - fiat medium analysis",
        title: "Some cautions under the fiat framework",
        body: "This arrangement raises cautions that remain relevant under the fiat analytical framework. The research position is that fiat currency fails the Ribawi characteristics - and this has implications for how \"interest\" on fiat is classified. But structural concerns about exploitation, absence of genuine risk, and inescapable Dayn apply regardless of the medium. The two-path analysis below explains the framework.",
        track: "fiat",
      };
    } else {
      verdict = {
        cls: "pass",
        stamp: "No exploitation pattern - fiat medium",
        title: "No structural exploitation pattern identified under fiat framework",
        body: "Under the fiat analytical framework, this arrangement does not display the structural patterns associated with exploitation: no stipulated excess, genuine risk present, Dayn is fixed, no Hila detected. The broader question of whether fiat-denominated transactions involve Riba in the Quranic sense remains an open scholarly question - addressed in the panel below. This result means the arrangement is structurally sound, not that the fiat system itself is legitimate.",
        track: "fiat",
      };
    }
  }

  // Ribawi characteristics grid for currency/commodity questions
  let ribawiGrid: RibawiGrid | null = null;
  if (RIBAWI_SUBS.includes(subtype)) {
    ribawiGrid = {
      items: RIBAWI_ITEMS,
      activeCol:
        subtype === "bitcoin"
          ? "crypto_b"
          : ["altcoin", "stablecoin", "crypto_exchange", "crypto_invest"].includes(subtype)
            ? "crypto_a"
            : ["commodity", "salam", "murabaha_trade", "rwa_token"].includes(subtype)
              ? "commodity"
              : "fiat",
    };
  }

  return { verdict, findings, summary, ribawiGrid, medium, entryPath, isPersonalFiat };
}
