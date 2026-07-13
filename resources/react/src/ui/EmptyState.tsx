/**
 * Project: Kadoorie Livewire Components
 * File: EmptyState.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  status?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
}

/**
 * Centred placeholder for empty collections: optional icon, heading, optional
 * description, and an optional action region. Mirrors the Blade `empty-state`
 * view (`role="status"` when `status`).
 */
export function EmptyState({
  heading,
  description,
  status = false,
  icon,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      data-test="empty-state"
      role={status ? 'status' : undefined}
      className={cn('flex flex-col items-center justify-center gap-3 p-8 text-center', className)}
      {...rest}
    >
      {icon !== undefined ? (
        <div className="text-text-muted-large" data-test="empty-state-icon">
          {icon}
        </div>
      ) : null}

      <h3 className="text-base font-semibold text-text" data-test="empty-state-heading">
        {heading}
      </h3>

      {description !== undefined ? (
        <p className="max-w-sm text-sm text-text-muted">{description}</p>
      ) : null}

      {action !== undefined ? (
        <div className="mt-2" data-test="empty-state-action">
          {action}
        </div>
      ) : null}
    </div>
  );
}
