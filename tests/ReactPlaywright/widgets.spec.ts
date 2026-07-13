/**
 * Project: Kadoorie Livewire Components
 * File: widgets.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=widgets');
  await expect(page.getByTestId('story-widgets')).toBeVisible();
});

test('the profile menu reveals its items and returns focus on Escape', async ({ page }) => {
  const trigger = page.getByTestId('profile-menu-trigger');
  await expect(page.getByTestId('profile-menu-logout')).toBeHidden();

  await trigger.click();
  await expect(page.getByTestId('profile-menu-header')).toBeVisible();
  await expect(page.getByTestId('profile-menu-change-details')).toBeVisible();
  await expect(page.getByTestId('profile-menu-logout')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('profile-menu-logout')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('the small box shows its value and more-info link', async ({ page }) => {
  await expect(page.getByTestId('small-box')).toBeVisible();
  await expect(page.getByTestId('small-box-value')).toHaveText('1,024');
  await expect(page.getByTestId('small-box-link')).toBeVisible();
});

test('the info box exposes an accessible progress bar', async ({ page }) => {
  const progress = page.getByTestId('info-box-progress');
  await expect(progress).toHaveAttribute('role', 'progressbar');
  await expect(progress).toHaveAttribute('aria-valuenow', '92');
  await expect(progress).toHaveAttribute('aria-label', 'Uptime');
});

test('the footer is a contentinfo landmark with legal links', async ({ page }) => {
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByTestId('footer-copyright')).toContainText('2026');
  await expect(page.getByTestId('footer-legal-link').first()).toBeVisible();
});

test('the widgets page does not scroll horizontally', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
