/**
 * Kadoorie wordmark at its native 114 × 32 aspect ratio.
 */

import type { ImgHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

const logoUrl = new URL('../assets/kadoorie-logo.svg', import.meta.url).href;

export type KadoorieLogoProps = ImgHTMLAttributes<HTMLImageElement>;

export function KadoorieLogo({ alt = 'Kadoorie', className, ...rest }: KadoorieLogoProps) {
  return (
    <img
      {...rest}
      src={logoUrl}
      alt={alt}
      data-test="kadoorie-logo"
      className={cn('block h-8 w-auto', className)}
    />
  );
}
