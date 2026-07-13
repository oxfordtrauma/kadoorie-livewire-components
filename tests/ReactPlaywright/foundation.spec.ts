/**
 * Project: Kadoorie Livewire Components
 * File: foundation.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';

/**
 * R0 smoke: the React workbench boots, mounts the foundation story, and the
 * shared hooks produce the same field wiring the Blade twins use. Component
 * specs (R1+) are added alongside as stories land.
 */
test('react workbench mounts the foundation story with field wiring', async ({ page }) => {
  await page.goto('/?component=foundation');

  await expect(page.getByTestId('story-foundation')).toBeVisible();
  await expect(page.getByTestId('foundation-icon')).toBeVisible();

  const input = page.getByTestId('foundation-input');
  await expect(input).toHaveAttribute('id', 'email');
  await expect(input).toHaveAttribute('aria-describedby', 'email-hint');
});
