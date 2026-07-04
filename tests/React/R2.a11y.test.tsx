/**
 * Project: Kadoorie Livewire Components
 * File: R2.a11y.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { Alert } from '../../resources/react/src/ui/Alert';
import { Spinner } from '../../resources/react/src/ui/Spinner';
import { Tooltip } from '../../resources/react/src/ui/Tooltip';
import { Modal } from '../../resources/react/src/ui/Modal';
import { ToastProvider } from '../../resources/react/src/ui/Toast';

const cases: Record<string, () => React.ReactElement> = {
  Alert: () => (
    <Alert tone="success" title="Saved">
      Your changes were saved.
    </Alert>
  ),
  'Alert (dismissible)': () => (
    <Alert dismissible title="Heads up">
      Body
    </Alert>
  ),
  Spinner: () => <Spinner label="Loading" />,
  Tooltip: () => <Tooltip text="More info">Trigger</Tooltip>,
  Modal: () => <Modal defaultOpen title="Delete item" description="This cannot be undone." />,
  ToastProvider: () => <ToastProvider />,
};

describe('R2 feedback and overlay components have no axe violations', () => {
  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
