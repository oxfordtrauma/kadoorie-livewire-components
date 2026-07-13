/**
 * Project: Kadoorie Livewire Components
 * File: useDismiss.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useEffect, type RefObject } from 'react';

export interface DismissOptions {
  escape?: boolean;
  outside?: boolean;
  ref?: RefObject<HTMLElement | null>;
}

/**
 * Invoke `onDismiss` when the user presses Escape or clicks outside the optional
 * `ref` element while `active` is true (mirrors the Esc/backdrop dismissal of
 * the Blade overlays). Both triggers can be toggled independently.
 */
export function useDismiss(
  active: boolean,
  onDismiss: () => void,
  { escape = true, outside = false, ref }: DismissOptions = {}
): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') {
      return;
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (escape && event.key === 'Escape') {
        onDismiss();
      }
    }

    function onPointerDown(event: MouseEvent): void {
      if (!outside) {
        return;
      }

      const element = ref?.current;

      if (element !== null && element !== undefined && !element.contains(event.target as Node)) {
        onDismiss();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [active, onDismiss, escape, outside, ref]);
}
