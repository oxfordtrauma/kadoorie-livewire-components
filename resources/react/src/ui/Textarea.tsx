/**
 * Project: Kadoorie Livewire Components
 * File: Textarea.tsx
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  id?: string;
  size?: Size;
  hint?: string;
  error?: string;
}

/**
 * Multiline text input mirroring the Blade `textarea` view, inheriting
 * hint/error from a wrapping <Field>.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { name, id, size = 'md', rows = 3, hint, error, className, ...rest },
  ref
) {
  const { hint: effectiveHint, error: effectiveError } = useInheritedFieldState(hint, error);
  const field = useFieldState({ name, id, hint: effectiveHint, error: effectiveError });

  return (
    <textarea
      ref={ref}
      id={field.fieldId}
      name={name}
      rows={rows}
      data-test={`${name}-textarea`}
      aria-describedby={field.describedBy}
      aria-invalid={field.invalid || undefined}
      className={cn(
        'kad-focusable block w-full rounded-md border border-border bg-surface text-text shadow-sm min-h-11 py-2 placeholder:text-text-disabled aria-[invalid=true]:border-danger disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-surface-muted',
        inputSize[size],
        className
      )}
      {...rest}
    />
  );
});
