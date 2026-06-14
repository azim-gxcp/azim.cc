import Link from "next/link";

export const PER_PAGE_OPTIONS = ["9", "15", "21", "all"] as const;
export const DEFAULT_PER = "15";

export type PerPage = (typeof PER_PAGE_OPTIONS)[number];

function buildHref(page: number, per: string): string {
  const params = new URLSearchParams();
  if (per !== DEFAULT_PER) params.set("per", per);
  if (page !== 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

/** Windowed list of page numbers with `null` marking an ellipsis gap. */
function pageWindow(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | null)[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push(null);
    result.push(p);
    prev = p;
  }
  return result;
}

export function Pagination({
  currentPage,
  totalPages,
  per,
}: {
  currentPage: number;
  totalPages: number;
  per: string;
}) {
  const showPageNav = per !== "all" && totalPages > 1;

  return (
    <nav className="pagination" aria-label="Article pagination">
      {showPageNav && (
        <ul className="pagination__pages">
          <li>
            {currentPage > 1 ? (
              <Link
                href={buildHref(currentPage - 1, per)}
                className="pagination__link"
                rel="prev"
                aria-label="Previous page"
              >
                ‹ Prev
              </Link>
            ) : (
              <span className="pagination__link pagination__link--disabled" aria-hidden="true">
                ‹ Prev
              </span>
            )}
          </li>

          {pageWindow(currentPage, totalPages).map((p, i) =>
            p === null ? (
              <li key={`gap-${i}`} className="pagination__ellipsis" aria-hidden="true">
                …
              </li>
            ) : (
              <li key={p}>
                <Link
                  href={buildHref(p, per)}
                  className={
                    p === currentPage
                      ? "pagination__link pagination__link--active"
                      : "pagination__link"
                  }
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </Link>
              </li>
            )
          )}

          <li>
            {currentPage < totalPages ? (
              <Link
                href={buildHref(currentPage + 1, per)}
                className="pagination__link"
                rel="next"
                aria-label="Next page"
              >
                Next ›
              </Link>
            ) : (
              <span className="pagination__link pagination__link--disabled" aria-hidden="true">
                Next ›
              </span>
            )}
          </li>
        </ul>
      )}

      <div className="pagination__per">
        <span className="pagination__per-label">Per page</span>
        {PER_PAGE_OPTIONS.map((opt) => (
          <Link
            key={opt}
            href={buildHref(1, opt)}
            className={
              opt === per
                ? "pagination__per-opt pagination__per-opt--active"
                : "pagination__per-opt"
            }
            aria-current={opt === per ? "true" : undefined}
          >
            {opt === "all" ? "All" : opt}
          </Link>
        ))}
      </div>
    </nav>
  );
}
