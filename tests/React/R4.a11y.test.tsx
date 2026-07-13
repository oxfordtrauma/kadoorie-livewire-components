/**
 * Project: Kadoorie Livewire Components
 * File: R4.a11y.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { DataTable } from '../../resources/react/src/ui/DataTable';
import { ErrorPage } from '../../resources/react/src/ui/ErrorPage';
import { LoginForm } from '../../resources/react/src/ui/LoginForm';

const cases: Record<string, () => React.ReactElement> = {
  DataTable: () => (
    <DataTable
      selectable
      perPage={2}
      columns={[
        { field: 'name', label: 'Name', sortable: true },
        { field: 'score', label: 'Score', sortable: true, numeric: true },
      ]}
      rows={[
        { id: 1, name: 'Ada', score: 91 },
        { id: 2, name: 'Linus', score: 88 },
        { id: 3, name: 'Grace', score: 95 },
      ]}
    />
  ),
  'DataTable (empty)': () => <DataTable columns={[{ field: 'name', label: 'Name' }]} rows={[]} />,
  ErrorPage: () => <ErrorPage status={404} />,
  LoginForm: () => <LoginForm onSubmit={() => {}} forgotUrl="/forgot" />,
};

describe('R4 data and page components have no axe violations', () => {
  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
