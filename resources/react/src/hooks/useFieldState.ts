/**
 * Project: Kadoorie Livewire Components
 * File: useFieldState.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useMemo } from 'react';
import { describedBy, errorId, fieldId, hintId } from '../lib/ids';

export interface FieldStateOptions {
  name: string;
  id?: string;
  hint?: string;
  error?: string;
}

export interface FieldState {
  fieldId: string;
  hintId: string;
  errorId: string;
  describedBy?: string;
  invalid: boolean;
}

/**
 * Compute the label/hint/error ids and aria wiring for a form control,
 * mirroring the PHP HandlesFieldState trait. `invalid` is true when an error
 * message is present.
 */
export function useFieldState({ name, id, hint, error }: FieldStateOptions): FieldState {
  return useMemo(() => {
    const hasHint = hint !== undefined && hint !== '';
    const hasError = error !== undefined && error !== '';

    return {
      fieldId: fieldId(name, id),
      hintId: hintId(name, id),
      errorId: errorId(name, id),
      describedBy: describedBy(name, hasHint, hasError, id),
      invalid: hasError,
    };
  }, [name, id, hint, error]);
}
