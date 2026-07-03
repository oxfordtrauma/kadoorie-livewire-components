# Kadoorie Livewire Components — Implementation Plan · Part 2 of 3

> **Plan Set**: `docs/kadoorie-components-plan-*.md`
> **This File**: Part 2 — Phase 0 (Scaffold), Phase 0B (Tokens), Phase 1 (Form controls), Phase 2 (Feedback/overlays)
> **Navigation**: [Part 1 — Summary & Architecture](kadoorie-components-plan-1.md) · **Part 2 (this file)** · [Part 3 — Phases 3–8 + Testing](kadoorie-components-plan-3.md)

Every phase below carries a poker estimate, code deltas, TDD acceptance tests (write failing first),
a **Definition of Done**, and a **conventional commit message** to output on completion.
**Do not commit** — output the message; the user handles git (project rule 08).

Standard **Definition of Done** referenced by each phase:

```
- [ ] Pint clean:      docker exec kadoorie-app ./vendor/bin/pint --dirty --format agent
- [ ] Larastan clean:  docker exec kadoorie-app ./vendor/bin/phpstan analyse
- [ ] Pest green:      docker exec kadoorie-app php artisan test --compact
- [ ] JS lint/format:  npm run lint && npm run format:check
- [ ] Jest ≥85%:       npm run test:js
- [ ] Playwright functional + WCAG (axe) green for touched components, across the viewport
      matrix (360×800, 768×1024, 1920×1080); no horizontal scroll; touch targets ≥ 44×44px
- [ ] Icons/logo/illustrations are inline SVG (no emoji/raster; decorative SVGs aria-hidden)
- [ ] Transitions respect `prefers-reduced-motion`; muted body text uses the AA-safe token
- [ ] Every meaningful element has a unique kebab-case data-test
- [ ] Strict types + project file header on every PHP/JS file
- [ ] All phase tasks checked off in this document
- [ ] health-check skill run clean
```

---

## Phase 0 — Package Scaffold + Quality Bootstrap · **10 pts** · (no deps)

### Goal
A publishable, CI-gated, empty-but-correct package skeleton with every quality tool wired, runnable
inside a **Docker dev container named `kadoorie-app`** — all quality-gate commands run via `docker exec kadoorie-app …`.

### Tasks
- [x] **Docker dev environment**: `Dockerfile` (PHP 8.3 + ext + Composer + Node 20) + `docker-compose.yml`
      (service `app`, container `kadoorie-app`) + `.dockerignore`; `docker compose build && up -d`
      — ✅ **built & verified** (PHP 8.3.32, Composer 2.10.1, Node 20.20.2) (**2**)
- [x] `composer.json` — package metadata, autoload, deps, scripts (**2**)
      — widened to Laravel `^11 || ^12` / Testbench `^9 || ^10` so `composer install` resolves
- [x] Service provider via Spatie package-tools + config publish (**2**) — `kadoorie-styles` tag verified
- [x] JS/CSS toolchain: `package.json`, Tailwind, PostCSS, build script (**1**)
      — preset/tokens land in 0B; JS gates green as no-op until then
- [x] Test harness: Testbench `TestCase`, `Pest.php`, Pint, Larastan configs (**2**)
- [x] CI workflow + `.githooks` + `README`/`LICENSE`/`CHANGELOG` (**1**)

### Key code deltas

