/**
 * Project: Kadoorie Livewire Components
 * File: vitest.config.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/React/setup.ts'],
    include: ['tests/React/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['resources/react/src/**/*.{ts,tsx}'],
    },
  },
});
