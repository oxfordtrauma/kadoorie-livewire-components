/**
 * Project: Kadoorie Livewire Components
 * File: overlays.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect, type Page } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

/** Fire a Livewire browser event from the page (Modal/Toast are event-driven). */
async function dispatch(
  page: Page,
  event: string,
  params?: Record<string, unknown>,
): Promise<void> {
  await page.evaluate(
    ([e, p]) =>
      (
        window as unknown as {
          Livewire: { dispatch: (name: string, data?: Record<string, unknown>) => void };
        }
      ).Livewire.dispatch(e as string, p as Record<string, unknown>),
    [event, params ?? {}] as const,
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('modal opens on event, traps focus, and locks scroll', async ({ page }) => {
  const dialog = page.getByTestId('modal-dialog');
  await expect(dialog).toBeHidden();

  await dispatch(page, 'kadoorie-open-modal');

  await expect(dialog).toBeVisible();
  // x-trap moves focus to the first tabbable element (the close button).
  await expect(page.getByTestId('modal-close')).toBeFocused();

  const locked = await page.evaluate(
    () =>
      getComputedStyle(document.documentElement).overflow === 'hidden' ||
      getComputedStyle(document.body).overflow === 'hidden',
  );
  expect(locked).toBe(true);
});

test('modal closes on Escape and returns focus to the opener', async ({ page }) => {
  const opener = page.getByTestId('showcase-dropdown').getByTestId('dropdown-trigger');
  await opener.focus();
  await expect(opener).toBeFocused();

  await dispatch(page, 'kadoorie-open-modal');
  await expect(page.getByTestId('modal-dialog')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('modal-dialog')).toBeHidden();
  await expect(opener).toBeFocused();
});

test('modal closes on backdrop click', async ({ page }) => {
  await dispatch(page, 'kadoorie-open-modal');
  await expect(page.getByTestId('modal-dialog')).toBeVisible();

  await page.getByTestId('modal-backdrop').click({ position: { x: 5, y: 5 } });
  await expect(page.getByTestId('modal-dialog')).toBeHidden();
});

test('toast appears on event with its message', async ({ page }) => {
  await dispatch(page, 'kadoorie-toast', { message: 'Saved successfully', tone: 'success' });

  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('toast-message')).toHaveText('Saved successfully');
});

test('toast auto-dismisses after its duration', async ({ page }) => {
  await dispatch(page, 'kadoorie-toast', { message: 'Temporary notice', tone: 'info' });
  await expect(page.getByTestId('toast')).toBeVisible();

  // Default duration is 4000ms; allow a generous buffer for the round-trip.
  await expect(page.getByTestId('toast')).toBeHidden({ timeout: 8000 });
});

test('toast pauses auto-dismiss while hovered', async ({ page }) => {
  await dispatch(page, 'kadoorie-toast', { message: 'Hover to keep', tone: 'info' });
  const toast = page.getByTestId('toast');
  await expect(toast).toBeVisible();

  await toast.hover();
  // Past the normal 4000ms window, still visible because hover stops the timer.
  await page.waitForTimeout(4600);
  await expect(toast).toBeVisible();

  // Leaving restarts the timer, so it dismisses shortly after.
  await page.mouse.move(0, 0);
  await expect(toast).toBeHidden({ timeout: 8000 });
});

test('toast dismiss button closes it immediately', async ({ page }) => {
  await dispatch(page, 'kadoorie-toast', { message: 'Dismiss me', tone: 'info' });
  await expect(page.getByTestId('toast')).toBeVisible();

  await page.getByTestId('toast-dismiss').click();
  await expect(page.getByTestId('toast')).toBeHidden();
});

test('tooltip shows on hover and hides on leave', async ({ page }) => {
  const section = page.getByTestId('showcase-tooltip');
  const trigger = section.getByTestId('tooltip-trigger');
  const tip = section.getByTestId('tooltip');

  await expect(tip).toBeHidden();
  await trigger.hover();
  await expect(tip).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(tip).toBeHidden();
});

test('tooltip shows on focus and hides on Escape', async ({ page }) => {
  const section = page.getByTestId('showcase-tooltip');
  const trigger = section.getByTestId('tooltip-trigger');
  const tip = section.getByTestId('tooltip');

  await trigger.focus();
  await expect(tip).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(tip).toBeHidden();
});

test('alert can be dismissed', async ({ page }) => {
  const section = page.getByTestId('showcase-alert');
  const alert = section.getByTestId('alert').first();

  await expect(alert).toBeVisible();
  await section.getByTestId('alert-dismiss').first().click();
  await expect(alert).toBeHidden();
});

test('overlays gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
