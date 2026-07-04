/**
 * Project: Kadoorie Livewire Components
 * File: fieldContext.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { createContext, useContext } from 'react';

/**
 * Context published by <Field> so nested controls inherit the wrapper's hint
 * and error, mirroring the Blade `@aware(['error', 'hint'])` contract. Controls
 * merge their own explicit props over these inherited values.
 */
export interface FieldContextValue {
  hint?: string;
  error?: string;
}

export const FieldContext = createContext<FieldContextValue>({});

/**
 * Resolve the effective hint/error for a control: explicit props win, otherwise
 * the surrounding <Field> supplies them (like Blade `@aware`).
 */
export function useInheritedFieldState(hint?: string, error?: string): FieldContextValue {
  const inherited = useContext(FieldContext);

  return {
    hint: hint ?? inherited.hint,
    error: error ?? inherited.error,
  };
}
