/**
 * Project: Kadoorie Livewire Components
 * File: vitest.d.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import 'vitest';
import type { AxeMatchers } from 'vitest-axe/matchers';

// Teach Vitest's expect about the vitest-axe matchers registered in setup.ts.
// The type parameter default must match Vitest's own `Assertion<T = any>` for
// the declaration to merge.
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
