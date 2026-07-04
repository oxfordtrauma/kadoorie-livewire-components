/**
 * Project: Kadoorie Livewire Components
 * File: cn.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * Tiny zero-dependency className joiner. Falsy parts are dropped so callers can
 * write conditional classes inline, e.g. cn('base', active && 'is-active').
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
