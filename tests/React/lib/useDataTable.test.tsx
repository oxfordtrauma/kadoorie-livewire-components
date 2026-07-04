/**
 * Project: Kadoorie Livewire Components
 * File: useDataTable.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { act, renderHook } from '@testing-library/react';
import { expect, it } from 'vitest';
import { useDataTable } from '../../../resources/react/src/hooks/useDataTable';

const columns = [{ field: 'name' }, { field: 'score' }];
const rows = [
  { id: 1, name: 'Ada', score: 91 },
  { id: 2, name: 'Linus', score: 88 },
  { id: 3, name: 'Grace', score: 95 },
];

it('sorts, toggles direction, and paginates like the Livewire twin', () => {
  const { result } = renderHook(() => useDataTable({ columns, rows, perPage: 2 }));

  expect(result.current.totalPages).toBe(2);
  expect(result.current.pageRows).toHaveLength(2);
  expect(result.current.ariaSort('name')).toBe('none');

  act(() => result.current.sortBy('score'));
  expect(result.current.sortDirection).toBe('asc');
  expect(result.current.pageRows[0].name).toBe('Linus');

  act(() => result.current.sortBy('score'));
  expect(result.current.sortDirection).toBe('desc');
  expect(result.current.pageRows[0].name).toBe('Grace');
});

it('clamps page navigation and tracks selection', () => {
  const { result } = renderHook(() =>
    useDataTable({ columns, rows, perPage: 2, selectable: true })
  );

  act(() => result.current.prevPage());
  expect(result.current.page).toBe(1);

  act(() => result.current.nextPage());
  expect(result.current.page).toBe(2);

  act(() => result.current.nextPage());
  expect(result.current.page).toBe(2);

  act(() => result.current.toggleSelect('1'));
  expect(result.current.selected).toEqual(['1']);
  act(() => result.current.toggleSelect('1'));
  expect(result.current.selected).toEqual([]);
});
