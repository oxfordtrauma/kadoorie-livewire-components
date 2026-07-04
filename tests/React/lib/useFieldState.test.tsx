/**
 * Project: Kadoorie Livewire Components
 * File: useFieldState.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFieldState } from '../../../resources/react/src/hooks/useFieldState';

describe('useFieldState', () => {
  it('derives ids from the name and mirrors the trait conventions', () => {
    const { result } = renderHook(() => useFieldState({ name: 'email' }));
    expect(result.current.fieldId).toBe('email');
    expect(result.current.hintId).toBe('email-hint');
    expect(result.current.errorId).toBe('email-error');
    expect(result.current.describedBy).toBeUndefined();
    expect(result.current.invalid).toBe(false);
  });

  it('prefers an explicit id and composes describedBy from hint + error', () => {
    const { result } = renderHook(() =>
      useFieldState({ name: 'email', id: 'login-email', hint: 'Work email', error: 'Required' })
    );
    expect(result.current.fieldId).toBe('login-email');
    expect(result.current.describedBy).toBe('login-email-hint login-email-error');
    expect(result.current.invalid).toBe(true);
  });
});
