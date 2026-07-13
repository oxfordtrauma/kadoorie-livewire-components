/**
 * Project: Kadoorie Livewire Components
 * File: SelectPill.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { type ReactNode } from 'react';
import { Dropdown } from './Dropdown';
import { Icon } from './Icon';

export interface SelectPillProps {
  label: string;
  value?: string;
  align?: 'left' | 'right';
  children?: ReactNode;
}

const TRIGGER_CLASS =
  'kad-focusable inline-flex items-center gap-1.5 rounded-[10px] bg-bg px-3 py-1.5 text-sm hover:bg-surface-muted';

/**
 * A labelled pill dropdown (Page, View As, Trial, Role) with an optional
 * selected value. Wraps the shared Dropdown for behaviour. Mirrors the Blade
 * `select-pill` view.
 */
export function SelectPill({ label, value, align = 'left', children }: SelectPillProps) {
  return (
    <Dropdown
      align={align}
      data-test="select-pill"
      triggerTest="select-pill-trigger"
      triggerClass={TRIGGER_CLASS}
      trigger={
        <>
          <span className="whitespace-nowrap text-text-body">{label}</span>
          <Icon name="chevron-down" size="sm" className="text-text-muted-large" />
          {value !== undefined ? (
            <span
              data-test="select-pill-value"
              className="ml-1 border-l border-text pl-2 font-semibold text-text"
            >
              {value}
            </span>
          ) : null}
        </>
      }
    >
      {children}
    </Dropdown>
  );
}
