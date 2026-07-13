# Filament Recolour Theme

The package ships a **recolour theme** that restyles a Filament panel in the
Kadoorie palette. It is theme-only — there is no Filament plugin class, and
`filament/support` is an optional (`suggest`) dependency, so the package never
hard-requires Filament. It supports **Filament v3 and v4**.

## Install

1. Publish the theme CSS:

   ```bash
   php artisan vendor:publish --tag=kadoorie-filament
   ```

   This copies `kadoorie-v3.css` and `kadoorie-v4.css` into
   `resources/css/filament/kadoorie/`.

2. Register the brand colour ramp in a service provider (for example
   `AppServiceProvider::boot()`):

   ```php
   use Filament\Support\Facades\FilamentColor;
   use Kadoorie\LivewireComponents\Filament\KadoorieColors;

   FilamentColor::register([
       'primary' => KadoorieColors::primary(),
   ]);
   ```

   `KadoorieColors::primary()` returns Filament's native RGB-channel shade ramp
   (50–950) anchored on the Kadoorie brand red, so the package needs no
   `filament/support` import of its own.

### Filament v3

Import the v3 theme into your panel's theme CSS (create one with
`php artisan make:filament-theme` if you have not already), then build it and
register it on the panel:

```css
/* resources/css/filament/admin/theme.css */
@import '../../../../vendor/filament/filament/resources/css/theme.css';
@import '../kadoorie/kadoorie-v3.css';
```

```php
$panel->viteTheme('resources/css/filament/admin/theme.css');
```

### Filament v4

Filament v4 is CSS-first — reference the v4 theme from your panel theme:

```css
/* resources/css/filament/admin/theme.css */
@import '../kadoorie/kadoorie-v4.css';
```

## Scope

This is a **recolour** — brand primary, typography (Inter), surfaces, borders,
and radii — driven by the shared `--kad-*` design tokens. It does not
restructure Filament components. Because Filament's internal class names evolve
between releases, verify the result in your own panel and adjust the published
CSS if needed.
