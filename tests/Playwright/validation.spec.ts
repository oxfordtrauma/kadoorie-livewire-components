/**
 * Project: Kadoorie Livewire Components
 * File: validation.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { showcaseUrl } from './support/showcase';

test.beforeEach(async ({ page }) => {
  await page.goto(showcaseUrl('validation.html'));
});

test('shows errors on empty submit and marks controls invalid', async ({ page }) => {
  const form = page.getByTestId('validation-form');
  await form.getByTestId('validation-submit').click();

  const emailError = form.getByTestId('signup-email-error');
  await expect(emailError).toBeVisible();
  await expect(emailError).toHaveText('Email is required.');
  await expect(form.getByTestId('signup-email-input')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByTestId('signup-terms-error')).toBeVisible();
});

test('clears a field error once it is fixed', async ({ page }) => {
  const form = page.getByTestId('validation-form');
  await form.getByTestId('validation-submit').click();
  await expect(form.getByTestId('signup-email-error')).toBeVisible();

  await form.getByTestId('signup-email-input').fill('user@example.com');
  await form.getByTestId('signup-email-input').blur();

  await expect(form.getByTestId('signup-email-error')).toBeHidden();
  await expect(form.getByTestId('signup-email-input')).toHaveAttribute('aria-invalid', 'false');
});

test('a valid submission shows the success state', async ({ page }) => {
  const form = page.getByTestId('validation-form');
  await form.getByTestId('signup-email-input').fill('user@example.com');
  await form.getByTestId('signup-role-select').selectOption('editor');
  await form.getByTestId('signup-terms-checkbox').check();
  await form.getByTestId('validation-submit').click();

  await expect(form.getByTestId('validation-success')).toBeVisible();
  await expect(form.getByTestId('signup-email-error')).toBeHidden();
});
