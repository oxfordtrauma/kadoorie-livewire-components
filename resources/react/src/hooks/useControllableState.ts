/**
 * Project: Kadoorie Livewire Components
 * File: useControllableState.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useCallback, useState } from 'react';

/**
 * Controlled/uncontrolled state pattern. When `controlled` is defined the hook
 * defers to it (and only calls `onChange`); otherwise it owns local state
 * seeded with `defaultValue`. Returns a [value, setValue] tuple.
 */
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): readonly [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [value, setValue] as const;
}
