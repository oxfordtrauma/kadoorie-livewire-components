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
  type BadgeShape,
  type Size,
  type Tone,
} from '../lib/variants';
import { Icon } from './Icon';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  shape?: BadgeShape;
  size?: Size;
  icon?: boolean;
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
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      data-test="badge"
      className={cn(
        'inline-flex items-center border font-medium text-text',
        toneContainer[tone],
        badgeShape[shape],
        badgeSize[size],
        className
      )}
      {...rest}
    >
      {icon ? (
        <span className={toneIconColor[tone]} data-test="badge-icon">
          <Icon name={toneIcon[tone]} size="sm" />
        </span>
      ) : null}
      <span data-test="badge-label">{children}</span>
    </span>
  );
}
