/**
 * Project: Kadoorie Livewire Components
 * File: axe.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Run axe-core against the current page and assert zero WCAG 2.1 A/AA
 * violations. Defaults to the wcag2a + wcag2aa tag sets (assumption A4).
 */
export async function expectNoViolations(
  page: Page,
  tags: string[] = ['wcag2a', 'wcag2aa'],
): Promise<void> {
  const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();

  expect(
    violations,
    violations.map((v) => `${v.id}: ${v.help}`).join('\n'),
  ).toEqual([]);
}