**`composer.json`** (CREATE)
```json
{
    "name": "kadoorie/livewire-components",
    "description": "Prebuilt Livewire components for the Kadoorie look and feel.",
    "type": "library",
    "license": "proprietary",
    "require": {
        "php": "^8.3",
        "illuminate/contracts": "^11.0",
        "livewire/livewire": "^3.5",
        "spatie/laravel-package-tools": "^1.16"
    },
    "require-dev": {
        "larastan/larastan": "^3.0",
        "laravel/pint": "^1.18",
        "orchestra/testbench": "^10.0",
        "pestphp/pest": "^3.5",
        "pestphp/pest-plugin-laravel": "^3.0",
        "roave/security-advisories": "dev-latest"
    },
    "autoload": {
        "psr-4": { "Kadoorie\\LivewireComponents\\": "src/" }
    },
    "autoload-dev": {
        "psr-4": {
            "Kadoorie\\LivewireComponents\\Tests\\": "tests/",
            "Workbench\\App\\": "workbench/app/"
        }
    },
    "extra": {
        "laravel": {
            "providers": ["Kadoorie\\LivewireComponents\\KadoorieComponentsServiceProvider"]
        }
    },
    "scripts": {
        "post-autoload-dump": "@php vendor/bin/testbench package:discover --ansi",
        "audit": "composer audit",
        "test": "pest --compact",
        "lint": "pint --dirty"
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "config": { "sort-packages": true, "allow-plugins": { "pestphp/pest-plugin": true } }
}
```

**`src/KadoorieComponentsServiceProvider.php`** (CREATE) — registration hub; component
`Livewire::component()` calls are appended per phase.
```php
<?php

/**
 * Project: Kadoorie Livewire Components
 * File: KadoorieComponentsServiceProvider.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents;

use Illuminate\Support\Facades\Blade;
use Livewire\Livewire;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

final class KadoorieComponentsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('kadoorie-livewire-components')
            ->hasConfigFile('kadoorie')
            ->hasViews('kadoorie')
            ->hasAssets();
    }

    public function packageBooted(): void
    {
        $this->registerBladeComponents();
        $this->registerLivewireComponents();

        $this->publishes([
            __DIR__ . '/../resources/dist' => public_path('vendor/kadoorie'),
        ], 'kadoorie-styles');
    }

    private function registerBladeComponents(): void
    {
        Blade::componentNamespace('Kadoorie\\LivewireComponents\\View\\Components', 'kadoorie');
    }

    private function registerLivewireComponents(): void
    {
        // Appended per phase, e.g.:
        // Livewire::component('kadoorie::modal', \Kadoorie\LivewireComponents\Livewire\Modal::class);
    }
}
```

**`config/kadoorie.php`** (CREATE)
```php
<?php

declare(strict_types=1);

return [
    'prefix' => 'kadoorie',
    'assets' => [
        'inter_webfont' => true,
    ],
];
```

**`package.json`** (CREATE) — Tailwind build + JS/CSS lint + Jest + Playwright.
```json
{
  "name": "@kadoorie/livewire-components",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "postcss resources/css/kadoorie.css -o resources/dist/kadoorie.css",
    "dev": "postcss resources/css/kadoorie.css -o resources/dist/kadoorie.css --watch",
    "lint": "eslint resources/js",
    "format:check": "prettier --check resources/js resources/css",
    "test:js": "jest --coverage",
    "test:e2e": "playwright test --project=functional",
    "test:wcag": "playwright test --project=wcag"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.0",
    "@playwright/test": "^1.48.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.14.0",
    "jest": "^29.7.0",
    "postcss": "^8.4.0",
    "postcss-cli": "^11.0.0",
    "prettier": "^3.3.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**Docker files** (CREATE): `Dockerfile` (`php:8.3-cli-bookworm` + intl/zip/pcntl/bcmath/mbstring/
pdo_sqlite + Composer 2 + Node 20), `docker-compose.yml` (service `app`, container `kadoorie-app`, bind-mount,
`sleep infinity`, port 8000 for the workbench), `.dockerignore`. Build once: `docker compose build`
then `docker compose up -d`; thereafter every gate runs as `docker exec kadoorie-app …`.

**Other files** (CREATE): `pint.json` (PER preset), `phpstan.neon` (Larastan max), `tests/TestCase.php`
(extends `Orchestra\Testbench\TestCase`, boots the provider + Livewire), `tests/Pest.php`,
`playwright.config.ts` (functional + wcag projects, each run against the 360×800 / 768×1024 /
1920×1080 viewport matrix), `jest.config.js`, `.githooks/pre-commit`,
`.github/workflows/ci.yml` (matrix: Pint → Larastan → Pest → Jest → Playwright/axe → composer/npm
audit), `README.md`, `LICENSE`, `CHANGELOG.md`.

### TDD acceptance (write first, must fail before scaffold)
```php
// tests/Feature/PackageBootTest.php
it('registers the service provider and config', function (): void {
    expect(config('kadoorie.prefix'))->toBe('kadoorie');
});

