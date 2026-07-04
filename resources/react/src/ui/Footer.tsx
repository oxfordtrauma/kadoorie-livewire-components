/**
 * Project: Kadoorie Livewire Components
 * File: Footer.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { Icon } from './Icon';

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterProps {
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  copyright?: string;
  legalLinks?: FooterLink[];
}

/**
 * Site footer (`role="contentinfo"`) with a brand block, configurable link
 * columns, and an optional legal bar. Mirrors the Blade `footer` view.
 */
export function Footer({
  brand = 'Kadoorie',
  tagline,
  columns = [],
  copyright,
  legalLinks = [],
}: FooterProps) {
  const hasLegal = copyright !== undefined || legalLinks.length > 0;

  return (
    <footer role="contentinfo" data-test="footer" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-container px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div
              data-test="footer-brand"
              className="flex items-center gap-2 font-semibold text-text"
            >
              <Icon name="kadoorie:leaf" size="md" className="text-primary" />
              {brand}
            </div>
            {tagline !== undefined ? (
              <p data-test="footer-tagline" className="mt-2 max-w-xs text-sm text-text-muted">
                {tagline}
              </p>
            ) : null}
          </div>

          {columns.map((column, index) => (
            <div key={index} data-test="footer-column">
              <h2 data-test="footer-heading" className="text-sm font-semibold text-text">
                {column.heading}
              </h2>
              <ul className="mt-3 flex flex-col gap-1">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      data-test="footer-link"
                      className="kad-focusable inline-flex min-h-11 items-center rounded text-sm text-text-body hover:text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {hasLegal ? (
          <div
            data-test="footer-legal"
            className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between"
          >
            {copyright !== undefined ? <p data-test="footer-copyright">{copyright}</p> : null}

            {legalLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      data-test="footer-legal-link"
                      className="kad-focusable inline-flex min-h-11 items-center rounded hover:text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
