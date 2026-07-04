/**
 * Project: Kadoorie Livewire Components
 * File: Field.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useMemo } from 'react';
import { cn } from '../lib/cn';
import { fieldId as computeFieldId, errorId, hintId } from '../lib/ids';
import { FieldContext } from './fieldContext';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

/**
 * Field wrapper mirroring the Blade `field` view: renders label/hint/error and
 * publishes hint/error to nested controls (the React analogue of `@aware`).
 */
export function Field({
  name,
  id,
  label,
  hint,
  error,
  required = false,
  className,
  children,
  ...rest
}: FieldProps) {
  const context = useMemo(() => ({ hint, error }), [hint, error]);
  const hasHint = hint !== undefined && hint !== '';
  const hasError = error !== undefined && error !== '';

  return (
    <div
      data-test={`${name}-field`}
      className={cn('kad-field flex flex-col gap-1.5', className)}
      {...rest}
    >
      {label !== undefined && label !== '' && (
        <label
          htmlFor={computeFieldId(name, id)}
          data-test={`${name}-label`}
          className="inline-flex items-center gap-1 text-sm font-medium text-text"
        >
          {label}
          {required && (
            <>
              <span className="text-danger" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </>
          )}
        </label>
      )}

      <FieldContext.Provider value={context}>{children}</FieldContext.Provider>

      {hasHint && (
        <p id={hintId(name, id)} data-test={`${name}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={errorId(name, id)}
          data-test={`${name}-error`}
          role="alert"
          className="text-xs text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
