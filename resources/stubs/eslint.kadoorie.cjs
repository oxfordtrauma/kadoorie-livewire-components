/**
 * Project: Kadoorie Livewire Components
 * File: eslint.kadoorie.cjs
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/*
 * Kadoorie React ESLint (flat config fragment). The published components already
 * satisfy these rules; enabling them in your app keeps edits accessible.
 *
 * Requires: eslint-plugin-jsx-a11y and eslint-plugin-react-hooks.
 *
 * Spread it into your eslint.config.js:
 *   const kadoorie = require('./eslint.kadoorie.cjs');
 *   module.exports = [ ...kadoorie, /* your own config *\/ ];
 */
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['resources/js/kadoorie/**/*.{ts,tsx}'],
    plugins: { 'jsx-a11y': jsxA11y, 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
];
