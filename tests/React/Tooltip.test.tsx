/**
 * Project: Kadoorie Livewire Components
 * File: Tooltip.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Tooltip } from '../../resources/react/src/ui/Tooltip';

it('shows on hover and hides on leave, wiring aria-describedby', () => {
  render(
    <Tooltip text="More info" id="tip-1">
      <span>Trigger</span>
    </Tooltip>
  );
  const trigger = screen.getByTestId('tooltip-trigger');
  expect(trigger).toHaveAttribute('aria-describedby', 'tip-1');
  expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();

  fireEvent.mouseEnter(screen.getByTestId('tooltip-wrap'));
  expect(screen.getByTestId('tooltip')).toHaveTextContent('More info');

  fireEvent.mouseLeave(screen.getByTestId('tooltip-wrap'));
  expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
});

it('hides on Escape', () => {
  render(<Tooltip text="More info">Trigger</Tooltip>);
  const wrap = screen.getByTestId('tooltip-wrap');
  fireEvent.focus(wrap);
  expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  fireEvent.keyDown(wrap, { key: 'Escape' });
  expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
});
