/**
 * Project: Kadoorie Livewire Components
 * File: showcase.js
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * Self-contained Alpine bundle for the static showcase, so the generated site is
 * fully interactive with no network access (the previous CDN build meant an
 * offline host or CI runner could not hydrate). Registers the focus and collapse
 * plugins the showcase's tabs, dropdowns, and demos rely on, then starts Alpine.
 * This file is never shipped in the published package API.
 */
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

Alpine.plugin(focus);
Alpine.plugin(collapse);

window.Alpine = Alpine;

Alpine.start();