it('publishes the compiled stylesheet under the kadoorie-styles tag', function (): void {
    $this->artisan('vendor:publish', ['--tag' => 'kadoorie-styles'])->assertSuccessful();
});
```

### Definition of Done
Standard DoD (above) + `composer install` and `npm ci` succeed on a clean checkout, CI green.

### Commit message
```
PHASE 0 COMPLETE — Conventional Commit Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
chore: Scaffold package skeleton, Docker env, and quality gates

Add a Docker dev container (app), composer/npm manifests, a
Spatie-based service provider, config, Testbench TestCase,
Pint/Larastan/Pest/Jest/Playwright configs, CI workflow,
pre-commit hook, and repo meta files.

Files changed:
- Dockerfile, docker-compose.yml, .dockerignore (CREATE)
- composer.json, package.json (CREATE)
- src/KadoorieComponentsServiceProvider.php (CREATE)
- config/kadoorie.php (CREATE)
- pint.json, phpstan.neon, jest.config.js, playwright.config.ts (CREATE)
- tests/TestCase.php, tests/Pest.php, tests/Feature/PackageBootTest.php (CREATE)
- .github/workflows/ci.yml, .githooks/pre-commit (CREATE)
- README.md, LICENSE, CHANGELOG.md (CREATE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  DO NOT COMMIT — User handles git operations
```

---

## Phase 0B — Design Token Layer + Icon System · **6 pts** · (depends on 0)

### Goal
Ship the `--kad-*` token system, the Tailwind preset, base CSS layer, focus utility, the precompiled
stylesheet, **and the foundational icon system** — the visual foundation every component consumes.
Light theme only (dark mode is out of scope).

### Tasks
- [ ] `resources/css/tokens.css` — all `--kad-*` on `:root` (light theme, §5; AA-safe muted split) (**2**)
- [ ] `tailwind-preset.js` — map theme scales to `var(--kad-*)`; breakpoints + container (**1**)
- [ ] `resources/css/kadoorie.css` — Tailwind layers + base + focus utility + **`prefers-reduced-motion`
      reset** + `tabular-nums` utility (**1**)
- [ ] **Icon system**: `<x-kadoorie::icon>` + SVG registry (Lucide subset + Figma-extracted Kadoorie
      icons), size tokens, aria handling (§6.6) (**1**)
- [ ] Build pipeline produces `resources/dist/kadoorie.css`; snapshot test (**1**)

### Key code deltas

**`resources/css/tokens.css`** (CREATE) — light theme (values from Part 1 §5).
```css
:root {
  --kad-color-primary: #aa1a2d;
  --kad-color-primary-hover: #af1228;
  --kad-color-primary-emphasis: #8c0f20;
  --kad-color-primary-subtle: #f7edee;
  --kad-color-on-primary: #ffffff;
  --kad-color-secondary: #002147;
  --kad-color-bg: #f7f8fa;
  --kad-color-surface: #ffffff;
  --kad-color-surface-muted: #f0f2f5;
  --kad-color-border: #dde2e8;
  --kad-color-border-strong: #bec7d1;
  --kad-color-text: #0f1620;
  --kad-color-text-body: #2f3b4a;
  --kad-color-text-muted: #5f6b77;        /* AA-safe for body text (≥4.5:1) */
  --kad-color-text-muted-large: #84949e;  /* Figma grey: large text / icons / borders only (3:1) */
  --kad-color-danger: #dc2626;  --kad-color-danger-subtle: #fef2f2;
  --kad-color-success: #16a34a; --kad-color-success-subtle: #f0fdf4;
  --kad-color-info: #2563eb;    --kad-color-info-subtle: #eff6ff;
  --kad-color-warning: #f59e0b; --kad-color-warning-subtle: #fffbeb;
  --kad-color-accent: #7c3aed;  --kad-color-accent-subtle: #f5f3ff;
  --kad-font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --kad-radius-md: 8px; --kad-radius-lg: 10px; --kad-radius-full: 9999px;
  --kad-shadow-sm: 0 1px 2px -1px rgb(0 0 0 / .1), 0 1px 3px rgb(0 0 0 / .1);
  --kad-shadow-md: 0 4px 16px rgb(0 0 0 / .12);
  --kad-shadow-lg: 0 8px 40px rgb(0 0 0 / .18);
}
```

**`tailwind-preset.js`** (CREATE)
```js
/** Kadoorie Tailwind preset — consumers: `presets: [require('kadoorie-livewire-components/tailwind-preset')]` */
export default {
  // Mobile-first, named breakpoints mapped to the reference targets (Part 1 §5.10).
  theme: {
    screens: {
      sm: '480px',   // large phones
      md: '768px',   // tablet (768x1024)
      lg: '1024px',  // small desktop / landscape tablet
      xl: '1280px',  // desktop content breakpoint
      '2xl': '1536px', // wide desktop (1920x1080 viewport)
    },
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } }, // --kad-container-max
    extend: {
      fontFamily: { sans: 'var(--kad-font-sans)' },
      colors: {
        primary: 'var(--kad-color-primary)',
        'primary-hover': 'var(--kad-color-primary-hover)',
        surface: 'var(--kad-color-surface)',
        border: 'var(--kad-color-border)',
        text: 'var(--kad-color-text)',
        danger: 'var(--kad-color-danger)',
        success: 'var(--kad-color-success)',
        info: 'var(--kad-color-info)',
        warning: 'var(--kad-color-warning)',
      },
      borderRadius: { md: 'var(--kad-radius-md)', lg: 'var(--kad-radius-lg)' },
      boxShadow: {
        sm: 'var(--kad-shadow-sm)', md: 'var(--kad-shadow-md)', lg: 'var(--kad-shadow-lg)',
      },
    },
  },
};
```

**`resources/css/kadoorie.css`** (CREATE, excerpt) — base layer + accessibility resets.
```css
@import './tokens.css';
/* ... @tailwind base/components/utilities ... */
@layer base {
  body { font-family: var(--kad-font-sans); line-height: 1.5; }
}
@layer utilities {
  .kad-nums { font-variant-numeric: tabular-nums; } /* data table / number cells */
}
/* Respect reduced-motion for all component transitions (Alpine + CSS). */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**`<x-kadoorie::icon>`** (CREATE) — reads a name from the SVG registry (Lucide subset + Figma-extracted
Kadoorie icons), outputs inline `<svg currentColor>`; decorative → `aria-hidden`, `label` prop →
`role="img"` + `<title>`. Icons live under `resources/svg/{lucide,kadoorie}/`.

