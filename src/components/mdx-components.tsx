import type { MDXComponents } from "mdx/types";
import { Footnote } from "./footnote";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

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
  h2: (props) => {
    const id = slugify(getTextContent(props.children));
    return <h2 id={id} {...props} />;
  },
  h3: (props) => {
    const id = slugify(getTextContent(props.children));
    return <h3 id={id} {...props} />;
  },
  p: (props) => <p {...props} />,
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
  Footnote,
};
