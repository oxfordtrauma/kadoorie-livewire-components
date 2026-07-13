/**
 * Project: Kadoorie Livewire Components
 * File: AppFooter.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { Icon } from './Icon';
import { kadoorieOxfordLogo } from '../lib/kadoorieOxfordLogo';

export interface AppFooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface AppFooterProps {
  label?: string;
  links?: AppFooterLink[];
  organisation?: string;
  version?: string;
}

/**
 * Compact application footer (`role="contentinfo"`): a dark utility bar with a
 * labelled row of external "useful links", an optional organisation/version
 * meta block, and the bundled Kadoorie logo lockup. Mirrors the Blade
 * `app-footer` view. Stacks on mobile.
 */
export function AppFooter({
  label = 'Useful Links:',
  links = [],
  organisation,
  version,
}: AppFooterProps) {
  const hasMeta = organisation !== undefined || version !== undefined;

  return (
    <footer role="contentinfo" data-test="app-footer" className="bg-footer text-footer-fg">
      <div className="mx-auto flex max-w-container flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p data-test="app-footer-links-label" className="text-sm font-semibold underline">
            {label}
          </p>

          {links.length > 0 ? (
            <ul
              data-test="app-footer-links"
              className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1"
            >
              {links.map((link, index) => {
                const external = link.external ?? true;

                return (
                  <li key={index}>
                    <a
                      href={link.url}
                      data-test="app-footer-link"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="kad-focusable inline-flex items-center gap-1 rounded py-1 text-sm text-footer-fg hover:underline"
                    >
                      {link.label}
                      {external ? (
                        <>
                          <Icon name="external-link" className="size-3" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-5 md:justify-end">
          {hasMeta ? (
            <div data-test="app-footer-meta" className="text-sm text-footer-muted md:text-right">
              {organisation !== undefined ? (
                <p data-test="app-footer-organisation">{organisation}</p>
              ) : null}
              {version !== undefined ? <p data-test="app-footer-version">{version}</p> : null}
            </div>
          ) : null}

          <div data-test="app-footer-logo" className="shrink-0">
            <span
              role="img"
              aria-label="Kadoorie"
              className="inline-block"
              dangerouslySetInnerHTML={{ __html: kadoorieOxfordLogo }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
