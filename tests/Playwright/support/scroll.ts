/**
 * Project: Kadoorie Livewire Components
 * File: scroll.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { expect, type Page } from '@playwright/test';

/**
 * Assert the document does not scroll horizontally at the current viewport.
 * A one-pixel tolerance absorbs sub-pixel rounding in Chromium's layout while
 * still catching genuine overflow (Part 1 §5.10, no horizontal scroll).
 */
export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );

  expect(overflow, 'document must not scroll horizontally').toBeLessThanOrEqual(1);
}
