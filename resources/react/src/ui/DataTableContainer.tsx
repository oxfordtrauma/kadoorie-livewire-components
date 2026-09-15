/**
 * Project: Kadoorie Livewire Components
 * File: DataTableContainer.tsx
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

/** Generic frame for table, list, and directory-style content. */
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface DataTableContainerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  headingIcon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
  toolbar?: ReactNode;
  children?: ReactNode;
}

export function DataTableContainer({
  headingIcon,
  title,
  description,
  summary,
  actions,
  toolbar,
  children,
  className,
  ...rest
}: DataTableContainerProps) {
  const hasHeading =
    headingIcon !== undefined ||
    title !== undefined ||
    description !== undefined ||
    summary !== undefined ||
    actions !== undefined;
  return (
    <section
      data-test="data-table-container"
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-surface shadow-sm',
        className
      )}
      {...rest}
    >
      {hasHeading ? (
        <header
          data-test="data-table-container-header"
          className="flex flex-wrap items-start gap-3 border-b border-border px-4 py-3"
        >
          {headingIcon !== undefined ? (
            <div data-test="data-table-container-icon" className="shrink-0">
              {headingIcon}
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            {title !== undefined ? (
              <h2
                data-test="data-table-container-title"
                className="text-base font-semibold text-text"
              >
                {title}
              </h2>
            ) : null}
            {description !== undefined ? (
              <p
                data-test="data-table-container-description"
                className="mt-1 text-sm text-text-muted"
              >
                {description}
              </p>
            ) : null}
            {summary !== undefined ? (
              <div
                data-test="data-table-container-summary"
                className="mt-2 text-sm text-text-muted"
              >
                {summary}
              </div>
            ) : null}
          </div>
          {actions !== undefined ? (
            <div
              data-test="data-table-container-actions"
              className="flex shrink-0 flex-wrap items-center gap-2"
            >
              {actions}
            </div>
          ) : null}
        </header>
      ) : null}
      {toolbar !== undefined ? (
        <div data-test="data-table-container-toolbar" className="border-b border-border px-4 py-3">
          {toolbar}
        </div>
      ) : null}
      <div data-test="data-table-container-content" className="min-w-0">
        {children}
      </div>
    </section>
  );
}
