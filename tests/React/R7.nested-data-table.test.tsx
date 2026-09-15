import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from '../../resources/react/src/ui/Badge';
import { NestedDataTable } from '../../resources/react/src/ui/NestedDataTable';

type Person = {
  uuid: string;
  name: string;
  status: 'active' | 'pending';
};

const columns = [
  { field: 'name', label: 'Name' },
  {
    field: 'status',
    label: 'Status',
    render: (status: Person['status']) => (
      <Badge tone={status === 'active' ? 'success' : 'warning'}>{status}</Badge>
    ),
  },
] satisfies Parameters<typeof NestedDataTable<Person>>[0]['columns'];

const rows: Person[] = [
  { uuid: 'person-ada', name: 'Ada', status: 'active' },
  { uuid: 'person-linus', name: 'Linus', status: 'pending' },
];

function renderTable(expandedRowId: string | null = null, onExpandedRowChange = vi.fn()) {
  return render(
    <NestedDataTable
      columns={columns}
      rows={rows}
      getRowId={(row) => row.uuid}
      expandedRowId={expandedRowId}
      onExpandedRowChange={onExpandedRowChange}
      renderExpandedContent={(row) => <div>Details for {row.name}</div>}
    />
  );
}

describe('NestedDataTable', () => {
  it('renders rows collapsed and requests controlled expansion from its accessible control', async () => {
    const onExpandedRowChange = vi.fn();
    renderTable(null, onExpandedRowChange);

    const [firstToggle] = screen.getAllByTestId('nested-data-table-toggle');
    expect(firstToggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('nested-data-table-expanded-row')).not.toBeInTheDocument();

    await userEvent.click(firstToggle);
    expect(onExpandedRowChange).toHaveBeenCalledWith('person-ada');
  });

  it('uses the caller supplied stable ID for the expanded row and collapses it', async () => {
    const onExpandedRowChange = vi.fn();
    renderTable('person-linus', onExpandedRowChange);

    const toggles = screen.getAllByTestId('nested-data-table-toggle');
    expect(toggles[1]).toHaveAttribute('aria-expanded', 'true');
    expect(toggles[1]).toHaveAttribute('aria-controls', 'nested-data-table-expanded-person-linus');
    expect(screen.getByText('Details for Linus')).toBeInTheDocument();

    await userEvent.click(toggles[1]);
    expect(onExpandedRowChange).toHaveBeenCalledWith(null);
  });

  it('renders expanded content in a cell spanning the expander and all data columns', () => {
    renderTable('person-ada');

    expect(screen.getByTestId('nested-data-table-expanded-content')).toHaveAttribute(
      'colspan',
      '3'
    );
  });

  it('renders custom cells, including shared components, through the column render API', () => {
    renderTable();

    expect(screen.getAllByTestId('badge')[0]).toHaveClass('bg-success-subtle');
  });

  it('allows the border container to be disabled and custom classes to be supplied', () => {
    const { container } = render(
      <NestedDataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.uuid}
        expandedRowId={null}
        onExpandedRowChange={() => {}}
        renderExpandedContent={() => null}
        bordered={false}
        className="outer-class"
        containerClassName="container-class"
        tableClassName="table-class"
      />
    );

    expect(container.firstChild).toHaveClass('outer-class');
    expect(screen.getByTestId('nested-data-table-table').parentElement).toHaveClass(
      'container-class'
    );
    expect(screen.getByTestId('nested-data-table-table').parentElement).not.toHaveClass('border');
    expect(screen.getByTestId('nested-data-table-table')).toHaveClass('table-class');
  });
});
