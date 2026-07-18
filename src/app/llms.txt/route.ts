import { getAllPosts } from "@/lib/posts";

// Prerendered at build time; content only changes on deploy.
export const dynamic = "force-static";

const SITE_URL = "https://azim.cc";

export async function GET() {
  const posts = getAllPosts();

  const articleList = posts
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.lede}`)
    .join("\n");

  const body = `# azim.cc

> Personal blog of M Azim Abdul Majeed. Independent analysis of economics, finance, Islamic finance, monetary systems, cryptocurrency, blockchain, and first-principles economic design.

## About the Author

M Azim Abdul Majeed writes at the intersection of modern finance and Islamic jurisprudence on exchange. His work examines monetary architecture, the structural mechanics of interest-based money creation, first-principles monetary design, Bitcoin and cryptocurrency analysis, blockchain-based monetary systems, and the convergence between secular economic analysis and Islamic economic principles.

He is the designer of GX Coin Protocol, a protocol-level monetary architecture, and the creator of Mizan, a diagnostic framework for evaluating financial instruments against classical ribawi characteristics.

## Peer-Reviewed Research

- Mizan: A Primary-Source Diagnostic Framework for Evaluating Islamic Financial Instruments Against Classical Ribawi Characteristics. Journal of Islamic Banking, Economics and Policy (JIBEP), Vol. 2, Issue 2 (June 2026). ISSN (E) 2977-9618. Publisher: Islamic Finance Review (IFR). DOI: https://doi.org/10.63740/xtab6508. Peer-reviewed paper introducing the Mizan diagnostic tool (https://azim.cc/tools/mizan).

## Topics and Expertise

### Islamic Finance
- Riba (interest/usury): linguistic, juridical, and mathematical analysis
- Shariah compliance: architectural vs cosmetic compliance
- Islamic economics: maqasid al-shariah, ribawi characteristics, halal finance
- Islamic banking: structural critique, profit-sharing alternatives

### Economics
- Monetary systems: fiat currency architecture, money creation mechanics
- Monetary policy: inflation, central banking, currency debasement
- Debt architecture: mathematical impossibility of interest-bearing money (M + interest > M)
- Development economics: financial exclusion, remittance extraction

### Finance and Cryptocurrency
- Bitcoin analysis: strengths (fixed supply, decentralisation) and structural failures (volatility, lost coins, energy)
- Blockchain: permissioned vs permissionless, consensus mechanisms, tokenomics
- Cryptocurrency and Shariah: token design, fiqh of money vs fiqh of assets
- Stablecoins, CBDCs, and alternative monetary architectures

### Monetary Architecture
- First-principles monetary design: what money should be if designed from scratch
- GX Coin Protocol: fixed supply, interest-free lending, velocity-based taxation, grant-based distribution
- Convergence thesis: independent first-principles analysis arrives at conclusions identical to classical Islamic economic principles

## Published Articles

${articleList}

## Tools

- [Mizan Diagnostic Engine](${SITE_URL}/tools/mizan): Interactive diagnostic tool for evaluating any financial arrangement against the seven ribawi characteristics derived from classical Islamic jurisprudence.

## Browse by Topic

- [All Tags](${SITE_URL}/tags): Complete topic index. Every article is tagged; each tag has its own page listing related articles (e.g. ${SITE_URL}/tags/riba, ${SITE_URL}/tags/islamic-finance, ${SITE_URL}/tags/bitcoin).

## Key Concepts Referenced

- **Ribawi characteristics**: Seven properties of monetary media derived from the Hadith of Riba al-Fadl (fungibility, intrinsic value, durability, universal acceptance, knowable quality, measurability, essential utility)
- **Mathematical impossibility**: If all money enters circulation as interest-bearing debt, total debt (M + interest) always exceeds money supply (M)
- **Architectural vs cosmetic compliance**: Structuring individual products to satisfy Shariah requirements while operating within a monetary system whose architecture contradicts those requirements
- **Velocity tax**: Progressive tax on idle wealth that replaces conventional taxation, with proceeds distributed to government, charity, and universal basic income
- **Convergence thesis**: First-principles monetary design independently produces architecture identical to classical Islamic economic principles

## Contact

- Website: ${SITE_URL}
- Email: admin@azim.cc
- Twitter/X: https://x.com/EduTechOne
- LinkedIn: https://www.linkedin.com/in/azim-gx/
- RSS: ${SITE_URL}/feed.xml

## Content Licence

All articles are original work by M Azim Abdul Majeed. Content may be cited with attribution.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
