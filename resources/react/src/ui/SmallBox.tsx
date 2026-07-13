/**
 * Project: Kadoorie Livewire Components
 * File: SmallBox.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { toneSolid, type Tone } from '../lib/variants';
import { Icon } from './Icon';

export interface SmallBoxProps {
  value: string;
  label: string;
  icon: string;
  tone?: Tone;
  url?: string;
  className?: string;
}

/**
 * Solid-filled stat box. The tone fill pairs an AA-safe on-colour with the
 * value/label text; the oversized icon is decorative. Mirrors the Blade
 * `small-box` view.
 */
export function SmallBox({ value, label, icon, tone = 'primary', url, className }: SmallBoxProps) {
  return (
    <div
      data-test="small-box"
      className={cn('relative overflow-hidden rounded-lg shadow-sm', toneSolid[tone], className)}
    >
      <div className="relative p-4">
        <p data-test="small-box-value" className="kad-nums text-3xl font-bold leading-tight">
          {value}
        </p>
        <p data-test="small-box-label" className="text-sm">
          {label}
        </p>
      </div>

      <span
        aria-hidden="true"
        data-test="small-box-icon"
        className="pointer-events-none absolute right-3 top-3 opacity-30"
      >
        <Icon name={icon} size="lg" className="scale-[2.2]" />
      </span>

      {url !== undefined ? (
        <a
          href={url}
          data-test="small-box-link"
          className="kad-focusable relative flex min-h-11 items-center justify-center gap-1 bg-black/10 text-xs font-medium hover:bg-black/20"
        >
          More info
          <Icon name="chevron-right" size="sm" />
        </a>
      ) : null}
    </div>
  );
}
