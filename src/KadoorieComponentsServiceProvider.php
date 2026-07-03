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
        // Livewire components are registered here as phases add them, e.g.:
        // Livewire::component('kadoorie::modal', \Kadoorie\LivewireComponents\Livewire\Modal::class);
    }
}
