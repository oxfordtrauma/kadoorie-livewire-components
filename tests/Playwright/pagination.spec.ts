/**
 * Project: Kadoorie Livewire Components
 * File: pagination.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('marks the current page and exposes prev/next controls', async ({ page }) => {
  const pagination = page.getByTestId('showcase-pagination').getByTestId('pagination');
  await expect(pagination).toBeVisible();

  const current = pagination.locator('[data-test="pagination-page"][aria-current="page"]');
  await expect(current).toHaveText('4');

  await expect(pagination.getByTestId('pagination-prev')).toBeVisible();
  await expect(pagination.getByTestId('pagination-next')).toBeVisible();
});

test('prev and next are links on a middle page', async ({ page }) => {
  const pagination = page.getByTestId('showcase-pagination').getByTestId('pagination');

  await expect(pagination.getByTestId('pagination-prev')).toHaveAttribute('href', /.+/);
  await expect(pagination.getByTestId('pagination-next')).toHaveAttribute('href', /.+/);
});

test('pagination gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
