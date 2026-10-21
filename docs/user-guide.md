# Kadoorie Livewire Components — User Guide

Prebuilt, accessible [Livewire 3](https://livewire.laravel.com) and Blade
components implementing the Kadoorie look and feel. This guide covers
installation, styling, theming, accessibility, and a catalogue of every
component. For pushing data into components, see the
[Data-binding guide](data-binding.md). To browse rendered examples, open the
[static showcase](showcase/index.html).

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Publishing assets](#publishing-assets)
- [Styling: Tailwind theme vs precompiled CSS](#styling-tailwind-theme-vs-precompiled-css)
- [Theming with design tokens](#theming-with-design-tokens)
- [Alpine plugins](#alpine-plugins)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Component catalogue](#component-catalogue)

## Requirements

- PHP `^8.3`
- Laravel `^13.17`
- Livewire `^4.3.2`
- Tailwind CSS `^4.3` (only if you compile the components into your own
  Tailwind build rather than linking the precompiled stylesheet)
- A modern browser: Safari 16.4+, Chrome 111+, or Firefox 128+ (the baseline
  for Tailwind CSS v4 and the precompiled stylesheet)

## Installation

The package is distributed privately over VCS. Add the repository and require
the package in your application's `composer.json`:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "git@github.com:oxfordtrauma/kadoorie-livewire-components.git"
    }
  ],
  "require": {
    "oxfordtrauma/kadoorie-livewire-components": "^0.1"
  }
}
```

```bash
composer require oxfordtrauma/kadoorie-livewire-components:^0.1
```

The service provider `Kadoorie\LivewireComponents\KadoorieComponentsServiceProvider`
is registered automatically through Laravel package auto-discovery. Blade
components are available under the `kadoorie` namespace (for example
`<x-kadoorie::button>`), and Livewire components under `kadoorie::` (for example
`<livewire:kadoorie::modal>`).

## Component sets: Blade and React

This package ships two component sets that share the same design tokens,
compiled CSS, `data-test` names, and WCAG 2.1 AA bar:

- **Blade (Livewire)** — the default, covered by this guide.
- **React** — a source (copy-in) distribution published into your app's
  JavaScript. See the [React guide](react-guide.md).

An interactive installer wires whichever set(s) you choose:

```bash
php artisan kadoorie:install
# non-interactive: --set=blade|react|both  [--with-config]  [--force]
```

## Quick start

Once `composer require` has pulled the package, the service provider is
auto-discovered — there is nothing to register. Three short steps get you
rendering components:

**1. Add the styles.** The quickest path (no build step) is the precompiled
stylesheet:

```bash
php artisan vendor:publish --tag=kadoorie-styles
```

Link it in your layout `<head>`:

```blade
<link rel="stylesheet" href="{{ asset('vendor/kadoorie/kadoorie.css') }}" />
```

Tailwind v4 apps can compile the components into their own build instead — see
[Styling](#styling-tailwind-theme-vs-precompiled-css).

**2. (Recommended) Register the Alpine plugins** so overlays trap focus and the
accordion animates — see [Alpine plugins](#alpine-plugins). The components still
work without them; they just lose focus-trapping and the collapse animation.

**3. Use a component** in any Blade view:

```blade
<x-kadoorie::button>Save changes</x-kadoorie::button>

<x-kadoorie::field label="Email" name="email">
    <x-kadoorie::input type="email" name="email" wire:model="email" />
</x-kadoorie::field>

{{-- Place a Livewire component once near your layout root --}}
<livewire:kadoorie::toast />
```

That is the whole setup. Browse [rendered examples and recipes](showcase/index.html),
and see the [Data-binding guide](data-binding.md) for pushing data in.

## Publishing assets

Publish tags are available:

```bash
# Configuration (config/kadoorie.php)
php artisan vendor:publish --tag=kadoorie-config

# Blade views (only if you want to override component markup)
php artisan vendor:publish --tag=kadoorie-views

# Precompiled stylesheet -> public/vendor/kadoorie/kadoorie.css
php artisan vendor:publish --tag=kadoorie-styles

# Filament recolour theme (v3 + v4) -> resources/css/filament/kadoorie/
php artisan vendor:publish --tag=kadoorie-filament

# React component source -> resources/js/kadoorie (config kadoorie.react.path)
php artisan vendor:publish --tag=kadoorie-react

# React tsconfig alias + eslint a11y config -> app root
php artisan vendor:publish --tag=kadoorie-react-config
```

The `kadoorie:install` command wraps these tags with prompts — see the
[React guide](react-guide.md).

## Styling: Tailwind theme vs precompiled CSS

You can style the components in one of two ways.

### Option A — Tailwind theme (recommended for Tailwind apps)

Tailwind CSS v4 is configured in CSS. Import the package tokens and its
CSS-first theme after Tailwind, then point `@source` at the package views and
PHP source so the component classes are generated:

```css
/* resources/css/app.css */
@import 'tailwindcss';
@import '../../vendor/oxfordtrauma/kadoorie-livewire-components/resources/css/tokens.css';
@import '../../vendor/oxfordtrauma/kadoorie-livewire-components/resources/css/theme.css';

@source '../../vendor/oxfordtrauma/kadoorie-livewire-components/resources/views';
@source '../../vendor/oxfordtrauma/kadoorie-livewire-components/src';
```

- `tokens.css` defines the `--kad-*` design tokens on `:root`.
- `theme.css` is an `@theme inline` block that maps Tailwind's theme variables
  (colours, font, text sizes, radii, shadows, breakpoints, and
  `max-w-container`) to those tokens. The class names are the same as in the
  Tailwind 3 preset, and overriding a token still restyles the components with
  no rebuild.
- Both `@source` lines are needed. Tailwind v4 skips git-ignored directories
  (`vendor/` usually is) during automatic source detection, and some component classes are
  generated from PHP enums under `src/`, not only from the Blade views.

`theme.css` applies to your whole build, not only to the Kadoorie components. It
replaces Tailwind's default breakpoints with the Kadoorie set (`sm` 480px, `md`
768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px) and maps several defaults (for
example `text-sm`, `rounded`, and `shadow-sm`) to Kadoorie tokens. It also
restores four Tailwind 3 behaviours the components rely on: `hover:` variants
apply on every device, borders default to `--kad-color-border`, buttons get a
pointer cursor, and `divide-y` draws a top border on each visible child after
the first (v4 draws a bottom border on every child but the last, which adds a
stray rule under a list whose last child is hidden).

#### Upgrading from Tailwind 3 / the JS preset

Earlier releases shipped only a Tailwind 3 JavaScript preset. To move a host app
to Tailwind v4:

1. Upgrade the app itself to Tailwind CSS v4 (Tailwind's
   `npx @tailwindcss/upgrade` tool handles most of the app-level changes).
2. Remove `tailwind-preset.cjs` from the `presets` array of your
   `tailwind.config.js`, and remove the package paths from its `content` array.
3. Add the `@import` and `@source` lines from Option A to your CSS entry point.

If you cannot migrate yet, the preset still works in Tailwind v4 through
`@config`. This path is **deprecated** and the preset will be removed in the
next major release:

```css
/* resources/css/app.css */
@import 'tailwindcss';
@import '../../vendor/oxfordtrauma/kadoorie-livewire-components/resources/css/tokens.css';
@config '../../vendor/oxfordtrauma/kadoorie-livewire-components/tailwind-preset.cjs';

@source '../../vendor/oxfordtrauma/kadoorie-livewire-components/resources/views';
@source '../../vendor/oxfordtrauma/kadoorie-livewire-components/src';
```

If your own `tailwind.config.js` already lists the preset under `presets`, you
can point `@config` at that file instead.

Differences between `theme.css` and the preset:

- The preset's `container` settings (centred, `1rem` padding, capped at
  `--kad-container-max`) are not carried into `theme.css`, so with `theme.css`
  the `container` utility uses Tailwind's defaults. The components do not use
  `container`; they use `max-w-container`, which is unchanged. If your own
  markup relies on the centred container, add `mx-auto px-4` where you use it.
- The Tailwind 3 behaviours restored by `theme.css` (`hover:` on every device,
  the button pointer cursor, and `divide-y` border placement) are not part of
  the preset. On the `@config` path you get Tailwind v4's defaults for these;
  for example, the nested data table shows an extra rule under its last row.

### Option B — Precompiled stylesheet (no Tailwind required)

Publish `kadoorie-styles` and link the precompiled file. This is the simplest
path for apps that do not use Tailwind:

```blade
<link rel="stylesheet" href="{{ asset('vendor/kadoorie/kadoorie.css') }}" />
```

The precompiled stylesheet is built with Tailwind CSS v4, so it needs Safari
16.4+, Chrome 111+, or Firefox 128+.

It also uses native CSS cascade layers (`@layer theme, base, components,
utilities`). Unlayered CSS always wins over layered CSS, so any unlayered rule in
your own stylesheets now takes precedence over the Kadoorie utilities, whatever
its specificity or load order. If a host rule unexpectedly overrides a
component, scope it more narrowly or move it into a layer of your own.

## Theming with design tokens

Every colour, radius, shadow, and font is a `--kad-*` CSS custom property on
`:root`. Override any token in your own CSS to retheme every component with no
rebuild:

```css
:root {
    --kad-color-primary: #005a9c;
    --kad-color-primary-hover: #004a80;
    --kad-radius-md: 6px;
}
```

Dark mode and RTL are intentionally out of scope for this release.

## Alpine plugins

Livewire bundles Alpine core. A few interactive components use two optional
Alpine plugins for the best experience:

- **[@alpinejs/focus](https://alpinejs.dev/plugins/focus)** — focus trapping and
  return for the Modal, Nav dropdown sheet, and Dropdown menu.
- **[@alpinejs/collapse](https://alpinejs.dev/plugins/collapse)** — smooth
  height animation for the Accordion.

Register them in your app's JavaScript:

```js
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(focus);
    window.Alpine.plugin(collapse);
});
```

Without the plugins the components still work; they simply lose focus trapping
and the collapse animation.

## Accessibility

All components target **WCAG 2.1 Level AA**:

- Every interactive element is keyboard operable with a visible focus ring.
- Form controls are labelled and wire `aria-describedby` / `aria-invalid` for
  hints and errors through the shared `<x-kadoorie::field>` wrapper.
- Overlays (Modal, Nav sheet, Dropdown) trap focus and return it to the trigger.
- Dynamic updates use `aria-live` regions (Toast, Alert, Spinner, Empty state).
- Colour never conveys meaning alone — semantic components pair colour with an
  icon and text.
- Layouts are responsive at 360×800, 768×1024, and 1920×1080 with no horizontal
  scroll and 44×44px minimum touch targets.

Every meaningful element exposes a unique `data-test` attribute for reliable
end-to-end testing.

## Testing

The package ships three test layers:

- **Pest** (`vendor/bin/pest`) — renders every component and asserts markup,
  state, and ARIA wiring.
- **Playwright functional** (`npm run test:e2e`) — drives the components in a real
  browser against a live Testbench workbench: keyboard interaction, focus
  trapping and return, Nav collapse, DataTable sort/paginate/reflow, Toast
  auto-dismiss, and more.
- **Playwright WCAG** (`npm run test:wcag`) — runs axe-core (WCAG 2.1 A/AA) against
  every generated showcase page.

Both Playwright suites run across the three reference viewports (360×800,
768×1024, 1920×1080) as six projects (`functional-*` and `wcag-*`).

First-time setup installs the browser and its system libraries:

```bash
npx playwright install --with-deps chromium
```

Build the assets the workbench needs, then run the suites:

```bash
npm run build            # resources/dist/kadoorie.css
npm run build:workbench  # resources/dist/workbench.js (Alpine focus/collapse + Livewire)
npm run test:e2e         # functional-mobile / -tablet / -desktop
npm run test:wcag        # wcag-mobile / -tablet / -desktop
```

Playwright boots the workbench automatically via its `webServer`
(`vendor/bin/testbench serve`). The WCAG suite scans the committed static
showcase over `file://`; regenerate it with
`vendor/bin/testbench kadoorie:build-showcase` after changing a component.

