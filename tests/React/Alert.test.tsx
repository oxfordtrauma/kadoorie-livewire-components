/**
 * Project: Kadoorie Livewire Components
 * File: Alert.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Alert } from '../../resources/react/src/ui/Alert';

it('renders a title and body with the tone role', () => {
  render(
    <Alert tone="success" title="Saved">
      Your changes were saved.
    </Alert>
  );
  expect(screen.getByTestId('alert')).toHaveAttribute('role', 'status');
  expect(screen.getByTestId('alert-title')).toHaveTextContent('Saved');
  expect(screen.getByTestId('alert-body')).toHaveTextContent('Your changes were saved.');
});

it('uses role=alert for the danger tone', () => {
  render(<Alert tone="danger">Something went wrong</Alert>);
  expect(screen.getByTestId('alert')).toHaveAttribute('role', 'alert');
});

it('dismisses itself when the dismiss button is clicked', async () => {
  render(
    <Alert dismissible title="Heads up">
      Body
    </Alert>
  );
  expect(screen.getByTestId('alert')).toBeInTheDocument();
  await userEvent.click(screen.getByTestId('alert-dismiss'));
  expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
});