### TDD acceptance
- Pest: publishing `kadoorie-styles` places `kadoorie.css` in `public/vendor/kadoorie`.
- Jest/snapshot (or a small node assert): compiled `resources/dist/kadoorie.css` contains
  `--kad-color-primary:#aa1a2d` and a `prefers-reduced-motion` block. Fails until build runs.
- Pest: `<x-kadoorie::icon name="check" />` renders `<svg` with `aria-hidden="true"`; with a `label`
  it renders `role="img"` + `<title>`.

### Definition of Done
Standard DoD + `npm run build` is deterministic and the compiled file is committed + the icon registry
resolves both a Lucide and a Kadoorie-custom icon.

### Commit message
```
PHASE 0B COMPLETE — Conventional Commit Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat: Add Kadoorie token layer, Tailwind preset, and icon system

Emit --kad-* CSS custom properties (light theme, AA-safe muted split)
from the Figma tokens, a Tailwind preset with breakpoints/container,
the base CSS layer (focus utility, tabular-nums, prefers-reduced-motion
reset), the compiled publishable stylesheet, and the <x-kadoorie::icon>
component backed by a Lucide + Figma-extracted SVG registry.

Files changed:
- resources/css/tokens.css, resources/css/kadoorie.css (CREATE)
- tailwind-preset.js, postcss.config.cjs (CREATE)
- src/View/Components/Icon.php, resources/views/components/icon.blade.php (CREATE)
- resources/svg/lucide/*, resources/svg/kadoorie/* (CREATE)
- resources/dist/kadoorie.css (CREATE, generated)
- tests/Feature/TokenLayerTest.php, tests/Feature/IconTest.php (CREATE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  DO NOT COMMIT — User handles git operations
```

