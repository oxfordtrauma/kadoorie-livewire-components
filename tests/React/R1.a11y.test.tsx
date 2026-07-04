/**
 * Project: Kadoorie Livewire Components
 * File: R1.a11y.test.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';
import { Button } from '../../resources/react/src/ui/Button';
import { Icon } from '../../resources/react/src/ui/Icon';
import { Field } from '../../resources/react/src/ui/Field';
import { Input } from '../../resources/react/src/ui/Input';
import { Textarea } from '../../resources/react/src/ui/Textarea';
import { Select } from '../../resources/react/src/ui/Select';
import { Checkbox, Radio } from '../../resources/react/src/ui/Choice';
import { Toggle } from '../../resources/react/src/ui/Toggle';

const cases: Record<string, () => React.ReactElement> = {
  Button: () => <Button>Save</Button>,
  'Icon (labelled)': () => <Icon name="triangle-alert" label="Warning" />,
  Input: () => (
    <Field name="email" label="Email" hint="Work address">
      <Input name="email" type="email" />
    </Field>
  ),
  'Input (invalid)': () => (
    <Field name="email" label="Email" error="Required">
      <Input name="email" type="email" />
    </Field>
  ),
  Textarea: () => (
    <Field name="bio" label="Bio">
      <Textarea name="bio" rows={3} />
    </Field>
  ),
  Select: () => (
    <Field name="role" label="Role">
      <Select name="role" options={{ admin: 'Admin', user: 'User' }} placeholder="Choose" />
    </Field>
  ),
  Checkbox: () => <Checkbox name="terms" label="I accept the terms" />,
  Radio: () => <Radio name="plan" value="pro" label="Pro" />,
  Toggle: () => <Toggle name="notify" label="Notifications" />,
};

describe('R1 form controls have no axe violations', () => {
  for (const [name, render_] of Object.entries(cases)) {
    it(name, async () => {
      const { container } = render(render_());
      expect(await axe(container)).toHaveNoViolations();
    });
  }
});
