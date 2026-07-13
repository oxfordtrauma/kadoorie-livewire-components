/**
 * Project: Kadoorie Livewire Components
 * File: Label.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Label } from '../../resources/react/src/ui/Label';

it('links to a control and derives its data-test from htmlFor', () => {
  render(<Label htmlFor="email">Email</Label>);
  const label = screen.getByTestId('email-label');
  expect(label).toHaveAttribute('for', 'email');
  expect(label).toHaveTextContent('Email');
});

it('renders an accessible required marker', () => {
  render(
    <Label htmlFor="email" required>
      Email
    </Label>
  );
  expect(screen.getByText('(required)')).toHaveClass('sr-only');
});
