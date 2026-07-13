/**
 * Project: Kadoorie Livewire Components
 * File: AppLayout.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { type ReactNode } from 'react';

export interface AppLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

/**
 * Application page shell: a skip link, an optional `header`, the main content
 * region (on the app body colour), and an optional `footer`. Owns the document
 * landmarks. Mirrors the Blade `app-layout` view.
 */
export function AppLayout({ header, footer, children }: AppLayoutProps) {
  return (
    <div data-test="app-layout" className="flex min-h-screen flex-col bg-body">
      <a
        href="#main-content"
        data-test="app-layout-skip-link"
        className="sr-only rounded bg-surface px-3 py-2 text-sm font-medium text-primary focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
      >
        Skip to content
      </a>

      {header}

      <main id="main-content" data-test="app-layout-main" className="flex-1 bg-body">
        {children}
      </main>

      {footer}
    </div>
  );
}
