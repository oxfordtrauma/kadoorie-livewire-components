/**
 * Project: Kadoorie Livewire Components
 * File: R3.a11y.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { Card } from '../../resources/react/src/ui/Card';
import { Divider } from '../../resources/react/src/ui/Divider';
import { Badge } from '../../resources/react/src/ui/Badge';
import { Avatar } from '../../resources/react/src/ui/Avatar';
import { Breadcrumbs } from '../../resources/react/src/ui/Breadcrumbs';
import { Tabs, TabPanel } from '../../resources/react/src/ui/Tabs';
import { Accordion, AccordionItem } from '../../resources/react/src/ui/Accordion';
import { Nav } from '../../resources/react/src/ui/Nav';
import { Dropdown, DropdownItem } from '../../resources/react/src/ui/Dropdown';
import { EmptyState } from '../../resources/react/src/ui/EmptyState';
import { Pagination } from '../../resources/react/src/ui/Pagination';

const cases: Record<string, () => React.ReactElement> = {
  Card: () => <Card title="Summary">Body</Card>,
  Divider: () => <Divider>or</Divider>,
  Badge: () => <Badge tone="success">Active</Badge>,
  Avatar: () => <Avatar alt="Jane Doe" initials="JD" presence="online" />,
  Breadcrumbs: () => <Breadcrumbs items={[{ label: 'Home', url: '/' }, { label: 'Detail' }]} />,
  Tabs: () => (
    <Tabs
      id="g"
      label="Group"
      tabs={[
        { id: 'a', label: 'One' },
        { id: 'b', label: 'Two' },
      ]}
    >
      <TabPanel tab="a">Panel A</TabPanel>
      <TabPanel tab="b">Panel B</TabPanel>
    </Tabs>
  ),
  Accordion: () => (
    <Accordion group="g">
      <AccordionItem id="one" heading="One">
        Content one
      </AccordionItem>
    </Accordion>
  ),
  Nav: () => <Nav brand="Kadoorie" items={[{ label: 'Home', url: '/', active: true }]} />,
  Dropdown: () => (
    <Dropdown label="Options">
      <DropdownItem>Edit</DropdownItem>
    </Dropdown>
  ),
  EmptyState: () => <EmptyState heading="Nothing" description="Add one" />,
  Pagination: () => <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />,
};

describe('R3 layout and navigation components have no axe violations', () => {
  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
