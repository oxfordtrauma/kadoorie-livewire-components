/**
 * Project: Kadoorie Livewire Components
 * File: Select.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Select } from '../../resources/react/src/ui/Select';

const options = { admin: 'Admin', user: 'User' };

it('renders options and a placeholder inside the styled wrapper', () => {
  render(<Select name="role" options={options} placeholder="Choose a role" />);
  expect(screen.getByTestId('role-select-wrap')).toBeInTheDocument();
  const select = screen.getByTestId('role-select');
  expect(select).toHaveAttribute('id', 'role');
  expect(screen.getByRole('option', { name: 'Choose a role' })).toBeDisabled();
  expect(screen.getByRole('option', { name: 'Admin' })).toBeInTheDocument();
});

it('is keyboard selectable and reports the chosen value', async () => {
  render(<Select name="role" options={options} defaultValue="admin" />);
  const select = screen.getByTestId('role-select');
  await userEvent.selectOptions(select, 'user');
  expect(select).toHaveValue('user');
});

it('describes an error via aria wiring', () => {
  render(<Select name="role" options={options} error="Pick one" />);
  const select = screen.getByTestId('role-select');
  expect(select).toHaveAttribute('aria-invalid', 'true');
  expect(select).toHaveAttribute('aria-describedby', 'role-error');
});
