/**
 * Project: Kadoorie Livewire Components
 * File: Icon.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { cn } from '../lib/cn';
import { getIcon } from '../lib/icons';
import { iconSize, type IconSize } from '../lib/variants';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: string;
  size?: IconSize;
  label?: string;
}

/**
 * Normalised inline-SVG icon wrapper mirroring the Blade `icon` view.
 * Decorative by default (aria-hidden); pass a `label` to expose it to assistive
 * tech (role="img" + <title>).
 */
export function Icon({ name, size = 'md', label, className, ...rest }: IconProps) {
  const inner = getIcon(name) ?? '';
  const pixels = iconSize[size];
  const labelled = label !== undefined && label !== '';

  const isKadoorie = name.startsWith('kadoorie:');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isKadoorie ? '0 0 32 32' : '0 0 24 24'}
      width={pixels}
      height={pixels}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-test="kadoorie-icon"
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable={labelled ? undefined : false}
      className={cn('kad-icon inline-block shrink-0 align-middle', className)}
      dangerouslySetInnerHTML={{
        __html: labelled ? `<title>${label}</title>${inner}` : inner,
      }}
      {...rest}
    />
  );
}
