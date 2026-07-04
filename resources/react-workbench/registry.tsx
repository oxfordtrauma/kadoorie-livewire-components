/**
 * Project: Kadoorie Livewire Components
 * File: registry.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import type { ReactElement } from 'react';
import { getIcon } from '@kadoorie/lib/icons';
import { useFieldState } from '@kadoorie/hooks/useFieldState';
import { Icon } from '@kadoorie/ui/Icon';
import { Button } from '@kadoorie/ui/Button';
import { Field } from '@kadoorie/ui/Field';
import { Input } from '@kadoorie/ui/Input';
import { Textarea } from '@kadoorie/ui/Textarea';
import { Select } from '@kadoorie/ui/Select';
import { Checkbox, Radio } from '@kadoorie/ui/Choice';
import { Toggle } from '@kadoorie/ui/Toggle';
import { Alert } from '@kadoorie/ui/Alert';
import { Spinner } from '@kadoorie/ui/Spinner';
import { Tooltip } from '@kadoorie/ui/Tooltip';
import { Modal } from '@kadoorie/ui/Modal';
import { ToastProvider, useToast } from '@kadoorie/ui/Toast';
import { Card } from '@kadoorie/ui/Card';
import { Divider } from '@kadoorie/ui/Divider';
import { Badge } from '@kadoorie/ui/Badge';
import { Avatar } from '@kadoorie/ui/Avatar';
import { Breadcrumbs } from '@kadoorie/ui/Breadcrumbs';
import { Tabs, TabPanel } from '@kadoorie/ui/Tabs';
import { Accordion, AccordionItem } from '@kadoorie/ui/Accordion';
import { Nav } from '@kadoorie/ui/Nav';
import { Dropdown, DropdownItem } from '@kadoorie/ui/Dropdown';
import { EmptyState } from '@kadoorie/ui/EmptyState';
import { Pagination } from '@kadoorie/ui/Pagination';
import { useState } from 'react';

/**
 * A workbench "story": a stable id (used as ?component= and data-test scope)
 * and a render function. Phases R1–R5 append their component stories here so
 * the shared Playwright specs can drive them.
 */
export interface Story {
  id: string;
  render: () => ReactElement;
}

/** R0 smoke story: proves the shared lib + hooks mount in a real browser. */
function FoundationStory(): ReactElement {
  const field = useFieldState({ name: 'email', hint: 'Work email' });
  const inner = getIcon('info') ?? '';

  return (
    <section data-test="story-foundation">
      <svg
        data-test="foundation-icon"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: inner }}
      />
      <p id={field.hintId} data-test="foundation-hint">
        Work email
      </p>
      <input
        data-test="foundation-input"
        id={field.fieldId}
        name="email"
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid}
      />
    </section>
  );
}

/** R1 form-control gallery: renders every form control with field wiring. */
function FormControlsStory(): ReactElement {
  return (
    <section
      data-test="story-form-controls"
      style={{ display: 'grid', gap: '1rem', padding: '1rem' }}
    >
      <Button>Save changes</Button>
      <Button variant="danger" loading>
        Deleting
      </Button>
      <Icon name="triangle-alert" label="Warning" size="lg" />

      <Field label="Email" name="email" hint="Work address" error="This field is required">
        <Input type="email" name="email" placeholder="you@work.com" />
      </Field>

      <Field label="Bio" name="bio">
        <Textarea name="bio" rows={4} />
      </Field>

      <Field label="Role" name="role">
        <Select
          name="role"
          options={{ admin: 'Admin', user: 'User' }}
          placeholder="Choose a role"
        />
      </Field>

      <Checkbox name="terms" label="I accept the terms" />
      <Radio name="plan" value="pro" label="Pro" />
      <Toggle name="notify" label="Notifications" />
    </section>
  );
}

/** R2 feedback & overlays gallery. */
function FeedbackStory(): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <section data-test="story-feedback" style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
        <Alert tone="success" title="Saved">
          Your changes were saved.
        </Alert>
        <Alert tone="danger" dismissible title="Error">
          Something went wrong.
        </Alert>
        <Spinner label="Loading" />
        <Tooltip text="More info">
          <span>Hover me</span>
        </Tooltip>
        <ToastLauncher />
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Delete item"
          description="This action cannot be undone."
        />
      </section>
    </ToastProvider>
  );
}

/** Small helper so the FeedbackStory can call useToast under the provider. */
function ToastLauncher(): ReactElement {
  const { toast } = useToast();
  return (
    <Button variant="secondary" onClick={() => toast({ message: 'Saved!', tone: 'success' })}>
      Show toast
    </Button>
  );
}

/** R3 layout & navigation gallery. */
function LayoutNavStory(): ReactElement {
  const [page, setPage] = useState(3);

  return (
    <section data-test="story-layout-nav" style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
      <Nav
        brand="Kadoorie"
        items={[
          { label: 'Dashboard', url: '#', active: true },
          { label: 'Reports', url: '#' },
        ]}
      />

      <Breadcrumbs
        items={[{ label: 'Home', url: '#' }, { label: 'Reports', url: '#' }, { label: 'Detail' }]}
      />

      <Card title="Summary" footer={<Button variant="secondary">Action</Button>}>
        Card body content.
      </Card>

      <Divider>or</Divider>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge tone="success">Active</Badge>
        <Avatar alt="Jane Doe" initials="JD" presence="online" />
      </div>

      <Tabs
        id="demo"
        label="Demo tabs"
        tabs={[
          { id: 'a', label: 'One' },
          { id: 'b', label: 'Two' },
        ]}
      >
        <TabPanel tab="a">First panel</TabPanel>
        <TabPanel tab="b">Second panel</TabPanel>
      </Tabs>

      <Accordion group="demo-acc">
        <AccordionItem id="one" heading="Section one">
          Content one.
        </AccordionItem>
        <AccordionItem id="two" heading="Section two">
          Content two.
        </AccordionItem>
      </Accordion>

      <Dropdown label="Options">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem href="#">View</DropdownItem>
      </Dropdown>

      <EmptyState heading="Nothing here" description="Create your first item to get started." />

      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </section>
  );
}

export const stories: Story[] = [
  { id: 'foundation', render: FoundationStory },
  { id: 'form-controls', render: FormControlsStory },
  { id: 'feedback', render: FeedbackStory },
  { id: 'layout-nav', render: LayoutNavStory },
];

export function findStory(id: string | null): Story | undefined {
  return stories.find((story) => story.id === id);
}
