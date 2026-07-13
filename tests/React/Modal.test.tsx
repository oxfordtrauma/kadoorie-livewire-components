/**
 * Project: Kadoorie Livewire Components
 * File: Modal.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Modal } from '../../resources/react/src/ui/Modal';

it('renders the dialog with title, body and aria wiring when open', () => {
  render(<Modal defaultOpen title="Delete item" description="This cannot be undone." id="m1" />);
  const dialog = screen.getByTestId('modal-dialog');
  expect(dialog).toHaveAttribute('role', 'dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby', 'm1-title');
  expect(dialog).toHaveAttribute('aria-describedby', 'm1-desc');
  expect(screen.getByTestId('modal-title')).toHaveTextContent('Delete item');
  expect(screen.getByTestId('modal-body')).toHaveTextContent('This cannot be undone.');
});

it('does not render the dialog when closed', () => {
  render(<Modal title="Hidden" />);
  expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument();
});

it('calls onOpenChange(false) when the close button is clicked', async () => {
  const onOpenChange = vi.fn();
  render(<Modal defaultOpen title="Closable" onOpenChange={onOpenChange} />);
  await userEvent.click(screen.getByTestId('modal-close'));
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

it('dismisses on Escape when dismissible', async () => {
  const onOpenChange = vi.fn();
  render(<Modal defaultOpen title="Esc" onOpenChange={onOpenChange} />);
  await userEvent.keyboard('{Escape}');
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

it('does not render a close button when not dismissible', () => {
  render(<Modal defaultOpen dismissible={false} title="Locked" />);
  expect(screen.queryByTestId('modal-close')).not.toBeInTheDocument();
});
