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
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

/**
 * Reference viewports the component library must support (Part 1 §5.10).
 * Each suite runs once per viewport, giving the six-project matrix below.
 */
export const REFERENCE_VIEWPORTS = {
  mobile: { width: 360, height: 800 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;

type Suite = 'functional' | 'wcag';
type ViewportName = keyof typeof REFERENCE_VIEWPORTS;

/** Live Testbench workbench (real Livewire + Alpine) for functional specs. */
const WORKBENCH_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:8123';

/** Standalone Vite app that mounts the React component set (Part 2 §R0). */
const REACT_WORKBENCH_URL =
  process.env.PLAYWRIGHT_REACT_BASE_URL ?? 'http://127.0.0.1:8124';

/** Committed static showcase served over file:// for the axe/WCAG specs. */
const SHOWCASE_URL = `${pathToFileURL(resolve('docs/showcase')).href}/`;

/**
 * Build one suite-by-viewport project. `--project=functional-mobile` (etc.)
 * selects a single matrix cell so CI can shard the six projects.
 */
const cell = (suite: Suite, name: ViewportName, baseURL: string) => ({
  name: `${suite}-${name}`,
  testDir: suite === 'wcag' ? './tests/WCAG' : './tests/Playwright',
  use: {
    ...devices['Desktop Chrome'],
    viewport: REFERENCE_VIEWPORTS[name],
    baseURL,
  },
});

/**
 * React counterpart of `cell`, driving the standalone React workbench. Both
 * suites point at the same Vite app; the WCAG specs scan its rendered pages
 * with axe just like the Blade showcase.
 */
const reactCell = (suite: Suite, name: ViewportName) => ({
  name: `react-${suite}-${name}`,
  testDir: suite === 'wcag' ? './tests/ReactWCAG' : './tests/ReactPlaywright',
  use: {
    ...devices['Desktop Chrome'],
    viewport: REFERENCE_VIEWPORTS[name],
    baseURL: REACT_WORKBENCH_URL,
  },
});

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    trace: 'on-first-retry',
    // The library standardises on data-test selectors (rule 06), so point
    // Playwright's getByTestId() at that attribute instead of data-testid.
    testIdAttribute: 'data-test',
  },
  projects: [
    cell('functional', 'mobile', WORKBENCH_URL),
    cell('functional', 'tablet', WORKBENCH_URL),
    cell('functional', 'desktop', WORKBENCH_URL),
    cell('wcag', 'mobile', SHOWCASE_URL),
    cell('wcag', 'tablet', SHOWCASE_URL),
    cell('wcag', 'desktop', SHOWCASE_URL),
    reactCell('functional', 'mobile'),
    reactCell('functional', 'tablet'),
    reactCell('functional', 'desktop'),
    reactCell('wcag', 'mobile'),
    reactCell('wcag', 'tablet'),
    reactCell('wcag', 'desktop'),
  ],
  webServer: [
    {
      command: 'vendor/bin/testbench serve --port=8123',
      url: WORKBENCH_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm run dev:react-workbench -- --port=8124 --strictPort',
      url: REACT_WORKBENCH_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
