/**
 * Project: Kadoorie Livewire Components
 * File: login.spec.ts
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

test('renders semantic landmarks and heading', async ({ page }) => {
  const login = page.getByTestId('login-page');
  await expect(login.locator('main#main-content')).toBeVisible();
  await expect(login.getByTestId('login-heading')).toHaveText('Sign in');
  await expect(login.getByTestId('login-form')).toBeVisible();
});

test('announces validation errors and marks fields invalid on empty submit', async ({
  page,
}) => {
  const login = page.getByTestId('login-page');
  await login.getByTestId('login-submit').click();

  const emailError = login.getByTestId('email-error');
  await expect(emailError).toBeVisible();
  // Errors are announced through role="alert" (WCAG AA), not a focus move.
  await expect(emailError).toHaveAttribute('role', 'alert');
  await expect(login.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');

  await expect(login.getByTestId('password-error')).toBeVisible();
  await expect(login.getByTestId('password-input')).toHaveAttribute('aria-invalid', 'true');
});

test('accepts valid input without validation errors', async ({ page }) => {
  const login = page.getByTestId('login-page');
  await login.getByTestId('email-input').fill('user@example.com');
  await login.getByTestId('password-input').fill('secret123');
  await login.getByTestId('login-submit').click();

  await expect(login.getByTestId('email-error')).toHaveCount(0);
  await expect(login.getByTestId('password-error')).toHaveCount(0);
});

test('exposes remember-me and forgot-password controls', async ({ page }) => {
  const login = page.getByTestId('login-page');
  const remember = login.getByTestId('remember-checkbox');

  await expect(remember).not.toBeChecked();
  await remember.check();
  await expect(remember).toBeChecked();

  await expect(login.getByTestId('login-forgot')).toBeVisible();
});

test('login gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
