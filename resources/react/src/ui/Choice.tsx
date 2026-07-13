/**
 * Project: Kadoorie Livewire Components
 * File: Choice.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { forwardRef } from 'react';
import { cn } from '../lib/cn';
import { useControllableState } from '../hooks/useControllableState';
import { useFieldState } from '../hooks/useFieldState';
import { useInheritedFieldState } from './fieldContext';

export type ChoiceType = 'checkbox' | 'radio';

export interface ChoiceProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'defaultChecked'
> {
  type: ChoiceType;
  name: string;
  value?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  hint?: string;
  error?: string;
}

/** Slugify a value for a radio's default id, mirroring Str::slug in the Blade twin. */
function slug(value: string): string {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Shared checkbox/radio control mirroring the Blade `choice` view. Supports
 * controlled and uncontrolled usage and inherits hint/error from a <Field>.
 */
export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(function Choice(
  {
    type,
    name,
    value = '',
    id,
    label,
    checked,
    defaultChecked,
    hint,
    error,
    className,
    onChange,
    ...rest
  },
  ref
) {
  const { hint: effectiveHint, error: effectiveError } = useInheritedFieldState(hint, error);
  const controlId = id ?? (type === 'radio' ? `${name}-${slug(value)}` : name);
  const field = useFieldState({ name, id: controlId, hint: effectiveHint, error: effectiveError });
  const [isChecked, setChecked] = useControllableState<boolean>(
    checked,
    defaultChecked ?? false,
    undefined
  );

  return (
    <label
      htmlFor={controlId}
      data-test={`${name}-${type}-label`}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2"
    >
      <input
        ref={ref}
        type={type}
        id={controlId}
        name={name}
        value={value}
        data-test={`${name}-${type}`}
        checked={isChecked}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange?.(event);
        }}
        className={cn(
          'kad-focusable size-5 shrink-0 accent-primary border-border',
          type === 'radio' ? 'rounded-full' : 'rounded',
          className
        )}
        {...rest}
      />
      {label !== undefined && label !== '' && <span className="text-sm text-text">{label}</span>}
    </label>
  );
});

export type CheckboxProps = Omit<ChoiceProps, 'type'>;

/** Checkbox convenience wrapper around <Choice type="checkbox">. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  return <Choice ref={ref} type="checkbox" {...props} />;
});

export type RadioProps = Omit<ChoiceProps, 'type'>;

/** Radio convenience wrapper around <Choice type="radio">. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  return <Choice ref={ref} type="radio" {...props} />;
});
