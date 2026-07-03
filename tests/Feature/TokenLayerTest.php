<?php

/**
 * Project: Kadoorie Livewire Components
 * File: TokenLayerTest.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

it('publishes the compiled stylesheet to the public path', function (): void {
    $target = public_path('vendor/kadoorie/kadoorie.css');

    if (is_file($target)) {
        unlink($target);
    }

    $this->artisan('vendor:publish', ['--tag' => 'kadoorie-styles', '--force' => true])
        ->assertSuccessful();

    expect(is_file($target))->toBeTrue();
});

it('compiles the brand token and reduced-motion reset into the dist stylesheet', function (): void {
    $css = (string) file_get_contents(dirname(__DIR__, 2) . '/resources/dist/kadoorie.css');

    expect($css)
        ->toContain('--kad-color-primary')
        ->toContain('#aa1a2d')
        ->toContain('prefers-reduced-motion')
        ->toContain('.kad-focusable');
});
