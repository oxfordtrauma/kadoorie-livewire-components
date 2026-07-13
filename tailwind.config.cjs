/**
 * Project: Kadoorie Livewire Components
 * File: tailwind.config.cjs
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 *
 * Build-time Tailwind config for the precompiled, publishable stylesheet.
 * Consumers do not use this file; they extend tailwind-preset.cjs instead.
 */

const preset = require('./tailwind-preset.cjs');

module.exports = {
  presets: [preset],
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
    './src/**/*.php',
    './workbench/**/*.blade.php',
  ],
  // Custom .kad-* helpers live as plain CSS in kadoorie.css and are not purged.
  corePlugins: {
    // Preflight ships with the stylesheet so non-Tailwind hosts get a sane base.
    preflight: true,
  },
};
