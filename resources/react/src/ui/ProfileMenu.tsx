/**
 * Project: Kadoorie Livewire Components
 * File: ProfileMenu.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import type { ReactNode } from 'react';
import { Dropdown, DropdownItem } from './Dropdown';
import { Avatar } from './Avatar';
import { Icon } from './Icon';

export interface ProfileMenuProps {
  name: string;
  email?: string;
  src?: string;
  initials?: string;
  changeDetailsUrl?: string;
  onLogout?: () => void;
  logoutUrl?: string;
  csrfToken?: string;
  logout?: ReactNode;
}

/**
 * Avatar dropdown with change-details and logout, reusing `<Dropdown>` for the
 * accessible menu (role=menu, arrow-nav, focus return). Auth-agnostic: supply an
 * `onLogout` callback, a `logoutUrl` (+ `csrfToken`, since React cannot read
 * Blade's `@csrf`) that renders a POST form, or a custom `logout` slot. Mirrors
 * the Blade `profile-menu` view.
 */
export function ProfileMenu({
  name,
  email,
  src,
  initials,
  changeDetailsUrl,
  onLogout,
  logoutUrl,
  csrfToken,
  logout,
}: ProfileMenuProps) {
  return (
    <Dropdown
      data-test="profile-menu"
      triggerTest="profile-menu-trigger"
      triggerClass="kad-focusable inline-flex min-h-11 items-center gap-2 rounded-full py-0.5 pl-0.5 pr-2 hover:bg-surface-muted"
      trigger={
        <>
          <Avatar alt={name} src={src} initials={initials} size="sm" />
          <span
            className="hidden text-sm font-medium text-text sm:inline"
            data-test="profile-menu-name"
          >
            {name}
          </span>
          <Icon name="chevron-down" size="sm" className="text-text-muted-large" />
        </>
      }
    >
      <div data-test="profile-menu-header" className="border-b border-border px-3 py-2">
        <p className="text-sm font-medium text-text">{name}</p>
        {email !== undefined ? <p className="text-xs text-text-muted">{email}</p> : null}
      </div>

      {changeDetailsUrl !== undefined ? (
        <DropdownItem href={changeDetailsUrl} data-test="profile-menu-change-details">
          Change details
        </DropdownItem>
      ) : null}

      {logout !== undefined ? (
        logout
      ) : onLogout !== undefined ? (
        <DropdownItem type="button" data-test="profile-menu-logout" onClick={onLogout}>
          Log out
        </DropdownItem>
      ) : logoutUrl !== undefined ? (
        <form
          method="POST"
          action={logoutUrl}
          data-test="profile-menu-logout-form"
          className="block"
        >
          {csrfToken !== undefined ? <input type="hidden" name="_token" value={csrfToken} /> : null}
          <DropdownItem type="submit" data-test="profile-menu-logout">
            Log out
          </DropdownItem>
        </form>
      ) : null}
    </Dropdown>
  );
}
