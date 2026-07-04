/**
 * Project: Kadoorie Livewire Components
 * File: Tabs.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { createContext, useContext, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useControllableState } from '../hooks/useControllableState';
import { useRovingTabIndex } from '../hooks/useRovingTabIndex';

export interface TabItem {
  id: string;
  label: ReactNode;
}

interface TabsContextValue {
  group: string;
  active: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  tabs: TabItem[];
  label: string;
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

/**
 * Tablist with a roving tabindex and Arrow/Home/End keyboard support. Panels
 * are `<TabPanel>` children that read the active tab from context. Mirrors the
 * Blade `tabs`/`tab-panel` views (ids `{id}-tab-{tab}` / `{id}-panel-{tab}`).
 */
export function Tabs({
  id,
  tabs,
  label,
  defaultTab,
  activeTab,
  onTabChange,
  children,
  className,
  ...rest
}: TabsProps) {
  const initial = defaultTab ?? tabs[0]?.id ?? '';
  const [active, setActive] = useControllableState<string>(activeTab, initial, onTabChange);
  const { itemProps } = useRovingTabIndex(
    tabs.map((tab) => tab.id),
    active,
    setActive
  );

  return (
    <div data-test="tabs" className={className} {...rest}>
      <div
        role="tablist"
        aria-label={label}
        data-test="tabs-list"
        className="flex gap-1 overflow-x-auto border-b border-border"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          const { ref, tabIndex, onKeyDown } = itemProps(tab.id);

          return (
            <button
              key={tab.id}
              ref={ref as React.Ref<HTMLButtonElement>}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.id}`}
              data-test={`tab-${tab.id}`}
              aria-controls={`${id}-panel-${tab.id}`}
              aria-selected={selected}
              tabIndex={tabIndex}
              onClick={() => setActive(tab.id)}
              onKeyDown={onKeyDown}
              className={cn(
                '-mb-px min-h-11 whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-medium text-text-muted',
                'kad-focusable aria-selected:border-primary aria-selected:text-primary'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div data-test="tabs-panels" className="pt-3">
        <TabsContext.Provider value={{ group: id, active }}>{children}</TabsContext.Provider>
      </div>
    </div>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tab: string;
}

/**
 * Panel for a single tab. Rendered (and shown) only when its `tab` id matches
 * the active tab of the surrounding `<Tabs>`. Mirrors the Blade `tab-panel`.
 */
export function TabPanel({ tab, children, className, ...rest }: TabPanelProps) {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error('TabPanel must be used within a Tabs component.');
  }

  const active = context.active === tab;

  return (
    <div
      role="tabpanel"
      id={`${context.group}-panel-${tab}`}
      aria-labelledby={`${context.group}-tab-${tab}`}
      data-test={`tab-panel-${tab}`}
      tabIndex={0}
      hidden={!active}
      className={cn('kad-focusable text-sm text-text-body', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
