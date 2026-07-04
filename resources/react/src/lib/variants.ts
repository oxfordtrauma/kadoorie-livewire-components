/**
 * Project: Kadoorie Livewire Components
 * File: variants.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * Class maps mirroring the PHP enums (ButtonVariant, Size, Tone, BadgeShape,
 * IconSize) verbatim so the React output matches the Blade output. Drift is
 * caught by the workbench data-test reuse + Playwright WCAG (see plan Part 1
 * section 5). Do not invent new classes here.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'accent';
export type BadgeShape = 'rounded' | 'pill';
export type IconSize = 'sm' | 'md' | 'lg';

/** Mirror of ButtonVariant::classes(). */
export const buttonVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'bg-surface text-text border border-border hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:brightness-95',
  ghost: 'bg-transparent text-text hover:bg-surface-muted',
};

/** Mirror of Size::classes() (buttons and action controls). */
export const buttonSize: Record<Size, string> = {
  sm: 'text-xs px-2.5 gap-1',
  md: 'text-sm px-3.5 gap-1.5',
  lg: 'text-base px-4 gap-2',
};

/** Mirror of Size::inputClasses() (text-entry controls; iOS 16px on mobile). */
export const inputSize: Record<Size, string> = {
  sm: 'text-lg md:text-xs px-2.5',
  md: 'text-lg md:text-sm px-3',
  lg: 'text-lg md:text-base px-3.5',
};

/** Mirror of Tone::icon(). */
export const toneIcon: Record<Tone, string> = {
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  danger: 'circle-alert',
  primary: 'info',
  secondary: 'info',
  accent: 'info',
};

/** Mirror of Tone::containerClasses(). */
export const toneContainer: Record<Tone, string> = {
  info: 'bg-info-subtle border-info',
  success: 'bg-success-subtle border-success',
  warning: 'bg-warning-subtle border-warning',
  danger: 'bg-danger-subtle border-danger',
  primary: 'bg-primary-subtle border-primary',
  secondary: 'bg-surface-muted border-secondary',
  accent: 'bg-accent-subtle border-accent',
};

/** Mirror of Tone::iconColor(). */
export const toneIconColor: Record<Tone, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
};

/** Mirror of Tone::solidClasses() (AA-verified solid fills). */
export const toneSolid: Record<Tone, string> = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary text-white',
  accent: 'bg-accent text-white',
  info: 'bg-info text-white',
  success: 'bg-success-solid text-white',
  warning: 'bg-warning text-text',
  danger: 'bg-danger-solid text-white',
};

/** Mirror of Tone::role() (assertive for danger, polite status otherwise). */
export function toneRole(tone: Tone): 'alert' | 'status' {
  return tone === 'danger' ? 'alert' : 'status';
}

/** Mirror of BadgeShape::classes(). */
export const badgeShape: Record<BadgeShape, string> = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

/** Mirror of IconSize::pixels(). */
export const iconSize: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};
