/**
 * Project: Kadoorie Livewire Components
 * File: ContextPill.tsx
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export interface ContextPillProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  value?: string;
}

/** Static label/value context. This component has no selection behaviour. */
export function ContextPill({ label, value, className, ...rest }: ContextPillProps) {
  return (
    <span
      data-test="context-pill"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[10px] bg-bg px-3 py-1.5 text-sm',
        className
      )}
      {...rest}
    >
      <span data-test="context-pill-label" className="whitespace-nowrap text-text-body">
        {label}
      </span>
      {value !== undefined ? (
        <span
          data-test="context-pill-value"
          className="border-l border-text pl-1.5 font-semibold text-text"
        >
          {value}
        </span>
      ) : null}
    </span>
  );
}
