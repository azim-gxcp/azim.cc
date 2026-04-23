import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 mb-8 no-underline"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "var(--fg3)",
        textDecoration: "none",
      }}
    >
      <ArrowLeft size={14} />
      All essays
    </Link>
  );
}
