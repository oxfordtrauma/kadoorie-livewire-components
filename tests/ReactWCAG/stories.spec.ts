/**
 * Project: Kadoorie Livewire Components
 * File: stories.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { test } from '@playwright/test';
import { expectNoViolations } from '../Playwright/support/axe';

/**
 * One axe scan per React workbench story (baseURL is the Vite app), mirroring
 * the Blade showcase WCAG sweep. This is the layer that verifies contrast and
 * responsive rendering in a real browser — the checks jsdom/vitest-axe cannot
 * compute. Every story runs across the three react-wcag-* viewports.
 */
const stories = [
  'foundation',
  'form-controls',
  'feedback',
  'layout-nav',
  'data-table',
  'login',
  'error-page',
  'widgets',
];

for (const story of stories) {
  test(`react story ${story} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
    await page.goto(`/?component=${story}`);
    await expectNoViolations(page);
  });
}
