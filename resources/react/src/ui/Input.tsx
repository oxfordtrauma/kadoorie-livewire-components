/**
 * Project: Kadoorie Livewire Components
 * File: Input.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { useFieldState } from '../hooks/useFieldState';
import { inputSize, type Size } from '../lib/variants';
import { useInheritedFieldState } from './fieldContext';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  id?: string;
  size?: Size;
  hint?: string;
  error?: string;
}

/**
 * Text input mirroring the Blade `input` view. Inherits hint/error from a
 * wrapping <Field> and wires `aria-describedby`/`aria-invalid` accordingly.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, id, type = 'text', size = 'md', hint, error, className, ...rest },
  ref
) {
  const { hint: effectiveHint, error: effectiveError } = useInheritedFieldState(hint, error);
  const field = useFieldState({ name, id, hint: effectiveHint, error: effectiveError });

  return (
    <input
      ref={ref}
      type={type}
      id={field.fieldId}
      name={name}
      data-test={`${name}-input`}
      aria-describedby={field.describedBy}
      aria-invalid={field.invalid || undefined}
      className={cn(
        'kad-focusable block w-full rounded-md border border-border bg-surface text-text shadow-sm min-h-11 placeholder:text-text-disabled aria-[invalid=true]:border-danger disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface-muted',
        inputSize[size],
        className
      )}
      {...rest}
    />
  );
});
