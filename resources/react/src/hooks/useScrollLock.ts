/**
 * Project: Kadoorie Livewire Components
 * File: useScrollLock.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useEffect } from 'react';

/**
 * Lock <body> scroll while `active` is true (mirrors Alpine `x-trap.noscroll`).
 * Restores the previous overflow value on deactivation/unmount.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') {
      return;
    }

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previous;
    };
  }, [active]);
}
