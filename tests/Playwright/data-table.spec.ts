/**
 * Project: Kadoorie Livewire Components
 * File: data-table.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

const isMobile = (name: string): boolean => name === 'functional-mobile';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('sorting a column toggles aria-sort and reorders rows', async ({ page }, info) => {
  // Below md the table reflows to stacked cards and the header row (with the
  // sort buttons) is visually hidden, so sorting is a tablet/desktop affordance.
  test.skip(isMobile(info.project.name), 'headers hidden in the stacked mobile view');

  const table = page.getByTestId('data-table').first();
  const nameTh = table.getByTestId('data-table-th-name');

  await expect(nameTh).toHaveAttribute('aria-sort', 'none');

  await table.getByTestId('data-table-sort-name').click();
  await expect(nameTh).toHaveAttribute('aria-sort', 'ascending');
  await expect(table.getByTestId('data-table-row').first()).toContainText('Alice');

  await table.getByTestId('data-table-sort-name').click();
  await expect(nameTh).toHaveAttribute('aria-sort', 'descending');
  await expect(table.getByTestId('data-table-row').first()).toContainText('Bob');
});

test('reflows to stacked cards below md', async ({ page }, info) => {
  const cell = page.getByTestId('data-table').first().locator('tbody td').first();
  const display = await cell.evaluate((el) => getComputedStyle(el).display);

  if (isMobile(info.project.name)) {
    expect(display).toBe('flex');
  } else {
    expect(display).toBe('table-cell');
  }
});

test('paginates next and previous', async ({ page }) => {
  const table = page.getByTestId('data-table').last();
  const pageLabel = table.getByTestId('data-table-page');

  await expect(pageLabel).toContainText('Page 1 of 2');
  await expect(table.getByTestId('data-table-prev')).toBeDisabled();

  await table.getByTestId('data-table-next').click();
  await expect(pageLabel).toContainText('Page 2 of 2');
  await expect(table.getByTestId('data-table-next')).toBeDisabled();

  await table.getByTestId('data-table-prev').click();
  await expect(pageLabel).toContainText('Page 1 of 2');
});

test('selects a row via its checkbox', async ({ page }) => {
  const checkbox = page.getByTestId('data-table').last().getByTestId('data-table-select').first();

  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test('data-table gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
