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
- [Styling: preset vs precompiled CSS](#styling-preset-vs-precompiled-css)
- [Theming with design tokens](#theming-with-design-tokens)
- [Alpine plugins](#alpine-plugins)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Component catalogue](#component-catalogue)

## Requirements

- PHP `^8.3`
- Laravel `^11.0 || ^12.0`
- Livewire `^3.5`
- Tailwind CSS `^3.4` (only if you consume the preset rather than the
  precompiled stylesheet)

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
    "oxfordtrauma/livewire-components": "^0.1"
  }
}
```

```bash
composer require oxfordtrauma/livewire-components:^0.1
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

Tailwind apps can consume the preset instead — see
[Styling](#styling-preset-vs-precompiled-css).

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

## Styling: preset vs precompiled CSS

You can style the components in one of two ways.

### Option A — Tailwind preset (recommended for Tailwind apps)

Extend the shipped preset so the `--kad-*` tokens and component utilities are
available in your own build, and add the package views to your `content` paths
so the classes are generated:

```js
// tailwind.config.js
module.exports = {
    presets: [require('kadoorie/livewire-components/tailwind-preset.cjs')],
    content: [
        './resources/**/*.blade.php',
        './vendor/kadoorie/livewire-components/resources/views/**/*.blade.php',
    ],
};
```

Import the token layer once in your CSS entry point:

```css
@import 'kadoorie/livewire-components/resources/css/tokens.css';
```

### Option B — Precompiled stylesheet (no Tailwind required)

Publish `kadoorie-styles` and link the precompiled file. This is the simplest
path for apps that do not use Tailwind:

```blade
<link rel="stylesheet" href="{{ asset('vendor/kadoorie/kadoorie.css') }}" />
```

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
(`resources/logos/kadoorieLogo.svg`). Links open in a new tab by default (add
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
