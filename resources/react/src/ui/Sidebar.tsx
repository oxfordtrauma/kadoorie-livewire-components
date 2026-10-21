/**
 * Project: Kadoorie Livewire Components
 * File: Sidebar.tsx
 * User: stodd
 * Created: 2026-09-15
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.0.0
 */

/**
 * Responsive page composition with an optional navigation/sidebar region.
 * Search is intentionally a supplied node: this component owns no query or
 * filtering behaviour.
 */
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: ReactNode;
  actions?: ReactNode;
  search?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function Sidebar({
  sidebar,
  actions,
  search,
  footer,
  children,
  className,
  ...rest
}: SidebarProps) {
  return (
    <div
      data-test="sidebar"
      className={cn('grid gap-4 lg:grid-cols-[auto_1fr]', className)}
      {...rest}
    >
      <aside
        data-test="sidebar-aside"
        aria-label="Sidebar"
        className="flex min-w-0 flex-col gap-4 border-b border-border bg-surface p-4 lg:border-b-0 lg:border-r"
      >
        {actions !== undefined ? <div data-test="sidebar-actions">{actions}</div> : null}
        {search !== undefined ? <div data-test="sidebar-search">{search}</div> : null}
        <nav data-test="sidebar-content" aria-label="Sidebar navigation" className="min-w-0 flex-1">
          {sidebar}
        </nav>
        {footer !== undefined ? <div data-test="sidebar-footer">{footer}</div> : null}
      </aside>
      <main data-test="sidebar-main" className="min-w-0">
        {children}
      </main>
    </div>
  );
}