## Component catalogue

Copy-paste usage for each component. Rendered previews live in the
[showcase](showcase/index.html); data flow is covered in the
[Data-binding guide](data-binding.md).

### Icon

```blade
<x-kadoorie::icon name="check" />
<x-kadoorie::icon name="triangle-alert" label="Warning" size="lg" />
<x-kadoorie::icon name="kadoorie:leaf" />
```

### Button

```blade
<x-kadoorie::button>Save</x-kadoorie::button>
<x-kadoorie::button variant="danger" :loading="true">Delete</x-kadoorie::button>
<x-kadoorie::button variant="ghost" size="sm">Cancel</x-kadoorie::button>
```

### Field, Label, Input, Textarea

```blade
<x-kadoorie::field label="Email" name="email" hint="Work address" :error="$errors->first('email')">
    <x-kadoorie::input type="email" name="email" wire:model="email" />
</x-kadoorie::field>

<x-kadoorie::field label="Bio" name="bio">
    <x-kadoorie::textarea name="bio" rows="4" wire:model="bio" />
</x-kadoorie::field>
```

### Select, Checkbox, Radio, Toggle

```blade
<x-kadoorie::select name="role" :options="['admin' => 'Admin', 'user' => 'User']" wire:model="role" />
<x-kadoorie::checkbox name="terms" label="I accept the terms" wire:model="terms" />
<x-kadoorie::radio name="plan" value="pro" label="Pro" wire:model="plan" />
<x-kadoorie::toggle name="notify" label="Notifications" wire:model="notify" />
```

