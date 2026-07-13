/**
 * Project: Kadoorie Livewire Components
 * File: nav.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

/**
 * The Nav collapses behind a hamburger below Tailwind's `md` breakpoint
 * (768px), so only the 360px mobile project sees the sheet; tablet (768) and
 * desktop (1920) show the inline bar.
 */
const isMobile = (name: string): boolean => name === 'functional-mobile';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the inline bar and hides the toggle at/above md', async ({ page }, info) => {
  test.skip(isMobile(info.project.name), 'collapses below md');
  const nav = page.getByTestId('nav').first();
  await expect(nav.getByTestId('nav-menu')).toBeVisible();
  await expect(nav.getByTestId('nav-toggle')).toBeHidden();
});

test('collapses behind a hamburger below md', async ({ page }, info) => {
  test.skip(!isMobile(info.project.name), 'inline bar at/above md');
  const nav = page.getByTestId('nav').first();
  await expect(nav.getByTestId('nav-menu')).toBeHidden();
  await expect(nav.getByTestId('nav-toggle')).toBeVisible();
  await expect(nav.getByTestId('nav-sheet')).toBeHidden();
});

test('opens the sheet, traps focus, and returns focus on Escape', async ({ page }, info) => {
  test.skip(!isMobile(info.project.name), 'sheet only rendered below md');
  const nav = page.getByTestId('nav').first();
  const toggle = nav.getByTestId('nav-toggle');
  const sheet = nav.getByTestId('nav-sheet');

  await toggle.click();
  await expect(sheet).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  // The Alpine focus plugin (x-trap) moves focus into the sheet.
  await expect(nav.getByTestId('nav-sheet-link').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('applies sticky positioning only when the sticky prop is set', async ({ page }) => {
  const nonSticky = page.getByTestId('nav').first();
  const sticky = page.getByTestId('nav').last();

  expect(await nonSticky.evaluate((el) => getComputedStyle(el).position)).toBe('relative');

  const stickyStyles = await sticky.evaluate((el) => {
    const style = getComputedStyle(el);
    return { position: style.position, top: style.top };
  });
  expect(stickyStyles.position).toBe('sticky');
  expect(stickyStyles.top).toBe('0px');
});

test('nav gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
