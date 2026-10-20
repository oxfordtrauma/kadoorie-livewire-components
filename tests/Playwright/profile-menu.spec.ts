/**
 * Project: Kadoorie Livewire Components
 * File: profile-menu.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-10-20
 * Version: 0.1.0
 */

import { test, expect, type Page } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

/**
 * The workbench also renders profile menus inside the app header and app layout
 * examples, so scope every query to the dedicated profile menu example.
 */
const menu = (page: Page) => page.getByTestId('showcase-profile-menu');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('opens the profile menu and exposes change-details and logout', async ({ page }) => {
  await menu(page).getByTestId('profile-menu-trigger').click();
  await expect(menu(page).getByTestId('profile-menu-change-details')).toBeVisible();
  await expect(menu(page).getByTestId('profile-menu-logout')).toBeVisible();
});

test('closes on Escape and returns focus to the trigger', async ({ page }) => {
  const trigger = menu(page).getByTestId('profile-menu-trigger');
  await trigger.click();
  await expect(menu(page).getByTestId('profile-menu-change-details')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu(page).getByTestId('profile-menu-change-details')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('change-details is a link and logout is a POST form with a csrf field', async ({ page }) => {
  await menu(page).getByTestId('profile-menu-trigger').click();

  await expect(menu(page).getByTestId('profile-menu-change-details')).toHaveAttribute('href', /.+/);
  await expect(menu(page).getByTestId('profile-menu-logout')).toHaveAttribute('type', 'submit');

  const form = menu(page).getByTestId('profile-menu-logout-form');
  await expect(form).toHaveAttribute('method', /post/i);
  await expect(form.locator('input[name="_token"]')).toHaveCount(1);
});

test('profile menu has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
