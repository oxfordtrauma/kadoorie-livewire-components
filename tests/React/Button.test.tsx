/**
 * Project: Kadoorie Livewire Components
 * File: Button.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Button } from '../../resources/react/src/ui/Button';

it('renders a primary button and fires onClick', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Save</Button>);
  const btn = screen.getByTestId('kadoorie-button');
  expect(btn).toHaveTextContent('Save');
  await userEvent.click(btn);
  expect(onClick).toHaveBeenCalledOnce();
});

it('is disabled and busy while loading, and does not fire onClick', async () => {
  const onClick = vi.fn();
  render(
    <Button loading onClick={onClick}>
      Deleting
    </Button>
  );
  const btn = screen.getByTestId('kadoorie-button');
  expect(btn).toBeDisabled();
  expect(btn).toHaveAttribute('aria-busy', 'true');
  expect(screen.getByTestId('kadoorie-button-spinner')).toBeInTheDocument();
  await userEvent.click(btn);
  expect(onClick).not.toHaveBeenCalled();
});

it('applies variant and size classes from the shared maps', () => {
  render(
    <Button variant="danger" size="lg">
      Delete
    </Button>
  );
  const btn = screen.getByTestId('kadoorie-button');
  expect(btn).toHaveClass('bg-danger');
  expect(btn).toHaveClass('text-base');
});

it('lets a caller override data-test and class', () => {
  render(
    <Button data-test="login-submit" className="w-full">
      Sign in
    </Button>
  );
  expect(screen.getByTestId('login-submit')).toHaveClass('w-full');
});
