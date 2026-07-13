/**
 * Project: Kadoorie Livewire Components
 * File: widgets.spec.ts
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

test('small-box exposes a value, label, and reachable more-info link', async ({ page }) => {
  const box = page.getByTestId('showcase-small-box').getByTestId('small-box').first();
  await expect(box.getByTestId('small-box-value')).toBeVisible();
  await expect(box.getByTestId('small-box-label')).toBeVisible();
  await expect(box.getByTestId('small-box-link')).toHaveAttribute('href', /.+/);
});

test('info-box progressbar exposes its accessible values', async ({ page }) => {
  const progress = page.getByTestId('showcase-info-box').getByTestId('info-box-progress');
  await expect(progress).toHaveAttribute('role', 'progressbar');
  await expect(progress).toHaveAttribute('aria-valuenow', '70');
  await expect(progress).toHaveAttribute('aria-valuemin', '0');
  await expect(progress).toHaveAttribute('aria-valuemax', '100');
});

test('dashboard widgets have no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
