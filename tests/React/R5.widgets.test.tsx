/**
 * Project: Kadoorie Livewire Components
 * File: R5.widgets.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SmallBox } from '../../resources/react/src/ui/SmallBox';
import { InfoBox } from '../../resources/react/src/ui/InfoBox';
import { ProfileMenu } from '../../resources/react/src/ui/ProfileMenu';
import { Footer } from '../../resources/react/src/ui/Footer';
import { AppFooter } from '../../resources/react/src/ui/AppFooter';

describe('SmallBox', () => {
  it('renders value/label and an optional more-info link', () => {
    render(<SmallBox value="1,024" label="Users" icon="info" url="/users" />);
    expect(screen.getByTestId('small-box-value')).toHaveTextContent('1,024');
    expect(screen.getByTestId('small-box-label')).toHaveTextContent('Users');
    expect(screen.getByTestId('small-box-link')).toHaveAttribute('href', '/users');
  });

  it('omits the link when no url is given', () => {
    render(<SmallBox value="5" label="New" icon="info" />);
    expect(screen.queryByTestId('small-box-link')).toBeNull();
  });
});

describe('InfoBox', () => {
  it('renders an accessible progress bar when progress is set', () => {
    render(<InfoBox icon="circle-check" label="Uptime" value="99.9%" progress={92} />);
    const bar = screen.getByTestId('info-box-progress');
    expect(bar).toHaveAttribute('role', 'progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '92');
    expect(bar).toHaveAttribute('aria-label', 'Uptime');
  });

  it('omits the progress bar when progress is absent', () => {
    render(<InfoBox icon="info" label="Sessions" value="42" />);
    expect(screen.queryByTestId('info-box-progress')).toBeNull();
  });
});

describe('ProfileMenu', () => {
  it('reveals header, change-details, and a callback logout item', async () => {
    const onLogout = vi.fn();
    render(
      <ProfileMenu
        name="Jane Doe"
        email="jane@work.com"
        initials="JD"
        changeDetailsUrl="/account"
        onLogout={onLogout}
      />
    );
    await userEvent.click(screen.getByTestId('profile-menu-trigger'));
    expect(screen.getByTestId('profile-menu-header')).toHaveTextContent('jane@work.com');
    expect(screen.getByTestId('profile-menu-change-details')).toHaveAttribute('href', '/account');
    await userEvent.click(screen.getByTestId('profile-menu-logout'));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('renders a POST logout form with the csrf token when a logoutUrl is given', async () => {
    render(<ProfileMenu name="Jane" initials="J" logoutUrl="/logout" csrfToken="tok123" />);
    await userEvent.click(screen.getByTestId('profile-menu-trigger'));
    const form = screen.getByTestId('profile-menu-logout-form');
    expect(form).toHaveAttribute('action', '/logout');
    expect(form.querySelector('input[name="_token"]')).toHaveValue('tok123');
  });
});

describe('Footer', () => {
  it('renders brand, columns, and the legal bar', () => {
    render(
      <Footer
        brand="Kadoorie"
        tagline="Accessible components"
        columns={[{ heading: 'Product', links: [{ label: 'Docs', url: '/docs' }] }]}
        copyright="(c) 2026"
        legalLinks={[{ label: 'Privacy', url: '/privacy' }]}
      />
    );
    expect(screen.getByTestId('footer')).toHaveAttribute('role', 'contentinfo');
    expect(screen.getByTestId('footer-heading')).toHaveTextContent('Product');
    expect(screen.getByTestId('footer-link')).toHaveAttribute('href', '/docs');
    expect(screen.getByTestId('footer-copyright')).toHaveTextContent('(c) 2026');
    expect(screen.getByTestId('footer-legal-link')).toHaveAttribute('href', '/privacy');
  });

  it('omits the legal bar with no copyright or legal links', () => {
    render(<Footer brand="Kadoorie" />);
    expect(screen.queryByTestId('footer-legal')).toBeNull();
  });
});

describe('AppFooter', () => {
  it('renders labelled external links, meta, and the Kadoorie logo', () => {
    render(
      <AppFooter
        links={[{ label: 'REDCap Login', url: 'https://redcap.example.com' }]}
        organisation="Kadoorie Institute"
        version="Site Version 1.0"
      />
    );
    expect(screen.getByTestId('app-footer')).toHaveAttribute('role', 'contentinfo');
    const link = screen.getByTestId('app-footer-link');
    expect(link).toHaveAttribute('href', 'https://redcap.example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByTestId('app-footer-version')).toHaveTextContent('Site Version 1.0');
    expect(screen.getByTestId('app-footer-logo').querySelector('[role="img"]')).toHaveAttribute(
      'aria-label',
      'Kadoorie'
    );
  });

  it('omits the meta block and the new-tab affordance when not needed', () => {
    render(<AppFooter links={[{ label: 'Home', url: '/home', external: false }]} />);
    expect(screen.queryByTestId('app-footer-meta')).toBeNull();
    expect(screen.getByTestId('app-footer-link')).not.toHaveAttribute('target');
  });
});
