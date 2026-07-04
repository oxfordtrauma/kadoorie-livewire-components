/**
 * Project: Kadoorie Livewire Components
 * File: showcase-shell.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect } from '@playwright/test';
import { showcaseUrl } from './support/showcase';
import { expectNoHorizontalScroll } from './support/scroll';

/** The sidebar collapses below Tailwind's lg breakpoint (1024px). */
const isDesktop = (name: string): boolean => name === 'functional-desktop';

test('Preview and Code tabs toggle the shown panel', async ({ page }) => {
  await page.goto(showcaseUrl('button.html'));
  const example = page.getByTestId('showcase-example').first();

  await expect(example.getByTestId('showcase-preview')).toBeVisible();
  await expect(example.getByTestId('showcase-code')).toBeHidden();

  await example.getByTestId('tab-code').click();
  await expect(example.getByTestId('showcase-code')).toBeVisible();
  await expect(example.getByTestId('showcase-preview')).toBeHidden();

  await example.getByTestId('tab-preview').click();
  await expect(example.getByTestId('showcase-preview')).toBeVisible();
});

test('copy button gives copied feedback', async ({ page }) => {
  await page.goto(showcaseUrl('button.html'));
  const example = page.getByTestId('showcase-example').first();

  await example.getByTestId('tab-code').click();
  await example.getByTestId('showcase-copy').click();
  await expect(example.getByTestId('showcase-copied')).toBeVisible();
});

test('sidebar collapses and toggles below lg', async ({ page }, info) => {
  test.skip(isDesktop(info.project.name), 'sidebar is always visible at lg and up');
  await page.goto(showcaseUrl('button.html'));

  const sidebar = page.getByTestId('showcase-sidebar');
  const toggle = page.getByTestId('showcase-sidebar-toggle');

  await expect(sidebar).toBeHidden();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(sidebar).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('sidebar is always visible at lg and up', async ({ page }, info) => {
  test.skip(!isDesktop(info.project.name), 'sidebar collapses below lg');
  await page.goto(showcaseUrl('button.html'));

  await expect(page.getByTestId('showcase-sidebar')).toBeVisible();
  await expect(page.getByTestId('showcase-sidebar-toggle')).toBeHidden();
});

test('modal demo opens and closes with Escape', async ({ page }) => {
  await page.goto(showcaseUrl('modal.html'));

  await page.getByTestId('demo-modal-open').click();
  await expect(page.getByTestId('demo-modal')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('demo-modal')).toBeHidden();
});

test('toast demo fires and auto-dismisses', async ({ page }) => {
  await page.goto(showcaseUrl('toast.html'));

  await page.getByTestId('demo-toast-fire').click();
  await expect(page.getByTestId('demo-toast')).toBeVisible();
  await expect(page.getByTestId('demo-toast')).toBeHidden({ timeout: 5000 });
});

test('showcase pages have no horizontal scroll', async ({ page }) => {
  await page.goto(showcaseUrl('index.html'));
  await expectNoHorizontalScroll(page);

  await page.goto(showcaseUrl('data-table.html'));
  await expectNoHorizontalScroll(page);
});
