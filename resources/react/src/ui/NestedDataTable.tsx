/**
 * Project: Kadoorie Livewire Components
 * File: NestedDataTable.tsx
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

import { Fragment, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { DataTableColumn, DataTableRow } from './DataTable';

export type NestedDataTableRowId = string | number;

/** Columns share DataTable's typed cell rendering contract; sorting is not used here. */
export type NestedDataTableColumn<Row extends DataTableRow> = Omit<
  DataTableColumn<Row>,
  'sortable'
>;

export interface NestedDataTableProps<
  Row extends DataTableRow,
  RowId extends NestedDataTableRowId = NestedDataTableRowId,
> {
  columns: NestedDataTableColumn<Row>[];
  rows: Row[];
  getRowId: (row: Row) => RowId;
  expandedRowId: RowId | null;
  onExpandedRowChange: (rowId: RowId | null) => void;
  renderExpandedContent: (row: Row) => ReactNode;
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
  tableClassName?: string;
}

/**
 * A controlled, horizontally-scrollable table for data with one expandable row
 * at a time. It is explicitly opt-in and intentionally separate from
 * DataTable: it does not sort, paginate, or select rows.
 */
export function NestedDataTable<
  Row extends DataTableRow,
  RowId extends NestedDataTableRowId = NestedDataTableRowId,
>({
  columns,
  rows,
  getRowId,
  expandedRowId,
  onExpandedRowChange,
  renderExpandedContent,
  bordered = true,
  className,
  containerClassName,
  tableClassName,
}: NestedDataTableProps<Row, RowId>) {
  const columnCount = columns.length + 1;

  return (
    <div data-test="nested-data-table" className={cn('w-full', className)}>
      <div
        className={cn(
          'relative w-full overflow-x-auto',
          bordered && 'rounded-lg border border-border',
          containerClassName
        )}
      >
        <table
          className={cn('w-full min-w-max text-left text-sm', tableClassName)}
          data-test="nested-data-table-table"
        >
          <thead className="bg-surface-muted text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th scope="col" className="w-10 px-3 py-2">
                <span className="sr-only">Expand row</span>
              </th>
              {columns.map((column) => (
                <th
                  key={column.field}
                  scope="col"
                  className={cn(
                    'px-3 py-2 font-semibold',
                    column.numeric && 'text-right',
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {rows.map((row) => {
              const rowId = getRowId(row);
              const isExpanded = expandedRowId === rowId;
              const expandedContentId = `nested-data-table-expanded-${String(rowId)}`;

              return (
                <Fragment key={String(rowId)}>
                  <tr data-test="nested-data-table-row">
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => onExpandedRowChange(isExpanded ? null : rowId)}
                        aria-expanded={isExpanded}
                        aria-controls={isExpanded ? expandedContentId : undefined}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} row`}
                        data-test="nested-data-table-toggle"
                        className="kad-focusable inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-text-muted hover:text-text"
                      >
                        <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                      </button>
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.field}
                        data-label={column.label}
                        className={cn(
                          'px-3 py-2 text-text-body',
                          column.numeric && 'text-right kad-nums',
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(row[column.field], row)
                          : String(row[column.field] ?? '')}
                      </td>
                    ))}
                  </tr>
                  {isExpanded ? (
                    <tr data-test="nested-data-table-expanded-row">
                      <td
                        id={expandedContentId}
                        colSpan={columnCount}
                        data-test="nested-data-table-expanded-content"
                        className="bg-surface-muted px-3 py-3 text-text-body"
                      >
                        {renderExpandedContent(row)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
