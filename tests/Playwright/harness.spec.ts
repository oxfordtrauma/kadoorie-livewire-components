/**
 * Project: Kadoorie Livewire Components
 * File: harness.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

declare global {
  interface Window {
    Livewire?: unknown;
    Alpine?: unknown;
  }
}

test.describe('workbench harness', () => {
  test('serves the gallery and boots Livewire + Alpine', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Kadoorie Components', level: 1 })).toBeVisible();

    // The manual bundle (resources/js/workbench.js) must register the Alpine
    // plugins and start Livewire; both globals prove the bootstrap ran.
    await page.waitForFunction(() => Boolean(window.Livewire) && Boolean(window.Alpine));
  });

  test('hydrates inline Alpine (dropdown toggles)', async ({ page }) => {
    await page.goto('/');

    const dropdown = page.getByTestId('showcase-dropdown');
    const trigger = dropdown.getByTestId('dropdown-trigger');
    const menu = dropdown.getByTestId('dropdown-menu');

    await expect(menu).toBeHidden();
    await trigger.click();
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('/');
    await expectNoHorizontalScroll(page);
  });
});
