/**
 * Project: Kadoorie Livewire Components
 * File: accordion.spec.ts
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

test('single-open accordion shows one panel at a time', async ({ page }) => {
  const accordion = page.getByTestId('accordion').first();
  const one = accordion.getByTestId('accordion-trigger-one');
  const two = accordion.getByTestId('accordion-trigger-two');
  const panelOne = accordion.getByTestId('accordion-panel-one');
  const panelTwo = accordion.getByTestId('accordion-panel-two');

  await expect(panelOne).toBeHidden();
  await expect(panelTwo).toBeHidden();

  await one.click();
  await expect(panelOne).toBeVisible();
  await expect(one).toHaveAttribute('aria-expanded', 'true');

  await two.click();
  await expect(panelTwo).toBeVisible();
  await expect(panelOne).toBeHidden();
  await expect(one).toHaveAttribute('aria-expanded', 'false');

  await two.click();
  await expect(panelTwo).toBeHidden();
  await expect(two).toHaveAttribute('aria-expanded', 'false');
});

test('multiple-open accordion keeps panels independent', async ({ page }) => {
  const accordion = page.getByTestId('accordion').last();
  const size = accordion.getByTestId('accordion-trigger-size');
  const weight = accordion.getByTestId('accordion-trigger-weight');
  const panelSize = accordion.getByTestId('accordion-panel-size');
  const panelWeight = accordion.getByTestId('accordion-panel-weight');

  await size.click();
  await expect(panelSize).toBeVisible();

  await weight.click();
  await expect(panelWeight).toBeVisible();
  await expect(panelSize).toBeVisible();
});

test('accordion gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
