/**
 * Project: Kadoorie Livewire Components
 * File: data-table.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

const MD_BREAKPOINT = 768;

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=data-table');
  await expect(page.getByTestId('data-table')).toBeVisible();
});

test('sorting toggles aria-sort and reorders the rows', async ({ page }) => {
  // Below md the table reflows to stacked cards and the header (with the sort
  // buttons) is visually hidden by design, so header sorting only applies >= md.
  test.skip(
    (page.viewportSize()?.width ?? 0) < MD_BREAKPOINT,
    'header is hidden in the stacked layout'
  );

  const header = page.getByTestId('data-table-th-name');
  await expect(header).toHaveAttribute('aria-sort', 'none');

  await page.getByTestId('data-table-sort-name').click();
  await expect(header).toHaveAttribute('aria-sort', 'ascending');
  await expect(page.getByTestId('data-table-row').first()).toContainText('Ada');

  await page.getByTestId('data-table-sort-name').click();
  await expect(header).toHaveAttribute('aria-sort', 'descending');
  await expect(page.getByTestId('data-table-row').first()).toContainText('Linus');
});

test('pagination steps through the windowed pages', async ({ page }) => {
  await expect(page.getByTestId('data-table-page')).toHaveText('Page 1 of 2');
  await expect(page.getByTestId('data-table-prev')).toBeDisabled();

  await page.getByTestId('data-table-next').click();
  await expect(page.getByTestId('data-table-page')).toHaveText('Page 2 of 2');
  await expect(page.getByTestId('data-table-next')).toBeDisabled();
  await expect(page.getByTestId('data-table-prev')).toBeEnabled();

  await page.getByTestId('data-table-prev').click();
  await expect(page.getByTestId('data-table-page')).toHaveText('Page 1 of 2');
});

test('rows can be selected', async ({ page }) => {
  const first = page.getByTestId('data-table-select').first();
  await expect(first).not.toBeChecked();
  await first.click();
  await expect(first).toBeChecked();
});

test('the data table does not scroll horizontally when it reflows', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
