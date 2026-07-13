/**
 * Project: Kadoorie Livewire Components
 * File: Input.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Input } from '../../resources/react/src/ui/Input';

it('wires id, name and data-test from the name', () => {
  render(<Input name="email" type="email" placeholder="you@work.com" />);
  const input = screen.getByTestId('email-input');
  expect(input).toHaveAttribute('id', 'email');
  expect(input).toHaveAttribute('name', 'email');
  expect(input).toHaveAttribute('type', 'email');
  expect(input).not.toHaveAttribute('aria-invalid');
});

it('marks itself invalid and describes the error when given one', () => {
  render(<Input name="email" hint="Work address" error="Required" />);
  const input = screen.getByTestId('email-input');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-describedby', 'email-hint email-error');
});

it('accepts user typing when uncontrolled', async () => {
  render(<Input name="email" />);
  const input = screen.getByTestId('email-input');
  await userEvent.type(input, 'hi');
  expect(input).toHaveValue('hi');
});
