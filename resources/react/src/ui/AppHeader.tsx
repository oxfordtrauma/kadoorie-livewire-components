/**
 * Project: Kadoorie Livewire Components
 * File: AppHeader.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { type ReactNode } from 'react';
import { Icon } from './Icon';
import { Divider } from './Divider';

export interface AppHeaderProps {
  brand?: string;
  logo?: ReactNode;
  start?: ReactNode;
  subbar?: ReactNode;
  children?: ReactNode;
}

/**
 * Application top bar: a logo (brand mark by default, or a `logo`), an optional
 * `start` area for contextual selectors, a right-aligned actions area
 * (children), and an optional `subbar` second row. Mirrors the Blade
 * `app-header` view.
 */
export function AppHeader({ brand = 'Kadoorie', logo, start, subbar, children }: AppHeaderProps) {
  return (
    <header data-test="app-header" className="w-full border-b border-stroke bg-surface shadow-sm">
      <div className="flex items-center gap-4 px-4 py-2">
        <div
          data-test="app-header-logo"
          className="flex shrink-0 items-center gap-2 font-semibold text-text"
        >
          {logo ?? (
            <>
              <Icon name="kadoorie:mark" size="md" className="text-primary" />
              {brand}
            </>
          )}
        </div>

        {start !== undefined && start !== null ? (
          <>
            <Divider orientation="vertical" className="h-6 bg-stroke" />
            <div data-test="app-header-start" className="flex items-center gap-3">
              {start}
            </div>
          </>
        ) : null}

        <div data-test="app-header-actions" className="ml-auto flex items-center gap-3">
          {children}
        </div>
      </div>

      {subbar !== undefined && subbar !== null ? (
        <div data-test="app-header-subbar" className="border-t border-stroke px-5 py-2">
          {subbar}
        </div>
      ) : null}
    </header>
  );
}
