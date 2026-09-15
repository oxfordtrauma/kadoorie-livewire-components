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
  'kadoorie:admin-manage-users': '<g transform="scale(.25)" opacity=".9"><path d="M30.4 42.4A12 12 0 1 0 30.4 18.4a12 12 0 0 0 0 24Z"/><path d="M9.6 70.4c0-11.52 9.28-20.8 20.8-20.8H40"/><path d="M64 42.4a12 12 0 1 0 0-24 12 12 0 0 0 0 24Z" opacity=".5"/><path d="M44.8 70.4c0-11.52 9.28-20.8 20.8-20.8h1.6" opacity=".5"/><circle cx="77.6" cy="73.6" r="8.8" fill="currentColor"/><path d="M74.4 73.6h6.4M77.6 70.4v6.4" stroke="white" stroke-width="2"/></g>',
  'kadoorie:folder-add': '<path d="m4.3 12 1.4-2.8c.3-.6.8-.9 1.5-.9h8.7c1 0 1.8.8 1.8 1.8v.8l-1.2 4.8c-.3 1-1 1.5-2 1.5H2.6a1.6 1.6 0 0 1-1.6-1.6V4.8c0-.9.7-1.6 1.6-1.6h4.3c.7 0 1.2.3 1.6.9l.6.9h7.1"/><circle cx="19" cy="17.8" r="3.4" fill="currentColor"/><path d="M17.4 17.8h3.2M19 16.2v3.2" stroke="white"/>',
  'kadoorie:list-xs': '<path d="M15 8H3M17 12H3M13 16H3"/>',
  'kadoorie:shield-xs': '<path d="M12 3c2 1.5 3.5 2 5 2v5c0 3-2 5.2-5 6.3C9 15.2 7 13 7 10V5c1.5 0 3-.5 5-2Z"/><path d="m10 10 1.3 1.3L14 8.5"/>',
  'kadoorie:calendar-xs': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 9h18M7 13h.1M11 13h.1M15 13h.1M7 17h.1M11 17h.1M15 17h.1"/>',
  'kadoorie:edit': '<path d="m16.4 3.6 4 4L8 20H4v-4L16.4 3.6Z"/><path d="m14.5 5.5 4 4"/>',
  'kadoorie:file-plus':
    '<path d="M21 12V7a1 1 0 0 0-1-1h-8.6a1 1 0 0 0-.7.3L6.3 10.6a1 1 0 0 0-.3.7V24a1 1 0 0 0 1 1h6.3"/><path d="M13 6v5H8"/><circle cx="20" cy="20" r="5"/><path d="M20 17v6M17 20h6"/>',
  'kadoorie:file-plus-variant-5':
    '<rect width="24" height="24" rx="9.75" fill="#1B2430"/><path d="M17.2 9.25V5.3a1 1 0 0 0-1-1h-4.8L7.2 8.25V18.7a1 1 0 0 0 1 1h5.1M11.4 4.3v4h-4M9.5 12h5.8M9.5 15h3.8" stroke="white"/><circle cx="17.2" cy="16.9" r="3.2" fill="#1B2430" stroke="white"/><path d="M15.7 16.9h3M17.2 15.4v3" stroke="white"/>',
  'kadoorie:user':
    '<circle cx="16" cy="10.5" r="4.7"/><path d="M7 25c.5-4.2 3.5-6.5 9-6.5s8.5 2.3 9 6.5"/>',
  'kadoorie:folder':
    '<path d="M7 8h5l2 3h7a2 2 0 0 1 2 2l-1.5 7a2 2 0 0 1-2 1.5H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"/>',
  'kadoorie:mail': '<rect x="7" y="9" width="18" height="14" rx="2"/><path d="m8 10 8 6 8-6"/>',
  'kadoorie:question': '<path d="M12.7053 13.3173C12.7169 12.8761 12.816 12.4415 12.9968 12.0388C13.1776 11.6361 13.4365 11.2732 13.7585 10.9713C14.0806 10.6694 14.4593 10.4344 14.8728 10.28C15.2864 10.1255 15.7264 10.0546 16.1675 10.0715C16.6086 10.0883 17.042 10.1926 17.4425 10.3781C17.8431 10.5637 18.2028 10.8269 18.5008 11.1525C18.7989 11.4781 19.0294 11.8596 19.1789 12.2749C19.3285 12.6903 19.3941 13.1311 19.372 13.572C19.3657 14.0052 19.273 14.4329 19.0992 14.8298C18.9254 15.2267 18.6741 15.5848 18.36 15.8833C18.0459 16.1818 17.6753 16.4145 17.27 16.5678C16.8648 16.721 16.433 16.791 16 16.776V18.6667M15.9867 22.6773H16M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" />',
  'kadoorie:table':
    '<rect x="6" y="7" width="20" height="18" rx="1"/><path d="M6 13h20M13 7v18M20 7v18"/>',
  'kadoorie:graduate-cap':
    '<path d="m5 12 11-6 11 6-11 6-11-6Z"/><path d="M9 14v5c3 3 11 3 14 0v-5M27 12v7"/>',
  'kadoorie:clipboard':
    '<path d="M11 7h10a3 3 0 0 1 3 3v14H8V10a3 3 0 0 1 3-3Z"/><path d="M12 7a4 4 0 0 1 8 0v1h-8V7ZM13 13h6M13 17h6M13 21h6"/>',
  'kadoorie:lock':
    '<rect x="6" y="12" width="20" height="14" rx="2"/><path d="M10 12V9a6 6 0 0 1 12 0v3M16 18v3"/>',
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
  if (name === 'circle-help') {
    return 'kadoorie:question';
  }

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
