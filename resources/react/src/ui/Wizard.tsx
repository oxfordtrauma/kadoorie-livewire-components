/**
 * Project: Kadoorie Livewire Components
 * File: Wizard.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';
import { Button } from './Button';

export interface WizardStepItem {
  id: string;
  label: ReactNode;
}

interface WizardContextValue {
  group: string;
  activeId: string;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export interface WizardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  steps: WizardStepItem[];
  label?: string;
  defaultStep?: string;
  linear?: boolean;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  onStepChange?: (index: number, id: string) => void;
  onFinish?: (index: number, id: string) => void;
}

/**
 * Multi-step wizard: an ordered step indicator, one visible `<WizardStep>` at a
 * time, and Back/Next/Finish navigation. `onStepChange` fires on navigation and
 * `onFinish` from the last step. Mirrors the Blade `wizard`/`wizard-step` views.
 */
export function Wizard({
  id = 'wizard',
  steps,
  label = 'Progress',
  defaultStep,
  linear = true,
  backLabel = 'Back',
  nextLabel = 'Next',
  finishLabel = 'Finish',
  onStepChange,
  onFinish,
  children,
  className,
  ...rest
}: WizardProps) {
  const [current, setCurrent] = useState(() => {
    const index = steps.findIndex((step) => step.id === defaultStep);

    return index < 0 ? 0 : index;
  });
  const panelsRef = useRef<HTMLDivElement>(null);

  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const activeId = steps[current]?.id ?? '';

  const canGo = (index: number): boolean =>
    index >= 0 && index < steps.length && (!linear || index <= current);

  function change(index: number): void {
    setCurrent(index);
    onStepChange?.(index, steps[index]?.id ?? '');
    panelsRef.current?.focus();
  }

  function go(index: number): void {
    if (canGo(index)) {
      change(index);
    }
  }

  function next(): void {
    if (isLast) {
      onFinish?.(current, activeId);
    } else {
      change(current + 1);
    }
  }

  function prev(): void {
    if (!isFirst) {
      change(current - 1);
    }
  }

  return (
    <div data-test="wizard" className={className} {...rest}>
      <ol
        data-test="wizard-steps"
        aria-label={label}
        className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {steps.map((step, index) => {
          const done = current > index;
          const isCurrent = current === index;

          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                id={`${id}-step-${step.id}`}
                data-test={`wizard-marker-${step.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                disabled={!canGo(index)}
                onClick={() => go(index)}
                className="kad-focusable inline-flex min-h-11 items-center gap-2 rounded-md text-left text-sm font-medium disabled:cursor-not-allowed"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    done
                      ? 'border-primary bg-primary text-on-primary'
                      : isCurrent
                        ? 'border-primary text-primary'
                        : 'border-border text-text-muted'
                  )}
                >
                  {done ? <Icon name="check" size="sm" /> : index + 1}
                </span>
                <span className={isCurrent ? 'text-text' : 'text-text-muted'}>{step.label}</span>
              </button>

              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div data-test="wizard-panels" ref={panelsRef} tabIndex={-1} className="kad-focusable">
        <WizardContext.Provider value={{ group: id, activeId }}>{children}</WizardContext.Provider>
      </div>

      <div data-test="wizard-nav" className="mt-6 flex items-center justify-between gap-3">
        <Button variant="ghost" data-test="wizard-back" disabled={isFirst} onClick={prev}>
          {backLabel}
        </Button>

        <span data-test="wizard-status" aria-live="polite" className="text-sm text-text-muted">
          Step {current + 1} of {steps.length}
        </span>

        <Button data-test="wizard-next" onClick={next}>
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  );
}

export interface WizardStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: string;
}

/**
 * Content panel for a single wizard step. Rendered (and shown) only while its
 * `step` id is the active step of the surrounding `<Wizard>`. Mirrors the Blade
 * `wizard-step` view.
 */
export function WizardStep({ step, children, className, ...rest }: WizardStepProps) {
  const context = useContext(WizardContext);

  if (context === null) {
    throw new Error('WizardStep must be used within a Wizard component.');
  }

  const active = context.activeId === step;

  return (
    <div
      role="group"
      id={`${context.group}-panel-${step}`}
      aria-labelledby={`${context.group}-step-${step}`}
      data-test={`wizard-step-${step}`}
      hidden={!active}
      className={cn('text-sm text-text-body', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
