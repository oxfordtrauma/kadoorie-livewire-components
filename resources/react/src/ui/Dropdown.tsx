/**
 * Project: Kadoorie Livewire Components
 * File: Dropdown.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useDisclosure } from '../hooks/useDisclosure';
import { useDismiss } from '../hooks/useDismiss';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Icon } from './Icon';

const DEFAULT_TRIGGER_CLASS =
  'kad-focusable inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-sm font-medium text-text hover:bg-surface-muted';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  trigger?: ReactNode;
  align?: 'left' | 'right';
  triggerClass?: string;
  triggerTest?: string;
}

/**
 * Menu button revealing a `role="menu"` popover, with focus trapping (and
 * return), Arrow up/down roving over menu items, and Esc/outside dismissal.
 * Mirrors the Blade `dropdown` view.
 */
export function Dropdown({
  label,
  trigger,
  align = 'right',
  triggerClass = DEFAULT_TRIGGER_CLASS,
  triggerTest = 'dropdown-trigger',
  children,
  className,
  ...rest
}: DropdownProps) {
  const { isOpen, toggle, close } = useDisclosure();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useFocusTrap(menuRef, isOpen);
  useDismiss(isOpen, close, { escape: true, outside: true, ref: rootRef });

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const menu = menuRef.current;

    if (menu === null) {
      return;
    }

    event.preventDefault();
    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'));

    if (items.length === 0) {
      return;
    }

    const index = items.indexOf(document.activeElement as HTMLElement);
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const next = (index + delta + items.length) % items.length;
    items[next].focus();
  }

  return (
    <div
      ref={rootRef}
      data-test="dropdown"
      className={cn('relative inline-block text-left', className)}
      {...rest}
    >
      <button
        type="button"
        data-test={triggerTest}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggle}
        className={triggerClass}
      >
        {trigger !== undefined ? (
          trigger
        ) : (
          <>
            {label}
            <Icon name="chevron-down" size="sm" className="text-text-muted-large" />
          </>
        )}
      </button>

      <div
        ref={menuRef}
        role="menu"
        tabIndex={-1}
        data-test="dropdown-menu"
        hidden={!isOpen}
        onKeyDown={onMenuKeyDown}
        className={cn(
          'absolute z-50 mt-1 min-w-44 rounded-md border border-border bg-surface p-1 shadow-lg',
          align === 'left' ? 'left-0' : 'right-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export interface DropdownItemProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {}

/**
 * A dropdown menu entry, rendered as a link when `href` is set, otherwise a
 * button. Mirrors the Blade `dropdown-item` view.
 */
export function DropdownItem({
  href,
  type = 'button',
  children,
  className,
  ...rest
}: DropdownItemProps) {
  const classes = cn(
    'kad-focusable flex min-h-11 w-full items-center gap-2 rounded px-3 text-left text-sm text-text-body hover:bg-surface-muted',
    className
  );

  if (href !== undefined) {
    return (
      <a
        role="menuitem"
        href={href}
        data-test="dropdown-item"
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button role="menuitem" type={type} data-test="dropdown-item" className={classes} {...rest}>
      {children}
    </button>
  );
}
