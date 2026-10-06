/**
 * Project: Kadoorie Livewire Components
 * File: icons.test.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { describe, expect, it } from 'vitest';
import { getIcon, hasIcon, registerIcon } from '../../../resources/react/src/lib/icons';
import { bundledIconRegistry } from '../../../resources/react/src/lib/bundledIcons';
import { cn } from '../../../resources/react/src/lib/cn';

describe('icons registry', () => {
  it('resolves a bare name against the lucide set', () => {
    expect(hasIcon('info')).toBe(true);
    expect(getIcon('info')).toContain('<circle');
  });

  it('resolves a set-prefixed name and returns undefined for unknown icons', () => {
    expect(getIcon('lucide:x')).toContain('<path');
    expect(hasIcon('does-not-exist')).toBe(false);
    expect(getIcon('does-not-exist')).toBeUndefined();
  });

  it('includes every bundled SVG icon, including message-clear', () => {
    expect(Object.keys(bundledIconRegistry)).toHaveLength(97);
    expect(hasIcon('kadoorie:message-clear')).toBe(true);
    expect(hasIcon('kadoorie:list-variant-5')).toBe(true);

    for (const name of Object.keys(bundledIconRegistry)) {
      expect(getIcon(name)).toBe(bundledIconRegistry[name]);
    }
  });

  it('lets a caller register a new icon', () => {
    registerIcon('kadoorie:test-mark', '<path d="M0 0h1"/>');
    expect(getIcon('kadoorie:test-mark')).toBe('<path d="M0 0h1"/>');
  });
});

describe('cn', () => {
  it('joins truthy parts and drops falsy ones', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
    expect(cn()).toBe('');
  });
});
