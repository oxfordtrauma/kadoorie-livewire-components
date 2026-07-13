/**
 * Project: Kadoorie Livewire Components
 * File: Card.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  title?: string;
  footer?: ReactNode;
}

/**
 * Surface container with optional header (or plain `title`), body, and footer
 * regions — mirrors the Blade `card` view and its data-test hooks.
 */
export function Card({ header, title, footer, children, className, ...rest }: CardProps) {
  return (
    <div
      data-test="card"
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-surface shadow-sm',
        className
      )}
      {...rest}
    >
      {header !== undefined ? (
        <div data-test="card-header" className="border-b border-border px-4 py-3">
          {header}
        </div>
      ) : title !== undefined ? (
        <div data-test="card-header" className="border-b border-border px-4 py-3">
          <h3 className="text-base font-semibold text-text">{title}</h3>
        </div>
      ) : null}

      <div data-test="card-body" className="p-4 text-sm text-text-body">
        {children}
      </div>

      {footer !== undefined ? (
        <div data-test="card-footer" className="border-t border-border bg-surface-muted px-4 py-3">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
