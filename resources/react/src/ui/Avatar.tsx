/**
 * Project: Kadoorie Livewire Components
 * File: Avatar.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import {
  avatarSize,
  presenceClasses,
  presenceLabel,
  type Presence,
  type Size,
} from '../lib/variants';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  alt: string;
  src?: string;
  initials?: string;
  presence?: Presence;
  size?: Size;
}

/**
 * User avatar rendering a photo, initials fallback, and optional presence dot.
 * The `alt` text is always exposed (image alt, or sr-only for initials).
 * Mirrors the Blade `avatar` view.
 */
export function Avatar({
  alt,
  src,
  initials,
  presence,
  size = 'md',
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      data-test="avatar"
      className={cn('relative inline-flex shrink-0', avatarSize[size], className)}
      {...rest}
    >
      {src !== undefined ? (
        <img
          src={src}
          alt={alt}
          data-test="avatar-image"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            data-test="avatar-initials"
            className="flex h-full w-full items-center justify-center rounded-full bg-primary-subtle font-semibold text-primary"
          >
            {initials}
          </span>
          <span className="sr-only">{alt}</span>
        </>
      )}

      {presence !== undefined ? (
        <>
          <span
            aria-hidden="true"
            data-test="avatar-presence"
            className={cn(
              'absolute bottom-0 right-0 block size-1/4 rounded-full ring-2 ring-surface',
              presenceClasses[presence]
            )}
          />
          <span className="sr-only">{presenceLabel[presence]}</span>
        </>
      ) : null}
    </span>
  );
}
