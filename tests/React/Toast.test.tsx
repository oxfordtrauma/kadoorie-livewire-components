/**
 * Project: Kadoorie Livewire Components
 * File: Toast.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from '../../resources/react/src/ui/Toast';

function Trigger({ duration }: { duration?: number }) {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ message: 'Saved!', tone: 'success', duration })}>
      Notify
    </button>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

it('renders a persistent polite live region', () => {
  render(<ToastProvider />);
  const region = screen.getByTestId('toast-region');
  expect(region).toHaveAttribute('aria-live', 'polite');
});

it('pushes a toast and auto-dismisses after its duration', () => {
  render(
    <ToastProvider>
      <Trigger duration={1000} />
    </ToastProvider>
  );

  fireEvent.click(screen.getByText('Notify'));
  expect(screen.getByTestId('toast-message')).toHaveTextContent('Saved!');

  act(() => {
    vi.advanceTimersByTime(1000);
  });
  expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
});

it('lets the user dismiss a toast manually', () => {
  render(
    <ToastProvider>
      <Trigger duration={0} />
    </ToastProvider>
  );

  fireEvent.click(screen.getByText('Notify'));
  expect(screen.getByTestId('toast')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('toast-dismiss'));
  expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
});
