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
          color: "var(--fg3)",
          marginBottom: "20px",
        }}
      >
        Thoughts and posts by Azim
      </div>
      <h1
        className="m-0 mb-5"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "var(--fg1)",
          fontVariationSettings: "'opsz' 144",
        }}
      >
        On <em style={{ fontStyle: "italic", color: "var(--brand)" }}>money</em>
        ,{" "}
        <em style={{ fontStyle: "italic", color: "var(--brand)" }}>markets</em>,
        <br />
        and what we owe each other.
      </h1>
      <p
        className="m-0"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "var(--fg2)",
          maxWidth: "60ch",
        }}
      >
        Long-form essays on economics, finance, and Islamic finance, plus the
        occasional thought that will not leave me alone.
      </p>
    </section>
  );
}
