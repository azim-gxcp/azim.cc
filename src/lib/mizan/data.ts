import type { SubType, Question } from "./types";

export const SUBS: Record<string, SubType[]> = {
  finance: [
    { id: "mortgage", name: "Home / property finance", desc: "Islamic mortgage, Murabahah home, Musharakah Mutanaqisah (diminishing partnership)" },
    { id: "personal_finance", name: "Personal cash finance", desc: "Personal finance, Tawarruq cash, consumer loan" },
    { id: "business_finance", name: "Business finance", desc: "Business loan, Murabahah for equipment, trade finance" },
    { id: "ijarah", name: "Lease / Ijarah", desc: "Hire purchase, lease-to-own, equipment lease" },
    { id: "other_finance", name: "Other IFI product", desc: "Unsure of the exact product name" },
  ],
  invest: [
    { id: "stocks", name: "Stock market / equities", desc: "Buying shares in companies - halal screening funds, individual stocks" },
    { id: "sukuk", name: "Sukuk / Islamic bonds", desc: "Investment certificates, sovereign Sukuk, corporate Sukuk" },
    { id: "fund", name: "Investment fund", desc: "Islamic mutual fund, ETF, REIT, unit trust" },
    { id: "partnership", name: "Business partnership", desc: "Musharakah, Mudarabah - putting money into a venture" },
    { id: "crypto_invest", name: "Crypto as investment", desc: "Holding Bitcoin, Ethereum, or other coins as an asset" },
    { id: "property_invest", name: "Property investment", desc: "Buy-to-let, REITs, property development" },
  ],
  trade: [
    { id: "goods_trade", name: "Buying / selling goods", desc: "Physical products, materials, food, equipment" },
    { id: "credit_sale", name: "Credit sale / deferred payment", desc: "Selling goods now, receiving payment later" },
    { id: "murabaha_trade", name: "Cost-plus trade (Murabahah)", desc: "You sell at your cost price plus an agreed mark-up" },
    { id: "salam", name: "Advance purchase (Salam)", desc: "Paying now for goods to be delivered later" },
    { id: "commodity", name: "Commodity trading", desc: "Gold, silver, oil, agricultural commodities" },
  ],
  personal: [
    { id: "qard", name: "Lending money to someone", desc: "Family, friend, or colleague who needs help" },
    { id: "receiving", name: "Receiving a loan", desc: "Someone is lending money to you" },
    { id: "joint_venture", name: "Joint business with someone", desc: "You and another person pool money or effort" },
    { id: "gift", name: "Gift / donation / charity", desc: "You are giving and not expecting anything back" },
  ],
  currency: [
    { id: "forex", name: "Currency trading (Forex)", desc: "Trading currency pairs, spot or forward, CFDs" },
    { id: "money_changer", name: "Money changing", desc: "Converting one currency to another for travel or use" },
    { id: "remittance", name: "Remittance / transfer", desc: "Sending money internationally" },
    { id: "stablecoin", name: "Stablecoin / digital currency", desc: "USDT, USDC, central bank digital currencies (CBDCs)" },
  ],
  crypto: [
    { id: "bitcoin", name: "Bitcoin (BTC)", desc: "The original proof-of-work cryptocurrency" },
    { id: "altcoin", name: "Other cryptocurrencies", desc: "Ethereum, Solana, altcoins, meme coins" },
    { id: "defi", name: "DeFi / yield farming", desc: "Lending protocols, liquidity pools, staking rewards" },
    { id: "nft", name: "NFTs / digital tokens", desc: "Non-fungible tokens, digital art, gaming tokens" },
    { id: "crypto_exchange", name: "Crypto exchange / swap", desc: "Converting one crypto to another" },
    { id: "rwa_token", name: "Tokenized real-world assets (RWA)", desc: "Tokenized gold, real estate, commodities, equity, or other physical assets on blockchain" },
  ],
};