### Badge, Card, Avatar, Divider

```blade
<x-kadoorie::badge tone="success">Active</x-kadoorie::badge>
<x-kadoorie::badge tone="info" shape="pill">New</x-kadoorie::badge>

<x-kadoorie::card title="Report">Body content</x-kadoorie::card>

<x-kadoorie::avatar alt="Jane Doe" initials="JD" presence="online" />

<x-kadoorie::divider>OR</x-kadoorie::divider>
```

### Alert, Toast

```blade
<x-kadoorie::alert tone="danger" title="Payment failed">Check your card.</x-kadoorie::alert>

{{-- Place once near the layout root; trigger from anywhere --}}
<livewire:kadoorie::toast />
{{-- $this->dispatch('kadoorie-toast', message: 'Saved', tone: 'success'); --}}
```

### Modal

```blade
<livewire:kadoorie::modal title="Delete item" description="This cannot be undone." />
{{-- Open it from anywhere: $this->dispatch('kadoorie-open-modal'); --}}
```

### Tooltip, Spinner

```blade
<x-kadoorie::tooltip text="Copied"><x-kadoorie::button>Copy</x-kadoorie::button></x-kadoorie::tooltip>
<x-kadoorie::spinner label="Loading" />
```

### Tabs, Accordion

```blade
<x-kadoorie::tabs :tabs="[['id' => 'a', 'label' => 'A'], ['id' => 'b', 'label' => 'B']]" id="demo">
    <x-kadoorie::tab-panel tab="a" group="demo">A content</x-kadoorie::tab-panel>
    <x-kadoorie::tab-panel tab="b" group="demo">B content</x-kadoorie::tab-panel>
</x-kadoorie::tabs>

<x-kadoorie::accordion id="faq">
    <x-kadoorie::accordion-item id="one" heading="Question" group="faq">Answer</x-kadoorie::accordion-item>
</x-kadoorie::accordion>
```

