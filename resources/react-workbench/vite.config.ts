/**
 * Project: Kadoorie Livewire Components
 * File: vite.config.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = resolve(__dirname);

/**
 * Standalone Vite app that mounts the React component set for Playwright
 * functional/WCAG runs. It reuses the same data-test selectors as the Blade
 * workbench so the existing specs (Part 1 §5) can be shared.
 */
export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      '@kadoorie': resolve(__dirname, '../react/src'),
    },
  },
  server: {
    port: 8124,
    strictPort: true,
  },
  preview: {
    port: 8124,
    strictPort: true,
  },
  build: {
    outDir: resolve(__dirname, '../../resources/dist/react-workbench'),
    emptyOutDir: true,
  },
});
