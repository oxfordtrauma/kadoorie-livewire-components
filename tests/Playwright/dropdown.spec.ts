/**
 * Project: Kadoorie Livewire Components
 * File: dropdown.spec.ts
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

test('opens on click, focuses the first item, and arrows move focus', async ({ page }) => {
  const dropdown = page.getByTestId('showcase-dropdown').getByTestId('dropdown');
  const trigger = dropdown.getByTestId('dropdown-trigger');
  const menu = dropdown.getByTestId('dropdown-menu');
  const items = dropdown.getByTestId('dropdown-item');

  await trigger.click();
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(items.nth(0)).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect(items.nth(1)).toBeFocused();

  await page.keyboard.press('ArrowUp');
  await expect(items.nth(0)).toBeFocused();
});

test('closes on Escape and returns focus to the trigger', async ({ page }) => {
  const dropdown = page.getByTestId('showcase-dropdown').getByTestId('dropdown');
  const trigger = dropdown.getByTestId('dropdown-trigger');
  const menu = dropdown.getByTestId('dropdown-menu');

  await trigger.click();
  await expect(menu).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('dropdown gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
