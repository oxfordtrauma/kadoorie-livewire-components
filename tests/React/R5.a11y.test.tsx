/**
 * Project: Kadoorie Livewire Components
 * File: R5.a11y.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { SmallBox } from '../../resources/react/src/ui/SmallBox';
import { InfoBox } from '../../resources/react/src/ui/InfoBox';
import { ProfileMenu } from '../../resources/react/src/ui/ProfileMenu';
import { Footer } from '../../resources/react/src/ui/Footer';

const cases: Record<string, () => React.ReactElement> = {
  SmallBox: () => <SmallBox value="1,024" label="Users" icon="info" url="/users" />,
  InfoBox: () => <InfoBox icon="circle-check" label="Uptime" value="99.9%" progress={92} />,
  ProfileMenu: () => (
    <ProfileMenu
      name="Jane Doe"
      email="jane@work.com"
      initials="JD"
      changeDetailsUrl="/account"
      onLogout={() => {}}
    />
  ),
  Footer: () => (
    <Footer
      brand="Kadoorie"
      tagline="Accessible components"
      columns={[{ heading: 'Product', links: [{ label: 'Docs', url: '/docs' }] }]}
      copyright="(c) 2026"
      legalLinks={[{ label: 'Privacy', url: '/privacy' }]}
    />
  ),
};

describe('R5 widget components have no axe violations', () => {
  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
