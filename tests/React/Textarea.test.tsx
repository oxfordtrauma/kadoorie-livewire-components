/**
 * Project: Kadoorie Livewire Components
 * File: Textarea.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Textarea } from '../../resources/react/src/ui/Textarea';

it('wires id, name, rows and data-test from the name', () => {
  render(<Textarea name="bio" rows={4} />);
  const textarea = screen.getByTestId('bio-textarea');
  expect(textarea).toHaveAttribute('id', 'bio');
  expect(textarea).toHaveAttribute('name', 'bio');
  expect(textarea).toHaveAttribute('rows', '4');
});

it('describes an error and accepts typing', async () => {
  render(<Textarea name="bio" error="Too short" />);
  const textarea = screen.getByTestId('bio-textarea');
  expect(textarea).toHaveAttribute('aria-invalid', 'true');
  expect(textarea).toHaveAttribute('aria-describedby', 'bio-error');
  await userEvent.type(textarea, 'ok');
  expect(textarea).toHaveValue('ok');
});
