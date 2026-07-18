// Renders a short, scannable summary box near the top of an article.
// Fed by the post's `summary` frontmatter array. Answer engines and LLMs
// preferentially lift concise, factual points like these, so this is the
// most citation-friendly on-page element after the FAQ blocks.
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      style={{
        margin: "0 0 2.5rem",
        padding: "20px 24px",
        borderRadius: "12px",
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-muted)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--brand)",
          marginBottom: "12px",
        }}
      >
        Key takeaways
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: "1.1em",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--fg2)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
