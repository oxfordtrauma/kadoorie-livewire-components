/**
 * Project: Kadoorie Livewire Components
 * File: layout-nav.spec.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll } from '../Playwright/support/scroll';

const MD_BREAKPOINT = 768;

test.beforeEach(async ({ page }) => {
  await page.goto('/?component=layout-nav');
  await expect(page.getByTestId('story-layout-nav')).toBeVisible();
});

test('tabs move selection and focus with the arrow keys', async ({ page }) => {
  await expect(page.getByTestId('tab-a')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('tab-panel-a')).toBeVisible();
  await expect(page.getByTestId('tab-panel-b')).toBeHidden();

  await page.getByTestId('tab-a').focus();
  await page.keyboard.press('ArrowRight');

  await expect(page.getByTestId('tab-b')).toBeFocused();
  await expect(page.getByTestId('tab-b')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('tab-panel-b')).toBeVisible();
  await expect(page.getByTestId('tab-panel-a')).toBeHidden();
});

test('accordion keeps a single panel open at a time', async ({ page }) => {
  const triggerOne = page.getByTestId('accordion-trigger-one');
  await expect(triggerOne).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByTestId('accordion-panel-one')).toBeHidden();

  await triggerOne.click();
  await expect(triggerOne).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByTestId('accordion-panel-one')).toBeVisible();

  await page.getByTestId('accordion-trigger-two').click();
  await expect(page.getByTestId('accordion-panel-two')).toBeVisible();
  await expect(page.getByTestId('accordion-panel-one')).toBeHidden();
});

test('dropdown opens, traps focus, and returns focus on Escape', async ({ page }) => {
  const trigger = page.getByTestId('dropdown-trigger');
  await trigger.click();

  const menu = page.getByTestId('dropdown-menu');
  await expect(menu).toBeVisible();
  await expect(page.getByTestId('dropdown-item').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('pagination advances the current page', async ({ page }) => {
  const current = page.locator('[data-test="pagination-page"][aria-current="page"]');
  await expect(current).toHaveText('3');

  await page.getByTestId('pagination-next').click();
  await expect(page.locator('[data-test="pagination-page"][aria-current="page"]')).toHaveText('4');
});

test('breadcrumbs mark the current page', async ({ page }) => {
  await expect(page.getByTestId('breadcrumb-current')).toHaveText('Detail');
});

test('nav shows the inline menu at and above the md breakpoint', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < MD_BREAKPOINT, 'inline menu only renders >= md');

  await expect(page.getByTestId('nav-menu')).toBeVisible();
  await expect(page.getByTestId('nav-toggle')).toBeHidden();
});

test('nav collapses to a focus-trapped sheet below the md breakpoint', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= MD_BREAKPOINT, 'hamburger only renders < md');

  const toggle = page.getByTestId('nav-toggle');
  await expect(toggle).toBeVisible();
  await expect(page.getByTestId('nav-menu')).toBeHidden();

  await toggle.click();
  const sheet = page.getByTestId('nav-sheet');
  await expect(sheet).toBeVisible();
  await expect(page.getByTestId('nav-sheet-link').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('the layout and navigation page does not scroll horizontally', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
