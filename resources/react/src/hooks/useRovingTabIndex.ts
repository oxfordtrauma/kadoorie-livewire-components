/**
 * Project: Kadoorie Livewire Components
 * File: useRovingTabIndex.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useCallback, useRef, type KeyboardEvent } from 'react';

export interface RovingItemProps {
  ref: (element: HTMLElement | null) => void;
  tabIndex: number;
  onKeyDown: (event: KeyboardEvent) => void;
}

export interface RovingTabIndex {
  itemProps: (id: string) => RovingItemProps;
}

/**
 * Roving tabindex helper for a horizontal widget (tablist): only the active
 * item is tabbable, and Arrow Left/Right/Home/End move activation and focus
 * (mirrors the Alpine `next()/prev()/go()` handlers in the Blade tabs view).
 */
export function useRovingTabIndex(
  ids: string[],
  activeId: string,
  onActivate: (id: string) => void
): RovingTabIndex {
  const refs = useRef(new Map<string, HTMLElement>());

  const go = useCallback(
    (id: string) => {
      onActivate(id);
      refs.current.get(id)?.focus();
    },
    [onActivate]
  );

  const itemProps = useCallback(
    (id: string): RovingItemProps => ({
      ref: (element) => {
        if (element === null) {
          refs.current.delete(id);
        } else {
          refs.current.set(id, element);
        }
      },
      tabIndex: id === activeId ? 0 : -1,
      onKeyDown: (event) => {
        const index = ids.indexOf(id);

        if (index === -1) {
          return;
        }

        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault();
            go(ids[(index + 1) % ids.length]);
            break;
          case 'ArrowLeft':
            event.preventDefault();
            go(ids[(index - 1 + ids.length) % ids.length]);
            break;
          case 'Home':
            event.preventDefault();
            go(ids[0]);
            break;
          case 'End':
            event.preventDefault();
            go(ids[ids.length - 1]);
            break;
          default:
            break;
        }
      },
    }),
    [ids, activeId, go]
  );

  return { itemProps };
}
