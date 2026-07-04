/**
 * Project: Kadoorie Livewire Components
 * File: Accordion.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

interface AccordionContextValue {
  group: string;
  multiple: boolean;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  group?: string;
  multiple?: boolean;
  defaultOpen?: string[];
}

/**
 * Accordion group sharing open-state with its `<AccordionItem>` children,
 * single- or multi-open. Mirrors the Blade `accordion` view.
 */
export function Accordion({
  group = 'accordion',
  multiple = false,
  defaultOpen = [],
  children,
  className,
  ...rest
}: AccordionProps) {
  const [items, setItems] = useState<string[]>(defaultOpen);

  const isOpen = useCallback((id: string) => items.includes(id), [items]);

  const toggle = useCallback(
    (id: string) => {
      setItems((current) => {
        if (multiple) {
          return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
        }

        return current.includes(id) ? [] : [id];
      });
    },
    [multiple]
  );

  return (
    <div
      data-test="accordion"
      className={cn('divide-y divide-border rounded-lg border border-border', className)}
      {...rest}
    >
      <AccordionContext.Provider value={{ group, multiple, isOpen, toggle }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  heading: ReactNode;
}

/**
 * A single accordion row: a header button toggling its region panel. Mirrors
 * the Blade `accordion-item` view.
 */
export function AccordionItem({ id, heading, children, className, ...rest }: AccordionItemProps) {
  const context = useContext(AccordionContext);

  if (context === null) {
    throw new Error('AccordionItem must be used within an Accordion component.');
  }

  const { group, isOpen, toggle } = context;
  const open = isOpen(id);

  return (
    <div data-test={`accordion-item-${id}`} className={className} {...rest}>
      <h3>
        <button
          type="button"
          id={`${group}-header-${id}`}
          aria-controls={`${group}-panel-${id}`}
          data-test={`accordion-trigger-${id}`}
          aria-expanded={open}
          onClick={() => toggle(id)}
          className="kad-focusable flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-text"
        >
          <span>{heading}</span>
          <Icon
            name="chevron-down"
            size="sm"
            className={cn(
              'shrink-0 text-text-muted-large transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
      </h3>

      <div
        id={`${group}-panel-${id}`}
        role="region"
        aria-labelledby={`${group}-header-${id}`}
        data-test={`accordion-panel-${id}`}
        hidden={!open}
      >
        <div className="px-4 pb-3 text-sm text-text-body">{children}</div>
      </div>
    </div>
  );
}
