/**
 * Project: Kadoorie Livewire Components
 * File: overlays.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=feedback');
  await expect(page.getByTestId('story-feedback')).toBeVisible();
});

test('modal opens with trapped focus and returns focus to the trigger on Escape', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Open modal' });
  await trigger.click();

  const dialog = page.getByTestId('modal-dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByTestId('modal-title')).toHaveText('Delete item');
  await expect(page.getByTestId('modal-close')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('modal closes with the close button', async ({ page }) => {
  await page.getByRole('button', { name: 'Open modal' }).click();
  await expect(page.getByTestId('modal-dialog')).toBeVisible();

  await page.getByTestId('modal-close').click();
  await expect(page.getByTestId('modal-dialog')).toHaveCount(0);
});

test('a toast appears in the live region and auto-dismisses', async ({ page }) => {
  await page.getByRole('button', { name: 'Show toast' }).click();

  const toast = page.getByTestId('toast');
  await expect(toast).toBeVisible();
  await expect(page.getByTestId('toast-message')).toHaveText('Saved!');
  await expect(page.getByTestId('toast-region')).toHaveAttribute('aria-live', 'polite');

  await expect(toast).toBeHidden({ timeout: 6000 });
});

test('hovering a toast pauses its auto-dismiss timer', async ({ page }) => {
  await page.getByRole('button', { name: 'Show toast' }).click();
  const toast = page.getByTestId('toast');
  await expect(toast).toBeVisible();

  await toast.hover();
  await page.waitForTimeout(4500);
  await expect(toast).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(toast).toBeHidden({ timeout: 6000 });
});

test('a toast can be dismissed manually', async ({ page }) => {
  await page.getByRole('button', { name: 'Show toast' }).click();
  await expect(page.getByTestId('toast')).toBeVisible();

  await page.getByTestId('toast-dismiss').click();
  await expect(page.getByTestId('toast')).toHaveCount(0);
});

test('a dismissible alert removes itself', async ({ page }) => {
  await expect(page.getByTestId('alert-dismiss')).toBeVisible();
  await page.getByTestId('alert-dismiss').click();
  await expect(page.getByTestId('alert-dismiss')).toHaveCount(0);
});

test('a tooltip reveals on focus', async ({ page }) => {
  await page.getByTestId('tooltip-trigger').focus();
  const tooltip = page.getByTestId('tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('More info');
});

test('the feedback page does not scroll horizontally', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
