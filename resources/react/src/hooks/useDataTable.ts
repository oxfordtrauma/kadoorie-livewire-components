/**
 * Project: Kadoorie Livewire Components
 * File: useDataTable.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useCallback, useMemo, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export type DataTableRow = Record<string, unknown>;

export interface UseDataTableOptions<Row extends DataTableRow> {
  columns: { field: string }[];
  rows: Row[];
  perPage?: number;
  selectable?: boolean;
}

export interface DataTable<Row extends DataTableRow> {
  sortField: string;
  sortDirection: SortDirection;
  page: number;
  totalPages: number;
  pageRows: Row[];
  selected: string[];
  selectable: boolean;
  sortBy: (field: string) => void;
  ariaSort: (field: string) => 'none' | 'ascending' | 'descending';
  gotoPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  toggleSelect: (id: string) => void;
}

/** Hard upper bound on page size (mirrors DataTable::MAX_PER_PAGE). */
const MAX_PER_PAGE = 100;

/** Spaceship-style comparison mirroring PHP's `<=>` for mixed scalar values. */
function compare(a: unknown, b: unknown): number {
  if (a === b) {
    return 0;
  }

  if (a === null || a === undefined) {
    return b === null || b === undefined ? 0 : -1;
  }

  if (b === null || b === undefined) {
    return 1;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
}

/**
 * Client-side port of the Livewire DataTable logic: bounded page size, stable
 * sort (`<=>`), and slice pagination, plus optional row selection. State lives
 * in the hook so `<DataTable>` (or a host) can render the rows however it likes.
 */
export function useDataTable<Row extends DataTableRow>({
  columns,
  rows,
  perPage = 10,
  selectable = false,
}: UseDataTableOptions<Row>): DataTable<Row> {
  const boundedPerPage = Math.max(1, Math.min(perPage, MAX_PER_PAGE));

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  void columns;

  const sortedRows = useMemo(() => {
    if (sortField === '') {
      return rows;
    }

    const copy = [...rows];
    copy.sort((a, b) => compare(a[sortField], b[sortField]));

    return sortDirection === 'desc' ? copy.reverse() : copy;
  }, [rows, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(rows.length / boundedPerPage));
  const currentPage = Math.min(page, totalPages);

  const pageRows = useMemo(
    () => sortedRows.slice((currentPage - 1) * boundedPerPage, currentPage * boundedPerPage),
    [sortedRows, currentPage, boundedPerPage]
  );

  const sortBy = useCallback((field: string) => {
    setSortField((currentField) => {
      if (currentField === field) {
        setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortDirection('asc');
      }

      return field;
    });
    setPage(1);
  }, []);

  const ariaSort = useCallback(
    (field: string): 'none' | 'ascending' | 'descending' => {
      if (sortField !== field) {
        return 'none';
      }

      return sortDirection === 'asc' ? 'ascending' : 'descending';
    },
    [sortField, sortDirection]
  );

  const gotoPage = useCallback(
    (next: number) => {
      setPage(Math.max(1, Math.min(next, totalPages)));
    },
    [totalPages]
  );

  const nextPage = useCallback(() => gotoPage(currentPage + 1), [gotoPage, currentPage]);
  const prevPage = useCallback(() => gotoPage(currentPage - 1), [gotoPage, currentPage]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  return {
    sortField,
    sortDirection,
    page: currentPage,
    totalPages,
    pageRows,
    selected,
    selectable,
    sortBy,
    ariaSort,
    gotoPage,
    nextPage,
    prevPage,
    toggleSelect,
  };
}
