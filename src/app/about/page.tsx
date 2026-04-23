import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — M Azim Abdul Majeed",
  description:
    "I write about economics, finance, and Islamic finance — and I reserve a small corner of the site for thoughts that refuse to fit anywhere else.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
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
          I write about economics, finance, and Islamic finance, and I reserve
          a small corner of the site for thoughts that refuse to fit anywhere
          else.
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
              &mdash; Al-Isra (17:7)
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
          I have spent most of my working life at the edge of two traditions —
          the quantitative vocabulary of modern finance, and the scholarly
          tradition of Islamic jurisprudence on exchange. Much of what I write
          here is an attempt to hold them in the same sentence.
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
          The site is a personal project. There is no sponsor, no paywall, no
          tracking. If you want to get in touch, the email is in the footer; if
          you want to subscribe, the button is everywhere.
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
          Frequently written about
        </h2>
        <ul
          className="p-0 flex flex-col gap-3.5"
          style={{ listStyle: "none" }}
        >
          {[
            <><strong>Ribā, gharar, and the moral geometry of exchange.</strong></>,
            <><strong>Sukūk as an institutional form</strong> — what works, what does not, and why.</>,
            <><strong>Central banks, trust, and the politics of monetary credibility.</strong></>,
            <><strong>Development economics</strong> and the quiet violence of poor policy.</>,
          ].map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                lineHeight: 1.8,
                color: "var(--fg1)",
              }}
            >
              <span style={{ color: "var(--brand)", fontFamily: "var(--font-display)" }}>
                &sect;{" "}
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
          You can find occasional posts on{" "}
          <Link href="https://x.com/EduTechOne" target="_blank" rel="noopener noreferrer">Twitter / X</Link>, longer threads on{" "}
          <Link href="https://www.linkedin.com/in/azim-gx/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>, and a complete archive of older
          writing on the <Link href="/">Essays</Link> page.
        </p>
      </div>
    </div>
  );
}
