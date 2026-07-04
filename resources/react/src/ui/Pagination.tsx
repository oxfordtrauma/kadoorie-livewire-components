/**
 * Project: Kadoorie Livewire Components
 * File: Pagination.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
  onEachSide?: number;
}

/**
 * Build a windowed page list (first, a slider around the current page, last)
 * with `null` markers standing in for the ellipsis gaps — the client-side port
 * of Laravel's paginator window used by the Blade `pagination` view.
 */
function windowed(current: number, total: number, onEachSide: number): Array<number | null> {
  if (total <= onEachSide * 2 + 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: Array<number | null> = [];
  const start = Math.max(2, current - onEachSide);
  const end = Math.min(total - 1, current + onEachSide);

  pages.push(1);

  if (start > 2) {
    pages.push(null);
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < total - 1) {
    pages.push(null);
  }

  pages.push(total);

  return pages;
}

/**
 * Accessible pagination with prev/next controls and a windowed page list. The
 * current page is a non-interactive `aria-current="page"` marker. Mirrors the
 * Blade `pagination` view's markup and data-test hooks; renders nothing when a
 * single page.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  label = 'Pagination',
  onEachSide = 1,
  className,
  ...rest
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const onFirstPage = currentPage <= 1;
  const onLastPage = currentPage >= totalPages;
  const pages = windowed(currentPage, totalPages, onEachSide);

  return (
    <nav
      role="navigation"
      aria-label={label}
      data-test="pagination"
      className={cn('flex items-center gap-1', className)}
      {...rest}
    >
      {onFirstPage ? (
        <span
          aria-disabled="true"
          data-test="pagination-prev"
          className="inline-flex min-h-11 min-w-11 cursor-not-allowed items-center justify-center rounded-md px-2 text-text-disabled"
        >
          <Icon name="chevron-left" size="sm" />
          <span className="sr-only">Previous page</span>
        </span>
      ) : (
        <button
          type="button"
          rel="prev"
          aria-label="Previous page"
          data-test="pagination-prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-text-body hover:bg-surface-muted"
        >
          <Icon name="chevron-left" size="sm" />
        </button>
      )}

      {pages.map((page, index) =>
        page === null ? (
          <span key={`gap-${index}`} aria-hidden="true" className="px-1 text-text-muted-large">
            &hellip;
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            data-test="pagination-page"
            className="kad-nums inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-2 text-sm font-medium text-on-primary"
          >
            {page}
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Go to page ${page}`}
            data-test="pagination-page"
            onClick={() => onPageChange(page)}
            className="kad-focusable kad-nums inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm text-text-body hover:bg-surface-muted"
          >
            {page}
          </button>
        )
      )}

      {onLastPage ? (
        <span
          aria-disabled="true"
          data-test="pagination-next"
          className="inline-flex min-h-11 min-w-11 cursor-not-allowed items-center justify-center rounded-md px-2 text-text-disabled"
        >
          <Icon name="chevron-right" size="sm" />
          <span className="sr-only">Next page</span>
        </span>
      ) : (
        <button
          type="button"
          rel="next"
          aria-label="Next page"
          data-test="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          className="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-text-body hover:bg-surface-muted"
        >
          <Icon name="chevron-right" size="sm" />
        </button>
      )}
    </nav>
  );
}
