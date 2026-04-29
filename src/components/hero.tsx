export function Hero() {
  return (
    <section className="py-6 pb-12 md:py-8 md:pb-12">
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg2)",
          marginBottom: "20px",
        }}
      >
        Articles by Azim
      </div>
      <h1
        className="m-0 mb-5"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "var(--fg1)",
          fontVariationSettings: "'opsz' 144",
        }}
      >
        On{" "}
        <em style={{ fontStyle: "italic", color: "var(--brand)" }}>money</em>,{" "}
        <em style={{ fontStyle: "italic", color: "var(--brand)" }}>
          monetary systems
        </em>
        ,
        <br />
        and the architecture of justice.
      </h1>
      <p
        className="m-0"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "var(--fg2)",
          maxWidth: "60ch",
        }}
      >
        Economics, Islamic finance, monetary architecture, and first-principles
        thinking about how money should work.
      </p>
    </section>
  );
}
