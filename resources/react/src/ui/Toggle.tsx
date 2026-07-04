/**
 * Project: Kadoorie Livewire Components
 * File: Toggle.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { useControllableState } from '../hooks/useControllableState';
import { useFieldState } from '../hooks/useFieldState';
import { useInheritedFieldState } from './fieldContext';

export interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'defaultChecked'
> {
  name: string;
  id?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  hint?: string;
  error?: string;
}

/**
 * Accessible switch mirroring the Blade `toggle` view: a native checkbox with
 * role="switch" whose `aria-checked` is derived from React state (so it never
 * goes stale). Inherits hint/error from a wrapping <Field>.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    name,
    id,
    value = '',
    label,
    checked,
    defaultChecked,
    hint,
    error,
    className,
    onChange,
    ...rest
  },
  ref
) {
  const { hint: effectiveHint, error: effectiveError } = useInheritedFieldState(hint, error);
  const field = useFieldState({ name, id, hint: effectiveHint, error: effectiveError });
  const [isChecked, setChecked] = useControllableState<boolean>(
    checked,
    defaultChecked ?? false,
    undefined
  );

  return (
    <label
      data-test={`${name}-toggle-label`}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2"
    >
      <span className="relative inline-flex shrink-0">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={field.fieldId}
          name={name}
          value={value}
          data-test={`${name}-toggle`}
          checked={isChecked}
          aria-checked={isChecked}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid || undefined}
          onChange={(event) => {
            setChecked(event.target.checked);
            onChange?.(event);
          }}
          className={cn('peer sr-only', className)}
          {...rest}
        />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full bg-border-strong transition-colors peer-checked:bg-primary peer-focus-visible:shadow-[var(--kad-ring)] peer-disabled:opacity-50"
        />
        <span
          aria-hidden="true"
          className="absolute left-0.5 top-0.5 size-5 rounded-full bg-surface shadow-sm transition-transform peer-checked:translate-x-5"
        />
      </span>
      {label !== undefined && label !== '' && <span className="text-sm text-text">{label}</span>}
    </label>
  );
});