### Breadcrumbs, Nav

```blade
<x-kadoorie::breadcrumbs :items="[['label' => 'Home', 'url' => '/'], ['label' => 'Current']]" />

<x-kadoorie::nav
    brand="Kadoorie"
    :sticky="true"
    :items="[['label' => 'Dashboard', 'url' => '/', 'active' => true], ['label' => 'Reports', 'url' => '/reports']]"
/>
```

### Dropdown, Empty state, Pagination

```blade
<x-kadoorie::dropdown label="Actions">
    <x-kadoorie::dropdown-item href="/edit">Edit</x-kadoorie::dropdown-item>
    <x-kadoorie::dropdown-item wire:click="delete">Delete</x-kadoorie::dropdown-item>
</x-kadoorie::dropdown>

<x-kadoorie::empty-state heading="No results" description="Try another search." />

<x-kadoorie::pagination :paginator="$users" />
```

### Data table

```blade
<livewire:kadoorie::data-table
    :columns="[
        ['field' => 'name', 'label' => 'Name', 'sortable' => true],
        ['field' => 'total', 'label' => 'Total', 'numeric' => true, 'sortable' => true],
    ]"
    :rows="$rows"
    :selectable="true"
/>
```

### Sidebar and DataTableContainer (React)

`Sidebar` composes supplied sidebar content with adjacent page content. Its
`search` slot accepts application-owned UI; it does not search or manage query
state. `DataTableContainer` provides a generic heading, toolbar, and content
frame for tables, lists, or directories.

