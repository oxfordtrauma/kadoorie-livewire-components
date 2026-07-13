/**
 * Project: Kadoorie Livewire Components
 * File: Tooltip.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useId, useState } from 'react';
import { cn } from '../lib/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  placement?: TooltipPlacement;
  id?: string;
}

/** Mirror of Tooltip::positionClasses(). */
const position: Record<TooltipPlacement, string> = {
  bottom: 'top-full left-1/2 mt-1 -translate-x-1/2',
  left: 'right-full top-1/2 mr-1 -translate-y-1/2',
  right: 'left-full top-1/2 ml-1 -translate-y-1/2',
  top: 'bottom-full left-1/2 mb-1 -translate-x-1/2',
};

/**
 * Tooltip mirroring the Blade `tooltip` view: shows on hover/focus, hides on
 * Escape, and never traps focus. The trigger is `aria-describedby` the tooltip.
 */
export function Tooltip({
  text,
  placement = 'top',
  id,
  className,
  children,
  ...rest
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  return (
    // The wrapper only toggles tooltip visibility on hover/focus/Escape; the
    // focusable trigger below is the interactive element (mirrors the Blade view).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      data-test="tooltip-wrap"
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      }}
      {...rest}
    >
      {/* Focusable trigger so keyboard users can reveal the tooltip (Blade parity). */}
      {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
      <span
        tabIndex={0}
        aria-describedby={tooltipId}
        data-test="tooltip-trigger"
        className="kad-focusable inline-flex rounded"
      >
        {children}
      </span>
      {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}

      {open && (
        <span
          role="tooltip"
          id={tooltipId}
          data-test="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded bg-secondary px-2 py-1 text-xs text-white shadow-md',
            position[placement]
          )}
        >
          {text}
        </span>
      )}
    </span>
  );
}
