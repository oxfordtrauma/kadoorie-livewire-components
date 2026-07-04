/**
 * Project: Kadoorie Livewire Components
 * File: setup.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { configure } from '@testing-library/react';

// Register the vitest-axe matchers (toHaveNoViolations) on Vitest's expect.
expect.extend(axeMatchers);

// The components carry `data-test` (matching the Blade twins), so point RTL's
// getByTestId queries at that attribute instead of the default `data-testid`.
configure({ testIdAttribute: 'data-test' });
