/**
 * Project: Kadoorie Livewire Components
 * File: foundation.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { test } from '@playwright/test';
import { expectNoViolations } from '../Playwright/support/axe';

/**
 * One axe scan per React workbench story (baseURL is the Vite app). New stories
 * added in R1+ are covered by appending their ids here, mirroring the Blade
 * showcase WCAG sweep.
 */
const stories = ['foundation'];

for (const story of stories) {
  test(`react story ${story} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
    await page.goto(`/?component=${story}`);
    await expectNoViolations(page);
  });
}
