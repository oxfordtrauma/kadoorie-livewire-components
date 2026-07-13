/**
 * Project: Kadoorie Livewire Components
 * File: Notification.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { IconButton } from './IconButton';

export interface NotificationProps {
  count?: number;
  label?: string;
}

/**
 * Notification bell with an optional unread count badge. The count is folded
 * into the button's accessible name; the badge is decorative. Mirrors the Blade
 * `notification` view.
 */
export function Notification({ count, label = 'Notifications' }: NotificationProps) {
  const hasCount = count !== undefined && count > 0;
  const display = (count ?? 0) > 99 ? '99+' : String(count ?? 0);
  const accessibleLabel = hasCount ? `${label}, ${count} unread` : label;

  return (
    <div data-test="notification" className="relative inline-flex">
      <IconButton icon="bell" label={accessibleLabel} variant="pill" />
      {hasCount ? (
        <span
          data-test="notification-count"
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 inline-flex min-w-4 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-primary px-1 text-2xs font-semibold leading-4 text-on-primary"
        >
          {display}
        </span>
      ) : null}
    </div>
  );
}
