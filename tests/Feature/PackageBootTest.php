<?php

/**
 * Project: Kadoorie Livewire Components
 * File: PackageBootTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('registers the service provider and config', function (): void {
    expect(config('kadoorie.prefix'))->toBe('kadoorie');
});

it('exposes the assets configuration', function (): void {
    expect(config('kadoorie.assets.inter_webfont'))->toBeTrue();
});

it('publishes the compiled stylesheet under the kadoorie-styles tag', function (): void {
    $this->artisan('vendor:publish', ['--tag' => 'kadoorie-styles'])->assertSuccessful();
});
