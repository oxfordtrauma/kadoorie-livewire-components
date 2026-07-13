# Kadoorie React Components — Guide

The React set is a **source (copy-in) distribution**: `kadoorie:install` copies
the component source into your application, and you own it from there — there is
no runtime npm dependency on this package. The React components mirror the Blade
set: same design tokens, same compiled `kadoorie.css`, the same `data-test`
names, and the same WCAG 2.1 AA bar.

## Contents

- [Requirements](#requirements)
- [Install](#install)
- [What gets published](#what-gets-published)
- [Wire up the styles and alias](#wire-up-the-styles-and-alias)
- [Usage](#usage)
- [Controlled and uncontrolled](#controlled-and-uncontrolled)
- [Adapters (stateful components)](#adapters-stateful-components)
- [Security notes](#security-notes)
- [Testing](#testing)

## Requirements

- The Composer package installed (see the [user guide](user-guide.md)).
- `react` and `react-dom` 18 or 19, `typescript`, and a bundler (Vite,
  Laravel Vite plugin, or your own). The published components are plain client
  components — mount them however your app does (Inertia, a Vite entry, or
  Blade islands).

## Install

```bash
php artisan kadoorie:install
```

Choose **React** (or both sets) at the prompt. The installer is idempotent and
prints a summary of what it published plus the next steps. Flags for
non-interactive use:

| Flag | Effect |
|---|---|
| `--set=blade\|react\|both` | Skip the prompt and install the given set(s). |
| `--with-config` | Also publish the tsconfig alias + eslint config (non-interactive). |
| `--force` | Overwrite files that already exist. |

```bash
php artisan kadoorie:install --set=react --with-config
```

## What gets published

| Item | Destination | Tag |
|---|---|---|
| React component source | `resources/js/kadoorie` (config `kadoorie.react.path`) | `kadoorie-react` |
| `tsconfig.kadoorie.json` (path alias) | app root | `kadoorie-react-config` |
| `eslint.kadoorie.cjs` (a11y rules) | app root | `kadoorie-react-config` |
| Compiled `kadoorie.css` | `public/vendor/kadoorie` | `kadoorie-styles` |

Change the publish directory with `config('kadoorie.react.path')`.

## Wire up the styles and alias

**1. Import the compiled stylesheet** once in your app entry (or publish it via
`--tag=kadoorie-styles` and link it):

```ts
import 'vendor/kadoorie/kadoorie.css'; // or the path you published it to
```

The React components are styled purely by this stylesheet and the `--kad-*`
design tokens — they introduce no new styling system.

**2. Add the path alias.** Extend the published `tsconfig.kadoorie.json`, or copy
its `compilerOptions.paths` into your own `tsconfig.json`, and mirror the alias
in your bundler (Vite example):

```ts
// vite.config.ts
resolve: { alias: { '@/kadoorie': '/resources/js/kadoorie' } }
```

## Usage

Import components from the published source (via the alias, or a relative path):

```tsx
import { Button } from '@/kadoorie';
import { Field, Input } from '@/kadoorie';

function Example() {
  return (
    <form>
      <Field label="Email" name="email" hint="Work address" error={errors.email}>
        <Input type="email" name="email" value={email} onChange={onChange} />
      </Field>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
```

`<Field>` publishes its `hint`/`error` to the control it wraps (the React
analogue of Blade's `@aware`), wiring `aria-describedby` and `aria-invalid`
automatically. Variants, sizes, and tones are typed enums mirroring the PHP
enums (for example `variant`, `size`, `tone`).

## Controlled and uncontrolled

Every stateful control accepts both a controlled value (`value`/`checked` +
`onChange`) and an uncontrolled default (`defaultValue`/`defaultChecked`):

```tsx
<Toggle name="notify" label="Notifications" defaultChecked />      {/* uncontrolled */}
<Toggle name="notify" label="Notifications" checked={on} onChange={setOn} />  {/* controlled */}
```

## Adapters (stateful components)

Four components ship an adapter so you wire data/behaviour without forking the
component:

- **`useDataTable({ columns, rows, perPage, selectable })`** — client-side
  sort/paginate/select (a faithful port of the Livewire `DataTable`). `<DataTable>`
  consumes it internally; call the hook yourself to render rows your own way.
- **`<ToastProvider>` + `useToast()`** — wrap your app once, then
  `toast({ message, tone })`. The `aria-live` region and hover-pausing
  auto-dismiss are built in.
- **`<Modal open onOpenChange … />`** (or `useDisclosure`) — controlled or
  uncontrolled; traps focus, returns it to the trigger, locks scroll, dismisses
  on Escape/backdrop.
- **`<LoginForm onSubmit={(c) => …} />`** — presentational, auth-agnostic.

```tsx
import { ToastProvider, useToast } from '@/kadoorie';

function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

function SaveButton() {
  const { toast } = useToast();
  return <Button onClick={() => toast({ message: 'Saved!', tone: 'success' })}>Save</Button>;
}
```

## Security notes

The Login and ProfileMenu components are deliberately auth-agnostic — the same
contract as the Blade twins:

- **`<LoginForm>`** validates on the client, but the password **never leaves
  component state** until your `onSubmit` runs. It is never dispatched or
  serialised. Do the actual authentication in `onSubmit`.
- **`<ProfileMenu>` logout** is either an `onLogout` callback, or a host-supplied
  `logoutUrl` + `csrfToken` that renders a POST form with a hidden `_token`.
  React cannot read Blade's `@csrf`, so pass the token from your meta tag:

```tsx
const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;

<ProfileMenu name="Jane Doe" logoutUrl="/logout" csrfToken={csrfToken} changeDetailsUrl="/profile" />
```

## Testing

The components carry the **same `data-test` selectors as the Blade set**, so your
Playwright specs can target them the same way (`data-test`, not `data-testid`).
Structure and a11y are covered by Vitest + `vitest-axe`; contrast and responsive
behaviour are verified in a real browser (Playwright `react-functional-*` /
`react-wcag-*`), because jsdom cannot compute styles.
