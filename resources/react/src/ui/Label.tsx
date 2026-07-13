/**
 * Project: Kadoorie Livewire Components
 * File: Label.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';

export interface LabelProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  htmlFor: string;
  required?: boolean;
}

/**
 * Form label mirroring the Blade `label` view: `{for}-label` data-test and an
 * accessible required marker.
 */
export function Label({ htmlFor, required = false, className, children, ...rest }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      data-test={`${htmlFor}-label`}
      className={cn('inline-flex items-center gap-1 text-sm font-medium text-text', className)}
      {...rest}
    >
      {children}
      {required && (
        <>
          <span className="text-danger" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
}
