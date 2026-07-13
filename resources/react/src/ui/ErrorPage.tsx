/**
 * Project: Kadoorie Livewire Components
 * File: ErrorPage.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { httpErrorCopy } from '../lib/httpErrorStatus';

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: number;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Single parameterised error page covering 401–502 plus a generic fallback via
 * the `httpErrorStatus` map. Copy can be overridden per instance; a default
 * "Back to home" action renders when no `actions` are supplied. Mirrors the
 * Blade `error-page` view.
 */
export function ErrorPage({
  status = 500,
  title,
  description,
  actions,
  className,
  ...rest
}: ErrorPageProps) {
  const copy = httpErrorCopy(status);
  const resolvedTitle = title ?? copy.title;
  const resolvedDescription = description ?? copy.description;

  return (
    <div
      data-test="kadoorie-error-page"
      className={cn('flex min-h-dvh items-center justify-center bg-bg p-4', className)}
      {...rest}
    >
      <main id="main-content" className="w-full max-w-md text-center">
        <p data-test="error-page-status" className="kad-nums text-5xl font-bold text-primary">
          {status}
        </p>

        <h1 data-test="error-page-title" className="mt-2 text-2xl font-semibold text-text">
          {resolvedTitle}
        </h1>

        <p className="mt-2 text-sm text-text-muted">{resolvedDescription}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {actions !== undefined ? (
            actions
          ) : (
            <a
              href="/"
              data-test="error-page-home"
              className="kad-focusable inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-on-primary hover:bg-primary-hover"
            >
              Back to home
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
