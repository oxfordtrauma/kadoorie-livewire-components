/**
 * Project: Kadoorie Livewire Components
 * File: playwright.config.ts
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Reference viewports the component library must support (Part 1 §5.10).
 * Specs iterate these via `test.use({ viewport })` to cover the matrix.
 */
export const REFERENCE_VIEWPORTS = {
  mobile: { width: 360, height: 800 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 8000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    viewport: REFERENCE_VIEWPORTS.desktop,
  },
  projects: [
    {
      // Functional / interaction browser tests.
      name: 'functional',
      testDir: './tests/Playwright',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // WCAG / accessibility browser tests (@axe-core/playwright).
      name: 'wcag',
      testDir: './tests/WCAG',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
