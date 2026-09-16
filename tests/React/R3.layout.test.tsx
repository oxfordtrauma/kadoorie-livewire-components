/**
 * Project: Kadoorie Livewire Components
 * File: R3.layout.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: stodd
 * Last updated on: 2026-09-15
 * Version: 0.1.0
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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
import { Sidebar } from '../../resources/react/src/ui/Sidebar';
import { DataTableContainer } from '../../resources/react/src/ui/DataTableContainer';

describe('Sidebar', () => {
  it('renders supplied regions with semantic landmarks and responsive classes', () => {
    render(
      <Sidebar sidebar="Links" actions="Actions" search="Search" footer="Footer">
        Page
      </Sidebar>
    );
    expect(screen.getByRole('complementary')).toHaveTextContent('Links');
    expect(screen.getByRole('navigation', { name: 'Sidebar navigation' })).toHaveTextContent(
      'Links'
    );
    expect(screen.getByRole('main')).toHaveTextContent('Page');
    expect(screen.getByTestId('sidebar')).toHaveClass('lg:grid-cols-[auto_1fr]');
  });

  it('omits optional regions when not supplied', () => {
    render(<Sidebar sidebar="Links" />);
    expect(screen.queryByTestId('sidebar-search')).toBeNull();
    expect(screen.queryByTestId('sidebar-footer')).toBeNull();
  });
});

describe('DataTableContainer', () => {
  it('renders optional heading and toolbar regions only when supplied', () => {
    render(
      <DataTableContainer title="People" summary="2 records" toolbar="Filters">
        Table
      </DataTableContainer>
    );
    expect(screen.getByRole('heading', { name: 'People' })).toBeInTheDocument();
    expect(screen.getByTestId('data-table-container-toolbar')).toHaveTextContent('Filters');
    expect(screen.getByTestId('data-table-container-content')).toHaveTextContent('Table');
    expect(screen.queryByTestId('data-table-container-actions')).toBeNull();
  });
});

describe('Card', () => {
  it('renders header (from title), body, and footer regions', () => {
    render(
      <Card title="Summary" footer={<span>Footer</span>}>
        Body
      </Card>
    );
    expect(screen.getByTestId('card-header')).toHaveTextContent('Summary');
    expect(screen.getByTestId('card-body')).toHaveTextContent('Body');
    expect(screen.getByTestId('card-footer')).toHaveTextContent('Footer');
  });

  it('prefers an explicit header slot over title', () => {
    render(
      <Card header={<span>Custom</span>} title="Ignored">
        Body
      </Card>
    );
    expect(screen.getByTestId('card-header')).toHaveTextContent('Custom');
  });
});

describe('Divider', () => {
  it('renders an hr separator by default', () => {
    render(<Divider />);
    const divider = screen.getByTestId('divider');
    expect(divider.tagName).toBe('HR');
  });

  it('renders a labelled horizontal separator with children', () => {
    render(<Divider>or</Divider>);
    expect(screen.getByTestId('divider')).toHaveTextContent('or');
  });

  it('renders a vertical separator', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByTestId('divider')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('Badge', () => {
  it('renders a tone icon and label', () => {
    render(<Badge tone="success">Active</Badge>);
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    expect(screen.getByTestId('badge-label')).toHaveTextContent('Active');
  });

  it('omits the icon when icon is false', () => {
    render(<Badge icon={false}>Plain</Badge>);
    expect(screen.queryByTestId('badge-icon')).toBeNull();
  });

  it('renders palette colours, dot indicators, and numbers with labels', () => {
    render(
      <Badge color="purple" indicator="number" number={12}>
        Tasks
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveClass(
      'bg-accent-subtle',
      'border-accent',
      'text-accent',
    );
    expect(screen.getByTestId('badge-number')).toHaveTextContent('12');
    expect(screen.getByTestId('badge-label')).toHaveTextContent('Tasks');
  });

  it('uses a transparent text colour for palette icons', () => {
    render(
      <Badge color="amber" indicator="icon">
        Review
      </Badge>
    );
    expect(screen.getByTestId('badge-icon')).toHaveClass('text-warning');
    expect(screen.getByTestId('badge-icon')).not.toHaveClass('bg-warning');
  });
});

describe('Avatar', () => {
  it('renders initials with an accessible alt and presence label', () => {
    render(<Avatar alt="Jane Doe" initials="JD" presence="online" />);
    expect(screen.getByTestId('avatar-initials')).toHaveTextContent('JD');
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders a photo when src is set', () => {
    render(<Avatar alt="Jane" src="/jane.jpg" />);
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('alt', 'Jane');
  });
});

describe('Breadcrumbs', () => {
  it('links every item except the current last', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', url: '/' },
          { label: 'Reports', url: '/reports' },
          { label: 'Detail' },
        ]}
      />
    );
    expect(screen.getAllByTestId('breadcrumb-link')).toHaveLength(2);
    const current = screen.getByTestId('breadcrumb-current');
    expect(current).toHaveTextContent('Detail');
    expect(current).toHaveAttribute('aria-current', 'page');
  });
});

describe('Tabs', () => {
  const tabs = [
    { id: 'a', label: 'One' },
    { id: 'b', label: 'Two' },
  ];

  function Demo() {
    return (
      <Tabs id="g" label="Group" tabs={tabs}>
        <TabPanel tab="a">Panel A</TabPanel>
        <TabPanel tab="b">Panel B</TabPanel>
      </Tabs>
    );
  }

  it('selects the first tab by default and switches on click', async () => {
    render(<Demo />);
    const first = screen.getByTestId('tab-a');
    const second = screen.getByTestId('tab-b');
    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('tab-panel-b')).toHaveAttribute('hidden');
    await userEvent.click(second);
    expect(second).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('tab-panel-a')).toHaveAttribute('hidden');
  });

  it('moves selection with the arrow keys (roving tabindex)', async () => {
    render(<Demo />);
    const first = screen.getByTestId('tab-a');
    first.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('tab-b')).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Home}');
    expect(screen.getByTestId('tab-a')).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Accordion', () => {
  it('opens one item at a time by default', async () => {
    render(
      <Accordion group="g">
        <AccordionItem id="one" heading="One">
          Content one
        </AccordionItem>
        <AccordionItem id="two" heading="Two">
          Content two
        </AccordionItem>
      </Accordion>
    );
    await userEvent.click(screen.getByTestId('accordion-trigger-one'));
    expect(screen.getByTestId('accordion-trigger-one')).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(screen.getByTestId('accordion-trigger-two'));
    expect(screen.getByTestId('accordion-trigger-one')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('accordion-trigger-two')).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps multiple items open when multiple is set', async () => {
    render(
      <Accordion group="g" multiple>
        <AccordionItem id="one" heading="One">
          Content one
        </AccordionItem>
        <AccordionItem id="two" heading="Two">
          Content two
        </AccordionItem>
      </Accordion>
    );
    await userEvent.click(screen.getByTestId('accordion-trigger-one'));
    await userEvent.click(screen.getByTestId('accordion-trigger-two'));
    expect(screen.getByTestId('accordion-trigger-one')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-trigger-two')).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Nav', () => {
  it('toggles the mobile sheet and reflects aria-expanded', async () => {
    render(<Nav brand="Kadoorie" items={[{ label: 'Home', url: '/', active: true }]} />);
    const toggle = screen.getByTestId('nav-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('nav-sheet')).toHaveAttribute('hidden');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('nav-sheet')).not.toHaveAttribute('hidden');
  });
});

describe('Dropdown', () => {
  it('opens the menu and exposes menu items', async () => {
    render(
      <Dropdown label="Options">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem href="/view">View</DropdownItem>
      </Dropdown>
    );
    const trigger = screen.getByTestId('dropdown-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByTestId('dropdown-menu');
    expect(menu).not.toHaveAttribute('hidden');
    expect(within(menu).getAllByRole('menuitem')).toHaveLength(2);
  });
});

describe('EmptyState', () => {
  it('renders the heading and optional description', () => {
    render(<EmptyState heading="Nothing" description="Add one" status />);
    expect(screen.getByTestId('empty-state-heading')).toHaveTextContent('Nothing');
    expect(screen.getByTestId('empty-state')).toHaveAttribute('role', 'status');
    expect(screen.getByText('Add one')).toBeInTheDocument();
  });
});

describe('Pagination', () => {
  it('disables prev on the first page and calls onPageChange', async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByTestId('pagination-prev')).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(screen.getByTestId('pagination-next'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('marks the current page and renders nothing for a single page', () => {
    const { rerender } = render(
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
    );
    const current = screen
      .getAllByTestId('pagination-page')
      .find((el) => el.getAttribute('aria-current') === 'page');
    expect(current).toHaveTextContent('3');
    rerender(<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />);
    expect(screen.queryByTestId('pagination')).toBeNull();
  });
});
