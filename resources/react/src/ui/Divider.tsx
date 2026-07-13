/**
 * Project: Kadoorie Livewire Components
 * File: Divider.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Separator rule. Vertical renders a thin bar; horizontal renders an `<hr>`, or
 * a labelled row when children are supplied — mirrors the Blade `divider` view.
 */
export function Divider({
  orientation = 'horizontal',
  children,
  className,
  ...rest
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        data-test="divider"
        className={cn('inline-block w-px self-stretch bg-border', className)}
        {...rest}
      />
    );
  }

  if (children !== undefined && children !== null && children !== false) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        data-test="divider"
        className={cn('flex items-center gap-3 text-xs text-text-muted', className)}
        {...rest}
      >
        <span className="h-px flex-1 bg-border" />
        {children}
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  // An <hr> already carries the implicit role="separator", matching the Blade
  // divider's explicit role without the redundant attribute.
  return (
    <hr
      data-test="divider"
      className={cn('border-0 border-t border-border', className)}
      {...(rest as React.HTMLAttributes<HTMLHRElement>)}
    />
  );
}
