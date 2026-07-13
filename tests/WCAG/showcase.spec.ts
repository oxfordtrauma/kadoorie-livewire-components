/**
 * Project: Kadoorie Livewire Components
 * File: showcase.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expectNoViolations } from '../Playwright/support/axe';

/**
 * One axe scan per generated showcase page (baseURL is file://…/docs/showcase/).
 * The page list is read from disk so new components are covered automatically;
 * each page becomes its own test and runs across the three wcag-* viewports.
 */
const pages = readdirSync(resolve('docs/showcase'))
  .filter((file) => file.endsWith('.html'))
  .sort();

for (const pageFile of pages) {
  test(`${pageFile} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
    await page.goto(pageFile);
    await expectNoViolations(page);
  });
}
