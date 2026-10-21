/**
 * Project: Kadoorie Livewire Components
 * File: R4.data.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, type DataTableColumn } from '../../resources/react/src/ui/DataTable';
import { Badge } from '../../resources/react/src/ui/Badge';
import { ErrorPage } from '../../resources/react/src/ui/ErrorPage';
import { LoginForm } from '../../resources/react/src/ui/LoginForm';

type DataRow = { id: number; name: string; score: number };

const columns = [
  { field: 'name', label: 'Name', sortable: true },
  { field: 'score', label: 'Score', sortable: true, numeric: true },
] satisfies DataTableColumn<DataRow>[];

const rows = [
  { id: 1, name: 'Ada', score: 91 },
  { id: 2, name: 'Linus', score: 88 },
  { id: 3, name: 'Grace', score: 95 },
  { id: 4, name: 'Alan', score: 72 },
];

describe('DataTable', () => {
  it('sorts rows ascending then descending on header clicks', async () => {
    render(<DataTable columns={columns} rows={rows} perPage={10} />);
    const header = screen.getByTestId('data-table-th-name');
    expect(header).toHaveAttribute('aria-sort', 'none');

    await userEvent.click(screen.getByTestId('data-table-sort-name'));
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    let bodyRows = screen.getAllByTestId('data-table-row');
    expect(bodyRows[0]).toHaveTextContent('Ada');

    await userEvent.click(screen.getByTestId('data-table-sort-name'));
    expect(header).toHaveAttribute('aria-sort', 'descending');
    bodyRows = screen.getAllByTestId('data-table-row');
    expect(bodyRows[0]).toHaveTextContent('Linus');
  });

  it('paginates by perPage and toggles next/prev', async () => {
    render(<DataTable columns={columns} rows={rows} perPage={2} />);
    expect(screen.getAllByTestId('data-table-row')).toHaveLength(2);
    expect(screen.getByTestId('data-table-page')).toHaveTextContent('Page 1 of 2');
    expect(screen.getByTestId('data-table-prev')).toBeDisabled();

    await userEvent.click(screen.getByTestId('data-table-next'));
    expect(screen.getByTestId('data-table-page')).toHaveTextContent('Page 2 of 2');
    expect(screen.getByTestId('data-table-next')).toBeDisabled();
  });

  it('supports row selection when selectable', async () => {
    render(<DataTable columns={columns} rows={rows} perPage={10} selectable />);
    const [firstCheckbox] = screen.getAllByTestId('data-table-select');
    expect(firstCheckbox).not.toBeChecked();
    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
  });

  it('renders shared cells through the normal column callback and preserves classes', () => {
    render(
      <DataTable
        columns={[
          { field: 'name', label: 'Name', className: 'name-column' },
          {
            field: 'score',
            label: 'Score',
            className: 'score-column',
            render: (score) => <Badge tone="success">{String(score)}</Badge>,
          },
        ]}
        rows={rows}
      />
    );

    expect(screen.getAllByTestId('badge')[0]).toHaveTextContent('91');
    expect(screen.getAllByTestId('badge')[0].parentElement).toHaveClass('score-column', {
      exact: false,
    });
  });

  it('shows an empty state when there are no rows', () => {
    render(<DataTable columns={columns} rows={[]} emptyHeading="Nothing to see" />);
    expect(screen.getByTestId('empty-state-heading')).toHaveTextContent('Nothing to see');
    expect(screen.queryByTestId('data-table-table')).toBeNull();
  });
});

describe('ErrorPage', () => {
  it('renders the mapped title/description for a known status', () => {
    render(<ErrorPage status={404} />);
    expect(screen.getByTestId('error-page-status')).toHaveTextContent('404');
    expect(screen.getByTestId('error-page-title')).toHaveTextContent('Page not found');
    expect(screen.getByTestId('error-page-home')).toBeInTheDocument();
  });

  it('falls back to generic copy and honours overrides', () => {
    render(<ErrorPage status={418} title="Teapot" />);
    expect(screen.getByTestId('error-page-title')).toHaveTextContent('Teapot');
    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });
});

describe('LoginForm', () => {
  it('validates required/format before submitting', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByTestId('login-submit'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('password-error')).toBeInTheDocument();
  });

  it('submits the credentials (including the password) to the host handler', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByTestId('email-input'), 'jane@work.com');
    await userEvent.type(screen.getByTestId('password-input'), 's3cret');
    await userEvent.click(screen.getByTestId('remember-checkbox'));
    await userEvent.click(screen.getByTestId('login-submit'));
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'jane@work.com',
      password: 's3cret',
      remember: true,
    });
  });

  it('renders the forgot link only when a url is supplied', () => {
    const { rerender } = render(<LoginForm onSubmit={() => {}} />);
    expect(screen.queryByTestId('login-forgot')).toBeNull();
    rerender(<LoginForm onSubmit={() => {}} forgotUrl="/forgot" />);
    expect(screen.getByTestId('login-forgot')).toHaveAttribute('href', '/forgot');
  });
});
