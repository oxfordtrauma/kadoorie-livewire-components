/**
 * Project: Kadoorie Livewire Components
 * File: showcase.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

/**
 * Absolute file:// URL for a generated showcase page, so showcase interaction
 * specs target the committed static site regardless of the project baseURL
 * (which points at the live workbench for the rest of the functional suite).
 */
export function showcaseUrl(pageFile: string): string {
  return `${pathToFileURL(resolve('docs/showcase')).href}/${pageFile}`;
}
