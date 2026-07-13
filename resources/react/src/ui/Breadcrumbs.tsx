/**
 * Project: Kadoorie Livewire Components
 * File: Breadcrumbs.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { Fragment } from 'react';
import { Icon } from './Icon';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  label?: string;
}

/**
 * Ordered breadcrumb trail. Every item except the last renders as a link
 * (when a url is present); the last is marked `aria-current="page"`. Mirrors
 * the Blade `breadcrumbs` view.
 */
export function Breadcrumbs({ items, label = 'Breadcrumb', ...rest }: BreadcrumbsProps) {
  return (
    <nav aria-label={label} data-test="breadcrumbs" {...rest}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1" data-test="breadcrumb-item">
              {!isLast && item.url !== undefined ? (
                <Fragment>
                  <a
                    href={item.url}
                    data-test="breadcrumb-link"
                    className="kad-focusable rounded hover:text-primary hover:underline"
                  >
                    {item.label}
                  </a>
                  <Icon name="chevron-right" size="sm" className="text-text-muted-large" />
                </Fragment>
              ) : (
                <span
                  aria-current="page"
                  data-test="breadcrumb-current"
                  className="font-medium text-text"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
