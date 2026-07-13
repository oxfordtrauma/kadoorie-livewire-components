/**
 * Project: Kadoorie Livewire Components
 * File: IconButton.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: 'ghost' | 'pill';
}

const VARIANTS: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost: 'rounded-md text-text hover:bg-surface-muted',
  pill: 'rounded-full bg-bg text-text hover:bg-surface-muted',
};

/**
 * Icon-only button. `label` is required and becomes the aria-label. The `pill`
 * variant adds the light rounded container used in the app header. Mirrors the
 * Blade `icon-button` view.
 */
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  type = 'button',
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      data-test="icon-button"
      className={cn(
        'kad-focusable relative inline-flex size-9 shrink-0 items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        className
      )}
      {...rest}
    >
      <Icon name={icon} size="md" />
      {children}
    </button>
  );
}