```tsx
import { DataTableContainer, Sidebar } from '@kadoorie/ui';

<Sidebar sidebar={<nav>Sections</nav>} search={<input aria-label="Search" />}>
  <DataTableContainer title="People" summary="24 records" actions={<button>Export</button>}>
    {/* supply your own table or list */}
  </DataTableContainer>
</Sidebar>;
```

### Nested data table (React)

`NestedDataTable` is an opt-in React component for one controlled expanded row
at a time. It does not alter the standard `DataTable` behaviour. Supply a
stable row ID, the expanded ID state, and an expanded-content callback. Columns
are typed from the row shape and can render any React component, including a
`Badge`.

```tsx
import { Badge, NestedDataTable } from '@kadoorie/ui';

const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

<NestedDataTable
  columns={[
    { field: 'name', label: 'Name' },
    {
      field: 'status',
      label: 'Status',
      render: (status) => <Badge tone="success">{status}</Badge>,
    },
  ]}
  rows={people}
  getRowId={(person) => person.id}
  expandedRowId={expandedRowId}
  onExpandedRowChange={setExpandedRowId}
  renderExpandedContent={(person) => <p>Details for {person.name}</p>}
/>;
```

Use `bordered={false}`, `className`, `containerClassName`, and
`tableClassName` to tailor its outer presentation. The live React workbench
also builds a dedicated [NestedDataTable HTML page](../resources/dist/react-workbench/nested-data-table.html).

### Login page

```blade
<livewire:kadoorie::pages.login forgot-url="/forgot-password" />
```

