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
export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'accent';
export type BadgeShape = 'rounded' | 'pill';
export type BadgeColor =
  'neutral' | 'red' | 'pink' | 'purple' | 'green' | 'blue' | 'light-blue' | 'amber';
export type BadgeIndicator = 'none' | 'icon' | 'dot' | 'number';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Mirror of ButtonVariant::classes(). */
export const buttonVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'bg-surface text-text border border-border hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:brightness-95',
  ghost: 'bg-transparent text-text hover:bg-surface-muted',
};

/** Mirror of Size::classes() (buttons and action controls). */
export const buttonSize: Record<Size, string> = {
  xs: 'text-xs px-2 gap-1',
  sm: 'text-xs px-2.5 gap-1',
  md: 'text-sm px-3.5 gap-1.5',
  lg: 'text-base px-4 gap-2',
};

/** Mirror of Size::inputClasses() (text-entry controls; iOS 16px on mobile). */
export const inputSize: Record<Size, string> = {
  xs: 'text-lg md:text-xs px-2',
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

/** Mirror of Badge::sizeClasses(). */
export const badgeSize: Record<Size, string> = {
  xs: 'gap-1 px-1.5 py-0.5 text-xs',
  sm: 'gap-1 px-2 py-0.5 text-xs',
  md: 'gap-1.5 px-2.5 py-1 text-sm',
  lg: 'gap-1.5 px-3 py-1.5 text-base',
};

/** Mirror of Avatar::sizeClasses(). */
export const avatarSize: Record<Size, string> = {
  xs: 'size-6 text-xs',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
};

export type Presence = 'online' | 'busy' | 'offline';

/** Mirror of Avatar::presenceClasses(). */
export const presenceClasses: Record<Presence, string> = {
  online: 'bg-success',
  busy: 'bg-danger',
  offline: 'bg-text-muted-large',
};

/** Mirror of Avatar::presenceLabel(). */
export const presenceLabel: Record<Presence, string> = {
  online: 'Online',
  busy: 'Busy',
  offline: 'Offline',
};

/** Mirror of IconSize::pixels(). */
export const iconSize: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 98,
};
export const badgeColor: Record<BadgeColor, string> = {
  neutral: 'bg-surface-muted border-border text-text-body',
  red: 'bg-danger-subtle border-danger text-danger',
  pink: 'bg-pink-subtle border-pink-border text-pink',
  purple: 'bg-accent-subtle border-accent text-accent',
  green: 'bg-success-subtle border-success text-success',
  blue: 'bg-info-subtle border-info text-info',
  'light-blue': 'bg-light-blue-subtle border-light-blue-border text-light-blue',
  amber: 'bg-warning-subtle border-warning text-text',
};
export const badgeIndicatorColor: Record<BadgeColor, string> = {
  neutral: 'bg-text-muted',
  red: 'bg-danger-solid',
  pink: 'bg-pink',
  purple: 'bg-accent',
  green: 'bg-success',
  blue: 'bg-info',
  'light-blue': 'bg-light-blue',
  amber: 'bg-warning',
};
export const badgeIconColor: Record<BadgeColor, string> = {
  neutral: 'text-text-muted',
  red: 'text-danger',
  pink: 'text-pink',
  purple: 'text-accent',
  green: 'text-success',
  blue: 'text-info',
  'light-blue': 'text-light-blue',
  amber: 'text-warning',
};
