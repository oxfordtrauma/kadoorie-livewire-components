/**
 * Project: Kadoorie Livewire Components
 * File: Toggle.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Toggle } from '../../resources/react/src/ui/Toggle';

it('is a switch whose aria-checked tracks the live state', async () => {
  render(<Toggle name="notify" label="Notifications" />);
  const toggle = screen.getByTestId('notify-toggle');
  expect(toggle).toHaveAttribute('role', 'switch');
  expect(toggle).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByTestId('notify-toggle-label')).toHaveTextContent('Notifications');
  await userEvent.click(toggle);
  expect(toggle).toBeChecked();
  expect(toggle).toHaveAttribute('aria-checked', 'true');
});

it('reflects a controlled checked prop', () => {
  render(<Toggle name="notify" checked />);
  const toggle = screen.getByTestId('notify-toggle');
  expect(toggle).toBeChecked();
  expect(toggle).toHaveAttribute('aria-checked', 'true');
});
