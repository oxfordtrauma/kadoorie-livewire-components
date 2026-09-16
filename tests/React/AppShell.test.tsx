/**
 * Project: Kadoorie Livewire Components
 * File: AppShell.test.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { render, screen, within } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { IconButton } from '../../resources/react/src/ui/IconButton';
import { SelectPill } from '../../resources/react/src/ui/SelectPill';
import { ContextPill } from '../../resources/react/src/ui/ContextPill';
import { Notification } from '../../resources/react/src/ui/Notification';
import { AppHeader } from '../../resources/react/src/ui/AppHeader';
import { AppLayout } from '../../resources/react/src/ui/AppLayout';
import { DropdownItem } from '../../resources/react/src/ui/Dropdown';

describe('IconButton', () => {
  it('renders an icon-only button with an accessible label', () => {
    render(<IconButton icon="circle-help" label="Help" />);
    const button = screen.getByTestId('icon-button');
    expect(button).toHaveAttribute('aria-label', 'Help');
    expect(button.querySelector('svg')).not.toBeNull();
  });

  it('passes icon size through to the rendered icon', () => {
    render(<IconButton icon="bell" label="Notifications" iconSize="xl" />);
    expect(screen.getByTestId('kadoorie-icon')).toHaveAttribute('width', '98');
    expect(screen.getByTestId('kadoorie-icon')).toHaveAttribute('height', '98');
  });
});

describe('SelectPill', () => {
  it('renders a labelled pill with a value and its menu items', () => {
    render(
      <SelectPill label="Role" value="Manager">
        <DropdownItem href="#">Manager</DropdownItem>
      </SelectPill>
    );
    expect(screen.getByTestId('select-pill')).toBeInTheDocument();
    expect(screen.getByTestId('select-pill-trigger')).toHaveTextContent('Role');
    expect(screen.getByTestId('select-pill-value')).toHaveTextContent('Manager');
  });
});

describe('ContextPill', () => {
  it('renders static label/value context without interactive behaviour', () => {
    render(<ContextPill label="View" value="Summary" />);
    expect(screen.getByTestId('context-pill')).toHaveTextContent('ViewSummary');
    expect(screen.getByTestId('context-pill-value')).toHaveTextContent('Summary');
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByTestId('select-pill-trigger')).toBeNull();
    expect(screen.queryByTestId('kadoorie-icon')).toBeNull();
  });
});

describe('Notification', () => {
  it('folds the unread count into the accessible name and shows a badge', () => {
    render(<Notification count={3} />);
    expect(screen.getByTestId('icon-button')).toHaveAttribute(
      'aria-label',
      'Notifications, 3 unread'
    );
    expect(screen.getByTestId('notification-count')).toHaveTextContent('3');
  });

  it('omits the badge when there is no count', () => {
    render(<Notification />);
    expect(screen.queryByTestId('notification-count')).toBeNull();
    expect(screen.getByTestId('icon-button')).toHaveAttribute('aria-label', 'Notifications');
  });
});

describe('AppHeader', () => {
  it('renders logo, start, actions, and subbar regions', () => {
    render(
      <AppHeader brand="Kadoorie" start={<span>Selectors</span>} subbar={<span>Crumbs</span>}>
        <button type="button">Action</button>
      </AppHeader>
    );
    expect(screen.getByTestId('kadoorie-logo')).toHaveAccessibleName('Kadoorie');
    expect(screen.getByTestId('app-header-start')).toHaveTextContent('Selectors');
    expect(
      within(screen.getByTestId('app-header-actions')).getByText('Action')
    ).toBeInTheDocument();
    expect(screen.getByTestId('app-header-subbar')).toHaveTextContent('Crumbs');
  });
});

describe('AppLayout', () => {
  it('renders a skip link, the main landmark, and content', () => {
    render(
      <AppLayout header={<div>Head</div>} footer={<div>Foot</div>}>
        <p>Body</p>
      </AppLayout>
    );
    expect(screen.getByTestId('app-layout-skip-link')).toHaveAttribute('href', '#main-content');
    expect(screen.getByTestId('app-layout-main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByTestId('app-layout-main')).toHaveTextContent('Body');
  });
});

describe('App shell components have no axe violations', () => {
  const cases: Record<string, () => React.ReactElement> = {
    IconButton: () => <IconButton icon="circle-help" label="Help" />,
    Notification: () => <Notification count={3} />,
    AppHeader: () => (
      <AppHeader brand="Kadoorie">
        <IconButton icon="circle-help" label="Help" />
      </AppHeader>
    ),
  };

  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
