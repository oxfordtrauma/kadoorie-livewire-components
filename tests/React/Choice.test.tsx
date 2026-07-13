/**
 * Project: Kadoorie Livewire Components
 * File: Choice.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Checkbox, Radio } from '../../resources/react/src/ui/Choice';

it('renders a labelled checkbox and toggles when clicked (uncontrolled)', async () => {
  render(<Checkbox name="terms" label="I accept" />);
  const box = screen.getByTestId('terms-checkbox');
  expect(box).toHaveAttribute('type', 'checkbox');
  expect(box).toHaveAttribute('id', 'terms');
  expect(screen.getByTestId('terms-checkbox-label')).toHaveTextContent('I accept');
  await userEvent.click(box);
  expect(box).toBeChecked();
});

it('derives a radio id from name and slugified value', () => {
  render(<Radio name="plan" value="Pro Plan" label="Pro" />);
  const radio = screen.getByTestId('plan-radio');
  expect(radio).toHaveAttribute('type', 'radio');
  expect(radio).toHaveAttribute('id', 'plan-pro-plan');
});

it('honours a controlled checked value and fires onChange', async () => {
  const onChange = vi.fn();
  render(<Checkbox name="terms" checked={false} onChange={onChange} />);
  const box = screen.getByTestId('terms-checkbox');
  expect(box).not.toBeChecked();
  await userEvent.click(box);
  expect(onChange).toHaveBeenCalledOnce();
  expect(box).not.toBeChecked();
});
