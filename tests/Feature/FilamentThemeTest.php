<?php

/**
 * Project: Kadoorie Livewire Components
 * File: FilamentThemeTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

use Illuminate\Support\ServiceProvider;
use Kadoorie\LivewireComponents\Filament\KadoorieColors;

it('returns an eleven-shade primary ramp keyed by shade', function (): void {
    $ramp = KadoorieColors::primary();

    expect($ramp)->toHaveCount(11)
        ->and(array_keys($ramp))->toBe([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);

    foreach ($ramp as $channels) {
        expect($channels)->toMatch('/^\d{1,3}, \d{1,3}, \d{1,3}$/');
    }
});

it('anchors shade 700 on the brand primary', function (): void {
    expect(KadoorieColors::primary()[700])->toBe('170, 26, 45');
});

it('ships v3 and v4 theme css referencing the Kadoorie tokens', function (string $file): void {
    $path = dirname(__DIR__, 2) . '/resources/filament/' . $file;

    expect(is_file($path))->toBeTrue();

    $css = (string) file_get_contents($path);
    expect($css)
        ->toContain('tokens.css')
        ->toContain('--kad-color-primary');
})->with(['kadoorie-v3.css', 'kadoorie-v4.css']);

it('registers the kadoorie-filament publish tag', function (): void {
    expect(ServiceProvider::$publishGroups)->toHaveKey('kadoorie-filament');

    $paths = implode('|', array_keys(ServiceProvider::$publishGroups['kadoorie-filament']));
    expect($paths)->toContain('resources/filament');
});
