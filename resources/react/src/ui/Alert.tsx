/**
 * Project: Kadoorie Livewire Components
 * File: Alert.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useState } from 'react';
import { cn } from '../lib/cn';
import { toneContainer, toneIcon, toneIconColor, toneRole, type Tone } from '../lib/variants';
import { Icon } from './Icon';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  title?: string;
  dismissible?: boolean;
}

/**
 * Alert mirroring the Blade `alert` view: tone container/icon/role with an
 * optional title and self-dismiss button (the React analogue of the Alpine
 * `show` toggle).
 */
export function Alert({
  tone = 'info',
  title,
  dismissible = false,
  className,
  children,
  ...rest
}: AlertProps) {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <div
      role={toneRole(tone)}
      data-test="alert"
      className={cn('flex items-start gap-3 rounded-md border p-3', toneContainer[tone], className)}
      {...rest}
    >
      <span className={cn('mt-0.5 shrink-0', toneIconColor[tone])}>
        <Icon name={toneIcon[tone]} size="sm" />
      </span>

      <div className="flex-1 text-sm text-text-body">
        {title !== undefined && title !== '' && (
          <p data-test="alert-title" className="font-semibold text-text">
            {title}
          </p>
        )}
        <div data-test="alert-body">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          data-test="alert-dismiss"
          aria-label="Dismiss"
          onClick={() => setShow(false)}
          className="kad-focusable -m-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-muted-large hover:bg-black/5"
        >
          <Icon name="x" size="sm" />
        </button>
      )}
    </div>
  );
}
