/**
 * Project: Kadoorie Livewire Components
 * File: Field.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Field } from '../../resources/react/src/ui/Field';
import { Input } from '../../resources/react/src/ui/Input';

it('renders label, hint and error with the expected data-test ids', () => {
  render(
    <Field name="email" label="Email" hint="Work address" error="Required">
      <Input name="email" />
    </Field>
  );
  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('email-label')).toHaveAttribute('for', 'email');
  expect(screen.getByTestId('email-hint')).toHaveAttribute('id', 'email-hint');
  const error = screen.getByTestId('email-error');
  expect(error).toHaveAttribute('role', 'alert');
  expect(error).toHaveAttribute('id', 'email-error');
});

it('passes hint and error down to a nested control via context', () => {
  render(
    <Field name="email" label="Email" hint="Work address" error="Required">
      <Input name="email" />
    </Field>
  );
  const input = screen.getByTestId('email-input');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-describedby', 'email-hint email-error');
});

it('omits hint and error blocks when not provided', () => {
  render(
    <Field name="bio" label="Bio">
      <Input name="bio" />
    </Field>
  );
  expect(screen.queryByTestId('bio-hint')).not.toBeInTheDocument();
  expect(screen.queryByTestId('bio-error')).not.toBeInTheDocument();
  expect(screen.getByTestId('bio-input')).not.toHaveAttribute('aria-invalid');
});
