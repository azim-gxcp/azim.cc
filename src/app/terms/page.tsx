import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service, disclaimers, and privacy information for azim.cc.",
};

export default function TermsPage() {
  const sectionTitle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: 1.3,
    color: "var(--fg1)",
    margin: "2.5em 0 0.75em",
    fontVariationSettings: "'opsz' 48",
  };

  const bodyText: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    lineHeight: 1.75,
    color: "var(--fg2)",
    margin: "0 0 1em",
  };

  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-10 py-14 pb-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--fg1)",
          marginBottom: "0.5em",
          fontVariationSettings: "'opsz' 72",
        }}
      >
        Terms of Service
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--fg3)",
          marginBottom: "3rem",
        }}
      >
        Last updated: 25 April 2026
      </p>

      <h2 style={sectionTitle}>1. Acceptance of Terms</h2>
      <p style={bodyText}>
        By accessing and using azim.cc (the "Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the Site.
      </p>

      <h2 style={sectionTitle}>2. Content and Opinions</h2>
      <p style={bodyText}>
        All articles, essays, and commentary published on this Site represent the personal opinions and analysis of the author, M Azim Abdul Majeed. They do not constitute professional advice of any kind, including but not limited to financial, legal, religious, or investment advice.
      </p>
      <p style={bodyText}>
        The content is provided for informational and educational purposes only. You should not rely on any content published here as a substitute for professional advice tailored to your specific circumstances.
      </p>

      <h2 style={sectionTitle}>3. No Financial or Investment Advice</h2>
      <p style={bodyText}>
        Nothing on this Site should be construed as financial advice, investment advice, trading advice, or any recommendation to buy, sell, or hold any financial instrument, cryptocurrency, or asset. Any discussion of financial products, markets, or instruments is purely analytical and educational.
      </p>
      <p style={bodyText}>
        Past performance discussed in any article is not indicative of future results. All investment and financial decisions carry risk, and you are solely responsible for your own financial decisions.
      </p>

      <h2 style={sectionTitle}>4. No Religious Authority</h2>
      <p style={bodyText}>
        Articles discussing Islamic finance, Shariah compliance, or religious topics reflect the author's personal research and interpretation. They do not represent fatwas, formal religious rulings, or the position of any Islamic institution or scholar. Readers should consult qualified Islamic scholars for religious guidance.
      </p>

      <h2 style={sectionTitle}>5. Accuracy and Errors</h2>
      <p style={bodyText}>
        While every effort is made to ensure the accuracy of content, the author makes no warranties or representations regarding the completeness, accuracy, reliability, or currency of any information on this Site. Errors and omissions may occur.
      </p>

      <h2 style={sectionTitle}>6. Newsletter and Subscriber Terms</h2>
      <p style={bodyText}>
        By subscribing to the newsletter, you consent to receive email communications about new articles and updates. You may unsubscribe at any time using the link provided in every email.
      </p>
      <p style={bodyText}>
        The author reserves the right to deactivate or remove any subscriber account at any time, with or without notice, for any reason including but not limited to: breach of these terms, suspected abuse, spam behaviour, or conduct deemed harmful to the community.
      </p>

      <h2 style={sectionTitle}>7. Comments</h2>
      <p style={bodyText}>
        Comments are moderated before publication. The author reserves the right to reject, edit, or remove any comment for any reason. By submitting a comment, you grant the Site a non-exclusive licence to display your comment publicly alongside the relevant article.
      </p>
      <p style={bodyText}>
        You agree not to submit comments that are abusive, defamatory, hateful, discriminatory, contain personal attacks, spam, or promote illegal activity.
      </p>

      <h2 style={sectionTitle}>8. Intellectual Property</h2>
      <p style={bodyText}>
        All original content on this Site, including text, graphics, and design, is the intellectual property of M Azim Abdul Majeed unless otherwise stated. You may share links to articles freely. Reproducing full articles without written permission is prohibited. If any part of this work is quoted, referenced, or used elsewhere, due credit must be given to the author by name (M Azim Abdul Majeed) and by linking to https://azim.cc.
      </p>

      <h2 style={sectionTitle}>9. Third-Party Links</h2>
      <p style={bodyText}>
        The Site may contain links to external websites. The author has no control over the content, policies, or practices of third-party sites and accepts no responsibility for them.
      </p>

      <h2 style={sectionTitle}>10. Privacy</h2>
      <p style={bodyText}>
        The Site collects minimal personal data: email addresses and optional names for newsletter subscriptions, and names and emails for comment submissions. This data is stored securely and is not sold or shared with third parties. Analytics data is collected via Vercel Analytics in aggregate form.
      </p>

      <h2 style={sectionTitle}>11. Limitation of Liability</h2>
      <p style={bodyText}>
        To the fullest extent permitted by law, the author shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or reliance on any content published on this Site.
      </p>

      <h2 style={sectionTitle}>12. Changes to These Terms</h2>
      <p style={bodyText}>
        These terms may be updated from time to time. Continued use of the Site after any changes constitutes acceptance of the revised terms. The "Last updated" date at the top will reflect the most recent revision.
      </p>

      <h2 style={sectionTitle}>13. Contact</h2>
      <p style={bodyText}>
        For questions about these terms, contact via the methods listed on the About page.
      </p>
    </div>
  );
}
