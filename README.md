# Kadoorie Livewire Components

A private Composer package of prebuilt [Livewire 3](https://livewire.laravel.com)
components implementing the **Kadoorie look and feel** for Laravel applications.

- **Stack:** PHP 8.3+, Laravel 11/12, Livewire 3, Alpine.js, Tailwind CSS
  (with a publishable precompiled stylesheet).
- **Standards:** WCAG 2.1 AA, PER Coding Style 3.0, strict types, `data-test`
  selectors, fully responsive (mobile 360×800 · tablet 768×1024 · desktop
  1920×1080).

> Status: in active development. See the implementation plan under
> [`docs/kadoorie-components-plan-1.md`](docs/kadoorie-components-plan-1.md).

## Documentation

- [User guide](docs/user-guide.md) — installation, publishing, theming,
  accessibility, and a catalogue of every component.
- [Data-binding guide](docs/data-binding.md) — how to push data into Blade and
  Livewire components (props, slots, `wire:model`, events, Alpine).
- [Static showcase](docs/showcase/index.html) — a rendered gallery of every
  component, generated with `php artisan kadoorie:build-showcase`.

## Requirements

- PHP `^8.3`
- Laravel `^13.17`
- Livewire `^4.3.2`

## Installation

This is a private package served from GitHub (not Packagist). Add the repository
to your application's `composer.json`, then require it:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/oxfordtrauma/kadoorie-livewire-components.git"
        }
    ]
}
```

```bash
composer require oxfordtrauma/kadoorie-livewire-components:^0.1
```

Installing needs read access to the repository. If Composer prompts for
authentication, configure a GitHub token once:

```bash
composer config --global github-oauth.github.com <your-token>
```

The service provider is auto-discovered. Publish the precompiled stylesheet and
start using components — see the [user guide](docs/user-guide.md) for styling
options (Tailwind preset vs. stylesheet), publishing tags, theming, and the full
component catalogue.

```bash
php artisan vendor:publish --tag=kadoorie-styles
```

## Development

All quality gates run inside the `kadoorie-app` Docker container.

```bash
# Build and start the dev container
docker compose build
docker compose up -d

# Install dependencies
docker exec kadoorie-app composer install
docker exec kadoorie-app npm install

# Enable the shared git hooks (once per clone, run on the host)
composer setup-hooks
```

### Quality gates

```bash
docker exec kadoorie-app ./vendor/bin/pint --dirty --format agent   # style
docker exec kadoorie-app ./vendor/bin/phpstan analyse               # static analysis
docker exec kadoorie-app ./vendor/bin/pest --compact                # PHP tests
docker exec kadoorie-app npm run lint                               # ESLint
docker exec kadoorie-app npm run format:check                       # Prettier
docker exec kadoorie-app npm run test:js                            # Jest
docker exec kadoorie-app npm run test:e2e                           # Playwright (functional)
docker exec kadoorie-app npm run test:wcag                          # Playwright (axe / WCAG)
```

## License

Proprietary. See [LICENSE](LICENSE).
