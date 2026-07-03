# Data-binding Guide — Pushing Data Into Components

How to feed data into Kadoorie components, for both **Blade** (stateless) and
**Livewire** (stateful) components. See the [User guide](user-guide.md) for
installation and the [showcase](showcase/index.html) for rendered examples.

## Contents

- [Blade components](#blade-components)
- [Livewire components](#livewire-components)
- [Recipes](#recipes)
  - [Data table](#data-table)
  - [Select options](#select-options)
  - [Alert and Toast tone](#alert-and-toast-tone)
  - [Login](#login)

## Blade components

Blade components (`<x-kadoorie::button>`, `<x-kadoorie::card>`, …) receive data
through **attributes** and **slots**.

### Literal vs bound attributes

A plain attribute passes a string; a `:` prefix evaluates a PHP expression:

```blade
{{-- literal string --}}
<x-kadoorie::button variant="danger">Delete</x-kadoorie::button>

{{-- bound expression (bool, enum, array, variable) --}}
<x-kadoorie::button :variant="$variant" :loading="$isSaving">Save</x-kadoorie::button>
```

Enum-backed props accept either a string or the enum case:

```blade
<x-kadoorie::badge tone="success">Active</x-kadoorie::badge>
<x-kadoorie::badge :tone="\Kadoorie\LivewireComponents\Enums\Tone::Success">Active</x-kadoorie::badge>
```

### Arrays

Pass arrays with a bound attribute:

```blade
<x-kadoorie::breadcrumbs :items="[
    ['label' => 'Home', 'url' => '/'],
    ['label' => 'Reports', 'url' => '/reports'],
    ['label' => 'March'],
]" />
```

### Slots

The default slot is the body; named slots fill specific regions:

```blade
<x-kadoorie::card>
    <x-slot:header>Monthly report</x-slot:header>

    Revenue is up 12%.

    <x-slot:footer>
        <x-kadoorie::button size="sm">Export</x-kadoorie::button>
    </x-slot:footer>
</x-kadoorie::card>
```

### Forwarding attributes

Any extra attribute is merged onto the component's root element, so you can add
classes, `wire:model`, `x-data`, `data-*`, and ARIA attributes:

```blade
<x-kadoorie::input name="email" wire:model.live="email" class="mt-2" autofocus />
```

## Livewire components

Livewire components (`<livewire:kadoorie::modal>`, `<livewire:kadoorie::data-table>`,
…) receive data through **mount parameters** and communicate through
**`wire:model`**, **events**, and **Alpine `@entangle`**.

### Mount parameters

Parameters passed on the tag map to the component's `mount()` method:

```blade
<livewire:kadoorie::modal
    title="Delete item"
    description="This action cannot be undone."
    :dismissible="true"
/>
```

### Two-way binding with wire:model

The form controls are `wire:model`-friendly. Bind them to a parent Livewire
component's public properties:

```blade
<x-kadoorie::field label="Email" name="email" :error="$errors->first('email')">
    <x-kadoorie::input name="email" wire:model="email" />
</x-kadoorie::field>

<x-kadoorie::toggle name="notify" wire:model.live="notify" label="Notifications" />
```

### Reactive props from a parent

When a Kadoorie Livewire component is nested inside your own, mark props you want
kept in sync with `#[Reactive]` in your wrapper, or drive them via mount
parameters that change with the parent state.

### Sending data in via events

Open or update a component from anywhere by dispatching an event:

```php
// Open the modal
$this->dispatch('kadoorie-open-modal');

// Show a toast (place <livewire:kadoorie::toast /> once in your layout)
$this->dispatch('kadoorie-toast', message: 'Saved successfully', tone: 'success');
```

### Listening for data coming out

Components emit events your app can listen for:

```php
use Livewire\Attributes\On;

#[On('kadoorie:login-submitted')]
public function handleLogin(string $email, bool $remember): void
{
    // React to the login form submission.
}
```

### Alpine @entangle

For instant, client-side two-way binding between Alpine and a Livewire property:

```blade
<div x-data="{ open: $wire.entangle('isOpen') }">
    <button x-on:click="open = true">Open</button>
</div>
```

## Recipes

### Data table

Feed the table a `Collection` (or the array form of your paginated rows) plus
typed column definitions from your own Livewire component:

```php
use Illuminate\Support\Collection;

public function rows(): array
{
    return User::query()
        ->select(['id', 'name', 'email', 'orders_count'])
        ->withCount('orders')       // avoid N+1
        ->limit(200)                // bounded read
        ->get()
        ->toArray();
}
```

```blade
<livewire:kadoorie::data-table
    :columns="[
        ['field' => 'name', 'label' => 'Name', 'sortable' => true],
        ['field' => 'email', 'label' => 'Email'],
        ['field' => 'orders_count', 'label' => 'Orders', 'numeric' => true, 'sortable' => true],
    ]"
    :rows="$this->rows()"
    :selectable="true"
    :per-page="25"
/>
```

Columns may also be built from the `Column` value object:

```php
use Kadoorie\LivewireComponents\Support\Column;

$columns = [
    new Column(field: 'name', label: 'Name', sortable: true),
    new Column(field: 'total', label: 'Total', numeric: true, sortable: true),
];
```

### Select options

Pass an associative `value => label` array:

```blade
<x-kadoorie::select
    name="country"
    wire:model="country"
    placeholder="Choose a country"
    :options="$countries->pluck('name', 'code')->all()"
/>
```

### Alert and Toast tone

Drive semantic colour with the `Tone` enum (or its string value):

```blade
<x-kadoorie::alert :tone="\Kadoorie\LivewireComponents\Enums\Tone::Warning" title="Heads up">
    Your trial ends soon.
</x-kadoorie::alert>
```

```php
$this->dispatch('kadoorie-toast', message: 'Deleted', tone: 'danger');
```

### Login

The login page never authenticates. Wire it to your app in one of two ways.

**Server-side handler (keeps the password server-side):**

```php
// config/kadoorie.php
'login' => [
    'handler' => \App\Auth\HandleKadoorieLogin::class, // __invoke(string $email, string $password, bool $remember)
],
```

```php
namespace App\Auth;

use Illuminate\Support\Facades\Auth;

final class HandleKadoorieLogin
{
    public function __invoke(string $email, string $password, bool $remember): void
    {
        Auth::attempt(['email' => $email, 'password' => $password], $remember);
    }
}
```

**Event listener (password excluded from the browser event):**

```php
use Livewire\Attributes\On;

#[On('kadoorie:login-submitted')]
public function onLogin(string $email, bool $remember): void
{
    // Look up and sign in the user with your own flow.
}
```
