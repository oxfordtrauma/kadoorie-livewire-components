/**
 * Project: Kadoorie Livewire Components
 * File: footer.spec.ts
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

test('renders the footer with reachable column and legal links', async ({ page }) => {
  const footer = page.getByTestId('footer');
  await expect(footer).toBeVisible();

  const links = footer.getByTestId('footer-link');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(links.nth(i)).toHaveAttribute('href', /.+/);
  }

  await expect(footer.getByTestId('footer-legal-link').first()).toBeVisible();
});

test('footer has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
