/**
 * Project: Kadoorie Livewire Components
 * File: tabs.spec.ts
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

test('roving tabindex and arrow keys drive tab selection', async ({ page }) => {
  const tabs = page.getByTestId('tabs');
  const details = tabs.getByTestId('tab-details');
  const history = tabs.getByTestId('tab-history');

  await expect(details).toHaveAttribute('aria-selected', 'true');
  await expect(details).toHaveAttribute('tabindex', '0');
  await expect(history).toHaveAttribute('tabindex', '-1');

  await details.focus();
  await page.keyboard.press('ArrowRight');
  await expect(history).toBeFocused();
  await expect(history).toHaveAttribute('aria-selected', 'true');
  await expect(details).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByTestId('tab-panel-history')).toBeVisible();
  await expect(page.getByTestId('tab-panel-details')).toBeHidden();

  await page.keyboard.press('ArrowLeft');
  await expect(details).toBeFocused();
  await expect(details).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('End');
  await expect(history).toBeFocused();

  await page.keyboard.press('Home');
  await expect(details).toBeFocused();
});

test('clicking a tab activates its panel', async ({ page }) => {
  const tabs = page.getByTestId('tabs');
  await tabs.getByTestId('tab-history').click();
  await expect(page.getByTestId('tab-panel-history')).toBeVisible();
  await expect(tabs.getByTestId('tab-history')).toHaveAttribute('aria-selected', 'true');
});

test('tabs gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
