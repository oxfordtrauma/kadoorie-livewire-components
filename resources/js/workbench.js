/**
 * Project: Kadoorie Livewire Components
 * File: workbench.js
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

/**
 * Workbench-only bootstrap. Livewire bundles Alpine core but not the focus and
 * collapse plugins the Modal (x-trap), Nav sheet, Dropdown, and Accordion
 * (x-collapse) rely on. Registering them here and starting Livewire manually
 * (the documented Livewire 3 "manual bundling" flow) lets the functional
 * Playwright suite exercise real focus-trapping. This file is never shipped in
 * the published package; the static showcase loads the same plugins via CDN.
 */
import { Livewire, Alpine } from '../../vendor/livewire/livewire/dist/livewire.esm';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

Alpine.plugin(focus);
Alpine.plugin(collapse);

Livewire.start();
