import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative mt-24 bg-[#470a70] border-[#47a9ff]/15"
      style={{
        background: "radial-gradient(ellipse 80% 100% at bottom center, #7c1da9, #340766)",
      }}
    >

    <div className="absolute w-[calc(100%-20px)] h-[calc(100%-20px)] top-2.5 left-2.5 border border-white/50 " />

      <div
        className="relative max-w-300 mx-auto px-5 md:px-10 pt-18 pb-12 grid gap-16 md:grid-cols-[1.2fr_2fr]"
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "white",
            }}
          >
            M Azim Abdul Majeed
            <span style={{ color: "var(--green-5)" }}>.</span>
          </div>
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontStyle: "italic",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "36ch",
            }}
          >
            Articles on money, economics, finance, Islamic finance, and whatever
            else I cannot stop thinking about.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#17a210",
                marginBottom: "4px",
              }}
            >
              Read
            </div>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "All Articles" },
                { href: "/category/islamic-finance", label: "Islamic Finance" },
                { href: "/category/economics", label: "Economics" },
                { href: "/category/finance", label: "Finance" },
                { href: "/category/crypto", label: "Crypto" },
                { href: "/category/education", label: "Education" },
                { href: "/category/unfiltered", label: "Unfiltered" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline hover:underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#17a210",
                marginBottom: "4px",
              }}
            >
              Follow
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: "Email newsletter", href: "/newsletter" },
                { label: "RSS", href: "/feed.xml" },
                { label: "Twitter / X", href: "https://x.com/EduTechOne" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/azim-gx/" },
              ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="no-underline hover:underline"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#17a210",
                marginBottom: "4px",
              }}
            >
              This site
            </div>
            <div className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About" },
                { href: "/reading-list", label: "Reading List" },
                { href: "/tools/mizan", label: "Mizan" },
                { href: "/terms", label: "Terms" },
                { href: "#", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="no-underline hover:underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-[1200px] mx-auto px-5 md:px-10 py-6 flex flex-col sm:flex-row justify-between gap-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <span>Opinions are mine alone.</span>
        <span>&copy; {new Date().getFullYear()} M Azim Abdul Majeed</span>
      </div>
    </footer>
  );
}
