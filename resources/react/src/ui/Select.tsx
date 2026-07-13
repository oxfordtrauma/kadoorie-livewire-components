/**
 * Project: Kadoorie Livewire Components
 * File: Select.tsx
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
import { Icon } from './Icon';

export type SelectOptions = Record<string, string> | ReadonlyArray<[string, string]>;

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  name: string;
  id?: string;
  size?: Size;
  options?: SelectOptions;
  placeholder?: string;
  hint?: string;
  error?: string;
}

function toEntries(options: SelectOptions | undefined): ReadonlyArray<[string, string]> {
  if (options === undefined) {
    return [];
  }

  return Array.isArray(options) ? options : Object.entries(options);
}

/**
 * Native select mirroring the Blade `select` view (token-styled chevron,
 * optional placeholder), inheriting hint/error from a wrapping <Field>.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { name, id, size = 'md', options, placeholder, hint, error, className, children, ...rest },
  ref
) {
  const { hint: effectiveHint, error: effectiveError } = useInheritedFieldState(hint, error);
  const field = useFieldState({ name, id, hint: effectiveHint, error: effectiveError });

  return (
    <div className="relative" data-test={`${name}-select-wrap`}>
      <select
        ref={ref}
        id={field.fieldId}
        name={name}
        data-test={`${name}-select`}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        className={cn(
          'kad-focusable block w-full appearance-none rounded-md border border-border bg-surface text-text shadow-sm min-h-11 pr-10 aria-[invalid=true]:border-danger disabled:opacity-50 disabled:cursor-not-allowed',
          inputSize[size],
          className
        )}
        {...rest}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {toEntries(options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted-large">
        <Icon name="chevron-down" size="sm" />
      </span>
    </div>
  );
});
