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
    requestAnimationFrame(() => {
      listRef.current?.focus({ preventScroll: false });
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className={className}>
      <div
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Showing {startOrdinal} to {endOrdinal} of {items.length} {itemLabel}
      </div>

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
                       hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6eb7c7] focus-visible:ring-offset-1"
            style={{ borderColor: '#e5e7eb' }}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isEllipsis = totalPages > 7 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages;
            const isEdge = p === 1 || p === totalPages;
            if (isEllipsis && !isEdge) {
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
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6eb7c7] focus-visible:ring-offset-1"
                style={
                  p === page
                    ? { backgroundColor: '#6eb7c7', color: '#ffffff' }
                    : { color: '#374151' }
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
                       hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6eb7c7] focus-visible:ring-offset-1"
            style={{ borderColor: '#e5e7eb' }}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}

      <p className="mt-4 text-center text-sm text-gray-500" aria-hidden="true">
        Showing {startOrdinal}–{endOrdinal} of {items.length} {itemLabel}
      </p>
    </div>
  );
}