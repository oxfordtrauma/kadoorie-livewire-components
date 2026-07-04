/**
 * Project: Kadoorie Livewire Components
 * File: InfoBox.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { toneSolid, type Tone } from '../lib/variants';
import { Icon } from './Icon';

export interface InfoBoxProps {
  icon: string;
  label: string;
  value: string;
  tone?: Tone;
  progress?: number;
  description?: string;
  className?: string;
}

/**
 * Surface card with a solid tone icon square, a label/value, and an optional
 * accessible progress bar. The icon square is decorative. Mirrors the Blade
 * `info-box` view.
 */
export function InfoBox({
  icon,
  label,
  value,
  tone = 'primary',
  progress,
  description,
  className,
}: InfoBoxProps) {
  return (
    <div
      data-test="info-box"
      className={cn(
        'flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-surface p-4 shadow-sm',
        className
      )}
    >
      <span
        data-test="info-box-icon"
        aria-hidden="true"
        className={cn(
          'flex size-14 shrink-0 items-center justify-center rounded-md',
          toneSolid[tone]
        )}
      >
        <Icon name={icon} size="lg" />
      </span>

      <div className="min-w-0 flex-1">
        <p data-test="info-box-label" className="truncate text-sm text-text-muted">
          {label}
        </p>
        <p data-test="info-box-value" className="kad-nums text-2xl font-bold text-text">
          {value}
        </p>

        {progress !== undefined ? (
          <div
            data-test="info-box-progress"
            role="progressbar"
            aria-label={label}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        ) : null}

        {description !== undefined ? (
          <p data-test="info-box-description" className="mt-1 text-xs text-text-muted">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
