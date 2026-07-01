import { useState, useRef, useId } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedListProps<T> {
  items: T[];
  pageSize?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Describes what is being paginated, e.g. "news articles" */
  itemLabel?: string;
  className?: string;
  gridClassName?: string;
}

/**
 * Accessible replacement for infinite scroll and carousels.
 *
 * Why pagination > infinite scroll for accessibility:
 * - Screen reader users lose context with infinite scroll; they can't jump
 *   to "page 3 of results" or return to a known position.
 * - Keyboard users can't predict where focus lands after content loads.
 * - Motor-impaired users can't reliably trigger the load-more trigger zone.
 *
 * This component satisfies:
 * - WCAG 2.4.3 (Focus Order): focus moves to the first new item after page change.
 * - WCAG 2.4.6 (Headings / Labels): page status announced via aria-live.
 * - WCAG 1.3.1 (Info & Relationships): nav landmark, aria-label on buttons.
 * - WCAG 2.1.1 (Keyboard): full keyboard operation with visible focus styles.
 */
export default function PaginatedList<T>({
  items,
  pageSize = 6,
  renderItem,
  itemLabel = 'items',
  className = '',
  gridClassName = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6',
}: PaginatedListProps<T>) {
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const statusId = useId();

  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  const startOrdinal = start + 1;
  const endOrdinal = Math.min(start + pageSize, items.length);

  const goTo = (next: number) => {
    setPage(next);
    // Move focus to the list container so the next batch is immediately
    // reachable by Tab (WCAG 2.4.3) and the status region update is heard.
    requestAnimationFrame(() => {
      listRef.current?.focus({ preventScroll: false });
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className={className}>
      {/* Status region: announces page changes to screen readers politely */}
      <div
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Showing {startOrdinal} to {endOrdinal} of {items.length} {itemLabel}
      </div>

      {/* List — tabIndex="-1" makes it programmatically focusable without
          adding it to the natural tab order */}
      <div
        ref={listRef}
        tabIndex={-1}
        className={`${gridClassName} focus:outline-none`}
        aria-label={`${itemLabel}, page ${page} of ${totalPages}`}
      >
        {slice.map((item, i) => renderItem(item, start + i))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label={`${itemLabel} pagination`}
          className="mt-10 flex items-center justify-center gap-2 flex-wrap"
        >
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Go to previous page"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border
                       transition-all disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#6eb7c7' } as React.CSSProperties}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isEllipsis = totalPages > 7 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages;
            const isEdge = p === 1 || p === totalPages;
            if (isEllipsis && !isEdge) {
              // Only render one ellipsis on each side
              const leftGap = p === 2;
              const rightGap = p === totalPages - 1;
              if (leftGap || rightGap) {
                return (
                  <span key={p} aria-hidden="true" className="px-1 text-gray-400 select-none">
                    &hellip;
                  </span>
                );
              }
              return null;
            }
            return (
              <button
                key={p}
                onClick={() => goTo(p)}
                aria-label={`Go to page ${p}`}
                aria-current={p === page ? 'page' : undefined}
                className="w-10 h-10 rounded-lg text-sm font-semibold transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={
                  p === page
                    ? { backgroundColor: '#6eb7c7', color: '#ffffff', '--tw-ring-color': '#6eb7c7' }
                    : { color: '#374151', '--tw-ring-color': '#6eb7c7' }
                }
                onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = '#f0f9fb'; }}
                onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Go to next page"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border
                       transition-all disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{ borderColor: '#e5e7eb', '--tw-ring-color': '#6eb7c7' } as React.CSSProperties}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}

      {/* Visible page status below pagination — useful for all users */}
      <p className="mt-4 text-center text-sm text-gray-500" aria-hidden="true">
        Showing {startOrdinal}–{endOrdinal} of {items.length} {itemLabel}
      </p>
    </div>
  );
}
