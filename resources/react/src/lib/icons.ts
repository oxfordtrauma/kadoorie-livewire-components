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
  'kadoorie:file-plus': '<path d="M21 12V7a1 1 0 0 0-1-1h-8.6a1 1 0 0 0-.7.3L6.3 10.6a1 1 0 0 0-.3.7V24a1 1 0 0 0 1 1h6.3"/><path d="M13 6v5H8"/><circle cx="20" cy="20" r="5"/><path d="M20 17v6M17 20h6"/>',
  'kadoorie:user': '<circle cx="16" cy="10.5" r="4.7"/><path d="M7 25c.5-4.2 3.5-6.5 9-6.5s8.5 2.3 9 6.5"/>',
  'kadoorie:folder': '<path d="M7 8h5l2 3h7a2 2 0 0 1 2 2l-1.5 7a2 2 0 0 1-2 1.5H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"/>',
  'kadoorie:mail': '<rect x="7" y="9" width="18" height="14" rx="2"/><path d="m8 10 8 6 8-6"/>',
  'kadoorie:table': '<rect x="6" y="7" width="20" height="18" rx="1"/><path d="M6 13h20M13 7v18M20 7v18"/>',
  'kadoorie:graduate-cap': '<path d="m5 12 11-6 11 6-11 6-11-6Z"/><path d="M9 14v5c3 3 11 3 14 0v-5M27 12v7"/>',
  'kadoorie:clipboard': '<path d="M11 7h10a3 3 0 0 1 3 3v14H8V10a3 3 0 0 1 3-3Z"/><path d="M12 7a4 4 0 0 1 8 0v1h-8V7ZM13 13h6M13 17h6M13 21h6"/>',
  'kadoorie:lock': '<rect x="6" y="12" width="20" height="14" rx="2"/><path d="M10 12V9a6 6 0 0 1 12 0v3M16 18v3"/>',
  'kadoorie:leaf':
    '<path d="M11 20A7 7 0 0 1 4 13C4 8 7 4 12 2c2 4 4 6 5 8a7 7 0 0 1-6 10Z"/><path d="M11 20c0-4 1.5-7.5 5-10"/>',
  'kadoorie:mark':
    '<path d="M6 3v18"/><path d="M6 12c6 0 8-3 12-9"/><path d="M6 12c6 0 8 3 12 9"/>',
  'lucide:bell':
    '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  'lucide:check': '<path d="M20 6 9 17l-5-5"/>',
  'lucide:circle-help':
    '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  'lucide:external-link':
    '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
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