Configure a server-side handler to receive the credentials, or listen for the
`kadoorie:login-submitted` event. See the
[Data-binding guide](data-binding.md#login).

### Error page

```blade
{{-- resources/views/errors/404.blade.php --}}
<x-kadoorie::error-page :status="404" />
```

One component covers 401/403/404/405/406/412/500/501/502 plus a generic
fallback for any other status.

### Profile menu, Footer

```blade
<x-kadoorie::profile-menu
    name="Jane Doe"
    email="jane@example.com"
    initials="JD"
    change-details-url="/account"
    logout-url="/logout"
/>

<x-kadoorie::footer
    brand="Kadoorie"
    tagline="Accessible Livewire components"
    :columns="[['heading' => 'Product', 'links' => [['label' => 'Docs', 'url' => '/docs']]]]"
    copyright="© 2026 Kadoorie"
    :legal-links="[['label' => 'Privacy', 'url' => '/privacy']]"
/>
```

The profile menu is auth-agnostic: it renders a `POST` logout form with `@csrf`
when `logout-url` is set, or you can override the action via a `logout` slot.

### App footer

A compact dark utility bar (distinct from the marketing `footer` above): a
labelled row of external "useful links", an optional organisation/version meta
block, and the bundled Kadoorie logo lockup
(`resources/logos/kadoorieOxfordLogo.svg`). Links open in a new tab by default (add
`'external' => false` to keep one in-tab).

```blade
<x-kadoorie::app-footer
    organisation="Kadoorie Institute"
    version="Site Version 1.0 · 18Jun2026"
    :links="[
        ['label' => 'Help Center', 'url' => '/help'],
        ['label' => 'REDCap Login', 'url' => 'https://redcap.example.org'],
        ['label' => 'eTMF Portal', 'url' => 'https://etmf.example.org'],
    ]"
/>
```

The dark surface is driven by the `--kad-color-footer-*` tokens, so you can
retheme the bar without touching the component.

### Application shell (App layout, App header)

`app-layout` is the page scaffold — a skip link, a `header` slot, the main
content region (on the `--kad-color-body` surface), and a `footer` slot.
`app-header` is the application top bar: a logo (brand mark by default, or a
`logo` slot), an optional `start` slot for contextual selectors, a
right-aligned actions area (default slot), and an optional `subbar` slot for a
second row (e.g. breadcrumbs).

```blade
<x-kadoorie::app-layout>
    <x-slot:header>
        <x-kadoorie::app-header brand="Kadoorie">
            <x-slot:start>
                <x-kadoorie::select-pill label="Page">
                    <x-kadoorie::dropdown-item href="#">Dashboard</x-kadoorie::dropdown-item>
                </x-kadoorie::select-pill>
            </x-slot:start>

            <x-kadoorie::select-pill label="Role" value="Manager">
                <x-kadoorie::dropdown-item href="#">Manager</x-kadoorie::dropdown-item>
            </x-kadoorie::select-pill>
            <x-kadoorie::button>Pull REDCap Data</x-kadoorie::button>
            <x-kadoorie::icon-button icon="circle-help" label="Help" variant="pill" />
            <x-kadoorie::notification :count="3" />
            <x-kadoorie::profile-menu name="User" initials="U" logout-url="/logout" />
        </x-kadoorie::app-header>
    </x-slot:header>

    {{-- page content --}}

    <x-slot:footer>
        <x-kadoorie::app-footer organisation="Kadoorie Institute" version="Site Version 1.0" />
    </x-slot:footer>
</x-kadoorie::app-layout>
```

Supporting pieces used above:

- **`select-pill`** — a labelled pill dropdown (`label`, optional `value`) that
  wraps the shared `dropdown`; pass `dropdown-item`s as the menu.
- **`icon-button`** — an icon-only button; `label` is required (aria-label),
  `variant="pill"` adds the light rounded container.
- **`notification`** — a bell `icon-button` with an optional unread `count`
  badge, folded into the accessible name.

### Dashboard widgets (Small-box, Info-box)

```blade
<x-kadoorie::small-box tone="primary" value="150" label="New orders" icon="info" url="/orders" />

<x-kadoorie::info-box
    tone="success"
    icon="circle-check"
    label="Bookmarks"
    value="410"
    :progress="70"
    description="70% increase in 30 days"
/>
```

The solid tone fills use AA-verified on-colours; `info-box` exposes an accessible
`role="progressbar"` when `:progress` is set.

## Filament

A theme-only **recolour** for Filament v3 and v4 ships in the package. Publish it
with `php artisan vendor:publish --tag=kadoorie-filament` and register the brand
ramp with `FilamentColor::register(['primary' => KadoorieColors::primary()])`.
See the [Filament theme guide](filament.md) for the full setup.
