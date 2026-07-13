/**
 * Project: Kadoorie Livewire Components
 * File: icons.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * Inline SVG registry mirroring resources/svg/{set}/{icon}.svg. Values are the
 * INNER markup of each Lucide/Kadoorie icon (stroke-normalised by the Icon
 * component wrapper), keyed by name. Additional icons can be added with
 * registerIcon(); a name may be prefixed with a set (e.g. "kadoorie:leaf") and
 * defaults to "lucide".
 */

const registry: Record<string, string> = {
  'kadoorie:leaf':
    '<path d="M11 20A7 7 0 0 1 4 13C4 8 7 4 12 2c2 4 4 6 5 8a7 7 0 0 1-6 10Z"/><path d="M11 20c0-4 1.5-7.5 5-10"/>',
  'lucide:check': '<path d="M20 6 9 17l-5-5"/>',
  'lucide:chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'lucide:chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'lucide:chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'lucide:chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'lucide:circle-alert':
    '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'lucide:circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'lucide:info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'lucide:loader-circle': '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  'lucide:menu':
    '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'lucide:search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'lucide:triangle-alert':
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'lucide:x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};

/**
 * Normalise a name into a "set:icon" key, defaulting the set to "lucide".
 */
function resolveKey(name: string): string {
  return name.includes(':') ? name : `lucide:${name}`;
}

/**
 * Register (or override) an icon's inner SVG markup under a "set:icon" key or a
 * bare name (defaults to the "lucide" set).
 */
export function registerIcon(name: string, inner: string): void {
  registry[resolveKey(name)] = inner;
}

/**
 * Return the inner SVG markup for an icon name, or undefined when unknown.
 */
export function getIcon(name: string): string | undefined {
  return registry[resolveKey(name)];
}

/**
 * Whether an icon name is registered.
 */
export function hasIcon(name: string): boolean {
  return resolveKey(name) in registry;
}
