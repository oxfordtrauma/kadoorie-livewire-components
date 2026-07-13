/**
 * Project: Kadoorie Livewire Components
 * File: useDisclosure.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useCallback } from 'react';
import { useControllableState } from './useControllableState';

export interface Disclosure {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (next: boolean) => void;
}

/**
 * Controlled/uncontrolled open-state helper for overlays (modal, dropdown, nav
 * sheet). Defers to `open`/`onOpenChange` when controlled, otherwise owns local
 * state seeded with `defaultOpen`.
 */
export function useDisclosure(
  open?: boolean,
  defaultOpen = false,
  onOpenChange?: (open: boolean) => void
): Disclosure {
  const [isOpen, setOpen] = useControllableState<boolean>(open, defaultOpen, onOpenChange);

  return {
    isOpen,
    open: useCallback(() => setOpen(true), [setOpen]),
    close: useCallback(() => setOpen(false), [setOpen]),
    toggle: useCallback(() => setOpen(!isOpen), [setOpen, isOpen]),
    setOpen,
  };
}
