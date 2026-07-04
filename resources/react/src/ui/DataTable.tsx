/**
 * Project: Kadoorie Livewire Components
 * File: DataTable.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { useDataTable, type DataTableRow } from '../hooks/useDataTable';
import { EmptyState } from './EmptyState';
import { Icon } from './Icon';

export interface DataTableColumn {
  field: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
}

export interface DataTableProps<Row extends DataTableRow> {
  columns: DataTableColumn[];
  rows: Row[];
  perPage?: number;
  selectable?: boolean;
  emptyHeading?: string;
  className?: string;
}

/**
 * Accessible data table that reflows to stacked cards below `md`
 * (`kad-table-stack`), with sortable header buttons (`aria-sort`), optional row
 * selection, and windowed pagination — a faithful port of the Livewire
 * DataTable, driven by `useDataTable`. Mirrors the Blade `data-table` view.
 */
export function DataTable<Row extends DataTableRow>({
  columns,
  rows,
  perPage = 10,
  selectable = false,
  emptyHeading = 'No records found',
  className,
}: DataTableProps<Row>) {
  const table = useDataTable<Row>({ columns, rows, perPage, selectable });

  if (rows.length === 0) {
    return (
      <div data-test="data-table" className={cn('w-full', className)}>
        <EmptyState heading={emptyHeading} />
      </div>
    );
  }

  return (
    <div data-test="data-table" className={cn('w-full', className)}>
      <div className="relative overflow-hidden rounded-lg border border-border">
        <table className="kad-table-stack w-full text-left text-sm" data-test="data-table-table">
          <thead className="bg-surface-muted text-xs uppercase tracking-wide text-text-muted">
            <tr>
              {selectable ? (
                <th scope="col" className="w-10 px-3 py-2">
                  <span className="sr-only">Select</span>
                </th>
              ) : null}
              {columns.map((col) => (
                <th
                  key={col.field}
                  scope="col"
                  aria-sort={table.ariaSort(col.field)}
                  data-test={`data-table-th-${col.field}`}
                  className={cn('px-3 py-2 font-semibold', col.numeric && 'text-right')}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => table.sortBy(col.field)}
                      data-test={`data-table-sort-${col.field}`}
                      className="kad-focusable inline-flex items-center gap-1 hover:text-text"
                    >
                      {col.label}
                      {table.sortField === col.field ? (
                        <Icon
                          name={table.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'}
                          size="sm"
                        />
                      ) : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {table.pageRows.map((row, index) => {
              const id = String(row.id ?? index);

              return (
                <tr key={id} data-test="data-table-row">
                  {selectable ? (
                    <td data-label="Select" className="px-3 py-2">
                      <input
                        type="checkbox"
                        value={id}
                        checked={table.selected.includes(id)}
                        onChange={() => table.toggleSelect(id)}
                        data-test="data-table-select"
                        aria-label="Select row"
                        className="kad-focusable size-5 accent-primary"
                      />
                    </td>
                  ) : null}
                  {columns.map((col) => (
                    <td
                      key={col.field}
                      data-label={col.label}
                      className={cn(
                        'px-3 py-2 text-text-body',
                        col.numeric && 'text-right kad-nums'
                      )}
                    >
                      {String(row[col.field] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {table.totalPages > 1 ? (
        <nav
          aria-label="Table pagination"
          data-test="data-table-pagination"
          className="mt-3 flex items-center justify-between gap-2 text-sm"
        >
          <button
            type="button"
            onClick={table.prevPage}
            disabled={table.page <= 1}
            data-test="data-table-prev"
            className="kad-focusable inline-flex min-h-11 items-center gap-1 rounded-md border border-border px-3 disabled:opacity-50"
          >
            <Icon name="chevron-left" size="sm" />
            Previous
          </button>
          <span className="kad-nums text-text-muted" data-test="data-table-page">
            Page {table.page} of {table.totalPages}
          </span>
          <button
            type="button"
            onClick={table.nextPage}
            disabled={table.page >= table.totalPages}
            data-test="data-table-next"
            className="kad-focusable inline-flex min-h-11 items-center gap-1 rounded-md border border-border px-3 disabled:opacity-50"
          >
            Next
            <Icon name="chevron-right" size="sm" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
