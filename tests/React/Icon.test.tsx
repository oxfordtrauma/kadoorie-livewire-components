/**
 * Project: Kadoorie Livewire Components
 * File: Icon.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Icon } from '../../resources/react/src/ui/Icon';

it('is decorative by default (aria-hidden, no role)', () => {
  render(<Icon name="check" />);
  const svg = screen.getByTestId('kadoorie-icon');
  expect(svg).toHaveAttribute('aria-hidden', 'true');
  expect(svg).not.toHaveAttribute('role');
  expect(svg).toHaveAttribute('width', '20');
});

it('exposes a label as role=img with a title and sizes to the token', () => {
  render(<Icon name="triangle-alert" label="Warning" size="lg" />);
  const svg = screen.getByTestId('kadoorie-icon');
  expect(svg).toHaveAttribute('role', 'img');
  expect(svg).toHaveAttribute('aria-label', 'Warning');
  expect(svg).toHaveAttribute('width', '24');
  expect(svg.querySelector('title')).toHaveTextContent('Warning');
});

it('renders nothing inner for an unknown icon without throwing', () => {
  render(<Icon name="does-not-exist" />);
  expect(screen.getByTestId('kadoorie-icon')).toBeInTheDocument();
});
