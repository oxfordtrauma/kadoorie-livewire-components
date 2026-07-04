/**
 * Project: Kadoorie Livewire Components
 * File: Spinner.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Spinner } from '../../resources/react/src/ui/Spinner';

it('exposes a status role with an sr-only label', () => {
  render(<Spinner label="Loading data" />);
  const spinner = screen.getByTestId('spinner');
  expect(spinner).toHaveAttribute('role', 'status');
  expect(spinner).toHaveTextContent('Loading data');
});
