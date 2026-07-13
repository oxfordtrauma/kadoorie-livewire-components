/**
 * Project: Kadoorie Livewire Components
 * File: forms.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=form-controls');
  await expect(page.getByTestId('story-form-controls')).toBeVisible();
});

test('a field with an error wires aria-invalid and describes the message', async ({ page }) => {
  const input = page.getByTestId('email-input');
  await expect(input).toHaveAttribute('aria-invalid', 'true');

  const describedBy = (await input.getAttribute('aria-describedby')) ?? '';
  expect(describedBy).toContain('email-error');
  expect(describedBy).toContain('email-hint');

  const error = page.getByTestId('email-error');
  await expect(error).toBeVisible();
  await expect(error).toHaveAttribute('role', 'alert');
  await expect(error).toHaveText('This field is required');
});

test('the toggle keeps aria-checked in sync when operated', async ({ page }) => {
  const toggle = page.getByTestId('notify-toggle');
  await expect(toggle).toHaveAttribute('role', 'switch');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  await page.getByTestId('notify-toggle-label').click();
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await expect(toggle).toBeChecked();

  await page.getByTestId('notify-toggle-label').click();
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
});

test('checkbox and radio controls respond to activation', async ({ page }) => {
  const terms = page.getByTestId('terms-checkbox');
  await expect(terms).not.toBeChecked();
  await page.getByTestId('terms-checkbox-label').click();
  await expect(terms).toBeChecked();

  const plan = page.getByTestId('plan-radio');
  await page.getByTestId('plan-radio-label').click();
  await expect(plan).toBeChecked();
});

test('the form controls page does not scroll horizontally', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
