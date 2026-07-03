/**
 * Project: Kadoorie Livewire Components
 * File: forms.spec.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { test, expect, type Locator } from '@playwright/test';
import { expectNoHorizontalScroll } from './support/scroll';

/** Minimum WCAG touch-target size in CSS pixels (rule 06). */
const MIN_TARGET = 44;

async function expectMinTarget(locator: Locator): Promise<void> {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(MIN_TARGET);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('clicking a field label focuses its control', async ({ page }) => {
  // Use the uniquely named "notes" field; several examples reuse name="email",
  // producing duplicate ids on the gallery page that would defeat label focus.
  const section = page.getByTestId('showcase-textarea');
  await section.getByTestId('notes-label').click();
  await expect(section.getByTestId('notes-textarea')).toBeFocused();
});

test('accepts keyboard entry', async ({ page }) => {
  const input = page.getByTestId('showcase-input').getByTestId('email-input');
  await input.click();
  await input.pressSequentially('user@example.com');
  await expect(input).toHaveValue('user@example.com');
});

test('an errored field wires aria-invalid and aria-describedby to the message', async ({
  page,
}) => {
  const section = page.getByTestId('showcase-field');
  const input = section.getByTestId('email-input');
  const error = section.getByTestId('email-error');

  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(error).toHaveAttribute('role', 'alert');
  await expect(error).toHaveText('Email is required');

  const describedBy = await input.getAttribute('aria-describedby');
  const errorId = await error.getAttribute('id');
  expect(describedBy).not.toBeNull();
  expect(errorId).not.toBeNull();
  expect(describedBy!.split(/\s+/)).toContain(errorId!);
});

test('toggle flips aria-checked with the Space key', async ({ page }) => {
  const toggle = page.getByTestId('showcase-toggle').getByTestId('notify-toggle');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await expect(toggle).not.toBeChecked();
});

test('checkbox toggles with keyboard', async ({ page }) => {
  const checkbox = page.getByTestId('showcase-checkbox').getByTestId('terms-checkbox');
  await expect(checkbox).not.toBeChecked();
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
});

test('radio group moves selection with arrow keys', async ({ page }) => {
  const section = page.getByTestId('showcase-radio');
  const pro = section.locator('[data-test="plan-radio"][value="pro"]');
  const team = section.locator('[data-test="plan-radio"][value="team"]');

  await expect(pro).toBeChecked();
  await pro.focus();
  await page.keyboard.press('ArrowDown');

  await expect(team).toBeFocused();
  await expect(team).toBeChecked();
  await expect(pro).not.toBeChecked();
});

test('native select changes value via option choice', async ({ page }) => {
  const select = page.getByTestId('showcase-select').getByTestId('role-select');
  await select.selectOption('editor');
  await expect(select).toHaveValue('editor');
});

test('form controls meet the 44px touch-target minimum', async ({ page }) => {
  await expectMinTarget(page.getByTestId('showcase-input').getByTestId('email-input'));
  await expectMinTarget(page.getByTestId('showcase-select').getByTestId('role-select'));
  await expectMinTarget(page.getByTestId('showcase-toggle').getByTestId('notify-toggle-label'));
  await expectMinTarget(
    page.getByTestId('showcase-checkbox').getByTestId('terms-checkbox-label'),
  );
});

test('forms gallery has no horizontal scroll', async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