---

## Phase 1 — Core Form Controls · **11 pts** · (depends on 0B) · parallel with 2,3,4

Split into three sub-phases; **1A must land first** (defines the shared field pattern the others reuse).

### Phase 1A — Field foundation + Button + Label · **3 pts**
Establishes `<x-kadoorie::field>`, the `HandlesFieldState` concern, and the Button — the reference
implementation every later component copies.

**Worked reference — `src/View/Components/Button.php`** (CREATE)
```php
<?php

/**
 * Project: Kadoorie Livewire Components
 * File: Button.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;
use Kadoorie\LivewireComponents\Enums\ButtonVariant;
use Kadoorie\LivewireComponents\Enums\Size;

final class Button extends Component
{
    public function __construct(
        public ButtonVariant $variant = ButtonVariant::Primary,
        public Size $size = Size::Md,
        public string $type = 'button',
        public bool $loading = false,
        public bool $disabled = false,
    ) {
    }

    public function render(): View
    {
        return view('kadoorie::components.button');
    }
}
```

**`src/Enums/ButtonVariant.php`** (CREATE) — TitleCase cases; each returns Tailwind classes bound to
`--kad-*` (Open/Closed: extend by adding a case).
```php
<?php

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum ButtonVariant: string
{
    case Primary = 'primary';
    case Secondary = 'secondary';
    case Danger = 'danger';
    case Ghost = 'ghost';

    public function classes(): string
    {
        return match ($this) {
            self::Primary => 'bg-primary text-[var(--kad-color-on-primary)] hover:bg-primary-hover',
            self::Secondary => 'bg-surface text-text border border-border hover:bg-surface-muted',
            self::Danger => 'bg-danger text-white hover:brightness-95',
            self::Ghost => 'bg-transparent text-text hover:bg-surface-muted',
        };
    }
}
```

**`resources/views/components/button.blade.php`** (CREATE) — single root, `data-test`, focus-visible,
disabled/loading semantics, `aria-busy`.
```blade
<button
    type="{{ $type }}"
    data-test="kadoorie-button"
    @disabled($disabled || $loading)
    aria-busy="{{ $loading ? 'true' : 'false' }}"
    {{ $attributes->merge(['class' =>
        'kad-focusable inline-flex items-center gap-1.5 rounded-md font-medium '
        . 'text-sm px-3 py-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed '
        . $variant->classes() . ' ' . $size->classes()]) }}
>
    @if ($loading)
        <span data-test="kadoorie-button-spinner" class="kad-spinner" aria-hidden="true"></span>
    @endif
    {{ $slot }}
</button>
```

### Phase 1B — Input + Textarea · **3 pts**
Text/email/password/number input + textarea, both using `<x-kadoorie::field>` for label/hint/error and
`aria-describedby`/`aria-invalid` wiring, `wire:model` friendly.

