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
use Kadoorie\LivewireComponents\Console\BuildShowcaseCommand;
use Kadoorie\LivewireComponents\Console\InstallCommand;
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
            ->hasAssets()
            ->hasCommand(BuildShowcaseCommand::class)
            ->hasCommand(InstallCommand::class);
    }

    public function packageBooted(): void
    {
        $this->registerBladeComponents();
        $this->registerLivewireComponents();

        $this->publishes([
            __DIR__ . '/../resources/dist' => public_path('vendor/kadoorie'),
        ], 'kadoorie-styles');

        $this->publishes([
            __DIR__ . '/../resources/filament' => resource_path('css/filament/kadoorie'),
        ], 'kadoorie-filament');

        $this->publishes([
            __DIR__ . '/../resources/react/src' => $this->reactPublishPath(),
        ], 'kadoorie-react');

        $this->publishes([
            __DIR__ . '/../resources/stubs/tsconfig.kadoorie.json' => base_path('tsconfig.kadoorie.json'),
            __DIR__ . '/../resources/stubs/eslint.kadoorie.cjs' => base_path('eslint.kadoorie.cjs'),
        ], 'kadoorie-react-config');
    }

    /**
     * Absolute target path for the published React source. Defaults to the
     * app's resources/js/kadoorie and is configurable via kadoorie.react.path.
     */
    private function reactPublishPath(): string
    {
        $path = config('kadoorie.react.path', 'resources/js/kadoorie');
        $path = is_string($path) && $path !== '' ? $path : 'resources/js/kadoorie';

        return str_starts_with($path, '/') ? $path : base_path($path);
    }

    private function registerBladeComponents(): void
    {
        Blade::componentNamespace('Kadoorie\\LivewireComponents\\View\\Components', 'kadoorie');
    }

    private function registerLivewireComponents(): void
    {
        // Livewire 4 resolves a "::" component name (e.g. kadoorie::modal) through
        // a registered class namespace by convention, mapping the name to
        // Kadoorie\LivewireComponents\Livewire\{Name} (dot segments become
        // sub-namespaces, so kadoorie::pages.login -> ...\Livewire\Pages\Login).
        Livewire::addNamespace('kadoorie', classNamespace: 'Kadoorie\\LivewireComponents\\Livewire');
    }
}
