/**
 * Project: Kadoorie Livewire Components
 * File: Badge.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import {
  badgeShape,
  badgeSize,
  toneContainer,
  toneIcon,
  toneIconColor,
  badgeColor,
  badgeIndicatorColor,
  badgeIconColor,
  type BadgeShape,
  type Size,
  type Tone,
  type BadgeColor,
  type BadgeIndicator,
} from '../lib/variants';
import { Icon } from './Icon';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  shape?: BadgeShape;
  size?: Size;
  icon?: boolean;
  color?: BadgeColor;
  indicator?: BadgeIndicator;
  number?: number | string;
}

/**
 * Single badge covering the former badge/tag/pill triplet — parameterised by
 * tone, shape, and size. Tone is conveyed by a tinted surface, a coloured icon,
 * and a text label (never colour alone). Mirrors the Blade `badge` view.
 */
export function Badge({
  tone = 'info',
  shape = 'rounded',
  size = 'sm',
  icon = true,
  color,
  indicator = icon ? 'icon' : 'dot',
  number,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      data-test="badge"
      className={cn(
        'inline-flex items-center border font-medium text-text',
        color ? badgeColor[color] : toneContainer[tone],
        badgeShape[shape],
        indicator === 'number'
          ? badgeSize[size].replace('gap-1', 'gap-0.5').replace('gap-1.5', 'gap-1')
          : badgeSize[size],
        className
      )}
      {...rest}
    >
      {indicator === 'icon' ? (
        <span
          className={color ? badgeIconColor[color] : toneIconColor[tone]}
          data-test="badge-icon"
        >
          <Icon name={toneIcon[tone]} size="sm" />
        </span>
      ) : indicator === 'dot' ? (
        <span
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            color ? badgeIndicatorColor[color] : toneIconColor[tone]
          )}
          data-test="badge-dot"
          aria-hidden="true"
        />
      ) : indicator === 'number' ? (
        <span
          className="-mx-0.5 min-w-5 text-center font-semibold tabular-nums"
          data-test="badge-number"
        >
          {number}
        </span>
      ) : null}
      <span data-test="badge-label">{children}</span>
    </span>
  );
}
