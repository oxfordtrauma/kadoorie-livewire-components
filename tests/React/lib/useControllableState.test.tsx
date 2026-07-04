/**
 * Project: Kadoorie Livewire Components
 * File: useControllableState.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from '../../../resources/react/src/hooks/useControllableState';

function Widget({
  value,
  defaultValue = 'off',
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  const [state, setState] = useControllableState(value, defaultValue, onChange);

  return (
    <button type="button" onClick={() => setState('on')}>
      {state}
    </button>
  );
}

describe('useControllableState', () => {
  it('owns its state when uncontrolled and updates on change', async () => {
    const onChange = vi.fn();
    render(<Widget defaultValue="off" onChange={onChange} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('off');

    await userEvent.click(btn);
    expect(btn).toHaveTextContent('on');
    expect(onChange).toHaveBeenCalledWith('on');
  });

  it('defers to the controlled value and does not update itself', async () => {
    const onChange = vi.fn();
    render(<Widget value="controlled" onChange={onChange} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('controlled');

    await userEvent.click(btn);
    // Controlled: internal state ignored, but onChange still fires.
    expect(btn).toHaveTextContent('controlled');
    expect(onChange).toHaveBeenCalledWith('on');
  });
});
