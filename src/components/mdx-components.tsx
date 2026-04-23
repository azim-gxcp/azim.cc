import type { MDXComponents } from "mdx/types";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return <blockquote className="pull-quote">{children}</blockquote>;
}

export function DropCap({ children }: { children: React.ReactNode }) {
  return <p className="drop-cap">{children}</p>;
}

export function Arabic({ children }: { children: React.ReactNode }) {
  return <span lang="ar">{children}</span>;
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "28px",
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: "-0.015em",
        color: "var(--fg1)",
        margin: "2.5em 0 0",
        fontVariationSettings: "'opsz' 72",
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "18px",
        lineHeight: 1.8,
        color: "var(--fg1)",
      }}
      {...props}
    />
  ),
  blockquote: (props) => <blockquote className="pull-quote" {...props} />,
  code: (props) => (
    <code
      style={{
        fontFamily: "var(--font-mono-family)",
        fontSize: "0.925em",
        background: "var(--bg-muted)",
        padding: "2px 6px",
        borderRadius: "4px",
      }}
      {...props}
    />
  ),
  em: (props) => <em {...props} />,
  PullQuote,
  DropCap,
  Arabic,
};