### Phase 1C — Select + Checkbox + Radio + Toggle · **5 pts**
Native-select (styled) + Alpine-enhanced option list; checkbox/radio with proper grouping and
`role`/`aria-checked`; toggle as an accessible switch (`role="switch"`, keyboard, `aria-checked`).

### TDD acceptance (representative)
```php
it('renders a primary button with the test hook and busy state', function (): void {
    $view = $this->blade('<x-kadoorie::button :loading="true">Save</x-kadoorie::button>');
    $view->assertSee('data-test="kadoorie-button"', false)
         ->assertSee('aria-busy="true"', false)
         ->assertSee('Save');
});

it('associates a field error with the input via aria-describedby', function (): void {
    $view = $this->blade('<x-kadoorie::field label="Email" error="Required" name="email">'
        . '<x-kadoorie::input name="email" /></x-kadoorie::field>');
    $view->assertSee('aria-describedby="email-error"', false)
         ->assertSee('aria-invalid="true"', false);
});
```
Plus a WCAG axe pass per control and a Playwright functional test for toggle keyboard operation.

### Definition of Done (Phase 1)
Standard DoD + every control keyboard-operable, labelled, axe-clean, and covered by Pest + Playwright.

### Commit messages
```
PHASE 1A — feat: Add field foundation, Button, and Label components
PHASE 1B — feat: Add Input and Textarea form controls
PHASE 1C — feat: Add Select, Checkbox, Radio, and Toggle controls
(each with full file list + DO NOT COMMIT warning)
```

---

## Phase 2 — Feedback & Overlays · **11 pts** · (depends on 0B) · parallel with 1,3,4

Alpine-heavy; strict focus management and live regions.

### Phase 2A — Modal / Dialog · **5 pts** (Livewire `kadoorie::modal`)
- `role="dialog"` + `aria-modal="true"`, labelled by title; **focus trap on open, focus return to
  trigger on close** (Alpine focus plugin); Esc + backdrop-click close (configurable); scroll-lock.
- `Livewire::component('kadoorie::modal', Modal::class)` registered in the provider.

### Phase 2B — Alert + Toast · **3 pts**
- Shared `Tone` enum + `SupportsSemanticTone` concern (DRY gate). Inline `Alert` = `role="alert"` for
  danger, `role="status"` otherwise. `Toast` = Livewire + Alpine, `aria-live="polite"` region,
  auto-dismiss with pause-on-hover, dismiss button labelled.

### Phase 2C — Tooltip + Spinner · **3 pts**
- Tooltip: Alpine, hover/focus trigger, `role="tooltip"` + `aria-describedby`, never traps focus,
  dismissible with Esc.
- Spinner: pure CSS `.kad-spinner`, `role="status"` + visually-hidden label.

### TDD acceptance (representative)
```php
it('opens the modal, traps focus, and dismisses on escape', function (): void {
    Livewire::test(Modal::class, ['title' => 'Confirm'])
        ->call('open')->assertSet('isOpen', true)
        ->assertSeeHtml('aria-modal="true"')
        ->call('close')->assertSet('isOpen', false);
});
```
Playwright functional: focus is trapped while open and returns to the trigger on close (keyboard
only). WCAG axe pass for every state.

### Definition of Done (Phase 2)
Standard DoD + focus-trap/return verified in a real browser (Playwright), live regions announce, and
no keyboard trap outside the intended modal.

### Commit messages
```
PHASE 2A — feat: Add accessible Modal/Dialog with focus management
PHASE 2B — feat: Add Alert and Toast with shared semantic tones
PHASE 2C — feat: Add Tooltip and Spinner components
(each with full file list + DO NOT COMMIT warning)
```

Continue to [Part 3 — Phases 3–8 + Testing Strategy](kadoorie-components-plan-3.md).
