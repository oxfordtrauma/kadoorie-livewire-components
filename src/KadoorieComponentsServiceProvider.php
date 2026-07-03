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
use Kadoorie\LivewireComponents\Livewire\DataTable;
use Kadoorie\LivewireComponents\Livewire\Modal;
use Kadoorie\LivewireComponents\Livewire\Pages\Login;
use Kadoorie\LivewireComponents\Livewire\Toast;
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
            ->hasCommand(BuildShowcaseCommand::class);
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
    }

    private function registerBladeComponents(): void
    {
        Blade::componentNamespace('Kadoorie\\LivewireComponents\\View\\Components', 'kadoorie');
    }

    private function registerLivewireComponents(): void
    {
        Livewire::component('kadoorie::modal', Modal::class);
        Livewire::component('kadoorie::toast', Toast::class);
        Livewire::component('kadoorie::data-table', DataTable::class);
        Livewire::component('kadoorie::pages.login', Login::class);
    }
}
