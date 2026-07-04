/**
 * Project: Kadoorie Livewire Components
 * File: ids.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * Field/hint/error id helpers mirroring the PHP HandlesFieldState trait so the
 * React controls carry the same ids and aria-describedby wiring as the Blade
 * twins.
 */

export function fieldId(name: string, id?: string): string {
  return id ?? name;
}

export function hintId(name: string, id?: string): string {
  return `${fieldId(name, id)}-hint`;
}

export function errorId(name: string, id?: string): string {
  return `${fieldId(name, id)}-error`;
}

export function describedBy(
  name: string,
  hasHint: boolean,
  hasError: boolean,
  id?: string
): string | undefined {
  const ids: string[] = [];

  if (hasHint) {
    ids.push(hintId(name, id));
  }

  if (hasError) {
    ids.push(errorId(name, id));
  }

  return ids.length === 0 ? undefined : ids.join(' ');
}
