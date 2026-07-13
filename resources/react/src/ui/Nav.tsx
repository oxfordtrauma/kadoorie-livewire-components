/**
 * Project: Kadoorie Livewire Components
 * File: Nav.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useRef, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useDisclosure } from '../hooks/useDisclosure';
import { useDismiss } from '../hooks/useDismiss';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Icon } from './Icon';

export interface NavItem {
  label: string;
  url: string;
  active?: boolean;
}

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  brand: ReactNode;
  brandUrl?: string;
  sticky?: boolean;
}

/**
 * Horizontal top bar on desktop that collapses below `md` into a hamburger
 * sheet (focus-trapped, Esc/outside-dismissible). Mirrors the Blade `nav` view,
 * including the skip link and optional `sticky` behaviour.
 */
export function Nav({
  items,
  brand,
  brandUrl = '#',
  sticky = false,
  className,
  ...rest
}: NavProps) {
  const { isOpen, toggle, close } = useDisclosure();
  const sheetRef = useRef<HTMLDivElement>(null);

  useFocusTrap(sheetRef, isOpen);
  useDismiss(isOpen, close, { escape: true, outside: true, ref: sheetRef });

  return (
    <nav
      data-test="nav"
      aria-label="Main"
      className={cn(
        'relative w-full border-b border-border bg-surface',
        sticky && 'sticky top-0 z-40',
        className
      )}
      {...rest}
    >
      <a
        href="#main-content"
        data-test="nav-skip-link"
        className="sr-only rounded bg-surface px-3 py-2 text-sm font-medium text-primary focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50"
      >
        Skip to content
      </a>

      <div className="mx-auto flex min-h-14 max-w-container items-center justify-between gap-4 px-4">
        <a
          href={brandUrl}
          data-test="nav-brand"
          className="kad-focusable inline-flex items-center gap-2 rounded font-semibold text-text"
        >
          <Icon name="kadoorie:leaf" size="md" className="text-primary" />
          {brand}
        </a>

        <ul data-test="nav-menu" className="hidden items-center gap-1 md:flex">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                data-test="nav-link"
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'kad-focusable inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium',
                  item.active
                    ? 'bg-primary-subtle text-primary'
                    : 'text-text-body hover:bg-surface-muted'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-test="nav-toggle"
          aria-controls="nav-sheet"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={toggle}
          className="kad-focusable inline-flex size-11 items-center justify-center rounded-md text-text md:hidden"
        >
          <Icon name={isOpen ? 'x' : 'menu'} size="md" />
        </button>
      </div>

      <div
        ref={sheetRef}
        id="nav-sheet"
        data-test="nav-sheet"
        role="region"
        aria-label="Main menu"
        hidden={!isOpen}
        className="border-t border-border bg-surface md:hidden"
      >
        <ul className="flex flex-col gap-1 px-2 py-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                data-test="nav-sheet-link"
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'kad-focusable flex min-h-11 items-center rounded-md px-3 text-sm font-medium',
                  item.active
                    ? 'bg-primary-subtle text-primary'
                    : 'text-text-body hover:bg-surface-muted'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
