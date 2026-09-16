/**
 * Project: Kadoorie Livewire Components
 * File: variants.test.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { describe, expect, it } from 'vitest';
import {
  badgeShape,
  buttonSize,
  buttonVariant,
  iconSize,
  inputSize,
  toneContainer,
  toneIcon,
  toneIconColor,
  toneRole,
  toneSolid,
  type ButtonVariant,
  type Size,
  type Tone,
} from '../../../resources/react/src/lib/variants';

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'danger', 'ghost'];
const sizes: Size[] = ['sm', 'md', 'lg'];
const tones: Tone[] = ['info', 'success', 'warning', 'danger', 'primary', 'secondary', 'accent'];

describe('variants', () => {
  it('defines every button variant with the expected primary classes', () => {
    for (const variant of buttonVariants) {
      expect(buttonVariant[variant]).toBeTruthy();
    }
    expect(buttonVariant.primary).toContain('bg-primary');
  });

  it('defines button and input sizes for every size key', () => {
    for (const size of sizes) {
      expect(buttonSize[size]).toBeTruthy();
      expect(inputSize[size]).toContain('text-lg');
    }
  });

  it('mirrors the Tone enum maps for every tone', () => {
    for (const tone of tones) {
      expect(toneIcon[tone]).toBeTruthy();
      expect(toneContainer[tone]).toBeTruthy();
      expect(toneIconColor[tone]).toContain('text-');
      expect(toneSolid[tone]).toBeTruthy();
    }
    expect(toneSolid.success).toContain('bg-success-solid');
    expect(toneSolid.danger).toContain('bg-danger-solid');
    expect(toneSolid.warning).toContain('text-text');
  });

  it('makes danger assertive and everything else a status', () => {
    expect(toneRole('danger')).toBe('alert');
    expect(toneRole('info')).toBe('status');
  });

  it('mirrors the badge shape and icon size maps', () => {
    expect(badgeShape.rounded).toBe('rounded-md');
    expect(badgeShape.pill).toBe('rounded-full');
    expect(iconSize).toEqual({ xs: 12, sm: 16, md: 20, lg: 24, xl: 98 });
  });
});
