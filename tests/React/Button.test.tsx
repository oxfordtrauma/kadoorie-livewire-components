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

it.each([
  ['xs', 'min-h-11', 'text-xs'],
  ['sm', 'min-h-11', 'text-xs'],
  ['md', 'min-h-11', 'text-sm'],
  ['lg', 'min-h-11', 'text-base'],
] as const)(
  'renders the %s size with owned dimensions and typography',
  (size, height, typography) => {
    render(<Button size={size}>Action</Button>);
    expect(screen.getByTestId('kadoorie-button')).toHaveClass(height, typography);
  }
);

it('renders leading and trailing registry icons', () => {
  const { rerender } = render(<Button leadingIcon="check">Approve</Button>);
  expect(screen.getByTestId('kadoorie-button').querySelector('[data-test="kadoorie-icon"]')).toBeInTheDocument();
  rerender(<Button trailingIcon="chevron-right">Continue</Button>);
  expect(screen.getByTestId('kadoorie-button').querySelector('[data-test="kadoorie-icon"]')).toBeInTheDocument();
});

it('keeps loading content understandable while suppressing optional adornments', () => {
  render(
    <Button loading leadingIcon="check">
      Saving
    </Button>
  );
  const button = screen.getByTestId('kadoorie-button');
  expect(button).toHaveTextContent('Saving');
  expect(button.querySelectorAll('[data-test="kadoorie-icon"]')).toHaveLength(0);
  expect(button).not.toHaveTextContent('2 pending actions');
});

it('lets a caller override data-test and class', () => {
  render(
    <Button data-test="login-submit" className="w-full">
      Sign in
    </Button>
  );
  expect(screen.getByTestId('login-submit')).toHaveClass('w-full');
});
