import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — M Azim Abdul Majeed",
  description:
    "Writer, researcher, and monetary architect. I work at the intersection of economics, Islamic finance, and first-principles monetary design.",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://azim.cc/#person",
    name: "M Azim Abdul Majeed",
    url: "https://azim.cc",
    description:
      "Writer, researcher, and monetary architect working at the intersection of economics, Islamic finance, and first-principles monetary design.",
    jobTitle: "Writer, Researcher, and Monetary Architect",
    knowsAbout: [
      "Islamic finance",
      "Riba",
      "Monetary architecture",
      "Monetary systems",
      "Fiat currency",
      "Inflation",
      "Central banking",
      "Bitcoin",
      "Cryptocurrency",
      "Blockchain",
      "Islamic economics",
      "Maqasid al-shariah",
      "First-principles economic design",
      "GX Coin Protocol",
      "Mizan",
    ],
    sameAs: [
      "https://x.com/EduTechOne",
      "https://www.linkedin.com/in/azim-gx/",
    ],
  },
};

const publicationLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  name: "Mizan: A Primary-Source Diagnostic Framework for Evaluating Islamic Financial Instruments Against Classical Ribawi Characteristics",
  headline:
    "Mizan: A Primary-Source Diagnostic Framework for Evaluating Islamic Financial Instruments Against Classical Ribawi Characteristics",
  author: { "@id": "https://azim.cc/#person" },
  datePublished: "2026-06-30",
  inLanguage: "en",
  url: "https://doi.org/10.63740/xtab6508",
  sameAs: "https://journal.jibep.org/index.php/jibep/article/view/17",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "DOI",
    value: "10.63740/xtab6508",
  },
  keywords: [
    "Islamic FinTech",
    "Shariah compliance",
    "Riba",
    "ribawi characteristics",
    "digital diagnostics",
    "fiat currency",
  ],
  isPartOf: {
    "@type": "PublicationIssue",
    issueNumber: "2",
    datePublished: "2026-06",
    isPartOf: {
      "@type": "PublicationVolume",
      volumeNumber: "2",
      isPartOf: {
        "@type": "Periodical",
        name: "Journal of Islamic Banking, Economics and Policy",
        issn: "2977-9618",
        publisher: {
          "@type": "Organization",
          name: "Islamic Finance Review (IFR)",
        },
      },
    },
  },
  about: {
    "@type": "SoftwareApplication",
    name: "Mizan",
    applicationCategory: "FinanceApplication",
    url: "https://azim.cc/tools/mizan",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationLd) }}
      />
      <header
        className="mb-10 pb-8"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--brand)",
            marginBottom: "14px",
          }}
        >
          About
        </div>
        <h1
          className="m-0 mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "56px",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          M Azim Abdul Majeed
        </h1>
        <p
          className="m-0"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "19px",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--fg2)",
            maxWidth: "56ch",
          }}
        >
          Writer, researcher, and monetary architect working at the intersection
          of economics, Islamic finance, and first-principles system design.
        </p>

        <div
          className="mt-8"
          style={{
            paddingLeft: "16px",
            borderLeft: "2px solid var(--brand)",
          }}
        >
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--fg1)",
              lineHeight: 1.6,
              fontVariationSettings: "'opsz' 72",
            }}
          >
            Be selfish to do good.
          </p>
          <p
            className="m-0 mt-1.5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--fg3)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;If you do good, you do good for yourselves.&rdquo;{" "}
            <span style={{ opacity: 0.7 }}>
              Al-Isra (17:7)
            </span>
          </p>
        </div>
      </header>

      <div className="about-body">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          I study money. Not as a portfolio exercise, but as an architectural
          question: why modern monetary systems produce the outcomes they do, and
          whether better designs are possible. My work sits between the
          quantitative vocabulary of modern economics and the scholarly tradition
          of Islamic jurisprudence on exchange.
        </p>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          I am the designer of{" "}
          <Link href="https://gxcoin.money" target="_blank" rel="noopener noreferrer">
            GX Coin Protocol
          </Link>
          , a productivity-anchored, interest-free monetary architecture built on
          first principles. I also created{" "}
          <Link href="/tools/mizan">Mizan</Link>, a diagnostic framework for
          evaluating financial instruments against the classical{" "}
          <em>ribawi</em> characteristics derived from primary Islamic sources.
        </p>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          A recurring thread in my research is what I call the convergence
          thesis: that rigorous first-principles analysis of what sound money
          should look like independently arrives at conclusions identical to
          those Islamic economics has advocated for centuries. The overlap is not
          cosmetic. It is structural.
        </p>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          This site is a personal project. No sponsor, no paywall, no tracking.
          If you want to get in touch, the email is in the footer; if you want
          to subscribe, the button is everywhere.
        </p>

        <h2
          className="mt-12 mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          What I write about
        </h2>
        <ul
          className="p-0 flex flex-col gap-3.5"
          style={{ listStyle: "none" }}
        >
          {[
            <><strong>Riba, monetary architecture, and the structural mechanics of interest-based money creation.</strong></>,
            <><strong>Islamic finance</strong> beyond compliance: maqasid al-shari&apos;ah, first-principles critique, and systemic reform.</>,
            <><strong>Monetary systems</strong>, fiat currency, inflation, central banking, and the politics of monetary credibility.</>,
            <><strong>Bitcoin, cryptocurrency, and blockchain</strong> as alternative monetary rails, their strengths and structural failures.</>,
            <><strong>First-principles economic design</strong> and the convergence between secular analysis and Islamic economic principles.</>,
          ].map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                lineHeight: 1.8,
                color: "var(--fg1)",
                paddingLeft: "20px",
                position: "relative",
              }}
            >
              <span style={{
                color: "var(--brand)",
                position: "absolute",
                left: 0,
                fontWeight: 700,
              }}>
                /{" "}
              </span>
              {item}
            </li>
          ))}
        </ul>

        <h2
          className="mt-12 mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Peer-reviewed research
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          &ldquo;Mizan: A Primary-Source Diagnostic Framework for Evaluating
          Islamic Financial Instruments Against Classical Ribawi
          Characteristics.&rdquo;{" "}
          <em>Journal of Islamic Banking, Economics and Policy</em> (JIBEP),
          Vol. 2, Issue 2 (June 2026). ISSN 2977-9618.{" "}
          <Link
            href="https://doi.org/10.63740/xtab6508"
            target="_blank"
            rel="noopener noreferrer"
          >
            doi.org/10.63740/xtab6508
          </Link>
          . A peer-reviewed paper introducing{" "}
          <Link href="/tools/mizan">Mizan</Link>, an open-access diagnostic tool
          that evaluates Islamic financial instruments against classical
          jurisprudential criteria derived exclusively from primary sources.
        </p>

        <h2
          className="mt-12 mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            color: "var(--fg1)",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Elsewhere
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "var(--fg1)",
          }}
        >
          You can find me on{" "}
          <Link href="https://x.com/EduTechOne" target="_blank" rel="noopener noreferrer">Twitter / X</Link>, on{" "}
          <Link href="https://www.linkedin.com/in/azim-gx/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>, and the full archive of
          writing on the <Link href="/">Articles</Link> page.
        </p>
      </div>
    </div>
  );
}
