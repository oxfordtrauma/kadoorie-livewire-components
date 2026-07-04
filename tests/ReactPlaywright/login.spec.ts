/**
 * Project: Kadoorie Livewire Components
 * File: login.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=login');
  await expect(page.getByTestId('login-form')).toBeVisible();
});

test('renders the sign-in form with its supporting links', async ({ page }) => {
  await expect(page.getByTestId('login-heading')).toHaveText('Sign in');
  await expect(page.getByTestId('login-submit')).toBeVisible();
  await expect(page.getByTestId('login-forgot')).toBeVisible();
});

test('client validation blocks an empty submit', async ({ page }) => {
  await page.getByTestId('login-submit').click();

  const emailError = page.getByTestId('email-error');
  const passwordError = page.getByTestId('password-error');
  await expect(emailError).toHaveText('The email field is required.');
  await expect(emailError).toHaveAttribute('role', 'alert');
  await expect(passwordError).toHaveText('The password field is required.');
  await expect(page.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');
});

test('client validation rejects a malformed email', async ({ page }) => {
  await page.getByTestId('email-input').fill('not-an-email');
  await page.getByTestId('password-input').fill('secret-value');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('email-error')).toHaveText(
    'The email must be a valid email address.'
  );
});

test('the password stays client-side and a valid submit does not navigate', async ({ page }) => {
  const password = page.getByTestId('password-input');
  await expect(password).toHaveAttribute('type', 'password');
  await expect(password).toHaveAttribute('autocomplete', 'current-password');

  await page.getByTestId('email-input').fill('user@work.com');
  await password.fill('super-secret');
  await page.getByTestId('login-submit').click();

  // onSubmit is a no-op here: the credentials never leave component state, so
  // there is no navigation or request and no validation error remains.
  await expect(page).toHaveURL(/component=login/);
  await expect(page.getByTestId('email-error')).toHaveCount(0);
  await expect(page.getByTestId('password-error')).toHaveCount(0);
});

test('the login page does not scroll horizontally', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
