/**
 * Project: Kadoorie Livewire Components
 * File: Button.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { buttonSize, buttonVariant, type ButtonVariant, type Size } from '../lib/variants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
}

/**
 * Button mirroring the Blade `button` view (variant/size/loading), with an
 * override-safe `data-test` and full native button passthrough.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? 'button'}
      data-test="kadoorie-button"
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(
        'kad-focusable inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium min-h-11 transition select-none disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariant[variant],
        buttonSize[size],
        className
      )}
      {...rest}
    >
      {loading && (
        <span data-test="kadoorie-button-spinner" className="kad-spinner" aria-hidden="true" />
      )}
      {children}
    </button>
  );
});