export const QS: Record<string, Question[]> = {

  // ──────────────────────────────────────────
  // HOME / PROPERTY FINANCE (MORTGAGE)
  // ──────────────────────────────────────────
  mortgage: [
    {
      phase: 0,
      text: "What is the structure of this home finance arrangement?",
      plain: "Choose the one that best describes what your bank or financier actually offered you.",
      principle: "The label matters less than the structure. A Murabahah home finance and a Musharakah Mutanaqisah have different structures and different questions.",
      opts: [
        { label: "The bank buys the house and sells it to me at a higher total price, paid monthly", sub: "This is called Murabahah or Bai' Bithaman Ajil (BBA)", val: "murabaha", w: {} },
        { label: "The bank and I co-own the house; I buy the bank's share gradually over time", sub: "This is called Musharakah Mutanaqisah - diminishing partnership", val: "mm", w: {} },
        { label: "The bank buys the house and leases it to me; at the end I take ownership", sub: "This is Ijarah Muntahia Bittamlik - lease ending in ownership", val: "ijarah_mm", w: {} },
        { label: "I am not sure what it is called - I just pay monthly and will eventually own it", sub: "", val: "unsure", w: { unclear: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Did the bank or financier genuinely own the property - with full ownership risk - before selling or leasing it to you?",
      plain: "Did the bank's name appear on the title deed? Was the bank truly the owner for a real period, where if the property burned down it would have been the bank's loss - not yours and not the seller's?",
      principle: "Bay' (trade) requires prior ownership - the seller must own the Mabi' (object of sale) before selling it. The Prophet \u2E3B said: \"Do not sell what you do not have\" (Sunan al-Tirmidhi 1232). If the bank arranged for the property to transfer from seller to you, with the bank's name on the paperwork only briefly and with no real risk - the ownership was nominal, not genuine.",
      opts: [
        { label: "Yes, the bank's name was on the title, they bore real ownership risk", sub: "If the property fell in value before I bought it from the bank, the bank would have lost", val: "yes", w: {} },
        { label: "Technically yes, but only for a brief moment - with no real risk", sub: "The paperwork showed ownership but the bank had no actual exposure", val: "nominal", w: { nominal_own: 2 } },
        { label: "No, it went straight from the developer / seller to me", sub: "The bank never really held it", val: "no", w: { no_own: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Was the total amount you would pay - the bank's profit included - fixed and calculated before you signed?",
      plain: "Could you work out on day one exactly how much the bank would earn from this arrangement, even before you made a single payment?",
      principle: "If the bank's return is predetermined, fixed, and calculable regardless of what happens in the property market or the economy - it is not a return from genuine trade. It is a return from a loan with a fixed rate of interest, dressed in Bay' language. Allah's permission for Bay' does not extend to arrangements whose economic substance is Qard with a stipulated excess.",
      opts: [
        { label: "Yes, I could calculate the exact total from day one", sub: "The profit was a fixed amount agreed upfront", val: "yes", w: { fixed_return: 2 } },
        { label: "No, my payments depend on market conditions or the partnership's performance", sub: "The bank's return is genuinely uncertain", val: "no", w: {} },
      ],
    },
    {
      phase: 1,
      text: "If you are late on a payment - does the amount you owe increase?",
      plain: "If you miss a payment or are delayed, does interest or a penalty charge get added to your outstanding balance? Does the total you owe grow?",
      principle: "Riba lives in the Dayn - the outstanding obligation. A Dayn that grows through delay is Riba al-Nasi'ah: the Riba of time extension. Allah commands in Quran 2:280: if the debtor is in difficulty, grant time freely. No classical scholar permits charging for time. Any growth in the outstanding balance due to delay is Riba, regardless of what it is called.",
      opts: [
        { label: "Yes, my balance or total payment increases if I am late", sub: "Penalty charges or additional amounts are added", val: "yes", w: { dayn_grows: 3 } },
        { label: "No, the total I owe stays the same regardless of when I pay", sub: "", val: "no", w: {} },
        { label: "There is a small fixed fee but the principal does not compound", sub: "", val: "fee", w: { dayn_grows: 1 } },
      ],
    },
    {
      phase: 2,
      text: "The strip test: if you remove the property from this arrangement - what remains?",
      plain: "Imagine the house was not there. The bank provides money. You pay back more money over 25 years. Is that all this is?",
      principle: "Ibn Qayyim al-Jawziyyah, I'lam al-Muwaqqi'in: the Sharia looks to the Maqasid (purposes) of transactions, not their contractual shells. If the property is only present to create the legal form of a sale - while the economic substance is a cash loan repaid with interest - the property is a Hilah (legal stratagem). Ibn Taymiyyah: whoever uses a Hilah to consume Riba under the cover of a sale commits a greater sin than one who takes Riba openly.",
      opts: [
        { label: "No, the property is genuinely the subject of this transaction", sub: "Without it, the deal makes no sense", val: "no", w: {} },
        { label: "Yes, strip the property and it is just a loan with a fixed return", sub: "The property is a legal device", val: "yes", w: { hila: 3 } },
      ],
    },
    {
      phase: 2,
      text: "Can the bank lose money on this - genuinely, without recourse to you or guarantees?",
      plain: "If your property collapsed to zero value and you disappeared - could the bank actually lose its money? Or is it fully protected by the property, guarantees, insurance, and your personal liability?",
      principle: "Al-kharaj bil-daman: the right to profit comes with the liability of loss (Sunan Abi Dawud 3508). A financier who cannot genuinely lose does not bear the Daman (liability) and therefore does not hold the right to Kharaj (yield). A bank whose return is mathematically certain regardless of outcomes is not a partner in Bay' - it is a secured lender.",
      opts: [
        { label: "Yes, in genuine scenarios the bank could lose its principal", sub: "Real, unhedged risk exists", val: "yes", w: {} },
        { label: "No, collateral, guarantees, and personal liability protect the bank fully", sub: "The bank cannot realistically lose", val: "no", w: { no_risk: 3 } },
        { label: "Some risk exists in theory, but it is minimal in practice", sub: "", val: "nominal", w: { no_risk: 1 } },
      ],
    },
    {
      phase: 3,
      text: "Does this arrangement create a debt burden that you will carry for decades without a realistic path to being free?",
      plain: "Is this a 25-30 year obligation that, if anything goes wrong - job loss, illness, market crash - could make you destitute? Is the burden designed so the bank always recovers, whatever happens to you?",
      principle: "The Prophet \u2E3B sought refuge from debt every single morning and evening (Sahih al-Bukhari 6369). He said: \"The soul of the believer is suspended because of his debt until it is paid off\" (Sunan al-Tirmidhi 1078). He equated crushing debt with Kufr (Sunan al-Nasa'i 5473). Hifz al-Mal (preservation of wealth) is the fifth of the Maqasid al-Sharia necessities. A structure that generates a lifelong, inescapable Dayn violates this necessity.",
      opts: [
        { label: "The obligation is long but manageable and genuinely exits", sub: "I understand the terms and have a realistic path to ownership", val: "ok", w: {} },
        { label: "The structure could trap me in debt regardless of what I do", sub: "The risk is entirely mine; the return is entirely the bank's", val: "trap", w: { dayn_trap: 2 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // PERSONAL CASH FINANCE / TAWARRUQ
  // ──────────────────────────────────────────
  personal_finance: [
    {
      phase: 0,
      text: "What do you actually need - and what does the financier actually give you?",
      plain: "At the end of this process, what lands in your bank account or your hands?",
      principle: "The structure of Tawarruq: a commodity is purchased by the bank, sold to you on credit, and you immediately sell it for cash. You need cash; cash is what you get. The commodity passes through as a legal device. This is the arrangement Imam Ahmad ibn Hanbal classified as Hilah.",
      opts: [
        { label: "Cash - money deposited into my account", sub: "The commodity was just a step to get me the money", val: "cash", w: { cash: 3, hila: 2 } },
        { label: "A physical asset or item I actually want and will use", sub: "", val: "asset", w: {} },
        { label: "A service or access to something useful", sub: "", val: "service", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Was a commodity (metals, palm oil, etc.) involved in this process?",
      plain: "Did your financier mention buying and selling a commodity - something like copper, aluminium, palm oil, or similar - on your behalf, to generate the cash?",
      principle: "Organised Tawarruq - where a commodity is traded on exchanges purely to generate cash - was condemned by the Islamic Fiqh Academy (Resolution 179, 2009) as a form of Riba. The Fiqh Academy stated it constitutes Riba by another name. Imam Ahmad ibn Hanbal's position: if the purpose is to get cash and the commodity is just a mechanism, this is Bay' al-'Inah or Tawarruq - both of which he classified as Hilah.",
      opts: [
        { label: "Yes, a commodity was traded on my behalf to generate cash", sub: "Classic Tawarruq structure", val: "tawarruq", w: { hila: 3, tawarruq: 1 } },
        { label: "No, I received money directly with no commodity involved", sub: "Straight loan structure", val: "no", w: { direct_loan: 3 } },
        { label: "Not sure", sub: "", val: "unclear", w: { unclear: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Is the total you repay fixed - including the bank's \"profit\" - agreed from day one?",
      plain: "Before you signed, could you calculate exactly what the bank would earn from this? Is the total repayment a fixed number regardless of anything that happens in the economy?",
      principle: "A fixed, predetermined return on money provided is the definition of Riba al-Nasi'ah - the Riba of delay. The root R-B-W: the excess above the principal (Ra's al-Mal) that rises above the original sum. The name given to it - \"profit\", \"fee\", \"administrative charge\" - does not change what it is.",
      opts: [
        { label: "Yes, fixed total agreed upfront regardless of anything", sub: "", val: "yes", w: { fixed_return: 3 } },
        { label: "No, it varies with actual performance or outcomes", sub: "", val: "no", w: {} },
      ],
    },
    {
      phase: 1,
      text: "If you cannot pay on time - does the amount you owe increase?",
      plain: "Late payment: does your balance grow? Do they charge interest on the overdue amount?",
      principle: "Riba al-Nasi'ah: any increase in the Dayn (outstanding obligation) arising from delay is Riba. Quran 2:280 commands time to be given freely to one in difficulty. No increase in the balance is permissible, regardless of the justification given.",
      opts: [
        { label: "Yes, late payment increases my total balance", sub: "", val: "yes", w: { dayn_grows: 3 } },
        { label: "No, the balance stays the same whatever happens", sub: "", val: "no", w: {} },
      ],
    },
    {
      phase: 2,
      text: "The strip test: if the commodity (or any asset) in this arrangement is removed - what remains?",
      plain: "Ignore all the steps. Money in \u2192 more money out. Is that the substance of this deal?",
      principle: "Ibn Qayyim: if removing the asset reveals a plain loan with a fixed return, the asset is a Hilah. The Islamic Fiqh Academy (2009 Resolution on Tawarruq): \"The Fiqh Academy declares that organised Tawarruq, as practised by financial institutions, is not permissible.\"",
      opts: [
        { label: "Yes, strip everything and it is money in, more money out", sub: "", val: "yes", w: { hila: 3 } },
        { label: "No, the asset is genuinely necessary", sub: "", val: "no", w: {} },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // IJARAH (LEASE)
  // ──────────────────────────────────────────
  ijarah: [
    {
      phase: 0,
      text: "Does the bank / financier genuinely own the asset being leased to you?",
      plain: "Is the asset on the bank's books? Does the bank bear the risk of the asset - if it is destroyed, is it the bank's loss?",
      principle: "Ijarah (lease) is the sale of Manfa'ah - the usufruct / benefit of an asset - for a price. The lessor must own the asset, because you cannot lease what you do not own. If the bank owns only on paper while you bear all risk from the start, the Ijarah structure collapses.",
      opts: [
        { label: "Yes, the bank genuinely owns it and bears ownership risk", sub: "", val: "yes", w: {} },
        { label: "Technically yes, but the risk transferred to me immediately", sub: "", val: "nominal", w: { nominal_own: 2 } },
        { label: "No, the bank never really owned it", sub: "", val: "no", w: { no_own: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Are the rental payments fixed for the entire lease term?",
      plain: "Is the monthly rental the same from year 1 to year 20? Or does it change based on something outside your control - like a floating benchmark rate?",
      principle: "If the rental is pegged to a conventional interest rate benchmark (such as LIBOR, SOFR, or a central bank rate), this creates a structural link between the Ijarah and the Riba-based financial system. The rental should ideally be tied to genuine market rental value of the asset - not to the cost of money.",
      opts: [
        { label: "Fixed rent agreed upfront for the whole period", sub: "", val: "fixed", w: {} },
        { label: "Variable - linked to a benchmark interest rate", sub: "LIBOR, SOFR, or similar", val: "variable", w: { rate_linked: 2 } },
        { label: "Variable - linked to genuine market rental values", sub: "", val: "market", w: {} },
      ],
    },
    {
      phase: 1,
      text: "If you miss a rental payment - does the outstanding amount increase?",
      plain: "Late lease payment: does your balance grow or do penalty interest charges accumulate?",
      principle: "The same Dayn rule applies. Riba al-Nasi'ah attaches to any Dayn - including a Dayn arising from an Ijarah. If the overdue rental generates additional charges that compound, the outstanding Dayn is growing through time - which is Riba.",
      opts: [
        { label: "Yes, overdue amounts attract additional charges or penalties that grow", sub: "", val: "yes", w: { dayn_grows: 2 } },
        { label: "No, the total stays the same", sub: "", val: "no", w: {} },
      ],
    },
    {
      phase: 1,
      text: "At the end of the lease - how do you take ownership of the asset?",
      plain: "Is ownership transferred automatically at the end? Or is there a separate gift (Hibah) or purchase (Bay') at fair market value?",
      principle: "An Ijarah contract cannot include a binding promise of sale within the same contract - this would make it an Ijarah wa Bay' combined, which classical scholars rejected as mixing two contracts. The ownership transfer should be via a separate Hibah (gift) or a separate Bay' at fair market value, genuinely independent of the lease.",
      opts: [
        { label: "Separate gift or purchase at the end - genuinely independent", sub: "", val: "separate", w: {} },
        { label: "Automatically transfers at the end of the lease term", sub: "It is essentially pre-determined", val: "auto", w: { bundled: 1 } },
        { label: "A nominal purchase price (e.g. \u00A31) agreed from the start", sub: "", val: "nominal_purchase", w: { bundled: 2 } },
      ],
    },
    {
      phase: 2,
      text: "Who bears the cost of major repairs and the risk of the asset during the lease?",
      plain: "If the asset needs major structural repair - a new roof, an engine replacement - is that cost on you or the bank? If the asset is destroyed, who bears the loss?",
      principle: "In a genuine Ijarah, the lessor (owner) bears the costs of maintaining the principal value of the asset. The lessee pays only for use. If all costs, risks, and liabilities of ownership are transferred to you - while the bank collects a fixed monthly return - the Ijarah is substantively a loan secured against the asset.",
      opts: [
        { label: "Major repairs and ownership risk stay with the bank (lessor)", sub: "I only pay for normal use and maintenance", val: "bank", w: {} },
        { label: "All costs and risks are transferred to me from day one", sub: "", val: "me", w: { no_risk: 2 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // STOCKS
  // ──────────────────────────────────────────
  stocks: [
    {
      phase: 0,
      text: "What is the primary activity of the company whose shares you are buying?",
      plain: "Companies earn money from what they do. What does this company mainly do?",
      principle: "Owning a share means owning a proportional part of a business. The Islamic position on share ownership is grounded in the nature of the underlying business activity. Shariah screens exist - but this tool asks the primary source question, not the compliance-filter question.",
      opts: [
        { label: "A productive business - manufacturing, technology, healthcare, retail", sub: "Something that makes or provides genuinely useful things", val: "productive", w: {} },
        { label: "Conventional banking, insurance, or pure financial services", sub: "The primary business is lending money at interest", val: "financial", w: { riba_core: 3 } },
        { label: "Alcohol, gambling, adult content, weapons", sub: "", val: "haram_sector", w: { haram: 3 } },
        { label: "A mix - most activity is halal but some income is from Riba sources", sub: "", val: "mixed", w: { mixed: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Does the company carry significant interest-bearing debt?",
      plain: "Has the company borrowed large amounts of money that it pays interest on? Check the company's debt level.",
      principle: "A company that is heavily indebted on interest-bearing terms is itself engaged in Riba from the Dayn (debt) side. Classical scholars - including contemporary scholars who permit share ownership with conditions - typically require that a company's total interest-bearing debt not exceed a certain threshold of its total assets or market value. The underlying Riba exposure of the company affects the Halal status of owning it.",
      opts: [
        { label: "No or minimal interest-bearing debt", sub: "The company is largely or entirely debt-free", val: "none", w: {} },
        { label: "Some debt, but manageable and not the core of its business", sub: "", val: "some", w: { debt_concern: 1 } },
        { label: "Heavy interest-bearing debt - this is how it operates", sub: "", val: "heavy", w: { debt_concern: 3 } },
      ],
    },
    {
      phase: 1,
      text: "Are you investing for genuine ownership - or purely for price speculation?",
      plain: "Are you buying this share because you want to own a piece of a real business and share in its genuine earnings? Or are you buying it purely to sell it quickly at a higher price?",
      principle: "Bay' (trade) - including the purchase of shares - is permitted when it involves genuine exchange of real value. Pure speculative trading, where no one intends to hold a real ownership stake, approaches Maysir (gambling) in its structure: a bet on price movement rather than participation in a productive enterprise.",
      opts: [
        { label: "Genuine ownership - I am investing in the business and its earnings", sub: "", val: "own", w: {} },
        { label: "Speculation - I plan to sell quickly based on price movement", sub: "", val: "spec", w: { speculative: 2 } },
        { label: "Both, I will hold for some time but price is a key factor", sub: "", val: "mixed", w: { speculative: 1 } },
      ],
    },
    {
      phase: 1,
      text: "Do you receive dividends - and how are they generated?",
      plain: "If the company pays dividends, where does that money come from? Is it from real business profits - or partly from interest income?",
      principle: "Dividend income from a productive business is a legitimate return on ownership - this is the economic function of Bay' in the equity context. But if a portion of dividends derives from interest income (Riba income), the classical position is that this portion must be given away in charity (Tasarruf), not consumed.",
      opts: [
        { label: "Yes, from genuine business operations, no Riba income", sub: "", val: "clean", w: {} },
        { label: "Yes, but some income comes from interest or Riba-based activity", sub: "", val: "mixed", w: { mixed: 1 } },
        { label: "No dividends - pure capital gain focus", sub: "", val: "none", w: { speculative: 1 } },
      ],
    },
    {
      phase: 2,
      text: "Are you using leverage (borrowed money) to buy these shares?",
      plain: "Did you borrow money to fund this investment - margin trading, CFDs, or any borrowing to amplify your position?",
      principle: "Buying shares with borrowed money multiplies exposure to Riba: (1) the borrowing itself may involve Riba; (2) the magnified position creates Gharar (excessive uncertainty) that approaches Maysir (gambling); (3) losses can exceed the original investment, creating inescapable Dayn. The Prophet \u2E3B sought refuge from overwhelming debt daily (Sahih al-Bukhari 6369).",
      opts: [
        { label: "No, I only invest what I genuinely own", sub: "", val: "no", w: {} },
        { label: "Yes, I use margin or CFDs or other borrowed money", sub: "", val: "yes", w: { leverage: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // SUKUK
  // ──────────────────────────────────────────
  sukuk: [
    {
      phase: 0,
      text: "Does this Sukuk pay a fixed, predetermined periodic return regardless of the performance of the underlying assets?",
      plain: "Before you invest, can you calculate exactly what you will receive each period - like a bond coupon - regardless of how the underlying project or assets perform?",
      principle: "Sukuk were designed as genuine asset-backed instruments where the return reflects the actual performance of the underlying assets. A Sukuk that pays a fixed return regardless of performance is economically identical to a bond - money in, fixed income out. The Islamic Fiqh Academy and many classical scholars have ruled that such structures are not genuine Sukuk but disguised bonds.",
      opts: [
        { label: "Yes, the return is fixed and predetermined", sub: "Like a conventional bond with an Islamic label", val: "fixed", w: { fixed_return: 3, hila: 2 } },
        { label: "No, the return depends on the actual performance of assets", sub: "Genuinely variable based on outcomes", val: "variable", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Do the Sukuk holders genuinely own the underlying assets?",
      plain: "As a Sukuk holder, do you have real ownership rights over the underlying property, infrastructure, or business? If the issuer collapses, can you claim the assets?",
      principle: "The AAOIFI Shariah Standards require that Sukuk represent genuine ownership of the underlying assets - not merely a contractual right to receive payments. A Sukuk where the asset is a legal construct and the investor has no genuine ownership claim is economically a bond - a Dayn instrument - not an ownership certificate.",
      opts: [
        { label: "Yes, genuine, legally enforceable ownership of real assets", sub: "", val: "yes", w: {} },
        { label: "No, I have a contractual payment right but no real asset ownership", sub: "", val: "no", w: { no_own: 3 } },
        { label: "Unclear from the documentation", sub: "", val: "unclear", w: { unclear: 2 } },
      ],
    },
    {
      phase: 1,
      text: "Is there a purchase undertaking - a guarantee that the issuer will buy the assets back at face value at maturity?",
      plain: "Does the issuer promise to repay you the full face value of your Sukuk at the end - regardless of what the assets are worth at that time?",
      principle: "A purchase undertaking at face value (not market value) is the mechanism that transforms a Sukuk from an ownership instrument into a debt instrument. It guarantees the investor's principal, which eliminates genuine risk - and without genuine risk, there is no genuine Bay' or Musharakah. The AAOIFI Shariah Board has stated that purchase undertakings at face value compromise the genuineness of Sukuk.",
      opts: [
        { label: "Yes, the issuer guarantees to buy back at face value at maturity", sub: "My principal is guaranteed", val: "yes", w: { guaranteed_return: 3 } },
        { label: "No, buyback (if any) is at fair market value", sub: "", val: "market", w: {} },
        { label: "No buyback - I accept the full market risk", sub: "", val: "none", w: {} },
      ],
    },
    {
      phase: 2,
      text: "The strip test: if you remove the Sukuk's underlying assets - what remains?",
      plain: "Imagine the assets were not there. You put in money; you receive fixed periodic payments; you get your money back at the end. Is that the economic reality?",
      principle: "If removing the assets reveals a debt instrument - money in, fixed income, principal returned - then the assets are a Hilah: a legal device to give a bond an Islamic appearance. Sheikh Taqi Usmani (former Chairman, AAOIFI Shariah Board) has stated that the majority of Sukuk at the time of his 2008 review did not comply with Shariah in substance.",
      opts: [
        { label: "No, the returns depend on and derive from the assets genuinely", sub: "", val: "no", w: {} },
        { label: "Yes, strip the assets and it is a plain bond", sub: "", val: "yes", w: { hila: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // INVESTMENT FUND
  // ──────────────────────────────────────────
  fund: [
    {
      phase: 0,
      text: "What does this fund primarily invest in?",
      plain: "Where does the fund put the money you give it?",
      principle: "The nature of the underlying investments determines the primary Halal/Haram status of the fund.",
      opts: [
        { label: "Equities (shares) in productive companies - screened for Halal sectors", sub: "", val: "equities", w: {} },
        { label: "Property and real estate", sub: "", val: "property", w: {} },
        { label: "Sukuk or Islamic bonds", sub: "", val: "sukuk_fund", w: {} },
        { label: "Conventional bonds, money market instruments", sub: "", val: "conventional", w: { riba_core: 3 } },
        { label: "A mix - some Halal, some conventional", sub: "", val: "mixed", w: { mixed: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Does the fund guarantee a minimum return or guarantee your capital?",
      plain: "Is any part of your investment - return or principal - protected regardless of how investments perform?",
      principle: "Capital guarantee and guaranteed minimum returns eliminate genuine risk - which eliminates genuine Bay' and Musharakah. A guaranteed return on investment capital is the economic signature of Riba, regardless of the structure used to deliver it.",
      opts: [
        { label: "No guarantees - I take the full market risk", sub: "", val: "no", w: {} },
        { label: "Yes, my capital is guaranteed", sub: "", val: "capital", w: { guaranteed_return: 3 } },
        { label: "Yes, a minimum return is guaranteed", sub: "", val: "return", w: { guaranteed_return: 3 } },
      ],
    },
    {
      phase: 1,
      text: "Does the fund use leverage - borrowing money to amplify returns?",
      plain: "Does the fund borrow money (on interest) to increase its investment exposure?",
      principle: "A fund that borrows on interest to amplify returns exposes you to Riba from two directions: the borrowing itself involves Riba, and the leverage creates amplified Gharar (excessive uncertainty) approaching Maysir (gambling).",
      opts: [
        { label: "No leverage - the fund only uses the money investors provide", sub: "", val: "no", w: {} },
        { label: "Yes, the fund uses conventional borrowing / leverage", sub: "", val: "yes", w: { leverage: 3 } },
        { label: "Uncertain", sub: "", val: "unclear", w: { unclear: 1 } },
      ],
    },
    {
      phase: 2,
      text: "Are the fund managers genuinely accountable for losses - or are they fee-protected regardless?",
      plain: "If the fund performs badly, do the managers share in the loss? Or do they collect their management fee no matter what?",
      principle: "In a genuine Mudarabah (management partnership), the Mudarib (manager) does not receive a fee for management - their compensation is a share of profit. A fixed management fee regardless of performance converts the relationship from Mudarabah into Ijarah (a hired service). This is not prohibited per se - but the investor must understand they are paying for a service, not entering a genuine profit-sharing partnership.",
      opts: [
        { label: "Managers earn only from genuine profit - no fixed fees", sub: "Classic Mudarabah structure", val: "mudarabah", w: {} },
        { label: "Fixed management fees regardless of performance", sub: "", val: "fixed_fee", w: { fee_structure: 1 } },
        { label: "Performance fee on top of fixed fee", sub: "", val: "both", w: {} },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // BUSINESS PARTNERSHIP (MUSHARAKAH / MUDARABAH)
  // ──────────────────────────────────────────
  partnership: [
    {
      phase: 0,
      text: "What are you and your partner contributing to this venture?",
      plain: "What does each of you bring? Money only? Money and work? Work only?",
      principle: "Musharakah: both partners contribute capital, both share in profit and loss. Mudarabah: one partner provides capital (Rabb al-Mal), the other provides effort and management (Mudarib). The rules differ significantly. Neither is a loan - both involve genuine risk on both sides.",
      opts: [
        { label: "We both contribute capital - and both manage the business", sub: "Classic Musharakah", val: "musharakah", w: {} },
        { label: "I provide the money; my partner provides the work and management", sub: "Classic Mudarabah", val: "mudarabah", w: {} },
        { label: "We contribute money in different proportions with different roles", sub: "", val: "mixed", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Is the profit and loss split agreed in advance - proportional to each party's contribution?",
      plain: "Have you agreed upfront how profits are split? And crucially - if there is a loss, do both parties share it?",
      principle: "Both Musharakah and Mudarabah require a pre-agreed profit-sharing ratio. Loss in Musharakah must be borne proportional to capital contributed - you cannot agree that one party bears all losses. In Mudarabah, the Mudarib (worker) bears loss of their time and effort; the Rabb al-Mal (capital provider) bears financial loss. A guarantee against loss converts the arrangement into Qard with interest.",
      opts: [
        { label: "Yes, profit split agreed; loss shared proportionally", sub: "", val: "yes", w: {} },
        { label: "One party is guaranteed their money back regardless of loss", sub: "No genuine loss-sharing", val: "guaranteed", w: { guaranteed_return: 3 } },
        { label: "One party gets a fixed return - like salary - regardless of profits", sub: "", val: "fixed_salary", w: { fixed_return: 2 } },
      ],
    },
    {
      phase: 1,
      text: "If the venture loses money - does either partner recover their capital regardless?",
      plain: "If this business fails completely - who loses? Does anyone have a written or informal guarantee that they get their money back?",
      principle: "A partner guaranteed against loss in a partnership is not a partner - they are a lender. Al-kharaj bil-daman: the right to profit comes with the liability of loss. This is the most fundamental test of genuine Musharakah versus disguised Qard.",
      opts: [
        { label: "No, we both accept we could lose our capital", sub: "", val: "no", w: {} },
        { label: "One partner is informally guaranteed - \"I will pay you back either way\"", sub: "", val: "informal", w: { guaranteed_return: 2 } },
        { label: "One partner has a written guarantee of capital return", sub: "", val: "written", w: { guaranteed_return: 3 } },
      ],
    },
    {
      phase: 2,
      text: "Is the underlying business activity itself permissible?",
      plain: "What does this business do? Is the core activity something Islam permits?",
      principle: "A genuine Musharakah in a Haram business is invalid regardless of how perfectly the partnership structure is constructed. The Sharia does not validate the structure if the underlying activity is prohibited.",
      opts: [
        { label: "Yes, the business activity is clearly permissible", sub: "", val: "yes", w: {} },
        { label: "No, it involves alcohol, gambling, interest, or other prohibited activities", sub: "", val: "no", w: { haram: 3 } },
        { label: "Mixed - some activity is Halal, some questionable", sub: "", val: "mixed", w: { mixed: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // GOODS TRADE
  // ──────────────────────────────────────────
  goods_trade: [
    {
      phase: 0,
      text: "Do you own the goods before you sell them?",
      plain: "At the moment of agreeing the sale - do the goods belong to you? Are you the owner who bears the risk of those goods?",
      principle: "\"Do not sell what you do not have\" (Sunan al-Tirmidhi 1232). This is among the most explicit Prophetic prohibitions in commercial law. Selling goods you do not own is invalid Bay'.",
      opts: [
        { label: "Yes, I own them and bear the risk", sub: "If they were destroyed tonight, my loss", val: "yes", w: {} },
        { label: "No, I will source them after receiving the order", sub: "Drop-shipping or brokering without ownership", val: "no", w: { no_own: 3 } },
        { label: "I have a confirmed supply but have not taken delivery yet", sub: "", val: "contracted", w: { no_own: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Is the price agreed and fixed at the point of sale?",
      plain: "Does the buyer know exactly what they will pay from the moment of agreement?",
      principle: "Bay' requires that the price (Thaman) be known (Ma'lum) and agreed at the time of contract. A price that will be determined later - or that can change - introduces Gharar (excessive uncertainty) that invalidates the Bay'.",
      opts: [
        { label: "Yes, price fixed and agreed at sale", sub: "", val: "yes", w: {} },
        { label: "No, price to be determined later", sub: "", val: "no", w: { gharar: 2 } },
        { label: "A price range was agreed - exact amount later", sub: "", val: "range", w: { gharar: 1 } },
      ],
    },
    {
      phase: 1,
      text: "If payment is deferred - does the outstanding amount increase if the buyer pays late?",
      plain: "The buyer owes you the agreed price. If they pay late, does the amount they owe go up?",
      principle: "Riba al-Nasi'ah. The Dayn (outstanding price) is fixed at the point of sale. Any increase arising from delay is Riba regardless of whether the original contract was a genuine Bay'.",
      opts: [
        { label: "No, the agreed price stays the same regardless of timing", sub: "", val: "no", w: {} },
        { label: "Yes, late payment triggers additional charges or compounding", sub: "", val: "yes", w: { dayn_grows: 3 } },
      ],
    },
    {
      phase: 1,
      text: "Is the thing being sold genuinely useful to the buyer - or is it purely a mechanism to generate money?",
      plain: "Will the buyer actually use what you are selling? Or is this a circular arrangement where goods are sold and immediately bought back to generate cash?",
      principle: "Bay' al-'Inah: selling an asset then immediately buying it back (or similar circular arrangements) to generate cash was prohibited by the majority of classical scholars as a Hilah for Riba. The genuine utility of the goods to the buyer is a signal of genuine trade.",
      opts: [
        { label: "Yes, the buyer genuinely wants and will use these goods", sub: "", val: "yes", w: {} },
        { label: "The buyer will immediately resell - this is not for their use", sub: "Possibly circular trade", val: "resell", w: { hila: 1 } },
        { label: "The goods are being used to generate cash - no one intends to keep them", sub: "", val: "cash_gen", w: { hila: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // COMMODITY TRADING
  // ──────────────────────────────────────────
  commodity: [
    {
      phase: 3,
      text: "What commodity are you trading - and does it match the Ribawi characteristics?",
      plain: "Gold, silver, wheat, barley, dates, and salt are the six Ribawi items named by the Prophet \u2E3B. They have seven shared characteristics. What are you trading?",
      principle: "The Hadith of Ubadah ibn al-Samit (Sahih Muslim 1587): \"Gold for gold, silver for silver...like for like, equal for equal, hand to hand.\" The six Ribawi items are not a closed list - they are exemplars. Any item sharing their 'Illah (effective cause) falls under the same rules: same type must be Mithlan bi-mithl (equal); different types must be Yadan bi-yad (immediate hand to hand).",
      opts: [
        { label: "Gold or silver", sub: "The primary Ribawi monetary metals", val: "gold_silver", w: { ribawi: 1 } },
        { label: "Agricultural staples - wheat, barley, dates, salt, or similar", sub: "", val: "agri", w: { ribawi: 1 } },
        { label: "Oil, gas, industrial metals", sub: "", val: "industrial", w: {} },
        { label: "Financial derivatives on commodities", sub: "Futures, options, CFDs on commodities", val: "derivatives", w: { speculative: 3, gharar: 3 } },
      ],
    },
    {
      phase: 3,
      text: "Is this exchange happening immediately - hand to hand - or is there a deferred element?",
      plain: "Are both sides of this exchange settled on the spot, right now? Or is one side deferred into the future?",
      principle: "For Ribawi items exchanged against a different Ribawi item (e.g. gold for silver), the Hadith requires Yadan bi-yad - hand to hand, immediate settlement. Any deferral in either direction when trading Ribawi items creates Riba al-Nasi'ah. For same-type items (gold for gold), both quantity equality AND immediate settlement are required simultaneously.",
      opts: [
        { label: "Both sides settle immediately - true spot transaction", sub: "", val: "spot", w: {} },
        { label: "One side is deferred - I pay now, receive later (or vice versa)", sub: "", val: "deferred", w: { dayn_grows: 2 } },
        { label: "Both sides are deferred - forward or futures contract", sub: "", val: "forward", w: { dayn_grows: 3, speculative: 2 } },
      ],
    },
    {
      phase: 3,
      text: "Are you trading the same type of commodity for itself - e.g. gold for gold?",
      plain: "Is this a same-type exchange? Or is it gold for silver, wheat for money?",
      principle: "Same-type Ribawi exchange (gold for gold) requires: (1) Mithlan bi-mithl - exact equality in weight; (2) Sawa'an bi-sawa' - equivalent quality; (3) Yadan bi-yad - immediate hand-to-hand. Any deviation in any of the three is Riba al-Fadl. Cross-type exchange (gold for silver) requires only Yadan bi-yad - but not quantity equality.",
      opts: [
        { label: "Yes, same type for same type (e.g. gold for gold, dollars for dollars)", sub: "", val: "same", w: { same_type: 1 } },
        { label: "No, different types (gold for silver, gold for cash)", sub: "", val: "different", w: {} },
      ],
    },
    {
      phase: 2,
      text: "If this is same-type: are the quantities and qualities exactly equal?",
      plain: "If you are exchanging gold for gold, or wheat for wheat - are you exchanging exactly equal weights and exactly equal quality? Any discrepancy is Riba al-Fadl.",
      principle: "The root of this rule: the gold dilution analogy. Taking 31.1g of 24-carat gold, adulterating it with base metal to produce 40g of alloy and presenting it as equivalent, violates Mithlan bi-mithl. The Prophet \u2E3B: \"whoever deceives us is not of us\" (Sahih Muslim 102). The same applies to any same-type Ribawi exchange where the quantities or qualities differ.",
      opts: [
        { label: "Yes, exactly equal quantities and qualities on both sides", sub: "", val: "equal", w: {} },
        { label: "No, the quantities differ (one side is more than the other)", sub: "", val: "unequal", w: { riba_fadl: 3 } },
        { label: "This is not a same-type exchange - different commodities", sub: "", val: "different_type", w: {} },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // FOREX / CURRENCY TRADING
  // ──────────────────────────────────────────
  forex: [
    {
      phase: 3,
      text: "Is currency a Ribawi item? First - does fiat currency meet the characteristics of the six Ribawi items?",
      plain: "This is the most important question in currency trading. Before asking whether the rules apply, we must ask whether fiat currency qualifies for the rules at all.",
      principle: "The Maliki and Hanbali 'Illah for gold and silver's Ribawi status is Thamaniyyah - monetary nature. Fiat currency functions as the monetary medium - but does it possess the seven characteristics? Mithiliyyah (genuine fungibility across time): it decays through inflation. Qimah Dhatiyyah (intrinsic value): zero. Baqa' (storability): value erodes by design. Rawaj (natural acceptance): coerced by law. This research asks: if fiat fails all seven characteristics, can Ribawi rules even apply to it? Or does its failure place it in a different analytical category?",
      opts: [
        { label: "I accept fiat may be treated as a monetary medium - apply Sarf rules", sub: "Mainstream position: currency exchange follows the rules for gold/silver", val: "sarf", w: { sarf: 1 } },
        { label: "Fiat is fundamentally different from the six Ribawi items", sub: "Research-based position: fiat fails all seven characteristics - different analysis needed", val: "different", w: { fiat_question: 1 } },
      ],
    },
    {
      phase: 3,
      text: "Is this a spot exchange - both currencies delivered immediately?",
      plain: "Do both sides of the exchange settle on the same day - or at most T+2? Or is one side deferred days, weeks, or months into the future?",
      principle: "Applying the Sarf (currency exchange) rules: all classical schools require Yadan bi-yad (hand to hand, immediate) for currency exchange. Both sides must settle simultaneously. Any deferral - even one day - in either currency was considered Riba al-Nasi'ah by classical scholars including Imam Malik, who was the strictest on this.",
      opts: [
        { label: "Yes, both settle immediately (same day or T+2 spot)", sub: "Standard spot foreign exchange", val: "spot", w: {} },
        { label: "No, there is a forward element (one or both sides deferred)", sub: "Forward FX, FX swaps, currency futures", val: "forward", w: { dayn_grows: 3 } },
        { label: "This is CFD or leveraged currency trading - no physical delivery", sub: "", val: "cfd", w: { speculative: 3, no_delivery: 3 } },
      ],
    },
    {
      phase: 3,
      text: "Is there leverage - are you borrowing money to trade currencies?",
      plain: "Is your position larger than the money you actually have? Are you using 10x, 50x, or 100x leverage?",
      principle: "Leveraged Forex combines three prohibited elements simultaneously: (1) Riba from the borrowing itself; (2) Gharar (excessive uncertainty) from the leveraged position; (3) Maysir (gambling) from the speculative nature. The Prophet \u2E3B prohibited both Gharar sales (Sahih Muslim 1513) and gambling. Leveraged FX trading combines both.",
      opts: [
        { label: "No leverage - I only trade what I genuinely own", sub: "", val: "no", w: {} },
        { label: "Yes, I use leverage / margin", sub: "My position is larger than my capital", val: "yes", w: { leverage: 3, speculative: 3 } },
      ],
    },
    {
      phase: 0,
      text: "What is the genuine purpose of this currency exchange?",
      plain: "Why are you exchanging currencies? Trade, travel, remittance - or to profit from price movements?",
      principle: "Currency exchange for genuine needs - trade, travel, remittance - is permitted under Sarf rules when done immediately. Currency exchange purely to profit from price movements approaches Maysir when leveraged and speculative in nature.",
      opts: [
        { label: "Genuine need - travel, trade payment, remittance", sub: "", val: "genuine", w: {} },
        { label: "To profit from exchange rate movements - currency speculation", sub: "", val: "speculative", w: { speculative: 2 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // MONEY CHANGING / REMITTANCE
  // ──────────────────────────────────────────
  money_changer: [
    {
      phase: 3,
      text: "Is the exchange happening immediately - both currencies on the spot?",
      plain: "When you hand over your money and receive the other currency - does it all happen right now, in one transaction?",
      principle: "Sarf (currency exchange) requires Yadan bi-yad - immediate, simultaneous exchange of both currencies. This is agreed by all four madhabs. Even Imam Malik - who was the most permissive on some currency matters - required immediate exchange for currency pairs.",
      opts: [
        { label: "Yes, both currencies exchanged on the spot, right now", sub: "", val: "spot", w: {} },
        { label: "I pay now and receive the other currency later", sub: "", val: "deferred", w: { dayn_grows: 2 } },
        { label: "I receive now and pay later", sub: "", val: "deferred_pay", w: { dayn_grows: 2 } },
      ],
    },
    {
      phase: 3,
      text: "Is the exchange rate agreed before the exchange takes place?",
      plain: "Is the rate fixed and disclosed before you hand over your money? Or is it calculated after?",
      principle: "Gharar (excessive uncertainty) requires that the price (Thaman) be known at the time of contract. An exchange rate disclosed only after the money has been transferred introduces Gharar into the Sarf transaction.",
      opts: [
        { label: "Yes, rate disclosed and agreed before exchange", sub: "", val: "yes", w: {} },
        { label: "No, rate applied after the fact", sub: "", val: "no", w: { gharar: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Does the money changer charge a fee on top of the exchange rate?",
      plain: "Is there a service charge or commission, separate from the exchange rate margin?",
      principle: "A genuine fee for the service of exchange (Ijarah on the service) is permissible - this is how money changers earn their livelihood legitimately. The concern arises if the \"fee\" is actually undisclosed margin hidden in the exchange rate, or if it compounds in ways that resemble Riba.",
      opts: [
        { label: "Yes, transparent, disclosed fee for the service", sub: "Halal service charge", val: "transparent", w: {} },
        { label: "Hidden margin in the exchange rate - no disclosed fee", sub: "Common practice - not prohibited, but worth noting", val: "hidden", w: { fee_structure: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // BITCOIN
  // ──────────────────────────────────────────
  bitcoin: [
    {
      phase: 3,
      text: "The Ribawi characteristics test - does Bitcoin meet the seven characteristics of a legitimate monetary medium?",
      plain: "We established that the six Ribawi items share seven characteristics. Does Bitcoin have them? This determines which set of rules applies.",
      principle: "The research establishes seven characteristics: Mithiliyyah (fungibility), Kayl/Wazn (measurability), Qimah Dhatiyyah (intrinsic value), Baqa' (storability), Rawaj (universal acceptance), Sifah Ma'lumah (knowable quality), Hajah 'Ammah (essential utility). Bitcoin: fungible (yes, each BTC is equivalent); measurable (yes, to 8 decimal places); intrinsic value (disputed - no material utility; value is purely from network consensus); storability (yes - does not decay); acceptance (limited, growing - not universal, not natural); quality (fixed supply, knowable); essential utility (disputed).",
      opts: [
        { label: "Treat Bitcoin as a commodity / asset - apply commodity rules", sub: "Position of many contemporary scholars: it is a digital asset", val: "asset", w: {} },
        { label: "Treat Bitcoin as currency - apply Sarf rules", sub: "Some scholars: Bitcoin functions as money, apply monetary rules", val: "currency", w: { sarf: 1 } },
        { label: "Bitcoin is sui generis - neither commodity nor currency in classical terms", sub: "Research position: it may require entirely new Ijtihad", val: "new", w: { fiat_question: 1 } },
      ],
    },
    {
      phase: 3,
      text: "How are you acquiring or exchanging Bitcoin?",
      plain: "What are you doing with Bitcoin exactly?",
      principle: "The applicable rules differ by activity: buying and holding (investment/commodity rules), exchanging for another currency (Sarf rules if treated as currency), mining (permissible as productive activity if energy source is ethical), trading for profit (speculation rules).",
      opts: [
        { label: "Buying and holding as a long-term store of value", sub: "", val: "hold", w: {} },
        { label: "Exchanging Bitcoin for fiat currency or another crypto", sub: "", val: "exchange", w: { sarf: 1 } },
        { label: "Day trading - buying and selling for short-term profit", sub: "", val: "trade", w: { speculative: 2 } },
        { label: "Mining - using computing power to validate the network", sub: "", val: "mining", w: {} },
      ],
    },
    {
      phase: 3,
      text: "Is the exchange happening immediately - spot settlement?",
      plain: "If you are exchanging Bitcoin for money or another crypto - is the settlement immediate on both sides?",
      principle: "If Bitcoin is treated as having monetary characteristics (Thamaniyyah), then Sarf rules require immediate bilateral settlement. If treated as a commodity, Mithlan bi-mithl and Yadan bi-yad apply for same-type exchanges. Either way, deferral creates Riba al-Nasi'ah concerns.",
      opts: [
        { label: "Yes, immediate settlement on both sides", sub: "", val: "spot", w: {} },
        { label: "No, one or both sides deferred", sub: "", val: "deferred", w: { dayn_grows: 2 } },
        { label: "Not applicable - I am holding, not exchanging", sub: "", val: "na", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Is there any Riba mechanism attached to this Bitcoin activity?",
      plain: "Are you earning \"interest\" on Bitcoin through a lending platform or yield product? Is leverage involved?",
      principle: "Bitcoin itself may or may not be Halal as an asset - scholars differ. But Bitcoin-based lending products (earning yield on deposited Bitcoin), leveraged Bitcoin trading, and DeFi protocols that pay \"interest\" on Bitcoin clearly involve Riba mechanisms, regardless of the Halal status of Bitcoin itself.",
      opts: [
        { label: "No, straightforward buying, holding, or spot exchange", sub: "", val: "no", w: {} },
        { label: "Yes, earning yield / interest on deposited Bitcoin", sub: "Crypto savings accounts, lending platforms", val: "yield", w: { riba_core: 3 } },
        { label: "Yes, leveraged Bitcoin trading", sub: "", val: "leverage", w: { leverage: 3, speculative: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // ALTCOIN
  // ──────────────────────────────────────────
  altcoin: [
    {
      phase: 3,
      text: "What is the underlying utility or purpose of this cryptocurrency?",
      plain: "Why does this crypto exist? What does it actually do in the real world?",
      principle: "Not all cryptocurrencies are equivalent. A utility token that grants access to a genuine service is analytically different from a purely speculative token with no use case. A governance token in a productive protocol differs from a meme coin with no function. The nature of the underlying determines the applicable rules.",
      opts: [
        { label: "It powers a genuine technology - smart contracts, decentralised applications", sub: "e.g. Ethereum, Solana used for genuine utility", val: "utility", w: {} },
        { label: "Pure speculation - no genuine utility or use case", sub: "Meme coins, hype-driven tokens", val: "meme", w: { speculative: 3, gharar: 3 } },
        { label: "A stablecoin pegged to fiat currency", sub: "USDT, USDC, BUSD", val: "stable", w: { fiat_question: 1 } },
        { label: "Governance token for a DeFi protocol", sub: "Voting rights in a protocol", val: "governance", w: {} },
      ],
    },
    {
      phase: 3,
      text: "Is there a fixed or guaranteed return attached to this token?",
      plain: "Does holding this token earn you a fixed periodic return - like staking rewards, guaranteed yield, or interest?",
      principle: "A fixed return on holding a financial instrument is Riba, regardless of the underlying technology. Blockchain does not change the Sharia classification of economic arrangements. A \"staking reward\" that is a predetermined fixed percentage of holdings has the economic structure of Riba.",
      opts: [
        { label: "No fixed return - I only gain or lose on price movement", sub: "", val: "no", w: {} },
        { label: "Yes, fixed staking rewards or guaranteed yield", sub: "", val: "yes", w: { riba_core: 2 } },
        { label: "Variable rewards from genuine protocol activity - not a fixed rate", sub: "", val: "variable", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Are you speculating on price - or using this crypto for a genuine purpose?",
      plain: "Are you buying this because you want to use the technology / service it provides? Or are you buying it hoping to sell it at a higher price?",
      principle: "Maysir (gambling) involves committing money to an uncertain outcome for pure gain, without productive contribution. The Prophet \u2E3B prohibited Gharar sales (Sahih Muslim 1513). Pure price speculation in an asset with no intrinsic utility closely approaches Maysir.",
      opts: [
        { label: "Genuine use - I need this token for the technology or service", sub: "", val: "use", w: {} },
        { label: "Speculation - hoping to profit from price increase", sub: "", val: "spec", w: { speculative: 2 } },
        { label: "Both", sub: "", val: "both", w: { speculative: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // DEFI
  // ──────────────────────────────────────────
  defi: [
    {
      phase: 0,
      text: "What DeFi activity are you involved in?",
      plain: "Choose the description that best matches what you are doing.",
      principle: "DeFi (decentralised finance) replicates conventional financial activities on blockchain. The Sharia analysis follows the economic substance, not the technological wrapper.",
      opts: [
        { label: "Lending crypto to a protocol and earning yield", sub: "Aave, Compound, similar protocols", val: "lending", w: { riba_core: 3 } },
        { label: "Providing liquidity to a trading pool and earning fees", sub: "Uniswap, similar automated market makers", val: "liquidity", w: { gharar: 2 } },
        { label: "Yield farming - moving assets between protocols for maximum return", sub: "", val: "farming", w: { speculative: 3, riba_core: 2 } },
        { label: "Staking to secure a network - not a lending protocol", sub: "", val: "staking", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Is the yield or return fixed - or variable based on actual protocol activity?",
      plain: "Is the return you earn predetermined and fixed? Or does it genuinely vary based on how much activity happens in the protocol?",
      principle: "A fixed yield on deposited crypto is structurally Riba al-Nasi'ah regardless of the mechanism. A variable return from genuine trading fees or protocol activity is closer to profit-sharing - but the question of whether the underlying activity is Halal remains.",
      opts: [
        { label: "Fixed - I know the approximate APY from the start", sub: "", val: "fixed", w: { riba_core: 3 } },
        { label: "Genuinely variable - depends entirely on protocol activity", sub: "", val: "variable", w: {} },
      ],
    },
    {
      phase: 3,
      text: "Is the underlying protocol activity itself permissible?",
      plain: "What is the protocol being used for by the people who generate your fees or returns?",
      principle: "If the protocol primarily facilitates Haram activities - leveraged trading, conventional financial instruments on-chain - then earning fees from that activity is earning from Haram sources, regardless of the mechanism.",
      opts: [
        { label: "Permissible activities - genuine exchange, productive use", sub: "", val: "halal", w: {} },
        { label: "Conventional financial instruments, leverage, derivatives", sub: "", val: "haram", w: { haram: 2 } },
        { label: "Mixed - both permissible and impermissible uses", sub: "", val: "mixed", w: { mixed: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // STABLECOIN
  // ──────────────────────────────────────────
  stablecoin: [
    {
      phase: 3,
      text: "A stablecoin is a digital representation of fiat currency. First - does fiat currency itself meet the Ribawi characteristics?",
      plain: "Before evaluating the stablecoin, we must ask: is the currency it represents a legitimate monetary medium under Islamic first principles?",
      principle: "The research paper establishes that fiat currency fails all seven characteristics of the six Ribawi items: no intrinsic value (Qimah Dhatiyyah), decaying fungibility through inflation, artificial acceptance via legal compulsion, unknowable future purchasing power. A stablecoin pegged to fiat inherits all of fiat's characteristics - and adds the additional question of whether the peg is genuinely backed.",
      opts: [
        { label: "I proceed accepting fiat as the monetary standard - apply Sarf rules", sub: "Mainstream position", val: "accept", w: { fiat_question: 1 } },
        { label: "I recognise fiat's fundamental characteristics failure - different analysis required", sub: "Research-informed position", val: "question", w: { fiat_question: 1 } },
      ],
    },
    {
      phase: 3,
      text: "Is the stablecoin genuinely backed 1:1 by the fiat currency it represents?",
      plain: "For every USDT or USDC you hold - is there a real dollar sitting in a real bank account? Or is it fractionally backed, or backed by other crypto assets?",
      principle: "A stablecoin that is not genuinely backed is creating a representation of value without the value behind it - a digital form of Ghashsh (adulteration/deception). The Prophet \u2E3B: \"Whoever deceives/adulterates us is not of us\" (Sahih Muslim 102).",
      opts: [
        { label: "Yes, genuinely fully backed and audited", sub: "", val: "backed", w: {} },
        { label: "Partially backed or algorithmically maintained", sub: "Not fully collateralised", val: "partial", w: { gharar: 2 } },
        { label: "Unknown / unaudited", sub: "", val: "unknown", w: { gharar: 3 } },
      ],
    },
    {
      phase: 3,
      text: "Are you earning yield on the stablecoin?",
      plain: "Does holding this stablecoin earn you a percentage return - like a savings account?",
      principle: "Stablecoin yield products are structurally identical to savings accounts paying interest. The fact that the mechanism is on-blockchain does not change the economic substance. A fixed return on deposited money is Riba.",
      opts: [
        { label: "No, I hold it for exchange or transactional use only", sub: "", val: "no", w: {} },
        { label: "Yes, I earn yield on deposited stablecoins", sub: "", val: "yes", w: { riba_core: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // NFT
  // ──────────────────────────────────────────
  nft: [
    {
      phase: 0,
      text: "What does this NFT represent or provide?",
      plain: "What are you actually buying when you buy this NFT?",
      principle: "An NFT is a unique digital token. Its Halal status depends entirely on what it represents - not the technology.",
      opts: [
        { label: "Genuine digital art or creative work I appreciate and want to own", sub: "", val: "art", w: {} },
        { label: "A utility - access to a community, service, or product", sub: "", val: "utility", w: {} },
        { label: "Pure speculation - I plan to flip it for profit", sub: "No genuine utility or art value to me", val: "spec", w: { speculative: 2 } },
        { label: "A fractional ownership of a real-world asset", sub: "", val: "rwa", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Does the underlying content of the NFT relate to anything prohibited?",
      plain: "Is the art, content, or utility something that Islam permits?",
      principle: "An NFT of Haram content - explicit material, gambling platform access, alcohol brands - is prohibited regardless of the NFT mechanism itself.",
      opts: [
        { label: "Yes, the content is clearly permissible", sub: "", val: "yes", w: {} },
        { label: "No, the content involves prohibited activities or images", sub: "", val: "no", w: { haram: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // CRYPTO EXCHANGE / SWAP
  // ──────────────────────────────────────────
  crypto_exchange: [
    {
      phase: 3,
      text: "Are you exchanging one crypto for another of a different type - or the same crypto?",
      plain: "Are you swapping Bitcoin for Ethereum (different types)? Or Bitcoin for Bitcoin (wrapping / unwrapping)?",
      principle: "Applying the Sarf framework: same-type exchange requires Mithlan bi-mithl AND Yadan bi-yad. Cross-type exchange requires only Yadan bi-yad (immediate settlement). If cryptos are treated as commodities rather than currencies, the analysis shifts to commodity exchange rules.",
      opts: [
        { label: "Different cryptos - e.g. BTC to ETH, ETH to SOL", sub: "Cross-type exchange", val: "different", w: {} },
        { label: "Same crypto - wrapping, bridging, or same-coin conversion", sub: "", val: "same", w: { same_type: 1 } },
      ],
    },
    {
      phase: 3,
      text: "Does the swap settle immediately on both sides?",
      plain: "Is the exchange of both assets happening at the same moment - or is one side arriving later?",
      principle: "Yadan bi-yad is required for all monetary exchange under Sarf rules. For commodity exchange, immediate delivery prevents Gharar. Decentralised exchanges (DEX) typically settle atomically - both sides in the same blockchain transaction. Centralised exchanges may involve settlement delays.",
      opts: [
        { label: "Yes, atomic swap or immediate DEX settlement", sub: "Both sides in one transaction", val: "atomic", w: {} },
        { label: "Near-immediate - T+0 or same session on a centralised exchange", sub: "", val: "fast", w: {} },
        { label: "Delayed - one or both sides settle later", sub: "", val: "delayed", w: { dayn_grows: 2 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // TOKENIZED REAL-WORLD ASSETS (RWA)
  // ──────────────────────────────────────────
  rwa_token: [
    {
      phase: 0,
      text: "What is the underlying real-world asset that this token represents?",
      plain: "Strip the blockchain layer away - what actually sits behind this token?",
      principle: "The Shariah ruling on a tokenized asset follows the ruling on the underlying asset itself. A token representing gold is governed by Sarf rules (Ribawi exchange). A token representing debt is governed by Dayn rules. A token representing equity follows Musharakah/Mudarabah principles. The blockchain wrapper does not change the Hukm of what is wrapped.",
      opts: [
        { label: "Gold or silver", sub: "Precious metals - Ribawi items by Ijma'", val: "gold", w: { ribawi: 1 } },
        { label: "Real estate or land", sub: "Physical property tokenized into shares", val: "realestate", w: {} },
        { label: "Commodities - oil, crops, industrial metals", sub: "Physical goods with intrinsic utility", val: "commodity", w: {} },
        { label: "Equity - shares in a company or project", sub: "Ownership stake in a business", val: "equity", w: { mixed: 1 } },
        { label: "Debt instruments - bonds, Sukuk, receivables", sub: "A claim on a future payment", val: "debt", w: { riba_core: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Does the token represent genuine legal ownership of the underlying asset?",
      plain: "If the issuer disappears tomorrow - do you legally own the asset, or just a digital record?",
      principle: "Ownership (Milk) is a pillar of valid sale in Islamic law. If the token does not convey real legal title, the holder has no Milk - the transaction may be a form of Gharar (uncertainty) or Qimar (gambling on price). Synthetic exposure without ownership is closer to a wager on price movement than to a genuine sale.",
      opts: [
        { label: "Yes, full legal title transfers with the token", sub: "Enforceable ownership in the relevant jurisdiction", val: "full", w: {} },
        { label: "Partial - I own a share, held by a custodian on my behalf", sub: "Beneficial ownership through a trust or SPV", val: "partial", w: { nominal_own: 1 } },
        { label: "No, the token only tracks the price, no real ownership", sub: "Synthetic exposure, derivative-like", val: "none", w: { no_own: 2 } },
      ],
    },
    {
      phase: 1,
      text: "How is the underlying asset custodied and verified?",
      plain: "Who holds the physical asset, and how do you know it actually exists and matches what the token claims?",
      principle: "Ghashsh (fraud/deception) is categorically Haram. The Prophet \u2E3B said: \"Whoever cheats us is not one of us.\" If the underlying asset cannot be independently verified, the buyer faces Gharar Fahish (excessive uncertainty). Transparent, third-party audits reduce Gharar to acceptable levels.",
      opts: [
        { label: "Independent third-party audits with public proof-of-reserves", sub: "Regulated custodian, published audit reports", val: "audited", w: {} },
        { label: "Custodian exists but verification is self-reported", sub: "The issuer claims the asset exists but no independent audit", val: "self_reported", w: { speculative: 1 } },
        { label: "No clear custody or verification mechanism", sub: "Cannot confirm the asset actually backs the token", val: "none", w: { no_own: 2 } },
      ],
    },
    {
      phase: 1,
      text: "Are you earning yield or income from holding this token?",
      plain: "Does the token pay you anything - a fixed return, a share of profits, or lending income?",
      principle: "The nature of the yield determines the ruling. A fixed percentage return on a token is structurally identical to Riba - a guaranteed increase on capital regardless of outcome. Profit-sharing from the actual asset (rent from real estate, dividends from equity) follows Musharakah principles and is permissible if genuine risk is shared.",
      opts: [
        { label: "No yield - I hold for potential price appreciation only", sub: "", val: "none", w: {} },
        { label: "Fixed percentage return - guaranteed by the issuer", sub: "E.g. \"8% annual yield on your gold token\"", val: "fixed", w: { riba_core: 3 } },
        { label: "DeFi lending yield - I lend the token to earn interest", sub: "Depositing in a lending protocol for yield", val: "defi_lend", w: { riba_core: 3 } },
        { label: "Profit share from the underlying asset", sub: "Rent, dividends, or commodity returns - variable, not guaranteed", val: "profit_share", w: {} },
      ],
    },
    {
      phase: 3,
      text: "Is the token's value denominated in or pegged to a fiat currency?",
      plain: "Is the price of this token expressed as a fixed amount of dollars, euros, or another government currency?",
      principle: "If the token is denominated in fiat, then its exchange involves fiat currency - and the broader question of whether fiat money itself is Ribawi applies. This does not make the token Haram per se, but it means the Ribawi analysis must account for the fiat medium of exchange.",
      opts: [
        { label: "Yes, the token's value is pegged to or denominated in fiat", sub: "E.g. \"1 token = $1 worth of gold\"", val: "yes", w: { fiat_question: 1 } },
        { label: "No, the token floats freely against fiat", sub: "Price is determined by market supply and demand", val: "no", w: {} },
      ],
    },
    {
      phase: 5,
      text: "What is your primary purpose in holding this token?",
      plain: "Why did you acquire this token - what do you intend to do with it?",
      principle: "Maqasid al-Shariah (objectives of the law) considers intention and outcome. Speculative flipping of tokenized assets - buying only to sell quickly at a higher price with no interest in the underlying asset - resembles Maysir (gambling). Long-term holding for genuine asset exposure, income generation, or wealth preservation aligns with the Shariah objective of Hifz al-Mal (preservation of wealth).",
      opts: [
        { label: "Short-term speculation - buying to flip for quick profit", sub: "No interest in the underlying asset itself", val: "speculate", w: { speculative: 2 } },
        { label: "Long-term investment - genuine exposure to the asset", sub: "Holding for wealth preservation or growth", val: "hold", w: {} },
        { label: "Income generation - earning yield from the asset", sub: "Rent, dividends, or commodity returns", val: "income", w: {} },
        { label: "Using as collateral or for portfolio diversification", sub: "", val: "collateral", w: {} },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // QARD (PERSONAL LENDING)
  // ──────────────────────────────────────────
  qard: [
    {
      phase: 0,
      text: "What do you expect to get back from this loan?",
      plain: "When this loan is settled - what comes back to you?",
      principle: "Qard Hasan: a cut from wealth given, with only the Mithl (exact equivalent) returned. Ibn Abbas: \"Every loan that brings benefit to the lender is Riba.\" The Arabic word Qard means to cut - a piece of wealth severed from your wealth and given. Only that piece comes back.",
      opts: [
        { label: "Exactly what I gave - the same amount, nothing more", sub: "", val: "same", w: {} },
        { label: "Something extra - a bit more than I gave", sub: "", val: "more", w: { riba_core: 3 } },
        { label: "A share of whatever they earn - could be more or less", sub: "This would be Musharakah, not Qard", val: "share", w: {} },
        { label: "Nothing - it is a gift", sub: "You are not expecting repayment", val: "gift", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Was any extra return agreed as a condition - before the money changed hands?",
      plain: "Is there any agreement - spoken or written - that they will return a specific extra amount?",
      principle: "Stipulation is what makes excess Riba. The Hanafi, Maliki, Shafi'i, and Hanbali schools are unanimous: any condition in a Qard requiring extra return - in any form, in any amount - is Riba. A voluntary, unexpected gift from the borrower after repayment (with no prior agreement) is not Riba - the Prophet \u2E3B praised generous repayment.",
      opts: [
        { label: "No condition - any extra would be entirely their free choice", sub: "", val: "no", w: {} },
        { label: "Yes, we agreed a specific extra amount or percentage upfront", sub: "", val: "yes", w: { riba_core: 3 } },
      ],
    },
    {
      phase: 1,
      text: "If they cannot repay on the agreed date - what happens?",
      plain: "They come to you and say: I cannot pay today. What is your response - and what was agreed?",
      principle: "Quran 2:280: \"If the debtor is in difficulty, grant him time until ease comes. But if you give the debt as charity, that is better for you, if only you knew.\" This is a divine command. Granting time freely is commanded. Forgiving the debt entirely is praised. Charging for time - in any form - is Riba al-Nasi'ah.",
      opts: [
        { label: "Give time freely - the amount stays the same", sub: "Following the Quranic command", val: "free", w: {} },
        { label: "They owe more the longer they take", sub: "We agreed delay costs them extra", val: "more", w: { dayn_grows: 3 } },
        { label: "I would consider forgiving the debt", sub: "The Quran says this is better", val: "forgive", w: {} },
      ],
    },
    {
      phase: 3,
      text: "Does this loan create a burden the borrower cannot realistically escape?",
      plain: "Is the person genuinely able to repay this? Or are you lending in a way that will trap them?",
      principle: "The Prophet \u2E3B: \"The soul of the believer is suspended because of his debt until it is paid off\" (Sunan al-Tirmidhi 1078). He said the worst thing a man could leave his family is unpaid debt. A lender who structures a loan they know the borrower cannot repay is generating the very harm the Prophet sought refuge from daily.",
      opts: [
        { label: "Yes, they can realistically repay this without hardship", sub: "", val: "yes", w: {} },
        { label: "Uncertain - they are already struggling", sub: "", val: "uncertain", w: { dayn_trap: 1 } },
        { label: "No, this will likely trap them", sub: "", val: "no", w: { dayn_trap: 2 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // RECEIVING A LOAN
  // ──────────────────────────────────────────
  receiving: [
    {
      phase: 0,
      text: "Are you being asked to return more than you borrow?",
      plain: "If you borrow \u00A31,000 - do you owe back more than \u00A31,000?",
      principle: "From the borrower's perspective: you are the one creating the Dayn. Any stipulated excess above what you received is Riba. You are the one who would be consuming a loan with interest - and the Hadith of the Curse (Sahih Muslim 1598) equally implicates both the one who pays Riba and the one who receives it.",
      opts: [
        { label: "Yes, I will pay back more than I receive", sub: "Interest, extra fees, profit to the lender", val: "yes", w: { riba_core: 3 } },
        { label: "No, I pay back exactly what I received", sub: "", val: "no", w: {} },
      ],
    },
    {
      phase: 0,
      text: "If you cannot repay on time - does the amount you owe increase?",
      plain: "If you are late: does your balance grow?",
      principle: "Riba al-Nasi'ah from the borrower's side. Any increase in what you owe because of delay is Riba - it does not matter that you are the borrower, not the lender.",
      opts: [
        { label: "Yes, delay increases the amount I owe", sub: "", val: "yes", w: { dayn_grows: 3 } },
        { label: "No, the amount stays the same", sub: "", val: "no", w: {} },
      ],
    },
    {
      phase: 3,
      text: "The Prophet \u2E3B cursed all parties to a Riba transaction equally. Does this arrangement involve Riba?",
      plain: "The Prophet \u2E3B cursed the one who pays Riba, the one who receives it, the person who writes the contract, and the two witnesses - equally (Sahih Muslim 1598). If you are borrowing on interest - even under financial pressure - you are a party to a Riba transaction.",
      principle: "\"The Messenger of Allah \u2E3B cursed the one who consumes Riba, the one who feeds it to another, the one who records it, and the two witnesses to it - and he said: they are all equal in sin\" (Sahih Muslim 1598). Necessity (Darura) may apply in genuine extreme cases - but the default position is clear.",
      opts: [
        { label: "Yes, this is clearly an interest-bearing loan", sub: "I am aware it involves Riba", val: "yes", w: { riba_core: 3 } },
        { label: "No, this is a genuine Qard Hasan from someone helping me", sub: "", val: "no", w: {} },
        { label: "I am taking this under genuine necessity - no other option exists", sub: "Darura (necessity) may apply", val: "darura", w: { darura: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // JOINT VENTURE (PERSONAL)
  // ──────────────────────────────────────────
  joint_venture: [
    {
      phase: 0,
      text: "Is this a genuine Musharakah - or a disguised Qard?",
      plain: "Are both of you genuinely putting in capital - and both genuinely accepting that you could lose it? Or is one party guaranteed to get their money back no matter what?",
      principle: "The test for genuine Musharakah versus disguised Qard-with-interest is simple: can both parties genuinely lose? If one party is guaranteed their money back - formally or informally - they are not a partner. They are a lender. And if they are receiving a return on that loan, it is Riba.",
      opts: [
        { label: "Both of us accept we could genuinely lose our capital", sub: "True Musharakah", val: "both_risk", w: {} },
        { label: "One party is guaranteed their money back regardless", sub: "", val: "guaranteed", w: { guaranteed_return: 3 } },
        { label: "There is an informal understanding that the money will be returned", sub: "\"Of course I will pay you back\" is still a guarantee", val: "informal", w: { guaranteed_return: 2 } },
      ],
    },
    {
      phase: 0,
      text: "How is profit split?",
      plain: "If this venture makes money - how is it divided between you?",
      principle: "Musharakah requires a pre-agreed profit-sharing ratio. Loss must be proportional to capital contributed - you cannot agree that one party bears all losses. A fixed return (guaranteed amount) for one party converts their position from partner to lender.",
      opts: [
        { label: "Pre-agreed percentage of actual profits - variable, depends on outcomes", sub: "", val: "percentage", w: {} },
        { label: "One person gets a fixed amount first, then we split the rest", sub: "", val: "fixed_first", w: { fixed_return: 1 } },
        { label: "One person gets a fixed amount regardless of profit", sub: "", val: "fixed", w: { fixed_return: 3 } },
      ],
    },
    {
      phase: 1,
      text: "Is the underlying business activity permissible?",
      plain: "What does this venture do - and is the activity something Allah permits?",
      principle: "A structurally perfect Musharakah in a Haram business is still Haram. The permissibility of the structure cannot validate a prohibited underlying activity.",
      opts: [
        { label: "Yes, clearly permissible", sub: "", val: "yes", w: {} },
        { label: "No, involves Riba, alcohol, gambling, or other prohibition", sub: "", val: "no", w: { haram: 3 } },
        { label: "Mixed", sub: "", val: "mixed", w: { mixed: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // PROPERTY INVESTMENT
  // ──────────────────────────────────────────
  property_invest: [
    {
      phase: 0,
      text: "How is this property investment being financed?",
      plain: "Where does the money come from to buy this property?",
      principle: "Property itself is a permissible asset. The key question is how it is financed and how returns are generated. If financing involves Riba, the investment is tainted at its source.",
      opts: [
        { label: "My own capital - no borrowing", sub: "", val: "own", w: {} },
        { label: "Through an Islamic mortgage / home finance product", sub: "Apply the mortgage questions to the finance", val: "islamic_mort", w: { check_mortgage: 1 } },
        { label: "Through a conventional mortgage with interest", sub: "", val: "conv_mort", w: { riba_core: 2 } },
        { label: "Through an investment fund or REIT", sub: "", val: "fund", w: {} },
      ],
    },
    {
      phase: 0,
      text: "How do you earn from this property?",
      plain: "Where does your return come from?",
      principle: "Rental income from genuine Ijarah (lease) of property is permissible - it is Bay' of Manfa'ah (sale of usufruct). Capital gain from sale is permissible Bay'. The question is whether the financing of the investment involves Riba.",
      opts: [
        { label: "Rental income - I lease to genuine tenants", sub: "Permissible Ijarah", val: "rent", w: {} },
        { label: "Capital appreciation - I plan to sell at a higher price", sub: "", val: "gain", w: {} },
        { label: "Both rental and capital appreciation", sub: "", val: "both", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Does the property or its tenants use it for permitted purposes?",
      plain: "Is the property being used for something Islam permits - housing, offices, retail?",
      principle: "Leasing property for Haram purposes - a bar, a gambling establishment, a Riba-based bank as tenant - makes the rental income from that tenancy impermissible.",
      opts: [
        { label: "Yes, residential, commercial office, permissible retail", sub: "", val: "yes", w: {} },
        { label: "No, alcohol, gambling, financial services with Riba", sub: "", val: "no", w: { haram: 2 } },
        { label: "Mixed tenants - some permissible, some questionable", sub: "", val: "mixed", w: { mixed: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // CREDIT SALE
  // ──────────────────────────────────────────
  credit_sale: [
    {
      phase: 0,
      text: "Do you own the goods at the moment of the credit sale agreement?",
      plain: "When you agree on the deferred price - do you own the goods right now?",
      principle: "\"Do not sell what you do not have\" (Sunan al-Tirmidhi 1232). A deferred-price sale of goods you do not own is invalid.",
      opts: [
        { label: "Yes, I own them now", sub: "", val: "yes", w: {} },
        { label: "No, I will source them after", sub: "", val: "no", w: { no_own: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Is the higher deferred price agreed and fixed at the time of sale?",
      plain: "When the buyer agrees to take the goods and pay later - is the total price (including your mark-up for waiting) fixed and agreed at that moment?",
      principle: "A credit sale (Bay' Mu'ajjal) where a higher price is agreed upfront for deferred payment is valid Bay' - not Riba. The price differential is the agreed value of the transaction, embedded at the point of contract. However, once the Dayn is established - the outstanding price - it cannot increase further.",
      opts: [
        { label: "Yes, total deferred price fixed and agreed at the point of sale", sub: "", val: "yes", w: {} },
        { label: "No, the price will be determined later or can increase", sub: "", val: "no", w: { gharar: 2, dayn_grows: 1 } },
      ],
    },
    {
      phase: 1,
      text: "Does the amount owed increase if the buyer pays late?",
      plain: "The Dayn (outstanding price) is set. If they are late - does it grow?",
      principle: "The Dayn is fixed. Riba al-Nasi'ah: any increase in the Dayn arising from delay. The credit sale established the Dayn legitimately. Now it must stay fixed.",
      opts: [
        { label: "No, the agreed price stays the same regardless of when they pay", sub: "", val: "no", w: {} },
        { label: "Yes, late payment triggers additional charges", sub: "", val: "yes", w: { dayn_grows: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // MURABAHA TRADE
  // ──────────────────────────────────────────
  murabaha_trade: [
    {
      phase: 0,
      text: "Do you genuinely own the goods and have you disclosed your cost price honestly?",
      plain: "In Murabahah, the seller discloses their cost and adds a known profit margin. Have you done this transparently?",
      principle: "Murabahah requires: (1) the seller genuinely owns the goods; (2) the cost price is truthfully disclosed; (3) the mark-up is agreed upon openly. Concealing the cost, inflating it, or selling goods you do not own invalidates the Murabahah.",
      opts: [
        { label: "Yes, I genuinely own them and my cost is honestly disclosed", sub: "", val: "yes", w: {} },
        { label: "I own them but the cost is not fully transparent", sub: "", val: "partial", w: { gharar: 1 } },
        { label: "I do not yet own them", sub: "", val: "no", w: { no_own: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Do you bear the ownership risk from the moment of purchase to the moment of sale?",
      plain: "If the goods are damaged or lost between when you bought them and when you sell them - is that your loss?",
      principle: "Murabahah is only valid if the seller genuinely bears ownership risk. A seller who has arranged the goods to pass straight from supplier to buyer without ever bearing the risk of ownership has not genuinely owned them. Their \"profit\" is then the return from a loan, not a trade.",
      opts: [
        { label: "Yes, I bear full ownership risk from purchase to sale", sub: "If lost, it is my loss", val: "yes", w: {} },
        { label: "No, the goods go straight from supplier to buyer without real risk on my side", sub: "", val: "no", w: { no_own: 2 } },
      ],
    },
    {
      phase: 1,
      text: "Does the outstanding payment increase if the buyer is late?",
      plain: "The buyer owes you the agreed Murabahah price. If they are late - does the amount grow?",
      principle: "The Dayn from the Murabahah is fixed. Any increase is Riba al-Nasi'ah.",
      opts: [
        { label: "No, the agreed price stays fixed", sub: "", val: "no", w: {} },
        { label: "Yes, late payment increases the total", sub: "", val: "yes", w: { dayn_grows: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // SALAM (ADVANCE PURCHASE)
  // ──────────────────────────────────────────
  salam: [
    {
      phase: 0,
      text: "Is the price paid in full at the time of the Salam contract?",
      plain: "In Salam, the buyer pays the full price now to receive goods later. Have you paid in full upfront?",
      principle: "The Prophet \u2E3B: \"Whoever does Salam, let him do it for a known quantity, a known quality, and a known time\" (Sahih al-Bukhari 2240; Sahih Muslim 1604). Salam requires full payment upfront - this is one of its defining conditions and what distinguishes it from a forward contract.",
      opts: [
        { label: "Yes, full price paid at the time of contract", sub: "", val: "yes", w: {} },
        { label: "Only a deposit - full payment later", sub: "This is not valid Salam", val: "no", w: { salam_invalid: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Is the quantity, quality, and delivery time precisely specified?",
      plain: "Does the contract specify exactly: how much (weight, volume, count), what quality grade, and what delivery date?",
      principle: "The Prophet \u2E3B required three knowable conditions for Salam: known quantity (Kayl Ma'lum), known quality (Sifah Ma'lumah), known time (Ajal Ma'lum). Vagueness in any of these introduces Gharar that invalidates the contract.",
      opts: [
        { label: "Yes, all three are precisely specified", sub: "", val: "yes", w: {} },
        { label: "Some are specified, some are vague", sub: "", val: "partial", w: { gharar: 2 } },
        { label: "Not specified - to be determined at delivery", sub: "", val: "no", w: { gharar: 3 } },
      ],
    },
    {
      phase: 0,
      text: "Can the seller deliver the goods from their normal production or supply - or does delivery depend on someone else providing them at that time?",
      plain: "Is the seller a genuine producer or reliable supplier of these goods? Or might they fail to deliver if market conditions change?",
      principle: "Salam is typically invalid for goods that are unique or whose delivery depends entirely on external factors beyond the seller's control. The reason: the risk of Gharar in delivery becomes too high. Salam works best for fungible, standardly produced agricultural or manufactured goods.",
      opts: [
        { label: "Yes, seller is a genuine producer or reliable supplier", sub: "", val: "yes", w: {} },
        { label: "Uncertain - delivery depends on market availability", sub: "", val: "uncertain", w: { gharar: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // CRYPTO AS INVESTMENT
  // ──────────────────────────────────────────
  crypto_invest: [
    {
      phase: 3,
      text: "Does the cryptocurrency you are investing in meet any of the Ribawi characteristics?",
      plain: "We established that fiat currency fails all seven characteristics of the Ribawi items. Does this crypto do any better?",
      principle: "The seven Ribawi characteristics: (1) Mithiliyyah - fungibility; (2) Measurability; (3) Qimah Dhatiyyah - intrinsic value; (4) Baqa' - durability of value; (5) Rawaj - universal natural acceptance; (6) Sifah Ma'lumah - knowable quality; (7) Hajah 'Ammah - essential utility. No cryptocurrency fully meets all seven. Bitcoin meets some. Most altcoins meet very few.",
      opts: [
        { label: "Bitcoin - meets fungibility, measurability, fixed supply; lacks intrinsic value, universal acceptance", sub: "", val: "bitcoin", w: { fiat_question: 1 } },
        { label: "A utility token - limited fungibility, limited acceptance, genuine but limited utility", sub: "", val: "utility_token", w: { fiat_question: 1 } },
        { label: "A meme coin or speculative token - meets almost none", sub: "", val: "meme", w: { speculative: 3, gharar: 3 } },
        { label: "A stablecoin - inherits fiat's characteristics (or lack thereof)", sub: "", val: "stable", w: { fiat_question: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Is your investment based on genuine assessment of the asset, or pure speculation?",
      plain: "Have you researched what this crypto actually does, its real utility, its long-term value proposition? Or are you buying because others are buying and you hope the price rises?",
      principle: "Maysir (gambling) involves committing money to an uncertain outcome for pure gain, without productive contribution or genuine economic basis. Pure FOMO-driven crypto investment, with no genuine assessment of underlying value, approaches Maysir in its structure.",
      opts: [
        { label: "Genuine assessment - I understand what I am buying and why", sub: "", val: "informed", w: {} },
        { label: "Speculative - buying because of price trends or social media", sub: "", val: "fomo", w: { speculative: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Are you using leverage or borrowing to fund this crypto investment?",
      plain: "Is your investment larger than what you actually own?",
      principle: "Leverage on crypto adds Riba (from the borrowing), Gharar (from the amplified uncertainty), and Maysir (gambling nature of the amplified position). The Prophet \u2E3B sought refuge from crushing debt daily. Leveraged crypto positions can generate inescapable Dayn rapidly.",
      opts: [
        { label: "No, only my own money", sub: "", val: "no", w: {} },
        { label: "Yes, leveraged or margin", sub: "", val: "yes", w: { leverage: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // BUSINESS FINANCE
  // ──────────────────────────────────────────
  business_finance: [
    {
      phase: 0,
      text: "What does the bank or financier actually provide?",
      plain: "At the end of this arrangement, what does your business receive?",
      principle: "The first question for any business finance product: is money being lent at interest under a different name, or is there genuine trade or partnership at the core? The primary source test applies regardless of whether the client is a person or a business.",
      opts: [
        { label: "Cash / working capital deposited into my business account", sub: "", val: "cash", w: { cash: 2 } },
        { label: "Equipment or machinery I actually use", sub: "Asset-backed finance - Ijarah or Murabahah", val: "asset", w: {} },
        { label: "Inventory / stock for my business", sub: "Trade finance", val: "inventory", w: {} },
        { label: "A share in the business - the bank becomes a partner", sub: "Musharakah", val: "musharakah", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Is the bank's return fixed and predetermined - or does it share in the actual profit and loss of your business?",
      plain: "Before you signed: could you calculate exactly what the bank would earn, regardless of whether your business did well or badly?",
      principle: "A fixed return on business finance - regardless of how the business performs - is the economic fingerprint of a loan with interest, not of a genuine business partnership. Genuine Musharakah or Mudarabah: the financier's return depends on actual business outcomes. If the business loses, the financier loses.",
      opts: [
        { label: "Fixed - the bank's return is a set amount regardless of my performance", sub: "", val: "fixed", w: { fixed_return: 3 } },
        { label: "Variable - the bank shares in my actual profits and losses", sub: "Genuine Musharakah or Mudarabah", val: "variable", w: {} },
        { label: "Mainly fixed with a small profit-share element", sub: "", val: "hybrid", w: { fixed_return: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Does the bank genuinely own the asset it is financing - and bear the risk of that ownership?",
      plain: "If it is equipment or inventory financing - did the bank buy the asset, own it, bear the risk of it before selling or leasing it to you? Or did it simply pay your supplier directly on your behalf?",
      principle: "\"Do not sell what you do not have\" (Sunan al-Tirmidhi 1232). A bank that pays your supplier without ever holding the asset and bearing its risk has not genuinely owned it. Its \"profit\" on that non-ownership is not the return from Bay' - it is a finance charge.",
      opts: [
        { label: "Yes, the bank genuinely owned and bore risk of the asset", sub: "", val: "yes", w: {} },
        { label: "No, the bank paid the supplier directly, never really owning it", sub: "", val: "no", w: { no_own: 3 } },
        { label: "Technically yes, but only for a moment with no real risk", sub: "", val: "nominal", w: { nominal_own: 2 } },
        { label: "No real asset - this is a cash facility", sub: "", val: "none", w: { no_own: 2 } },
      ],
    },
    {
      phase: 1,
      text: "If your business struggles and you cannot make a payment - does the outstanding amount increase?",
      plain: "Late or missed payment: does the bank add charges that grow your balance?",
      principle: "Riba al-Nasi'ah applies to business Dayn exactly as it applies to personal Dayn. The outstanding obligation is fixed. Any increase arising from delay or difficulty is Riba.",
      opts: [
        { label: "No, the balance stays the same", sub: "", val: "no", w: {} },
        { label: "Yes, late payment triggers additional charges or penalty interest", sub: "", val: "yes", w: { dayn_grows: 3 } },
      ],
    },
    {
      phase: 2,
      text: "Strip test: remove the asset or business activity - is what remains just a loan with a fixed return?",
      plain: "Imagine the equipment, inventory, or business were not there. Bank gives money, business gives back more money at a fixed rate. Is that what this is?",
      principle: "Ibn Qayyim: if removing the asset reveals a loan with a predetermined return, the asset is a Hilah. The Islamic Fiqh Academy's classification of organised Tawarruq applies equally to business contexts.",
      opts: [
        { label: "No, the arrangement is genuinely structured around the business asset or activity", sub: "", val: "no", w: {} },
        { label: "Yes, it is essentially a cash loan with an Islamic label", sub: "", val: "yes", w: { hila: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // REMITTANCE
  // ──────────────────────────────────────────
  remittance: [
    {
      phase: 3,
      text: "Is the exchange rate for your remittance agreed and disclosed before you hand over your money?",
      plain: "Do you know exactly how many units of the destination currency the recipient will receive - before you send?",
      principle: "Sarf (currency exchange) requires that the price (exchange rate) be known at the point of contract. Accepting an unknown rate to be applied after the money is sent introduces Gharar (uncertainty) into the exchange.",
      opts: [
        { label: "Yes, exact rate disclosed and locked in before sending", sub: "", val: "yes", w: {} },
        { label: "An indicative rate only - actual rate applied later", sub: "", val: "indicative", w: { gharar: 1 } },
        { label: "The rate is hidden in the fee - I do not know the true exchange rate", sub: "", val: "hidden", w: { gharar: 2 } },
      ],
    },
    {
      phase: 3,
      text: "Does the full amount reach the recipient on the same day or within T+2?",
      plain: "How quickly does the money actually arrive with the recipient? Is there a delay of days or weeks?",
      principle: "Sarf requires Yadan bi-yad - immediate bilateral exchange. For practical remittance, same-day or next-day settlement is broadly accepted by contemporary scholars as satisfying this requirement. Multi-day delays raise the question of what is happening to the funds in the interim.",
      opts: [
        { label: "Same day or next day", sub: "", val: "same_day", w: {} },
        { label: "2\u20133 business days", sub: "Standard international transfer", val: "t2", w: {} },
        { label: "More than 3 days", sub: "", val: "slow", w: { dayn_grows: 1 } },
      ],
    },
    {
      phase: 0,
      text: "Is there a fixed fee for this remittance - or is the provider profiting through a hidden exchange rate margin?",
      plain: "Some providers charge a transparent flat fee. Others offer a \"zero fee\" but use a worse exchange rate to make their profit. Do you know exactly what you are paying?",
      principle: "A transparent fee for a genuine service (Ijarah on the transfer service) is permissible. Hidden margin in the exchange rate is not prohibited per se - but lack of disclosure creates Gharar and potentially approaches Ghashsh (deception). The Prophet \u2E3B: \"Whoever deceives us is not of us\" (Sahih Muslim 102).",
      opts: [
        { label: "Transparent, disclosed fee - I know exactly what I am paying", sub: "", val: "transparent", w: {} },
        { label: "No stated fee but the exchange rate is worse than the market", sub: "Hidden margin", val: "hidden_margin", w: { fee_structure: 1 } },
        { label: "Both a fee and a worse exchange rate", sub: "", val: "both", w: { fee_structure: 1 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // GIFT / DONATION
  // ──────────────────────────────────────────
  gift: [
    {
      phase: 0,
      text: "Are you giving this money freely - with no expectation of return, material or otherwise?",
      plain: "A genuine gift (Hibah) in Islam requires: (1) you own what you are giving; (2) you give it freely; (3) the recipient accepts it; (4) you have no expectation of getting it back or receiving anything in return.",
      principle: "Hibah (gift) is one of the most praised acts in Islamic law. The Prophet \u2E3B: \"Give gifts to one another, for gifts remove rancour from the heart\" (Muwatta' of Imam Malik). The conditions of a valid Hibah are: genuine ownership, free giving, genuine receipt. A gift given with the expectation of a reciprocal gift of equal or greater value is a transaction, not a Hibah.",
      opts: [
        { label: "Yes, pure gift, freely given, no expectation of return", sub: "Genuine Hibah - entirely permissible", val: "pure", w: {} },
        { label: "Mostly yes, but I would appreciate them doing something for me in return", sub: "This may make it a transaction rather than a gift", val: "expectation", w: { fee_structure: 1 } },
        { label: "I expect them to give me a gift back of similar value", sub: "This is a transaction, not a Hibah", val: "reciprocal", w: { fee_structure: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Is what you are giving Halal - did you acquire it through permissible means?",
      plain: "Can you only give in charity what you own, and only what you acquired permissibly. Giving money earned through Riba or Haram sources does not purify either the source or the gift.",
      principle: "The Prophet \u2E3B: \"Allah is pure and accepts only what is pure\" (Sahih Muslim 1015). Sadaqah (charity) from impermissible earnings does not generate reward - it may even generate sin. If you have earnings mixed with Riba (such as bank interest), the Riba portion should be given away not as Sadaqah seeking reward, but as Tasarruf (disposal) to purify your wealth.",
      opts: [
        { label: "Yes, earned through clearly permissible means", sub: "", val: "yes", w: {} },
        { label: "Mostly yes - some income from permissible sources, some possibly not", sub: "", val: "mixed", w: { mixed: 1 } },
        { label: "I am giving away Riba earnings from a bank account", sub: "This is Tasarruf (disposal), not Sadaqah - no reward but it purifies", val: "riba_disposal", w: {} },
      ],
    },
    {
      phase: 0,
      text: "Is this gift going toward a Halal purpose?",
      plain: "Will the recipient use this for something permissible? Giving money to someone you know will use it for Haram purposes makes you a participant in the Haram.",
      principle: "Surah Al-Ma'idah 5:2: \"Cooperate with one another in righteousness and piety, and do not cooperate in sin and aggression.\" Knowingly giving wealth that will be used for Haram - alcohol, gambling, Riba-based activity - is participation in that Haram.",
      opts: [
        { label: "Yes, clearly permissible purpose", sub: "", val: "yes", w: {} },
        { label: "Unknown - I am not sure how it will be used", sub: "", val: "unknown", w: {} },
        { label: "No, I know it will be used for something prohibited", sub: "", val: "no", w: { haram: 3 } },
      ],
    },
  ],

  // ──────────────────────────────────────────
  // OTHER IFI PRODUCT
  // ──────────────────────────────────────────
  other_finance: [
    {
      phase: 0,
      text: "Regardless of the product name - does more money return to the financier than they provided?",
      plain: "Strip away all the Arabic names, all the product branding, all the documentation. Bank provides X. Bank receives back more than X. Yes or no?",
      principle: "This is the primary source test applied directly to the economic outcome. The root R-B-W: the excess above the principal. No product name, Shariah committee approval, or contractual structure changes what this is if the economic substance is: money in \u2192 more money out \u2192 by prior agreement.",
      opts: [
        { label: "Yes, the financier receives more than they provided", sub: "The return is predetermined", val: "yes", w: { riba_core: 2 } },
        { label: "No, the financier shares in actual outcomes", sub: "They could receive less, or nothing, if things go badly", val: "no", w: {} },
        { label: "I genuinely do not know", sub: "", val: "unclear", w: { unclear: 2 } },
      ],
    },
    {
      phase: 0,
      text: "Was a real, tangible asset genuinely involved - with real ownership and real risk?",
      plain: "Was there an actual physical thing (property, equipment, goods) that the bank genuinely owned, bore risk of, and transferred - or was the asset just paperwork to support a cash transaction?",
      principle: "Bay' (trade) requires a real Mabi' - an object of sale with genuine existence, utility, and transferable ownership. Without it, the transaction is structurally Qard regardless of its name.",
      opts: [
        { label: "Yes, a genuinely owned, genuinely risky real asset", sub: "", val: "yes", w: {} },
        { label: "An asset existed on paper but the bank never really owned or risked it", sub: "", val: "nominal", w: { nominal_own: 2 } },
        { label: "No real asset - purely a cash or financial instrument transaction", sub: "", val: "no", w: { no_own: 3 } },
      ],
    },
    {
      phase: 1,
      text: "Does the outstanding amount you owe increase if you are late or in difficulty?",
      plain: "If you miss a payment - does your balance grow?",
      principle: "Riba al-Nasi'ah: any growth in the Dayn through delay, regardless of the product structure.",
      opts: [
        { label: "No, the balance stays fixed", sub: "", val: "no", w: {} },
        { label: "Yes, late payment increases the outstanding balance", sub: "", val: "yes", w: { dayn_grows: 3 } },
      ],
    },
    {
      phase: 2,
      text: "The strip test: if you removed all the non-cash elements - is what remains just a loan?",
      plain: "Take away the asset, the commodity, the trade steps. Is this: I give you money, you give me back more money?",
      principle: "Ibn Qayyim's Hila test. Ibn Taymiyyah's verdict. The Islamic Fiqh Academy's position on Tawarruq. All converge on this: the form does not sanctify the substance.",
      opts: [
        { label: "No, the transaction genuinely depends on the non-cash elements", sub: "", val: "no", w: {} },
        { label: "Yes, it is essentially a loan with extra steps", sub: "", val: "yes", w: { hila: 3 } },
      ],
    },
  ],
};
