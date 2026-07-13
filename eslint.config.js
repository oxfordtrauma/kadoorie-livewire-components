/**
 * Project: Kadoorie Livewire Components
 * File: eslint.config.js
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      'resources/react/**/*.{ts,tsx}',
      'resources/react-workbench/**/*.{ts,tsx}',
      'tests/React/**/*.{ts,tsx}',
    ],
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  {
    files: ['resources/js/**/*.js', 'resources/js/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['tests/JavaScript/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
];
