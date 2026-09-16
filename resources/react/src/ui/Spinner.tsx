/**
 * Project: Kadoorie Livewire Components
 * File: Spinner.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import type { Size } from '../lib/variants';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  label?: string;
}

/** Mirror of Spinner::diameterClass(): the spinner scales to its font-size. */
const diameter: Record<Size, string> = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-3xl',
};

/**
 * Spinner mirroring the Blade `spinner` view: a `role="status"` element with an
 * sr-only label and a diameter that scales via a text utility.
 */
export function Spinner({ size = 'md', label = 'Loading...', className, ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      data-test="spinner"
      className={cn('inline-flex items-center text-current', className)}
      {...rest}
    >
      <span className={cn('kad-spinner', diameter[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
